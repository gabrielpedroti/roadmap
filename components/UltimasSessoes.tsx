"use client";

import { useState } from "react";
import { formatarDuracao, rotuloDataHora } from "@/lib/formato";
import { semEmoji } from "@/lib/texto";
import { varsDaTrilha } from "@/lib/tons";
import type { Sessao } from "@/lib/types";
import { Icone } from "./Icone";

// Rodapé com as últimas sessões. Começa FECHADO — só abre quando o usuário
// clica (decisão do Gabriel). Sem bolinha: o nome da trilha vai no --tom.
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
    <div className="sessoes">
      <button
        type="button"
        className="sessoes-botao"
        aria-expanded={aberto}
        aria-controls="lista-sessoes"
        onClick={() => setAberto(!aberto)}
      >
        <Icone nome="chev-dir" />
        Últimas sessões
      </button>

      <ul className="sessoes-lista" id="lista-sessoes" hidden={!aberto}>
        {!logado && (
          <li className="sessao-vazia">Entre para registrar e ver suas sessões aqui.</li>
        )}
        {logado && sessoes.length === 0 && (
          <li className="sessao-vazia">
            Nenhuma sessão ainda. Conclua um pomodoro ou registre manual.
          </li>
        )}
        {sessoes.map((s) => {
          const trilha = trilhasInfo[s.track_id];
          return (
            <li
              key={s.id}
              className="sessao com-cor"
              style={varsDaTrilha(trilha?.cor ?? "")}
            >
              <span className="sessao-trilha">{trilha ? semEmoji(trilha.nome) : "?"}</span>
              <span className="sessao-dur tab">{formatarDuracao(s.duration_min)}</span>
              <span className="sessao-quando">{rotuloDataHora(s.started_at, hoje)}</span>
              <span className="sessao-orig">{s.origem}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
