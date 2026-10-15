import { describe, expect, it } from "vitest";
import {
  contraste,
  misturar,
  normalizarHex,
  superficiesClaro,
  superficiesEscuro,
  TONS_FIXOS,
  tonsDaTrilha,
  varsDaTrilha,
} from "@/lib/tons";

// menor contraste do tom entre todas as superfícies
const pior = (tom: string, sups: string[]) =>
  Math.min(...sups.map((s) => contraste(tom, s)));

describe("contraste (WCAG 2.x)", () => {
  it("branco e preto dão 21", () => {
    expect(contraste("#ffffff", "#000000")).toBeCloseTo(21, 5);
  });
  it("branco sobre o azul do botão primário dá 4,70", () => {
    expect(contraste("#ffffff", "#0071e3")).toBeCloseTo(4.7, 1);
  });
  it("é simétrico", () => {
    expect(contraste("#9d2235", "#ffffff")).toBe(contraste("#ffffff", "#9d2235"));
  });
});

describe("misturar = color-mix(in srgb)", () => {
  it("62% do bordô com preto dá o campo escuro do mockup", () => {
    expect(misturar("#9D2235", "#000000", 0.62)).toBe("#611521");
  });
  it("65% do verde com branco dá o tom escuro do mockup", () => {
    expect(misturar("#58CC02", "#ffffff", 0.65)).toBe("#92de5b");
  });
});

describe("tonsDaTrilha — cores oficiais", () => {
  it("devolvem exatamente os valores do mockup", () => {
    expect(tonsDaTrilha("#9D2235")).toEqual(TONS_FIXOS["#9D2235"]);
    expect(tonsDaTrilha("#D97757")).toEqual(TONS_FIXOS["#D97757"]);
    expect(tonsDaTrilha("#58CC02")).toEqual(TONS_FIXOS["#58CC02"]);
    expect(tonsDaTrilha("#9D2235").tomEscuro).toBe("#e5707f");
    expect(tonsDaTrilha("#D97757").campoTintaClaro).toBe("#2b1209");
  });
});

const CORES = [
  "#9D2235", "#D97757", "#58CC02", "#052FD3", "#FFCC00", "#00B8D9",
  "#7F28B5", "#888888", "#111111", "#F5F5F5", "#FF0000", "#00FF00", "#0000FF",
];

describe("tonsDaTrilha — qualquer cor passa AA", () => {
  for (const cor of CORES) {
    it(`${cor}: tom, tom 7:1 e tinta do campo`, () => {
      const t = tonsDaTrilha(cor);
      expect(pior(t.tomClaro, superficiesClaro(cor))).toBeGreaterThanOrEqual(4.5);
      expect(pior(t.tomEscuro, superficiesEscuro(cor))).toBeGreaterThanOrEqual(4.5);
      expect(pior(t.tomMaisClaro, superficiesClaro(cor))).toBeGreaterThanOrEqual(7);
      expect(pior(t.tomMaisEscuro, superficiesEscuro(cor))).toBeGreaterThanOrEqual(7);
      expect(contraste(t.campoTintaClaro, t.campoClaro)).toBeGreaterThanOrEqual(4.5);
      expect(contraste(t.campoTintaEscuro, t.campoEscuro)).toBeGreaterThanOrEqual(4.5);
    });
  }
});

// Review Focus 2: a cor vem do banco, digitada por gente
describe("tonsDaTrilha — cor do banco fora do formato", () => {
  it("minúscula e com espaços dá os mesmos tons da oficial", () => {
    expect(tonsDaTrilha(" #9d2235 ")).toEqual(TONS_FIXOS["#9D2235"]);
  });
  it("hex de 3 dígitos funciona", () => {
    expect(normalizarHex("#abc")).toBe("#AABBCC");
    const t = tonsDaTrilha("#abc");
    expect(pior(t.tomClaro, superficiesClaro("#AABBCC"))).toBeGreaterThanOrEqual(4.5);
  });
  it("cor inválida não quebra: usa o cinza de reserva", () => {
    expect(normalizarHex("vermelho")).toBeNull();
    expect(() => tonsDaTrilha("vermelho")).not.toThrow();
    expect(varsDaTrilha("vermelho")).toMatchObject({ "--cor": "#8E8E93" });
  });
});

describe("varsDaTrilha", () => {
  it("leva a cor crua e os 8 tons", () => {
    expect(varsDaTrilha("#58CC02")).toEqual({
      "--cor": "#58CC02",
      "--tom-c": "#327401",
      "--tom-e": "#92de5b",
      "--tom-mais-c": "#255601",
      "--tom-mais-e": "#a8e87a",
      "--campo-c": "#58CC02",
      "--campo-e": "#317201",
      "--campo-tinta-c": "#102500",
      "--campo-tinta-e": "#ffffff",
    });
  });
});
