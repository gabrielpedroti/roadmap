// Regras de EXIBIÇÃO da tela de trilha (as de progresso e desbloqueio ficam
// em lib/progress.ts, intocadas). Funções puras, com testes.
import type { Fonte, ItemTipo } from "./types";

export type EstadoDoBloco = { desbloqueado: boolean; concluido: boolean };

// Qual bloco começa escolhido (largo) e aberto (acordeão):
// o primeiro desbloqueado e ainda não concluído. Se nenhum atende:
// - algum desbloqueado (trilha concluída) → o ÚLTIMO bloco;
// - nenhum desbloqueado → o PRIMEIRO bloco.
// Trilha sem blocos → null (a tela mostra só o campo).
export function blocoInicial(
  ids: string[],
  estado: Map<string, EstadoDoBloco>
): string | null {
  if (ids.length === 0) return null;
  const emCurso = ids.find((id) => {
    const e = estado.get(id);
    return !!e && e.desbloqueado && !e.concluido;
  });
  if (emCurso) return emCurso;
  const algumDesbloqueado = ids.some((id) => estado.get(id)?.desbloqueado);
  return algumDesbloqueado ? ids[ids.length - 1] : ids[0];
}

// A tag de um item sai da fonte dele; matéria de faculdade (review) sem
// fonte gravada cai em ADS-PUCPR (regra de sempre)
export function fonteEfetiva(item: { fonte: Fonte | null; tipo: ItemTipo }): Fonte | null {
  return item.fonte ?? (item.tipo === "review" ? "ads-pucpr" : null);
}

// Se TODOS os itens do grupo têm a mesma fonte (não nula), a tag sobe para o
// título do grupo e sai dos itens. Nada é deduzido do título do grupo.
export function fonteDoGrupo(
  itens: { fonte: Fonte | null; tipo: ItemTipo }[]
): Fonte | null {
  if (itens.length === 0) return null;
  const primeira = fonteEfetiva(itens[0]);
  if (!primeira) return null;
  return itens.every((i) => fonteEfetiva(i) === primeira) ? primeira : null;
}

// Texto do "espaço do %" no cabeçalho do bloco e na linha 2 do roteiro.
// Logado: "40%"; bloqueado: "bloqueado" (ou "bloqueado · 40%" se já tem
// progresso, para não esconder o que o campo e a Home continuam somando).
// Visitante: sem %; no cabeçalho vão as semanas (o roteiro já as mostra).
export function textoDoPct(p: {
  logado: boolean;
  bloqueado: boolean;
  progresso: number; // 0..1
  semanas: string | null;
  noRoteiro: boolean;
}): string {
  const pct = Math.round(p.progresso * 100);
  if (!p.logado) {
    if (p.bloqueado) return "bloqueado";
    return p.noRoteiro ? "" : (p.semanas ?? "");
  }
  if (!p.bloqueado) return `${pct}%`;
  return pct > 0 ? `bloqueado · ${pct}%` : "bloqueado";
}
