// Tira emoji de textos que vêm do banco (o conteúdo das trilhas tem alguns).
// Remove só o que é desenhado como emoji: caracteres com apresentação de
// emoji e qualquer símbolo seguido do seletor U+FE0F. Setas de texto como
// "↔" e "→" ficam. Os invisíveis vão com escape (\u{FE0F} e \u{200D}):
// escritos "de verdade", eles somem ao copiar e colar, sem aviso.
const EMOJI =
  /(?:\p{Emoji_Presentation}|\p{Extended_Pictographic}\u{FE0F})(?:\u{200D}(?:\p{Emoji_Presentation}|\p{Extended_Pictographic}\u{FE0F}?))*\s*/gu;
// sobras que viram emoji sozinhas: o seletor U+FE0F e a moldura de tecla
// U+20E3 (o emoji de tecla com o número 1 é o dígito "1" + FE0F + 20E3; o
// "1" fica, as sobras saem)
const SOBRAS = /[\u{FE0F}\u{20E3}]/gu;

export function semEmoji(texto: string): string {
  return texto
    .replace(EMOJI, "")
    .replace(SOBRAS, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}
