"use client";

import { useState } from "react";
import { formatarDiasQueContam, formatarHoras } from "@/lib/formato";
import type { Track, UserSettings } from "@/lib/types";
import { BarraProgresso } from "./BarraProgresso";
import { ModalConfiguracoes } from "./ModalConfiguracoes";
import { ModalRegistroManual } from "./ModalRegistroManual";

// Coluna direita do dashboard. Streak e metas são INDEPENDENTES:
// o foguinho mede constância (mínimo diário), as barras medem volume (h).
export function Constancia({
  streakDias,
  minutosSemana,
  minutosMes,
  settings,
  trilhas,
  userId,
}: {
  streakDias: number;
  minutosSemana: number;
  minutosMes: number;
  settings: UserSettings;
  trilhas: Track[];
  userId: string;
}) {
  const [registroAberto, setRegistroAberto] = useState(false);
  const [configAberta, setConfigAberta] = useState(false);

  const metaSemanalMin = settings.meta_semanal_h * 60;
  const metaMensalMin = settings.meta_mensal_h * 60;

  return (
    <div className="rounded-xl border border-borda bg-cartao p-[14px]">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[12px] text-suave">Constância</span>
        <button
          onClick={() => setConfigAberta(true)}
          className="cursor-pointer text-apagado hover:text-suave"
          title="Configurações"
        >
          ⚙
        </button>
      </div>

      <div className="mb-[10px] text-center">
        <div className="text-[28px]">🔥</div>
        <div className="text-[19px] font-semibold text-texto">
          {streakDias} {streakDias === 1 ? "dia" : "dias"}
        </div>
        <div className="text-[11px] text-apagado">
          mínimo {settings.streak_min_diario_min} min/dia ·{" "}
          {formatarDiasQueContam(settings.dias_que_contam)}
        </div>
      </div>

      <div className="mb-[10px] border-t border-borda pt-[10px]">
        <div className="mb-1 flex justify-between text-[12px]">
          <span className="text-texto">Meta semanal</span>
          <span className="text-suave">
            {formatarHoras(minutosSemana)}/{formatarHoras(metaSemanalMin)}h
          </span>
        </div>
        <div className="mb-[10px]">
          <BarraProgresso fracao={minutosSemana / metaSemanalMin} cor="#5dcaa5" />
        </div>
        <div className="mb-1 flex justify-between text-[12px]">
          <span className="text-texto">Meta mensal</span>
          <span className="text-suave">
            {formatarHoras(minutosMes)}/{formatarHoras(metaMensalMin)}h
          </span>
        </div>
        <BarraProgresso fracao={minutosMes / metaMensalMin} cor="#5dcaa5" />
      </div>

      <button
        onClick={() => setRegistroAberto(true)}
        className="w-full cursor-pointer rounded-lg border border-borda bg-moldura py-[7px] text-[12px] text-texto hover:border-suave"
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
    </div>
  );
}
