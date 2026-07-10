import Link from "next/link";

// "quinta-feira, 9 de julho" — no fuso de São Paulo
function dataDeHoje() {
  return new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "America/Sao_Paulo",
  });
}

// Cabeçalho IDÊNTICO em todas as telas (título nunca sai do lugar):
// título + data à esquerda; "usuário · sair" (logado) ou "entrar" à direita.
// O botão de voltar das trilhas fica no card da trilha, não aqui.
export function Cabecalho({ email }: { email: string | null }) {
  return (
    <header className="flex items-baseline justify-between px-1 pb-4">
      <div>
        <h1 className="text-[clamp(19px,2vw,22px)] font-semibold tracking-[-0.02em] text-tinta">
          Roadmap
        </h1>
        <div className="mt-[2px] text-[13px] text-tinta2">{dataDeHoje()}</div>
      </div>

      {email ? (
        <div className="flex items-center gap-1 text-[13px] text-tinta2">
          <span>
            <b className="font-medium text-tinta">{email.split("@")[0]}</b> ·
          </span>
          <form action="/auth/signout" method="post">
            <button type="submit" className="cursor-pointer hover:text-tinta">
              sair
            </button>
          </form>
        </div>
      ) : (
        <Link
          href="/login"
          className="text-[13px] font-medium text-acao hover:opacity-80"
        >
          entrar
        </Link>
      )}
    </header>
  );
}
