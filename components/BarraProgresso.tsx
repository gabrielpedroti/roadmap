// Barra fina de progresso, igual à do mockup (5px, cantos arredondados)
export function BarraProgresso({
  fracao,
  cor,
}: {
  fracao: number; // 0..1
  cor: string;
}) {
  return (
    <div className="h-[5px] rounded-[3px] bg-borda">
      <div
        className="h-[5px] rounded-[3px] transition-[width] duration-300"
        style={{
          width: `${Math.round(Math.min(1, Math.max(0, fracao)) * 100)}%`,
          background: cor,
        }}
      />
    </div>
  );
}
