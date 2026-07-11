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
// `userId` null = visitante: tudo visível, checkboxes desabilitados.
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
  userId: string | null;
}) {
  const router = useRouter();
  const [feitos, setFeitos] = useState(() => new Set(feitosIniciais));
  const [expandidos, setExpandidos] = useState<Set<string>>(() => {
    // começa com o primeiro bloco ainda não concluído aberto
    const inicial = calcularEstado(
      blocos,
      new Set(feitosIniciais),
      concluidosForaDaTrilha
    );
    const primeiro = blocos.find((b) => {
      const info = inicial.get(b.id);
      return info && info.desbloqueado && !info.concluido;
    });
    return new Set(primeiro ? [primeiro.id] : []);
  });

  const estado = calcularEstado(blocos, feitos, concluidosForaDaTrilha);
  const somenteLeitura = userId === null;

  function alternarExpandido(blocoId: string) {
    const novos = new Set(expandidos);
    if (novos.has(blocoId)) novos.delete(blocoId);
    else novos.add(blocoId);
    setExpandidos(novos);
  }

  async function alternarItem(item: Item, bloqueado: boolean) {
    if (bloqueado || somenteLeitura) return;

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
          .eq("user_id", userId!)
          .eq("item_id", item.id)
      : await supabase
          .from("user_checks")
          .insert({ user_id: userId!, item_id: item.id });

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
            className={`cartao mb-[10px] ${bloqueado ? "opacity-55 grayscale" : ""}`}
          >
            <button
              onClick={() => alternarExpandido(bloco.id)}
              className="w-full cursor-pointer p-[clamp(13px,1.3vw,18px)] text-left"
            >
              <div className="mb-2 flex items-baseline justify-between gap-2">
                <span className="text-[14px] font-medium text-tinta">
                  <span className="mr-1 text-tinta2">{aberto ? "▾" : "▸"}</span>
                  {bloqueado && "🔒 "}
                  {bloco.titulo}
                </span>
                <span className="shrink-0 text-[13px] tabular-nums text-tinta2">
                  {somenteLeitura ? "—" : `${Math.round(info.progresso * 100)}%`}
                </span>
              </div>
              <BarraProgresso
                fracao={somenteLeitura ? 0 : info.progresso}
                cor={cor}
              />
              {bloco.semanas_estimadas && (
                <div className="mt-2 text-[12px] text-tinta2">
                  {bloco.semanas_estimadas}
                </div>
              )}
            </button>

            {bloqueado && faltando.length > 0 && (
              <div className="px-[clamp(14px,1.6vw,20px)] pb-3 text-[12px] text-tinta2">
                antes de começar: conclua {faltando.join(" e ")}
              </div>
            )}

            {aberto && (
              <div className="border-t border-hairline px-[clamp(14px,1.6vw,20px)] pb-[clamp(14px,1.6vw,20px)]">
                {bloco.descricao && (
                  <p className="pt-3 text-[12px] text-tinta2">
                    {bloco.descricao}
                  </p>
                )}
                {bloco.grupos.map((grupo) => (
                  <div key={grupo.id} className="pt-4">
                    <div className="mb-1 text-[12px] font-semibold text-tinta2">
                      {grupo.titulo}
                    </div>
                    {grupo.itens.map((item) => (
                      <LinhaItem
                        key={item.id}
                        item={item}
                        grupoTitulo={grupo.titulo}
                        marcado={feitos.has(item.id)}
                        desabilitado={bloqueado || somenteLeitura}
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

// Tag colorida (bg suave + texto na cor) ou neutra (borda fina)
function Tag({ texto, cor }: { texto: string; cor?: string }) {
  if (!cor) {
    return (
      <span className="ml-2 rounded-full border border-hairline px-2 py-[2px] align-middle text-[10px] font-medium text-tinta2">
        {texto}
      </span>
    );
  }
  return (
    <span
      className="com-cor ml-2 rounded-full px-2 py-[2px] align-middle text-[10px] font-semibold"
      style={
        {
          "--cor": cor,
          background: "var(--cor-fundo)",
          color: "var(--cor-texto)",
        } as React.CSSProperties
      }
    >
      {texto}
    </span>
  );
}

// Uma linha de item, com o visual do seu tipo:
// concept = check normal · review = tag "ADS PUC-PR" ·
// optional = apagado + tag "opcional" · project = destaque com 🏗️
// Itens da Anthropic Academy (grupo com "Anthropic" no nome) ganham tag.
function LinhaItem({
  item,
  grupoTitulo,
  marcado,
  desabilitado,
  cor,
  onAlternar,
}: {
  item: Item;
  grupoTitulo: string;
  marcado: boolean;
  desabilitado: boolean;
  cor: string;
  onAlternar: () => void;
}) {
  const ehProjeto = item.tipo === "project";
  const ehOpcional = item.tipo === "optional";
  const ehAnthropic = grupoTitulo.includes("Anthropic");

  return (
    <label
      className={`com-cor flex items-start gap-2 py-1 ${
        desabilitado ? "cursor-not-allowed" : "cursor-pointer"
      } ${ehProjeto ? "my-1 rounded-xl bg-fundo p-3" : ""}`}
      style={{ "--cor": cor } as React.CSSProperties}
    >
      <input
        type="checkbox"
        checked={marcado}
        disabled={desabilitado}
        onChange={onAlternar}
        className="mt-[3px] shrink-0"
        style={{ accentColor: "var(--cor-final)" }}
      />
      <span className="min-w-0">
        <span
          className={`text-[13.5px] ${
            ehOpcional
              ? "text-tinta2"
              : ehProjeto
                ? "font-semibold text-tinta"
                : "text-tinta"
          } ${marcado && !ehProjeto ? "line-through opacity-60" : ""}`}
        >
          {ehProjeto && "🏗️ "}
          {item.titulo}
        </span>
        {item.tipo === "review" && <Tag texto="ADS PUC-PR" cor="#9D2235" />}
        {ehAnthropic && <Tag texto="Anthropic" cor="#D97757" />}
        {ehOpcional && <Tag texto="opcional" />}
        {item.descricao && (
          <span className="block text-[12px] text-tinta2">
            {item.descricao}
          </span>
        )}
      </span>
    </label>
  );
}
