import { notFound } from "next/navigation";
import { Abas } from "@/components/Abas";
import { Barra, destinosDasAbas } from "@/components/Barra";
import { ListaBlocos, type BlocoTela } from "@/components/ListaBlocos";
import { carregarPainel } from "@/lib/dados";
import { blocosConcluidos, itensPorBloco } from "@/lib/progress";
import { semEmoji } from "@/lib/texto";
import { varsDaTrilha } from "@/lib/tons";

// Tela de uma trilha. A identidade é a COR da trilha: o campo (cabeçalho)
// pintado nela, com o vidro das abas escuro por cima; o nome do bloco
// escolhido, as barras e os círculos marcados seguem a mesma cor. Os
// blocos são cartões neutros — o contraste mantém a leitura fácil.
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
  // da IA Carreira 2 depende de um bloco da trilha Dev)
  const porBloco = itensPorBloco(blocks, groups, items, feitos);
  const concluidos = blocosConcluidos(porBloco);

  const blocosDaTrilha = blocks
    .filter((b) => b.track_id === trilha.id)
    .sort((a, b) => a.ordem - b.ordem);

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
    // .com-cor e varsDaTrilha no MESMO elemento. data-sobre-campo já nasce
    // aqui (o campo sempre começa debaixo da barra): sem isso as abas
    // piscariam claras a cada carga antes de escurecer
    <div
      className="app com-cor"
      style={varsDaTrilha(trilha.cor)}
      data-app
      data-trilha-app=""
      data-sobre-campo=""
    >
      <Barra email={user?.email ?? null} tracks={tracks} atual={trilha.slug} />
      <main className="conteudo">
        <ListaBlocos
          trilha={{
            nome: semEmoji(trilha.nome),
            descricao: trilha.descricao ? semEmoji(trilha.descricao) : null,
          }}
          blocos={blocosParaTela}
          feitosIniciais={[...feitos]}
          concluidosForaDaTrilha={concluidosForaDaTrilha}
          userId={user?.id ?? null}
        />
      </main>
      <Abas destinos={destinosDasAbas(tracks, trilha.slug)} posicao="pe" />
    </div>
  );
}
