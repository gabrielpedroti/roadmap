-- =============================================================
-- v1.13 — camada de prática na trilha Dev (HackerRank + prática com IA)
-- Como aplicar: Supabase Dashboard → SQL Editor → colar tudo → Run
--
-- ATENÇÃO, ORDEM: rode SÓ DEPOIS que o deploy com a plataforma "hackerrank" estiver
-- no ar. Os chips novos usam essa plataforma; o código antigo não a conhece
-- e a página da trilha quebraria (foi o que aconteceu com a "fiap" em ago/2026).
--
-- O QUE FAZ: em cada bloco da Dev, cria o grupo "Prática e certificações"
-- logo depois do último grupo de conceito, e acrescenta 1 item opcional no
-- fim do grupo "Git e GitHub" do Bloco 1. Só INSERE — nada existente muda,
-- os user_checks ficam intactos.
--
-- ARQUIVO GERADO a partir de supabase/seed/trilha-dev.ts — não editar à mão.
-- Idempotente: bloco que já tem o grupo é pulado; âncora ausente = aviso e
-- nada é feito naquele bloco.
-- =============================================================

-- -------------------------------------------------------------
-- Bloco 1: 6 itens, depois de "Matemática aplicada"
-- -------------------------------------------------------------
do $$
declare
  v_block uuid;
  v_group uuid;
  v_ordem int;
begin
  select b.id into v_block
  from blocks b join tracks t on t.id = b.track_id
  where t.slug = 'dev' and b.ordem = 1;

  if v_block is null then
    raise notice 'Bloco 1 da Dev não encontrado — nada feito.';
    return;
  end if;

  if exists (select 1 from item_groups where block_id = v_block and titulo = $txt$Prática e certificações$txt$) then
    raise notice 'Bloco 1: grupo já existe — pulando.';
    return;
  end if;

  select ordem + 1 into v_ordem
  from item_groups where block_id = v_block and titulo = $txt$Matemática aplicada$txt$;

  if v_ordem is null then
    raise notice 'Bloco 1: grupo âncora "Matemática aplicada" não existe — nada feito.';
    return;
  end if;

  update item_groups set ordem = ordem + 1
  where block_id = v_block and ordem >= v_ordem;

  insert into item_groups (block_id, titulo, ordem)
  values (v_block, $txt$Prática e certificações$txt$, v_ordem)
  returning id into v_group;

  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar)
  values
      (v_group, $txt$Prática HackerRank — Python Development (94 exercícios)$txt$,
       $txt$Fazer após fechar o Nano PYTHON DEVELOPMENT (FIAP), refazendo do zero inclusive os já resolvidos. No HackerRank › Python: Introduction (7), Basic Data Types (6), Strings — os 12 Easy, Sets (13), Math — Mod Divmod, Power - Mod Power, Integers Come In All Sizes, Triangle Quest, Triangle Quest 2, Built-Ins (6), Python Functionals (3), Errors and Exceptions — Exceptions, Debugging (2). No HackerRank › Algorithms, em Python: Warmup (10) e Implementation Easy — os 25 primeiros (Grading Students até Sequence Equation). Data Structures › Arrays — os 4 Easy. Critério: faixa completa + fluência (3 problemas do tema em menos de 20 min cada, sem consultar nada).$txt$,
       1, 'concept', null, $json$[{"plataforma":"hackerrank","tipo":"curso","nome":"Python, Algorithms, Data Structures"}]$json$::jsonb),
      (v_group, $txt$Certificação HackerRank — Problem Solving (Basic)$txt$,
       $txt$Prova gratuita, 90 min, 2 questões (arrays e strings), em Python. Fazer logo após o item anterior, antes dos próximos cursos. Retake é livre: reprovar vira diagnóstico, não derrota. Publicar o certificado no LinkedIn.$txt$,
       2, 'concept', null, $json$[{"plataforma":"hackerrank","tipo":"curso","nome":"Certificação"}]$json$::jsonb),
      (v_group, $txt$Prática HackerRank — Strings e Regex (36 exercícios)$txt$,
       $txt$Fazer após o curso Alura “Praticando Python: Strings e Regex”. HackerRank › Python: Regex and Parsing — os 12 Easy/Medium (Detect Floating Point Number até Validating Credit Card Numbers; pular Validating Postal Codes e Matrix Script), Errors — Incorrect Regex, Strings — The Minion Game e Merge the Tools!. HackerRank › Algorithms › Strings Easy (21), em Python. Critério: faixa completa + fluência.$txt$,
       3, 'concept', null, $json$[{"plataforma":"hackerrank","tipo":"curso","nome":"Python, Algorithms"}]$json$::jsonb),
      (v_group, $txt$Prática HackerRank — lógica e coleções (55 exercícios)$txt$,
       $txt$Fazer após a trilha Alura “Praticando Python”. HackerRank › Algorithms, em Python: Implementation Easy — do 26º ao 49º (Jumping on the Clouds: Revisited até Strange Counter) e Greedy Easy (12). Interview Preparation Kit: Warm-up (4), Arrays (5), Dictionaries and Hashmaps (5), String Manipulation (5). Critério: faixa completa + fluência.$txt$,
       4, 'concept', null, $json$[{"plataforma":"hackerrank","tipo":"curso","nome":"Algorithms, Interview Preparation Kit"}]$json$::jsonb),
      (v_group, $txt$Prática HackerRank — módulos e arquivos (20 exercícios)$txt$,
       $txt$Fazer após o curso Alura “Python: avance na OO e consuma API”. HackerRank › Python: Date and Time (2), Collections (8), Itertools — os 6 Easy/Medium (pular Maximize It!), Math — Polar Coordinates e Find Angle MBC, XML (2). Critério: faixa completa.$txt$,
       5, 'concept', null, $json$[{"plataforma":"hackerrank","tipo":"curso","nome":"Python"}]$json$::jsonb),
      (v_group, $txt$Matemática aplicada — Databases › Basics of Sets and Relations #1 a #7$txt$,
       $txt$Questões curtas de lógica de conjuntos no HackerRank › Databases. Revisão leve da matéria Matemática Aplicada à Computação. Não conta no progresso.$txt$,
       6, 'optional', null, $json$[{"plataforma":"hackerrank","tipo":"curso","nome":"Databases"}]$json$::jsonb);
