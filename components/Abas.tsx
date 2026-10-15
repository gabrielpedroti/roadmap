"use client";

import { useEffect, useRef, type PointerEvent } from "react";
import Link from "next/link";
import { useLente } from "./useLente";
import { VIDRO } from "./vidro";

export type DestinoAba = { href: string; rotulo: string; atual: boolean };

// Abas de vidro: "Home | trilha 1 | trilha 2 | …" (as trilhas vêm do banco).
// Links de verdade com aria-current="page" (sem role="menu"). A aba atual
// ganha a lente; ao tocar outra aba, a lente vai até ela e cresce um pouco
// (pressão) e, se não houve navegação, volta para a atual em 450 ms.
// `posicao`: "topo" (na barra) ou "pe" (no celular, perto do polegar).
export function Abas({
  destinos,
  posicao,
}: {
  destinos: DestinoAba[];
  posicao: "topo" | "pe";
}) {
  const atual = destinos.find((d) => d.atual)?.href ?? "";
  const { trilhoRef, posicionar } = useLente<HTMLElement>(atual);
  const volta = useRef<number | undefined>(undefined);

  // muitas trilhas: a cápsula rola na horizontal; ao montar, a aba atual
  // fica à vista
  useEffect(() => {
    const nav = trilhoRef.current;
    const aba = nav?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!nav || !aba) return;
    const fora =
      aba.offsetLeft < nav.scrollLeft ||
      aba.offsetLeft + aba.offsetWidth > nav.scrollLeft + nav.clientWidth;
    if (fora) nav.scrollLeft = aba.offsetLeft - (nav.clientWidth - aba.offsetWidth) / 2;
  }, [trilhoRef]);

  useEffect(() => () => window.clearTimeout(volta.current), []);

  function pressionar(e: PointerEvent<HTMLElement>) {
    const aba = (e.target as HTMLElement).closest("a");
    if (!aba) return;
    window.clearTimeout(volta.current);
    trilhoRef.current?.setAttribute("data-pressao", "");
    posicionar(aba);
  }
  function soltar() {
    const nav = trilhoRef.current;
    if (!nav?.hasAttribute("data-pressao")) return;
    nav.removeAttribute("data-pressao");
    volta.current = window.setTimeout(() => posicionar(), 450);
  }

  return (
    <nav
      ref={trilhoRef}
      className={`abas abas-${posicao} vidro`}
      style={VIDRO}
      aria-label="Seções"
      onPointerDown={pressionar}
      onPointerUp={soltar}
      onPointerLeave={soltar}
      onPointerCancel={soltar}
    >
      <span className="abas-lente" aria-hidden="true" />
      {destinos.map((d) => (
        <Link
          key={d.href}
          href={d.href}
          aria-current={d.atual ? "page" : undefined}
          data-rotulo={d.rotulo}
        >
          {d.rotulo}
        </Link>
      ))}
    </nav>
  );
}
