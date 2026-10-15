"use client";

import { useId, useState, type FormEvent, type RefObject } from "react";
import { Passo } from "../Passo";
import { VIDRO } from "../vidro";

// "Foco personalizado": substitui o prompt() nativo. Abre do 4º segmento do
// foco (o lápis). Começa em 35, como o prompt de antes. Valor inválido (0 ou
// vazio) mostra o motivo no próprio campo, em vez de não fazer nada.
// O Pomodoro monta este popover de novo a cada abertura (key), então o texto
// e o erro daqui nunca sobram de uma vez para a outra.
export function PopoverFocoCustom({
  id,
  painelRef,
  aberto,
  onAplicar,
  onCancelar,
}: {
  id: string; // o aria-controls do lápis aponta para cá
  painelRef: RefObject<HTMLFormElement | null>;
  aberto: boolean;
  onAplicar: (min: number) => void;
  onCancelar: () => void;
}) {
  const campoId = useId();
  const erroId = useId();
  const [texto, setTexto] = useState("35");
  const [erro, setErro] = useState(false);

  function aplicar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const min = parseInt(texto, 10);
    if (!(min > 0)) {
      setErro(true);
      document.getElementById(campoId)?.focus();
      return;
    }
    setErro(false);
    onAplicar(min);
  }

  return (
    <form
      ref={painelRef}
      id={id}
      className="pop vidro pop-custom"
      style={VIDRO}
      role="dialog"
      aria-label="Foco personalizado"
      noValidate
      hidden={!aberto}
      onSubmit={aplicar}
    >
      <label htmlFor={campoId}>Minutos de foco</label>
      <Passo
        id={campoId}
        valor={texto}
        onMudar={(t) => {
          setTexto(t);
          setErro(false);
        }}
        min={1}
        unidade="min"
        stepper
        rotuloMenos="Menos 1 minuto"
        rotuloMais="Mais 1 minuto"
        invalido={erro}
        descritoPor={erro ? erroId : undefined}
      />
      {erro && (
        <p className="campo-erro" id={erroId}>
          Use um número de minutos maior que zero.
        </p>
      )}
      <div className="pop-acoes">
        <button
          type="button"
          className="btn btn-sec btn-p"
          onClick={() => {
            setErro(false);
            onCancelar();
          }}
        >
          Cancelar
        </button>
        <button type="submit" className="btn btn-prim btn-p">
          Aplicar
        </button>
      </div>
    </form>
  );
}
