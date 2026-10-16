"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  baseAoEstender,
  baseAoRestaurar,
  offDoAnel,
  rotuloDaFase,
  type FaseRelogio,
} from "@/lib/anel";
import { createClient } from "@/lib/supabase/client";
import { semEmoji } from "@/lib/texto";
import type { Track, UserSettings } from "@/lib/types";
import { Icone } from "./Icone";
import { ModalConfigPomodoro } from "./ModalConfigPomodoro";
import { Segmentado, type OpcaoSeg } from "./Segmentado";
import { usePopover } from "./usePopover";
import { Anel, type Subida } from "./pomodoro/Anel";
import { BotaoEstender } from "./pomodoro/BotaoEstender";
import { PopoverFocoCustom } from "./pomodoro/PopoverFocoCustom";

// Card "Pomodoro":
// - segmentado de trilha (desmarcável): clicar na escolhida DESMARCA (foco
//   sem registrar em trilha nenhuma)
// - O MODO é definido por quais TEMPOS estão selecionados (clicar no tempo
//   selecionado o DESMARCA, igual a trilha):
//     · foco e pausa selecionados → automático (foco → pausa → ...)
//     · só um tempo de foco → conta só o foco e para
//     · só um tempo de pausa → conta só a pausa e para
//   (pelo menos um tempo precisa ficar selecionado)
// - BOTÕES por estado:
//     · parado          → [Iniciar]
//     · rodando (foco)  → [Pausar] [+ tempo]  ← estende SEM quebrar o ciclo
//     · rodando (pausa) → [Pausar]
//     · pausado         → [Retomar] [Concluir]
//   Concluir salva o tempo decorrido e encerra. Se foi < 2 min, PERGUNTA
//   antes de registrar (evita lixo no histórico por start/stop acidental).
//   Não existe botão de zerar: o Concluir de sessão curta já faz esse papel.
// - O ANEL mostra restante ÷ base (lib/anel.ts). Somar tempo faz o anel
//   SUBIR animado; a base só cresce se o restante passar dela.
//
// O relógio usa UM setInterval fixo que chama sempre a versão mais recente
// de tick() via ref — evita a classe de bug de closure velha que congelava
// a contagem da pausa.

type Fase = FaseRelogio; // "foco" | "pausa" (lib/anel.ts)

type EstadoSalvo = {
  trilhaId: string | null;
  focoMin: number | null; // null = foco não selecionado
  pausaMin: number | null; // null = pausa não selecionada
  extraMs: number; // minutos adicionados ao foco atual pelo botão +
  fase: Fase;
  rodando: boolean;
  fimEm: number | null; // timestamp ms de quando a fase atual termina
  restanteMs: number;
  inicioFoco: string | null; // ISO de quando o foco começou (p/ started_at)
  ciclosFoco: number; // focos concluídos (decide a pausa longa)
  baseMs?: number; // o "cheio" do anel (estado salvo antigo não tem)
  // legado (formato antigo marcava a fase por booleano):
  focoAtivo?: boolean;
  pausaAtivo?: boolean;
};

const CHAVE_STORAGE = "roadmap-pomodoro-v1";
const FOCO_FIXOS = [25, 50, 90];
const PAUSA_FIXAS = [5, 10, 15];
const MIN_PARA_REGISTRAR = 2; // abaixo disso, pergunta antes de registrar

// Bip simples com WebAudio — sem arquivo de som pra carregar
function tocarBip(vezes: number) {
  try {
    const ctx = new AudioContext();
    for (let i = 0; i < vezes; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.25, ctx.currentTime + i * 0.5);
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + i * 0.5 + 0.4
      );
      osc.start(ctx.currentTime + i * 0.5);
      osc.stop(ctx.currentTime + i * 0.5 + 0.45);
    }
  } catch {
    // sem áudio disponível — o aviso visual continua funcionando
  }
}

