import Link from "next/link";

// Cabeçalho dentro do frame: título à esquerda, "usuário · sair" à direita
export function Cabecalho({
  email,
  volta,
}: {
  email: string;
  volta?: { href: string; rotulo: string };
}) {
  return (
    <div className="mb-[14px] flex items-center justify-between">
      <div className="flex items-center gap-2">
        {volta && (
          <Link
            href={volta.href}
            className="text-[12px] text-suave hover:text-texto"
          >
            ‹ {volta.rotulo}
          </Link>
        )}
        <span className="text-[15px] font-semibold text-texto">
          Painel de estudos
        </span>
      </div>
      <div className="flex items-center gap-1 text-[12px] text-suave">
        <span>{email.split("@")[0]} ·</span>
        <form action="/auth/signout" method="post">
          <button type="submit" className="cursor-pointer hover:text-texto">
            sair
          </button>
        </form>
      </div>
    </div>
  );
}
