// Tipos que espelham as tabelas do Supabase (supabase/migrations/0001_schema.sql)

export type ItemTipo = "concept" | "review" | "optional" | "project";

// De onde o item vem — usado quando o item É um curso (ex.: os cursos da
// trilha de IA). Vira a tag colorida ao lado do título.
export type Fonte =
  | "ads-pucpr"
  | "dio"
  | "alura"
  | "anthropic"
  | "coursera"
  | "deeplearning";

// ONDE ESTUDAR um conceito. Diferente de `Fonte`: o conceito não é um curso,
// ele aponta pra um ou mais lugares onde o conteúdo existe. Vira os chips
// embaixo da descrição. Um conceito pode ter 0, 1 ou várias.
export type Plataforma = "alura" | "puc" | "dio" | "anthropic";
export type TipoFonte = "curso" | "trilha" | "materia";
export type OndeEstudar = {
  plataforma: Plataforma;
  tipo: TipoFonte;
  nome: string;
};

export type Track = {
  id: string;
  slug: string;
  nome: string;
  descricao: string | null;
  cor: string;
  ordem: number;
};

export type Block = {
  id: string;
  track_id: string;
  titulo: string;
  descricao: string | null;
  ordem: number;
  semanas_estimadas: string | null;
  prereq_block_id: string | null;
  cross_prereq_block_id: string | null;
};

export type ItemGroup = {
  id: string;
  block_id: string;
  titulo: string;
  ordem: number;
};

export type Item = {
  id: string;
  group_id: string;
  titulo: string;
  descricao: string | null;
  ordem: number;
  tipo: ItemTipo;
  fonte: Fonte | null;
  onde_estudar: OndeEstudar[];
};

export type Sessao = {
  id: string;
  user_id: string;
  track_id: string;
  started_at: string; // timestamptz ISO
  ended_at: string;
  duration_min: number;
  origem: "pomodoro" | "manual";
};

// Uma "era" do mínimo de streak: a partir do dia `desde`, o mínimo passou a
// ser `min`. Guardar o histórico é o que torna a mudança de mínimo NÃO
// retroativa — cada dia é julgado pelo mínimo que valia nele.
export type EraMinStreak = { desde: string; min: number }; // desde = YYYY-MM-DD

export type UserSettings = {
  user_id: string;
  streak_min_diario_min: number; // o mínimo ATUAL (mostrado na tela)
  streak_min_historico: EraMinStreak[]; // a linha do tempo do mínimo
  dias_que_contam: number[]; // 1=seg ... 7=dom
  meta_semanal_h: number;
  meta_mensal_h: number;
  pomodoro_foco_min: number;
  pausa_curta_min: number;
  pausa_longa_min: number;
  ciclos_ate_pausa_longa: number;
};

// Valores padrão da SPEC — usados até o usuário salvar os próprios
export const SETTINGS_PADRAO: Omit<UserSettings, "user_id"> = {
  streak_min_diario_min: 30,
  streak_min_historico: [], // vazio = usa o mínimo atual pra todos os dias
  dias_que_contam: [1, 2, 3, 4, 5, 6, 7],
  meta_semanal_h: 10,
  meta_mensal_h: 40,
  pomodoro_foco_min: 25,
  pausa_curta_min: 5,
  pausa_longa_min: 15,
  ciclos_ate_pausa_longa: 4,
};
