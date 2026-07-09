"use client";

import { useState } from "react";
import { formatarDuracao, rotuloDataHora } from "@/lib/formato";
import type { Sessao } from "@/lib/types";

// Rodapé discreto e colapsável com as últimas sessões (data, trilha,
// duração, origem) — linha do mockup, abaixo do grid.
export function UltimasSessoes({
  sessoes,
  nomesDasTrilhas,
  hoje,
}: {
  sessoes: Sessao[];
  nomesDasTrilhas: Map<string, string> | Record<string, string>;
  hoje: string;
}) {
  const [aberto, setAberto] = useState(true);
  const nomes =
    nomesDasTrilhas instanceof Map
      ? nomesDasTrilhas
      : new Map(Object.entries(nomesDasTrilhas));

  return (
    <div className="mt-3">
      <button
        onClick={() => setAberto(!aberto)}
        className="flex cursor-pointer items-center gap-[6px] px-[2px] py-1 text-[11px] text-apagado"
      >
        <span>{aberto ? "▾" : "▸"}</span>
        <span>Últimas sessões</span>
      </button>

      {aberto && (
        <div className="pl-5 pr-[2px] pt-[2px]">
          {sessoes.length === 0 && (
            <div className="py-[3px] text-[11px] text-apagado">
              Nenhuma sessão ainda — conclua um pomodoro ou registre manual.
            </div>
          )}
          {sessoes.map((s) => (
            <div
              key={s.id}
              className="flex justify-between py-[3px] text-[11px]"
            >
              <span className="text-suave">
                {rotuloDataHora(s.started_at, hoje)} ·{" "}
                {nomes.get(s.track_id) ?? "?"}
              </span>
              <span className="text-apagado">
                {formatarDuracao(s.duration_min)} · {s.origem}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
