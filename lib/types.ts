// Tipos que espelham as tabelas do Supabase (supabase/migrations/0001_schema.sql)

export type ItemTipo = "concept" | "review" | "optional" | "project";

// De onde o item vem. Vira a tag colorida na tela da trilha.
// Conceito que não aponta pra fonte específica fica sem (null).
export type Fonte = "ads-pucpr" | "dio" | "alura" | "anthropic";

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

export type UserSettings = {
  user_id: string;
  streak_min_diario_min: number;
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
  dias_que_contam: [1, 2, 3, 4, 5, 6, 7],
  meta_semanal_h: 10,
  meta_mensal_h: 40,
  pomodoro_foco_min: 25,
  pausa_curta_min: 5,
  pausa_longa_min: 15,
  ciclos_ate_pausa_longa: 4,
};
