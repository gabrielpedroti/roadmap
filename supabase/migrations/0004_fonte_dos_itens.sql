-- =============================================================
-- v1.4 — coluna `fonte` nos itens + preenchimento do conteúdo atual
-- Como aplicar: Supabase Dashboard → SQL Editor → colar tudo → Run
--
-- A tag colorida de cada item (ADS-PUCPR / DIO / Alura / Anthropic) passa a
-- sair daqui, em vez de ser adivinhada pelo título do grupo.
-- É idempotente e NÃO apaga progresso (só mexe na tabela de conteúdo).
-- =============================================================

alter table items add column if not exists fonte text;

-- trava os valores aceitos (recria pra poder rodar de novo sem erro)
alter table items drop constraint if exists items_fonte_check;
alter table items add constraint items_fonte_check
  check (fonte is null or fonte in ('ads-pucpr', 'dio', 'alura', 'anthropic'));

-- ---------- preenchimento ----------

-- Matérias da faculdade (as "Revisado" e os "Refiz o projeto") → ADS-PUCPR
update items i set fonte = 'ads-pucpr'
from item_groups g
where i.group_id = g.id
  and g.titulo like 'Matérias da faculdade%';

-- Cursos da DIO
update items i set fonte = 'dio'
from item_groups g
where i.group_id = g.id
  and g.titulo like '%DIO%';

-- Cursos da Anthropic Academy
update items i set fonte = 'anthropic'
from item_groups g
where i.group_id = g.id
  and g.titulo like '%Anthropic%';

-- Cursos da Alura: os grupos de curso da trilha IA que sobraram
-- (o grupo do projeto-âncora não entra — não é curso)
update items i set fonte = 'alura'
from item_groups g
join blocks b on b.id = g.block_id
join tracks t on t.id = b.track_id
where i.group_id = g.id
  and t.slug = 'ia'
  and i.fonte is null
  and g.titulo in ('Cursos', 'Base', 'Nível 1', 'Nível 2', 'Nível 3', 'Extras');

-- Confira o resultado:
--   select fonte, count(*) from items group by fonte order by fonte;
