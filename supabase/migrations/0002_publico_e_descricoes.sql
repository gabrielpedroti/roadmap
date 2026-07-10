-- =============================================================
-- v1.1 — leitura pública do conteúdo + descrição das trilhas
-- Como aplicar: Supabase Dashboard → SQL Editor → colar tudo → Run
--
-- Corrige: app abria vazio sem login ("trilhas não carregadas"),
-- porque a política antiga só liberava leitura para logados.
-- =============================================================

-- Descrição exibida no topo da tela de cada trilha
alter table tracks add column if not exists descricao text;

-- Troca as políticas de leitura do conteúdo: agora TAMBÉM para visitantes
-- (anon). Escrita continua bloqueada — só o seed (service role) escreve.
drop policy if exists "conteudo: leitura para logados" on tracks;
drop policy if exists "conteudo: leitura para logados" on blocks;
drop policy if exists "conteudo: leitura para logados" on item_groups;
drop policy if exists "conteudo: leitura para logados" on items;

drop policy if exists "conteudo: leitura publica" on tracks;
drop policy if exists "conteudo: leitura publica" on blocks;
drop policy if exists "conteudo: leitura publica" on item_groups;
drop policy if exists "conteudo: leitura publica" on items;

create policy "conteudo: leitura publica" on tracks      for select to anon, authenticated using (true);
create policy "conteudo: leitura publica" on blocks      for select to anon, authenticated using (true);
create policy "conteudo: leitura publica" on item_groups for select to anon, authenticated using (true);
create policy "conteudo: leitura publica" on items       for select to anon, authenticated using (true);
