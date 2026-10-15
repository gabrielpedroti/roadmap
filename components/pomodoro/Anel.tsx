import type { CSSProperties } from "react";
import { varsDaTrilha } from "@/lib/tons";

// O relógio do Pomodoro: o anel que esvazia com o tempo e, no centro, os
// dígitos e a fase. SÓ desenha; as contas ficam no Pomodoro e em lib/anel.ts.
// Cor do arco (CSS): na cor da trilha escolhida (--cor-viva); sem trilha,
// neutro (--ink-3); na pausa, --ink-2.
export function Anel({
  tempo,
  fase,
  rotuloFase,
  off,
  corDaTrilha,
  subindo,
}: {
  tempo: string; // "MM:SS"
  fase: "foco" | "pausa";
  rotuloFase: string; // "Foco", "Pausa" ou "Pausado"
  off: number; // --off do arco: 0 = cheio, 100 = vazio
  corDaTrilha: string | null; // null = foco sem trilha
  subindo: "mola" | "suave" | null; // somando tempo: o anel SOBE animado
}) {
  // .com-cor e varsDaTrilha no MESMO elemento (regra do projeto)
  const estilo = {
    ...(corDaTrilha ? varsDaTrilha(corDaTrilha) : {}),
    "--off": off.toFixed(2),
  } as CSSProperties;

  return (
    <div
      className={corDaTrilha ? "relogio com-cor" : "relogio"}
      style={estilo}
      data-trilha={corDaTrilha ? "" : undefined}
      data-fase={fase}
      data-subindo={subindo ?? undefined}
    >
      <svg className="anel" viewBox="0 0 120 120" aria-hidden="true">
        <circle className="anel-trilho" cx="60" cy="60" r="56" />
        <circle className="anel-arco" cx="60" cy="60" r="56" pathLength={100} />
      </svg>
      <div className="relogio-centro">
        <div className="relogio-tempo tab" role="timer" aria-label="Tempo restante">
          {tempo}
        </div>
        <div className="relogio-fase">{rotuloFase}</div>
      </div>
    </div>
  );
}
