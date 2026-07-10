"use client";

// Tela de erro amigável (App Router usa este arquivo automaticamente
// quando algo quebra num Server Component — ex.: Supabase fora do ar).
export default function Erro({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-dvh items-center justify-center px-4">
      <div className="cartao w-full max-w-sm p-6 text-center">
        <div className="text-[34px]">😵</div>
        <h1 className="mt-2 text-[16px] font-semibold text-tinta">
          Algo deu errado
        </h1>
        <p className="mt-1 text-[13px] text-tinta2">
          Pode ser conexão ou o banco fora do ar por um instante.
        </p>
        {error?.digest && (
          <p className="mt-1 text-[11px] text-tinta2">código: {error.digest}</p>
        )}
        <button
          onClick={reset}
          className="mt-4 rounded-full bg-acao px-8 py-[10px] text-[14px] font-semibold text-white"
        >
          Tentar de novo
        </button>
      </div>
    </main>
  );
}
