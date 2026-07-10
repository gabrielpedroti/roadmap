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

// Tela de uma trilha: blocos com barra própria, expandir → grupos → itens.
// Visitante sem login VÊ tudo (roadmap público), mas não marca checkbox.
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
    <main className="mx-auto flex min-h-dvh w-full max-w-[900px] flex-col px-[clamp(14px,2.5vw,32px)] py-[clamp(12px,2vh,24px)]">
      <Cabecalho
        email={user?.email ?? null}
        volta={{ href: "/", rotulo: "Painel" }}
      />

      <div className="cartao mb-4 p-[clamp(16px,1.8vw,24px)]">
        <div className="mb-2 flex items-baseline justify-between">
          <span className="text-[16px] font-semibold text-tinta">
            {trilha.nome}
          </span>
          <span className="text-[14px] tabular-nums text-tinta2">
            {user ? `${Math.round(progressoTotal * 100)}%` : "—"}
          </span>
        </div>
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
    </main>
  );
}
