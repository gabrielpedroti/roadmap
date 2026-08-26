-- =============================================================
-- v1.9 — plano de mudança de ago/2026 nas trilhas Dev e IA
-- Como aplicar: Supabase Dashboard → SQL Editor → colar tudo → Run.
--
-- Faz o MESMO que `npm run seed -- --force` faria, mas só nos pontos que
-- mudaram — então NÃO apaga os conceitos que você já marcou.
--
-- Idempotente: pode rodar duas vezes sem duplicar nada.
--
-- ⚠️  A única perda proposital: os 6 cursos de PyTorch do "Nível 2" da
--     Carreira 3 são REMOVIDOS (decisão do plano), e com eles os checks
--     desses 6 itens. Todo o resto do progresso fica intacto.
--
-- Posições novas são ancoradas por TÍTULO do grupo/item vizinho, não por
-- número de ordem — assim a migration não depende do estado atual.
-- =============================================================

-- -------------------------------------------------------------
-- A) TRILHA DEV · Bloco 1 — Nano PYTHON da FIAP vira a fonte da base
--    da linguagem (a Alura sai de lógica, coleções e arquivos).
-- -------------------------------------------------------------
update items i
set onde_estudar = '[
  {"plataforma":"fiap","tipo":"curso","nome":"Nano PYTHON (cap. 1-5)"},
  {"plataforma":"puc","tipo":"materia","nome":"Raciocínio Computacional"}
]'::jsonb
from item_groups g
join blocks b on b.id = g.block_id
join tracks t on t.id = b.track_id
where i.group_id = g.id
  and t.slug = 'dev'
  and b.ordem = 1
  and i.titulo = any (array[
    'Variáveis, operadores, entrada/saída',
    'Condicionais',
    'Laços',
    'Funções',
    'Erros (try/except)',
    'Listas e tuplas',
    'Dicionários e conjuntos'
  ]);

-- "Ler/escrever texto, CSV e JSON" não tem matéria da PUC casando
update items i
set onde_estudar = '[
  {"plataforma":"fiap","tipo":"curso","nome":"Nano PYTHON (cap. 1-5)"}
]'::jsonb
from item_groups g
join blocks b on b.id = g.block_id
join tracks t on t.id = b.track_id
where i.group_id = g.id
  and t.slug = 'dev'
  and b.ordem = 1
  and i.titulo = 'Ler/escrever texto, CSV e JSON';

-- -------------------------------------------------------------
-- B) TRILHA DEV · Bloco 2 — IoT ganha os capítulos 7-8 do mesmo Nano
-- -------------------------------------------------------------
update items i
set onde_estudar = '[
  {"plataforma":"fiap","tipo":"curso","nome":"Nano PYTHON (cap. 7-8)"},
  {"plataforma":"puc","tipo":"materia","nome":"Fundamentos de IoT"},
  {"plataforma":"puc","tipo":"materia","nome":"IoT em um Mundo Conectado"}
]'::jsonb
from item_groups g
join blocks b on b.id = g.block_id
join tracks t on t.id = b.track_id
where i.group_id = g.id
  and t.slug = 'dev'
  and i.titulo = 'Conceito e arquitetura, protocolos (HTTP vs MQTT)';

-- -------------------------------------------------------------
-- C) TRILHA DEV · Bloco 5 — grupo "Testes" novo + item opcional de NoSQL
-- -------------------------------------------------------------
do $$
declare
  v_block uuid;
  v_group uuid;
  v_ordem int;
begin
  select b.id into v_block
  from blocks b join tracks t on t.id = b.track_id
  where t.slug = 'dev' and b.ordem = 5;

  if v_block is null then
    raise notice 'Bloco 5 da Dev não encontrado — rode o seed primeiro.';
    return;
  end if;

  -- C1) grupo "Testes", logo antes de "PostgreSQL e SQL"
  select id into v_group
  from item_groups where block_id = v_block and titulo = 'Testes';

  if v_group is null then
    select ordem into v_ordem
    from item_groups where block_id = v_block and titulo = 'PostgreSQL e SQL';

    -- sem o vizinho de referência, entra no fim
    if v_ordem is null then
      select coalesce(max(ordem), 0) + 1 into v_ordem
      from item_groups where block_id = v_block;
    else
      update item_groups set ordem = ordem + 1
      where block_id = v_block and ordem >= v_ordem;
    end if;

    insert into item_groups (block_id, titulo, ordem)
    values (v_block, 'Testes', v_ordem)
    returning id into v_group;

    insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar)
    values (
      v_group,
      'Testes na API (Jest)',
      'Testar a API do projeto deste bloco como você testou com pytest no Bloco 2: rotas felizes e de erro, o que quebra quando o cliente manda lixo.',
      1,
      'concept',
      null,
      '[{"plataforma":"alura","tipo":"curso","nome":"Node.js: testando API''s REST e scripts assíncronos"}]'::jsonb
    );
  end if;

  -- C2) item opcional de NoSQL, no fim do grupo "PostgreSQL e SQL"
  select id into v_group
  from item_groups where block_id = v_block and titulo = 'PostgreSQL e SQL';

  if v_group is not null and not exists (
    select 1 from items
    where group_id = v_group
      and titulo = 'NoSQL na prática — noção de banco de documentos'
  ) then
    select coalesce(max(ordem), 0) + 1 into v_ordem
    from items where group_id = v_group;

    insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar)
    values (
      v_group,
      'NoSQL na prática — noção de banco de documentos',
      'Documento vs tabela e quando cada um serve. Só a noção: a Fase 2 da pós usa Postgres E MongoDB.',
      v_ordem,
      'optional',
      null,
      '[
        {"plataforma":"alura","tipo":"curso","nome":"MongoDB: Modelagem de dados"},
        {"plataforma":"alura","tipo":"curso","nome":"MongoDB: realizando consultas"}
      ]'::jsonb
    );
  end if;
