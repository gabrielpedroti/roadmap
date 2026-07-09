// Streak (constância) e metas (volume) — coisas INDEPENDENTES na SPEC:
// - streak: atingiu o mínimo diário nos dias que contam, em sequência
// - metas: total de horas na semana (seg-dom) e no mês civil
//
// Timestamps ficam em UTC no banco; o "dia" de uma sessão é calculado no
// fuso de São Paulo (UTC-3 fixo — o Brasil aboliu o horário de verão em 2019).

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
  opts: { minDiario: number; diasQueContam: number[]; hoje: string }
): number {
  let streak = 0;
  let dia = opts.hoje;

  // anda pra trás a partir de hoje; limite de ~10 anos só por segurança
  for (let i = 0; i < 3660; i++) {
    const diaConta = opts.diasQueContam.includes(diaDaSemana(dia));
    if (diaConta) {
      const atingiu = (porDia.get(dia) ?? 0) >= opts.minDiario;
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