end $$;

-- -------------------------------------------------------------
-- Bloco 2: 8 itens, depois de "IoT"
-- -------------------------------------------------------------
do $$
declare
  v_block uuid;
  v_group uuid;
  v_ordem int;
begin
  select b.id into v_block
  from blocks b join tracks t on t.id = b.track_id
  where t.slug = 'dev' and b.ordem = 2;

  if v_block is null then
    raise notice 'Bloco 2 da Dev não encontrado — nada feito.';
    return;
  end if;

  if exists (select 1 from item_groups where block_id = v_block and titulo = $txt$Prática e certificações$txt$) then
    raise notice 'Bloco 2: grupo já existe — pulando.';
    return;
  end if;

  select ordem + 1 into v_ordem
  from item_groups where block_id = v_block and titulo = $txt$IoT$txt$;

  if v_ordem is null then
    raise notice 'Bloco 2: grupo âncora "IoT" não existe — nada feito.';
    return;
  end if;

  update item_groups set ordem = ordem + 1
  where block_id = v_block and ordem >= v_ordem;

  insert into item_groups (block_id, titulo, ordem)
  values (v_block, $txt$Prática e certificações$txt$, v_ordem)
  returning id into v_group;

  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar)
  values
      (v_group, $txt$Prática HackerRank — POO (2 exercícios)$txt$,
       $txt$Fazer após o curso Alura “Python: aplicando a Orientação a Objetos”. HackerRank › Python › Classes: Classes: Dealing with Complex Numbers (métodos especiais __add__, __str__…) e Class 2 - Find the Torsional Angle. Critério: explicar em voz alta por que cada método especial existe.$txt$,
       1, 'concept', null, $json$[{"plataforma":"hackerrank","tipo":"curso","nome":"Python"}]$json$::jsonb),
      (v_group, $txt$Prática HackerRank — pilhas, filas e listas ligadas (~38 exercícios)$txt$,
       $txt$Fazer após o curso Alura “Estrutura de dados: pilhas, filas e listas com Python”. HackerRank › Data Structures: Linked Lists (15), Stacks — Maximum Element, Equal Stacks, Balanced Brackets, Game of Two Stacks, Largest Rectangle, Simple Text Editor, Waiter; Queues — Queue using Two Stacks, Down to Zero II; Arrays — Sparse Arrays. Interview Preparation Kit: Stacks and Queues (6), Linked Lists (5). Critério: faixa completa + fluência nos Easy.$txt$,
       2, 'concept', null, $json$[{"plataforma":"hackerrank","tipo":"curso","nome":"Data Structures, Interview Preparation Kit"}]$json$::jsonb),
      (v_group, $txt$Prática HackerRank — Algoritmos I: ordenação (10 exercícios)$txt$,
       $txt$Fazer após o curso Alura “Algoritmos I: Selection, Insertion”. HackerRank › Algorithms › Sorting: Intro to Tutorial Challenges, Insertion Sort - Part 1, Insertion Sort - Part 2, Correctness and the Loop Invariant, Running Time of Algorithms, Counting Sort 1, Counting Sort 2, Big Sorting, Closest Numbers, Find the Median. Critério: faixa completa.$txt$,
       3, 'concept', null, $json$[{"plataforma":"hackerrank","tipo":"curso","nome":"Algorithms"}]$json$::jsonb),
      (v_group, $txt$Prática HackerRank — Algoritmos II: busca e ordenação (23 exercícios)$txt$,
       $txt$Fazer após o curso Alura “Algoritmos II: MergeSort, QuickSort, Busca Binária”. HackerRank › Algorithms: Sorting — Quicksort 1 - Partition e The Full Counting Sort; Search Easy — Ice Cream Parlor, Missing Numbers, Sherlock and Array. Interview Preparation Kit: Sorting (5), Search (7), Greedy Algorithms (5). Critério: faixa completa + explicar Big-O de cada solução.$txt$,
       4, 'concept', null, $json$[{"plataforma":"hackerrank","tipo":"curso","nome":"Algorithms, Interview Preparation Kit"}]$json$::jsonb),
      (v_group, $txt$pytest nas próprias soluções$txt$,
       $txt$Após o curso Alura “Python: testes automatizados”, escrever testes pytest para 10 soluções suas do Interview Preparation Kit (casos de borda: vazio, zero, negativo, formato errado). Teste de verdade em código seu.$txt$,
       5, 'optional', null, $json$[]$json$::jsonb),
      (v_group, $txt$Árvores e heap (HackerRank, 10) — além do roadmap$txt$,
       $txt$Data Structures › Trees Easy (8) e Heap — QHEAP1, Jesse and Cookies. * Não está no plano de estudo; faça se sobrar fôlego. Closures and Decorators (Python, 2) idem — o conceito volta em JS no Bloco 4.$txt$,
       6, 'optional', null, $json$[{"plataforma":"hackerrank","tipo":"curso","nome":"Data Structures, Python"}]$json$::jsonb),
      (v_group, $txt$Certificação HackerRank — Problem Solving (Intermediate)$txt$,
       $txt$Prova gratuita, 90 min, em Python. Fazer após os itens de prática deste bloco. Publicar no LinkedIn.$txt$,
       7, 'concept', null, $json$[{"plataforma":"hackerrank","tipo":"curso","nome":"Certificação"}]$json$::jsonb),
      (v_group, $txt$Certificação HackerRank — Software Engineer Intern (role)$txt$,
       $txt$Certificação de papel (problem solving + estruturas de dados). Fazer após a anterior. Publicar no LinkedIn.$txt$,
       8, 'concept', null, $json$[{"plataforma":"hackerrank","tipo":"curso","nome":"Certificação"}]$json$::jsonb);
