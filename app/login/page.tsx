"use client";

import { useId, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
          <div className="login-enviado" role="status">
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
          <p className="form-erro" role="alert">
            <Icone nome="alerta" />
            <span>O link expirou ou já foi usado. Peça um novo.</span>
          </p>
        )}
        {erro && (
          <div className="form-erro" role="alert">
            <Icone nome="alerta" />
            <span>
              Não deu para enviar o link. Confira o e-mail e tente de novo em
              instantes.
              <span className="login-detalhe">{erro}</span>
            </span>
          </div>
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