export function Pomodoro({
  trilhas,
  settings,
  userId,
}: {
  trilhas: Track[];
  settings: UserSettings;
  userId: string | null; // null = visitante (timer funciona, não salva)
}) {
  const router = useRouter();

  const [trilhaId, setTrilhaId] = useState<string | null>(null);
  const [focoMin, setFocoMin] = useState<number | null>(
    settings.pomodoro_foco_min
  );
  const [pausaMin, setPausaMin] = useState<number | null>(
    settings.pausa_curta_min
  );
  const [extraMs, setExtraMs] = useState(0);
  const [fase, setFase] = useState<Fase>("foco");
  const [rodando, setRodando] = useState(false);
  const [restanteMs, setRestanteMs] = useState(
    settings.pomodoro_foco_min * 60_000
  );
  const [aviso, setAviso] = useState<string | null>(null);
  const [confirmarCurta, setConfirmarCurta] = useState<number | null>(null);
  const [configAberta, setConfigAberta] = useState(false);
  // o "cheio" do anel: começa no total da fase; só cresce ao somar tempo
  // além dele (lib/anel.ts)
  const [baseMs, setBaseMs] = useState(settings.pomodoro_foco_min * 60_000);
  // subida do anel ao somar tempo: o alvo (--off) fica CONGELADO enquanto
  // ela dura; senão cada tique de 500 ms reinicia a transição e o arco se
  // arrasta. Separado do setInterval do relógio (que continua único).
  const [subida, setSubida] = useState<{ modo: Subida; off: number } | null>(null);
  const subidaTimer = useRef<number | undefined>(undefined);
  // popover do "Foco personalizado", aberto pelo lápis
  // (desestruturado: o lint do React separa as refs dos valores comuns)
  const {
    aberto: customAberto,
    alternar: alternarCustom,
    fechar: fecharCustom,
    gatilhoRef: lapisRef,
    painelRef: popCustomRef,
  } = usePopover<HTMLButtonElement, HTMLFormElement>();
  const idPopCustom = useId();
  const idRotFoco = useId();
  const idRotPausa = useId();
  const idPergunta = useId();
  const mioloRef = useRef<HTMLDivElement>(null);
  const acoesRef = useRef<HTMLDivElement>(null);

  // ativação de cada fase É a presença de um tempo selecionado
  const focoAtivo = focoMin !== null;
  const pausaAtivo = pausaMin !== null;
  const focoCustom = focoMin !== null && !FOCO_FIXOS.includes(focoMin);

  // valores seguros pra usar no relógio (a fase ativa nunca é null)
  const focoSeguro = focoMin ?? settings.pomodoro_foco_min;
  const pausaSegura = pausaMin ?? settings.pausa_curta_min;

  // duração total do foco atual = tempo escolhido + o que o botão + somou
  const focoTotalMs = focoSeguro * 60_000 + extraMs;
  const decorridoMs =
    fase === "foco" ? Math.max(0, focoTotalMs - restanteMs) : 0;
  const decorridoMin = Math.round(decorridoMs / 60_000);
  // há um ciclo em curso? (pausa conta, e foco só depois de correr algo)
  const emAndamento = fase === "pausa" || decorridoMs > 0;

  // refs pra valores que o relógio lê/escreve sem re-renderizar
  const fimEm = useRef<number | null>(null);
  const inicioFoco = useRef<string | null>(null);
  const ciclosFoco = useRef(0);
  const restaurado = useRef(false);
  const tickRef = useRef<() => void>(() => {});

  function salvarEstado(extra?: Partial<EstadoSalvo>) {
    const estado: EstadoSalvo = {
      trilhaId,
      focoMin,
      pausaMin,
      extraMs,
      fase,
      rodando,
      fimEm: fimEm.current,
      restanteMs,
      inicioFoco: inicioFoco.current,
      ciclosFoco: ciclosFoco.current,
      baseMs,
      ...extra,
    };
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(estado));
  }

  // Prepara o relógio para o COMEÇO de uma fase: sem extensão do "+ tempo",
  // anel cheio com a duração dela e tudo gravado no localStorage. Parado por
  // padrão; `rodando` (a pausa automática depois de um foco) já sai contando.
  // `salvar` leva o que mais mudou e o estado deste render ainda não mostra
  // (ex.: os tempos novos em aplicarSelecao). inicioFoco e ciclosFoco são
  // refs: quem chama ajusta antes.
  function prepararFase(
    novaFase: Fase,
    duracaoMs: number,
    { rodando: rodar = false, salvar }: { rodando?: boolean; salvar?: Partial<EstadoSalvo> } = {}
  ) {
    setFase(novaFase);
    setRodando(rodar);
    setExtraMs(0);
    fimEm.current = rodar ? Date.now() + duracaoMs : null;
    setRestanteMs(duracaoMs);
    setBaseMs(duracaoMs);
    salvarEstado({
      fase: novaFase,
      rodando: rodar,
      extraMs: 0,
      fimEm: fimEm.current,
      restanteMs: duracaoMs,
      baseMs: duracaoMs,
      inicioFoco: inicioFoco.current,
      ciclosFoco: ciclosFoco.current,
      ...salvar,
    });
  }

  // nome da trilha para os avisos ("25 min registrados em Dev.")
  function nomeDaTrilha(id: string | null) {
    const t = trilhas.find((x) => x.id === id);
    return t ? semEmoji(t.nome) : "";
  }

  // depois de cada ação, o foco do teclado vai para o botão principal que
  // tomou o lugar (Iniciar, Pausar, Retomar ou o Registrar da sessão curta).
  // O botão novo só existe depois do render: o pedido vira estado e o efeito
  // abaixo (que roda depois do render) move o foco.
  const [pedidoDeFoco, setPedidoDeFoco] = useState(0);
  function focarPrimario() {
    setPedidoDeFoco((n) => n + 1);
  }
  useEffect(() => {
    if (pedidoDeFoco === 0) return;
    mioloRef.current?.querySelector<HTMLElement>(".acoes .btn-prim")?.focus();
  }, [pedidoDeFoco]);

  // somar tempo: o anel SOBE animado, sempre. "mola" (.6s) com movimento
  // normal; "suave" (.3s) com movimento reduzido (encher o anel é retorno
  // de progresso, não deslocamento pela tela)
  function subirAnel(alvo: number) {
    const suave = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setSubida({ modo: suave ? "suave" : "mola", off: alvo });
    window.clearTimeout(subidaTimer.current);
    subidaTimer.current = window.setTimeout(() => setSubida(null), suave ? 400 : 700);
  }
  useEffect(() => () => window.clearTimeout(subidaTimer.current), []);

  async function registrarSessao(
    inicioIso: string,
    duracaoMin: number,
    naTrilha: string
  ) {
    if (!userId) return;
    const supabase = createClient();
    const { error } = await supabase.from("sessions").insert({
      user_id: userId,
      track_id: naTrilha,
      started_at: inicioIso,
      ended_at: new Date().toISOString(),
      duration_min: duracaoMin,
      origem: "pomodoro",
    });
    if (error) {
      setAviso("Não deu para registrar a sessão. Anote o tempo e registre manual.");
    } else {
      router.refresh(); // atualiza streak, metas e últimas sessões
    }
  }

  // volta pro começo do ciclo (não mexe no aviso — quem chama decide a msg)
  function voltarAoInicio() {
    const faseInicial: Fase = focoAtivo ? "foco" : "pausa";
    inicioFoco.current = null;
    const dur = faseInicial === "foco" ? focoSeguro : pausaSegura;
    prepararFase(faseInicial, dur * 60_000);
  }

  // Fim de um FOCO (relógio zerou): registra o total (com o que o + somou)
  function concluirFoco() {
    tocarBip(2);
    ciclosFoco.current += 1;
    const totalMin = Math.round(focoTotalMs / 60_000);

    const registrou = !!(inicioFoco.current && trilhaId && userId);
    if (registrou) registrarSessao(inicioFoco.current!, totalMin, trilhaId!);
    inicioFoco.current = null;

    const msgFoco = registrou
      ? `${totalMin} min registrados em ${nomeDaTrilha(trilhaId)}.`
      : !userId
        ? `Foco de ${totalMin} min concluído. Entre para salvar suas sessões.`
        : "Foco concluído, sem trilha: não registrado.";

    if (pausaAtivo) {
      // automático: começa a pausa (longa a cada N focos), já contando
      const ehLonga =
        ciclosFoco.current % settings.ciclos_ate_pausa_longa === 0;
      const duracao = ehLonga ? settings.pausa_longa_min : pausaSegura;
      setAviso(
        `${msgFoco} ${ehLonga ? "Pausa longa" : "Pausa"} de ${duracao} min.`
      );
      prepararFase("pausa", duracao * 60_000, { rodando: true });
    } else {
      // só-foco: para e volta pro começo
      setAviso(msgFoco);
      prepararFase("foco", focoSeguro * 60_000);
    }
  }

  // Fim de uma PAUSA: para e prepara a próxima fase
  function concluirPausa() {
    tocarBip(1);
    const proxima: Fase = focoAtivo ? "foco" : "pausa";
    setAviso(
      focoAtivo
        ? "Pausa encerrada. Pronto para o próximo foco?"
        : "Pausa concluída."
    );
    const dur = proxima === "foco" ? focoSeguro : pausaSegura;
    prepararFase(proxima, dur * 60_000);
  }

  function tick() {
    if (!rodando || fimEm.current === null) return;
    const resta = fimEm.current - Date.now();
    if (resta > 0) {
      setRestanteMs(resta);
      return;
    }
    fimEm.current = null; // trava contra tick duplo na virada
    // a fase vai mudar sozinha: se o foco do teclado estava nos botões de
    // ação (Pausar, "+ tempo" ou o popover dele), ele vai para o novo botão
    // principal; senão cairia no <body> (o "+ tempo" some na troca)
    const focoNasAcoes = !!acoesRef.current?.contains(document.activeElement);
    fecharCustom(false); // popovers abertos fecham na troca de fase
    if (fase === "foco") concluirFoco();
    else concluirPausa();
    if (focoNasAcoes) focarPrimario();
  }

  // tickRef aponta SEMPRE pra versão mais recente do tick (padrão
  // "latest ref": atualiza após cada render) — o interval fixo abaixo
  // nunca fica preso num estado antigo
  useEffect(() => {
    tickRef.current = tick;
  });

  // um único interval, criado uma vez só
  useEffect(() => {
    const id = setInterval(() => tickRef.current(), 500);
    return () => clearInterval(id);
  }, []);

  // Restaura o estado salvo ao montar (sobrevive a refresh/fechar aba).
  // localStorage não existe no servidor, então precisa ser num effect —
  // exceção consciente à regra de setState em effect.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (restaurado.current) return;
    restaurado.current = true;

    const bruto = localStorage.getItem(CHAVE_STORAGE);
    if (!bruto) return;
    try {
      const salvo: EstadoSalvo = JSON.parse(bruto);
      if (salvo.trilhaId && trilhas.some((t) => t.id === salvo.trilhaId)) {
        setTrilhaId(salvo.trilhaId);
      }
      // compat: no formato antigo a fase era ligada por booleano; se estava
      // desligada, o tempo passa a ser null (não selecionado)
      const fMin = salvo.focoAtivo === false ? null : salvo.focoMin;
      const pMin = salvo.pausaAtivo === false ? null : salvo.pausaMin;
      setFocoMin(fMin);
      setPausaMin(pMin);
      setExtraMs(salvo.extraMs ?? 0);
      ciclosFoco.current = salvo.ciclosFoco ?? 0;
      inicioFoco.current = salvo.inicioFoco;

      const dm = (m: number | null) =>
        (m ?? settings.pomodoro_foco_min) * 60_000;
      // total da fase salva (o foco soma o que o "+ tempo" estendeu); só
      // serve para a base do anel de estado salvo antigo, sem baseMs
      const totalDaFase =
        salvo.fase === "foco" ? dm(fMin) + (salvo.extraMs ?? 0) : dm(pMin);

      if (salvo.rodando && salvo.fimEm) {
        if (salvo.fimEm <= Date.now()) {
          // a fase terminou enquanto a página estava fechada. Aqui NÃO
          // usa prepararFase: ela gravaria no localStorage o estado deste
          // render, que ainda não tem a trilha e os tempos restaurados acima
          if (salvo.fase === "foco" && salvo.inicioFoco && salvo.trilhaId) {
            const total = Math.round(
              (dm(fMin) + (salvo.extraMs ?? 0)) / 60_000
            );
            registrarSessao(salvo.inicioFoco, total, salvo.trilhaId);
            setAviso("Foco concluído com a página fechada e registrado.");
          }
          inicioFoco.current = null;
          setExtraMs(0);
          setFase(salvo.fase);
          setRodando(false);
          const dur = salvo.fase === "foco" ? dm(fMin) : dm(pMin);
          setRestanteMs(dur);
          setBaseMs(dur);
        } else {
          setFase(salvo.fase);
          setRodando(true);
          fimEm.current = salvo.fimEm;
          const resta = salvo.fimEm - Date.now();
          setRestanteMs(resta);
          setBaseMs(baseAoRestaurar(salvo.baseMs, totalDaFase, resta));
        }
      } else {
        setFase(salvo.fase);
        const resta = salvo.restanteMs ?? dm(fMin);
        setRestanteMs(resta);
        setBaseMs(baseAoRestaurar(salvo.baseMs, totalDaFase, resta));
      }
    } catch {
      localStorage.removeItem(CHAVE_STORAGE);
    }
    // roda uma única vez, na montagem
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  function iniciarOuPausar() {
    setAviso(null);
    if (rodando) {
      // pausar o relógio (não confundir com a fase "pausa")
      const resta = Math.max(0, (fimEm.current ?? Date.now()) - Date.now());
      fimEm.current = null;
      setRodando(false);
      setRestanteMs(resta);
      salvarEstado({ rodando: false, fimEm: null, restanteMs: resta });
      return;
    }
    // o relógio vai contar: o popover "Foco personalizado" fecha (quem usa o
    // teclado sai dele com Tab e aperta Iniciar sem fechá-lo)
    fecharCustom(false);
    if (fase === "foco" && inicioFoco.current === null) {
      inicioFoco.current = new Date().toISOString();
    }
    fimEm.current = Date.now() + restanteMs;
    setRodando(true);
    salvarEstado({
      rodando: true,
      fimEm: fimEm.current,
      inicioFoco: inicioFoco.current,
    });
  }

  // + N minutos no foco em curso, SEM quebrar o ciclo
  function estender(min: number) {
    if (!rodando || fase !== "foco") return;
    const somaMs = min * 60_000;
    fimEm.current = (fimEm.current ?? Date.now()) + somaMs;
    const novoRestante = restanteMs + somaMs;
    // o anel sobe na proporção (restante ÷ base); se o restante passar da
    // base (somou mais do que já tinha corrido), enche e vira a nova base
    const novaBase = baseAoEstender(baseMs, novoRestante);
    setExtraMs(extraMs + somaMs);
    setRestanteMs(novoRestante);
    setBaseMs(novaBase);
    subirAnel(offDoAnel(novoRestante, novaBase));
    setAviso(`+${min} min no foco.`);
    salvarEstado({
      extraMs: extraMs + somaMs,
      fimEm: fimEm.current,
      restanteMs: novoRestante,
      baseMs: novaBase,
    });
  }

  // salva a sessão com os minutos informados e encerra
  function salvarEConcluir(min: number) {
    if (inicioFoco.current && trilhaId && userId) {
      registrarSessao(inicioFoco.current, min, trilhaId);
      setAviso(`${min} min registrados em ${nomeDaTrilha(trilhaId)}.`);
    } else if (!userId) {
      setAviso("Foco encerrado. Entre para salvar suas sessões.");
    } else {
      setAviso("Foco encerrado, sem trilha: não registrado.");
    }
    setConfirmarCurta(null);
    voltarAoInicio();
  }

  // Concluir: numa pausa só encerra; num foco, salva o decorrido —
  // perguntando antes se a sessão foi curta demais
  function concluir() {
    if (fase === "pausa") {
      setAviso("Pausa encerrada.");
      voltarAoInicio();
      return;
    }
    if (decorridoMin < 1) {
      setAviso("Sessão muito curta: nada registrado.");
      voltarAoInicio();
      return;
    }
    if (decorridoMin < MIN_PARA_REGISTRAR) {
      setConfirmarCurta(decorridoMin);
      return;
    }
    salvarEConcluir(decorridoMin);
  }

  function descartarCurta() {
    setConfirmarCurta(null);
    setAviso("Sessão descartada.");
    voltarAoInicio();
  }

  // aplica uma nova seleção de tempos (não durante a contagem): recalcula a
  // fase inicial (foco se houver foco; senão pausa) e zera o relógio.
  function aplicarSelecao(f: number | null, p: number | null) {
    setFocoMin(f);
    setPausaMin(p);
    setAviso(null);
    const faseInicial: Fase = f !== null ? "foco" : "pausa";
    inicioFoco.current = null;
    const dur = (faseInicial === "foco" ? f : p) ?? settings.pomodoro_foco_min;
    // os tempos novos vão junto: o salvarEstado deste render ainda vê os antigos
    prepararFase(faseInicial, dur * 60_000, { salvar: { focoMin: f, pausaMin: p } });
  }

  function precisaDeUm() {
    setAviso("Selecione ao menos um tempo (foco ou pausa).");
  }

  // Travado (relógio contando): o clique não muda nada e o aviso diz o
  // motivo, para ninguém achar que o botão quebrou
  function avisarTrava(motivo: "trilha" | "tempos") {
    setAviso(
      motivo === "trilha"
        ? "A trilha não muda no meio de um foco."
        : "Pause para trocar os tempos."
    );
  }

  // clicar na trilha seleciona; clicar de novo DESMARCA
  function alternarTrilha(id: string) {
    if (rodando && fase === "foco") return avisarTrava("trilha"); // não troca no meio de um foco
    const nova = trilhaId === id ? null : id;
    setTrilhaId(nova);
    salvarEstado({ trilhaId: nova });
  }

  // clicar num tempo de foco: seleciona; clicar no já selecionado DESMARCA
  function escolherFoco(min: number) {
    if (rodando) return avisarTrava("tempos");
    if (focoMin === min) {
      if (pausaMin === null) return precisaDeUm();
      aplicarSelecao(null, pausaMin);
    } else {
      aplicarSelecao(min, pausaMin);
    }
  }

  // lápis: com o personalizado ligado, DESMARCA (se a pausa estiver
  // selecionada); senão abre o popover "Foco personalizado"
  function escolherFocoCustom() {
    if (rodando) return avisarTrava("tempos");
    if (focoCustom) {
      if (pausaMin === null) return precisaDeUm();
      aplicarSelecao(null, pausaMin);
      return;
    }
    alternarCustom();
  }

  // "Aplicar" do popover (o valor já chega validado: maior que zero).
  // Com o relógio contando, NÃO aplica: aplicarSelecao zera o relógio e o
  // foco em andamento sumiria sem registro.
  function aplicarFocoCustom(min: number) {
    if (rodando) {
      fecharCustom(true);
      return avisarTrava("tempos");
    }
    fecharCustom(true);
    aplicarSelecao(min, pausaMin);
  }

  function escolherPausa(min: number) {
    if (rodando) return avisarTrava("tempos");
    if (pausaMin === min) {
      if (focoMin === null) return precisaDeUm();
      aplicarSelecao(focoMin, null);
    } else {
      aplicarSelecao(focoMin, min);
    }
  }

  const minutos = Math.floor(Math.ceil(restanteMs / 1000) / 60);
  const segundos = Math.ceil(restanteMs / 1000) % 60;

  const modoTexto =
    focoAtivo && pausaAtivo
      ? "Modo automático · foco, depois pausa"
      : focoAtivo
        ? "Só foco · conta e para"
        : "Só pausa · conta e para";

  // a legenda só aparece quando informa algo (repetir a trilha era ruído)
  const legenda = !userId
    ? "Entre para registrar o foco"
    : trilhaId
      ? ""
      : "Sem trilha: o foco não é registrado";

  // anel: durante a subida o alvo fica congelado (ver `subida`)
  const off = subida ? subida.off : offDoAnel(restanteMs, baseMs);
  const corDaTrilha = trilhas.find((t) => t.id === trilhaId)?.cor ?? null;

  const opcoesTrilha: OpcaoSeg[] = trilhas.map((t) => ({
    valor: t.id,
    conteudo: semEmoji(t.nome),
    titulo: semEmoji(t.nome),
  }));
  const opcoesFoco: OpcaoSeg[] = [
    ...FOCO_FIXOS.map((m) => ({ valor: String(m), conteudo: String(m) })),
    {
      valor: "custom",
      // ligado mostra o número; desligado, o lápis
      conteudo: focoCustom ? String(focoMin) : <Icone nome="lapis" />,
      ariaLabel: focoCustom ? `Foco personalizado: ${focoMin} min` : "Foco personalizado",
      titulo: "Foco personalizado",
      ref: lapisRef,
      // só o lápis (personalizado desligado) abre o popover; ligado, o
      // clique DESMARCA e o botão é só de alternar (aria-pressed)
      ...(!focoCustom && {
        ariaHaspopup: "dialog" as const,
        ariaExpanded: customAberto,
        ariaControls: idPopCustom,
      }),
    },
  ];
  const opcoesPausa: OpcaoSeg[] = PAUSA_FIXAS.map((m) => ({
    valor: String(m),
    conteudo: String(m),
  }));

  return (
    <>
      <section className="cartao foco" aria-labelledby="t-foco">
        <div className="cartao-cab">
          <h2 className="cartao-titulo" id="t-foco">
            Pomodoro
          </h2>
          {userId && (
            <button
              type="button"
              className="btn-icone"
              aria-label="Tempos do pomodoro"
              title="Tempos do pomodoro"
              onClick={() => setConfigAberta(true)}
            >
              <Icone nome="engrenagem" />
            </button>
          )}
        </div>

        <div className="foco-miolo" ref={mioloRef}>
          <Segmentado
            modo="desmarcavel"
            className="seg-trilha"
            ariaLabel="Trilha do foco"
            opcoes={opcoesTrilha}
            valor={trilhaId}
            travado={rodando && fase === "foco"}
            onEscolher={alternarTrilha}
          />
          <p className="foco-legenda">{legenda}</p>

          <div className="relogio-vaga">
            <Anel
              tempo={`${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`}
              fase={fase}
              rotuloFase={rotuloDaFase({ fase, rodando, decorridoMs, restanteMs, baseMs })}
              off={off}
              corDaTrilha={corDaTrilha}
              subindo={subida?.modo ?? null}
            />
          </div>

          <div className="tempos">
            <span className={focoAtivo ? "tempo-rotulo" : "tempo-rotulo off"} id={idRotFoco}>
              Foco
            </span>
            <div className="tempo-caixa">
              <Segmentado
                modo="desmarcavel"
                ariaLabelledby={idRotFoco}
                opcoes={opcoesFoco}
                valor={focoMin === null ? null : focoCustom ? "custom" : String(focoMin)}
                travado={rodando}
                onEscolher={(v) => (v === "custom" ? escolherFocoCustom() : escolherFoco(Number(v)))}
              />
              {/* key: cada abertura monta o popover de novo, que volta a
                  começar em 35 e sem o erro da vez anterior (Esc fecha sem
                  passar pelo Cancelar) */}
              <PopoverFocoCustom
                key={customAberto ? "aberto" : "fechado"}
                id={idPopCustom}
                painelRef={popCustomRef}
                aberto={customAberto}
                onAplicar={aplicarFocoCustom}
                onCancelar={() => fecharCustom(true)}
              />
            </div>
            <span className={pausaAtivo ? "tempo-rotulo" : "tempo-rotulo off"} id={idRotPausa}>
              Pausa
            </span>
            <Segmentado
              modo="desmarcavel"
              ariaLabelledby={idRotPausa}
              opcoes={opcoesPausa}
              valor={pausaMin === null ? null : String(pausaMin)}
              travado={rodando}
              onEscolher={(v) => escolherPausa(Number(v))}
            />
            <p className="modo">{modoTexto}</p>
          </div>

          {/* Ações: mudam conforme o estado do ciclo. Depois de cada uma, o
              foco vai para o botão principal que tomou o lugar */}
          {confirmarCurta !== null ? (
            <div className="confirma">
              {/* a pergunta descreve os dois botões: o foco vai direto para
                  Registrar e o leitor de tela lê o contexto junto */}
              <p id={idPergunta}>
                Você estudou só <b>{confirmarCurta} min</b> nesta sessão. Quer
                registrar mesmo assim?
              </p>
              <div className="acoes">
                <button
                  type="button"
                  className="btn btn-sec btn-p"
                  aria-describedby={idPergunta}
                  onClick={() => {
                    descartarCurta();
                    focarPrimario();
                  }}
                >
                  Descartar
                </button>
                <button
                  type="button"
                  className="btn btn-prim btn-p"
                  aria-describedby={idPergunta}
                  onClick={() => {
                    salvarEConcluir(confirmarCurta);
                    focarPrimario();
                  }}
                >
                  Registrar
                </button>
              </div>
            </div>
          ) : (
            <div className="acoes" ref={acoesRef}>
              {/* o botão principal muda de nome conforme o estado:
                  parado → Iniciar · rodando → Pausar · pausado → Retomar */}
              <button
                type="button"
                className="btn btn-prim"
                onClick={() => {
                  iniciarOuPausar();
                  focarPrimario();
                }}
              >
                <Icone nome={rodando ? "pausa" : "play"} />
                {rodando ? "Pausar" : emAndamento ? "Retomar" : "Iniciar"}
              </button>
              {/* rodando no foco: "+ tempo"; pausado no meio: Concluir */}
              {rodando && fase === "foco" && <BotaoEstender onAdd={estender} />}
              {!rodando && emAndamento && (
                <button
                  type="button"
                  className="btn btn-sec"
                  title={fase === "pausa" ? "Encerrar a pausa" : "Encerrar e salvar o tempo estudado"}
                  onClick={() => {
                    concluir();
                    focarPrimario();
                  }}
                >
                  <Icone nome="parar" />
                  Concluir
                </button>
              )}
            </div>
          )}

          {/* sempre no DOM: o leitor de tela só anuncia mudanças de uma
              região que já existia */}
          <p className="aviso" role="status">
            {aviso ?? ""}
          </p>
        </div>
      </section>

      {/* a folha fica fora da section do cartão */}
      {userId && (
        <ModalConfigPomodoro
          aberto={configAberta}
          onFechar={() => setConfigAberta(false)}
          settings={settings}
          userId={userId}
        />
      )}
    </>
  );
}
