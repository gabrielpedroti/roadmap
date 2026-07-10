import type { SeedTrack } from "./tipos";

// Transcrição fiel de painel-de-estudos-kit/conteudo/trilha-dev.md
// Objetivo: rever as 20 matérias técnicas de ADS (PUC-PR) + chegar pronto
// na Pós Tech Full Stack Development (FIAP), meta turma de agosto/2027.

export const trilhaDev: SeedTrack = {
  slug: "dev",
  nome: "Dev",
  cor: "#9D2235", // bordô PUCPR (Pantone 201)
  ordem: 1,
  blocos: [
    // ----------------------------------------------------------------
    {
      titulo: "Bloco 1 — Fundamentos de Programação (Python)",
      semanas: "~6-8 semanas",
      comecaAberto: true,
      descricao:
        "Critério de check de conceito: “consigo explicar em voz alta e usar em código sem colar de tutorial”.",
      grupos: [
        {
          titulo: "Ambiente e ferramentas",
          itens: [
            {
              titulo: "Instalar e configurar Python + VS Code",
              descricao:
                "Entender: o que é interpretador, PATH, como rodar um script.",
              tipo: "concept",
            },
            {
              titulo: "VS Code proficiente",
              descricao:
                "Dominar: paleta de comandos (Ctrl+Shift+P), multi-cursor, busca no projeto (Ctrl+Shift+F), extensões (Python, depois ESLint/Prettier), terminal integrado, debugger básico (breakpoint, step over, inspecionar variável).",
              tipo: "concept",
            },
            {
              titulo: "Terminal básico",
              descricao:
                "Navegar entre pastas, criar/mover/apagar arquivos, rodar scripts, entender caminho relativo vs absoluto.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Git e GitHub — prioridade: usar em TODOS os projetos daqui pra frente",
          itens: [
            {
              titulo: "O que é controle de versão",
              descricao: "Explicar por que existe e o que é um commit.",
              tipo: "concept",
            },
            {
              titulo: "Ciclo básico",
              descricao:
                "init, status, add, commit; escrever mensagens de commit claras e pequenas.",
              tipo: "concept",
            },
            {
              titulo: "Histórico",
              descricao: "log, diff, voltar num arquivo (checkout/restore).",
              tipo: "concept",
            },
            {
              titulo: "Branches",
              descricao:
                "Criar branch, alternar, merge simples, resolver um conflito básico.",
              tipo: "concept",
            },
            {
              titulo: "GitHub",
              descricao:
                "Criar repositório, clonar, push/pull, README, .gitignore.",
              tipo: "concept",
            },
            {
              titulo: "Fluxo diário",
              descricao:
                "Critério de saída: versionar qualquer projeto novo sem consultar tutorial.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Lógica e fundamentos",
          itens: [
            {
              titulo: "Variáveis e tipos",
              descricao:
                "int, float, str, bool; conversões; o que acontece na memória (intuição).",
              tipo: "concept",
            },
            {
              titulo: "Operadores",
              descricao:
                "Aritméticos, comparação, lógicos (and/or/not); precedência.",
              tipo: "concept",
            },
            {
              titulo: "Entrada e saída",
              descricao: "input(), print() formatado, f-strings.",
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
              titulo: "Erros",
              descricao:
                "Ler um traceback sem pânico; try/except; levantar erros próprios (raise).",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Coleções",
          itens: [
            {
              titulo: "Listas",
              descricao:
                "Criar, indexar, fatiar (slicing), métodos principais, iterar.",
              tipo: "concept",
            },
            {
              titulo: "Dicionários",
              descricao:
                "Chave/valor, quando usar em vez de lista, iterar chaves e valores.",
              tipo: "concept",
            },
            {
              titulo: "Tuplas e sets",
              descricao: "Imutabilidade; quando cada um faz sentido.",
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
              titulo: "Ler e escrever arquivos texto",
              descricao: "with open, modos de abertura.",
              tipo: "concept",
            },
            {
              titulo: "CSV",
              descricao: "Ler/escrever com o módulo csv.",
              tipo: "concept",
            },
            {
              titulo: "JSON",
              descricao:
                "Entender o formato, dumps/loads; por que JSON é a língua das APIs.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Matemática aplicada (revisão dirigida)",
          itens: [
            {
              titulo: "Lógica proposicional",
              descricao: "E/OU/NÃO, tabelas-verdade — a base dos seus ifs.",
              tipo: "concept",
            },
            {
              titulo: "Bases numéricas",
              descricao: "Binário/decimal/hexadecimal (intuição, não decoreba).",
              tipo: "concept",
            },
            {
              titulo: "Proporção e porcentagem aplicadas",
              descricao:
                "O suficiente pra barra de progresso, juros, métricas.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Matérias da faculdade",
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
        "🔓 Concluir este bloco desbloqueia a Etapa 2 da trilha de IA (Python: IA Aplicada, RAG, LangChain).",
      grupos: [
        {
          titulo: "Programação Orientada a Objetos",
          itens: [
            {
              titulo: "Classes e objetos",
              descricao:
                "Atributos, métodos, __init__, self; modelar algo do mundo real.",
              tipo: "concept",
            },
            {
              titulo: "Encapsulamento",
              descricao:
                "Convenções público/privado, properties; por que esconder detalhes.",
              tipo: "concept",
            },
            {
              titulo: "Herança",
              descricao:
                "Reaproveitar e especializar; super(); quando herança é má ideia.",
              tipo: "concept",
            },
            {
              titulo: "Polimorfismo",
              descricao:
                "Mesmo método, comportamentos diferentes; duck typing.",
              tipo: "concept",
            },
            {
              titulo: "Composição",
              descricao: "“Tem um” vs “é um”; preferir composição a herança.",
              tipo: "concept",
            },
            {
              titulo: "Métodos especiais",
              descricao: "__str__, __repr__, __eq__ básicos.",
              tipo: "concept",
            },
            {
              titulo: "Critério de saída de POO",
              descricao:
                "Decidir conscientemente quando usar classe e quando função resolve.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Estruturas de dados e algoritmos",
          itens: [
            {
              titulo: "Pilha e fila",
              descricao:
                "Conceito, operações, onde aparecem na vida real (undo, filas de tarefas).",
              tipo: "concept",
            },
            {
              titulo: "Lista ligada",
              descricao:
                "Conceito e diferença pra array (não precisa implementar de cor).",
              tipo: "concept",
            },
            {
              titulo: "Busca",
              descricao: "Linear vs binária; por que ordenação importa.",
              tipo: "concept",
            },
            {
              titulo: "Ordenação",
              descricao:
                "Bubble/insertion (entender), merge sort (intuição de dividir pra conquistar).",
              tipo: "concept",
            },
            {
              titulo: "Complexidade",
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
              titulo: "Módulos e imports",
              descricao: "Dividir um projeto em arquivos.",
              tipo: "concept",
            },
            {
              titulo: "Ambientes virtuais",
              descricao:
                "venv, pip, requirements.txt; por que isolar dependências.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Consumindo APIs",
          itens: [
            {
              titulo: "HTTP essencial",
              descricao:
                "Requisição/resposta, métodos (GET/POST), códigos de status.",
              tipo: "concept",
            },
            {
              titulo: "requests",
              descricao:
                "Consumir uma API real, tratar erro de rede, parsear JSON.",
              tipo: "concept",
            },
            {
              titulo: "Autenticação",
              descricao:
                "Token no header; guardar segredo em variável de ambiente.",
              tipo: "concept",
            },
            {
              titulo: "Paginação",
              descricao: "Consumir uma API paginada de ponta a ponta.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Testes",
          itens: [
            {
              titulo: "pytest básico",
              descricao:
                "Escrever testes pra funções puras; nomear bem; rodar no terminal.",
              tipo: "concept",
            },
            {
              titulo: "Casos de borda",
              descricao:
                "Pensar no que quebra: vazio, zero, negativo, formato errado.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "IoT (revisão dirigida)",
          itens: [
            {
              titulo: "Conceito e arquitetura IoT",
              descricao: "Sensor → gateway → nuvem; onde APIs entram nisso.",
              tipo: "concept",
            },
            {
              titulo: "Protocolos",
              descricao: "HTTP vs MQTT (visão geral de quando cada um serve).",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Matérias da faculdade",
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
      grupos: [
        {
          titulo: "Como a web funciona",
          itens: [
            {
              titulo: "Cliente/servidor",
              descricao:
                "O que acontece quando você digita uma URL e dá Enter (contar a história completa).",
              tipo: "concept",
            },
            {
              titulo: "HTTP na prática",
              descricao:
                "Métodos, status codes (200/301/404/500), headers; inspecionar na aba Network do DevTools.",
              tipo: "concept",
            },
            {
              titulo: "DNS e domínios",
              descricao: "Como um nome vira IP.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "HTML",
          itens: [
            {
              titulo: "Estrutura e semântica",
              descricao:
                "header/main/section/article/footer; por que semântica importa.",
              tipo: "concept",
            },
            {
              titulo: "Formulários",
              descricao: "Inputs, labels, validação nativa.",
              tipo: "concept",
            },
            {
              titulo: "Acessibilidade básica",
              descricao: "alt, hierarquia de headings, contraste.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "CSS",
          itens: [
            {
              titulo: "Box model",
              descricao:
                "margin/border/padding/content; display block vs inline.",
              tipo: "concept",
            },
            {
              titulo: "Flexbox",
              descricao:
                "Alinhar e distribuir qualquer coisa em uma dimensão.",
              tipo: "concept",
            },
            {
              titulo: "Grid",
              descricao: "Layouts em duas dimensões.",
              tipo: "concept",
            },
            {
              titulo: "Responsivo",
              descricao:
                "Media queries, mobile-first, unidades relativas (rem, %).",
              tipo: "concept",
            },
            {
              titulo: "Variáveis CSS e organização",
              descricao: "Manter um CSS que não vira espaguete.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "JavaScript no navegador (primeiro contato)",
          itens: [
            {
              titulo: "Sintaxe básica",
              descricao:
                "Variáveis (let/const), funções, condicionais — mapear do Python.",
              tipo: "concept",
            },
            {
              titulo: "DOM",
              descricao: "Selecionar, criar e modificar elementos.",
              tipo: "concept",
            },
            {
              titulo: "Eventos",
              descricao:
                "click, submit, input; prevenir comportamento padrão.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "UX/IHC (revisão dirigida)",
          itens: [
            {
              titulo: "Heurísticas de usabilidade",
              descricao:
                "Feedback, consistência, prevenção de erro (Nielsen, as 10).",
              tipo: "concept",
            },
            {
              titulo: "Hierarquia visual",
              descricao: "Tamanho, contraste e espaço guiando o olho.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Matérias da faculdade",
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
        "⭐ Fim deste bloco = pré-requisito mínimo da Pós Tech FIAP.",
      grupos: [
        {
          titulo: "A linguagem a fundo",
          itens: [
            {
              titulo: "Tipos e coerção",
              descricao: "== vs ===, truthy/falsy, null vs undefined.",
              tipo: "concept",
            },
            {
              titulo: "Escopo e hoisting",
              descricao: "var/let/const, escopo de bloco vs função.",
              tipo: "concept",
            },
            {
              titulo: "Arrow functions",
              descricao: "Sintaxe e diferença de this.",
              tipo: "concept",
            },
            {
              titulo: "Destructuring, spread, template literals",
              descricao: "Ler e escrever JS moderno com naturalidade.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Funções avançadas",
          itens: [
            {
              titulo: "Callbacks e higher-order functions",
              descricao: "Funções que recebem/retornam funções.",
              tipo: "concept",
            },
            {
              titulo: "Closures",
              descricao: "Explicar com um exemplo próprio (contador, cache).",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Objetos e protótipos",
          itens: [
            {
              titulo: "this",
              descricao: "Nos 4 contextos principais.",
              tipo: "concept",
            },
            {
              titulo: "Protótipos",
              descricao: "Como herança funciona por baixo do capô.",
              tipo: "concept",
            },
            {
              titulo: "Classes ES6",
              descricao:
                "Sintaxe e relação com protótipos; mapear da POO do Python.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Arrays de verdade",
          itens: [
            {
              titulo: "map / filter / reduce",
              descricao: "Transformar dados sem for; encadear operações.",
              tipo: "concept",
            },
            {
              titulo: "find, some, every, sort",
              descricao: "Escolher o método certo.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Assincronia (o coração do bloco)",
          itens: [
            {
              titulo: "Event loop",
              descricao:
                "Intuição: por que JS não trava esperando; call stack e fila.",
              tipo: "concept",
            },
            {
              titulo: "Promises",
              descricao: "Estados, then/catch, criar uma promise.",
              tipo: "concept",
            },
            {
              titulo: "async/await",
              descricao:
                "Reescrever then-chains; tratamento de erro com try/catch.",
              tipo: "concept",
            },
            {
              titulo: "fetch",
              descricao:
                "Consumir APIs com loading e erro tratados; Promise.all pra chamadas paralelas.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Módulos e qualidade",
          itens: [
            {
              titulo: "import/export",
              descricao: "Organizar um projeto em módulos ES.",
              tipo: "concept",
            },
            {
              titulo: "ESLint + Prettier",
              descricao:
                "Configurar uma vez, nunca mais discutir formatação.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Matérias da faculdade",
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
      grupos: [
        {
          titulo: "Node.js",
          itens: [
            {
              titulo: "Runtime e npm",
              descricao:
                "O que é o Node, package.json, scripts, node_modules.",
              tipo: "concept",
            },
            {
              titulo: "Assincronia no servidor",
              descricao: "Por que o modelo do Node escala.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Express e APIs REST",
          itens: [
            {
              titulo: "Rotas e verbos",
              descricao:
                "Desenhar uma API REST semântica (recursos, plural, aninhamento).",
              tipo: "concept",
            },
            {
              titulo: "Middlewares",
              descricao:
                "Entender a cadeia; criar um middleware próprio (log, auth).",
              tipo: "concept",
            },
            {
              titulo: "Status codes e erros",
              descricao:
                "Responder certo: 201, 400, 401, 404, 500; handler central de erros.",
              tipo: "concept",
            },
            {
              titulo: "Validação de entrada",
              descricao: "Nunca confiar no cliente; validar body/params.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "PostgreSQL e SQL de verdade",
          itens: [
            {
              titulo: "Modelagem",
              descricao:
                "Tabelas, chaves primárias/estrangeiras, relacionamentos 1-N e N-N.",
              tipo: "concept",
            },
            {
              titulo: "CRUD em SQL",
              descricao:
                "INSERT/SELECT/UPDATE/DELETE, WHERE, ORDER BY, LIMIT.",
              tipo: "concept",
            },
            {
              titulo: "JOINs",
              descricao: "INNER/LEFT; quando cada um.",
              tipo: "concept",
            },
            {
              titulo: "Agregações",
              descricao: "GROUP BY, COUNT/SUM/AVG.",
              tipo: "concept",
            },
            {
              titulo: "Índices e transações",
              descricao: "Intuição de performance; ACID em uma frase.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Integrando app e banco",
          itens: [
            {
              titulo: "Conexão Node ↔ Postgres",
              descricao:
                "Driver pg ou ORM leve (Prisma); prós e contras de ORM.",
              tipo: "concept",
            },
            {
              titulo: "Variáveis de ambiente",
              descricao:
                ".env, segredos fora do código, exemplo versionado (.env.example).",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Autenticação e segurança",
          itens: [
            {
              titulo: "Hash de senha",
              descricao: "bcrypt; por que nunca guardar senha em texto.",
              tipo: "concept",
            },
            {
              titulo: "JWT vs sessão",
              descricao:
                "Como funciona um token, expiração, refresh (noção).",
              tipo: "concept",
            },
            {
              titulo: "OWASP essencial",
              descricao:
                "SQL injection, XSS, auth quebrada — reconhecer e prevenir os 3.",
              tipo: "concept",
            },
            {
              titulo: "HTTPS e CORS",
              descricao: "O que são e por que o navegador reclama.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Matérias da faculdade",
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
            {
              titulo: "Refiz o projeto — Segurança da TI",
              tipo: "optional",
            },
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
      descricao: "Bloco 100% conteúdo novo — nenhuma matéria da faculdade.",
      grupos: [
        {
          titulo: "TypeScript",
          itens: [
            {
              titulo: "Tipos básicos",
              descricao: "Anotar variáveis, parâmetros e retornos.",
              tipo: "concept",
            },
            {
              titulo: "Interfaces e types",
              descricao: "Modelar objetos e respostas de API.",
              tipo: "concept",
            },
            {
              titulo: "Unions e narrowing",
              descricao: "string | null e como o TS te protege.",
              tipo: "concept",
            },
            {
              titulo: "Generics básicos",
              descricao: "Ler e usar (Array<T>, Promise<T>).",
              tipo: "concept",
            },
            {
              titulo: "tsconfig",
              descricao: "Entender strict e o processo de compilação.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "React",
          itens: [
            {
              titulo: "Componentes e JSX",
              descricao: "Pensar em componentes; props.",
              tipo: "concept",
            },
            {
              titulo: "Estado",
              descricao:
                "useState; fluxo de dados unidirecional; lifting state up.",
              tipo: "concept",
            },
            {
              titulo: "Efeitos",
              descricao:
                "useEffect sem tiro no pé (dependências, cleanup).",
              tipo: "concept",
            },
            {
              titulo: "Listas e formulários",
              descricao: "Keys, inputs controlados.",
              tipo: "concept",
            },
            {
              titulo: "Consumo de API",
              descricao:
                "fetch em React com loading/erro; custom hook simples.",
              tipo: "concept",
            },
            {
              titulo: "Roteamento",
              descricao:
                "React Router ou file-based (Next); navegação e parâmetros.",
              tipo: "concept",
            },
            {
              titulo: "Context",
              descricao: "Noção: quando prop drilling doeu demais.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Ecossistema e deploy",
          itens: [
            {
              titulo: "Vite/Next",
              descricao:
                "Criar projeto moderno; entender o que o framework resolve.",
              tipo: "concept",
            },
            {
              titulo: "Deploy na Vercel",
              descricao:
                "Conectar repo, preview deployments, variáveis de ambiente.",
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
      descricao: "Fim deste bloco = entrada confortável na Pós Tech FIAP.",
      grupos: [
        {
          titulo: "Engenharia de software",
          itens: [
            {
              titulo: "Ciclo de vida",
              descricao: "Da ideia ao deploy; cascata vs iterativo.",
              tipo: "concept",
            },
            {
              titulo: "Requisitos",
              descricao:
                "Funcionais vs não-funcionais; escrever user stories com critérios de aceite.",
              tipo: "concept",
            },
            {
              titulo: "Especificação e modelagem",
              descricao:
                "Caso de uso e diagrama de classes em nível de leitura.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Métodos ágeis e gestão",
          itens: [
            {
              titulo: "Scrum",
              descricao:
                "Papéis, cerimônias, artefatos; o que é (e o que não é) ágil.",
              tipo: "concept",
            },
            {
              titulo: "Kanban",
              descricao: "Fluxo, WIP limitado; montar um board de verdade.",
              tipo: "concept",
            },
            {
              titulo: "Gestão de projetos",
              descricao: "Escopo/prazo/custo, riscos (noção aplicada).",
              tipo: "concept",
            },
            {
              titulo: "Gestão de serviços",
              descricao:
                "ITIL em visão geral: incidente vs problema, SLA.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "DevOps e Cloud (fundamentos — aprofundamento é a pós)",
          itens: [
            {
              titulo: "Docker",
              descricao:
                "Imagem vs container, Dockerfile, docker compose; containerizar um app seu.",
              tipo: "concept",
            },
            {
              titulo: "CI/CD",
              descricao:
                "Pipeline no GitHub Actions: lint + testes a cada push.",
              tipo: "concept",
            },
            {
              titulo: "Cloud",
              descricao:
                "IaaS/PaaS/SaaS; onde Vercel/Railway/AWS se encaixam.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Mobile (fundamentos — aprofundamento é a pós)",
          itens: [
            {
              titulo: "Nativo vs híbrido",
              descricao: "Trade-offs; onde React Native e Flutter entram.",
              tipo: "concept",
            },
            {
              titulo: "React Native primeiro contato",
              descricao:
                "Criar um app simples (Expo), componentes básicos, navegação.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Matérias da faculdade",
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
              titulo:
                "Especificação de Sistemas de Informação — Revisado",
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
            {
              titulo: "Refiz o projeto — Projeto de SI",
              tipo: "optional",
            },
            {
              titulo: "Gestão de Projetos em Computação — Revisado",
              tipo: "review",
            },
            {
              titulo: "Refiz o projeto — Gestão de Projetos",
              tipo: "optional",
            },
            {
              titulo: "Gestão de Serviços de TI — Revisado",
              tipo: "review",
            },
            {
              titulo: "Refiz o projeto — Gestão de Serviços de TI",
              tipo: "optional",
            },
            { titulo: "DevOps — Revisado", tipo: "review" },
            { titulo: "Refiz o projeto — DevOps", tipo: "optional" },
            { titulo: "Cloud Computing — Revisado", tipo: "review" },
            {
              titulo: "Refiz o projeto — Cloud Computing",
              tipo: "optional",
            },
            {
              titulo:
                "Desenvolvimento para Dispositivos Móveis — Revisado",
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