end $$;

-- -------------------------------------------------------------
-- Bloco 3: 4 itens, depois de "UX / IHC"
-- -------------------------------------------------------------
do $$
declare
  v_block uuid;
  v_group uuid;
  v_ordem int;
begin
  select b.id into v_block
  from blocks b join tracks t on t.id = b.track_id
  where t.slug = 'dev' and b.ordem = 3;

  if v_block is null then
    raise notice 'Bloco 3 da Dev não encontrado — nada feito.';
    return;
  end if;

  if exists (select 1 from item_groups where block_id = v_block and titulo = $txt$Prática e certificações$txt$) then
    raise notice 'Bloco 3: grupo já existe — pulando.';
    return;
  end if;

  select ordem + 1 into v_ordem
  from item_groups where block_id = v_block and titulo = $txt$UX / IHC$txt$;

  if v_ordem is null then
    raise notice 'Bloco 3: grupo âncora "UX / IHC" não existe — nada feito.';
    return;
  end if;

  update item_groups set ordem = ordem + 1
  where block_id = v_block and ordem >= v_ordem;

  insert into item_groups (block_id, titulo, ordem)
  values (v_block, $txt$Prática e certificações$txt$, v_ordem)
  returning id into v_group;

  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar)
  values
      (v_group, $txt$HTML por dentro (HackerRank, 3)$txt$,
       $txt$HackerRank › Python › Regex and Parsing: HTML Parser - Part 1, HTML Parser - Part 2, Detect HTML Tags, Attributes and Attribute Values — em Python. Serve para enxergar a estrutura do HTML como dado.$txt$,
       1, 'optional', null, $json$[{"plataforma":"hackerrank","tipo":"curso","nome":"Python"}]$json$::jsonb),
      (v_group, $txt$Certificação HackerRank — CSS (Basic)$txt$,
       $txt$Prova gratuita. Fazer após a trilha Alura “HTML e CSS para projetos web”. Publicar no LinkedIn.$txt$,
       2, 'concept', null, $json$[{"plataforma":"hackerrank","tipo":"curso","nome":"Certificação"}]$json$::jsonb),
      (v_group, $txt$Prática (gerar com IA) — sintaxe JavaScript básica$txt$,
       $txt$Após o curso Alura “JavaScript: construindo páginas dinâmicas”, pedir a uma IA 10 exercícios de lógica que você já resolveu em Python (contagem de vogais, inversão, soma de array, FizzBuzz etc.) para reescrever em JavaScript usando let/const, template strings, arrow functions e split/join. Sem consultar nada. Critério: 8 de 10 corretos de primeira.$txt$,
       3, 'optional', null, $json$[]$json$::jsonb),
      (v_group, $txt$Prática (gerar com IA) — DOM e eventos$txt$,
       $txt$Pedir a uma IA 5 mini-tarefas numa página estática: renderizar uma lista a partir de um array, formulário com validação e preventDefault, toggle de classe no clique, contador com input, filtro de lista ao digitar. Só MDN como consulta. Critério: as 5 funcionando sem copiar código.$txt$,
       4, 'optional', null, $json$[]$json$::jsonb);
