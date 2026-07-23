-- =============================================================
-- v1.8 — mínimo de streak NÃO-retroativo (histórico do mínimo)
-- Como aplicar: Supabase Dashboard → SQL Editor → colar tudo → Run
--
-- Antes: o streak era recalculado sempre com o mínimo ATUAL, então mudar o
-- mínimo (ex.: 15 → 30) rejulgava todos os dias antigos e podia zerar tudo.
-- Agora: guardamos a linha do tempo do mínimo e cada dia é julgado pelo
-- mínimo que valia NELE. Subir a barra só vale de hoje pra frente.
--
-- Idempotente. Vazio ('[]') = usa o mínimo atual pra todos os dias (igual ao
-- comportamento antigo), então nada muda até você mexer no mínimo de novo.
-- =============================================================

alter table user_settings
  add column if not exists streak_min_historico jsonb not null default '[]'::jsonb;


-- -------------------------------------------------------------
-- OPCIONAL — recuperar o streak que você perdeu ao subir de 15 → 30.
-- Trata TODO o passado como 15 min (o que você usava) e, de HOJE em diante,
-- o seu mínimo atual. Rode SÓ se quiser o streak de volta.
-- (Remova os '--' das 6 linhas abaixo pra ativar.)
-- -------------------------------------------------------------
-- update user_settings set streak_min_historico = jsonb_build_array(
--   jsonb_build_object('desde', '1970-01-01', 'min', 15),
--   jsonb_build_object(
--     'desde', to_char(now() at time zone 'America/Sao_Paulo', 'YYYY-MM-DD'),
--     'min', streak_min_diario_min)
-- );
