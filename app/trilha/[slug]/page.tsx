import Link from "next/link";
import { notFound } from "next/navigation";
import { BarraProgresso } from "@/components/BarraProgresso";
import { Cabecalho } from "@/components/Cabecalho";
import { ListaBlocos, type BlocoTela } from "@/components/ListaBlocos";
import { carregarPainel } from "@/lib/dados";
import {
  blocosConcluidos,
  itensPorBloco,
  progressoDaTrilha,
} from "@/lib/progress";

// Tela de uma trilha. A identidade aqui é a COR da trilha: a página inteira
// ganha um brilho suave dela no topo (.trilha-fundo), o título vem colorido
// e blocos, tags e checkboxes seguem a mesma cor. Os blocos continuam sendo
// cards neutros — o contraste é o que mantém a leitura fácil.
// Visitante sem login VÊ tudo, mas não marca.
export default async function TelaTrilha({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { user, tracks, blocks, groups, items, feitos } =
    await carregarPainel();

  const trilha = tracks.find((t) => t.slug === slug);
  if (!trilha) notFound();

  // conclusão é calculada sobre TODOS os blocos (o pré-requisito cruzado
  // da IA Etapa 2 depende de um bloco da trilha Dev)
  const porBloco = itensPorBloco(blocks, groups, items, feitos);
  const concluidos = blocosConcluidos(porBloco);

  const blocosDaTrilha = blocks
    .filter((b) => b.track_id === trilha.id)
    .sort((a, b) => a.ordem - b.ordem);

  const progressoTotal = progressoDaTrilha(
    blocosDaTrilha.map((b) => porBloco.get(b.id) ?? [])
  );

  // rótulo de um pré-requisito; prefixa a trilha quando é de outra
  function rotuloDoBloco(id: string): string {
    const bloco = blocks.find((b) => b.id === id);
    if (!bloco) return "?";
    const daTrilha = tracks.find((t) => t.id === bloco.track_id);
    return bloco.track_id === trilha!.id
      ? bloco.titulo
      : `${daTrilha?.nome ?? "?"} · ${bloco.titulo}`;
  }

  // monta a estrutura aninhada que o client component consome
  const blocosParaTela: BlocoTela[] = blocosDaTrilha.map((b) => ({
    ...b,
    prereqRotulo: b.prereq_block_id ? rotuloDoBloco(b.prereq_block_id) : null,
    crossRotulo: b.cross_prereq_block_id
      ? rotuloDoBloco(b.cross_prereq_block_id)
      : null,
    grupos: groups
      .filter((g) => g.block_id === b.id)
      .sort((a, b2) => a.ordem - b2.ordem)
      .map((g) => ({
        ...g,
        itens: items
          .filter((i) => i.group_id === g.id)
          .sort((a, b2) => a.ordem - b2.ordem),
      })),
  }));

  // blocos concluídos de OUTRAS trilhas (o client recalcula os desta trilha)
  const idsDaTrilha = new Set(blocosDaTrilha.map((b) => b.id));
  const concluidosForaDaTrilha = [...concluidos].filter(
    (id) => !idsDaTrilha.has(id)
  );

  return (
    <main
      className="trilha-fundo min-h-dvh"
      style={{ "--cor": trilha.cor } as React.CSSProperties}
    >
      <div className="mx-auto flex w-full max-w-[1320px] flex-col px-[clamp(14px,2.5vw,40px)] py-[clamp(12px,2vh,24px)]">
        <Cabecalho
          email={user?.email ?? null}
          tracks={tracks}
          atual={trilha.slug}
        />

        {/* Hero aberto (sem card): título colorido + descrição + progresso */}
        <div
          className="com-cor mb-5 px-1"
          style={{ "--cor": trilha.cor } as React.CSSProperties}
        >
          <div className="mb-2 flex flex-wrap items-end justify-between gap-2">
            <h2
              className="text-[clamp(24px,3.2vw,34px)] font-bold tracking-[-0.02em]"
              style={{ color: "var(--cor-texto)" }}
            >
              {trilha.nome}
            </h2>
            <span
              className="text-[clamp(18px,2vw,22px)] font-semibold tabular-nums"
              style={{ color: user ? "var(--cor-texto)" : "var(--ink-2)" }}
            >
              {user ? `${Math.round(progressoTotal * 100)}%` : ""}
            </span>
          </div>
          {trilha.descricao && (
            <p className="mb-4 max-w-[70ch] text-[14px] leading-relaxed text-tinta2">
              {trilha.descricao}
            </p>
          )}
          <BarraProgresso fracao={user ? progressoTotal : 0} cor={trilha.cor} />
          {!user && (
            <p className="mt-3 text-[12px] text-tinta2">
              Você está no modo visualização.{" "}
              <Link href="/login" className="font-medium text-acao">
                Entre
              </Link>{" "}
              para marcar seu progresso.
            </p>
          )}
        </div>

        <ListaBlocos
          blocos={blocosParaTela}
          feitosIniciais={[...feitos]}
          concluidosForaDaTrilha={concluidosForaDaTrilha}
          cor={trilha.cor}
          userId={user?.id ?? null}
        />
      </div>
    </main>
  );
}
