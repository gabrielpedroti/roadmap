// Contas do anel do Pomodoro (só exibição: as regras de tempo ficam no
// componente). A fração cheia do anel é restante ÷ base:
// - a base começa no total da fase (foco: focoMin; pausa: a pausa da vez);
// - somar tempo (+1/+2/+5) aumenta o restante; se ele passar da base, o anel
//   enche e o restante vira a nova base.
import { limitarFracao } from "./formato";

export type FaseRelogio = "foco" | "pausa";

// quanto do anel está cheio: 0 (vazio) a 1 (cheio). Base zerada → 0 (nunca NaN)
export function fracaoDoAnel(restanteMs: number, baseMs: number): number {
  if (!(baseMs > 0)) return 0;
  return limitarFracao(restanteMs / baseMs);
}

// --off do SVG: quanto do arco FALTA (0 = cheio, 100 = vazio)
export function offDoAnel(restanteMs: number, baseMs: number): number {
  return (1 - fracaoDoAnel(restanteMs, baseMs)) * 100;
}

// nova base ao somar tempo: só cresce se o restante passar dela
export function baseAoEstender(baseMs: number, novoRestanteMs: number): number {
  return Math.max(baseMs, novoRestanteMs);
}

// base ao restaurar do localStorage. Estado salvo antigo não tem baseMs:
// usa o maior entre o total da fase e o restante (anel nunca passa de cheio)
export function baseAoRestaurar(
  baseSalvaMs: number | undefined,
  totalDaFaseMs: number,
  restanteMs: number
): number {
  if (baseSalvaMs !== undefined && baseSalvaMs > 0) return baseSalvaMs;
  return Math.max(totalDaFaseMs, restanteMs);
}

// Texto no centro do anel. "Pausado": parado no meio da fase. No foco, já
// correu algo; na pausa, o restante é menor que a base (a base já sabe se a
// pausa é curta ou longa)
export function rotuloDaFase(e: {
  fase: FaseRelogio;
  rodando: boolean;
  decorridoMs: number;
  restanteMs: number;
  baseMs: number;
}): "Foco" | "Pausa" | "Pausado" {
  const pausado =
    !e.rodando &&
    (e.fase === "foco" ? e.decorridoMs > 0 : e.restanteMs < e.baseMs);
  if (pausado) return "Pausado";
  return e.fase === "foco" ? "Foco" : "Pausa";
}
