import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Painel de estudos",
  description:
    "Acompanhamento pessoal das trilhas Dev, IA · Automação e Inglês",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
