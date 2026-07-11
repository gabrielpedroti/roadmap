-- =============================================================
-- v1.3 — adiciona o curso da DIO no topo da Etapa 0 (trilha IA)
-- SEM apagar progresso. Como aplicar: SQL Editor → colar → Run.
-- É idempotente (pode rodar de novo sem duplicar).
--
-- Use ISTO em vez de `npm run seed --force` quando já houver progresso
-- marcado — o seed --force apagaria todos os user_checks.
-- =============================================================

do $$
declare
  v_block uuid;
  v_group uuid;
begin
  -- Etapa 0 da trilha IA (é o bloco de ordem 1 dessa trilha)
  select b.id into v_block
  from blocks b
  join tracks t on t.id = b.track_id
  where t.slug = 'ia' and b.ordem = 1;

  if v_block is null then
    raise notice 'Etapa 0 da trilha IA não encontrada — rode o seed primeiro.';
    return;
  end if;

  -- cria o grupo "🎓 DIO" no topo (empurra os outros grupos pra frente)
  select id into v_group
  from item_groups
  where block_id = v_block and titulo = '🎓 DIO';

  if v_group is null then
    update item_groups set ordem = ordem + 1 where block_id = v_block;
    insert into item_groups (block_id, titulo, ordem)
    values (v_block, '🎓 DIO', 1)
    returning id into v_group;
  end if;

  -- insere o curso, se ainda não existir
  if not exists (
    select 1 from items
    where group_id = v_group
      and titulo = 'Formação Fundamentos de Inteligência Artificial'
  ) then
    insert into items (group_id, titulo, descricao, ordem, tipo)
    values (
      v_group,
      'Formação Fundamentos de Inteligência Artificial',
      'Em andamento — base de fundamentos de IA pela DIO.',
      1,
      'concept'
    );
  end if;
end $$;
