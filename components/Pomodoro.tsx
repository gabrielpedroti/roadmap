"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Track, UserSettings } from "@/lib/types";
import { ModalConfigPomodoro } from "./ModalConfigPomodoro";

// Card "Foco" (pomodoro):
// - seletor de trilha; a selecionada fica com vidro fosco + nome na cor da
//   trilha; clicar de novo DESMARCA (foco sem registrar em trilha nenhuma)
// - O MODO é definido por quais TEMPOS estão selecionados (clicar no tempo
//   selecionado o DESMARCA, igual a trilha):
//     · foco e pausa selecionados → automático: foco termina, pausa começa
//       sozinha, pausa longa a cada N focos, e espera o próximo Iniciar
//     · só um tempo de foco → conta só o foco e para
//     · só um tempo de pausa → conta só a pausa e para
//   (pelo menos um tempo precisa ficar selecionado)
// - ao CONCLUIR um foco: registra a sessão (se logado E com trilha)
// - reset descarta o ciclo atual; o estado sobrevive a refresh (localStorage)
//
// O relógio usa UM setInterval fixo que chama sempre a versão mais recente
// de tick() via ref — evita a classe de bug de closure velha que congelava
// a contagem da pausa.

type Fase = "foco" | "pausa";

type EstadoSalvo = {
  trilhaId: string | null;
  focoMin: number | null; // null = foco não selecionado
  pausaMin: number | null; // null = pausa não selecionada
  fase: Fase;
  rodando: boolean;
  fimEm: number | null; // timestamp ms de quando a fase atual termina
  restanteMs: number;
  inicioFoco: string | null; // ISO de quando o foco começou (p/ started_at)
  ciclosFoco: number; // focos concluídos (decide a pausa longa)
  // legado (estados salvos antes desta versão marcavam a fase por booleano):
  focoAtivo?: boolean;
  pausaAtivo?: boolean;
};

const CHAVE_STORAGE = "roadmap-pomodoro-v1";
const FOCO_FIXOS = [25, 50, 90];

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

// classes compartilhadas dos segmented controls
const segFundo = "flex rounded-[10px] bg-seg p-[2px]";
const segBotao =
  "flex min-h-[38px] flex-1 cursor-pointer items-center justify-center gap-[6px] rounded-[8px] border-none px-2 text-[13px] font-medium text-tinta2 transition-colors";
