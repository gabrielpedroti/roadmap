import type { Metadata } from "next";

// A página de login é um client component (não exporta metadata): o título
// da aba ("Entrar · Roadmap") fica aqui
export const metadata: Metadata = { title: "Entrar" };

export default function LayoutLogin({ children }: { children: React.ReactNode }) {
  return children;
}
