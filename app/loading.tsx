import { AbasEsqueleto, Forma } from "@/components/Esqueleto";

// Carregando a Home: a moldura fica (barra com o título e a cápsula das
// abas) e os cartões aparecem como esqueleto nos lugares reais — Trilhas e
// Constância à esquerda, Pomodoro à direita (no celular, Pomodoro em cima).
export default function Carregando() {
  return (
    <div className="app app-painel">
      <header className="barra">
        <div className="barra-titulo">
          <h1 className="titulo-barra">Home</h1>
        </div>
        <AbasEsqueleto />
        <span aria-hidden="true" />
      </header>
      <main className="conteudo miolo" aria-busy="true" aria-label="Carregando a Home">
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
          <div className="esq-cartao" style={{ justifyItems: "center" }}>
            <Forma w={84} h={16} estilo={{ justifySelf: "start" }} />
            <Forma w="90%" h={32} redonda />
            <Forma
              w="min(150px, 70%)"
              h="auto"
              estilo={{ aspectRatio: "1", borderRadius: "50%", margin: "6px 0" }}
            />
            <Forma w="80%" h={32} redonda />
            <Forma w={140} h={44} redonda />
          </div>
        </div>
      </main>
    </div>
  );
}
