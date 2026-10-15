"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Menu da conta e popovers do Pomodoro: abrem a partir de um botão (o
// gatilho) e fecham com Esc (devolvendo o foco ao gatilho), com clique fora
// ou quando quem usa pede (fechar). O painel fica sempre no DOM, com
// hidden quando fechado, para o aria-controls do gatilho apontar para ele.
export function usePopover<
  G extends HTMLElement = HTMLButtonElement,
  P extends HTMLElement = HTMLDivElement,
>() {
  const [aberto, setAberto] = useState(false);
  const gatilhoRef = useRef<G>(null);
  const painelRef = useRef<P>(null);

  const fechar = useCallback((devolverFoco: boolean) => {
    setAberto(false);
    if (devolverFoco) gatilhoRef.current?.focus();
  }, []);
  const abrir = useCallback(() => setAberto(true), []);
  const alternar = useCallback(() => setAberto((a) => !a), []);

  useEffect(() => {
    if (!aberto) return;
    const painel = painelRef.current;
    // nasce do botão (animação materializa) e o foco vai para o 1º controle
    painel?.setAttribute("data-abrindo", "");
    const fimDaAnimacao = () => painel?.removeAttribute("data-abrindo");
    painel?.addEventListener("animationend", fimDaAnimacao, { once: true });
    painel
      ?.querySelector<HTMLElement>("input, button:not([disabled]), a[href]")
      ?.focus();

    function cliqueFora(e: PointerEvent) {
      const alvo = e.target as Node;
      if (painelRef.current?.contains(alvo)) return;
      if (gatilhoRef.current?.contains(alvo)) return; // o gatilho alterna sozinho
      setAberto(false);
    }
    function tecla(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      e.preventDefault();
      fechar(true);
    }
    document.addEventListener("pointerdown", cliqueFora);
    document.addEventListener("keydown", tecla);
    return () => {
      document.removeEventListener("pointerdown", cliqueFora);
      document.removeEventListener("keydown", tecla);
      painel?.removeEventListener("animationend", fimDaAnimacao);
    };
  }, [aberto, fechar]);

  return { aberto, abrir, fechar, alternar, gatilhoRef, painelRef };
}
