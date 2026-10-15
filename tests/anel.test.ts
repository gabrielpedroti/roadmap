import { describe, expect, it } from "vitest";
import {
  baseAoEstender,
  baseAoRestaurar,
  fracaoDoAnel,
  offDoAnel,
  rotuloDaFase,
} from "@/lib/anel";

const MIN = 60_000;

describe("fracaoDoAnel / offDoAnel", () => {
  it("25 min, passados 5: 80% cheio", () => {
    expect(fracaoDoAnel(20 * MIN, 25 * MIN)).toBeCloseTo(0.8);
    expect(offDoAnel(20 * MIN, 25 * MIN)).toBeCloseTo(20);
  });
  it("cheio e vazio nas pontas", () => {
    expect(offDoAnel(25 * MIN, 25 * MIN)).toBe(0);
    expect(offDoAnel(0, 25 * MIN)).toBe(100);
  });
});

describe("somar tempo (+1/+2/+5)", () => {
  it("25 min, passados 5, +1: de 80% para 84%, base igual", () => {
    const base = baseAoEstender(25 * MIN, 21 * MIN);
    expect(base).toBe(25 * MIN);
    expect(fracaoDoAnel(21 * MIN, base)).toBeCloseTo(0.84);
  });
  it("25 min, passados 2, +5: enche e a base vira 28 min", () => {
    const base = baseAoEstender(25 * MIN, 28 * MIN);
    expect(base).toBe(28 * MIN);
    expect(fracaoDoAnel(28 * MIN, base)).toBe(1);
  });
});

// Review Focus 3: estado salvo antigo, base zerada, restante negativo
describe("anel nunca vira NaN nem passa de cheio", () => {
  it("base zero ou negativa dá anel vazio, não NaN", () => {
    expect(fracaoDoAnel(10 * MIN, 0)).toBe(0);
    expect(fracaoDoAnel(10 * MIN, -5)).toBe(0);
    expect(Number.isNaN(offDoAnel(10 * MIN, 0))).toBe(false);
  });
  it("restante negativo (relógio passou do fim) dá anel vazio", () => {
    expect(fracaoDoAnel(-3000, 25 * MIN)).toBe(0);
  });
  it("estado antigo sem baseMs: base = maior entre total e restante", () => {
    expect(baseAoRestaurar(undefined, 25 * MIN, 27 * MIN)).toBe(27 * MIN);
    expect(baseAoRestaurar(undefined, 25 * MIN, 10 * MIN)).toBe(25 * MIN);
  });
  it("baseMs salva vale; zero salvo cai na regra antiga", () => {
    expect(baseAoRestaurar(28 * MIN, 25 * MIN, 20 * MIN)).toBe(28 * MIN);
    expect(baseAoRestaurar(0, 25 * MIN, 20 * MIN)).toBe(25 * MIN);
  });
});

describe("rotuloDaFase", () => {
  const base = { rodando: false, decorridoMs: 0, restanteMs: 25 * MIN, baseMs: 25 * MIN };
  it("foco parado no começo: Foco", () => {
    expect(rotuloDaFase({ ...base, fase: "foco" })).toBe("Foco");
  });
  it("foco parado no meio: Pausado (mesmo estendido)", () => {
    expect(rotuloDaFase({ ...base, fase: "foco", decorridoMs: 1000, restanteMs: 28 * MIN, baseMs: 28 * MIN })).toBe("Pausado");
  });
  it("rodando nunca é Pausado", () => {
    expect(rotuloDaFase({ ...base, fase: "foco", rodando: true, decorridoMs: 5000 })).toBe("Foco");
    expect(rotuloDaFase({ ...base, fase: "pausa", rodando: true, restanteMs: 1000 })).toBe("Pausa");
  });
  it("pausa longa parada com 12 de 15 min: Pausado", () => {
    expect(rotuloDaFase({ ...base, fase: "pausa", restanteMs: 12 * MIN, baseMs: 15 * MIN })).toBe("Pausado");
  });
  it("só-pausa parado no começo: Pausa", () => {
    expect(rotuloDaFase({ ...base, fase: "pausa", restanteMs: 5 * MIN, baseMs: 5 * MIN })).toBe("Pausa");
  });
});
