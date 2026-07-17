-- =============================================================
-- v1.7 — trilha IA reestruturada (guiada por carreira/curso)
-- Como aplicar: Supabase Dashboard → SQL Editor → colar tudo → Run
--
-- O QUE FAZ: atualiza titulo/descricao dos 4 blocos da trilha IA e recria
-- todos os GRUPOS e ITENS com a estrutura nova (carreiras Alura + Anthropic
-- Academy + reforco). Cada item ganha a badge da plataforma (fonte).
--
-- ⚠️  PERDE: os checks marcados NA TRILHA IA (os cursos foram renomeados e
--     reorganizados, nao ha como mapear os antigos). NAO perde: suas sessoes
--     de estudo/streak/metas, nem Dev/Ingles. Anote seu progresso da IA antes.
--
-- Preserva os pre-requisitos dos blocos (sequencial e o cruzado Dev Bloco 2),
-- que ficam no bloco e nao sao tocados aqui.
--
-- ARQUIVO GERADO a partir de supabase/seed/trilha-ia.ts — nao editar a mao.
-- =============================================================

-- 1) libera as fontes novas (Coursera e DeepLearning.AI) na coluna fonte
alter table items drop constraint if exists items_fonte_check;
alter table items add constraint items_fonte_check
  check (fonte is null or fonte in
    ('ads-pucpr','dio','alura','anthropic','coursera','deeplearning'));

do $$
declare
  v_block uuid;
  v_group uuid;
