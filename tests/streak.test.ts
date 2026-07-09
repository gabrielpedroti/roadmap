import { describe, expect, it } from "vitest";
import {
  calcularStreak,
  diaDaSemana,
  diaLocalSP,
  inicioDaSemana,
  minutosNaSemana,
  minutosNoMes,
  minutosPorDia,
} from "@/lib/streak";

const TODOS_OS_DIAS = [1, 2, 3, 4, 5, 6, 7];

describe("diaLocalSP — fuso de São Paulo", () => {
  it("converte UTC para o dia local (SP = UTC-3)", () => {
    // 01:00 UTC de 09/07 ainda é 22:00 de 08/07 em SP
    expect(diaLocalSP("2026-07-09T01:00:00Z")).toBe("2026-07-08");
    expect(diaLocalSP("2026-07-09T12:00:00Z")).toBe("2026-07-09");
  });
});

describe("diaDaSemana", () => {
  it("1=seg ... 7=dom", () => {
    expect(diaDaSemana("2026-07-06")).toBe(1); // segunda
    expect(diaDaSemana("2026-07-12")).toBe(7); // domingo
  });
});

describe("calcularStreak", () => {
  const opts = { minDiario: 30, diasQueContam: TODOS_OS_DIAS, hoje: "2026-07-09" };

  it("sem sessões = 0", () => {
    expect(calcularStreak(new Map(), opts)).toBe(0);
  });

  it("conta dias consecutivos que atingiram o mínimo", () => {
    const porDia = new Map([
      ["2026-07-09", 30],
      ["2026-07-08", 45],
      ["2026-07-07", 30],
      ["2026-07-05", 60], // 06 falhou → não conta
    ]);
    expect(calcularStreak(porDia, opts)).toBe(3);
  });

  it("abaixo do mínimo não conta (critério: mínimo diário)", () => {
    const porDia = new Map([
      ["2026-07-09", 29], // abaixo de 30
      ["2026-07-08", 30],
    ]);
    // hoje não atingiu (ainda), mas não quebra: streak = só ontem
    expect(calcularStreak(porDia, opts)).toBe(1);
  });

  it("hoje sem estudo NÃO quebra o streak de ontem", () => {
    const porDia = new Map([
      ["2026-07-08", 30],
      ["2026-07-07", 30],
    ]);
    expect(calcularStreak(porDia, opts)).toBe(2);
  });

  it("ontem sem estudo quebra", () => {
    const porDia = new Map([
      ["2026-07-09", 30],
      ["2026-07-07", 30], // buraco no dia 08
    ]);
    expect(calcularStreak(porDia, opts)).toBe(1);
  });

  it("dias que não contam são pulados sem quebrar (ex.: fim de semana off)", () => {
    // 2026-07-11 = sábado, 2026-07-12 = domingo
    const segASexta = { minDiario: 30, diasQueContam: [1, 2, 3, 4, 5], hoje: "2026-07-13" };
    const porDia = new Map([
      ["2026-07-13", 30], // seg
      ["2026-07-10", 30], // sex — sáb/dom vazios não quebram
      ["2026-07-09", 30], // qui
    ]);
    expect(calcularStreak(porDia, segASexta)).toBe(3);
  });

  it("registro manual de ontem mantém o streak (critério de aceite nº 5)", () => {
    const porDia = minutosPorDia([
      // manual de 30 min ontem (08/07, 10:00 SP = 13:00 UTC)
      { started_at: "2026-07-08T13:00:00Z", duration_min: 30 },
    ]);
    expect(calcularStreak(porDia, opts)).toBe(1);
  });
});

describe("metas — semana e mês", () => {
  it("inicioDaSemana acha a segunda-feira", () => {
    expect(inicioDaSemana("2026-07-09")).toBe("2026-07-06"); // qui → seg
    expect(inicioDaSemana("2026-07-06")).toBe("2026-07-06"); // seg → seg
    expect(inicioDaSemana("2026-07-12")).toBe("2026-07-06"); // dom → seg
  });

  it("meta semanal soma só a semana atual (seg-dom)", () => {
    const porDia = new Map([
      ["2026-07-09", 60],
      ["2026-07-06", 90], // segunda desta semana
      ["2026-07-05", 999], // domingo passado — fora
    ]);
    expect(minutosNaSemana(porDia, "2026-07-09")).toBe(150);
  });

  it("meta mensal soma só o mês civil", () => {
    const porDia = new Map([
      ["2026-07-01", 60],
      ["2026-07-09", 60],
      ["2026-06-30", 999], // junho — fora
    ]);
    expect(minutosNoMes(porDia, "2026-07-09")).toBe(120);
  });
});
