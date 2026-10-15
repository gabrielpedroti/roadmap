import type { CSSProperties } from "react";
import { VIDRO } from "./vidro";

// Peças dos esqueletos de carregamento (app/loading.tsx e
// app/trilha/[slug]/loading.tsx): formas cinza (--fill) que pulsam, nos
// lugares reais dos cartões. Com movimento reduzido elas não pulsam (CSS).

// uma forma: largura e altura em CSS ("55%", 120, …); redonda = cápsula
export function Forma({
  w,
  h,
  redonda = false,
  estilo,
}: {
  w?: number | string;
  h: number | string;
  redonda?: boolean;
  estilo?: CSSProperties;
}) {
  return (
    <span
      className="esq"
      style={{ width: w, height: h, borderRadius: redonda ? 999 : undefined, ...estilo }}
    />
  );
}

// a cápsula de vidro das abas com 4 pílulas: o loading não busca dados, então
// não sabe o nome das trilhas (para ter as abas reais, o cabeçalho teria de
// ir para um layout; fora do escopo)
export function AbasEsqueleto() {
  return (
    <div className="abas abas-topo vidro" style={VIDRO} aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className="esq esq-pilula" />
      ))}
    </div>
  );
}
