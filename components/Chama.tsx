import { useId } from "react";
import { CAMINHO_CHAMA } from "./Icone";

// A chama da Constância, em SVG. Duas camadas: o contorno
// cinza (apagada) e o fogo em degradê (acesa). As animações de ACENDER estão
// no CSS e valem para .chama:not(.apagada): trocar a classe "apagada" as
// reinicia, sem JavaScript. Elas tocam ao abrir a tela e quando a chama passa
// de apagada para acesa (ex.: router.refresh() depois de registrar).
export function Chama({
  acesa,
  convite = false,
}: {
  acesa: boolean;
  convite?: boolean; // convite do visitante: só o contorno, 46 px, decorativo
}) {
  // id do degradê: único na página (useId), só com letras e números
  const id = "chama" + useId().replace(/[^a-zA-Z0-9]/g, "");

  if (convite) {
    // decorativo: o texto ao lado ("Streak diário e metas…") já explica
    return (
      <svg className="chama apagada" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d={CAMINHO_CHAMA} />
      </svg>
    );
  }

  // viewBox recortado no desenho: a altura definida no CSS é a da chama que se vê
  return (
    <svg
      className={acesa ? "chama" : "chama apagada"}
      viewBox="4.5 2.5 15 20"
      role="img"
      aria-label={acesa ? "Chama acesa" : "Chama apagada"}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffb340" />
          <stop offset="1" stopColor="#f2600c" />
        </linearGradient>
      </defs>
      <path className="chama-cinza" d={CAMINHO_CHAMA} />
      <path className="chama-fogo" d={CAMINHO_CHAMA} fill={`url(#${id})`} stroke="none" />
    </svg>
  );
}
