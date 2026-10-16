import { AbasEsqueleto, Forma } from "@/components/Esqueleto";

// Carregando uma trilha: barra (sem título: na trilha o título é o do
// campo), o campo e a divisão em esqueleto. Neutro, porque a cor da trilha
// ainda não é conhecida. O miolo do campo e a divisão usam as MESMAS caixas
// da tela real (.campo-in e .divisao): o título e o roteiro não pulam de
// lado quando a página chega.
export default function CarregandoTrilha() {
  return (
    <div className="app">
      <header className="barra">
        <span className="barra-ini" aria-hidden="true" />
        <AbasEsqueleto posicao="topo" />
        <span aria-hidden="true" />
      </header>
      <main className="conteudo esq-conteudo" aria-busy="true" aria-label="Carregando a trilha">
        <div className="esq-campo">
          <div className="campo-in esq-campo-in">
            <Forma w="40%" className="esq-campo-titulo" />
            <div className="esq-campo-desc">
              <Forma w="min(64ch, 90%)" h={16} />
              <Forma w="min(60ch, 85%)" h={16} />
              <Forma w="min(40ch, 60%)" h={16} />
            </div>
            <Forma w="min(560px, 80%)" h={22} className="esq-campo-pe" />
          </div>
        </div>
        <div className="divisao">
          <div className="esq-divisao-grade">
            <div className="esq-cartao esq-roteiro">
              <Forma w={64} h={16} />
              {[0, 1, 2, 3, 4].map((i) => (
                <Forma key={i} h={44} className="esq-rot-item" />
              ))}
            </div>
            <div className="esq-cartao">
              <Forma w="60%" h={26} />
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <Forma key={i} w={`${90 - i * 6}%`} h={18} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <AbasEsqueleto posicao="pe" />
    </div>
  );
}
