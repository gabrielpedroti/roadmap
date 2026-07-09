// Regra de progresso da SPEC (igual em todas as trilhas):
// - item `project` vale 30% do bloco
// - itens `concept` + `review` dividem os 70% restantes em partes iguais
// - itens `optional` NÃO contam (registro pessoal)
// - bloco sem projeto: os obrigatórios dividem 100% (senão nunca fecharia)
//
// Funções puras de propósito: fáceis de testar e de reusar no servidor
// e no navegador (a tela de trilha recalcula tudo a cada checkbox).

import type { ItemTipo } from "./types";

export type ItemProgresso = { tipo: ItemTipo; feito: boolean };

export function progressoDoBloco(itens: ItemProgresso[]): number {
  const obrigatorios = itens.filter(
    (i) => i.tipo === "concept" || i.tipo === "review"
  );
  const projetos = itens.filter((i) => i.tipo === "project");

  if (projetos.length === 0 && obrigatorios.length === 0) return 0;

  const pesoProjeto =
    projetos.length === 0 ? 0 : obrigatorios.length === 0 ? 1 : 0.3;
  const pesoObrigatorios = 1 - pesoProjeto;

  const fracaoObrigatorios =
    obrigatorios.length === 0
      ? 0
      : obrigatorios.filter((i) => i.feito).length / obrigatorios.length;
  const fracaoProjetos =
    projetos.length === 0
      ? 0
      : projetos.filter((i) => i.feito).length / projetos.length;

  return pesoObrigatorios * fracaoObrigatorios + pesoProjeto * fracaoProjetos;
}

// Bloco concluído = 100% dos obrigatórios + projeto (opcionais ignorados)
export function blocoConcluido(itens: ItemProgresso[]): boolean {
  const naoOpcionais = itens.filter((i) => i.tipo !== "optional");
  return naoOpcionais.length > 0 && naoOpcionais.every((i) => i.feito);
}

// Quantos itens contam — usado como peso do bloco na média da trilha
export function contarObrigatorios(itens: ItemProgresso[]): number {
  return itens.filter((i) => i.tipo !== "optional").length;
}

// Progresso da trilha = média dos blocos ponderada pelo nº de obrigatórios
export function progressoDaTrilha(blocos: ItemProgresso[][]): number {
  let somaPesos = 0;
  let soma = 0;
  for (const itens of blocos) {
    const peso = contarObrigatorios(itens);
    somaPesos += peso;
    soma += progressoDoBloco(itens) * peso;
  }
  return somaPesos === 0 ? 0 : soma / somaPesos;
}

// Agrupa os itens por bloco no formato que as funções acima esperam.
// Usado no servidor (dashboard) e no navegador (checkbox otimista).
export function itensPorBloco(
  blocos: { id: string }[],
  grupos: { id: string; block_id: string }[],
  itens: { id: string; group_id: string; tipo: ItemTipo }[],
  feitos: Set<string>
): Map<string, ItemProgresso[]> {
  const grupoParaBloco = new Map(grupos.map((g) => [g.id, g.block_id]));
  const porBloco = new Map<string, ItemProgresso[]>(
    blocos.map((b) => [b.id, []])
  );
  for (const item of itens) {
    const blocoId = grupoParaBloco.get(item.group_id);
    if (!blocoId) continue;
    porBloco.get(blocoId)?.push({ tipo: item.tipo, feito: feitos.has(item.id) });
  }
  return porBloco;
}

// Ids dos blocos 100% concluídos (alimenta o blocoDesbloqueado)
export function blocosConcluidos(
  porBloco: Map<string, ItemProgresso[]>
): Set<string> {
  const concluidos = new Set<string>();
  for (const [id, itens] of porBloco) {
    if (blocoConcluido(itens)) concluidos.add(id);
  }
  return concluidos;
}

// Desbloqueio: exige o bloco anterior da trilha (prereq_block_id) e,
// quando existir, o pré-requisito cruzado de outra trilha
// (caso da SPEC: IA Etapa 2 ← Dev Bloco 2).
export function blocoDesbloqueado(
  bloco: {
    prereq_block_id: string | null;
    cross_prereq_block_id: string | null;
  },
  blocosConcluidos: Set<string>
): boolean {
  const sequencialOk =
    !bloco.prereq_block_id || blocosConcluidos.has(bloco.prereq_block_id);
  const cruzadoOk =
    !bloco.cross_prereq_block_id ||
    blocosConcluidos.has(bloco.cross_prereq_block_id);
  return sequencialOk && cruzadoOk;
}
