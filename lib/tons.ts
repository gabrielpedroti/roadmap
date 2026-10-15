// Tons de uma trilha que passam no contraste AA (WCAG 2.x), a partir da cor
// oficial que vem do banco (tracks.cor). As trilhas podem ser N (a de outra
// pessoa tem outra cor), então o tom é CALCULADO aqui, numa função pura com
// testes, no mesmo padrão de lib/progress.ts.
//
// Para as três cores oficiais de hoje, os valores são os do mockup aprovado
// (.agents/context/mockup-apple/apple.html) e ficam fixos em TONS_FIXOS.
import type { CSSProperties } from "react";

export type Tons = {
  tomClaro: string; // texto e controles na cor da trilha (tema claro)
  tomEscuro: string; // idem, tema escuro
  tomMaisClaro: string; // "mais contraste" (7:1), tema claro
  tomMaisEscuro: string; // "mais contraste" (7:1), tema escuro
  campoClaro: string; // fundo do cabeçalho colorido da trilha (claro)
  campoEscuro: string; // idem (escuro)
  campoTintaClaro: string; // texto sobre o campo (claro)
  campoTintaEscuro: string; // texto sobre o campo (escuro)
};

type RGB = [number, number, number];

// cor de reserva quando o banco traz algo que não é hex (ex.: "vermelho"):
// o cinza do iOS. Assim a página nunca quebra por causa de uma cor.
const COR_RESERVA = "#8E8E93";

// "#9d2235", "9D2235", " #abc " → "#9D2235" / "#AABBCC". Inválida → null.
export function normalizarHex(cor: string): string | null {
  let h = cor.trim().replace(/^#/, "");
  if (/^[0-9a-f]{3}$/i.test(h)) h = [...h].map((c) => c + c).join("");
  if (!/^[0-9a-f]{6}$/i.test(h)) return null;
  return "#" + h.toUpperCase();
}

function lerHex(cor: string): RGB {
  const h = (normalizarHex(cor) ?? COR_RESERVA).slice(1);
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) as RGB;
}

function paraHex(rgb: RGB): string {
  return "#" + rgb.map((v) => v.toString(16).padStart(2, "0")).join("");
}

