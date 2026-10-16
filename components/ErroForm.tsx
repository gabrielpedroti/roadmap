import type { ReactNode } from "react";
import { Icone } from "./Icone";

// Erro de formulário (folhas e login): ícone + texto, com role="alert" para
// o leitor de tela anunciar na hora. Um lugar só para o visual e o papel ARIA.
export function ErroForm({ children }: { children: ReactNode }) {
  return (
    <p className="form-erro" role="alert">
      <Icone nome="alerta" />
      <span>{children}</span>
    </p>
  );
}