end $$;

-- -------------------------------------------------------------
-- D) TRILHA DEV · Bloco 6 — SOLID (obrigatório) e testes de componente
--    (opcional), cada um no fim do seu grupo
-- -------------------------------------------------------------
do $$
declare
  v_block uuid;
  v_group uuid;
  v_ordem int;
begin
  select b.id into v_block
  from blocks b join tracks t on t.id = b.track_id
  where t.slug = 'dev' and b.ordem = 6;

  if v_block is null then
    raise notice 'Bloco 6 da Dev não encontrado — rode o seed primeiro.';
    return;
  end if;

  -- D1) SOLID, no grupo "TypeScript"
  select id into v_group
  from item_groups where block_id = v_block and titulo = 'TypeScript';

  if v_group is not null and not exists (
    select 1 from items
    where group_id = v_group and titulo = 'Princípios SOLID e código limpo — noção'
  ) then
    select coalesce(max(ordem), 0) + 1 into v_ordem
    from items where group_id = v_group;

    insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar)
    values (
      v_group,
      'Princípios SOLID e código limpo — noção',
      'Os 5 princípios em exemplos de TS, sem decoreba: reconhecer a classe que faz coisa demais e a dependência apertada. A Fase 1 da pós já assume isso.',
      v_ordem,
      'concept',
      null,
      '[{"plataforma":"alura","tipo":"curso","nome":"SOLID com TypeScript: aplicando boas práticas em orientação a objetos"}]'::jsonb
    );
  end if;

  -- D2) testes de componente, no grupo "React"
  select id into v_group
  from item_groups where block_id = v_block and titulo = 'React';

  if v_group is not null and not exists (
    select 1 from items
    where group_id = v_group and titulo = 'Testes de componente (Jest + Testing Library)'
  ) then
    select coalesce(max(ordem), 0) + 1 into v_ordem
    from items where group_id = v_group;

    insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar)
    values (
      v_group,
      'Testes de componente (Jest + Testing Library)',
      'Testar o que o usuário vê, não o estado interno: renderizar, procurar por texto/label e simular clique.',
      v_ordem,
      'optional',
      null,
      '[{"plataforma":"alura","tipo":"curso","nome":"React: escrevendo seus primeiros testes com Jest e Testing Library"}]'::jsonb
    );
  end if;
end $$;

-- -------------------------------------------------------------
-- E) TRILHA DEV · Bloco 7 — Nano ENGENHARIA DE SOFTWARE como revisão
-- -------------------------------------------------------------
update items i
set
  descricao = 'Da ideia ao deploy, cascata vs iterativo; funcionais vs não-funcionais e user stories com critérios de aceite; caso de uso e diagrama de classes em nível de leitura. No Nano da FIAP: capítulo que não mapeia nas matérias Eng. de Software, Especificação de SI ou Projeto de SI — pular (é material de revisão, não de especialização).',
  onde_estudar = '[
    {"plataforma":"fiap","tipo":"curso","nome":"Nano ENGENHARIA DE SOFTWARE"},
    {"plataforma":"puc","tipo":"materia","nome":"Fundamentos de Engenharia de Software"},
    {"plataforma":"puc","tipo":"materia","nome":"Especificação de Sistemas de Informação"},
    {"plataforma":"puc","tipo":"materia","nome":"Projeto de Sistemas de Informação"}
  ]'::jsonb
from item_groups g
join blocks b on b.id = g.block_id
join tracks t on t.id = b.track_id
where i.group_id = g.id
  and t.slug = 'dev'
  and i.titulo = 'Ciclo de vida, requisitos (user stories), especificação e modelagem';

-- -------------------------------------------------------------
-- F) TRILHA IA — descrição da trilha (o certificado da Carreira 3 caiu)
-- -------------------------------------------------------------
update tracks
set descricao = 'IA e automação aplicadas ao BPO financeiro: 3 carreiras Alura (2 certificados — a Carreira 3 vai só até onde serve ao trabalho) + Anthropic Academy, das ferramentas no-code até agentes com a API do Claude — sempre com precisão acima de velocidade.'
where slug = 'ia';

-- -------------------------------------------------------------
-- G) TRILHA IA · Etapa 0 — grupo "HTTP e webhooks" antes do Mindset
-- -------------------------------------------------------------
do $$
declare
  v_block uuid;
  v_group uuid;
  v_ordem int;
