import { describe, expect, it } from "vitest";
import { estadoDaChama } from "@/lib/chama";

const SEG_A_SEX = [1, 2, 3, 4, 5];
// 2026-10-14 é quarta-feira; 2026-10-17 é sábado
const QUARTA = "2026-10-14";
const SABADO = "2026-10-17";

describe("estadoDaChama — os 4 estados da spec (§4.9)", () => {
  it("hoje conta e o mínimo foi cumprido", () => {
    expect(estadoDaChama({ hoje: QUARTA, minutosHoje: 30, minimo: 30, diasQueContam: SEG_A_SEX }))
      .toEqual({ acesa: true, legenda: "Mínimo de hoje cumprido" });
  });
  it("hoje conta e faltam minutos", () => {
    expect(estadoDaChama({ hoje: QUARTA, minutosHoje: 12, minimo: 30, diasQueContam: SEG_A_SEX }))
      .toEqual({ acesa: false, legenda: "Faltam 18 min hoje" });
  });
  it("singular quando falta 1 min", () => {
    expect(estadoDaChama({ hoje: QUARTA, minutosHoje: 29, minimo: 30, diasQueContam: SEG_A_SEX }).legenda)
      .toBe("Falta 1 min hoje");
  });
  it("dia bônus: não conta e cumpriu", () => {
    expect(estadoDaChama({ hoje: SABADO, minutosHoje: 40, minimo: 30, diasQueContam: SEG_A_SEX }))
      .toEqual({ acesa: true, legenda: "Dia bônus: +1 · sábado não conta" });
  });
  it("não conta e não cumpriu: acesa, sequência segura", () => {
    expect(estadoDaChama({ hoje: SABADO, minutosHoje: 0, minimo: 30, diasQueContam: SEG_A_SEX }))
      .toEqual({ acesa: true, legenda: "Hoje não conta · sequência segura" });
  });
});
