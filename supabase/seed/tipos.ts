// Formato dos arquivos de seed. O conteúdo foi TRANSCRITO dos arquivos
// painel-de-estudos-kit/conteudo/trilha-*.md (fora do git) — se a trilha
// mudar lá, atualizar aqui e rodar `npm run seed -- --force`.

import type { ItemTipo } from "@/lib/types";

export type SeedItem = {
  titulo: string;
  descricao?: string; // "ao final você deve entender/saber fazer..."
  tipo: ItemTipo;
};

export type SeedGroup = {
  titulo: string;
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
  cor: string;
  ordem: number;
  blocos: SeedBlock[];
};