end $$;

-- -------------------------------------------------------------
-- Bloco 4: 6 itens, depois de "Módulos e qualidade"
-- -------------------------------------------------------------
do $$
declare
  v_block uuid;
  v_group uuid;
  v_ordem int;
begin
  select b.id into v_block
  from blocks b join tracks t on t.id = b.track_id
  where t.slug = 'dev' and b.ordem = 4;

  if v_block is null then
    raise notice 'Bloco 4 da Dev não encontrado — nada feito.';
    return;
  end if;

  if exists (select 1 from item_groups where block_id = v_block and titulo = $txt$Prática e certificações$txt$) then
    raise notice 'Bloco 4: grupo já existe — pulando.';
    return;
  end if;

  select ordem + 1 into v_ordem
  from item_groups where block_id = v_block and titulo = $txt$Módulos e qualidade$txt$;

  if v_ordem is null then
    raise notice 'Bloco 4: grupo âncora "Módulos e qualidade" não existe — nada feito.';
    return;
  end if;

  update item_groups set ordem = ordem + 1
  where block_id = v_block and ordem >= v_ordem;

  insert into item_groups (block_id, titulo, ordem)
  values (v_block, $txt$Prática e certificações$txt$, v_ordem)
  returning id into v_group;

  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar)
  values
      (v_group, $txt$Prática (gerar com IA) — strings em JavaScript$txt$,
       $txt$Após o curso Alura “JavaScript: explorando a linguagem”, pedir a uma IA 10 problemas de manipulação de string (palíndromo, anagrama, contagem de caracteres, capitalize, caesar cipher, camelCase) para resolver só com a API de String e Array do JS (slice, split, join, charCodeAt, includes). Critério: 8 de 10 sem consultar.$txt$,
       1, 'optional', null, $json$[]$json$::jsonb),
      (v_group, $txt$Certificação HackerRank — JavaScript (Basic)$txt$,
       $txt$Prova gratuita, 90 min, 2 questões (hoisting, escopo, sintaxe). Fazer após o curso “JavaScript: explorando a linguagem”. Retake livre. Publicar no LinkedIn.$txt$,
       2, 'concept', null, $json$[{"plataforma":"hackerrank","tipo":"curso","nome":"Certificação"}]$json$::jsonb),
      (v_group, $txt$Prática (gerar com IA) — ES6+$txt$,
       $txt$Após o curso Alura “JavaScript: evoluindo a aplicação com ES6+”, pedir a uma IA 10 exercícios que exijam destructuring, spread/rest, arrow functions, template literals, classes ES6 e módulos import/export. Critério: 8 de 10 sem consultar.$txt$,
       3, 'optional', null, $json$[]$json$::jsonb),
      (v_group, $txt$Prática (gerar com IA) — métodos de array sem for$txt$,
       $txt$Após o curso Alura “JavaScript: métodos de array”, pedir a uma IA 10 problemas de transformação de dados (somar, filtrar, agrupar, ordenar objetos, achar máximo, verificar condição) para resolver SÓ com map/filter/reduce/find/some/every/sort — proibido for e while. Critério: 8 de 10 sem consultar, e explicar o que reduce está acumulando em cada um.$txt$,
       4, 'optional', null, $json$[]$json$::jsonb),
      (v_group, $txt$Prática (gerar com IA) — assincronia$txt$,
       $txt$Após os cursos Alura “promises e async/await” e “JS na web: CRUD assíncrono”, pedir a uma IA 5 exercícios com Promise, async/await e fetch numa API pública (loading, erro, Promise.all, retry simples, cancelamento com AbortController). Critério: os 5 funcionando e explicar em voz alta o que o event loop faz em cada um.$txt$,
       5, 'optional', null, $json$[]$json$::jsonb),
      (v_group, $txt$Certificação HackerRank — JavaScript (Intermediate)$txt$,
       $txt$Prova gratuita, 90 min (closures, prototypes, async, ES6 — a ementa deste bloco). Fazer ao fechar o bloco, antes do projeto ou junto. Publicar no LinkedIn.$txt$,
       6, 'concept', null, $json$[{"plataforma":"hackerrank","tipo":"curso","nome":"Certificação"}]$json$::jsonb);
