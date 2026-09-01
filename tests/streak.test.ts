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

  it("DIA BÔNUS: estudo que cumpriu o mínimo num dia que não conta soma +1", () => {
    // config seg-sex; estudou no domingo mesmo assim (o caso do Gabriel:
    // 7h no domingo + mínimo batido na segunda = streak 2, não 1)
    const segASexta = { minDiario: 30, diasQueContam: [1, 2, 3, 4, 5], hoje: "2026-07-14" };
    const porDia = new Map([
      ["2026-07-13", 31], // seg — conta
      ["2026-07-12", 420], // dom — bônus (não é obrigatório, mas estudou)
      ["2026-07-10", 30], // sex — conta (sáb vazio só é pulado)
      ["2026-07-09", 30], // qui — conta
    ]);
    // hoje (ter) ainda sem estudo não quebra → seg + dom + sex + qui = 4
    expect(calcularStreak(porDia, segASexta)).toBe(4);
  });

  it("dia que não conta com estudo ABAIXO do mínimo não soma nem quebra", () => {
    const segASexta = { minDiario: 30, diasQueContam: [1, 2, 3, 4, 5], hoje: "2026-07-13" };
    const porDia = new Map([
      ["2026-07-13", 30], // seg
      ["2026-07-12", 10], // dom, 10 < 30 → nem bônus, nem quebra
      ["2026-07-10", 30], // sex
    ]);
    expect(calcularStreak(porDia, segASexta)).toBe(2);
  });

  it("bônus vale mesmo com a sequência anterior quebrada (regra literal — decisão)", () => {
    // Perdeu a sexta (dia obrigatório), mas estudou sáb+dom: a regra literal
    // ("dia bônus nunca quebra e soma se cumprido") mostra streak 2 no domingo.
    // Se a segunda passar em branco, aí sim tudo zera (a sexta perdida cobra).
    // Alternativa NÃO adotada: bônus só contar com a sequência "viva".
    const segASexta = { minDiario: 30, diasQueContam: [1, 2, 3, 4, 5], hoje: "2026-07-12" };
    const porDia = new Map([
      ["2026-07-12", 60], // dom (hoje) — bônus
      ["2026-07-11", 60], // sáb — bônus
      // sex 10 vazia: dia obrigatório perdido
      ["2026-07-09", 30], // qui
    ]);
    expect(calcularStreak(porDia, segASexta)).toBe(2);
    // na terça, com a segunda vazia, a sexta perdida derruba tudo
    expect(
      calcularStreak(porDia, { ...segASexta, hoje: "2026-07-14" })
    ).toBe(0);
  });

  it("dia bônus respeita o mínimo da época (histórico não-retroativo)", () => {
    const historicoMin = [
      { desde: "1970-01-01", min: 15 },
      { desde: "2026-07-13", min: 30 },
    ];
    const opts2 = { diasQueContam: [1, 2, 3, 4, 5], hoje: "2026-07-13", historicoMin };
    const porDia = new Map([
      ["2026-07-13", 30], // seg, sob mínimo 30
      ["2026-07-12", 20], // dom bônus: na época o mínimo era 15 → 20 conta
      ["2026-07-10", 15], // sex, sob mínimo 15
    ]);
    expect(calcularStreak(porDia, opts2)).toBe(3);
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
  it("inicioDaSemana acha a segunda-feira (padrão)", () => {
    expect(inicioDaSemana("2026-07-09")).toBe("2026-07-06"); // qui → seg
    expect(inicioDaSemana("2026-07-06")).toBe("2026-07-06"); // seg → seg
    expect(inicioDaSemana("2026-07-12")).toBe("2026-07-06"); // dom → seg
  });

  it("inicioDaSemana acha o domingo quando configurado", () => {
    expect(inicioDaSemana("2026-07-09", "dom")).toBe("2026-07-05"); // qui → dom
    expect(inicioDaSemana("2026-07-12", "dom")).toBe("2026-07-12"); // dom → ele mesmo
    expect(inicioDaSemana("2026-07-06", "dom")).toBe("2026-07-05"); // seg → dom anterior
  });

  it("meta semanal soma só a semana atual (seg-dom)", () => {
    const porDia = new Map([
      ["2026-07-09", 60],
      ["2026-07-06", 90], // segunda desta semana
      ["2026-07-05", 999], // domingo passado — fora
    ]);
    expect(minutosNaSemana(porDia, "2026-07-09")).toBe(150);
  });

  it("semana começando no domingo puxa o domingo pra dentro da conta", () => {
    const porDia = new Map([
      ["2026-07-09", 60], // qui
      ["2026-07-06", 90], // seg
      ["2026-07-05", 100], // dom — dentro com 'dom', fora com 'seg'
      ["2026-07-04", 999], // sáb passado — fora nos dois modos
    ]);
    expect(minutosNaSemana(porDia, "2026-07-09", "dom")).toBe(250);
    expect(minutosNaSemana(porDia, "2026-07-09", "seg")).toBe(150);
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
