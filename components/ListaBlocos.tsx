"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  blocoConcluido,
  blocoDesbloqueado,
  progressoDoBloco,
  type ItemProgresso,
} from "@/lib/progress";
import type { Block, Item, ItemGroup } from "@/lib/types";
import { BarraProgresso } from "./BarraProgresso";

export type BlocoTela = Block & {
  prereqRotulo: string | null;
  crossRotulo: string | null;
  grupos: (ItemGroup & { itens: Item[] })[];
};

// Lista de blocos da trilha. Marca/desmarca com update OTIMISTA: o estado
// local muda na hora (barras e desbloqueio recalculam via lib/progress) e o
// Supabase persiste em seguida — se falhar, reverte.
export function ListaBlocos({
  blocos,
  feitosIniciais,
  concluidosForaDaTrilha,
  cor,
  userId,
}: {
  blocos: BlocoTela[];
  feitosIniciais: string[];
  concluidosForaDaTrilha: string[];
  cor: string;
  userId: string;
}) {
  const router = useRouter();
  const [feitos, setFeitos] = useState(() => new Set(feitosIniciais));
  const [expandidos, setExpandidos] = useState<Set<string>>(() => {
    // começa com o primeiro bloco ainda não concluído aberto
    const inicial = calcularEstado(blocos, new Set(feitosIniciais), concluidosForaDaTrilha);
    const primeiro = blocos.find((b) => {
      const info = inicial.get(b.id);
      return info && info.desbloqueado && !info.concluido;
    });
    return new Set(primeiro ? [primeiro.id] : []);
  });

  const estado = calcularEstado(blocos, feitos, concluidosForaDaTrilha);

  function alternarExpandido(blocoId: string) {
    const novos = new Set(expandidos);
    if (novos.has(blocoId)) novos.delete(blocoId);
    else novos.add(blocoId);
    setExpandidos(novos);
  }

  async function alternarItem(item: Item, bloqueado: boolean) {
    if (bloqueado) return;

    const estavaMarcado = feitos.has(item.id);
    const novos = new Set(feitos);
    if (estavaMarcado) novos.delete(item.id);
    else novos.add(item.id);
    setFeitos(novos); // otimista: a tela responde antes do banco

    const supabase = createClient();
    const { error } = estavaMarcado
      ? await supabase
          .from("user_checks")
          .delete()
          .eq("user_id", userId)
          .eq("item_id", item.id)
      : await supabase
          .from("user_checks")
          .insert({ user_id: userId, item_id: item.id });

    if (error) {
      setFeitos(feitos); // deu ruim → volta como estava
    } else {
      router.refresh(); // mantém o % do dashboard em dia ao voltar
    }
  }

  return (
    <div>
      {blocos.map((bloco) => {
        const info = estado.get(bloco.id)!;
        const bloqueado = !info.desbloqueado;
        const aberto = expandidos.has(bloco.id);

        // só mostra os pré-requisitos que ainda FALTAM
        const faltando = [
          !info.prereqOk ? bloco.prereqRotulo : null,
          !info.crossOk ? bloco.crossRotulo : null,
        ].filter(Boolean);

        return (
          <div
            key={bloco.id}
            className={`mb-3 rounded-xl border border-borda bg-cartao ${
              bloqueado ? "opacity-55 grayscale" : ""
            }`}
          >
            <button
              onClick={() => alternarExpandido(bloco.id)}
              className="w-full cursor-pointer p-[14px] text-left"
            >
              <div className="mb-1 flex items-baseline justify-between gap-2">
                <span className="text-[13px] font-medium text-texto">
                  <span className="mr-1 text-apagado">{aberto ? "▾" : "▸"}</span>
                  {bloqueado && "🔒 "}
                  {bloco.titulo}
                </span>
                <span className="shrink-0 text-[12px] text-suave">
                  {Math.round(info.progresso * 100)}%
                </span>
              </div>
              <BarraProgresso fracao={info.progresso} cor={cor} />
              {bloco.semanas_estimadas && (
                <div className="mt-1 text-[11px] text-apagado">
                  {bloco.semanas_estimadas}
                </div>
              )}
            </button>

            {bloqueado && faltando.length > 0 && (
              <div className="px-[14px] pb-3 text-[11px] text-suave">
                antes de começar: conclua {faltando.join(" e ")}
              </div>
            )}

            {aberto && (
              <div className="border-t border-borda px-[14px] pb-[14px]">
                {bloco.descricao && (
                  <p className="pt-3 text-[11px] text-suave">
                    {bloco.descricao}
                  </p>
                )}
                {bloco.grupos.map((grupo) => (
                  <div key={grupo.id} className="pt-3">
                    <div className="mb-1 text-[12px] font-medium text-suave">
                      {grupo.titulo}
                    </div>
                    {grupo.itens.map((item) => (
                      <LinhaItem
                        key={item.id}
                        item={item}
                        marcado={feitos.has(item.id)}
                        bloqueado={bloqueado}
                        cor={cor}
                        onAlternar={() => alternarItem(item, bloqueado)}
                      />
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// progresso + desbloqueio de cada bloco a partir do estado atual dos checks
function calcularEstado(
  blocos: BlocoTela[],
  feitos: Set<string>,
  concluidosForaDaTrilha: string[]
) {
  const itensDoBloco = new Map(
    blocos.map((b) => [
      b.id,
      b.grupos.flatMap((g) =>
        g.itens.map(
          (i): ItemProgresso => ({ tipo: i.tipo, feito: feitos.has(i.id) })
        )
      ),
    ])
  );

  const concluidos = new Set(concluidosForaDaTrilha);
  for (const b of blocos) {
    if (blocoConcluido(itensDoBloco.get(b.id)!)) concluidos.add(b.id);
  }

  return new Map(
    blocos.map((b) => {
      const prereqOk = !b.prereq_block_id || concluidos.has(b.prereq_block_id);
      const crossOk =
        !b.cross_prereq_block_id || concluidos.has(b.cross_prereq_block_id);
      return [
        b.id,
        {
          progresso: progressoDoBloco(itensDoBloco.get(b.id)!),
          concluido: concluidos.has(b.id),
          desbloqueado: blocoDesbloqueado(b, concluidos),
          prereqOk,
          crossOk,
        },
      ];
    })
  );
}

// Uma linha de item, com o visual do seu tipo:
// concept = check normal · review = badge "faculdade" ·
// optional = apagado + "não conta" · project = destaque com 🏗️
function LinhaItem({
  item,
  marcado,
  bloqueado,
  cor,
  onAlternar,
}: {
  item: Item;
  marcado: boolean;
  bloqueado: boolean;
  cor: string;
  onAlternar: () => void;
}) {
  const ehProjeto = item.tipo === "project";
  const ehOpcional = item.tipo === "optional";

  return (
    <label
      className={`flex items-start gap-2 py-[3px] ${
        bloqueado ? "cursor-not-allowed" : "cursor-pointer"
      } ${
        ehProjeto
          ? "my-1 rounded-lg border-l-2 bg-moldura p-2"
          : ""
      }`}
      style={ehProjeto ? { borderLeftColor: cor } : undefined}
    >
      <input
        type="checkbox"
        checked={marcado}
        disabled={bloqueado}
        onChange={onAlternar}
        className="mt-[3px] shrink-0"
        style={{ accentColor: cor }}
      />
      <span className="min-w-0">
        <span
          className={`text-[13px] ${
            ehOpcional
              ? "text-apagado"
              : ehProjeto
                ? "font-semibold text-texto"
                : "text-texto"
          } ${marcado && !ehProjeto ? "line-through opacity-70" : ""}`}
        >
          {ehProjeto && "🏗️ "}
          {item.titulo}
        </span>
        {item.tipo === "review" && (
          <span className="ml-2 rounded-[10px] border border-borda px-[6px] py-[1px] text-[10px] text-suave">
            faculdade
          </span>
        )}
        {ehOpcional && (
          <span className="ml-2 rounded-[10px] border border-borda px-[6px] py-[1px] text-[10px] text-apagado">
            não conta
          </span>
        )}
        {item.descricao && (
          <span
            className={`block text-[11px] ${
              ehOpcional ? "text-apagado" : "text-suave"
            }`}
          >
            {item.descricao}
          </span>
        )}
      </span>
    </label>
  );
}
