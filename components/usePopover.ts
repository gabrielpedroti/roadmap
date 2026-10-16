"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Menu da conta e popovers do Pomodoro: abrem a partir de um botão (o
// gatilho) e fecham:
// - com Esc (devolvendo o foco ao gatilho);
// - com clique fora;
// - quando o foco sai deles (Tab para fora), sem puxar o foco de volta:
//   assim nenhum painel fica aberto esquecido por cima de outro controle;
// - quando quem usa pede (fechar).
// O painel fica sempre no DOM, com hidden quando fechado, para o
// aria-controls do gatilho apontar para ele.
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

    // o alvo está no painel ou no gatilho? (o gatilho alterna sozinho)
    function eDoPopover(alvo: EventTarget | null) {
      return (
        alvo instanceof Node &&
        (!!painelRef.current?.contains(alvo) || !!gatilhoRef.current?.contains(alvo))
      );
    }
    function cliqueFora(e: PointerEvent) {
      if (!eDoPopover(e.target)) setAberto(false);
    }
    function focoFora(e: FocusEvent) {
      if (!eDoPopover(e.target)) setAberto(false);
    }
    function tecla(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      // com uma folha (<dialog>) aberta, o Esc é dela: não fecha a folha só
      // por causa de um painel esquecido atrás
      if (document.querySelector("dialog[open]")) return;
      e.preventDefault();
      fechar(true);
    }
    document.addEventListener("pointerdown", cliqueFora);
    document.addEventListener("focusin", focoFora);
    document.addEventListener("keydown", tecla);
    return () => {
      document.removeEventListener("pointerdown", cliqueFora);
      document.removeEventListener("focusin", focoFora);
      document.removeEventListener("keydown", tecla);
      painel?.removeEventListener("animationend", fimDaAnimacao);
    };
  }, [aberto, fechar]);

  return { aberto, fechar, alternar, gatilhoRef, painelRef };
}
