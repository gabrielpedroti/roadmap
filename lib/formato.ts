// Helpers de exibição (formato brasileiro, fuso de São Paulo)

import { diaLocalSP } from "./streak";

// 450 min → "7,5" · 1320 min → "22" (pra mostrar "7,5/10h" como no mockup)
export function formatarHoras(minutos: number): string {
  const horas = Math.round((minutos / 60) * 10) / 10;
  return Number.isInteger(horas)
    ? String(horas)
    : horas.toFixed(1).replace(".", ",");
}

// 50 → "50 min" · 65 → "1h 05" · 120 → "2h"
export function formatarDuracao(min: number): string {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const resto = min % 60;
  return resto === 0 ? `${h}h` : `${h}h ${String(resto).padStart(2, "0")}`;
}

// [1..7] → "seg–dom" · [1..5] → "seg–sex" · [1,3,5] → "seg, qua, sex"
const NOMES_DIAS = ["seg", "ter", "qua", "qui", "sex", "sáb", "dom"];

export function formatarDiasQueContam(dias: number[]): string {
  const ordenados = [...dias].sort((a, b) => a - b);
  const semBuracos = ordenados.every(
    (d, i) => i === 0 || d === ordenados[i - 1] + 1
  );
  if (semBuracos && ordenados.length > 1) {
    return `${NOMES_DIAS[ordenados[0] - 1]}–${NOMES_DIAS[ordenados[ordenados.length - 1] - 1]}`;
  }
  return ordenados.map((d) => NOMES_DIAS[d - 1]).join(", ");
}

export function horaLocalSP(isoUtc: string): string {
  return new Date(isoUtc).toLocaleTimeString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// "Hoje 21:10", "Ontem 20:00" ou "05/07 14:00"
export function rotuloDataHora(isoUtc: string, hoje: string): string {
  const dia = diaLocalSP(isoUtc);
  const hora = horaLocalSP(isoUtc);

  if (dia === hoje) return `Hoje ${hora}`;

  const [ano, mes, d] = hoje.split("-").map(Number);
  const ontem = new Date(ano, mes - 1, d - 1);
  const diaOntem = `${ontem.getFullYear()}-${String(
    ontem.getMonth() + 1
  ).padStart(2, "0")}-${String(ontem.getDate()).padStart(2, "0")}`;
  if (dia === diaOntem) return `Ontem ${hora}`;

  const [, m, dd] = dia.split("-");
  return `${dd}/${m} ${hora}`;
}
