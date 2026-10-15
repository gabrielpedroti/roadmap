import { AbasEsqueleto, Forma } from "@/components/Esqueleto";

// Carregando uma trilha: barra (sem título: na trilha o título é o do
// campo), o campo e a divisão em esqueleto. Neutro, porque a cor da trilha
// ainda não é conhecida.
export default function CarregandoTrilha() {
  return (
    <div className="app">
      <header className="barra">
        <span className="barra-ini" aria-hidden="true" />
        <AbasEsqueleto />
        <span aria-hidden="true" />
      </header>
      <main className="conteudo" aria-busy="true" aria-label="Carregando a trilha">
        <div className="esq-campo">
          <Forma w="40%" h={44} />
          <Forma w="min(64ch, 90%)" h={16} />
          <Forma w="min(48ch, 70%)" h={16} />
        </div>
        <div className="esq-divisao">
          <div className="esq-cartao esq-roteiro">
            <Forma w={64} h={16} />
            {[0, 1, 2, 3, 4].map((i) => (
              <Forma key={i} h={44} estilo={{ borderRadius: 14 }} />
            ))}
          </div>
          <div className="esq-cartao">
            <Forma w="60%" h={26} />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <Forma key={i} w={`${90 - i * 6}%`} h={18} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
