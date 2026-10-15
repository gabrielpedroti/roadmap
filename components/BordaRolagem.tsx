"use client";

import { useEffect } from "react";

// Liga dois atributos no .app da página ([data-app]):
// - data-rolou: há conteúdo passando por baixo da barra (a névoa aparece);
// - data-sobre-campo: a barra está em cima do campo colorido da trilha (o
//   vidro das abas e da conta fica escuro). Na tela de trilha ele já nasce
//   no servidor; aqui ele só é recalculado ao montar (a página pode voltar
//   já rolada) e ao rolar.
// Não desenha nada.
export function BordaRolagem() {
  useEffect(() => {
    const app = document.querySelector<HTMLElement>("[data-app]");
    if (!app) return;
    let pedido = 0;

    function medir() {
      pedido = 0;
      const r = app!.getBoundingClientRect();
      app!.toggleAttribute("data-rolou", r.top < -6 && r.bottom > 90);
      const campo = app!.querySelector<HTMLElement>(".campo");
      const barra = app!.querySelector<HTMLElement>(".barra");
      if (campo && barra) {
        const b = barra.getBoundingClientRect();
        // no celular a barra é display: contents (altura 0): usa 34 px
        const meio = b.height ? b.top + b.height / 2 : 34;
        app!.toggleAttribute("data-sobre-campo", campo.getBoundingClientRect().bottom > meio);
      }
    }
    // no máximo uma medida por quadro
    function pedir() {
      if (!pedido) pedido = requestAnimationFrame(medir);
    }

    medir();
    addEventListener("scroll", pedir, { passive: true });
    addEventListener("resize", pedir);
    return () => {
      removeEventListener("scroll", pedir);
      removeEventListener("resize", pedir);
      cancelAnimationFrame(pedido);
    };
  }, []);

  return null;
}