// selecionado = vidro fosco iOS. A classe .vidro (globals.css) dá o fundo
// translúcido e a sombra; o blur vai INLINE porque o Lightning CSS (build do
// Tailwind v4) remove `backdrop-filter` das folhas de estilo.
const segBotaoOn = "vidro font-semibold text-tinta";
const vidroBlur: React.CSSProperties = {
  backdropFilter: "blur(16px) saturate(180%)",
  WebkitBackdropFilter: "blur(16px) saturate(180%)",
};

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
  const [fase, setFase] = useState<Fase>("foco");
  const [rodando, setRodando] = useState(false);
  const [restanteMs, setRestanteMs] = useState(
    settings.pomodoro_foco_min * 60_000
  );
  const [aviso, setAviso] = useState<string | null>(null);
  const [configAberta, setConfigAberta] = useState(false);

  // ativação de cada fase É a presença de um tempo selecionado
  const focoAtivo = focoMin !== null;
  const pausaAtivo = pausaMin !== null;
  const focoCustom = focoMin !== null && !FOCO_FIXOS.includes(focoMin);

  // valores seguros pra usar no relógio (a fase ativa nunca é null)
  const focoSeguro = focoMin ?? settings.pomodoro_foco_min;
  const pausaSegura = pausaMin ?? settings.pausa_curta_min;

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
      fase,
      rodando,
      fimEm: fimEm.current,
      restanteMs,
      inicioFoco: inicioFoco.current,
      ciclosFoco: ciclosFoco.current,
      ...extra,
    };
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(estado));
  }

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
      setAviso("Erro ao registrar a sessão — anote e registre manual.");
    } else {
      router.refresh(); // atualiza streak, metas e últimas sessões
    }
  }

  // Fim de um FOCO: registra (se possível). Depois, se a pausa está
  // selecionada, emenda nela (automático); senão para (só-foco).
  function concluirFoco() {
    tocarBip(2);
    ciclosFoco.current += 1;

    const registrou = !!(inicioFoco.current && trilhaId && userId);
    if (registrou) registrarSessao(inicioFoco.current!, focoSeguro, trilhaId!);
    inicioFoco.current = null;

    const msgFoco = registrou
      ? "✅ Foco concluído e registrado!"
      : !userId
        ? "✅ Foco concluído! Entre para salvar suas sessões."
        : "✅ Foco concluído (sem trilha — não registrado).";

    if (pausaAtivo) {
      // automático: começa a pausa (longa a cada N focos)
      const ehLonga =
        ciclosFoco.current % settings.ciclos_ate_pausa_longa === 0;
      const duracao = ehLonga ? settings.pausa_longa_min : pausaSegura;
      setAviso(
        `${msgFoco} ${ehLonga ? "Pausa longa" : "Pausa"} de ${duracao} min.`
      );
      setFase("pausa");
      setRodando(true);
      fimEm.current = Date.now() + duracao * 60_000;
      setRestanteMs(duracao * 60_000);
      salvarEstado({
        fase: "pausa",
        rodando: true,
        fimEm: fimEm.current,
        restanteMs: duracao * 60_000,
        inicioFoco: null,
        ciclosFoco: ciclosFoco.current,
      });
    } else {
      // só-foco: para e volta pro começo
      setAviso(msgFoco);
      setFase("foco");
      setRodando(false);
      fimEm.current = null;
      setRestanteMs(focoSeguro * 60_000);
      salvarEstado({
        fase: "foco",
        rodando: false,
        fimEm: null,
        restanteMs: focoSeguro * 60_000,
        inicioFoco: null,
        ciclosFoco: ciclosFoco.current,
      });
    }
  }

  // Fim de uma PAUSA: para e prepara a próxima fase (foco se ele estiver
  // selecionado; senão, outra pausa — modo só-pausa).
  function concluirPausa() {
    tocarBip(1);
    const proxima: Fase = focoAtivo ? "foco" : "pausa";
    setAviso(
      focoAtivo
        ? "⏰ Pausa encerrada — pronto pro próximo foco?"
        : "⏰ Pausa concluída."
    );
    setFase(proxima);
    setRodando(false);
    fimEm.current = null;
    const dur = proxima === "foco" ? focoSeguro : pausaSegura;
    setRestanteMs(dur * 60_000);
    salvarEstado({
      fase: proxima,
      rodando: false,
      fimEm: null,
      restanteMs: dur * 60_000,
    });
  }

  function tick() {
    if (!rodando || fimEm.current === null) return;
    const resta = fimEm.current - Date.now();
    if (resta > 0) {
      setRestanteMs(resta);
      return;
    }
    fimEm.current = null; // trava contra tick duplo na virada
    if (fase === "foco") concluirFoco();
    else concluirPausa();
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
      ciclosFoco.current = salvo.ciclosFoco ?? 0;
      inicioFoco.current = salvo.inicioFoco;

      const dm = (m: number | null) => (m ?? settings.pomodoro_foco_min) * 60_000;

      if (salvo.rodando && salvo.fimEm) {
        if (salvo.fimEm <= Date.now()) {
          // a fase terminou enquanto a página estava fechada
          if (salvo.fase === "foco" && salvo.inicioFoco && salvo.trilhaId) {
            registrarSessao(
              salvo.inicioFoco,
              fMin ?? settings.pomodoro_foco_min,
              salvo.trilhaId
            );
            setAviso("✅ Foco concluído (registrado) com a página fechada.");
          }
          inicioFoco.current = null;
          setFase(salvo.fase);
          setRodando(false);
          setRestanteMs(salvo.fase === "foco" ? dm(fMin) : dm(pMin));
        } else {
          setFase(salvo.fase);
          setRodando(true);
          fimEm.current = salvo.fimEm;
          setRestanteMs(salvo.fimEm - Date.now());
        }
      } else {
        setFase(salvo.fase);
        setRestanteMs(salvo.restanteMs ?? dm(fMin));
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

  function resetar() {
    // descarta o ciclo em andamento; volta pra fase inicial do modo atual
    setAviso(null);
    setRodando(false);
    const faseInicial: Fase = focoAtivo ? "foco" : "pausa";
    setFase(faseInicial);
    fimEm.current = null;
    inicioFoco.current = null;
    const dur = faseInicial === "foco" ? focoSeguro : pausaSegura;
    setRestanteMs(dur * 60_000);
    salvarEstado({
      rodando: false,
      fase: faseInicial,
      fimEm: null,
      inicioFoco: null,
      restanteMs: dur * 60_000,
    });
  }

  // aplica uma nova seleção de tempos (não durante a contagem): recalcula a
  // fase inicial (foco se houver foco; senão pausa) e zera o relógio.
  function aplicarSelecao(f: number | null, p: number | null) {
    setFocoMin(f);
    setPausaMin(p);
    setAviso(null);
    setRodando(false);
    const faseInicial: Fase = f !== null ? "foco" : "pausa";
    setFase(faseInicial);
    fimEm.current = null;
    inicioFoco.current = null;
    const dur = (faseInicial === "foco" ? f : p) ?? settings.pomodoro_foco_min;
    setRestanteMs(dur * 60_000);
    salvarEstado({
      focoMin: f,
      pausaMin: p,
      fase: faseInicial,
      rodando: false,
      fimEm: null,
      inicioFoco: null,
      restanteMs: dur * 60_000,
    });
  }

  function precisaDeUm() {
    setAviso("Selecione ao menos um tempo (foco ou pausa).");
  }

  // clicar na trilha seleciona; clicar de novo DESMARCA
  function alternarTrilha(id: string) {
    if (rodando && fase === "foco") return; // não troca no meio de um foco
    const nova = trilhaId === id ? null : id;
    setTrilhaId(nova);
    salvarEstado({ trilhaId: nova });
  }

  // clicar num tempo de foco: seleciona; clicar no já selecionado DESMARCA
  function escolherFoco(min: number) {
    if (rodando) return;
    if (focoMin === min) {
      if (pausaMin === null) return precisaDeUm();
      aplicarSelecao(null, pausaMin);
    } else {
      aplicarSelecao(min, pausaMin);
    }
  }

  function escolherFocoCustom() {
    if (rodando) return;
    if (focoCustom) {
      if (pausaMin === null) return precisaDeUm();
      aplicarSelecao(null, pausaMin);
      return;
    }
    const valor = prompt("Minutos de foco:", "35");
    const min = valor ? parseInt(valor, 10) : NaN;
    if (min > 0) aplicarSelecao(min, pausaMin);
  }

  function escolherPausa(min: number) {
    if (rodando) return;
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
      ? "modo automático · foco → pausa"
      : focoAtivo
        ? "só foco · conta e para"
        : "só pausa · conta e para";

  return (
    <section className="cartao flex flex-col p-[clamp(16px,1.8vw,24px)] max-md:order-1">
      <div className="flex items-center justify-between">
        <h2 className="text-[13px] font-semibold text-tinta2">Foco</h2>
        {userId && (
          <button
            onClick={() => setConfigAberta(true)}
            className="cursor-pointer text-[15px] text-tinta2 hover:text-tinta"
            title="Tempos do pomodoro"
          >
            ⚙
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col items-center justify-center py-[clamp(8px,2vh,20px)]">
        {/* seletor de trilha — vidro fosco + nome na cor da trilha */}
        <div className={`${segFundo} w-full max-w-[420px]`}>
          {trilhas.map((t) => {
            const selecionada = trilhaId === t.id;
            return (
              <button
                key={t.id}
                onClick={() => alternarTrilha(t.id)}
                className={`com-cor ${segBotao} ${selecionada ? segBotaoOn : ""}`}
                style={
                  {
                    "--cor": t.cor,
                    ...(selecionada
                      ? { color: "var(--cor-texto)", ...vidroBlur }
                      : {}),
                  } as React.CSSProperties
                }
                title={
                  selecionada
                    ? "Clique para desmarcar (foco sem registro)"
                    : `Registrar o foco em ${t.nome}`
                }
              >
                {t.nome}
              </button>
            );
          })}
        </div>

        <div className="my-[clamp(14px,3.5vh,36px)] text-[clamp(56px,min(13vh,10vw),120px)] font-extralight leading-none tabular-nums tracking-[-0.01em] text-tinta">
          {String(minutos).padStart(2, "0")}:{String(segundos).padStart(2, "0")}
        </div>

        <div className="flex w-full max-w-[400px] flex-col gap-[10px]">
          <div className="flex items-center gap-3">
            <span
              className={`w-11 shrink-0 text-right text-[13px] ${
                focoAtivo ? "font-medium text-tinta" : "text-tinta2"
              }`}
            >
              foco
            </span>
            <div className={`${segFundo} flex-1`}>
              {FOCO_FIXOS.map((min) => (
                <button
                  key={min}
                  onClick={() => escolherFoco(min)}
                  className={`${segBotao} ${focoMin === min ? segBotaoOn : ""}`}
                  style={focoMin === min ? vidroBlur : undefined}
                >
                  {min}
                </button>
              ))}
              <button
                onClick={escolherFocoCustom}
                className={`${segBotao} ${focoCustom ? segBotaoOn : ""}`}
                style={focoCustom ? vidroBlur : undefined}
                title="Foco personalizado"
              >
                {focoCustom ? focoMin : "✎"}
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`w-11 shrink-0 text-right text-[13px] ${
                pausaAtivo ? "font-medium text-tinta" : "text-tinta2"
              }`}
            >
              pausa
            </span>
            <div className={`${segFundo} flex-1`}>
              {[5, 10, 15].map((min) => (
                <button
                  key={min}
                  onClick={() => escolherPausa(min)}
                  className={`${segBotao} ${pausaMin === min ? segBotaoOn : ""}`}
                  style={pausaMin === min ? vidroBlur : undefined}
                >
                  {min}
                </button>
              ))}
            </div>
          </div>
          <div className="text-center text-[11px] text-tinta2">{modoTexto}</div>
        </div>

        <div className="mt-[clamp(14px,3.5vh,28px)] flex items-center gap-3">
          <button
            onClick={iniciarOuPausar}
            className="cursor-pointer rounded-full bg-acao px-11 py-[13px] text-[16px] font-semibold text-white transition-[transform,opacity] hover:opacity-90 active:scale-[.97]"
          >
            {rodando ? "⏸ Pausar" : "▶ Iniciar"}
          </button>
          <button
            onClick={resetar}
            title="Zerar (descarta o ciclo atual)"
            className="h-12 w-12 cursor-pointer rounded-full border border-hairline text-[17px] text-tinta2"
          >
            ↻
          </button>
        </div>

        {aviso && (
          <div className="mt-4 text-center text-[12px] text-tinta2">{aviso}</div>
        )}
      </div>

      {userId && (
        <ModalConfigPomodoro
          aberto={configAberta}
          onFechar={() => setConfigAberta(false)}
          settings={settings}
          userId={userId}
        />
      )}
    </section>
  );
}
