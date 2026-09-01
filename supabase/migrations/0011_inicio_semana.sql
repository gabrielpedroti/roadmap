-- =============================================================
-- v1.11 — início da semana configurável (metas) + nota do dia bônus
-- Como aplicar: Supabase Dashboard → SQL Editor → colar tudo → Run
--
-- 1) A barra "Semana" do card de Constância sempre contou de segunda a
--    domingo. Agora o primeiro dia da semana é configurável por usuário:
--    'seg' (padrão, comportamento de antes) ou 'dom'.
-- 2) O streak ganhou a regra do DIA BÔNUS (só código, lib/streak.ts —
--    nada muda no banco): dia fora de dias_que_contam nunca quebra a
--    sequência; mas se o mínimo foi cumprido nele, soma +1.
--
-- Idempotente e não mexe em nada existente (a coluna nasce com 'seg').
-- =============================================================

alter table user_settings
  add column if not exists inicio_semana text not null default 'seg';

-- trava os valores aceitos (recria pra poder rodar de novo sem erro)
alter table user_settings drop constraint if exists user_settings_inicio_semana_check;
alter table user_settings add constraint user_settings_inicio_semana_check
  check (inicio_semana in ('dom', 'seg'));
