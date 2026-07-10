"use client";

import { useState } from "react";
import Link from "next/link";
import { formatarHoras } from "@/lib/formato";
import type { Track, UserSettings } from "@/lib/types";
import { BarraProgresso } from "./BarraProgresso";
import { ModalConfiguracoes } from "./ModalConfiguracoes";
import { ModalRegistroManual } from "./ModalRegistroManual";

// Card de Constância. Streak e metas são INDEPENDENTES:
// o foguinho mede constância (mínimo diário), as barras medem volume.
// REGRA DO FOGO: se hoje ainda não atingiu o mínimo, a chama fica apagada
// (cinza) — ela acende quando o dia é cumprido.
export function Constancia({
  logado,
  streakDias,
  minutosHoje,
  minutosSemana,
  minutosMes,
  settings,
  trilhas,
  userId,
}: {
  logado: boolean;
  streakDias: number;
  minutosHoje: number;
  minutosSemana: number;
  minutosMes: number;
  settings: UserSettings;
  trilhas: Track[];
  userId: string | null;
}) {
  const [registroAberto, setRegistroAberto] = useState(false);
  const [configAberta, setConfigAberta] = useState(false);

  // visitante: card em modo convite
  if (!logado || !userId) {
    return (
      <section className="cartao flex flex-1 flex-col p-[clamp(16px,1.8vw,24px)]">
        <h2 className="text-[13px] font-semibold text-tinta2">Constância</h2>
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
          <div className="text-[44px] opacity-35 grayscale">🔥</div>
          <p className="max-w-[220px] text-[13px] text-tinta2">
            Streak diário e metas de horas ficam salvos na sua conta.
          </p>
          <Link
            href="/login"
            className="rounded-xl bg-acao-tinta px-6 py-3 text-[14px] font-semibold text-acao"
          >
            Entrar para acompanhar
          </Link>
        </div>
      </section>
    );
  }

  const chamaAcesa = minutosHoje >= settings.streak_min_diario_min;
  const metaSemanalMin = settings.meta_semanal_h * 60;
  const metaMensalMin = settings.meta_mensal_h * 60;

  return (
    <section className="cartao flex flex-1 flex-col p-[clamp(16px,1.8vw,24px)]">
      <div className="flex items-center justify-between">
        <h2 className="text-[13px] font-semibold text-tinta2">Constância</h2>
        <button
          onClick={() => setConfigAberta(true)}
          className="cursor-pointer text-[15px] text-tinta2 hover:text-tinta"
          title="Configurações"
        >
          ⚙
        </button>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-[clamp(12px,2.5vh,24px)]">
        {/* foguinho grande + dias grandes (apaga se hoje não cumpriu) */}
        <div className="text-center">
          <div
            className={`text-[clamp(34px,4.5vh,44px)] leading-none ${
              chamaAcesa ? "" : "opacity-35 grayscale"
            }`}
            title={
              chamaAcesa
                ? "Mínimo de hoje cumprido!"
                : "Estude o mínimo de hoje para acender a chama"
            }
          >
            🔥
          </div>
          <div className="mt-1 text-[clamp(22px,3vh,28px)] font-semibold tabular-nums text-tinta">
            {streakDias} {streakDias === 1 ? "dia" : "dias"}
          </div>
        </div>

        <div className="border-t border-hairline pt-[clamp(10px,2vh,16px)]">
          <div className="mb-[6px] flex justify-between text-[14px]">
            <span className="text-tinta">Semana</span>
            <span className="tabular-nums text-tinta2">
              {formatarHoras(minutosSemana)} / {formatarHoras(metaSemanalMin)}h
            </span>
          </div>
          <BarraProgresso fracao={minutosSemana / metaSemanalMin} />
          <div className="mt-[clamp(10px,2vh,16px)] mb-[6px] flex justify-between text-[14px]">
            <span className="text-tinta">Mês</span>
            <span className="tabular-nums text-tinta2">
              {formatarHoras(minutosMes)} / {formatarHoras(metaMensalMin)}h
            </span>
          </div>
          <BarraProgresso fracao={minutosMes / metaMensalMin} />
        </div>
      </div>

      <button
        onClick={() => setRegistroAberto(true)}
        className="w-full cursor-pointer rounded-xl bg-acao-tinta py-3 text-[14px] font-semibold text-acao"
      >
        + Registrar manual
      </button>

      <ModalRegistroManual
        aberto={registroAberto}
        onFechar={() => setRegistroAberto(false)}
        trilhas={trilhas}
        userId={userId}
      />
      <ModalConfiguracoes
        aberto={configAberta}
        onFechar={() => setConfigAberta(false)}
        settings={settings}
        userId={userId}
      />
    </section>
  );
}
