"use client";

import { Icone } from "@/components/Icone";

// Tela de erro amigável (o App Router usa este arquivo automaticamente
// quando algo quebra num Server Component — ex.: Supabase fora do ar).
// Centralizada na tela inteira, sem cartão; ícone desenhado (o emoji saiu).
export default function Erro({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="tela-erro">
      <div className="tela-erro-in">
        <Icone nome="triangulo" />
        <h1 className="tela-erro-titulo">Algo deu errado</h1>
        <p>Pode ser conexão ou o banco fora do ar por um instante.</p>
        {error?.digest && <p className="codigo tab">código: {error.digest}</p>}
        <button type="button" className="btn btn-prim btn-p" onClick={reset}>
          <Icone nome="recarregar" />
          Tentar de novo
        </button>
      </div>
    </main>
  );
}
