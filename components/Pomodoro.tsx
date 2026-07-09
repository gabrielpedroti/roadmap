"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Track, UserSettings } from "@/lib/types";
import { ModalConfiguracoes } from "./ModalConfiguracoes";

// Pomodoro do centro do dashboard (fiel ao mockup):
// seletor de trilha ACIMA do display, chips de foco e pausa, Iniciar/reset.
// Ao CONCLUIR um ciclo de foco a sessão é registrada sozinha; pausa não
// conta como estudo; reset no meio descarta o tempo (decisão do plano).

type Fase = "foco" | "pausa";

// O que sobrevive a um refresh da página (guardado no localStorage)
type EstadoSalvo = {
  trilhaId: string;
  focoMin: number;
  pausaMin: number;
  fase: Fase;
  rodando: boolean;
  fimEm: number | null; // timestamp ms de quando a fase atual termina
  restanteMs: number;
  inicioFoco: string | null; // ISO de quando o foco começou (p/ started_at)
  ciclosFoco: number; // quantos focos concluídos (decide a pausa longa)
};

const CHAVE_STORAGE = "painel-pomodoro-v1";

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
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.5 + 0.4);
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
  userId: string;
}) {
  const router = useRouter();

  const [trilhaId, setTrilhaId] = useState(trilhas[0]?.id ?? "");
  const [focoMin, setFocoMin] = useState(settings.pomodoro_foco_min);
  const [pausaMin, setPausaMin] = useState(settings.pausa_curta_min);
  const [fase, setFase] = useState<Fase>("foco");
  const [rodando, setRodando] = useState(false);
  const [restanteMs, setRestanteMs] = useState(settings.pomodoro_foco_min * 60_000);
  const [aviso, setAviso] = useState<string | null>(null);
  const [configAberta, setConfigAberta] = useState(false);

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
    async (inicioIso: string, duracaoMin: number) => {
      const supabase = createClient();
      const { error } = await supabase.from("sessions").insert({
        user_id: userId,
        track_id: trilhaId,
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
    [userId, trilhaId, router]
  );

  // Fim de um FOCO: registra, avisa e emenda na pausa automaticamente
  const concluirFoco = useCallback(() => {
    tocarBip(2);
    ciclosFoco.current += 1;
    const ehPausaLonga =
      ciclosFoco.current % settings.ciclos_ate_pausa_longa === 0;
    const duracao = ehPausaLonga ? settings.pausa_longa_min : pausaMin;

    if (inicioFoco.current) {
      registrarSessao(inicioFoco.current, focoMin);
    }
    inicioFoco.current = null;

    setAviso(
      `✅ Foco concluído e registrado! ${ehPausaLonga ? "Pausa longa" : "Pausa"} de ${duracao} min.`
    );
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
  }, [settings, pausaMin, focoMin, registrarSessao, salvarEstado]);

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
          if (salvo.fase === "foco" && salvo.inicioFoco) {
            registrarSessao(salvo.inicioFoco, salvo.focoMin);
            inicioFoco.current = null;
            setAviso("✅ Foco concluído (registrado) enquanto a página estava fechada.");
          }
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

  // O relógio: recalcula a partir de fimEm (não acumula atraso de setInterval)
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
    salvarEstado({ rodando: true, fimEm: fimEm.current, inicioFoco: inicioFoco.current });
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

  function escolherFoco(min: number) {
    if (rodando) return; // não troca no meio de um ciclo
    setFocoMin(min);
    if (fase === "foco") setRestanteMs(min * 60_000);
    salvarEstado({ focoMin: min, restanteMs: fase === "foco" ? min * 60_000 : restanteMs });
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
  const chipFoco = "cursor-pointer rounded-[14px] border px-[11px] py-[3px] text-[12px]";
  const chipOn = "border-borda bg-borda text-texto";
  const chipOff = "border-borda bg-moldura text-suave";

  return (
    <div className="flex flex-col items-center rounded-xl border border-borda bg-cartao p-[14px]">
      <select
        value={trilhaId}
        onChange={(e) => {
          setTrilhaId(e.target.value);
          salvarEstado({ trilhaId: e.target.value });
        }}
        disabled={rodando && fase === "foco"}
        className="mb-2 w-full rounded-lg border border-borda bg-moldura px-[10px] py-[7px] text-[13px] text-texto"
      >
        {trilhas.map((t) => (
          <option key={t.id} value={t.id}>
            {t.nome}
          </option>
        ))}
      </select>

      <div className="my-1 text-[52px] font-semibold leading-[1.1] tracking-[2px] text-texto">
        {String(minutos).padStart(2, "0")}:{String(segundos).padStart(2, "0")}
      </div>
      <div className="mb-2 text-[11px] text-apagado">
        {fase === "foco"
          ? "foco · a sessão é registrada ao concluir"
          : "pausa · não conta como estudo"}
      </div>

      <div className="mb-[6px] flex items-center gap-[6px]">
        <span className="w-[38px] text-right text-[11px] text-suave">foco</span>
        {[25, 50, 90].map((min) => (
          <button
            key={min}
            onClick={() => escolherFoco(min)}
            className={`${chipFoco} ${focoMin === min ? chipOn : chipOff}`}
          >
            {min}
          </button>
        ))}
        <button
          onClick={escolherFocoCustom}
          className={`${chipFoco} ${![25, 50, 90].includes(focoMin) ? chipOn : chipOff}`}
          title="Foco personalizado"
        >
          {![25, 50, 90].includes(focoMin) ? focoMin : "✎"}
        </button>
      </div>

      <div className="mb-[10px] flex items-center gap-[6px]">
        <span className="w-[38px] text-right text-[11px] text-suave">pausa</span>
        {[5, 10, 15].map((min) => (
          <button
            key={min}
            onClick={() => escolherPausa(min)}
            className={`${chipFoco} ${pausaMin === min ? chipOn : chipOff}`}
          >
            {min}
          </button>
        ))}
        <button
          onClick={() => setConfigAberta(true)}
          className="cursor-pointer text-[11px] text-apagado hover:text-suave"
          title="Configurar pausa longa"
        >
          longa {settings.pausa_longa_min} a cada {settings.ciclos_ate_pausa_longa} ⚙
        </button>
      </div>

      <div className="flex gap-2">
        <button
          onClick={iniciarOuPausar}
          className="cursor-pointer rounded-lg bg-texto px-[22px] py-2 text-[13px] font-semibold text-moldura"
        >
          {rodando ? "⏸ Pausar" : "▶ Iniciar"}
        </button>
        <button
          onClick={resetar}
          title="Zerar (descarta o ciclo atual)"
          className="cursor-pointer rounded-lg border border-borda bg-moldura px-3 py-2 text-[13px] text-suave"
        >
          ↻
        </button>
      </div>

      {aviso && (
        <div className="mt-3 text-center text-[11px] text-suave">{aviso}</div>
      )}

      <ModalConfiguracoes
        aberto={configAberta}
        onFechar={() => setConfigAberta(false)}
        settings={settings}
        userId={userId}
      />
    </div>
  );
}
