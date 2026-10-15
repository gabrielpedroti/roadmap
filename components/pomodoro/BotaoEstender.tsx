"use client";

import { useId } from "react";
import { Icone } from "../Icone";
import { usePopover } from "../usePopover";
import { VIDRO } from "../vidro";

// "+ tempo" (só rodando, na fase de foco): o botão quadrado (+ relógio) abre
// +1/+2/+5 min, que estendem o foco em curso SEM quebrar o ciclo. Ao
// escolher, o popover fecha e o foco volta ao botão.
// Quando a fase muda, este componente sai da tela e o popover vai junto.
export function BotaoEstender({ onAdd }: { onAdd: (min: number) => void }) {
  // desestruturado: o lint do React separa as refs dos valores comuns
  const { aberto, alternar, fechar, gatilhoRef, painelRef } = usePopover<HTMLButtonElement, HTMLDivElement>();
  const id = useId();

  return (
    <div className="estender">
      <button
        ref={gatilhoRef}
        type="button"
        className="btn btn-sec btn-quadrado"
        aria-label="Adicionar minutos ao foco"
        title="Adicionar minutos ao foco"
        aria-expanded={aberto}
        aria-controls={id}
        onClick={alternar}
      >
        <Icone nome="mais" className="ic-mais" />
        <Icone nome="relogio" />
      </button>
      <div
        ref={painelRef}
        id={id}
        className="pop vidro pop-mais"
        style={VIDRO}
        role="group"
        aria-label="Adicionar ao foco"
        hidden={!aberto}
      >
        {[1, 2, 5].map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              onAdd(m);
              fechar(true);
            }}
          >
            +{m} min
          </button>
        ))}
      </div>
    </div>
  );
}
