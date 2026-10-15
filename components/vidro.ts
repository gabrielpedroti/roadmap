import type { CSSProperties } from "react";

// O Lightning CSS (o compilador de CSS do Tailwind v4) apaga backdrop-filter
// da folha de estilo: por isso o blur do vidro vai INLINE. Ele lê a
// variável, e assim o CSS consegue desligá-lo (transparência reduzida, mais
// contraste) trocando só a variável. A tinta do vidro fica no CSS (.vidro).
export const VIDRO: CSSProperties = {
  WebkitBackdropFilter: "var(--vidro-blur)",
  backdropFilter: "var(--vidro-blur)",
};

// mesma ideia para a névoa da borda de rolagem da barra (.barra-borda)
export const BORDA_BLUR: CSSProperties = {
  WebkitBackdropFilter: "var(--borda-blur)",
  backdropFilter: "var(--borda-blur)",
};
