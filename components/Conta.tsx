"use client";

import Link from "next/link";
import { Icone } from "./Icone";
import { usePopover } from "./usePopover";
import { VIDRO } from "./vidro";

// Conta, à direita da barra. Logado: cápsula de vidro com o nome, que abre
// um menu (disclosure, sem role="menu": não há navegação por setas) com o
// e-mail e "Sair". Visitante: o link "Entrar".
// O menu é IRMÃO do botão, não filho: um ancestral com backdrop-filter
// prenderia o que tem position fixed/absolute dentro dele.
export function Conta({ email }: { email: string | null }) {
  // desestruturado: o lint do React separa as refs dos valores comuns
  const { aberto, alternar, gatilhoRef, painelRef } = usePopover<HTMLButtonElement, HTMLDivElement>();

  if (!email) {
    return (
      <Link href="/login" className="conta vidro conta-entrar" style={VIDRO} aria-label="Entrar">
        <Icone nome="pessoa" className="ic-pessoa" />
        <span className="conta-nome">Entrar</span>
      </Link>
    );
  }

  const nome = email.split("@")[0];
  return (
    <div className="conta-caixa">
      <button
        ref={gatilhoRef}
        type="button"
        className="conta vidro"
        style={VIDRO}
        aria-expanded={aberto}
        aria-controls="menu-conta"
        aria-label={`Conta: ${nome}`}
        onClick={alternar}
      >
        <Icone nome="pessoa" className="ic-pessoa" />
        <span className="conta-nome">{nome}</span>
        <Icone nome="chev-baixo" className="ic-chev" />
      </button>
      <div
        ref={painelRef}
        id="menu-conta"
        className="menu vidro"
        style={VIDRO}
        hidden={!aberto}
      >
        <div className="menu-titulo">
          <Icone nome="pessoa" />
          <span>
            <span className="menu-rot">Conectado como</span>
            <span className="menu-email">{email}</span>
          </span>
        </div>
        <div className="menu-sep" />
        {/* a rota de saída é a mesma de sempre (POST /auth/signout) */}
        <form action="/auth/signout" method="post">
          <button type="submit" className="menu-item">
            <Icone nome="sair" />
            Sair
          </button>
        </form>
      </div>
    </div>
  );
}
