-- =============================================================
-- Roadmap — schema v1
-- Como aplicar: Supabase Dashboard → SQL Editor → colar tudo → Run
-- =============================================================

-- ---------- CONTEÚDO GLOBAL (igual para todos; leitura é PÚBLICA) ----------

create table tracks (
  id    uuid primary key default gen_random_uuid(),
  slug  text unique not null,          -- usado na URL: /trilha/dev
  nome  text not null,
  cor   text not null,                 -- hex da trilha, ex. #9D2235
  ordem int  not null
);

-- Bloco / etapa / nível de uma trilha
create table blocks (
  id                   uuid primary key default gen_random_uuid(),
  track_id             uuid not null references tracks(id) on delete cascade,
  titulo               text not null,
  descricao            text,
  ordem                int  not null,
  semanas_estimadas    text,
  -- desbloqueio: precisa concluir este bloco antes (null = já começa aberto)
  prereq_block_id      uuid references blocks(id),
  -- pré-requisito cruzado de OUTRA trilha (caso: IA Etapa 2 <- Dev Bloco 2)
  cross_prereq_block_id uuid references blocks(id)
);

-- Subgrupos dentro de um bloco ("groups" é palavra-chave do Postgres,
-- por isso o nome item_groups)
create table item_groups (
  id       uuid primary key default gen_random_uuid(),
  block_id uuid not null references blocks(id) on delete cascade,
  titulo   text not null,
  ordem    int  not null
);

create table items (
  id        uuid primary key default gen_random_uuid(),
  group_id  uuid not null references item_groups(id) on delete cascade,
  titulo    text not null,
  descricao text,                      -- "ao final você deve..."
  ordem     int  not null,
  -- concept/review dividem 70% | project vale 30% | optional não conta
  tipo      text not null check (tipo in ('concept', 'review', 'optional', 'project'))
);

-- ---------- DADOS DO USUÁRIO (exigem login) ----------

create table user_checks (
  user_id    uuid not null references auth.users(id) on delete cascade,
  item_id    uuid not null references items(id) on delete cascade,
  checked_at timestamptz not null default now(),
  primary key (user_id, item_id)
);

-- Sessões de estudo (pomodoro concluído ou registro manual).
-- Os CHECKs impedem dados sem sentido mesmo se alguém chamar a API na mão:
-- fim depois do início e duração de no máximo 24h.
create table sessions (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  track_id     uuid not null references tracks(id),
  started_at   timestamptz not null,
  ended_at     timestamptz not null,
  duration_min int  not null,
  origem       text not null check (origem in ('pomodoro', 'manual')),
  check (ended_at > started_at),
  check (duration_min > 0 and duration_min <= 1440)
);

create index sessions_user_started on sessions (user_id, started_at desc);

create table user_settings (
  user_id                uuid primary key references auth.users(id) on delete cascade,
  streak_min_diario_min  int     not null default 30 check (streak_min_diario_min > 0),
  -- dias da semana que contam pro streak: 1=seg ... 7=dom (nunca vazio)
  dias_que_contam        int[]   not null default '{1,2,3,4,5,6,7}'
                                 check (array_length(dias_que_contam, 1) >= 1),
  meta_semanal_h         numeric not null default 10 check (meta_semanal_h > 0),
  meta_mensal_h          numeric not null default 40 check (meta_mensal_h > 0),
  pomodoro_foco_min      int     not null default 25 check (pomodoro_foco_min > 0),
  pausa_curta_min        int     not null default 5  check (pausa_curta_min > 0),
  pausa_longa_min        int     not null default 15 check (pausa_longa_min > 0),
  ciclos_ate_pausa_longa int     not null default 4  check (ciclos_ate_pausa_longa > 0)
);

-- =============================================================
-- RLS — habilitado em TODAS as tabelas, na mesma migration que as cria
-- =============================================================

-- Conteúdo global: leitura PÚBLICA (os roadmaps abrem sem login e o
-- visitante usa o pomodoro); ninguém escreve pela API — o seed usa a
-- service role key, que ignora RLS.
alter table tracks      enable row level security;
alter table blocks      enable row level security;
alter table item_groups enable row level security;
alter table items       enable row level security;

create policy "conteudo: leitura publica" on tracks      for select to anon, authenticated using (true);
create policy "conteudo: leitura publica" on blocks      for select to anon, authenticated using (true);
create policy "conteudo: leitura publica" on item_groups for select to anon, authenticated using (true);
create policy "conteudo: leitura publica" on items       for select to anon, authenticated using (true);

-- Dados do usuário: cada um só enxerga e mexe no que é seu
alter table user_checks   enable row level security;
alter table sessions      enable row level security;
alter table user_settings enable row level security;

create policy "user_checks: select próprio" on user_checks for select to authenticated using (auth.uid() = user_id);
create policy "user_checks: insert próprio" on user_checks for insert to authenticated with check (auth.uid() = user_id);
create policy "user_checks: delete próprio" on user_checks for delete to authenticated using (auth.uid() = user_id);

create policy "sessions: select próprio" on sessions for select to authenticated using (auth.uid() = user_id);
create policy "sessions: insert próprio" on sessions for insert to authenticated with check (auth.uid() = user_id);
create policy "sessions: update próprio" on sessions for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "sessions: delete próprio" on sessions for delete to authenticated using (auth.uid() = user_id);

create policy "user_settings: select próprio" on user_settings for select to authenticated using (auth.uid() = user_id);
create policy "user_settings: insert próprio" on user_settings for insert to authenticated with check (auth.uid() = user_id);
create policy "user_settings: update próprio" on user_settings for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
