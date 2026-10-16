"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  type FormEvent,
  type ReactNode,
} from "react";
import { ErroForm } from "./ErroForm";
import { Icone } from "./Icone";
import { VIDRO } from "./vidro";

// Folha de formulário (o modal): um <dialog> aberto com showModal(), que dá
// de graça a camada do topo, o foco preso dentro, o fundo inerte e o Esc.
// O componente fica SEMPRE montado e sincroniza com `aberto` pelos dois lados.
// - Fechar (Cancelar, Esc, clique no fundo ou `aberto` virar false): a classe
//   "fechando" toca a animação de saída e só no fim chama dialog.close().
// - Quem avisa o React que fechou é SEMPRE o evento "close" do <dialog>: o
//   navegador pode fechar sozinho, sem animação (no Chrome, um segundo Esc
//   seguido fecha direto). Se só o fim da animação avisasse, `aberto`
//   ficaria true e a engrenagem não reabriria mais a folha.
export function Folha({
  aberto,
  onFechar,
  titulo,
  rotuloEnviar,
  enviando,
  onEnviar,
  erro,
  children,
}: {
  aberto: boolean;
  onFechar: () => void;
  titulo: string;
  rotuloEnviar: string; // "Salvar" ou "Registrar" (botão circular com o visto)
  enviando: boolean;
  onEnviar: (e: FormEvent<HTMLFormElement>) => void;
  erro?: string | null; // o motivo de não ter salvo (aparece no fim do corpo)
  children: ReactNode;
}) {
  const dialogo = useRef<HTMLDialogElement>(null);
  const tituloRef = useRef<HTMLHeadingElement>(null);
  const origem = useRef<HTMLElement | null>(null); // quem abriu (recebe o foco de volta)
  const apertouNoFundo = useRef(false);
  // tira o ouvinte que espera o fim da animação de saída (null = nada esperando)
  const pararDeEsperar = useRef<(() => void) | null>(null);
  const tituloId = useId();

  // pede o fechamento animado; sem animação (ou já fechando), fecha na hora
  const pedirFechamento = useCallback(() => {
    const dlg = dialogo.current;
    if (!dlg?.open || dlg.classList.contains("fechando")) return;
    const folha = dlg.querySelector<HTMLElement>(".folha");
    dlg.classList.add("fechando");
    if (!folha || getComputedStyle(folha).animationName === "none") {
      dlg.close();
      return;
    }
    function aoTerminar(e: AnimationEvent) {
      if (e.target !== folha) return; // animação de um filho: ignora
      folha!.removeEventListener("animationend", aoTerminar);
      dlg!.close();
    }
    folha.addEventListener("animationend", aoTerminar);
    pararDeEsperar.current = () => folha.removeEventListener("animationend", aoTerminar);
  }, []);

  // sincroniza o <dialog> com `aberto`
  useEffect(() => {
    const dlg = dialogo.current;
    if (!dlg) return;
    if (aberto && !dlg.open) {
      origem.current =
        document.activeElement instanceof HTMLElement ? document.activeElement : null;
      dlg.classList.remove("fechando");
      dlg.showModal();
      tituloRef.current?.focus(); // o leitor de tela anuncia o título
    } else if (!aberto && dlg.open) {
      pedirFechamento();
    }
  }, [aberto, pedirFechamento]);

  // o <dialog> fechou (por nós ou pelo navegador): avisa quem abriu.
  // Rodar duas vezes não quebra nada.
  function aoFechar() {
    // Se o navegador fechou antes do fim da animação (Esc duplo), o ouvinte
    // ainda espera: sem isto, o fim da animação de ENTRADA da próxima
    // abertura chamaria close() e a folha fecharia sozinha.
    pararDeEsperar.current?.();
    pararDeEsperar.current = null;
    dialogo.current?.classList.remove("fechando");
    onFechar();
    origem.current?.focus();
  }

  return (
    <dialog
      ref={dialogo}
      className="dlg"
      aria-labelledby={tituloId}
      onClose={aoFechar}
      onCancel={(e) => {
        e.preventDefault(); // Esc: fecha COM a animação
        pedirFechamento();
      }}
      // clique no fundo escurecido: o alvo é o próprio <dialog> (fora da
      // .folha). Só vale se o clique também COMEÇOU no fundo (arrastar uma
      // seleção de texto para fora não fecha a folha)
      onPointerDown={(e) => {
        apertouNoFundo.current = e.target === e.currentTarget;
      }}
      onClick={(e) => {
        if (apertouNoFundo.current && e.target === e.currentTarget) pedirFechamento();
      }}
    >
      <div className="folha">
        <div className="folha-alca" aria-hidden="true" />
        <form className="form" onSubmit={onEnviar}>
          <header className="folha-cab">
            <button
              type="button"
              className="btn-circ vidro"
              style={VIDRO}
              aria-label="Cancelar"
              title="Cancelar"
              onClick={pedirFechamento}
            >
              <Icone nome="x" />
            </button>
            <h2 id={tituloId} ref={tituloRef} tabIndex={-1}>
              {titulo}
            </h2>
            <button
              type="submit"
              className="btn-circ prom"
              aria-label={enviando ? "Salvando…" : rotuloEnviar}
              title={rotuloEnviar}
              disabled={enviando}
              aria-busy={enviando || undefined}
            >
              <Icone nome="visto" />
            </button>
          </header>
          <div className="folha-corpo">
            {children}
            {erro && <ErroForm>{erro}</ErroForm>}
          </div>
        </form>
      </div>
    </dialog>
  );
}
