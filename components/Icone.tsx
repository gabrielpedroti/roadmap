import type { ReactNode, SVGProps } from "react";

// Ícones do app, em SVG (nada de emoji ou glifo como ícone). Grade de 24,
// traço de 1,9 (classe .ic no globals.css). Desenhos derivados do Lucide
// (lucide.dev, licença ISC), como no sprite do mockup aprovado.
// Ícone dentro de controle leva aria-hidden; quem dá o nome é o controle
// (aria-label). A chama acesa tem degradê e mora em Chama.tsx.

// o desenho da chama é usado aqui (contorno) e em Chama.tsx (fogo)
export const CAMINHO_CHAMA =
  "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z";

const DESENHOS = {
  "chev-dir": <path d="m9 18 6-6-6-6" />,
  "chev-baixo": <path d="m6 9 6 6 6-6" />,
  engrenagem: (
    <>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  lapis: (
    <>
      <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
      <path d="m15 5 4 4" />
    </>
  ),
  play: (
    <path
      fill="currentColor"
      stroke="none"
      d="M7 5.14v13.72a1 1 0 0 0 1.52.85l10.8-6.86a1 1 0 0 0 0-1.7L8.52 4.29A1 1 0 0 0 7 5.14z"
    />
  ),
  pausa: (
    <>
      <rect fill="currentColor" stroke="none" x="5.5" y="4.5" width="4.5" height="15" rx="1.3" />
      <rect fill="currentColor" stroke="none" x="14" y="4.5" width="4.5" height="15" rx="1.3" />
    </>
  ),
  parar: <rect fill="currentColor" stroke="none" x="5" y="5" width="14" height="14" rx="3" />,
  mais: <path d="M12 5v14M5 12h14" />,
  menos: <path d="M5 12h14" />,
  relogio: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  visto: <path d="M20 6 9 17l-5-5" />,
  x: <path d="M18 6 6 18M6 6l12 12" />,
  cadeado: (
    <>
      <rect x="4.5" y="11" width="15" height="10" rx="2.5" />
      <path d="M8 11V7.5a4 4 0 0 1 8 0V11" />
    </>
  ),
  alerta: (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M12 7.5v5.5" />
      <path d="M12 16.5h.01" />
    </>
  ),
  triangulo: (
    <>
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </>
  ),
  chama: <path d={CAMINHO_CHAMA} />,
  ferramenta: (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  ),
  // desenho CHEIO: o CSS (.ic-pessoa, .menu-titulo .ic) troca traço por preenchimento
  pessoa: (
    <path d="M12 1.5a10.5 10.5 0 1 0 0 21 10.5 10.5 0 0 0 0-21zm0 4.25a3.6 3.6 0 1 1 0 7.2 3.6 3.6 0 0 1 0-7.2zm0 14.9a8.6 8.6 0 0 1-6.3-2.75c1.1-1.75 3.5-2.9 6.3-2.9s5.2 1.15 6.3 2.9A8.6 8.6 0 0 1 12 20.65z" />
  ),
  sair: (
    <>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="m16 17 5-5-5-5" />
      <path d="M21 12H9" />
    </>
  ),
  recarregar: (
    <>
      <path d="M21 12a9 9 0 1 1-3-6.7L21 8" />
      <path d="M21 3v5h-5" />
    </>
  ),
  envelope: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type NomeIcone = keyof typeof DESENHOS;

// Uso: <Icone nome="engrenagem" />. O className soma à classe .ic
export function Icone({
  nome,
  className,
  ...resto
}: { nome: NomeIcone } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className ? `ic ${className}` : "ic"}
      {...resto}
    >
      {DESENHOS[nome]}
    </svg>
  );
}
