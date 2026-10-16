import { VIDRO } from "./vidro";

// Peças dos esqueletos de carregamento (app/loading.tsx e
// app/trilha/[slug]/loading.tsx): formas cinza (--fill) que pulsam, nos
// lugares reais dos cartões. Com movimento reduzido elas não pulsam (CSS).

// uma forma: largura e altura em CSS ("55%", 120, …); redonda = cápsula.
// Forma com desenho próprio (círculo, raio, altura da linha) leva uma classe
// do bloco 10 do globals.css em vez de estilo solto aqui
export function Forma({
  w,
  h,
  redonda = false,
  className,
}: {
  w?: number | string;
  h?: number | string;
  redonda?: boolean;
  className?: string;
}) {
  return (
    <span
      className={className ? `esq ${className}` : "esq"}
      style={{ width: w, height: h, borderRadius: redonda ? 999 : undefined }}
    />
  );
}

// a cápsula de vidro das abas com 4 pílulas: o loading não busca dados, então
// não sabe o nome das trilhas (para ter as abas reais, o cabeçalho teria de
// ir para um layout; fora do escopo). `posicao`, como nas abas reais: "topo"
// (na barra) ou "pe" (no celular, depois do <main>)
export function AbasEsqueleto({ posicao }: { posicao: "topo" | "pe" }) {
  return (
    <div className={`abas abas-${posicao} vidro`} style={VIDRO} aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className="esq esq-pilula" />
      ))}
    </div>
  );
}
