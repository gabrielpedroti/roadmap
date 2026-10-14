import type { SeedTrack } from "./tipos";

// Trilha Dev — espinha de conceitos conforme o mapa do Gabriel
// ("MAPA DA TRILHA DEV — CONCEITO x ONDE ESTUDAR", jul/2026).
// Os conceitos são grossos de propósito: cada um casa com um curso/matéria.
// Onde estudar cada um: supabase/seed/onde-estudar-dev.ts.
//
// Objetivo: rever as 20 matérias técnicas de ADS (PUC-PR) + chegar pronto
// na Pós Tech Full Stack Development (FIAP). Sem data-prazo: quem governa o
// plano é a constância (streak/metas), não o calendário.

export const trilhaDev: SeedTrack = {
  slug: "dev",
  nome: "Dev",
  descricao:
    "Do zero ao full stack: revisão das 20 matérias técnicas de ADS (PUC-PR) com alicerce sólido, preparando a entrada na Pós Tech Full Stack Development da FIAP.",
  cor: "#9D2235", // bordô PUCPR (Pantone 201)
  ordem: 1,
  blocos: [
    // ----------------------------------------------------------------
    {
      titulo: "Bloco 1 — Fundamentos de Programação (Python)",
      semanas: "~6-8 semanas",
      comecaAberto: true,
      descricao:
        "A base de tudo: ambiente, terminal, Git e lógica de programação com Python.",
      grupos: [
        {
          titulo: "Primeiros passos",
          itens: [
            {
              titulo: "O que é programação, áreas, carreira e próximos passos",
              descricao:
                "Front, back, mobile: o mapa da área, como o mercado funciona e por onde seguir.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Ambiente e ferramentas",
          itens: [
            {
              titulo: "VS Code (uso produtivo)",
              descricao:
                "Paleta de comandos (Ctrl+Shift+P), multi-cursor, busca no projeto, extensões, terminal integrado e debugger básico.",
              tipo: "concept",
            },
            {
              titulo: "Terminal",
              descricao:
                "Navegar entre pastas, criar/mover/apagar arquivos, rodar scripts, caminho relativo vs absoluto.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Git e GitHub",
          itens: [
            {
              titulo: "Controle de versão, ciclo (add/commit) e histórico",
              descricao:
                "Por que existe; init, status, add, commit com mensagens claras; log, diff e voltar num arquivo.",
              tipo: "concept",
            },
            {
              titulo: "Branches, conflito, GitHub e colaboração",
              descricao:
                "Criar/alternar branch, merge, resolver conflito; repositório, clone, push/pull, README e .gitignore. Critério de saída: versionar qualquer projeto novo sem tutorial.",
              tipo: "concept",
            },
            {
              titulo: "Repositório hackerrank no GitHub",
              descricao:
                "Uma pasta por problema, um commit por solução, README explicando a organização. Git treinado todo dia sem item extra — até o fim do Bloco 1 são ~200 commits reais.",
              tipo: "optional",
            },
          ],
        },
        {
          titulo: "Lógica e fundamentos",
          itens: [
            {
              titulo: "Variáveis, operadores, entrada/saída",
              descricao:
                "int, float, str, bool e conversões; aritméticos, comparação e lógicos (and/or/not); input(), print() e f-strings.",
              tipo: "concept",
            },
            {
              titulo: "Condicionais",
              descricao:
                "if/elif/else; condições compostas; aninhamento (e por que evitar).",
              tipo: "concept",
            },
            {
              titulo: "Laços",
              descricao:
                "for + range, while, break/continue; escolher o laço certo pro problema.",
              tipo: "concept",
            },
            {
              titulo: "Funções",
              descricao:
                "Parâmetros, retorno, escopo, valores default; quebrar problema em funções pequenas.",
              tipo: "concept",
            },
            {
              titulo: "Erros (try/except)",
              descricao:
                "Ler um traceback sem pânico; try/except; levantar erros próprios (raise).",
              tipo: "concept",
            },
            {
              titulo: "Strings e Regex",
              descricao:
                "Manipular texto de verdade e reconhecer padrões com expressões regulares.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Coleções",
          itens: [
            {
              titulo: "Listas e tuplas",
              descricao:
                "Criar, indexar, fatiar (slicing), métodos principais, iterar; imutabilidade e quando cada uma faz sentido.",
              tipo: "concept",
            },
            {
              titulo: "Dicionários e conjuntos",
              descricao:
                "Chave/valor, quando usar em vez de lista, iterar chaves e valores; sets e operações de conjunto.",
              tipo: "concept",
            },
            {
              titulo: "List comprehensions",
              descricao: "Ler e escrever as básicas (transformar e filtrar).",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Arquivos e dados",
          itens: [
            {
              titulo: "Ler/escrever texto, CSV e JSON",
              descricao:
                "with open e modos de abertura; módulo csv; dumps/loads — e por que JSON é a língua das APIs.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Matemática aplicada",
          itens: [
            {
              titulo:
                "Lógica proposicional, bases numéricas, proporção/porcentagem",
              descricao:
                "E/OU/NÃO e tabelas-verdade (a base dos seus ifs); binário/decimal/hex na intuição; o suficiente pra barra de progresso, juros e métricas.",
              tipo: "concept",
            },
          ],
        },
        {
          // Camada de prática (regra 12 do REGRAS-DO-ROADMAP): certificação e
          // prática com juiz (HackerRank) = concept; prática gerada com IA = optional.
          titulo: "Prática e certificações",
          itens: [
            {
              titulo: "Prática HackerRank — Python Development (94 exercícios)",
              descricao:
                "Fazer após fechar o Nano PYTHON DEVELOPMENT (FIAP), refazendo do zero inclusive os já resolvidos. No HackerRank › Python: Introduction (7), Basic Data Types (6), Strings — os 12 Easy, Sets (13), Math — Mod Divmod, Power - Mod Power, Integers Come In All Sizes, Triangle Quest, Triangle Quest 2, Built-Ins (6), Python Functionals (3), Errors and Exceptions — Exceptions, Debugging (2). No HackerRank › Algorithms, em Python: Warmup (10) e Implementation Easy — os 25 primeiros (Grading Students até Sequence Equation). Data Structures › Arrays — os 4 Easy. Critério: faixa completa + fluência (3 problemas do tema em menos de 20 min cada, sem consultar nada).",
              tipo: "concept",
            },
            {
              titulo: "Certificação HackerRank — Problem Solving (Basic)",
              descricao:
                "Prova gratuita, 90 min, 2 questões (arrays e strings), em Python. Fazer logo após o item anterior, antes dos próximos cursos. Retake é livre: reprovar vira diagnóstico, não derrota. Publicar o certificado no LinkedIn.",
              tipo: "concept",
            },
            {
              titulo: "Prática HackerRank — Strings e Regex (36 exercícios)",
              descricao:
                "Fazer após o curso Alura “Praticando Python: Strings e Regex”. HackerRank › Python: Regex and Parsing — os 12 Easy/Medium (Detect Floating Point Number até Validating Credit Card Numbers; pular Validating Postal Codes e Matrix Script), Errors — Incorrect Regex, Strings — The Minion Game e Merge the Tools!. HackerRank › Algorithms › Strings Easy (21), em Python. Critério: faixa completa + fluência.",
              tipo: "concept",
            },
            {
              titulo: "Prática HackerRank — lógica e coleções (55 exercícios)",
              descricao:
                "Fazer após a trilha Alura “Praticando Python”. HackerRank › Algorithms, em Python: Implementation Easy — do 26º ao 49º (Jumping on the Clouds: Revisited até Strange Counter) e Greedy Easy (12). Interview Preparation Kit: Warm-up (4), Arrays (5), Dictionaries and Hashmaps (5), String Manipulation (5). Critério: faixa completa + fluência.",
              tipo: "concept",
            },
            {
              titulo: "Prática HackerRank — módulos e arquivos (20 exercícios)",
              descricao:
                "Fazer após o curso Alura “Python: avance na OO e consuma API”. HackerRank › Python: Date and Time (2), Collections (8), Itertools — os 6 Easy/Medium (pular Maximize It!), Math — Polar Coordinates e Find Angle MBC, XML (2). Critério: faixa completa.",
              tipo: "concept",
            },
            {
              titulo:
                "Matemática aplicada — Databases › Basics of Sets and Relations #1 a #7",
              descricao:
                "Questões curtas de lógica de conjuntos no HackerRank › Databases. Revisão leve da matéria Matemática Aplicada à Computação. Não conta no progresso.",
              tipo: "optional",
            },
          ],
        },
        {
          titulo: "Matérias da faculdade",
          fonte: "ads-pucpr",
          itens: [
            { titulo: "Raciocínio Computacional — Revisado", tipo: "review" },
            {
              titulo: "Refiz o projeto — Raciocínio Computacional",
              tipo: "optional",
            },
            {
              titulo: "Matemática Aplicada à Computação — Revisado",
              tipo: "review",
            },
            {
              titulo: "Refiz o projeto — Matemática Aplicada à Computação",
              tipo: "optional",
            },
          ],
        },
        {
          titulo: "🏗️ Projeto do bloco (30%)",
          itens: [
            {
              titulo: "CLI de registro de estudos",
              descricao:
                "(ou finanças pessoais) Menu interativo, CRUD completo, dados salvos em JSON ou CSV, código organizado em funções, tratamento de erros de entrada, repositório no GitHub com histórico de commits pequenos e README explicando como rodar.",
              tipo: "project",
            },
          ],
        },
      ],
    },
    // ----------------------------------------------------------------
    {
      titulo: "Bloco 2 — POO e Estruturas de Dados (Python)",
      semanas: "~8-10 semanas",
      descricao:
        "Orientação a objetos, estruturas de dados e o primeiro contato sério com APIs e testes. 🔓 Concluir aqui desbloqueia a Carreira 2 da trilha de IA.",
      grupos: [
        {
          titulo: "Programação Orientada a Objetos",
          itens: [
            {
              titulo:
                "Classes, encapsulamento, herança, polimorfismo, composição e métodos especiais",
              descricao:
                "Modelar algo do mundo real com __init__ e self; esconder detalhes com properties; reaproveitar com super(); duck typing; “tem um” vs “é um”; __str__, __repr__, __eq__. Critério de saída: decidir quando usar classe e quando função resolve.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Estruturas de dados e algoritmos",
          itens: [
            {
              titulo: "Pilha, fila e lista ligada",
              descricao:
                "Conceito, operações e onde aparecem na vida real (undo, filas de tarefas); diferença pra array.",
              tipo: "concept",
            },
            {
              titulo: "Busca (linear, binária)",
              descricao: "Quando cada uma serve e por que ordenação importa.",
              tipo: "concept",
            },
            {
              titulo: "Ordenação (bubble, insertion, merge)",
              descricao:
                "Entender bubble/insertion; merge sort na intuição de dividir pra conquistar.",
              tipo: "concept",
            },
            {
              titulo: "Complexidade (Big-O)",
              descricao:
                "Noção de O(1), O(n), O(n²), O(log n); comparar duas soluções.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Organização de código",
          itens: [
            {
              titulo: "Módulos e imports, ambientes virtuais (venv, pip)",
              descricao:
                "Dividir um projeto em arquivos; isolar dependências com venv e requirements.txt.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Consumindo APIs",
          itens: [
            {
              titulo: "HTTP, requests, autenticação (token), paginação",
              descricao:
                "Requisição/resposta e status codes; consumir uma API real tratando erro de rede; token no header com segredo em variável de ambiente; consumir uma API paginada de ponta a ponta.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Testes",
          itens: [
            {
              titulo: "pytest e casos de borda",
              descricao:
                "Escrever testes pra funções puras, nomear bem, rodar no terminal; pensar no que quebra: vazio, zero, negativo, formato errado.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "IoT",
          itens: [
            {
              titulo: "Conceito e arquitetura, protocolos (HTTP vs MQTT)",
              descricao:
                "Sensor → gateway → nuvem; onde as APIs entram nisso e quando cada protocolo serve.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Prática e certificações",
          itens: [
            {
              titulo: "Prática HackerRank — POO (2 exercícios)",
              descricao:
                "Fazer após o curso Alura “Python: aplicando a Orientação a Objetos”. HackerRank › Python › Classes: Classes: Dealing with Complex Numbers (métodos especiais __add__, __str__…) e Class 2 - Find the Torsional Angle. Critério: explicar em voz alta por que cada método especial existe.",
              tipo: "concept",
            },
            {
              titulo:
                "Prática HackerRank — pilhas, filas e listas ligadas (~38 exercícios)",
              descricao:
                "Fazer após o curso Alura “Estrutura de dados: pilhas, filas e listas com Python”. HackerRank › Data Structures: Linked Lists (15), Stacks — Maximum Element, Equal Stacks, Balanced Brackets, Game of Two Stacks, Largest Rectangle, Simple Text Editor, Waiter; Queues — Queue using Two Stacks, Down to Zero II; Arrays — Sparse Arrays. Interview Preparation Kit: Stacks and Queues (6), Linked Lists (5). Critério: faixa completa + fluência nos Easy.",
              tipo: "concept",
            },
            {
              titulo:
                "Prática HackerRank — Algoritmos I: ordenação (10 exercícios)",
              descricao:
                "Fazer após o curso Alura “Algoritmos I: Selection, Insertion”. HackerRank › Algorithms › Sorting: Intro to Tutorial Challenges, Insertion Sort - Part 1, Insertion Sort - Part 2, Correctness and the Loop Invariant, Running Time of Algorithms, Counting Sort 1, Counting Sort 2, Big Sorting, Closest Numbers, Find the Median. Critério: faixa completa.",
              tipo: "concept",
            },
            {
              titulo:
                "Prática HackerRank — Algoritmos II: busca e ordenação (23 exercícios)",
              descricao:
                "Fazer após o curso Alura “Algoritmos II: MergeSort, QuickSort, Busca Binária”. HackerRank › Algorithms: Sorting — Quicksort 1 - Partition e The Full Counting Sort; Search Easy — Ice Cream Parlor, Missing Numbers, Sherlock and Array. Interview Preparation Kit: Sorting (5), Search (7), Greedy Algorithms (5). Critério: faixa completa + explicar Big-O de cada solução.",
              tipo: "concept",
            },
            {
              titulo: "pytest nas próprias soluções",
              descricao:
                "Após o curso Alura “Python: testes automatizados”, escrever testes pytest para 10 soluções suas do Interview Preparation Kit (casos de borda: vazio, zero, negativo, formato errado). Teste de verdade em código seu.",
              tipo: "optional",
            },
            {
              titulo: "Árvores e heap (HackerRank, 10) — além do roadmap",
              descricao:
                "Data Structures › Trees Easy (8) e Heap — QHEAP1, Jesse and Cookies. * Não está no plano de estudo; faça se sobrar fôlego. Closures and Decorators (Python, 2) idem — o conceito volta em JS no Bloco 4.",
              tipo: "optional",
            },
            {
              titulo:
                "Certificação HackerRank — Problem Solving (Intermediate)",
              descricao:
                "Prova gratuita, 90 min, em Python. Fazer após os itens de prática deste bloco. Publicar no LinkedIn.",
              tipo: "concept",
            },
            {
              titulo:
                "Certificação HackerRank — Software Engineer Intern (role)",
              descricao:
                "Certificação de papel (problem solving + estruturas de dados). Fazer após a anterior. Publicar no LinkedIn.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Matérias da faculdade",
          fonte: "ads-pucpr",
          itens: [
            { titulo: "Fundamentos de POO — Revisado", tipo: "review" },
            { titulo: "Refiz o projeto — Fundamentos de POO", tipo: "optional" },
            {
              titulo:
                "Métodos de Pesquisa e Ordenação em Estruturas de Dados — Revisado",
              tipo: "review",
            },
            {
              titulo: "Refiz o projeto — Pesquisa e Ordenação",
              tipo: "optional",
            },
            { titulo: "Fundamentos de IoT — Revisado", tipo: "review" },
            { titulo: "Refiz o projeto — Fundamentos de IoT", tipo: "optional" },
            { titulo: "IoT em um Mundo Conectado — Revisado", tipo: "review" },
            {
              titulo: "Refiz o projeto — IoT em um Mundo Conectado",
              tipo: "optional",
            },
          ],
        },
        {
          titulo: "🏗️ Projeto do bloco (30%)",
          itens: [
            {
              titulo: "Sistema OO consumindo API real",
              descricao:
                "Sugestão alinhada ao trabalho (BPO): cliente de cotações/moedas ou consolidador de dados financeiros. Requisitos: 3+ classes com responsabilidades claras, consumo de API com tratamento de erros, venv + requirements.txt, testes pytest nas regras de negócio, README.",
              tipo: "project",
            },
          ],
        },
      ],
    },
    // ----------------------------------------------------------------
    {
      titulo: "Bloco 3 — Web e Front-end Básico",
      semanas: "~6-8 semanas",
      descricao:
        "Como a web funciona por dentro: HTML semântico, CSS moderno e o primeiro JavaScript no navegador.",
      grupos: [
        {
          titulo: "Como a web funciona",
          itens: [
            {
              titulo: "Cliente/servidor, HTTP na prática, DNS",
              descricao:
                "Contar a história completa do que acontece ao digitar uma URL; métodos, status codes e headers na aba Network; como um nome vira IP.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "HTML",
          itens: [
            {
              titulo: "Estrutura/semântica, formulários, acessibilidade",
              descricao:
                "header/main/section/article/footer e por que semântica importa; inputs, labels e validação nativa; alt, hierarquia de headings e contraste.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "CSS",
          itens: [
            {
              titulo:
                "Box model, flexbox, grid, responsivo (mobile-first), variáveis CSS",
              descricao:
                "margin/border/padding/content; alinhar em uma dimensão e layouts em duas; media queries e unidades relativas; manter um CSS que não vira espaguete.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "JavaScript no navegador",
          itens: [
            {
              titulo: "Sintaxe básica, DOM, eventos",
              descricao:
                "Variáveis (let/const), funções e condicionais mapeando do Python; selecionar, criar e modificar elementos; click, submit, input e prevenir o comportamento padrão.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "UX / IHC",
          itens: [
            {
              titulo: "Heurísticas de usabilidade, hierarquia visual",
              descricao:
                "Feedback, consistência e prevenção de erro (as 10 de Nielsen); tamanho, contraste e espaço guiando o olho.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Prática e certificações",
          itens: [
            {
              titulo: "HTML por dentro (HackerRank, 3)",
              descricao:
                "HackerRank › Python › Regex and Parsing: HTML Parser - Part 1, HTML Parser - Part 2, Detect HTML Tags, Attributes and Attribute Values — em Python. Serve para enxergar a estrutura do HTML como dado.",
              tipo: "optional",
            },
            {
              titulo: "Certificação HackerRank — CSS (Basic)",
              descricao:
                "Prova gratuita. Fazer após a trilha Alura “HTML e CSS para projetos web”. Publicar no LinkedIn.",
              tipo: "concept",
            },
            {
              titulo: "Prática (gerar com IA) — sintaxe JavaScript básica",
              descricao:
                "Após o curso Alura “JavaScript: construindo páginas dinâmicas”, pedir a uma IA 10 exercícios de lógica que você já resolveu em Python (contagem de vogais, inversão, soma de array, FizzBuzz etc.) para reescrever em JavaScript usando let/const, template strings, arrow functions e split/join. Sem consultar nada. Critério: 8 de 10 corretos de primeira.",
              tipo: "optional",
            },
            {
              titulo: "Prática (gerar com IA) — DOM e eventos",
              descricao:
                "Pedir a uma IA 5 mini-tarefas numa página estática: renderizar uma lista a partir de um array, formulário com validação e preventDefault, toggle de classe no clique, contador com input, filtro de lista ao digitar. Só MDN como consulta. Critério: as 5 funcionando sem copiar código.",
              tipo: "optional",
            },
          ],
        },
        {
          titulo: "Matérias da faculdade",
          fonte: "ads-pucpr",
          itens: [
            {
              titulo: "Fundamentos de Programação Web — Revisado",
              tipo: "review",
            },
            {
              titulo: "Refiz o projeto — Fundamentos de Programação Web",
              tipo: "optional",
            },
            {
              titulo: "Interação Humano-Computador — Revisado",
              tipo: "review",
            },
            {
              titulo: "Refiz o projeto — Interação Humano-Computador",
              tipo: "optional",
            },
          ],
        },
        {
          titulo: "🏗️ Projeto do bloco (30%)",
          itens: [
            {
              titulo: "Site multipágina responsivo publicado",
              descricao:
                "(GitHub Pages) 3+ páginas, layout com flexbox/grid, formulário com validação em JS, mobile-first. Sugestão: seu site pessoal/portfólio — vai servir pra sempre.",
              tipo: "project",
            },
          ],
        },
      ],
    },
    // ----------------------------------------------------------------
    {
      titulo: "Bloco 4 — JavaScript de Verdade",
      semanas: "~8-10 semanas",
      descricao:
        "A linguagem a fundo: assincronia, protótipos e arrays de verdade. ⭐ Fim deste bloco = pré-requisito mínimo da Pós Tech FIAP.",
      grupos: [
        {
          titulo: "A linguagem a fundo",
          itens: [
            {
              titulo:
                "Tipos e coerção (== vs ===), escopo, arrow functions, destructuring/spread",
              descricao:
                "truthy/falsy, null vs undefined; var/let/const e escopo de bloco; a diferença de this na arrow; ler e escrever JS moderno com naturalidade.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Funções avançadas",
          itens: [
            {
              titulo: "Callbacks, higher-order, closures",
              descricao:
                "Funções que recebem/retornam funções; explicar closure com um exemplo próprio (contador, cache).",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Objetos e protótipos",
          itens: [
            {
              titulo: "this, protótipos, classes ES6",
              descricao:
                "this nos 4 contextos; como herança funciona por baixo do capô; sintaxe de classe mapeando da POO do Python.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Arrays de verdade",
          itens: [
            {
              titulo: "map/filter/reduce, find/some/every/sort",
              descricao:
                "Transformar dados sem for e encadear operações; escolher o método certo pro problema.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Assincronia",
          itens: [
            {
              titulo: "Event loop, promises, async/await, fetch",
              descricao:
                "Por que o JS não trava esperando; estados e then/catch; reescrever then-chains com try/catch; consumir APIs com loading e erro tratados e Promise.all.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Módulos e qualidade",
          itens: [
            {
              titulo: "import/export, ESLint + Prettier",
              descricao:
                "Organizar um projeto em módulos ES; configurar uma vez e nunca mais discutir formatação.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Prática e certificações",
          itens: [
            {
              titulo: "Prática (gerar com IA) — strings em JavaScript",
              descricao:
                "Após o curso Alura “JavaScript: explorando a linguagem”, pedir a uma IA 10 problemas de manipulação de string (palíndromo, anagrama, contagem de caracteres, capitalize, caesar cipher, camelCase) para resolver só com a API de String e Array do JS (slice, split, join, charCodeAt, includes). Critério: 8 de 10 sem consultar.",
              tipo: "optional",
            },
            {
              titulo: "Certificação HackerRank — JavaScript (Basic)",
              descricao:
                "Prova gratuita, 90 min, 2 questões (hoisting, escopo, sintaxe). Fazer após o curso “JavaScript: explorando a linguagem”. Retake livre. Publicar no LinkedIn.",
              tipo: "concept",
            },
            {
              titulo: "Prática (gerar com IA) — ES6+",
              descricao:
                "Após o curso Alura “JavaScript: evoluindo a aplicação com ES6+”, pedir a uma IA 10 exercícios que exijam destructuring, spread/rest, arrow functions, template literals, classes ES6 e módulos import/export. Critério: 8 de 10 sem consultar.",
              tipo: "optional",
            },
            {
              titulo: "Prática (gerar com IA) — métodos de array sem for",
              descricao:
                "Após o curso Alura “JavaScript: métodos de array”, pedir a uma IA 10 problemas de transformação de dados (somar, filtrar, agrupar, ordenar objetos, achar máximo, verificar condição) para resolver SÓ com map/filter/reduce/find/some/every/sort — proibido for e while. Critério: 8 de 10 sem consultar, e explicar o que reduce está acumulando em cada um.",
              tipo: "optional",
            },
            {
              titulo: "Prática (gerar com IA) — assincronia",
              descricao:
                "Após os cursos Alura “promises e async/await” e “JS na web: CRUD assíncrono”, pedir a uma IA 5 exercícios com Promise, async/await e fetch numa API pública (loading, erro, Promise.all, retry simples, cancelamento com AbortController). Critério: os 5 funcionando e explicar em voz alta o que o event loop faz em cada um.",
              tipo: "optional",
            },
            {
              titulo: "Certificação HackerRank — JavaScript (Intermediate)",
              descricao:
                "Prova gratuita, 90 min (closures, prototypes, async, ES6 — a ementa deste bloco). Fazer ao fechar o bloco, antes do projeto ou junto. Publicar no LinkedIn.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Matérias da faculdade",
          fonte: "ads-pucpr",
          itens: [
            {
              titulo:
                "Tecnologias para Desenvolvimento Web (parte 1) — Revisado",
              tipo: "review",
            },
            {
              titulo: "Refiz o projeto — Tecnologias Web (parte 1)",
              tipo: "optional",
            },
          ],
        },
        {
          titulo: "🏗️ Projeto do bloco (30%)",
          itens: [
            {
              titulo: "SPA em JavaScript puro",
              descricao:
                "Consumindo API pública: busca/filtro, estados de loading e erro, código em módulos, deploy (GitHub Pages/Netlify). Sem framework — a dor deste projeto é o que fará o React fazer sentido.",
              tipo: "project",
            },
          ],
        },
      ],
    },
    // ----------------------------------------------------------------
    {
      titulo: "Bloco 5 — Back-end com Node + Banco de Dados",
      semanas: "~10-12 semanas",
      descricao:
        "O lado do servidor: Node + Express, SQL de verdade no PostgreSQL, autenticação e segurança.",
      grupos: [
        {
          titulo: "Node.js",
          itens: [
            {
              titulo: "Runtime, npm, assincronia no servidor",
              descricao:
                "O que é o Node, package.json, scripts e node_modules; por que o modelo do Node escala.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Express e APIs REST",
          itens: [
            {
              titulo:
                "Rotas e verbos, middlewares, status codes/erros, validação",
              descricao:
                "Desenhar uma API REST semântica; entender a cadeia e criar um middleware próprio; responder certo (201/400/401/404/500) com handler central; nunca confiar no cliente.",
              tipo: "concept",
            },
          ],
        },
        {
          // Espelha o grupo "Testes" do Bloco 2 (pytest): aqui é a mesma
          // ideia, agora do lado do Node.
          titulo: "Testes",
          itens: [
            {
              titulo: "Testes na API (Jest)",
              descricao:
                "Testar a API do projeto deste bloco como você testou com pytest no Bloco 2: rotas felizes e de erro, o que quebra quando o cliente manda lixo.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "PostgreSQL e SQL",
          itens: [
            {
              titulo:
                "Modelagem (PK/FK, 1-N, N-N), CRUD, JOINs, agregações, índices/transações",
              descricao:
                "Tabelas e relacionamentos; INSERT/SELECT/UPDATE/DELETE com WHERE e ORDER BY; INNER vs LEFT; GROUP BY com COUNT/SUM/AVG; intuição de performance e ACID em uma frase.",
              tipo: "concept",
            },
            {
              titulo: "NoSQL na prática — noção de banco de documentos",
              descricao:
                "Documento vs tabela e quando cada um serve. Só a noção: a Fase 2 da pós usa Postgres E MongoDB.",
              tipo: "optional",
            },
          ],
        },
        {
          titulo: "Integrando app e banco",
          itens: [
            {
              titulo:
                "Conexão Node ↔ Postgres (pg/Prisma), variáveis de ambiente (.env)",
              descricao:
                "Driver pg ou ORM leve e os prós e contras; segredos fora do código com .env.example versionado.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Autenticação e segurança",
          itens: [
            {
              titulo: "Hash de senha (bcrypt), JWT vs sessão, OWASP, HTTPS/CORS",
              descricao:
                "Por que nunca guardar senha em texto; como funciona um token, expiração e refresh; reconhecer e prevenir SQL injection, XSS e auth quebrada; por que o navegador reclama.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Prática e certificações",
          itens: [
            {
              titulo: "Prática (gerar com IA) — Express",
              descricao:
                "Após os cursos Alura de Node.js/Express, pedir a uma IA 5 endpoints para implementar num recurso simples (listar com paginação, buscar por id, criar com validação, atualizar, deletar), cada um com status code correto (200/201/400/404) e handler central de erro, com testes Jest cobrindo sucesso e erro. Critério: todos os testes verdes sem consultar o curso.",
              tipo: "optional",
            },
            {
              titulo: "Certificação HackerRank — Node (Basic)",
              descricao:
                "Prova gratuita. Fazer após os cursos de Node.js/Express. Publicar no LinkedIn.",
              tipo: "concept",
            },
            {
              titulo: "Certificação HackerRank — Node.js (Intermediate)",
              descricao:
                "Prova gratuita. Fazer após a anterior e o curso “testando API's REST”. Publicar no LinkedIn.",
              tipo: "concept",
            },
            {
              titulo:
                "Prática HackerRank — SQL básico e agregação (37 exercícios)",
              descricao:
                "Fazer durante/após a trilha Alura “SQL com PostgreSQL”. HackerRank › SQL: Basic Select (20) e Aggregation (17). Critério: faixa completa + fluência.",
              tipo: "concept",
            },
            {
              titulo: "Certificação HackerRank — SQL (Basic)",
              descricao:
                "Prova gratuita. Fazer após o item anterior. Publicar no LinkedIn.",
              tipo: "concept",
            },
            {
              titulo:
                "Prática HackerRank — JOINs e select avançado (13 exercícios)",
              descricao:
                "HackerRank › SQL: Basic Join (8) e Advanced Select (5). Critério: faixa completa + explicar a diferença INNER/LEFT em voz alta com um exemplo seu.",
              tipo: "concept",
            },
            {
              titulo: "Certificação HackerRank — SQL (Intermediate)",
              descricao:
                "Prova gratuita. Fazer após o item anterior. Publicar no LinkedIn.",
              tipo: "concept",
            },
            {
              titulo:
                "Databases (múltipla escolha) — revisão da matéria Banco de Dados",
              descricao:
                "HackerRank › Databases: subdomínios Relational Algebra, Indexes, Database Normalization, OLAP. Questões curtas; usar como revisão dirigida da matéria “Banco de Dados para TI”. O subdomínio NoSQL - XML, MapReduce cobre a noção do item opcional de MongoDB.",
              tipo: "optional",
            },
            {
              titulo: "SQL avançado (HackerRank, 8) — além do roadmap",
              descricao:
                "SQL › Advanced Join (5) e Alternative Queries (3) → prepara SQL (Advanced). Fora do escopo atual; faça se quiser.",
              tipo: "optional",
            },
            {
              titulo: "Certificação HackerRank — Rest API (Intermediate)",
              descricao:
                "Prova gratuita. Fazer após a trilha Alura “APIs com Node.js e Express”. Publicar no LinkedIn.",
              tipo: "concept",
            },
            {
              titulo: "Certificação HackerRank — Software Engineer (role)",
              descricao:
                "Certificação de papel (estruturas de dados + SQL + REST API). Fazer ao fechar o bloco. Publicar no LinkedIn.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Matérias da faculdade",
          fonte: "ads-pucpr",
          itens: [
            { titulo: "Banco de Dados para TI — Revisado", tipo: "review" },
            {
              titulo: "Refiz o projeto — Banco de Dados para TI",
              tipo: "optional",
            },
            { titulo: "Sistemas Web Seguros — Revisado", tipo: "review" },
            {
              titulo: "Refiz o projeto — Sistemas Web Seguros",
              tipo: "optional",
            },
            {
              titulo: "Segurança da Tecnologia da Informação — Revisado",
              tipo: "review",
            },
            { titulo: "Refiz o projeto — Segurança da TI", tipo: "optional" },
            {
              titulo:
                "Tecnologias para Desenvolvimento Web (parte 2) — Revisado",
              tipo: "review",
            },
            {
              titulo: "Refiz o projeto — Tecnologias Web (parte 2)",
              tipo: "optional",
            },
          ],
        },
        {
          titulo: "🏗️ Projeto do bloco (30%)",
          itens: [
            {
              titulo: "API REST completa em produção",
              descricao:
                "Autenticação (registro/login com JWT), CRUD de um recurso real, PostgreSQL, validação, tratamento de erros, deploy (Railway/Render), documentação das rotas no README.",
              tipo: "project",
            },
          ],
        },
      ],
    },
    // ----------------------------------------------------------------
    {
      titulo: "Bloco 6 — TypeScript + React",
      semanas: "~8-10 semanas",
      descricao:
        "O ecossistema moderno de front-end: TypeScript, React e deploy na Vercel.",
      grupos: [
        {
          titulo: "TypeScript",
          itens: [
            {
              titulo: "Tipos, interfaces, unions/narrowing, generics, tsconfig",
              descricao:
                "Anotar variáveis, parâmetros e retornos; modelar objetos e respostas de API; string | null e como o TS te protege; ler e usar Array<T>/Promise<T>; entender strict e a compilação.",
              tipo: "concept",
            },
            {
              titulo: "Princípios SOLID e código limpo — noção",
              descricao:
                "Os 5 princípios em exemplos de TS, sem decoreba: reconhecer a classe que faz coisa demais e a dependência apertada. A Fase 1 da pós já assume isso.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "React",
          itens: [
            {
              titulo:
                "Componentes/JSX, estado, efeitos, listas/formulários, API, roteamento, context",
              descricao:
                "Pensar em componentes e props; useState e lifting state up; useEffect sem tiro no pé; keys e inputs controlados; fetch com loading/erro; navegação e parâmetros; context quando o prop drilling doeu.",
              tipo: "concept",
            },
            {
              titulo: "Testes de componente (Jest + Testing Library)",
              descricao:
                "Testar o que o usuário vê, não o estado interno: renderizar, procurar por texto/label e simular clique.",
              tipo: "optional",
            },
          ],
        },
        {
          titulo: "Ecossistema e deploy",
          itens: [
            {
              titulo: "Vite/Next, deploy na Vercel",
              descricao:
                "Criar projeto moderno e entender o que o framework resolve; conectar repo, preview deployments e variáveis de ambiente.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Prática e certificações",
          itens: [
            {
              titulo: "Prática (gerar com IA) — TypeScript",
              descricao:
                "Após os cursos Alura de TypeScript, pegar 10 problemas que você já resolveu em JS (ou pedir 10 novos a uma IA) e reescrever em TypeScript com tipos explícitos, interfaces para os dados, uma union com narrowing e um generic. Critério: compila em strict com zero any.",
              tipo: "optional",
            },
            {
              titulo: "Prática HackerRank — React (10 desafios)",
              descricao:
                "Fazer após as trilhas Alura de React. HackerRank › React: Item List Manager, Contact Form (Basic); Patient Medical Records, Blog Post, Slideshow, CryptoRank Exchange (Intermediate); Code Review Feedback, Employee Validation, Article Sorting, Word Omitter (Advanced — podem ficar para depois do projeto). Critério: os 6 Basic/Intermediate passando no judge.",
              tipo: "concept",
            },
            {
              titulo: "Certificação HackerRank — React (Basic)",
              descricao:
                "Prova gratuita. Fazer após o item anterior. Publicar no LinkedIn.",
              tipo: "concept",
            },
            {
              titulo:
                "Certificação HackerRank — Frontend Developer (React) (role)",
              descricao:
                "Certificação de papel (React + JavaScript + CSS). Fazer ao fechar o bloco. Publicar no LinkedIn.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "🏗️ Projeto do bloco (30%)",
          itens: [
            {
              titulo: "Front-end React + TS consumindo a API do Bloco 5",
              descricao:
                "Deploy na Vercel. Alternativa oficial: refatorar/estender o Painel de Estudos (este app!) — adicionar uma feature inteira com as próprias mãos. É aqui que ele vira projeto de portfólio legítimo.",
              tipo: "project",
            },
          ],
        },
      ],
    },
    // ----------------------------------------------------------------
    {
      titulo: "Bloco 7 — Engenharia de Software, DevOps e Mobile",
      semanas: "~8-10 semanas",
      descricao:
        "O processo completo de construir software: engenharia, métodos ágeis, DevOps e mobile. Fim deste bloco = entrada confortável na pós.",
      grupos: [
        {
          titulo: "Engenharia de software",
          itens: [
            {
              titulo:
                "Ciclo de vida, requisitos (user stories), especificação e modelagem",
              descricao:
                "Da ideia ao deploy, cascata vs iterativo; funcionais vs não-funcionais e user stories com critérios de aceite; caso de uso e diagrama de classes em nível de leitura. No Nano da FIAP: capítulo que não mapeia nas matérias Eng. de Software, Especificação de SI ou Projeto de SI — pular (é material de revisão, não de especialização).",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Métodos ágeis e gestão",
          itens: [
            {
              titulo: "Scrum e Kanban",
              descricao:
                "Papéis, cerimônias e artefatos; o que é (e o que não é) ágil; fluxo, WIP limitado e montar um board de verdade.",
              tipo: "concept",
            },
            {
              titulo: "Gestão de projetos",
              descricao: "Escopo/prazo/custo e riscos (noção aplicada).",
              tipo: "concept",
            },
            {
              titulo: "Gestão de serviços (ITIL)",
              descricao:
                "Visão geral: incidente vs problema, SLA.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "DevOps e Cloud",
          itens: [
            {
              titulo: "Docker, CI/CD (GitHub Actions), Linux",
              descricao:
                "Imagem vs container, Dockerfile e compose; pipeline com lint + testes a cada push; o básico de Linux que todo deploy cobra.",
              tipo: "concept",
            },
            {
              titulo: "Cloud (IaaS/PaaS/SaaS)",
              descricao: "Onde Vercel, Railway e AWS se encaixam.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Mobile",
          itens: [
            {
              titulo: "Nativo vs híbrido, React Native primeiro contato",
              descricao:
                "Trade-offs e onde React Native e Flutter entram; criar um app simples (Expo) com componentes básicos e navegação.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Prática e certificações",
          itens: [
            {
              titulo: "Prática HackerRank — Linux Shell (~60 exercícios)",
              descricao:
                "Fazer após a trilha Alura “Começando em DevOps”. HackerRank › Linux Shell: Bash — os 10 Easy/Medium (pular Functions and Fractals), Text Processing (30), Arrays in Bash — os 7 Easy/Medium (pular Lonely Integer), Grep Sed Awk (14). Critério: faixa completa — é o único lugar do roadmap com juiz para terminal.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Matérias da faculdade",
          fonte: "ads-pucpr",
          itens: [
            {
              titulo: "Fundamentos de Engenharia de Software — Revisado",
              tipo: "review",
            },
            {
              titulo: "Refiz o projeto — Engenharia de Software",
              tipo: "optional",
            },
            { titulo: "Métodos Ágeis em TI — Revisado", tipo: "review" },
            {
              titulo: "Refiz o projeto — Métodos Ágeis em TI",
              tipo: "optional",
            },
            {
              titulo: "Especificação de Sistemas de Informação — Revisado",
              tipo: "review",
            },
            {
              titulo: "Refiz o projeto — Especificação de SI",
              tipo: "optional",
            },
            {
              titulo: "Projeto de Sistemas de Informação — Revisado",
              tipo: "review",
            },
            { titulo: "Refiz o projeto — Projeto de SI", tipo: "optional" },
            {
              titulo: "Gestão de Projetos em Computação — Revisado",
              tipo: "review",
            },
            {
              titulo: "Refiz o projeto — Gestão de Projetos",
              tipo: "optional",
            },
            { titulo: "Gestão de Serviços de TI — Revisado", tipo: "review" },
            {
              titulo: "Refiz o projeto — Gestão de Serviços de TI",
              tipo: "optional",
            },
            { titulo: "DevOps — Revisado", tipo: "review" },
            { titulo: "Refiz o projeto — DevOps", tipo: "optional" },
            { titulo: "Cloud Computing — Revisado", tipo: "review" },
            { titulo: "Refiz o projeto — Cloud Computing", tipo: "optional" },
            {
              titulo: "Desenvolvimento para Dispositivos Móveis — Revisado",
              tipo: "review",
            },
            {
              titulo: "Refiz o projeto — Dispositivos Móveis",
              tipo: "optional",
            },
          ],
        },
        {
          titulo: "🏗️ Projeto do bloco (30%) — projeto-síntese",
          itens: [
            {
              titulo: "App full stack com processo completo",
              descricao:
                "Requisitos documentados (user stories), Kanban, branches + pull requests, Docker, CI no GitHub Actions, deploy. Sugestões: v2 do Painel de Estudos, ou uma automação do BPO com interface web (conecta com a trilha de IA).",
              tipo: "project",
            },
          ],
        },
      ],
    },
  ],
};
