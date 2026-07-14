// Formato dos arquivos de seed. O conteúdo foi TRANSCRITO dos arquivos
// painel-de-estudos-kit/conteudo/trilha-*.md (fora do git) — se a trilha
// mudar lá, atualizar aqui e rodar `npm run seed -- --force`.

import type { Fonte, ItemTipo } from "@/lib/types";

export type SeedItem = {
  titulo: string;
  descricao?: string; // "ao final você deve entender/saber fazer..."
  tipo: ItemTipo;
  fonte?: Fonte; // sobrescreve a fonte do grupo, quando o item foge da regra
};

export type SeedGroup = {
  titulo: string;
  // fonte padrão dos itens deste grupo (vira a tag colorida: Alura, DIO,
  // ADS-PUCPR, Anthropic). Grupo de conceito genérico não tem fonte.
  fonte?: Fonte;
  itens: SeedItem[];
};

export type SeedBlock = {
  titulo: string;
  descricao?: string;
  semanas?: string;
  // Por padrão o bloco exige concluir o ANTERIOR da mesma trilha.
  // true = já começa desbloqueado (ex.: IA Etapa 0 e 1 são paralelas).
  comecaAberto?: boolean;
  grupos: SeedGroup[];
};

export type SeedTrack = {
  slug: string;
  nome: string;
  descricao: string; // exibida no topo da tela da trilha
  cor: string;
  ordem: number;
  blocos: SeedBlock[];
};
