import type { Metadata, Viewport } from "next";
import "./globals.css";

// Título da aba: cada página dá o seu ("IA · Automação · Roadmap"); a Home
// fica só com "Roadmap". O anúncio de troca de página do leitor de tela lê
// este título, então ele precisa mudar de uma página para outra
export const metadata: Metadata = {
  title: { default: "Roadmap", template: "%s · Roadmap" },
  description:
    "Roadmap de estudos — trilhas Dev, IA · Automação e Inglês, com pomodoro, streak e metas",
};

// tema do SISTEMA (claro e escuro), área segura do iPhone (viewport-fit) e
// a cor da barra do navegador no celular igual ao fundo do app
export const viewport: Viewport = {
  colorScheme: "light dark",
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f2f7" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // data-scroll-behavior: o CSS pede rolagem suave, mas ao trocar de página
  // o Next volta ao topo na hora (sem "deslizar" a página inteira)
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
