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
  const largura = `${Math.round(Math.min(1, Math.max(0, fracao)) * 100)}%`;

  return (
    <div className="h-[5px] rounded-[3px] bg-trilho">
      <div
        className="com-cor h-full rounded-[3px] transition-[width] duration-300"
        style={{
          width: largura,
          background: cor ? "var(--cor-final)" : "var(--ink)",
          ...(cor ? ({ "--cor": cor } as React.CSSProperties) : {}),
        }}
      />
    </div>
  );
}
