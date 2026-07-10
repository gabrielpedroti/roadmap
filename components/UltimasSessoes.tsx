"use client";

import { useState } from "react";
import { formatarDuracao, rotuloDataHora } from "@/lib/formato";
import type { Sessao } from "@/lib/types";

// Rodapé colapsável com as últimas sessões.
// Começa FECHADO — só abre quando o usuário clica (decisão do Gabriel).
export function UltimasSessoes({
  logado,
  sessoes,
  trilhasInfo,
  hoje,
}: {
  logado: boolean;
  sessoes: Sessao[];
  trilhasInfo: Record<string, { nome: string; cor: string }>;
  hoje: string;
}) {
  const [aberto, setAberto] = useState(false);

  return (
    <div className="mt-[clamp(10px,1.5vh,16px)] px-2">
      <button
        onClick={() => setAberto(!aberto)}
        className="cursor-pointer py-1 text-[12px] font-semibold text-tinta2 hover:text-tinta"
      >
        {aberto ? "▾" : "▸"} Últimas sessões
      </button>

      {aberto && (
        <div className="pt-1">
          {!logado && (
            <div className="border-t border-hairline py-2 text-[12px] text-tinta2">
              Entre para registrar e ver suas sessões aqui.
            </div>
          )}
          {logado && sessoes.length === 0 && (
            <div className="border-t border-hairline py-2 text-[12px] text-tinta2">
              Nenhuma sessão ainda — conclua um pomodoro ou registre manual.
            </div>
          )}
          {sessoes.map((s) => {
            const trilha = trilhasInfo[s.track_id];
            return (
              <div
                key={s.id}
                className="flex items-center gap-2 border-t border-hairline py-2 text-[13px]"
              >
                <span
                  className="com-cor h-[7px] w-[7px] shrink-0 rounded-full"
                  style={
                    {
                      "--cor": trilha?.cor ?? "#888",
                      background: "var(--cor-final)",
                    } as React.CSSProperties
                  }
                />
                <span className="text-tinta">
                  {rotuloDataHora(s.started_at, hoje)} · {trilha?.nome ?? "?"}
                </span>
                <span className="ml-auto whitespace-nowrap tabular-nums text-tinta2">
                  {formatarDuracao(s.duration_min)} · {s.origem}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