begin
  -- limpa os grupos da trilha IA (cascata: itens -> user_checks dos itens)
  delete from item_groups g using blocks b, tracks t
   where g.block_id = b.id and b.track_id = t.id and t.slug = 'ia';


  -- ===== Etapa 0 — Fundamentos =====
  select b.id into v_block from blocks b join tracks t on t.id = b.track_id
   where t.slug = 'ia' and b.ordem = 1;
  update blocks set titulo = 'Etapa 0 — Fundamentos', descricao = 'Panorama de IA, base de programação e mindset com Claude. A base de programação NÃO é obrigatória — faça só se ainda não tiver o conhecimento.', semanas_estimadas = '2-4 semanas' where id = v_block;
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Conceitual — você já fez', 1) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Fundamentos de Inteligência Artificial', 'Panorama de IA: machine learning, NLP, IA generativa e agentes.', 1, 'concept', 'dio', '[]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Programação (base das Carreiras 2 e 3)', 2) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Pensamento computacional: fundamentos da computação e lógica de programação', '8h. Você já cobre isso na lógica da trilha Dev — dá pra pular ou fazer rápido.', 1, 'concept', 'alura', '[]'::jsonb),
    (v_group, 'Python: Inteligência Artificial Aplicada', '12h. Porta de entrada Python→IA (precisa do seu Python dos Blocos 1-2 do Dev). Não é exigido pela Carreira 1 (low-code); é base das Carreiras 2 e 3.', 2, 'concept', 'alura', '[]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Mindset (grátis + certificado)', 3) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'AI Fluency: Framework & Foundations', null, 1, 'concept', 'anthropic', '[]'::jsonb),
    (v_group, 'Claude 101', null, 2, 'concept', 'anthropic', '[]'::jsonb);

  -- ===== Carreira 1 — IA para Automação de Processos =====
  select b.id into v_block from blocks b join tracks t on t.id = b.track_id
   where t.slug = 'ia' and b.ordem = 2;
  update blocks set titulo = 'Carreira 1 — IA para Automação de Processos', descricao = 'Carreira Alura de IA para Automação — ROI imediato no trabalho. Ao concluir os 3 níveis: 🎓 certificado da Carreira 1.', semanas_estimadas = null where id = v_block;
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Base (20h)', 1) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Letramento em IA: competências essenciais e domínio crítico', null, 1, 'concept', 'alura', '[]'::jsonb),
    (v_group, 'Gestão de Processos: mapeamento e automação com Lean e RPA', null, 2, 'concept', 'alura', '[]'::jsonb),
    (v_group, 'IA no trabalho: produtividade com assistentes e agentes', null, 3, 'concept', 'alura', '[]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Nível 1 — Construção de Automações (75h)', 2) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Prompt Engineering: projetando e automatizando interações com LLMs', null, 1, 'concept', 'alura', '[]'::jsonb),
    (v_group, 'Power Automate: criando fluxos de trabalho automatizados', null, 2, 'concept', 'alura', '[]'::jsonb),
    (v_group, 'Power Automate: automatizando tarefas de um analista de dados', null, 3, 'concept', 'alura', '[]'::jsonb),
    (v_group, 'Copilot Studio: fundamentos e automação', null, 4, 'concept', 'alura', '[]'::jsonb),
    (v_group, 'Automação de processos com n8n: modelagem de fluxos e integração de sistemas', null, 5, 'concept', 'alura', '[]'::jsonb),
    (v_group, 'Automação de processos com n8n: coleta e análise de dados', null, 6, 'concept', 'alura', '[]'::jsonb),
    (v_group, 'Gemini no Google Sheets: planilhas com IA e fluxos entre aplicativos', null, 7, 'concept', 'alura', '[]'::jsonb),
    (v_group, 'Claude Cowork: produtividade e gestão de projetos inteligente', null, 8, 'concept', 'alura', '[]'::jsonb),
    (v_group, 'Codex: assistentes, skills e fluxos de trabalho inteligentes', null, 9, 'concept', 'alura', '[]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Nível 2 — IA aplicada aos Processos (50h)', 3) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Excel: manipulação avançada de dados e automação com IA', null, 1, 'concept', 'alura', '[]'::jsonb),
    (v_group, 'Agentes de IA com Gemini: automatize fluxos no Google Workspace', null, 2, 'concept', 'alura', '[]'::jsonb),
    (v_group, 'Copilot Studio: criando solução multiagentes', null, 3, 'concept', 'alura', '[]'::jsonb),
    (v_group, 'Claude Cowork: integrações e fluxos de projeto', null, 4, 'concept', 'alura', '[]'::jsonb),
    (v_group, 'Claude Cowork: orquestração de agentes', null, 5, 'concept', 'alura', '[]'::jsonb),
    (v_group, 'Automação de processos com n8n: integração de bases de conhecimento', null, 6, 'concept', 'alura', '[]'::jsonb),
    (v_group, 'Automação de processos com n8n: integração de APIs REST', 'Chave dos lançamentos automáticos do BPO.', 7, 'concept', 'alura', '[]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Nível 3 — Automação Inteligente em Ambiente Corporativo', 4) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Automação Inteligente em Ambiente Corporativo', 'Em breve — acompanhar o lançamento.', 1, 'optional', 'alura', '[]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Matérias da faculdade', 5) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Inteligência Analítica em Negócios (Power BI) — Revisado', 'Revisão dirigida junto ao Excel + IA deste nível.', 1, 'review', 'ads-pucpr', '[]'::jsonb);

  -- ===== Carreira 2 — Especialista em IA =====
  select b.id into v_block from blocks b join tracks t on t.id = b.track_id
   where t.slug = 'ia' and b.ordem = 3;
  update blocks set titulo = 'Carreira 2 — Especialista em IA', descricao = 'Carreira Alura Especialista em IA — o núcleo técnico do agente do BPO. 🔒 Exige o Bloco 2 do Dev (Python sólido). A base (Pensamento computacional + Python IA) e o Nível 1 já vêm da Etapa 0 e da Carreira 1. Ao concluir: 🎓 certificado da Carreira 2.', semanas_estimadas = null where id = v_block;
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Nível 1 — novidade', 1) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Langflow: criação e orquestração de fluxos e agentes de IA', 'Único curso novo do Nível 1 — o resto você já fez na Carreira 1.', 1, 'concept', 'alura', '[]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Nível 2 — Arquitetura de sistemas com agentes (74h)', 2) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Inteligência artificial: preparação para o mercado', null, 1, 'concept', 'alura', '[]'::jsonb),
    (v_group, 'Arquiteturas RAG com LLMs: embeddings, busca semântica e agentes com LangChain', null, 2, 'concept', 'alura', '[]'::jsonb),
    (v_group, 'LangChain: técnicas avançadas de RAG', null, 3, 'concept', 'alura', '[]'::jsonb),
    (v_group, 'LangGraph: orquestrando agentes e multiagentes', null, 4, 'concept', 'alura', '[]'::jsonb),
    (v_group, 'Protocolos e arquitetura para agentes: MCP, A2A, AG-UI e BFA', null, 5, 'concept', 'alura', '[]'::jsonb),
    (v_group, 'Model Context Protocol (MCP): otimização de agentes de IA com n8n', null, 6, 'concept', 'alura', '[]'::jsonb),
    (v_group, 'Hugging Face: explorando e aplicando soluções com modelos de IA', null, 7, 'concept', 'alura', '[]'::jsonb),
    (v_group, 'CrewAI: orquestração e desenvolvimento de sistemas multiagentes', null, 8, 'concept', 'alura', '[]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Nível 3 — Operação e governança (57h)', 3) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Observabilidade para LLMs: monitoramento e avaliação com LangFuse', null, 1, 'concept', 'alura', '[]'::jsonb),
    (v_group, 'Governança de Inteligência Artificial: fundamentos, riscos e boas práticas', null, 2, 'concept', 'alura', '[]'::jsonb),
    (v_group, 'IA aplicada a Produto: estratégias e soluções digitais', null, 3, 'concept', 'alura', '[]'::jsonb),
    (v_group, 'Empreendendo com IA: da ideação ao modelo de negócio', null, 4, 'concept', 'alura', '[]'::jsonb),
    (v_group, 'Pipelines de IA em Cloud: Azure, AWS e GCP', null, 5, 'concept', 'alura', '[]'::jsonb),
    (v_group, 'MLFlow: gerenciamento de experimentos e integração com IA generativa', null, 6, 'concept', 'alura', '[]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, '🎓 Anthropic Academy', 4) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Claude Platform 101', null, 1, 'concept', 'anthropic', '[]'::jsonb),
    (v_group, 'Building with the Claude API', 'Tool use e structured outputs — o coração do agente do BPO.', 2, 'concept', 'anthropic', '[]'::jsonb),
    (v_group, 'Introduction to MCP', null, 3, 'concept', 'anthropic', '[]'::jsonb),
    (v_group, 'MCP: Advanced Topics', null, 4, 'concept', 'anthropic', '[]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Reforço opcional', 5) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Docs Anthropic: Building effective agents', 'Leitura OBRIGATÓRIA antes de codar o projeto: workflows, chaining, routing, orchestrator-workers. Bate com a regra “precisão vem da arquitetura”.', 1, 'optional', 'anthropic', '[]'::jsonb),
    (v_group, 'Coursera: IBM RAG and Agentic AI (Professional Certificate)', 'Reforça as Etapas 2 e 3. Usar auxílio financeiro.', 2, 'optional', 'coursera', '[]'::jsonb),
    (v_group, 'DeepLearning.AI: short courses de LangChain, RAG e agentes', 'Rápidos; reforçam agentes e RAG.', 3, 'optional', 'deeplearning', '[]'::jsonb),
    (v_group, 'Automação com n8n (25h)', 'Reforça a Carreira 1 (n8n). Grátis, bolsa Santander.', 4, 'optional', 'dio', '[]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, '🏗️ Projeto-âncora da trilha (30%)', 6) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Agente Claude via API', 'Recebe planilha bagunçada → extrai/classifica → valida em código → lança via API do sistema. O caso real do BPO, seguindo a “constituição”: LLM nunca faz conta nem lançamento; agente só na ambiguidade; validação de schema em código; human-in-the-loop acima de um limite de valor; logs e reconciliação diária.', 1, 'project', null, '[]'::jsonb);

  -- ===== Carreira 3 — Engenharia de Agentes de IA =====
  select b.id into v_block from blocks b join tracks t on t.id = b.track_id
   where t.slug = 'ia' and b.ordem = 4;
  update blocks set titulo = 'Carreira 3 — Engenharia de Agentes de IA', descricao = 'Carreira Alura Engenharia de Agentes — cobre a matéria Técnicas de Machine Learning da PUC. A base e o Nível 1 já vêm da Carreira 2. A parte pesada (Deep Learning com PyTorch) roda junto da pós FIAP. Ao concluir: 🎓 certificado da Carreira 3.', semanas_estimadas = null where id = v_block;
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Base + Nível 1 — novidades', 1) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'LangChain e Python: criando ferramentas com a OpenAI', null, 1, 'concept', 'alura', '[]'::jsonb),
    (v_group, 'Clusterização: lidando com dados sem rótulo', null, 2, 'concept', 'alura', '[]'::jsonb),
    (v_group, 'NLP: aplicando processamento de linguagem natural para análise de sentimentos', null, 3, 'concept', 'alura', '[]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Nível 2 — Machine Learning, Deep Learning e Fine Tuning (72h)', 2) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Redes Neurais: Deep Learning com PyTorch', null, 1, 'concept', 'alura', '[]'::jsonb),
    (v_group, 'Treinando uma Rede Neural: Deep Learning com PyTorch', null, 2, 'concept', 'alura', '[]'::jsonb),
    (v_group, 'Redes Neurais Recorrentes (RNN) com PyTorch', null, 3, 'concept', 'alura', '[]'::jsonb),
    (v_group, 'Redes Neurais Convolucionais (CNN) com PyTorch', null, 4, 'concept', 'alura', '[]'::jsonb),
    (v_group, 'Modelos de Difusão: fundamentos e aplicações avançadas', null, 5, 'concept', 'alura', '[]'::jsonb),
    (v_group, 'Transformers: fundamentos e prática com PyTorch', null, 6, 'concept', 'alura', '[]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Nível 3 — MLOps e AIOps (74h)', 3) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Integração contínua para LLMs: GitHub Actions e Deepeval', null, 1, 'concept', 'alura', '[]'::jsonb),
    (v_group, 'Data Science: testando relações com Regressão Linear', null, 2, 'concept', 'alura', '[]'::jsonb),
    (v_group, 'Hugging Face: transferindo aprendizado de modelos de NLP', null, 3, 'concept', 'alura', '[]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, '🎓 Anthropic Academy (junto da pós FIAP)', 4) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Claude Code 101', null, 1, 'concept', 'anthropic', '[]'::jsonb),
    (v_group, 'Claude Code in Action', null, 2, 'concept', 'anthropic', '[]'::jsonb),
    (v_group, 'Claude Code Skills', null, 3, 'concept', 'anthropic', '[]'::jsonb),
    (v_group, 'Claude Code Subagents', null, 4, 'concept', 'anthropic', '[]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, '🏁 Formação Claude Cowork (fechar o certificado)', 5) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Claude Cowork: casos de uso em gestão, produto e marketing', 'Por último, só pra fechar o certificado da formação Cowork — o resto você já fez dentro das carreiras. 4h.', 1, 'concept', 'alura', '[]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Matérias da faculdade', 6) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Técnicas de Machine Learning — Revisado', 'Coberta pelos cursos de ML e Deep Learning desta carreira.', 1, 'review', 'ads-pucpr', '[]'::jsonb);
end $$;

-- Confira:
--   select count(*) from items i join item_groups g on g.id=i.group_id
--     join blocks b on b.id=g.block_id join tracks t on t.id=b.track_id
--    where t.slug='ia';   -- esperado: 68