// luminância relativa (fórmula da WCAG 2.x)
function luminancia(cor: string): number {
  const [r, g, b] = lerHex(cor).map((v) => {
    const c = v / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// contraste entre duas cores: 1 (iguais) até 21 (preto e branco)
export function contraste(a: string, b: string): number {
  const la = luminancia(a);
  const lb = luminancia(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

// a mesma conta do color-mix(in srgb, cor X%, com), arredondando cada canal
export function misturar(cor: string, com: string, fracaoDaCor: number): string {
  const a = lerHex(cor);
  const b = lerHex(com);
  return paraHex(
    a.map((v, i) => Math.round(v * fracaoDaCor + b[i] * (1 - fracaoDaCor))) as RGB
  );
}

// Superfícies onde o --tom aparece (spec §3.4). O item atual do roteiro
// tem fundo com 12% da cor da trilha, por isso ele entra na conta.
export function superficiesClaro(cor: string): string[] {
  return ["#ffffff", "#f2f2f7", "#f5f5f5", misturar(cor, "#ffffff", 0.12)];
}
export function superficiesEscuro(cor: string): string[] {
  return ["#1c1c1e", "#000000", "#2c2c2e", misturar(cor, "#1c1c1e", 0.12)];
}

// passa no alvo em TODAS as superfícies?
function passaEmTodas(tom: string, superficies: string[], alvo: number) {
  return superficies.every((s) => contraste(tom, s) >= alvo);
}

// Procura, de 1 em 1 ponto, a primeira mistura da cor com `com` que passa no
// alvo. Sempre termina: preto puro dá 21:1 no claro; branco puro, ≥ 13:1 no escuro.
function buscarTom(
  cor: string,
  com: string,
  inicio: number,
  superficies: string[],
  alvo: number
): string {
  for (let p = inicio; p >= 0; p--) {
    const tom = misturar(cor, com, p / 100);
    if (passaEmTodas(tom, superficies, alvo)) return tom;
  }
  return com;
}

// texto sobre o campo claro: branco; senão um tom bem escuro da própria cor;
// senão preto (um dos três sempre passa)
function tintaDoCampoClaro(cor: string): string {
  if (contraste("#ffffff", cor) >= 4.5) return "#ffffff";
  const escura = misturar(cor, "#000000", 0.18);
  if (contraste(escura, cor) >= 4.5) return escura;
  return "#000000";
}

// campo escuro: a cor escurecida (com preto) até o branco passar 4,5:1
function campoEscuro(cor: string): string {
  for (let p = 62; p >= 0; p--) {
    const campo = misturar(cor, "#000000", p / 100);
    if (contraste("#ffffff", campo) >= 4.5) return campo;
  }
  return "#000000";
}

// Valores do mockup para as três cores oficiais (chave = hex em maiúsculas).
// Obrigatórios: NÃO recalcular.
export const TONS_FIXOS: Record<string, Tons> = {
  "#9D2235": {
    tomClaro: "#9d2235", tomEscuro: "#e5707f",
    tomMaisClaro: "#8f1f30", tomMaisEscuro: "#f0c0c7",
    campoClaro: "#9D2235", campoEscuro: "#611521",
    campoTintaClaro: "#ffffff", campoTintaEscuro: "#ffffff",
  },
  "#D97757": {
    tomClaro: "#9a543e", tomEscuro: "#e6a792",
    tomMaisClaro: "#6f3d2c", tomMaisEscuro: "#f0c2b2",
    campoClaro: "#D97757", campoEscuro: "#874a36",
    campoTintaClaro: "#2b1209", campoTintaEscuro: "#ffffff",
  },
  "#58CC02": {
    tomClaro: "#327401", tomEscuro: "#92de5b",
    tomMaisClaro: "#255601", tomMaisEscuro: "#a8e87a",
    campoClaro: "#58CC02", campoEscuro: "#317201",
    campoTintaClaro: "#102500", campoTintaEscuro: "#ffffff",
  },
};

export function tonsDaTrilha(corDoBanco: string): Tons {
  const cor = normalizarHex(corDoBanco) ?? COR_RESERVA;
  const fixo = TONS_FIXOS[cor];
  if (fixo) return fixo;
  const claro = superficiesClaro(cor);
  const escuro = superficiesEscuro(cor);
  return {
    tomClaro: buscarTom(cor, "#000000", 100, claro, 4.5),
    tomEscuro: buscarTom(cor, "#ffffff", 65, escuro, 4.5),
    tomMaisClaro: buscarTom(cor, "#000000", 100, claro, 7),
    tomMaisEscuro: buscarTom(cor, "#ffffff", 65, escuro, 7),
    campoClaro: cor,
    campoEscuro: campoEscuro(cor),
    campoTintaClaro: tintaDoCampoClaro(cor),
    campoTintaEscuro: "#ffffff",
  };
}

// Variáveis CSS da trilha. Use SEMPRE junto da classe .com-cor, no MESMO
// elemento (senão --tom, --campo e --cor-viva são calculados sem a cor).
export function varsDaTrilha(corDoBanco: string): CSSProperties {
  const cor = normalizarHex(corDoBanco) ?? COR_RESERVA;
  const t = tonsDaTrilha(cor);
  return {
    "--cor": cor,
    "--tom-c": t.tomClaro,
    "--tom-e": t.tomEscuro,
    "--tom-mais-c": t.tomMaisClaro,
    "--tom-mais-e": t.tomMaisEscuro,
    "--campo-c": t.campoClaro,
    "--campo-e": t.campoEscuro,
    "--campo-tinta-c": t.campoTintaClaro,
    "--campo-tinta-e": t.campoTintaEscuro,
  } as CSSProperties;
}
