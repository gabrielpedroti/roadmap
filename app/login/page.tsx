"use client";

import { useEffect, useId, useRef, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ErroForm } from "@/components/ErroForm";
import { Icone } from "@/components/Icone";
import { createClient } from "@/lib/supabase/client";

// Tela única de login E cadastro: e-mail novo = conta criada automaticamente
// (signInWithOtp com shouldCreateUser). Sem senha — só magic link.
// Login é OPCIONAL: sem conta dá pra ver os roadmaps e usar o pomodoro;
// a conta serve pra salvar progresso, sessões e streak.
// Visual derivado dos tokens do padrão Apple (o mockup não tem esta tela).
function FormularioLogin() {
  const [email, setEmail] = useState("");
  const [estado, setEstado] = useState<"inicial" | "enviando" | "enviado">(
    "inicial"
  );
  const [erro, setErro] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const linkInvalido = searchParams.get("erro") === "link-invalido";
  const campoId = useId();
  const enviadoRef = useRef<HTMLDivElement>(null);

  // Enviado: o formulário (e o botão que tinha o foco) sai da tela. O foco
  // vai para o aviso "Verifique seu e-mail", e o leitor de tela o lê na
  // hora; sem isto o foco cairia no <body> e nada seria anunciado.
  useEffect(() => {
    if (estado === "enviado") enviadoRef.current?.focus();
  }, [estado]);

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
      setErro(error.message); // vai como detalhe, embaixo do texto amigável
      setEstado("inicial");
    } else {
      setEstado("enviado");
    }
  }

  return (
    <main className="login">
      <div className="cartao login-cartao">
        <h1 className="login-titulo">Roadmap</h1>
        <p className="login-texto">
          Entre com seu e-mail para salvar progresso, sessões e streak. Sem
          senha: você recebe um link de acesso.
        </p>

        {estado === "enviado" ? (
          <div className="login-enviado" ref={enviadoRef} tabIndex={-1}>
            <Icone nome="envelope" />
            <strong>Verifique seu e-mail</strong>
            <p>
              Enviamos um link de acesso para <b>{email}</b>. Abra neste mesmo
              navegador para continuar conectado.
            </p>
          </div>
        ) : (
          <form onSubmit={enviarLink} className="login-form">
            <label htmlFor={campoId} className="login-rotulo">
              E-mail
            </label>
            <input
              id={campoId}
              type="email"
              name="email"
              autoComplete="email"
              spellCheck={false}
              required
              autoFocus
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-campo"
            />
            <button
              type="submit"
              disabled={estado === "enviando"}
              aria-busy={estado === "enviando" || undefined}
              className="btn btn-prim btn-largo"
            >
              {estado === "enviando" ? "Enviando…" : "Enviar link de acesso"}
            </button>
          </form>
        )}

        {linkInvalido && estado === "inicial" && (
          <ErroForm>O link expirou ou já foi usado. Peça um novo.</ErroForm>
        )}
        {erro && (
          <ErroForm>
            Não deu para enviar o link. Confira o e-mail e tente de novo em
            instantes.
            <span className="login-detalhe">{erro}</span>
          </ErroForm>
        )}

        <p className="login-pe">
          Só olhando? <Link href="/">Voltar para a Home sem entrar</Link>
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
