"use client";

import { useId, type ReactNode, type Ref } from "react";
import { useLente } from "./useLente";

// Controle de escolha em cápsula (segmentado do iOS 26), em três modos:
// - "unico": sempre um escolhido. Rádios NATIVOS escondidos dentro de cada
//   <label>, então as setas do teclado funcionam sem código.
// - "desmarcavel": clicar no ligado o DESMARCA (regra do Pomodoro: trilha,
//   foco e pausa). Botões com aria-pressed. As regras de "ao menos um" ficam
//   em quem usa, não aqui.
// - "multiplo": vários ligados (dias que contam). Sem thumb deslizante.
// O thumb é SÓLIDO (nunca vidro) e desliza até o escolhido (useLente).

export type OpcaoSeg = {
  valor: string;
  conteudo: ReactNode; // texto ou ícone
  titulo?: string; // title: o nome inteiro, se o texto for cortado
  ariaLabel?: string;
  // só nos modos com botão (ex.: o lápis do foco personalizado abre um popover)
  ref?: Ref<HTMLButtonElement>;
  ariaHaspopup?: "dialog";
  ariaExpanded?: boolean;
  ariaControls?: string;
};

type Comum = {
  opcoes: OpcaoSeg[];
  onEscolher: (valor: string) => void;
  ariaLabel?: string;
  ariaLabelledby?: string;
  className?: string;
};

type Props =
  | (Comum & { modo: "unico"; valor: string })
  | (Comum & { modo: "desmarcavel"; valor: string | null; travado?: boolean })
  | (Comum & { modo: "multiplo"; valores: string[] });

// texto longo ganha reticências (o CSS de .seg-txt corta); ícone passa direto
function rotulo(conteudo: ReactNode) {
  return typeof conteudo === "string" ? <span className="seg-txt">{conteudo}</span> : conteudo;
}

export function Segmentado(props: Props) {
  const nome = useId(); // name dos rádios do modo único
  const chave =
    props.modo === "multiplo"
      ? props.valores.join()
      : `${props.valor}|${props.opcoes.map((o) => o.valor).join()}`;
  const { trilhoRef } = useLente<HTMLDivElement>(chave);
  const classes = ["seg", props.modo === "multiplo" ? "multi" : "", props.className ?? ""]
    .filter(Boolean)
    .join(" ");

  if (props.modo === "unico") {
    return (
      <div
        ref={trilhoRef}
        className={classes}
        role="radiogroup"
        aria-label={props.ariaLabel}
        aria-labelledby={props.ariaLabelledby}
      >
        <span className="seg-thumb" aria-hidden="true" />
        {props.opcoes.map((o) => (
          <label key={o.valor} title={o.titulo}>
            <input
              type="radio"
              className="sr"
              name={nome}
              value={o.valor}
              checked={o.valor === props.valor}
              onChange={() => props.onEscolher(o.valor)}
              aria-label={o.ariaLabel}
            />
            {rotulo(o.conteudo)}
          </label>
        ))}
      </div>
    );
  }

  const ligado = (v: string) =>
    props.modo === "multiplo" ? props.valores.includes(v) : props.valor === v;
  // travado: parece desligado, mas continua focável e clicável (aria-disabled,
  // não disabled): o clique não muda nada e quem usa explica o motivo
  const travado = props.modo === "desmarcavel" && !!props.travado;

  return (
    <div
      ref={trilhoRef}
      className={classes}
      role="group"
      aria-label={props.ariaLabel}
      aria-labelledby={props.ariaLabelledby}
      data-travado={travado ? "" : undefined}
    >
      {props.modo === "desmarcavel" && <span className="seg-thumb" aria-hidden="true" />}
      {props.opcoes.map((o) => (
        <button
          key={o.valor}
          ref={o.ref}
          type="button"
          aria-pressed={ligado(o.valor)}
          aria-disabled={travado || undefined}
          aria-label={o.ariaLabel}
          title={o.titulo}
          aria-haspopup={o.ariaHaspopup}
          aria-expanded={o.ariaExpanded}
          aria-controls={o.ariaControls}
          onClick={() => props.onEscolher(o.valor)}
        >
          {rotulo(o.conteudo)}
        </button>
      ))}
    </div>
  );
}
