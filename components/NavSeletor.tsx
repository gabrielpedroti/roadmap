"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Track } from "@/lib/types";

// Seletor de navegação compacto, CENTRALIZADO no cabeçalho. Formato de
// retângulo arredondado (igual aos controles do pomodoro), sem bolinhas nem
// emoji: "Home" para o painel e o nome da trilha NA COR dela quando é uma
// trilha. Abre um menu com todos os destinos.
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
  const item =
    "flex items-center rounded-lg px-3 py-2 text-[13px] transition-colors";

  return (
    <div ref={caixa} className="relative">
      <button
        onClick={() => setAberto((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={aberto}
        className="com-cor flex items-center gap-2 rounded-[10px] bg-seg px-4 py-[7px] text-[13px] font-semibold transition-colors hover:brightness-95"
        style={
          trilhaAtual
            ? ({
                "--cor": trilhaAtual.cor,
                color: "var(--cor-texto)",
              } as React.CSSProperties)
            : undefined
        }
      >
        <span className={trilhaAtual ? "" : "text-tinta"}>
          {trilhaAtual ? trilhaAtual.nome : "Home"}
        </span>
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
            Home
          </Link>
          {tracks.map((t) => {
            const ativa = atual === t.slug;
            return (
              <Link
                key={t.id}
                href={`/trilha/${t.slug}`}
                role="menuitem"
                onClick={() => setAberto(false)}
                className={`com-cor ${item} font-medium ${ativa ? "bg-seg" : "hover:bg-seg"}`}
                style={
                  { "--cor": t.cor, color: "var(--cor-texto)" } as React.CSSProperties
                }
              >
                {t.nome}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
