import type { Metadata } from "next";
import Link from "next/link";
import { Icone } from "@/components/Icone";

export const metadata: Metadata = { title: "Página não encontrada" };

// Página não encontrada (endereço errado ou trilha que não existe: a tela da
// trilha chama notFound()). Mesmo molde da tela de erro.
export default function NaoEncontrada() {
  return (
    <main className="tela-erro">
      <div className="tela-erro-in">
        <Icone nome="alerta" />
        <h1 className="tela-erro-titulo">Página não encontrada</h1>
        <p>O endereço pode ter mudado, ou esta trilha não existe.</p>
        <Link href="/" className="btn btn-prim btn-p">
          Voltar para a Home
        </Link>
      </div>
    </main>
  );
}
