"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Track } from "@/lib/types";

// Seletor de navegação compacto que fica CENTRALIZADO no cabeçalho, entre o
// título e o usuário. Mostra onde você está (Painel ou uma trilha, com o
// pontinho da cor) e abre um menu com todos os destinos. Ocupa uma linha só,
// curtinho — substitui a fileira de pílulas que tomava espaço.
export function NavSeletor({
  tracks,
  atual,
}: {
  tracks: Track[];
  atual: string; // "home" ou o slug da trilha
}) {
  const [aberto, setAberto] = useState(false);
  const caixa = useRef<HTMLDivElement>(null);

  // fecha ao clicar fora ou apertar Esc
  useEffect(() => {
    if (!aberto) return;
    function fora(e: MouseEvent) {
      if (caixa.current && !caixa.current.contains(e.target as Node)) {
        setAberto(false);
      }
    }
    function esc(e: KeyboardEvent) {
      if (e.key === "Escape") setAberto(false);
    }
    document.addEventListener("mousedown", fora);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", fora);
      document.removeEventListener("keydown", esc);
    };
  }, [aberto]);

  const trilhaAtual = tracks.find((t) => t.slug === atual);
  const rotuloAtual = trilhaAtual ? trilhaAtual.nome : "Painel";

  const item =
    "flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] transition-colors";

  return (
    <div ref={caixa} className="relative">
      <button
        onClick={() => setAberto((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={aberto}
        className="flex items-center gap-2 rounded-full bg-seg px-4 py-[7px] text-[13px] font-medium text-tinta transition-colors hover:brightness-95"
      >
        {trilhaAtual ? (
          <span
            className="com-cor h-2 w-2 rounded-full"
            style={
              {
                "--cor": trilhaAtual.cor,
                background: "var(--cor-final)",
              } as React.CSSProperties
            }
          />
        ) : (
          <span aria-hidden>🏠</span>
        )}
        {rotuloAtual}
        <span
          className={`text-tinta2 transition-transform ${aberto ? "rotate-180" : ""}`}
          aria-hidden
        >
          ▾
        </span>
      </button>

      {aberto && (
        <div
          role="menu"
          className="cartao absolute left-1/2 top-full z-50 mt-2 w-[220px] -translate-x-1/2 p-1"
        >
          <Link
            href="/"
            role="menuitem"
            onClick={() => setAberto(false)}
            className={`${item} ${
              atual === "home"
                ? "bg-seg font-semibold text-tinta"
                : "text-tinta2 hover:bg-seg hover:text-tinta"
            }`}
          >
            <span aria-hidden>🏠</span>
            Painel
          </Link>
          {tracks.map((t) => {
            const ativa = atual === t.slug;
            return (
              <Link
                key={t.id}
                href={`/trilha/${t.slug}`}
                role="menuitem"
                onClick={() => setAberto(false)}
                className={`com-cor ${item} ${
                  ativa
                    ? "bg-seg font-semibold text-tinta"
                    : "text-tinta2 hover:bg-seg hover:text-tinta"
                }`}
                style={{ "--cor": t.cor } as React.CSSProperties}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: "var(--cor-final)" }}
                />
                {t.nome}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
