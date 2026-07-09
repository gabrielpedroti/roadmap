"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

// Tela única de login E cadastro: e-mail novo = conta criada automaticamente
// (signInWithOtp com shouldCreateUser). Sem senha — só magic link.
function FormularioLogin() {
  const [email, setEmail] = useState("");
  const [estado, setEstado] = useState<"inicial" | "enviando" | "enviado">("inicial");
  const [erro, setErro] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const linkInvalido = searchParams.get("erro") === "link-invalido";

  async function enviarLink(e: React.FormEvent) {
    e.preventDefault();
    setEstado("enviando");
    setErro(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
        shouldCreateUser: true,
      },
    });

    if (error) {
      setErro(error.message);
      setEstado("inicial");
    } else {
      setEstado("enviado");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-borda-suave bg-moldura p-6">
        <h1 className="mb-1 text-[15px] font-semibold text-texto">
          Painel de estudos
        </h1>
        <p className="mb-6 text-xs text-suave">
          Entre com seu e-mail — sem senha, você recebe um link de acesso.
        </p>

        {estado === "enviado" ? (
          <div className="rounded-lg border border-borda bg-cartao p-4 text-sm text-texto">
            📬 Verifique seu e-mail
            <p className="mt-1 text-xs text-suave">
              Enviamos um link de acesso para <strong>{email}</strong>. Abra
              neste mesmo navegador para continuar logado.
            </p>
          </div>
        ) : (
          <form onSubmit={enviarLink} className="flex flex-col gap-3">
            <input
              type="email"
              required
              autoFocus
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg border border-borda bg-cartao px-3 py-2 text-sm text-texto placeholder:text-apagado focus:border-suave focus:outline-none"
            />
            <button
              type="submit"
              disabled={estado === "enviando"}
              className="rounded-lg bg-texto px-4 py-2 text-sm font-semibold text-moldura disabled:opacity-60"
            >
              {estado === "enviando" ? "Enviando..." : "Enviar link de acesso"}
            </button>
          </form>
        )}

        {linkInvalido && estado === "inicial" && (
          <p className="mt-3 text-xs text-red-400">
            O link expirou ou já foi usado. Peça um novo.
          </p>
        )}
        {erro && <p className="mt-3 text-xs text-red-400">{erro}</p>}
      </div>
    </main>
  );
}

export default function PaginaLogin() {
  // useSearchParams exige Suspense no App Router
  return (
    <Suspense>
      <FormularioLogin />
    </Suspense>
  );
}
