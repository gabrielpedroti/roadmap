import { describe, expect, it } from "vitest";
import { blocoInicial, fonteDoGrupo, fonteEfetiva, textoDoPct } from "@/lib/blocos";

const e = (desbloqueado: boolean, concluido: boolean) => ({ desbloqueado, concluido });

describe("blocoInicial", () => {
  const ids = ["b1", "b2", "b3"];
  it("primeiro desbloqueado e não concluído", () => {
    const est = new Map([["b1", e(true, true)], ["b2", e(true, false)], ["b3", e(false, false)]]);
    expect(blocoInicial(ids, est)).toBe("b2");
  });
  it("trilha concluída: o último bloco", () => {
    const est = new Map([["b1", e(true, true)], ["b2", e(true, true)], ["b3", e(true, true)]]);
    expect(blocoInicial(ids, est)).toBe("b3");
  });
  it("nenhum desbloqueado: o primeiro bloco", () => {
    const est = new Map([["b1", e(false, false)], ["b2", e(false, false)], ["b3", e(false, false)]]);
    expect(blocoInicial(ids, est)).toBe("b1");
  });
  // Review Focus 5: trilha recém-criada, ainda sem blocos
  it("trilha sem blocos: null", () => {
    expect(blocoInicial([], new Map())).toBeNull();
  });
});

describe("fonteEfetiva / fonteDoGrupo", () => {
  it("review sem fonte cai em ads-pucpr", () => {
    expect(fonteEfetiva({ fonte: null, tipo: "review" })).toBe("ads-pucpr");
    expect(fonteEfetiva({ fonte: null, tipo: "concept" })).toBeNull();
  });
  it("todos com a mesma fonte: a tag sobe para o grupo", () => {
    expect(fonteDoGrupo([{ fonte: "alura", tipo: "concept" }, { fonte: "alura", tipo: "optional" }])).toBe("alura");
    expect(fonteDoGrupo([{ fonte: null, tipo: "review" }, { fonte: "ads-pucpr", tipo: "review" }])).toBe("ads-pucpr");
  });
  it("fontes misturadas, sem fonte ou grupo vazio: fica nos itens", () => {
    expect(fonteDoGrupo([{ fonte: "alura", tipo: "concept" }, { fonte: "dio", tipo: "concept" }])).toBeNull();
    expect(fonteDoGrupo([{ fonte: null, tipo: "concept" }])).toBeNull();
    expect(fonteDoGrupo([])).toBeNull();
  });
});

describe("textoDoPct", () => {
  const base = { logado: true, bloqueado: false, progresso: 0.4, semanas: "~6-8 semanas", noRoteiro: false };
  it("logado e desbloqueado: o %", () => {
    expect(textoDoPct(base)).toBe("40%");
  });
  it("bloqueado sem progresso: bloqueado", () => {
    expect(textoDoPct({ ...base, bloqueado: true, progresso: 0 })).toBe("bloqueado");
  });
  it("bloqueado com itens já marcados: bloqueado · 40%", () => {
    expect(textoDoPct({ ...base, bloqueado: true })).toBe("bloqueado · 40%");
  });
  it("visitante: semanas no cabeçalho, nada no roteiro", () => {
    expect(textoDoPct({ ...base, logado: false })).toBe("~6-8 semanas");
    expect(textoDoPct({ ...base, logado: false, noRoteiro: true })).toBe("");
    expect(textoDoPct({ ...base, logado: false, bloqueado: true })).toBe("bloqueado");
  });
  it("visitante, bloco sem semanas estimadas: vazio", () => {
    expect(textoDoPct({ ...base, logado: false, semanas: null })).toBe("");
  });
});
