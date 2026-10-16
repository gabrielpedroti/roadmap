import { AbasEsqueleto, Forma } from "@/components/Esqueleto";

// Carregando a Home: a moldura fica (barra com o título e a cápsula das
// abas) e os cartões aparecem como esqueleto nos lugares reais — Trilhas e
// Constância à esquerda, Pomodoro à direita (no celular, Pomodoro em cima e
// as abas no pé, como na Home de verdade).
export default function Carregando() {
  return (
    <div className="app app-painel">
      <header className="barra">
        <div className="barra-titulo">
          <h1 className="titulo-barra">Home</h1>
        </div>
        <AbasEsqueleto posicao="topo" />
        <span aria-hidden="true" />
      </header>
      <main className="conteudo miolo esq-conteudo" aria-busy="true" aria-label="Carregando a Home">
        <div className="esq-grade">
          <div className="esq-coluna">
            <div className="esq-cartao">
              <Forma w={64} h={16} />
              <Forma w="55%" h={14} />
              <Forma h={6} redonda />
              <Forma w="70%" h={14} />
              <Forma h={6} redonda />
            </div>
            <div className="esq-cartao">
              <Forma w={96} h={16} />
              <Forma w={120} h={34} />
              <Forma h={6} redonda />
              <Forma h={6} redonda />
            </div>
          </div>
          <div className="esq-cartao esq-pomodoro">
            <Forma w={84} h={16} className="esq-a-esquerda" />
            <Forma w="90%" h={32} redonda />
            <Forma w="min(150px, 70%)" className="esq-anel" />
            <Forma w="80%" h={32} redonda />
            <Forma w={140} h={44} redonda />
          </div>
        </div>
      </main>
      <AbasEsqueleto posicao="pe" />
    </div>
  );
}