end $$;

-- -------------------------------------------------------------
-- Bloco 5: 11 itens, depois de "Autenticação e segurança"
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
    raise notice 'Bloco 5 da Dev não encontrado — nada feito.';
    return;
  end if;

  if exists (select 1 from item_groups where block_id = v_block and titulo = $txt$Prática e certificações$txt$) then
    raise notice 'Bloco 5: grupo já existe — pulando.';
    return;
  end if;

  select ordem + 1 into v_ordem
  from item_groups where block_id = v_block and titulo = $txt$Autenticação e segurança$txt$;

  if v_ordem is null then
    raise notice 'Bloco 5: grupo âncora "Autenticação e segurança" não existe — nada feito.';
    return;
  end if;

  update item_groups set ordem = ordem + 1
  where block_id = v_block and ordem >= v_ordem;

  insert into item_groups (block_id, titulo, ordem)
  values (v_block, $txt$Prática e certificações$txt$, v_ordem)
  returning id into v_group;

  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar)
  values
      (v_group, $txt$Prática (gerar com IA) — Express$txt$,
       $txt$Após os cursos Alura de Node.js/Express, pedir a uma IA 5 endpoints para implementar num recurso simples (listar com paginação, buscar por id, criar com validação, atualizar, deletar), cada um com status code correto (200/201/400/404) e handler central de erro, com testes Jest cobrindo sucesso e erro. Critério: todos os testes verdes sem consultar o curso.$txt$,
       1, 'optional', null, $json$[]$json$::jsonb),
      (v_group, $txt$Certificação HackerRank — Node (Basic)$txt$,
       $txt$Prova gratuita. Fazer após os cursos de Node.js/Express. Publicar no LinkedIn.$txt$,
       2, 'concept', null, $json$[{"plataforma":"hackerrank","tipo":"curso","nome":"Certificação"}]$json$::jsonb),
      (v_group, $txt$Certificação HackerRank — Node.js (Intermediate)$txt$,
       $txt$Prova gratuita. Fazer após a anterior e o curso “testando API's REST”. Publicar no LinkedIn.$txt$,
       3, 'concept', null, $json$[{"plataforma":"hackerrank","tipo":"curso","nome":"Certificação"}]$json$::jsonb),
      (v_group, $txt$Prática HackerRank — SQL básico e agregação (37 exercícios)$txt$,
       $txt$Fazer durante/após a trilha Alura “SQL com PostgreSQL”. HackerRank › SQL: Basic Select (20) e Aggregation (17). Critério: faixa completa + fluência.$txt$,
       4, 'concept', null, $json$[{"plataforma":"hackerrank","tipo":"curso","nome":"SQL"}]$json$::jsonb),
      (v_group, $txt$Certificação HackerRank — SQL (Basic)$txt$,
       $txt$Prova gratuita. Fazer após o item anterior. Publicar no LinkedIn.$txt$,
       5, 'concept', null, $json$[{"plataforma":"hackerrank","tipo":"curso","nome":"Certificação"}]$json$::jsonb),
      (v_group, $txt$Prática HackerRank — JOINs e select avançado (13 exercícios)$txt$,
       $txt$HackerRank › SQL: Basic Join (8) e Advanced Select (5). Critério: faixa completa + explicar a diferença INNER/LEFT em voz alta com um exemplo seu.$txt$,
       6, 'concept', null, $json$[{"plataforma":"hackerrank","tipo":"curso","nome":"SQL"}]$json$::jsonb),
      (v_group, $txt$Certificação HackerRank — SQL (Intermediate)$txt$,
       $txt$Prova gratuita. Fazer após o item anterior. Publicar no LinkedIn.$txt$,
       7, 'concept', null, $json$[{"plataforma":"hackerrank","tipo":"curso","nome":"Certificação"}]$json$::jsonb),
      (v_group, $txt$Databases (múltipla escolha) — revisão da matéria Banco de Dados$txt$,
       $txt$HackerRank › Databases: subdomínios Relational Algebra, Indexes, Database Normalization, OLAP. Questões curtas; usar como revisão dirigida da matéria “Banco de Dados para TI”. O subdomínio NoSQL - XML, MapReduce cobre a noção do item opcional de MongoDB.$txt$,
       8, 'optional', null, $json$[{"plataforma":"hackerrank","tipo":"curso","nome":"Databases"}]$json$::jsonb),
      (v_group, $txt$SQL avançado (HackerRank, 8) — além do roadmap$txt$,
       $txt$SQL › Advanced Join (5) e Alternative Queries (3) → prepara SQL (Advanced). Fora do escopo atual; faça se quiser.$txt$,
       9, 'optional', null, $json$[{"plataforma":"hackerrank","tipo":"curso","nome":"SQL"}]$json$::jsonb),
      (v_group, $txt$Certificação HackerRank — Rest API (Intermediate)$txt$,
       $txt$Prova gratuita. Fazer após a trilha Alura “APIs com Node.js e Express”. Publicar no LinkedIn.$txt$,
       10, 'concept', null, $json$[{"plataforma":"hackerrank","tipo":"curso","nome":"Certificação"}]$json$::jsonb),
      (v_group, $txt$Certificação HackerRank — Software Engineer (role)$txt$,
       $txt$Certificação de papel (estruturas de dados + SQL + REST API). Fazer ao fechar o bloco. Publicar no LinkedIn.$txt$,
       11, 'concept', null, $json$[{"plataforma":"hackerrank","tipo":"curso","nome":"Certificação"}]$json$::jsonb);
