"use client";

import { Icone } from "./Icone";

// Campo numérico com unidade e, opcionalmente, o "passo" (stepper − | +).
// O valor SAI como texto (o que está no campo): quem usa converte e decide o
// que fazer com texto vazio ou inválido. Ele ENTRA como número quando quem
// usa já converteu (assim o React não apaga a vírgula de "10," no meio da
// digitação) ou como texto no popover (que mostra o erro de valor vazio).
// O stepper soma o passo ao número atual, sem passar do mínimo.
export function Passo({
  id,
  valor,
  onMudar,
  min,
  passo = 1,
  unidade,
  stepper = false,
  rotuloMenos,
  rotuloMais,
  invalido,
  descritoPor,
}: {
  id: string;
  valor: number | string;
  onMudar: (texto: string) => void;
  min: number;
  passo?: number;
  unidade: string; // "min", "h" ou "" (ciclos)
  stepper?: boolean;
  rotuloMenos?: string; // ex.: "Menos 1 minuto"
  rotuloMais?: string; // ex.: "Mais 1 minuto"
  invalido?: boolean;
  descritoPor?: string; // id do texto de erro
}) {
  // soma o passo e arredonda para o meio mais próximo (0,5 h nas metas)
  function andar(direcao: 1 | -1) {
    const atual = parseFloat(String(valor)) || min;
    const novo = Math.max(min, atual + passo * direcao);
    onMudar(String(Math.round(novo * 2) / 2));
  }

  return (
    <div className="passo">
      <input
        id={id}
        type="number"
        inputMode={Number.isInteger(passo) ? "numeric" : "decimal"}
        min={min}
        step={passo}
        value={valor}
        onChange={(e) => onMudar(e.target.value)}
        aria-invalid={invalido || undefined}
        aria-describedby={descritoPor}
      />
      <span className="un">{unidade}</span>
      {/* botões só com ícone: aria-label (leitor de tela) e title (dica do
          mouse) sempre juntos (§4.5) */}
      {stepper && (
        <span className="stepper">
          <button type="button" aria-label={rotuloMenos} title={rotuloMenos} onClick={() => andar(-1)}>
            <Icone nome="menos" />
          </button>
          <i />
          <button type="button" aria-label={rotuloMais} title={rotuloMais} onClick={() => andar(1)}>
            <Icone nome="mais" />
          </button>
        </span>
      )}
    </div>
  );
}
