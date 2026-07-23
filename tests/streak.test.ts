import { describe, expect, it } from "vitest";
import {
  calcularStreak,
  diaDaSemana,
  diaLocalSP,
  historicoAoMudarMin,
  inicioDaSemana,
  minDoDia,
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

describe("mínimo NÃO-retroativo (histórico do mínimo)", () => {
  it("minDoDia usa o mínimo da época de cada dia", () => {
    const hist = [
      { desde: "1970-01-01", min: 15 },
      { desde: "2026-07-08", min: 30 },
    ];
    expect(minDoDia("2026-07-05", hist)).toBe(15); // antes da mudança
    expect(minDoDia("2026-07-08", hist)).toBe(30); // no dia da mudança
    expect(minDoDia("2026-07-20", hist)).toBe(30); // depois
  });

  it("historicoAoMudarMin congela o passado no mínimo antigo", () => {
    // primeira mudança 15 → 30 hoje: registra que até hoje era 15
    expect(historicoAoMudarMin([], 15, 30, "2026-07-08")).toEqual([
      { desde: "1970-01-01", min: 15 },
      { desde: "2026-07-08", min: 30 },
    ]);
    // mudar de novo no MESMO dia substitui a era de hoje (não acumula)
    const hist = historicoAoMudarMin([], 15, 30, "2026-07-08");
    expect(historicoAoMudarMin(hist, 30, 50, "2026-07-08")).toEqual([
      { desde: "1970-01-01", min: 15 },
      { desde: "2026-07-08", min: 50 },
    ]);
    // sem mudança de valor, nada acontece
    expect(historicoAoMudarMin(hist, 30, 30, "2026-07-09")).toEqual(hist);
  });

  it("subir o mínimo NÃO derruba os dias antigos (o bug do Gabriel)", () => {
    // estudou 20 min seg/ter/qua; hoje (qua) subiu o mínimo de 15 → 30
    const porDia = new Map([
      ["2026-07-08", 20], // qua = hoje
      ["2026-07-07", 20], // ter
      ["2026-07-06", 20], // seg
    ]);
    const historicoMin = [
      { desde: "1970-01-01", min: 15 },
      { desde: "2026-07-08", min: 30 },
    ];
    const opts = { diasQueContam: TODOS_OS_DIAS, hoje: "2026-07-08" };
    // com histórico: seg/ter valem 15 (contam); hoje 20<30 não quebra → 2
    expect(calcularStreak(porDia, { ...opts, historicoMin })).toBe(2);
    // sem histórico (retroativo), o mesmo 30 mataria tudo → era o bug
    expect(calcularStreak(porDia, { ...opts, minDiario: 30 })).toBe(0);
  });

  it("baixar o mínimo passa a valer só de hoje (não reescreve o passado)", () => {
    // ontem fez 10 min quando o mínimo era 30 (não contou); hoje baixou pra 5
    const porDia = new Map([
      ["2026-07-08", 10], // hoje
      ["2026-07-07", 10], // ontem, sob o mínimo 30
    ]);
    const historicoMin = [
      { desde: "1970-01-01", min: 30 },
      { desde: "2026-07-08", min: 5 },
    ];
    const opts = { diasQueContam: TODOS_OS_DIAS, hoje: "2026-07-08" };
    // ontem usa 30 (10<30, quebra); hoje usa 5 (10>=5, conta) → 1
    expect(calcularStreak(porDia, { ...opts, historicoMin })).toBe(1);
  });
});
