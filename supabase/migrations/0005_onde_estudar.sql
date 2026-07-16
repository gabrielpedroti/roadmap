-- =============================================================
-- v1.5 — coluna "onde estudar" (os chips de curso/trilha/matéria)
-- Como aplicar: Supabase Dashboard → SQL Editor → colar tudo → Run
--
-- Diferente de items.fonte (que diz que o item É um curso), esta coluna diz
-- ONDE ESTUDAR o conceito: lista de { plataforma, tipo, nome }.
--
-- Aqui só criamos a coluna. O CONTEÚDO vem na 0006, que reconstrói a trilha
-- Dev já com os chips preenchidos.
-- Idempotente e não apaga nada.
-- =============================================================

alter table items add column if not exists onde_estudar jsonb not null default '[]'::jsonb;
