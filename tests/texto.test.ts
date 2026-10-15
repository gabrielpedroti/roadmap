import { describe, expect, it } from "vitest";
import { semEmoji } from "@/lib/texto";

// Os emoji vão com escape \u{…}: escritos "de verdade", o seletor invisível
// U+FE0F some ao copiar e colar e o teste passaria a testar outra coisa.
describe("semEmoji — textos do seed", () => {
  it("tira o emoji do começo (com seletor FE0F)", () => {
    expect(semEmoji("\u{1F3D7}\u{FE0F} Projeto do bloco (30%)")).toBe(
      "Projeto do bloco (30%)"
    );
  });
  it("tira o emoji do meio sem deixar espaço duplo", () => {
    expect(semEmoji("… testes. \u{1F513} Concluir aqui…")).toBe(
      "… testes. Concluir aqui…"
    );
  });
  it("mantém setas de texto", () => {
    expect(semEmoji("Conexão Node ↔ Postgres")).toBe("Conexão Node ↔ Postgres");
  });
  it("tira a sequência ZWJ inteira", () => {
    expect(semEmoji("Time \u{1F468}\u{200D}\u{1F4BB} dev")).toBe("Time dev");
  });
});

// Review Focus 4: emoji que o seed de hoje não tem, mas o de amanhã pode ter
describe("semEmoji — emoji que podem chegar depois", () => {
  it("tecla numerada vira só o número", () => {
    expect(semEmoji("Passo 1\u{FE0F}\u{20E3} feito")).toBe("Passo 1 feito");
  });
  it("bandeira sai inteira", () => {
    expect(semEmoji("Inglês \u{1F1FA}\u{1F1F8} básico")).toBe("Inglês básico");
  });
  it("símbolo de texto com FE0F sai; sem FE0F, fica", () => {
    expect(semEmoji("Ajustes \u{2699}\u{FE0F}")).toBe("Ajustes");
    expect(semEmoji("Ajustes \u{2699}")).toBe("Ajustes \u{2699}");
  });
  it("nada de FE0F sobrando no resultado", () => {
    const r = semEmoji("\u{2B50}\u{FE0F} Destaque \u{2764}\u{FE0F} e \u{1F3C1}");
    expect(r).toBe("Destaque e");
    expect(/\p{Emoji_Presentation}|\u{FE0F}/u.test(r)).toBe(false);
  });
});
