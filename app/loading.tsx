// Estado de carregamento global (App Router mostra enquanto o servidor
// busca os dados). Discreto de propósito — o app carrega rápido.
export default function Carregando() {
  return (
    <main className="flex min-h-dvh items-center justify-center">
      <span className="animate-pulse text-[14px] text-tinta2">
        Carregando…
      </span>
    </main>
  );
}
