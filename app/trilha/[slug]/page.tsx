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
    <main className="flex justify-center px-4 py-10">
      <div className="w-full max-w-[720px] rounded-2xl border border-borda-suave bg-moldura p-[18px]">
        <Cabecalho
          email={user.email ?? ""}
          volta={{ href: "/", rotulo: "Painel" }}
        />

        <div className="mb-4 rounded-xl border border-borda bg-cartao p-[14px]">
          <div className="mb-1 flex items-baseline justify-between">
            <span className="text-[15px] font-semibold text-texto">
              {trilha.nome}
            </span>
            <span className="text-[13px] text-suave">
              {Math.round(progressoTotal * 100)}%
            </span>
          </div>
          <BarraProgresso fracao={progressoTotal} cor={trilha.cor} />
        </div>

        <ListaBlocos
          blocos={blocosParaTela}
          feitosIniciais={[...feitos]}
          concluidosForaDaTrilha={concluidosForaDaTrilha}
          cor={trilha.cor}
          userId={user.id}
        />
      </div>
    </main>
  );
}
