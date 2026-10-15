import { describe, expect, it } from "vitest";
import { limitarFracao, rotuloDataHora } from "@/lib/formato";

describe("rotuloDataHora — com vírgula, no fuso de São Paulo", () => {
  it("hoje", () => {
    // 00:10 UTC do dia 15 = 21:10 do dia 14 em SP
    expect(rotuloDataHora("2026-10-15T00:10:00Z", "2026-10-14")).toBe("Hoje, 21:10");
  });
  it("ontem", () => {
    expect(rotuloDataHora("2026-10-13T23:00:00Z", "2026-10-14")).toBe("Ontem, 20:00");
  });
  it("outro dia", () => {
    expect(rotuloDataHora("2026-07-05T17:00:00Z", "2026-10-14")).toBe("05/07, 14:00");
  });
  it("virada de ano: 1º de janeiro de madrugada (UTC) ainda é ontem em SP", () => {
    expect(rotuloDataHora("2026-01-01T02:00:00Z", "2026-01-01")).toBe("Ontem, 23:00");
  });
});

// Meta zerada ou conta inválida nunca vira NaN na barra
describe("limitarFracao", () => {
  it("mantém o que já está entre 0 e 1", () => {
    expect(limitarFracao(0.75)).toBe(0.75);
  });
  it("meta ultrapassada fica cheia", () => {
    expect(limitarFracao(10.5 / 10)).toBe(1);
  });
  it("meta zerada: 0/0 vira 0 e 5/0 vira 1", () => {
    expect(limitarFracao(0 / 0)).toBe(0);
    expect(limitarFracao(5 / 0)).toBe(1);
  });
  it("negativo vira 0", () => {
    expect(limitarFracao(-0.2)).toBe(0);
  });
});
