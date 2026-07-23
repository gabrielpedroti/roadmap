// Streak (constância) e metas (volume) — coisas INDEPENDENTES na SPEC:
// - streak: atingiu o mínimo diário nos dias que contam, em sequência
// - metas: total de horas na semana (seg-dom) e no mês civil
//
// Timestamps ficam em UTC no banco; o "dia" de uma sessão é calculado no
// fuso de São Paulo (UTC-3 fixo — o Brasil aboliu o horário de verão em 2019).

import type { EraMinStreak } from "./types";

// Qual mínimo valia num dia? Percorre o histórico (ordenado por data) e pega
// a última era que já tinha começado naquele dia. É isso que torna a mudança
// de mínimo NÃO retroativa: um dia antigo é julgado pelo mínimo da época dele.
export function minDoDia(dia: string, historico: EraMinStreak[]): number {
  let m = historico[0]?.min ?? 30;
  for (const era of historico) {
    if (era.desde <= dia) m = era.min;
    else break;
  }
  return m;
}

// Monta o histórico atualizado quando o usuário muda o mínimo. O passado fica
// congelado no mínimo antigo; o novo vale a partir de HOJE.
export function historicoAoMudarMin(
  historicoAtual: EraMinStreak[] | undefined,
  minAntigo: number,
  minNovo: number,
  hoje: string
): EraMinStreak[] {
  const base = historicoAtual ?? [];
  if (minNovo === minAntigo) return base;
  const hist = [...base];
  // primeira mudança: registra que ATÉ hoje o mínimo era o antigo
  if (hist.length === 0) hist.push({ desde: "1970-01-01", min: minAntigo });
  // define/atualiza a era que começa hoje
  const i = hist.findIndex((e) => e.desde === hoje);
  if (i >= 0) hist[i] = { desde: hoje, min: minNovo };
  else hist.push({ desde: hoje, min: minNovo });
  hist.sort((a, b) => a.desde.localeCompare(b.desde));
  return hist;
}

export function diaLocalSP(isoUtc: string): string {
  // "en-CA" formata como YYYY-MM-DD, que ordena certo como string
  return new Date(isoUtc).toLocaleDateString("en-CA", {
    timeZone: "America/Sao_Paulo",
  });
}

export function hojeSP(): string {
  return diaLocalSP(new Date().toISOString());
}

// Soma os minutos de estudo por dia (chave YYYY-MM-DD)
export function minutosPorDia(
  sessoes: { started_at: string; duration_min: number }[]
): Map<string, number> {
  const porDia = new Map<string, number>();
  for (const s of sessoes) {
    const dia = diaLocalSP(s.started_at);
    porDia.set(dia, (porDia.get(dia) ?? 0) + s.duration_min);
  }
  return porDia;
}

// "YYYY-MM-DD" → 1=seg ... 7=dom (mesma convenção de user_settings.dias_que_contam)
export function diaDaSemana(dia: string): number {
  const [ano, mes, d] = dia.split("-").map(Number);
  const js = new Date(ano, mes - 1, d).getDay(); // 0=dom ... 6=sáb
  return js === 0 ? 7 : js;
}

function diaAnterior(dia: string): string {
  const [ano, mes, d] = dia.split("-").map(Number);
  const data = new Date(ano, mes - 1, d - 1);
  const m = String(data.getMonth() + 1).padStart(2, "0");
  const dd = String(data.getDate()).padStart(2, "0");
  return `${data.getFullYear()}-${m}-${dd}`;
}

export function calcularStreak(
  porDia: Map<string, number>,
  opts: {
    // um mínimo único (retroativo) OU o histórico de mínimos (não-retroativo).
    // Se `historicoMin` vier preenchido, ele manda; senão cai no `minDiario`.
    minDiario?: number;
    historicoMin?: EraMinStreak[];
    diasQueContam: number[];
    hoje: string;
  }
): number {
  // histórico efetivo: vazio → uma única era com o mínimo atual (comportamento
  // antigo, retroativo). Preenchido → cada dia usa o mínimo da sua época.
  const hist =
    opts.historicoMin && opts.historicoMin.length
      ? [...opts.historicoMin].sort((a, b) => a.desde.localeCompare(b.desde))
      : [{ desde: "1970-01-01", min: opts.minDiario ?? 30 }];

  let streak = 0;
  let dia = opts.hoje;

  // anda pra trás a partir de hoje; limite de ~10 anos só por segurança
  for (let i = 0; i < 3660; i++) {
    const diaConta = opts.diasQueContam.includes(diaDaSemana(dia));
    if (diaConta) {
      const atingiu = (porDia.get(dia) ?? 0) >= minDoDia(dia, hist);
      if (atingiu) {
        streak++;
      } else if (dia !== opts.hoje) {
        break; // dia que contava e não atingiu → quebra a sequência
      }
      // hoje ainda não atingiu → não quebra, o dia não acabou
    }
    // dia que não conta (ex.: domingo desativado) é simplesmente pulado
    dia = diaAnterior(dia);
  }

  return streak;
}

// Segunda-feira da semana do dia informado
export function inicioDaSemana(dia: string): string {
  let d = dia;
  const posicao = diaDaSemana(dia); // 1=seg
  for (let i = 1; i < posicao; i++) d = diaAnterior(d);
  return d;
}

export function minutosNaSemana(
  porDia: Map<string, number>,
  hoje: string
): number {
  const inicio = inicioDaSemana(hoje);
  let total = 0;
  for (const [dia, min] of porDia) {
    if (dia >= inicio && dia <= hoje) total += min;
  }
  return total;
}

export function minutosNoMes(
  porDia: Map<string, number>,
  hoje: string
): number {
  const mes = hoje.slice(0, 7); // "YYYY-MM"
  let total = 0;
  for (const [dia, min] of porDia) {
    if (dia.startsWith(mes)) total += min;
  }
  return total;
}
