import { describe, expect, it } from "vitest";
import {
  blocoConcluido,
  blocoDesbloqueado,
  contarObrigatorios,
  progressoDaTrilha,
  progressoDoBloco,
  type ItemProgresso,
} from "@/lib/progress";

// helper: cria n itens do mesmo tipo, `feitos` deles marcados
function itens(
  tipo: ItemProgresso["tipo"],
  total: number,
  feitos: number
): ItemProgresso[] {
  return Array.from({ length: total }, (_, i) => ({
    tipo,
    feito: i < feitos,
  }));
}

describe("progressoDoBloco — regra 30/70", () => {
  it("bloco zerado = 0%", () => {
    const bloco = [...itens("concept", 10, 0), ...itens("project", 1, 0)];
    expect(progressoDoBloco(bloco)).toBe(0);
  });

  it("todos os conceitos sem projeto = 70%", () => {
    const bloco = [...itens("concept", 10, 10), ...itens("project", 1, 0)];
    expect(progressoDoBloco(bloco)).toBeCloseTo(0.7);
  });

  it("só o projeto = 30%", () => {
    const bloco = [...itens("concept", 10, 0), ...itens("project", 1, 1)];
    expect(progressoDoBloco(bloco)).toBeCloseTo(0.3);
  });

  it("metade dos conceitos + projeto = 65%", () => {
    const bloco = [...itens("concept", 10, 5), ...itens("project", 1, 1)];
    expect(progressoDoBloco(bloco)).toBeCloseTo(0.35 + 0.3);
  });

  it("review conta junto com concept nos 70%", () => {
    const bloco = [
      ...itens("concept", 3, 3),
      ...itens("review", 1, 0), // 3 de 4 obrigatórios feitos
      ...itens("project", 1, 0),
    ];
    expect(progressoDoBloco(bloco)).toBeCloseTo(0.7 * (3 / 4));
  });

  it("opcional NÃO altera a porcentagem (critério de aceite nº 4)", () => {
    const semOpcional = [...itens("concept", 4, 2), ...itens("project", 1, 0)];
    const comOpcional = [...semOpcional, ...itens("optional", 3, 3)];
    expect(progressoDoBloco(comOpcional)).toBe(progressoDoBloco(semOpcional));
  });

  it("bloco SEM projeto: obrigatórios dividem 100% (IA Etapas 0/1/3)", () => {
    expect(progressoDoBloco(itens("concept", 4, 2))).toBeCloseTo(0.5);
    expect(progressoDoBloco(itens("concept", 4, 4))).toBe(1);
  });

  it("bloco só com projeto: projeto vale 100%", () => {
    expect(progressoDoBloco(itens("project", 1, 1))).toBe(1);
  });

  it("bloco 100% completo = 100%", () => {
    const bloco = [
      ...itens("concept", 7, 7),
      ...itens("review", 2, 2),
      ...itens("project", 1, 1),
      ...itens("optional", 2, 0), // opcionais em aberto não impedem
    ];
    expect(progressoDoBloco(bloco)).toBe(1);
  });
});

describe("blocoConcluido — desbloqueio do próximo", () => {
  it("exige todos os obrigatórios + projeto", () => {
    const quaseTudo = [...itens("concept", 5, 5), ...itens("project", 1, 0)];
    expect(blocoConcluido(quaseTudo)).toBe(false);

    const tudo = [...itens("concept", 5, 5), ...itens("project", 1, 1)];
    expect(blocoConcluido(tudo)).toBe(true);
  });

  it("opcionais em aberto não seguram a conclusão", () => {
    const bloco = [
      ...itens("concept", 2, 2),
      ...itens("project", 1, 1),
      ...itens("optional", 4, 0),
    ];
    expect(blocoConcluido(bloco)).toBe(true);
  });
});

describe("progressoDaTrilha — média ponderada", () => {
  it("pondera pelo nº de itens obrigatórios de cada bloco", () => {
    // bloco A: 9 obrigatórios + 1 projeto (peso 10), 100% completo
    const blocoA = [...itens("concept", 9, 9), ...itens("project", 1, 1)];
    // bloco B: 4 obrigatórios + 1 projeto (peso 5), 0%
    const blocoB = [...itens("concept", 4, 0), ...itens("project", 1, 0)];

    expect(contarObrigatorios(blocoA)).toBe(10);
    expect(contarObrigatorios(blocoB)).toBe(5);
    // (1.0 * 10 + 0 * 5) / 15
    expect(progressoDaTrilha([blocoA, blocoB])).toBeCloseTo(10 / 15);
  });

  it("trilha vazia = 0%", () => {
    expect(progressoDaTrilha([])).toBe(0);
  });
});

describe("blocoDesbloqueado — sequencial + pré-requisito cruzado", () => {
  const semPrereq = { prereq_block_id: null, cross_prereq_block_id: null };
  const aposBloco1 = { prereq_block_id: "b1", cross_prereq_block_id: null };
  const iaEtapa2 = { prereq_block_id: "ia1", cross_prereq_block_id: "dev2" };

  it("sem pré-requisito, começa aberto", () => {
    expect(blocoDesbloqueado(semPrereq, new Set())).toBe(true);
  });

  it("sequencial: só abre com o anterior concluído", () => {
    expect(blocoDesbloqueado(aposBloco1, new Set())).toBe(false);
    expect(blocoDesbloqueado(aposBloco1, new Set(["b1"]))).toBe(true);
  });

  it("cruzado: IA Etapa 2 exige Etapa 1 E Dev Bloco 2", () => {
    expect(blocoDesbloqueado(iaEtapa2, new Set(["ia1"]))).toBe(false);
    expect(blocoDesbloqueado(iaEtapa2, new Set(["dev2"]))).toBe(false);
    expect(blocoDesbloqueado(iaEtapa2, new Set(["ia1", "dev2"]))).toBe(true);
  });
});
