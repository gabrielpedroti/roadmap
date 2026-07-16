-- =============================================================
-- v1.6 — trilha Dev reestruturada (espinha de conceitos do mapa novo)
-- Como aplicar: Supabase Dashboard → SQL Editor → colar tudo → Run
--
-- O QUE FAZ: apaga e recria os GRUPOS e ITENS da trilha Dev com a estrutura
-- nova (51 conceitos, antes 124 — vários foram fundidos num só).
--
-- ⚠️  PERDE: os checks marcados NA TRILHA DEV (os conceitos mudaram, não há
--     como mapear os antigos). NÃO perde: suas sessões de estudo/streak/metas
--     (ficam em sessions, ligadas à trilha, não aos itens), nem nada das
--     trilhas de IA e Inglês.
--
-- ARQUIVO GERADO a partir de supabase/seed/trilha-dev.ts — não editar à mão.
-- =============================================================

do $$
declare
  v_block uuid;
  v_group uuid;
begin
  -- limpa os grupos da trilha Dev (cascata: itens → user_checks dos itens)
  delete from item_groups g using blocks b, tracks t
   where g.block_id = b.id and b.track_id = t.id and t.slug = 'dev';


  -- ===== Bloco 1 — Fundamentos de Programação (Python) =====
  select b.id into v_block from blocks b join tracks t on t.id = b.track_id
   where t.slug = 'dev' and b.ordem = 1;
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Primeiros passos', 1) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'O que é programação, áreas, carreira e próximos passos', 'Front, back, mobile: o mapa da área, como o mercado funciona e por onde seguir.', 1, 'concept', null, '[{"plataforma":"alura","tipo":"curso","nome":"Começando em Programação: carreira e primeiros passos"}]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Ambiente e ferramentas', 2) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'VS Code (uso produtivo)', 'Paleta de comandos (Ctrl+Shift+P), multi-cursor, busca no projeto, extensões, terminal integrado e debugger básico.', 1, 'concept', null, '[{"plataforma":"alura","tipo":"curso","nome":"VSCode: dicas e truques"}]'::jsonb),
    (v_group, 'Terminal', 'Navegar entre pastas, criar/mover/apagar arquivos, rodar scripts, caminho relativo vs absoluto.', 2, 'concept', null, '[{"plataforma":"alura","tipo":"curso","nome":"Windows Prompt: utilizando o CMD"}]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Git e GitHub', 3) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Controle de versão, ciclo (add/commit) e histórico', 'Por que existe; init, status, add, commit com mensagens claras; log, diff e voltar num arquivo.', 1, 'concept', null, '[{"plataforma":"alura","tipo":"curso","nome":"Git e GitHub: controle de versão"}]'::jsonb),
    (v_group, 'Branches, conflito, GitHub e colaboração', 'Criar/alternar branch, merge, resolver conflito; repositório, clone, push/pull, README e .gitignore. Critério de saída: versionar qualquer projeto novo sem tutorial.', 2, 'concept', null, '[{"plataforma":"alura","tipo":"curso","nome":"Git e GitHub: compartilhando e colaborando"}]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Lógica e fundamentos', 4) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Variáveis, operadores, entrada/saída', 'int, float, str, bool e conversões; aritméticos, comparação e lógicos (and/or/not); input(), print() e f-strings.', 1, 'concept', null, '[{"plataforma":"alura","tipo":"curso","nome":"Python: crie a sua primeira aplicação"},{"plataforma":"alura","tipo":"trilha","nome":"Iniciante em programação"},{"plataforma":"puc","tipo":"materia","nome":"Raciocínio Computacional"}]'::jsonb),
    (v_group, 'Condicionais', 'if/elif/else; condições compostas; aninhamento (e por que evitar).', 2, 'concept', null, '[{"plataforma":"alura","tipo":"curso","nome":"Python: crie a sua primeira aplicação"},{"plataforma":"alura","tipo":"curso","nome":"Praticando Python: condicionais if, elif e else"},{"plataforma":"puc","tipo":"materia","nome":"Raciocínio Computacional"}]'::jsonb),
    (v_group, 'Laços', 'for + range, while, break/continue; escolher o laço certo pro problema.', 3, 'concept', null, '[{"plataforma":"alura","tipo":"curso","nome":"Python: crie a sua primeira aplicação"},{"plataforma":"alura","tipo":"curso","nome":"Praticando Python: laços for e while"},{"plataforma":"puc","tipo":"materia","nome":"Raciocínio Computacional"}]'::jsonb),
    (v_group, 'Funções', 'Parâmetros, retorno, escopo, valores default; quebrar problema em funções pequenas.', 4, 'concept', null, '[{"plataforma":"alura","tipo":"curso","nome":"Python: crie a sua primeira aplicação"},{"plataforma":"alura","tipo":"curso","nome":"Praticando Python: funções"},{"plataforma":"puc","tipo":"materia","nome":"Raciocínio Computacional"}]'::jsonb),
    (v_group, 'Erros (try/except)', 'Ler um traceback sem pânico; try/except; levantar erros próprios (raise).', 5, 'concept', null, '[{"plataforma":"alura","tipo":"curso","nome":"Python: crie a sua primeira aplicação"},{"plataforma":"puc","tipo":"materia","nome":"Raciocínio Computacional"}]'::jsonb),
    (v_group, 'Strings e Regex', 'Manipular texto de verdade e reconhecer padrões com expressões regulares.', 6, 'concept', null, '[{"plataforma":"alura","tipo":"curso","nome":"Praticando Python: Strings e Regex"}]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Coleções', 5) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Listas e tuplas', 'Criar, indexar, fatiar (slicing), métodos principais, iterar; imutabilidade e quando cada uma faz sentido.', 1, 'concept', null, '[{"plataforma":"alura","tipo":"curso","nome":"Praticando Python: listas e tuplas"},{"plataforma":"puc","tipo":"materia","nome":"Raciocínio Computacional"}]'::jsonb),
    (v_group, 'Dicionários e conjuntos', 'Chave/valor, quando usar em vez de lista, iterar chaves e valores; sets e operações de conjunto.', 2, 'concept', null, '[{"plataforma":"alura","tipo":"curso","nome":"Praticando Python: conjuntos e dicionários"},{"plataforma":"puc","tipo":"materia","nome":"Raciocínio Computacional"}]'::jsonb),
    (v_group, 'List comprehensions', 'Ler e escrever as básicas (transformar e filtrar).', 3, 'concept', null, '[{"plataforma":"alura","tipo":"trilha","nome":"Praticando Python"}]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Arquivos e dados', 6) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Ler/escrever texto, CSV e JSON', 'with open e modos de abertura; módulo csv; dumps/loads — e por que JSON é a língua das APIs.', 1, 'concept', null, '[{"plataforma":"alura","tipo":"curso","nome":"Python: avance na OO e consuma API"}]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Matemática aplicada', 7) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Lógica proposicional, bases numéricas, proporção/porcentagem', 'E/OU/NÃO e tabelas-verdade (a base dos seus ifs); binário/decimal/hex na intuição; o suficiente pra barra de progresso, juros e métricas.', 1, 'concept', null, '[{"plataforma":"puc","tipo":"materia","nome":"Matemática Aplicada à Computação"}]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Matérias da faculdade', 8) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Raciocínio Computacional — Revisado', null, 1, 'review', 'ads-pucpr', '[]'::jsonb),
    (v_group, 'Refiz o projeto — Raciocínio Computacional', null, 2, 'optional', 'ads-pucpr', '[]'::jsonb),
    (v_group, 'Matemática Aplicada à Computação — Revisado', null, 3, 'review', 'ads-pucpr', '[]'::jsonb),
    (v_group, 'Refiz o projeto — Matemática Aplicada à Computação', null, 4, 'optional', 'ads-pucpr', '[]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, '🏗️ Projeto do bloco (30%)', 9) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'CLI de registro de estudos', '(ou finanças pessoais) Menu interativo, CRUD completo, dados salvos em JSON ou CSV, código organizado em funções, tratamento de erros de entrada, repositório no GitHub com histórico de commits pequenos e README explicando como rodar.', 1, 'project', null, '[]'::jsonb);

  -- ===== Bloco 2 — POO e Estruturas de Dados (Python) =====
  select b.id into v_block from blocks b join tracks t on t.id = b.track_id
   where t.slug = 'dev' and b.ordem = 2;
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Programação Orientada a Objetos', 1) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Classes, encapsulamento, herança, polimorfismo, composição e métodos especiais', 'Modelar algo do mundo real com __init__ e self; esconder detalhes com properties; reaproveitar com super(); duck typing; “tem um” vs “é um”; __str__, __repr__, __eq__. Critério de saída: decidir quando usar classe e quando função resolve.', 1, 'concept', null, '[{"plataforma":"alura","tipo":"curso","nome":"Python: aplicando a Orientação a Objetos"},{"plataforma":"alura","tipo":"curso","nome":"Python: avance na OO e consuma API"},{"plataforma":"puc","tipo":"materia","nome":"Fundamentos de POO"}]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Estruturas de dados e algoritmos', 2) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Pilha, fila e lista ligada', 'Conceito, operações e onde aparecem na vida real (undo, filas de tarefas); diferença pra array.', 1, 'concept', null, '[{"plataforma":"alura","tipo":"curso","nome":"Estrutura de dados: pilhas, filas e listas com Python"},{"plataforma":"puc","tipo":"materia","nome":"Métodos de Pesquisa e Ordenação em Estruturas de Dados"}]'::jsonb),
    (v_group, 'Busca (linear, binária)', 'Quando cada uma serve e por que ordenação importa.', 2, 'concept', null, '[{"plataforma":"alura","tipo":"curso","nome":"Algoritmos II: MergeSort, QuickSort, Busca Binária"},{"plataforma":"puc","tipo":"materia","nome":"Métodos de Pesquisa e Ordenação em Estruturas de Dados"}]'::jsonb),
    (v_group, 'Ordenação (bubble, insertion, merge)', 'Entender bubble/insertion; merge sort na intuição de dividir pra conquistar.', 3, 'concept', null, '[{"plataforma":"alura","tipo":"curso","nome":"Algoritmos I: Selection, Insertion"},{"plataforma":"alura","tipo":"curso","nome":"Algoritmos II"},{"plataforma":"puc","tipo":"materia","nome":"Métodos de Pesquisa e Ordenação em Estruturas de Dados"}]'::jsonb),
    (v_group, 'Complexidade (Big-O)', 'Noção de O(1), O(n), O(n²), O(log n); comparar duas soluções.', 4, 'concept', null, '[{"plataforma":"alura","tipo":"curso","nome":"Algoritmos II"},{"plataforma":"puc","tipo":"materia","nome":"Métodos de Pesquisa e Ordenação em Estruturas de Dados"}]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Organização de código', 3) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Módulos e imports, ambientes virtuais (venv, pip)', 'Dividir um projeto em arquivos; isolar dependências com venv e requirements.txt.', 1, 'concept', null, '[{"plataforma":"alura","tipo":"curso","nome":"Python: avance na OO e consuma API"},{"plataforma":"alura","tipo":"trilha","nome":"Praticando Python"}]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Consumindo APIs', 4) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'HTTP, requests, autenticação (token), paginação', 'Requisição/resposta e status codes; consumir uma API real tratando erro de rede; token no header com segredo em variável de ambiente; consumir uma API paginada de ponta a ponta.', 1, 'concept', null, '[{"plataforma":"alura","tipo":"curso","nome":"Python: avance na OO e consuma API"},{"plataforma":"puc","tipo":"materia","nome":"Fundamentos de IoT"}]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Testes', 5) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'pytest e casos de borda', 'Escrever testes pra funções puras, nomear bem, rodar no terminal; pensar no que quebra: vazio, zero, negativo, formato errado.', 1, 'concept', null, '[{"plataforma":"alura","tipo":"curso","nome":"Python: testes automatizados e qualidade de código"}]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'IoT', 6) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Conceito e arquitetura, protocolos (HTTP vs MQTT)', 'Sensor → gateway → nuvem; onde as APIs entram nisso e quando cada protocolo serve.', 1, 'concept', null, '[{"plataforma":"puc","tipo":"materia","nome":"Fundamentos de IoT"},{"plataforma":"puc","tipo":"materia","nome":"IoT em um Mundo Conectado"}]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Matérias da faculdade', 7) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Fundamentos de POO — Revisado', null, 1, 'review', 'ads-pucpr', '[]'::jsonb),
    (v_group, 'Refiz o projeto — Fundamentos de POO', null, 2, 'optional', 'ads-pucpr', '[]'::jsonb),
    (v_group, 'Métodos de Pesquisa e Ordenação em Estruturas de Dados — Revisado', null, 3, 'review', 'ads-pucpr', '[]'::jsonb),
    (v_group, 'Refiz o projeto — Pesquisa e Ordenação', null, 4, 'optional', 'ads-pucpr', '[]'::jsonb),
    (v_group, 'Fundamentos de IoT — Revisado', null, 5, 'review', 'ads-pucpr', '[]'::jsonb),
    (v_group, 'Refiz o projeto — Fundamentos de IoT', null, 6, 'optional', 'ads-pucpr', '[]'::jsonb),
    (v_group, 'IoT em um Mundo Conectado — Revisado', null, 7, 'review', 'ads-pucpr', '[]'::jsonb),
    (v_group, 'Refiz o projeto — IoT em um Mundo Conectado', null, 8, 'optional', 'ads-pucpr', '[]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, '🏗️ Projeto do bloco (30%)', 8) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Sistema OO consumindo API real', 'Sugestão alinhada ao trabalho (BPO): cliente de cotações/moedas ou consolidador de dados financeiros. Requisitos: 3+ classes com responsabilidades claras, consumo de API com tratamento de erros, venv + requirements.txt, testes pytest nas regras de negócio, README.', 1, 'project', null, '[]'::jsonb);

  -- ===== Bloco 3 — Web e Front-end Básico =====
  select b.id into v_block from blocks b join tracks t on t.id = b.track_id
   where t.slug = 'dev' and b.ordem = 3;
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Como a web funciona', 1) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Cliente/servidor, HTTP na prática, DNS', 'Contar a história completa do que acontece ao digitar uma URL; métodos, status codes e headers na aba Network; como um nome vira IP.', 1, 'concept', null, '[{"plataforma":"alura","tipo":"trilha","nome":"Desenvolvimento Front-end HTML/CSS/JS"},{"plataforma":"puc","tipo":"materia","nome":"Fundamentos de Programação Web"}]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'HTML', 2) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Estrutura/semântica, formulários, acessibilidade', 'header/main/section/article/footer e por que semântica importa; inputs, labels e validação nativa; alt, hierarquia de headings e contraste.', 1, 'concept', null, '[{"plataforma":"alura","tipo":"trilha","nome":"HTML e CSS para projetos web"},{"plataforma":"puc","tipo":"materia","nome":"Fundamentos de Programação Web"}]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'CSS', 3) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Box model, flexbox, grid, responsivo (mobile-first), variáveis CSS', 'margin/border/padding/content; alinhar em uma dimensão e layouts em duas; media queries e unidades relativas; manter um CSS que não vira espaguete.', 1, 'concept', null, '[{"plataforma":"alura","tipo":"trilha","nome":"HTML e CSS para projetos web"},{"plataforma":"puc","tipo":"materia","nome":"Fundamentos de Programação Web"}]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'JavaScript no navegador', 4) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Sintaxe básica, DOM, eventos', 'Variáveis (let/const), funções e condicionais mapeando do Python; selecionar, criar e modificar elementos; click, submit, input e prevenir o comportamento padrão.', 1, 'concept', null, '[{"plataforma":"alura","tipo":"curso","nome":"JavaScript: construindo páginas dinâmicas"},{"plataforma":"puc","tipo":"materia","nome":"Fundamentos de Programação Web"}]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'UX / IHC', 5) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Heurísticas de usabilidade, hierarquia visual', 'Feedback, consistência e prevenção de erro (as 10 de Nielsen); tamanho, contraste e espaço guiando o olho.', 1, 'concept', null, '[{"plataforma":"puc","tipo":"materia","nome":"Interação Humano-Computador"}]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Matérias da faculdade', 6) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Fundamentos de Programação Web — Revisado', null, 1, 'review', 'ads-pucpr', '[]'::jsonb),
    (v_group, 'Refiz o projeto — Fundamentos de Programação Web', null, 2, 'optional', 'ads-pucpr', '[]'::jsonb),
    (v_group, 'Interação Humano-Computador — Revisado', null, 3, 'review', 'ads-pucpr', '[]'::jsonb),
    (v_group, 'Refiz o projeto — Interação Humano-Computador', null, 4, 'optional', 'ads-pucpr', '[]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, '🏗️ Projeto do bloco (30%)', 7) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Site multipágina responsivo publicado', '(GitHub Pages) 3+ páginas, layout com flexbox/grid, formulário com validação em JS, mobile-first. Sugestão: seu site pessoal/portfólio — vai servir pra sempre.', 1, 'project', null, '[]'::jsonb);

  -- ===== Bloco 4 — JavaScript de Verdade =====
  select b.id into v_block from blocks b join tracks t on t.id = b.track_id
   where t.slug = 'dev' and b.ordem = 4;
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'A linguagem a fundo', 1) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Tipos e coerção (== vs ===), escopo, arrow functions, destructuring/spread', 'truthy/falsy, null vs undefined; var/let/const e escopo de bloco; a diferença de this na arrow; ler e escrever JS moderno com naturalidade.', 1, 'concept', null, '[{"plataforma":"alura","tipo":"curso","nome":"JavaScript: explorando a linguagem"},{"plataforma":"alura","tipo":"curso","nome":"JavaScript: evoluindo a aplicação com ES6+"},{"plataforma":"puc","tipo":"materia","nome":"Tecnologias para Desenvolvimento Web (parte 1)"}]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Funções avançadas', 2) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Callbacks, higher-order, closures', 'Funções que recebem/retornam funções; explicar closure com um exemplo próprio (contador, cache).', 1, 'concept', null, '[{"plataforma":"alura","tipo":"curso","nome":"JavaScript: explorando a linguagem"},{"plataforma":"puc","tipo":"materia","nome":"Tecnologias para Desenvolvimento Web (parte 1)"}]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Objetos e protótipos', 3) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'this, protótipos, classes ES6', 'this nos 4 contextos; como herança funciona por baixo do capô; sintaxe de classe mapeando da POO do Python.', 1, 'concept', null, '[{"plataforma":"alura","tipo":"curso","nome":"JavaScript: explorando a linguagem"},{"plataforma":"puc","tipo":"materia","nome":"Tecnologias para Desenvolvimento Web (parte 1)"}]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Arrays de verdade', 4) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'map/filter/reduce, find/some/every/sort', 'Transformar dados sem for e encadear operações; escolher o método certo pro problema.', 1, 'concept', null, '[{"plataforma":"alura","tipo":"curso","nome":"JavaScript: métodos de array"},{"plataforma":"puc","tipo":"materia","nome":"Tecnologias para Desenvolvimento Web (parte 1)"}]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Assincronia', 5) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Event loop, promises, async/await, fetch', 'Por que o JS não trava esperando; estados e then/catch; reescrever then-chains com try/catch; consumir APIs com loading e erro tratados e Promise.all.', 1, 'concept', null, '[{"plataforma":"alura","tipo":"curso","nome":"JavaScript: entendendo promises e async/await"},{"plataforma":"alura","tipo":"curso","nome":"JS na web: CRUD com JavaScript assíncrono"},{"plataforma":"puc","tipo":"materia","nome":"Tecnologias para Desenvolvimento Web (parte 1)"}]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Módulos e qualidade', 6) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'import/export, ESLint + Prettier', 'Organizar um projeto em módulos ES; configurar uma vez e nunca mais discutir formatação.', 1, 'concept', null, '[{"plataforma":"alura","tipo":"trilha","nome":"Desenvolvimento Front-end HTML/CSS/JS"},{"plataforma":"puc","tipo":"materia","nome":"Tecnologias para Desenvolvimento Web (parte 1)"}]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Matérias da faculdade', 7) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Tecnologias para Desenvolvimento Web (parte 1) — Revisado', null, 1, 'review', 'ads-pucpr', '[]'::jsonb),
    (v_group, 'Refiz o projeto — Tecnologias Web (parte 1)', null, 2, 'optional', 'ads-pucpr', '[]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, '🏗️ Projeto do bloco (30%)', 8) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'SPA em JavaScript puro', 'Consumindo API pública: busca/filtro, estados de loading e erro, código em módulos, deploy (GitHub Pages/Netlify). Sem framework — a dor deste projeto é o que fará o React fazer sentido.', 1, 'project', null, '[]'::jsonb);

  -- ===== Bloco 5 — Back-end com Node + Banco de Dados =====
  select b.id into v_block from blocks b join tracks t on t.id = b.track_id
   where t.slug = 'dev' and b.ordem = 5;
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Node.js', 1) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Runtime, npm, assincronia no servidor', 'O que é o Node, package.json, scripts e node_modules; por que o modelo do Node escala.', 1, 'concept', null, '[{"plataforma":"alura","tipo":"curso","nome":"Node.js: crie sua primeira API com Express"},{"plataforma":"puc","tipo":"materia","nome":"Tecnologias para Desenvolvimento Web (parte 2)"}]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Express e APIs REST', 2) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Rotas e verbos, middlewares, status codes/erros, validação', 'Desenhar uma API REST semântica; entender a cadeia e criar um middleware próprio; responder certo (201/400/401/404/500) com handler central; nunca confiar no cliente.', 1, 'concept', null, '[{"plataforma":"alura","tipo":"curso","nome":"Node.js: crie sua primeira API com Express"},{"plataforma":"alura","tipo":"curso","nome":"Node.js: buscas, filtros e paginação"},{"plataforma":"puc","tipo":"materia","nome":"Tecnologias para Desenvolvimento Web (parte 2)"}]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'PostgreSQL e SQL', 3) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Modelagem (PK/FK, 1-N, N-N), CRUD, JOINs, agregações, índices/transações', 'Tabelas e relacionamentos; INSERT/SELECT/UPDATE/DELETE com WHERE e ORDER BY; INNER vs LEFT; GROUP BY com COUNT/SUM/AVG; intuição de performance e ACID em uma frase.', 1, 'concept', null, '[{"plataforma":"alura","tipo":"trilha","nome":"SQL com PostgreSQL"},{"plataforma":"puc","tipo":"materia","nome":"Banco de Dados para TI"}]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Integrando app e banco', 4) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Conexão Node ↔ Postgres (pg/Prisma), variáveis de ambiente (.env)', 'Driver pg ou ORM leve e os prós e contras; segredos fora do código com .env.example versionado.', 1, 'concept', null, '[{"plataforma":"alura","tipo":"trilha","nome":"APIs com Node.js e Express"},{"plataforma":"puc","tipo":"materia","nome":"Banco de Dados para TI"}]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Autenticação e segurança', 5) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Hash de senha (bcrypt), JWT vs sessão, OWASP, HTTPS/CORS', 'Por que nunca guardar senha em texto; como funciona um token, expiração e refresh; reconhecer e prevenir SQL injection, XSS e auth quebrada; por que o navegador reclama.', 1, 'concept', null, '[{"plataforma":"alura","tipo":"trilha","nome":"APIs com Node.js e Express"},{"plataforma":"alura","tipo":"curso","nome":"DevOps: tráfego seguro em comunicações web"},{"plataforma":"puc","tipo":"materia","nome":"Sistemas Web Seguros"},{"plataforma":"puc","tipo":"materia","nome":"Segurança da Tecnologia da Informação"}]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Matérias da faculdade', 6) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Banco de Dados para TI — Revisado', null, 1, 'review', 'ads-pucpr', '[]'::jsonb),
    (v_group, 'Refiz o projeto — Banco de Dados para TI', null, 2, 'optional', 'ads-pucpr', '[]'::jsonb),
    (v_group, 'Sistemas Web Seguros — Revisado', null, 3, 'review', 'ads-pucpr', '[]'::jsonb),
    (v_group, 'Refiz o projeto — Sistemas Web Seguros', null, 4, 'optional', 'ads-pucpr', '[]'::jsonb),
    (v_group, 'Segurança da Tecnologia da Informação — Revisado', null, 5, 'review', 'ads-pucpr', '[]'::jsonb),
    (v_group, 'Refiz o projeto — Segurança da TI', null, 6, 'optional', 'ads-pucpr', '[]'::jsonb),
    (v_group, 'Tecnologias para Desenvolvimento Web (parte 2) — Revisado', null, 7, 'review', 'ads-pucpr', '[]'::jsonb),
    (v_group, 'Refiz o projeto — Tecnologias Web (parte 2)', null, 8, 'optional', 'ads-pucpr', '[]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, '🏗️ Projeto do bloco (30%)', 7) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'API REST completa em produção', 'Autenticação (registro/login com JWT), CRUD de um recurso real, PostgreSQL, validação, tratamento de erros, deploy (Railway/Render), documentação das rotas no README.', 1, 'project', null, '[]'::jsonb);

  -- ===== Bloco 6 — TypeScript + React =====
  select b.id into v_block from blocks b join tracks t on t.id = b.track_id
   where t.slug = 'dev' and b.ordem = 6;
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'TypeScript', 1) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Tipos, interfaces, unions/narrowing, generics, tsconfig', 'Anotar variáveis, parâmetros e retornos; modelar objetos e respostas de API; string | null e como o TS te protege; ler e usar Array<T>/Promise<T>; entender strict e a compilação.', 1, 'concept', null, '[{"plataforma":"alura","tipo":"curso","nome":"TypeScript parte 1: evoluindo seu JavaScript"},{"plataforma":"alura","tipo":"curso","nome":"TypeScript parte 2: avançando na linguagem"},{"plataforma":"alura","tipo":"curso","nome":"React: migrando para TypeScript"}]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'React', 2) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Componentes/JSX, estado, efeitos, listas/formulários, API, roteamento, context', 'Pensar em componentes e props; useState e lifting state up; useEffect sem tiro no pé; keys e inputs controlados; fetch com loading/erro; navegação e parâmetros; context quando o prop drilling doeu.', 1, 'concept', null, '[{"plataforma":"alura","tipo":"trilha","nome":"React com JavaScript"},{"plataforma":"alura","tipo":"trilha","nome":"Full Stack: React com Node.js"}]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Ecossistema e deploy', 3) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Vite/Next, deploy na Vercel', 'Criar projeto moderno e entender o que o framework resolve; conectar repo, preview deployments e variáveis de ambiente.', 1, 'concept', null, '[{"plataforma":"alura","tipo":"trilha","nome":"React com JavaScript"}]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, '🏗️ Projeto do bloco (30%)', 4) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Front-end React + TS consumindo a API do Bloco 5', 'Deploy na Vercel. Alternativa oficial: refatorar/estender o Painel de Estudos (este app!) — adicionar uma feature inteira com as próprias mãos. É aqui que ele vira projeto de portfólio legítimo.', 1, 'project', null, '[]'::jsonb);

  -- ===== Bloco 7 — Engenharia de Software, DevOps e Mobile =====
  select b.id into v_block from blocks b join tracks t on t.id = b.track_id
   where t.slug = 'dev' and b.ordem = 7;
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Engenharia de software', 1) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Ciclo de vida, requisitos (user stories), especificação e modelagem', 'Da ideia ao deploy, cascata vs iterativo; funcionais vs não-funcionais e user stories com critérios de aceite; caso de uso e diagrama de classes em nível de leitura.', 1, 'concept', null, '[{"plataforma":"puc","tipo":"materia","nome":"Fundamentos de Engenharia de Software"},{"plataforma":"puc","tipo":"materia","nome":"Especificação de Sistemas de Informação"},{"plataforma":"puc","tipo":"materia","nome":"Projeto de Sistemas de Informação"}]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Métodos ágeis e gestão', 2) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Scrum e Kanban', 'Papéis, cerimônias e artefatos; o que é (e o que não é) ágil; fluxo, WIP limitado e montar um board de verdade.', 1, 'concept', null, '[{"plataforma":"alura","tipo":"curso","nome":"Scrum: agilidade em seu projeto"},{"plataforma":"alura","tipo":"trilha","nome":"Gestão Ágil de Projetos"},{"plataforma":"puc","tipo":"materia","nome":"Métodos Ágeis em TI"}]'::jsonb),
    (v_group, 'Gestão de projetos', 'Escopo/prazo/custo e riscos (noção aplicada).', 2, 'concept', null, '[{"plataforma":"alura","tipo":"trilha","nome":"Gestão Ágil de Projetos"},{"plataforma":"puc","tipo":"materia","nome":"Gestão de Projetos em Computação"}]'::jsonb),
    (v_group, 'Gestão de serviços (ITIL)', 'Visão geral: incidente vs problema, SLA.', 3, 'concept', null, '[{"plataforma":"puc","tipo":"materia","nome":"Gestão de Serviços de TI"}]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'DevOps e Cloud', 3) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Docker, CI/CD (GitHub Actions), Linux', 'Imagem vs container, Dockerfile e compose; pipeline com lint + testes a cada push; o básico de Linux que todo deploy cobra.', 1, 'concept', null, '[{"plataforma":"alura","tipo":"trilha","nome":"Começando em DevOps"},{"plataforma":"puc","tipo":"materia","nome":"DevOps"}]'::jsonb),
    (v_group, 'Cloud (IaaS/PaaS/SaaS)', 'Onde Vercel, Railway e AWS se encaixam.', 2, 'concept', null, '[{"plataforma":"alura","tipo":"curso","nome":"Cloud: introdução"},{"plataforma":"puc","tipo":"materia","nome":"Cloud Computing"}]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Mobile', 4) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Nativo vs híbrido, React Native primeiro contato', 'Trade-offs e onde React Native e Flutter entram; criar um app simples (Expo) com componentes básicos e navegação.', 1, 'concept', null, '[{"plataforma":"alura","tipo":"trilha","nome":"Desenvolva seu primeiro app com React Native"},{"plataforma":"puc","tipo":"materia","nome":"Desenvolvimento para Dispositivos Móveis"}]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, 'Matérias da faculdade', 5) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'Fundamentos de Engenharia de Software — Revisado', null, 1, 'review', 'ads-pucpr', '[]'::jsonb),
    (v_group, 'Refiz o projeto — Engenharia de Software', null, 2, 'optional', 'ads-pucpr', '[]'::jsonb),
    (v_group, 'Métodos Ágeis em TI — Revisado', null, 3, 'review', 'ads-pucpr', '[]'::jsonb),
    (v_group, 'Refiz o projeto — Métodos Ágeis em TI', null, 4, 'optional', 'ads-pucpr', '[]'::jsonb),
    (v_group, 'Especificação de Sistemas de Informação — Revisado', null, 5, 'review', 'ads-pucpr', '[]'::jsonb),
    (v_group, 'Refiz o projeto — Especificação de SI', null, 6, 'optional', 'ads-pucpr', '[]'::jsonb),
    (v_group, 'Projeto de Sistemas de Informação — Revisado', null, 7, 'review', 'ads-pucpr', '[]'::jsonb),
    (v_group, 'Refiz o projeto — Projeto de SI', null, 8, 'optional', 'ads-pucpr', '[]'::jsonb),
    (v_group, 'Gestão de Projetos em Computação — Revisado', null, 9, 'review', 'ads-pucpr', '[]'::jsonb),
    (v_group, 'Refiz o projeto — Gestão de Projetos', null, 10, 'optional', 'ads-pucpr', '[]'::jsonb),
    (v_group, 'Gestão de Serviços de TI — Revisado', null, 11, 'review', 'ads-pucpr', '[]'::jsonb),
    (v_group, 'Refiz o projeto — Gestão de Serviços de TI', null, 12, 'optional', 'ads-pucpr', '[]'::jsonb),
    (v_group, 'DevOps — Revisado', null, 13, 'review', 'ads-pucpr', '[]'::jsonb),
    (v_group, 'Refiz o projeto — DevOps', null, 14, 'optional', 'ads-pucpr', '[]'::jsonb),
    (v_group, 'Cloud Computing — Revisado', null, 15, 'review', 'ads-pucpr', '[]'::jsonb),
    (v_group, 'Refiz o projeto — Cloud Computing', null, 16, 'optional', 'ads-pucpr', '[]'::jsonb),
    (v_group, 'Desenvolvimento para Dispositivos Móveis — Revisado', null, 17, 'review', 'ads-pucpr', '[]'::jsonb),
    (v_group, 'Refiz o projeto — Dispositivos Móveis', null, 18, 'optional', 'ads-pucpr', '[]'::jsonb);
  insert into item_groups (block_id, titulo, ordem)
   values (v_block, '🏗️ Projeto do bloco (30%) — projeto-síntese', 6) returning id into v_group;
  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar) values
    (v_group, 'App full stack com processo completo', 'Requisitos documentados (user stories), Kanban, branches + pull requests, Docker, CI no GitHub Actions, deploy. Sugestões: v2 do Painel de Estudos, ou uma automação do BPO com interface web (conecta com a trilha de IA).', 1, 'project', null, '[]'::jsonb);
end $$;

-- Confira:
--   select count(*) from items i join item_groups g on g.id=i.group_id
--     join blocks b on b.id=g.block_id join tracks t on t.id=b.track_id
--    where t.slug='dev';   -- esperado: 102