end $$;

-- -------------------------------------------------------------
-- Bloco 6: 4 itens, depois de "Ecossistema e deploy"
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
    raise notice 'Bloco 6 da Dev não encontrado — nada feito.';
    return;
  end if;

  if exists (select 1 from item_groups where block_id = v_block and titulo = $txt$Prática e certificações$txt$) then
    raise notice 'Bloco 6: grupo já existe — pulando.';
    return;
  end if;

  select ordem + 1 into v_ordem
  from item_groups where block_id = v_block and titulo = $txt$Ecossistema e deploy$txt$;

  if v_ordem is null then
    raise notice 'Bloco 6: grupo âncora "Ecossistema e deploy" não existe — nada feito.';
    return;
  end if;

  update item_groups set ordem = ordem + 1
  where block_id = v_block and ordem >= v_ordem;

  insert into item_groups (block_id, titulo, ordem)
  values (v_block, $txt$Prática e certificações$txt$, v_ordem)
  returning id into v_group;

  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar)
  values
      (v_group, $txt$Prática (gerar com IA) — TypeScript$txt$,
       $txt$Após os cursos Alura de TypeScript, pegar 10 problemas que você já resolveu em JS (ou pedir 10 novos a uma IA) e reescrever em TypeScript com tipos explícitos, interfaces para os dados, uma union com narrowing e um generic. Critério: compila em strict com zero any.$txt$,
       1, 'optional', null, $json$[]$json$::jsonb),
      (v_group, $txt$Prática HackerRank — React (10 desafios)$txt$,
       $txt$Fazer após as trilhas Alura de React. HackerRank › React: Item List Manager, Contact Form (Basic); Patient Medical Records, Blog Post, Slideshow, CryptoRank Exchange (Intermediate); Code Review Feedback, Employee Validation, Article Sorting, Word Omitter (Advanced — podem ficar para depois do projeto). Critério: os 6 Basic/Intermediate passando no judge.$txt$,
       2, 'concept', null, $json$[{"plataforma":"hackerrank","tipo":"curso","nome":"React"}]$json$::jsonb),
      (v_group, $txt$Certificação HackerRank — React (Basic)$txt$,
       $txt$Prova gratuita. Fazer após o item anterior. Publicar no LinkedIn.$txt$,
       3, 'concept', null, $json$[{"plataforma":"hackerrank","tipo":"curso","nome":"Certificação"}]$json$::jsonb),
      (v_group, $txt$Certificação HackerRank — Frontend Developer (React) (role)$txt$,
       $txt$Certificação de papel (React + JavaScript + CSS). Fazer ao fechar o bloco. Publicar no LinkedIn.$txt$,
       4, 'concept', null, $json$[{"plataforma":"hackerrank","tipo":"curso","nome":"Certificação"}]$json$::jsonb);