begin
  select b.id into v_block
  from blocks b join tracks t on t.id = b.track_id
  where t.slug = 'ia' and b.ordem = 1;

  if v_block is null then
    raise notice 'Etapa 0 da IA não encontrada — rode o seed primeiro.';
    return;
  end if;

  select id into v_group
  from item_groups where block_id = v_block and titulo = 'HTTP e webhooks';

  if v_group is null then
    select ordem into v_ordem
    from item_groups
    where block_id = v_block and titulo = 'Mindset (grátis + certificado)';

    if v_ordem is null then
      select coalesce(max(ordem), 0) + 1 into v_ordem
      from item_groups where block_id = v_block;
    else
      update item_groups set ordem = ordem + 1
      where block_id = v_block and ordem >= v_ordem;
    end if;

    insert into item_groups (block_id, titulo, ordem)
    values (v_block, 'HTTP e webhooks', v_ordem)
    returning id into v_group;

    insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar)
    values
      (
        v_group,
        'HTTP na prática',
        'Requisição e resposta, verbos, status codes e headers: a base de qualquer integração no n8n.',
        1,
        'concept',
        'alura',
        '[]'::jsonb
      ),
      (
        v_group,
        'Webhooks com n8n',
        'Uma API ao contrário: em vez de você perguntar, o sistema te avisa. É o gatilho da maioria dos fluxos.',
        2,
        'concept',
        'alura',
        '[]'::jsonb
      );
  end if;
end $$;

-- -------------------------------------------------------------
-- H) TRILHA IA · Carreira 1 — pandas, logo depois do Excel + IA
-- -------------------------------------------------------------
do $$
declare
  v_group uuid;
  v_ordem int;
begin
  select g.id into v_group
  from item_groups g
  join blocks b on b.id = g.block_id
  join tracks t on t.id = b.track_id
  where t.slug = 'ia'
    and g.titulo = 'Nível 2 — IA aplicada aos Processos (50h)';

  if v_group is null then
    raise notice 'Grupo Nível 2 da Carreira 1 não encontrado — rode o seed primeiro.';
    return;
  end if;

  if not exists (
    select 1 from items
    where group_id = v_group
      and titulo = 'pandas — manipulação de planilhas em Python'
  ) then
    select ordem + 1 into v_ordem
    from items
    where group_id = v_group
      and titulo = 'Excel: manipulação avançada de dados e automação com IA';

    if v_ordem is null then
      select coalesce(max(ordem), 0) + 1 into v_ordem
      from items where group_id = v_group;
    else
      update items set ordem = ordem + 1
      where group_id = v_group and ordem >= v_ordem;
    end if;

    insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar)
    values (
      v_group,
      'pandas — manipulação de planilhas em Python',
      'Essencial pro conversor de planilhas do BPO (o projeto-âncora). Alura: “Pandas: conhecendo a biblioteca” (2º passo opcional: “Pandas: transformação e manipulação de dados”).',
      v_ordem,
      'concept',
      'alura',
      '[]'::jsonb
    );
  end if;
end $$;

-- -------------------------------------------------------------
-- I) TRILHA IA · Carreira 3 — corta o Nível 2 (PyTorch) e troca a fonte
--    da revisão de Machine Learning pelo Nano da FIAP
-- -------------------------------------------------------------

-- I1) ⚠️ remove o grupo inteiro (6 cursos + os checks deles, por cascata)
delete from item_groups g
using blocks b, tracks t
where g.block_id = b.id
  and b.track_id = t.id
  and t.slug = 'ia'
  and g.titulo = 'Nível 2 — Machine Learning, Deep Learning e Fine Tuning (72h)';

-- I2) descrição da Carreira 3 (não promete mais o certificado nem PyTorch)
update blocks b
set descricao = 'Carreira Alura Engenharia de Agentes — cobre a matéria Técnicas de Machine Learning da PUC. A base e o Nível 1 já vêm da Carreira 2. O Nível 2 (Deep Learning com PyTorch, 72h) foi CORTADO de propósito: é especialização em ML, fora do escopo do BPO — a consequência assumida é que o certificado desta carreira não fecha.'
from tracks t
where t.id = b.track_id
  and t.slug = 'ia'
  and b.titulo = 'Carreira 3 — Engenharia de Agentes de IA';

-- I3) a revisão da matéria passa a sair do Nano da FIAP
update items i
set
  descricao = 'Revisada pelo Nano Course INTELIGÊNCIA ARTIFICIAL E COMPUTACIONAL da FIAP (80h, 8 capítulos): básico de IA, sistemas especialistas e hands-on de ML. É revisão da matéria, não especialização em ML.',
  onde_estudar = '[{"plataforma":"fiap","tipo":"curso","nome":"Nano INTELIGÊNCIA ARTIFICIAL E COMPUTACIONAL"}]'::jsonb
from item_groups g
join blocks b on b.id = g.block_id
join tracks t on t.id = b.track_id
where i.group_id = g.id
  and t.slug = 'ia'
  and i.titulo = 'Técnicas de Machine Learning — Revisado';
