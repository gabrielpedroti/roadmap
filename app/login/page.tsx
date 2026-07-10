"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

// Tela única de login E cadastro: e-mail novo = conta criada automaticamente
// (signInWithOtp com shouldCreateUser). Sem senha — só magic link.
// Login é OPCIONAL: sem conta dá pra ver os roadmaps e usar o pomodoro;
// a conta serve pra salvar progresso, sessões e streak.
function FormularioLogin() {
  const [email, setEmail] = useState("");
  const [estado, setEstado] = useState<"inicial" | "enviando" | "enviado">(
    "inicial"
  );
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
    <main className="flex min-h-dvh items-center justify-center px-4">
      <div className="cartao w-full max-w-sm p-6">
        <h1 className="text-[19px] font-semibold tracking-[-0.02em] text-tinta">
          Roadmap
        </h1>
        <p className="mt-1 mb-6 text-[13px] text-tinta2">
          Entre com seu e-mail pra salvar progresso, sessões e streak — sem
          senha, você recebe um link de acesso.
        </p>

        {estado === "enviado" ? (
          <div className="rounded-xl border border-hairline bg-fundo p-4 text-[14px] text-tinta">
            📬 Verifique seu e-mail
            <p className="mt-1 text-[12px] text-tinta2">
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
              className="rounded-xl border border-hairline bg-fundo px-3 py-[10px] text-[14px] text-tinta placeholder:text-tinta2 focus:border-tinta2 focus:outline-none"
            />
            <button
              type="submit"
              disabled={estado === "enviando"}
              className="rounded-full bg-acao py-[11px] text-[14px] font-semibold text-white disabled:opacity-60"
            >
              {estado === "enviando" ? "Enviando..." : "Enviar link de acesso"}
            </button>
          </form>
        )}

        {linkInvalido && estado === "inicial" && (
          <p className="mt-3 text-[12px] text-red-400">
            O link expirou ou já foi usado. Peça um novo.
          </p>
        )}
        {erro && <p className="mt-3 text-[12px] text-red-400">{erro}</p>}

        <p className="mt-5 border-t border-hairline pt-4 text-[12px] text-tinta2">
          Só olhando?{" "}
          <Link href="/" className="font-medium text-acao">
            Voltar pro painel sem entrar
          </Link>
        </p>
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