end $$;

-- -------------------------------------------------------------
-- Bloco 7: 1 itens, depois de "Mobile"
-- -------------------------------------------------------------
do $$
declare
  v_block uuid;
  v_group uuid;
  v_ordem int;
begin
  select b.id into v_block
  from blocks b join tracks t on t.id = b.track_id
  where t.slug = 'dev' and b.ordem = 7;

  if v_block is null then
    raise notice 'Bloco 7 da Dev não encontrado — nada feito.';
    return;
  end if;

  if exists (select 1 from item_groups where block_id = v_block and titulo = $txt$Prática e certificações$txt$) then
    raise notice 'Bloco 7: grupo já existe — pulando.';
    return;
  end if;

  select ordem + 1 into v_ordem
  from item_groups where block_id = v_block and titulo = $txt$Mobile$txt$;

  if v_ordem is null then
    raise notice 'Bloco 7: grupo âncora "Mobile" não existe — nada feito.';
    return;
  end if;

  update item_groups set ordem = ordem + 1
  where block_id = v_block and ordem >= v_ordem;

  insert into item_groups (block_id, titulo, ordem)
  values (v_block, $txt$Prática e certificações$txt$, v_ordem)
  returning id into v_group;

  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar)
  values
      (v_group, $txt$Prática HackerRank — Linux Shell (~60 exercícios)$txt$,
       $txt$Fazer após a trilha Alura “Começando em DevOps”. HackerRank › Linux Shell: Bash — os 10 Easy/Medium (pular Functions and Fractals), Text Processing (30), Arrays in Bash — os 7 Easy/Medium (pular Lonely Integer), Grep Sed Awk (14). Critério: faixa completa — é o único lugar do roadmap com juiz para terminal.$txt$,
       1, 'concept', null, $json$[{"plataforma":"hackerrank","tipo":"curso","nome":"Linux Shell"}]$json$::jsonb);
end $$;

-- -------------------------------------------------------------
-- Bloco 1, grupo "Git e GitHub": item opcional do repositório de soluções
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
  where t.slug = 'dev' and b.ordem = 1 and g.titulo = 'Git e GitHub';

  if v_group is null then
    raise notice 'Grupo Git e GitHub não encontrado — nada feito.';
    return;
  end if;

  if exists (select 1 from items where group_id = v_group and titulo = $txt$Repositório hackerrank no GitHub$txt$) then
    raise notice 'Item do repositório já existe — pulando.';
    return;
  end if;

  select coalesce(max(ordem), 0) + 1 into v_ordem from items where group_id = v_group;

  insert into items (group_id, titulo, descricao, ordem, tipo, fonte, onde_estudar)
  values
      (v_group, $txt$Repositório hackerrank no GitHub$txt$,
       $txt$Uma pasta por problema, um commit por solução, README explicando a organização. Git treinado todo dia sem item extra — até o fim do Bloco 1 são ~200 commits reais.$txt$,
       v_ordem, 'optional', null, $json$[]$json$::jsonb);
end $$;
