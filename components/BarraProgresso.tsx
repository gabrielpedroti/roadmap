import type { CSSProperties } from "react";
import { limitarFracao } from "@/lib/formato";

// Barra fina de progresso (cápsula com ponta redonda; o CSS anima a largura).
// A COR vem do contexto: --cor-viva dentro de um elemento .com-cor (trilha),
// --meta-fill (tinta) nas metas, a tinta do campo no cabeçalho da trilha.
// Com `rotulo`, a barra é a ÚNICA indicação e vira role="progressbar"; sem
// rótulo ela é decorativa (o % já está escrito ao lado).
export function BarraProgresso({
  fracao,
  rotulo,
  textoValor,
}: {
  fracao: number; // 0..1 (fora disso, ou NaN, é limitado)
  rotulo?: string; // ex.: "Meta da semana"
  textoValor?: string; // ex.: "7,5 de 10 horas" (o valor real, mesmo passando de 100%)
}) {
  const p = limitarFracao(fracao);
  const preenchido = <i style={{ "--p": p } as CSSProperties} />;

  if (!rotulo) {
    return (
      <span className="barra-p" aria-hidden="true">
        {preenchido}
      </span>
    );
  }
  return (
    <span
      className="barra-p"
      role="progressbar"
      aria-label={rotulo}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(p * 100)}
      aria-valuetext={textoValor}
    >
      {preenchido}
    </span>
  );
}
