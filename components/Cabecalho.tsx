import Link from "next/link";
import type { Track } from "@/lib/types";

// "quinta-feira, 9 de julho" — no fuso de São Paulo
function dataDeHoje() {
  return new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "America/Sao_Paulo",
  });
}

// Cabeçalho IDÊNTICO em todas as telas: título + data e usuário na 1ª linha;
// navegação (Home + trilhas) na 2ª linha. É por aqui que se vai e volta entre
// o painel e cada trilha — não existe mais botão "voltar" solto.
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
    <header className="pb-4">
      <div className="flex items-baseline justify-between px-1">
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
      </div>

      <NavTrilhas tracks={tracks} atual={atual} />
    </header>
  );
}

// Pílulas de navegação: 🏠 Painel + uma por trilha. A trilha ativa acende
// na sua cor; a Home ativa fica neutra preenchida.
function NavTrilhas({ tracks, atual }: { tracks: Track[]; atual: string }) {
  const base =
    "flex shrink-0 items-center gap-[6px] rounded-full px-[14px] py-[7px] text-[13px] font-medium transition-colors whitespace-nowrap";

  return (
    <nav className="scroll-x mt-3 flex gap-2 px-1">
      <Link
        href="/"
        aria-label="Painel"
        className={`${base} ${
          atual === "home"
            ? "bg-tinta text-fundo"
            : "text-tinta2 hover:bg-seg hover:text-tinta"
        }`}
      >
        <span aria-hidden>🏠</span>
        <span className="max-sm:hidden">Painel</span>
      </Link>

      {tracks.map((t) => {
        const ativa = atual === t.slug;
        return (
          <Link
            key={t.id}
            href={`/trilha/${t.slug}`}
            className={`com-cor ${base} ${
              ativa ? "" : "text-tinta2 hover:bg-seg hover:text-tinta"
            }`}
            style={
              ativa
                ? ({
                    "--cor": t.cor,
                    background: "var(--cor-fundo)",
                    color: "var(--cor-texto)",
                  } as React.CSSProperties)
                : undefined
            }
          >
            {t.nome}
          </Link>
        );
      })}
    </nav>
  );
}
