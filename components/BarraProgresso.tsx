// Barra fina de progresso. Com `cor`, usa a cor da trilha (clareada
// automaticamente no tema escuro via .com-cor); sem cor, usa a tinta
// neutra (caso das metas de semana/mês).
export function BarraProgresso({
  fracao,
  cor,
}: {
  fracao: number; // 0..1
  cor?: string;
}) {
  const parte = Math.min(1, Math.max(0, fracao));

  // Anima `transform`, não `width`: largura recalcula layout a cada frame,
  // transform roda no compositor. As pontas arredondadas ficam por conta do
  // recorte do trilho (overflow-hidden), senão a escala achataria o raio.
  return (
    <div className="h-[5px] overflow-hidden rounded-[3px] bg-trilho">
      <div
        className="com-cor h-full w-full origin-left transition-transform duration-300"
        style={{
          transform: `scaleX(${parte})`,
          background: cor ? "var(--cor-final)" : "var(--ink)",
          ...(cor ? ({ "--cor": cor } as React.CSSProperties) : {}),
        }}
      />
    </div>
  );
}
