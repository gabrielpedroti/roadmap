import Link from "next/link";
import type { Track } from "@/lib/types";
import { NavSeletor } from "./NavSeletor";

// "quinta-feira, 9 de julho" — no fuso de São Paulo
function dataDeHoje() {
  return new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "America/Sao_Paulo",
  });
}

// Cabeçalho IDÊNTICO em todas as telas, numa linha só: título + data à
// esquerda, SELETOR de navegação (Painel/trilhas) centralizado, usuário à
// direita. O seletor é compacto (dropdown) pra aproveitar o espaço do meio
// sem esticar o cabeçalho pra baixo.
// `atual` = "home" no painel, ou o slug da trilha aberta.
export function Cabecalho({
  email,
  tracks,
  atual,
}: {
  email: string | null;
  tracks: Track[];
  atual: string;
}) {
  return (
    <header className="relative mb-5 flex items-center justify-between gap-3">
      <div className="min-w-0">
        <h1 className="text-[clamp(18px,2vw,22px)] font-semibold tracking-[-0.02em] text-tinta">
          Roadmap
        </h1>
        <div className="truncate text-[12px] text-tinta2 max-sm:hidden">
          {dataDeHoje()}
        </div>
      </div>

      {/* seletor absolutamente centralizado: fica no meio da tela, alinhado,
          independente da largura do título e do usuário (inclusive no mobile) */}
      {tracks.length > 0 && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <NavSeletor tracks={tracks} atual={atual} />
        </div>
      )}

      <div className="flex shrink-0 justify-end">
        {email ? (
          <div className="flex items-center gap-1 text-[13px] text-tinta2">
            <span className="max-sm:hidden">
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
      </div>
    </header>
  );
}
