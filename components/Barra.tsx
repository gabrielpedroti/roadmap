import { semEmoji } from "@/lib/texto";
import type { Track } from "@/lib/types";
import { Abas, type DestinoAba } from "./Abas";
import { BordaRolagem } from "./BordaRolagem";
import { Conta } from "./Conta";
import { BORDA_BLUR } from "./vidro";

// "Quarta-feira, 14 de outubro" (a maiúscula vem do CSS ::first-letter), no
// fuso de São Paulo
function dataDeHoje() {
  return new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "America/Sao_Paulo",
  });
}

// "Home" e uma aba por trilha, na ordem do banco. `atual` = "home" ou o slug
export function destinosDasAbas(tracks: Track[], atual: string): DestinoAba[] {
  return [
    { href: "/", rotulo: "Home", atual: atual === "home" },
    ...tracks.map((t) => ({
      href: `/trilha/${t.slug}`,
      rotulo: semEmoji(t.nome),
      atual: atual === t.slug,
    })),
  ];
}

// A barra do topo (a camada de controle): título e data à esquerda (só na
// Home; na trilha o título é o do campo), abas de vidro no centro e a conta
// à direita, no mesmo eixo. No celular ela "some" (display: contents): as
// abas descem para o pé (a página renderiza <Abas posicao="pe"> depois do
// <main>) e a conta vira um círculo no canto.
export function Barra({
  email,
  tracks,
  atual,
  titulo,
}: {
  email: string | null;
  tracks: Track[];
  atual: string;
  titulo?: string;
}) {
  return (
    <header className="barra">
      {/* névoa da borda de rolagem: o blur vai inline (Lightning CSS) */}
      <span className="barra-borda" aria-hidden="true" style={BORDA_BLUR} />
      {titulo ? (
        <div className="barra-titulo">
          <h1 className="titulo-barra">{titulo}</h1>
          <p className="subtitulo">{dataDeHoje()}</p>
        </div>
      ) : (
        <span className="barra-ini" aria-hidden="true" />
      )}
      <Abas destinos={destinosDasAbas(tracks, atual)} posicao="topo" />
      <div className="barra-fim">
        <Conta email={email} />
      </div>
      <BordaRolagem />
    </header>
  );
}
