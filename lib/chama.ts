// Estado da chama do card Constância (só exibição). A REGRA é a de sempre:
// a chama só acende se o mínimo de HOJE foi cumprido, ou se hoje não é dia
// que conta (aí a sequência está segura). A legenda diz o porquê em texto
// visível, ao lado da chama.
import { diaDaSemana } from "./streak";

// 1=seg ... 7=dom (mesma convenção de user_settings.dias_que_contam)
const NOME_DO_DIA = ["", "segunda", "terça", "quarta", "quinta", "sexta", "sábado", "domingo"];

export function estadoDaChama(p: {
  hoje: string; // YYYY-MM-DD em São Paulo
  minutosHoje: number;
  minimo: number; // streak_min_diario_min (o mínimo que vale hoje)
  diasQueContam: number[];
}): { acesa: boolean; legenda: string } {
  const dia = diaDaSemana(p.hoje);
  const hojeConta = p.diasQueContam.includes(dia);
  const cumpriu = p.minutosHoje >= p.minimo;

  if (hojeConta && cumpriu) {
    return { acesa: true, legenda: "Mínimo de hoje cumprido" };
  }
  if (hojeConta) {
    // arredonda para CIMA: com minutos quebrados (ex.: faltam 0,4) a legenda
    // diz "Falta 1 min", nunca "Faltam 0 min" com a chama ainda apagada
    const faltam = Math.ceil(p.minimo - p.minutosHoje);
    return {
      acesa: false,
      legenda: faltam === 1 ? "Falta 1 min hoje" : `Faltam ${faltam} min hoje`,
    };
  }
  if (cumpriu) {
    return { acesa: true, legenda: `Dia bônus: +1 · ${NOME_DO_DIA[dia]} não conta` };
  }
  return { acesa: true, legenda: "Hoje não conta · sequência segura" };
}
