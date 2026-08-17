"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Overlay genérico dos modais (registro manual e configurações).
// Fecha por: ✕, clique no fundo e tecla Esc — sempre existe uma saída.
export function Modal({
  titulo,
  aberto,
  onFechar,
  children,
}: {
  titulo: string;
  aberto: boolean;
  onFechar: () => void;
  children: React.ReactNode;
}) {
  // enquanto `fechando` é true o modal continua na tela tocando a animação
  // de saída — que é a de entrada ao contrário (mesmo caminho nos 2 sentidos)
  const [fechando, setFechando] = useState(false);
  const cartaoRef = useRef<HTMLDivElement>(null);

  // useCallback pra `fechar` ser estável e poder entrar nas deps do efeito
  const fechar = useCallback(() => {
    setFechando(true);
    setTimeout(() => {
      setFechando(false);
      onFechar();
    }, 160); // igual à duração de modal-sai no globals.css
  }, [onFechar]);

  // Esc fecha. Sem isto, quem usa teclado fica preso no modal.
  useEffect(() => {
    if (!aberto) return;
    function aoTeclar(e: KeyboardEvent) {
      if (e.key === "Escape") fechar();
    }
    document.addEventListener("keydown", aoTeclar);
    // manda o foco pra dentro do modal ao abrir
    cartaoRef.current?.focus();
    return () => document.removeEventListener("keydown", aoTeclar);
  }, [aberto, fechar]);

  if (!aberto) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
        fechando ? "modal-fechando" : ""
      }`}
    >
      <div
        className="modal-scrim absolute inset-0 bg-black/50"
        onClick={fechar}
      />
      <div
        ref={cartaoRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={titulo}
        className="cartao modal-cartao relative w-full max-w-sm p-5 outline-none"
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[14px] font-semibold text-tinta">{titulo}</span>
          <button
            onClick={fechar}
            className="cursor-pointer text-tinta2 hover:text-tinta"
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
