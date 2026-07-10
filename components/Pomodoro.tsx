"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Track, UserSettings } from "@/lib/types";

// Card "Foco" (pomodoro), fiel ao mockup final:
// - seletor de trilha em segmented control; clicar de novo DESMARCA
//   (dá pra estudar por tempo sem registrar em trilha nenhuma)
// - ao CONCLUIR um foco: registra a sessão (se logado E com trilha)
// - pausa não conta como estudo; reset descarta o ciclo atual
// - o estado sobrevive a refresh via localStorage

type Fase = "foco" | "pausa";

type EstadoSalvo = {
  trilhaId: string | null;
  focoMin: number;
  pausaMin: number;
  fase: Fase;
  rodando: boolean;
  fimEm: number | null; // timestamp ms de quando a fase atual termina
  restanteMs: number;
  inicioFoco: string | null; // ISO de quando o foco começou (p/ started_at)
  ciclosFoco: number; // focos concluídos (decide a pausa longa)
};

const CHAVE_STORAGE = "roadmap-pomodoro-v1";

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
  "relative flex min-h-[38px] flex-1 cursor-pointer items-center justify-center gap-[7px] rounded-[8px] border-none bg-transparent px-2 text-[13px] font-medium text-tinta2 transition-colors";
const segBotaoOn = "bg-seg-on font-semibold text-tinta shadow-sm";

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
  const [focoMin, setFocoMin] = useState(settings.pomodoro_foco_min);
  const [pausaMin, setPausaMin] = useState(settings.pausa_curta_min);
  const [fase, setFase] = useState<Fase>("foco");
  const [rodando, setRodando] = useState(false);
  const [restanteMs, setRestanteMs] = useState(
    settings.pomodoro_foco_min * 60_000
  );
  const [aviso, setAviso] = useState<string | null>(null);

  // refs pra valores que o intervalo lê sem re-renderizar
  const fimEm = useRef<number | null>(null);
  const inicioFoco = useRef<string | null>(null);
  const ciclosFoco = useRef(0);
  const restaurado = useRef(false);

  const salvarEstado = useCallback(
    (extra?: Partial<EstadoSalvo>) => {
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
    },
    [trilhaId, focoMin, pausaMin, fase, rodando, restanteMs]
  );

  const registrarSessao = useCallback(
    async (inicioIso: string, duracaoMin: number, naTrilha: string) => {
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
    },
    [userId, router]
  );

  // Fim de um FOCO: registra (se possível), avisa e emenda na pausa
  const concluirFoco = useCallback(() => {
    tocarBip(2);
    ciclosFoco.current += 1;
    const ehPausaLonga =
      ciclosFoco.current % settings.ciclos_ate_pausa_longa === 0;
    const duracao = ehPausaLonga ? settings.pausa_longa_min : pausaMin;

    if (inicioFoco.current && trilhaId && userId) {
      registrarSessao(inicioFoco.current, focoMin, trilhaId);
      setAviso(`✅ Foco concluído e registrado! Pausa de ${duracao} min.`);
    } else if (!userId) {
      setAviso("✅ Foco concluído! Entre para salvar suas sessões.");
    } else {
      setAviso("✅ Foco concluído (sem trilha — não registrado).");
    }
    inicioFoco.current = null;

    setFase("pausa");
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
  }, [settings, pausaMin, focoMin, trilhaId, userId, registrarSessao, salvarEstado]);

  // Fim de uma PAUSA: avisa e espera o usuário iniciar o próximo foco
  const concluirPausa = useCallback(() => {
    tocarBip(1);
    setAviso("⏰ Pausa encerrada — pronto pro próximo foco?");
    setFase("foco");
    setRodando(false);
    fimEm.current = null;
    setRestanteMs(focoMin * 60_000);
    salvarEstado({
      fase: "foco",
      rodando: false,
      fimEm: null,
      restanteMs: focoMin * 60_000,
    });
  }, [focoMin, salvarEstado]);

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
      setFocoMin(salvo.focoMin);
      setPausaMin(salvo.pausaMin);
      ciclosFoco.current = salvo.ciclosFoco ?? 0;
      inicioFoco.current = salvo.inicioFoco;

      if (salvo.rodando && salvo.fimEm) {
        if (salvo.fimEm <= Date.now()) {
          // a fase terminou enquanto a página estava fechada
          if (salvo.fase === "foco" && salvo.inicioFoco && salvo.trilhaId) {
            registrarSessao(salvo.inicioFoco, salvo.focoMin, salvo.trilhaId);
            setAviso("✅ Foco concluído (registrado) com a página fechada.");
          }
          inicioFoco.current = null;
          setFase("foco");
          setRodando(false);
          setRestanteMs(salvo.focoMin * 60_000);
        } else {
          setFase(salvo.fase);
          setRodando(true);
          fimEm.current = salvo.fimEm;
          setRestanteMs(salvo.fimEm - Date.now());
        }
      } else {
        setFase(salvo.fase);
        setRestanteMs(salvo.restanteMs ?? salvo.focoMin * 60_000);
      }
    } catch {
      localStorage.removeItem(CHAVE_STORAGE);
    }
    // roda uma única vez, na montagem
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // O relógio: recalcula a partir de fimEm (não acumula atraso)
  useEffect(() => {
    if (!rodando) return;
    const intervalo = setInterval(() => {
      if (fimEm.current === null) return;
      const resta = fimEm.current - Date.now();
      if (resta <= 0) {
        if (fase === "foco") concluirFoco();
        else concluirPausa();
      } else {
        setRestanteMs(resta);
      }
    }, 500);
    return () => clearInterval(intervalo);
  }, [rodando, fase, concluirFoco, concluirPausa]);

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
    // descarta o foco em andamento (só ciclo CONCLUÍDO conta — SPEC)
    setAviso(null);
    setRodando(false);
    setFase("foco");
    fimEm.current = null;
    inicioFoco.current = null;
    setRestanteMs(focoMin * 60_000);
    salvarEstado({
      rodando: false,
      fase: "foco",
      fimEm: null,
      inicioFoco: null,
      restanteMs: focoMin * 60_000,
    });
  }

  // clicar na trilha seleciona; clicar de novo DESMARCA
  function alternarTrilha(id: string) {
    if (rodando && fase === "foco") return; // não troca no meio de um foco
    const nova = trilhaId === id ? null : id;
    setTrilhaId(nova);
    salvarEstado({ trilhaId: nova });
  }

  function escolherFoco(min: number) {
    if (rodando) return;
    setFocoMin(min);
    if (fase === "foco") setRestanteMs(min * 60_000);
    salvarEstado({
      focoMin: min,
      restanteMs: fase === "foco" ? min * 60_000 : restanteMs,
    });
  }

  function escolherFocoCustom() {
    if (rodando) return;
    const valor = prompt("Minutos de foco:", "35");
    const min = valor ? parseInt(valor, 10) : NaN;
    if (min > 0) escolherFoco(min);
  }

  function escolherPausa(min: number) {
    if (rodando && fase === "pausa") return;
    setPausaMin(min);
    salvarEstado({ pausaMin: min });
  }

  const minutos = Math.floor(Math.ceil(restanteMs / 1000) / 60);
  const segundos = Math.ceil(restanteMs / 1000) % 60;

  return (
    <section className="cartao flex flex-col p-[clamp(16px,1.8vw,24px)] max-md:order-1">
      <h2 className="text-[13px] font-semibold text-tinta2">Foco</h2>

      <div className="flex flex-1 flex-col items-center justify-center py-[clamp(8px,2vh,20px)]">
        {/* seletor de trilha — a selecionada ganha um risquinho da sua cor */}
        <div className={`${segFundo} w-full max-w-[420px]`}>
          {trilhas.map((t) => (
            <button
              key={t.id}
              onClick={() => alternarTrilha(t.id)}
              className={`${segBotao} ${trilhaId === t.id ? segBotaoOn : ""}`}
              title={
                trilhaId === t.id
                  ? "Clique para desmarcar (foco sem registro)"
                  : `Registrar o foco em ${t.nome}`
              }
            >
              {t.nome}
              {trilhaId === t.id && (
                <span
                  className="com-cor absolute bottom-[5px] left-1/2 h-[2px] w-4 -translate-x-1/2 rounded-full"
                  style={
                    {
                      "--cor": t.cor,
                      background: "var(--cor-final)",
                    } as React.CSSProperties
                  }
                />
              )}
            </button>
          ))}
        </div>

        <div className="my-[clamp(16px,4vh,40px)] text-[clamp(56px,min(13vh,10vw),120px)] font-extralight leading-none tabular-nums tracking-[-0.01em] text-tinta">
          {String(minutos).padStart(2, "0")}:{String(segundos).padStart(2, "0")}
        </div>

        <div className="flex w-full max-w-[400px] flex-col gap-[10px]">
          <div className="flex items-center gap-3">
            <span className="w-11 shrink-0 text-right text-[13px] text-tinta2">
              foco
            </span>
            <div className={`${segFundo} flex-1`}>
              {[25, 50, 90].map((min) => (
                <button
                  key={min}
                  onClick={() => escolherFoco(min)}
                  className={`${segBotao} ${focoMin === min ? segBotaoOn : ""}`}
                >
                  {min}
                </button>
              ))}
              <button
                onClick={escolherFocoCustom}
                className={`${segBotao} ${![25, 50, 90].includes(focoMin) ? segBotaoOn : ""}`}
                title="Foco personalizado"
              >
                {![25, 50, 90].includes(focoMin) ? focoMin : "✎"}
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-11 shrink-0 text-right text-[13px] text-tinta2">
              pausa
            </span>
            <div className={`${segFundo} flex-1`}>
              {[5, 10, 15].map((min) => (
                <button
                  key={min}
                  onClick={() => escolherPausa(min)}
                  className={`${segBotao} ${pausaMin === min ? segBotaoOn : ""}`}
                >
                  {min}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-[clamp(16px,4vh,32px)] flex items-center gap-3">
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

        {(aviso || fase === "pausa") && (
          <div className="mt-4 text-center text-[12px] text-tinta2">
            {aviso ?? "pausa · não conta como estudo"}
          </div>
        )}
      </div>
    </section>
  );
}
