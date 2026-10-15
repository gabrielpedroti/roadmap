"use client";

import { useCallback, useLayoutEffect, useRef } from "react";

// O item escolhido dentro do trilho: segmento ligado (botão), rádio marcado
// (label do segmentado único) ou aba atual (link)
const ESCOLHIDO =
  ':scope > [aria-pressed="true"], :scope > label:has(input:checked), :scope > [aria-current="page"]';

// Mede o item escolhido e põe a lente (abas) ou o thumb (segmentado) em
// cima dele, escrevendo --x, --w e --op no elemento; o CSS anima com a mola.
// A primeira medida, as de mudança de tamanho e a do fim do carregamento das
// fontes NÃO animam (classe .sem-transicao por dois quadros): sem isso a
// lente "voaria" do canto ao abrir a página.
export function useLente<T extends HTMLElement>(chave: string) {
  const trilhoRef = useRef<T>(null);

  const posicionar = useCallback((alvo?: HTMLElement | null) => {
    const trilho = trilhoRef.current;
    if (!trilho) return;
    const peca = trilho.querySelector<HTMLElement>(
      ":scope > .seg-thumb, :scope > .abas-lente"
    );
    if (!peca) return; // segmentado múltiplo não tem thumb
    const el = alvo ?? trilho.querySelector<HTMLElement>(ESCOLHIDO);
    // nada escolhido (ou oculto): a peça some
    if (!el || el.offsetParent === null) {
      peca.style.setProperty("--op", "0");
      return;
    }
    peca.style.setProperty("--x", `${el.offsetLeft}px`);
    peca.style.setProperty("--w", `${el.offsetWidth}px`);
    peca.style.setProperty("--op", "1");
  }, []);

  useLayoutEffect(() => {
    const trilho = trilhoRef.current;
    if (!trilho) return;
    let vivo = true;
    let quadro = 0;
    function medirSemTransicao() {
      if (!vivo || !trilho) return;
      trilho.classList.add("sem-transicao");
      posicionar();
      cancelAnimationFrame(quadro);
      quadro = requestAnimationFrame(() => {
        quadro = requestAnimationFrame(() =>
          trilho.classList.remove("sem-transicao")
        );
      });
    }
    medirSemTransicao();
    const ro = new ResizeObserver(medirSemTransicao);
    ro.observe(trilho);
    document.fonts?.ready.then(medirSemTransicao);
    return () => {
      vivo = false;
      ro.disconnect();
      cancelAnimationFrame(quadro);
    };
  }, [posicionar]);

  // a escolha mudou: a peça anda até o novo item (com transição)
  useLayoutEffect(() => {
    posicionar();
  }, [chave, posicionar]);

  return { trilhoRef, posicionar };
}
