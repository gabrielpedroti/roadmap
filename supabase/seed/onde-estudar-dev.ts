import type { OndeEstudar } from "@/lib/types";

// ONDE ESTUDAR cada conceito da trilha Dev — transcrição do mapa do Gabriel
// ("MAPA DA TRILHA DEV — CONCEITO x ONDE ESTUDAR", jul/2026).
//
// A chave é o TÍTULO do conceito em supabase/seed/trilha-dev.ts. O run.ts
// valida: se uma chave daqui não casar com nenhum item, o seed FALHA — assim
// a gente descobre na hora se um título mudou de nome.
//
// Conceito sem entrada aqui simplesmente não mostra chip nenhum.

const alura = (tipo: "curso" | "trilha", nome: string): OndeEstudar => ({
  plataforma: "alura",
  tipo,
  nome,
});
const puc = (nome: string): OndeEstudar => ({
  plataforma: "puc",
  tipo: "materia",
  nome,
});
// Nano Courses gratuitos da FIAP (on.fiap.com.br/nano-courses). Como cada Nano
// é longo e só uma parte dele mapeia no conceito, o nome do chip carrega os
// capítulos que valem.
const fiap = (nome: string): OndeEstudar => ({
  plataforma: "fiap",
  tipo: "curso",
  nome,
});
// HackerRank: exercícios com juiz e certificações gratuitas. O nome do chip
// diz em que domínio do site estão os exercícios (ou "Certificação").
const hackerrank = (nome: string): OndeEstudar => ({
  plataforma: "hackerrank",
  tipo: "curso",
  nome,
});

// nomes repetidos — declarados uma vez pra não errar a grafia
const T_PRATICANDO = "Praticando Python";
const T_FRONT = "Desenvolvimento Front-end HTML/CSS/JS";
const T_HTML_CSS = "HTML e CSS para projetos web";
const T_NODE = "APIs com Node.js e Express";
const T_SQL = "SQL com PostgreSQL";
const T_REACT = "React com JavaScript";
const T_AGIL = "Gestão Ágil de Projetos";
const T_DEVOPS = "Começando em DevOps";
const T_RN = "Desenvolva seu primeiro app com React Native";
const C_PY_API = "Python: avance na OO e consuma API";
// Nano PYTHON DEVELOPMENT da FIAP (80h, 6 capítulos) — a versão ATUAL do
// curso de Python (o Nano "PYTHON" de 2018 saiu do plano, adendo de 26/08).
// É a fonte principal da base da linguagem no Bloco 1.
const N_PYTHON_DEV = "Nano PYTHON DEVELOPMENT";
const C_ALGO_2 = "Algoritmos II";
const C_JS_LING = "JavaScript: explorando a linguagem";
const C_NODE_API = "Node.js: crie sua primeira API com Express";
const M_RACIOCINIO = "Raciocínio Computacional";
const M_ORDENACAO = "Métodos de Pesquisa e Ordenação em Estruturas de Dados";
const M_IOT = "Fundamentos de IoT";
const M_WEB = "Fundamentos de Programação Web";
const M_TEC_WEB_1 = "Tecnologias para Desenvolvimento Web (parte 1)";
const M_TEC_WEB_2 = "Tecnologias para Desenvolvimento Web (parte 2)";
const M_BD = "Banco de Dados para TI";

export const ondeEstudarDev: Record<string, OndeEstudar[]> = {
  // ---------- BLOCO 1 ----------
  "O que é programação, áreas, carreira e próximos passos": [
    alura("curso", "Começando em Programação: carreira e primeiros passos"),
  ],

  "VS Code (uso produtivo)": [alura("curso", "VSCode: dicas e truques")],
  Terminal: [alura("curso", "Windows Prompt: utilizando o CMD")],

  "Controle de versão, ciclo (add/commit) e histórico": [
    alura("curso", "Git e GitHub: controle de versão"),
  ],
  "Branches, conflito, GitHub e colaboração": [
    alura("curso", "Git e GitHub: compartilhando e colaborando"),
  ],

  // Base da linguagem: a fonte principal é o Nano PYTHON DEVELOPMENT da FIAP.
  // A Alura sobrou onde o Nano não cobre: Strings e Regex, List
  // comprehensions e arquivos/CSV/JSON.
  "Variáveis, operadores, entrada/saída": [
    fiap(N_PYTHON_DEV),
    puc(M_RACIOCINIO),
  ],
  Condicionais: [fiap(N_PYTHON_DEV), puc(M_RACIOCINIO)],
  Laços: [fiap(N_PYTHON_DEV), puc(M_RACIOCINIO)],
  Funções: [fiap(N_PYTHON_DEV), puc(M_RACIOCINIO)],
  "Erros (try/except)": [fiap(N_PYTHON_DEV), puc(M_RACIOCINIO)],
  "Strings e Regex": [alura("curso", "Praticando Python: Strings e Regex")],

  "Listas e tuplas": [fiap(N_PYTHON_DEV), puc(M_RACIOCINIO)],
  "Dicionários e conjuntos": [fiap(N_PYTHON_DEV), puc(M_RACIOCINIO)],
  "List comprehensions": [alura("trilha", T_PRATICANDO)],

  "Ler/escrever texto, CSV e JSON": [alura("curso", C_PY_API)],

  "Lógica proposicional, bases numéricas, proporção/porcentagem": [
    puc("Matemática Aplicada à Computação"),
  ],

  // ---------- BLOCO 2 ----------
  "Classes, encapsulamento, herança, polimorfismo, composição e métodos especiais":
    [
      alura("curso", "Python: aplicando a Orientação a Objetos"),
      alura("curso", C_PY_API),
      puc("Fundamentos de POO"),
    ],

  "Pilha, fila e lista ligada": [
    alura("curso", "Estrutura de dados: pilhas, filas e listas com Python"),
    puc(M_ORDENACAO),
  ],
  "Busca (linear, binária)": [
    alura("curso", "Algoritmos II: MergeSort, QuickSort, Busca Binária"),
    puc(M_ORDENACAO),
  ],
  "Ordenação (bubble, insertion, merge)": [
    alura("curso", "Algoritmos I: Selection, Insertion"),
    alura("curso", C_ALGO_2),
    puc(M_ORDENACAO),
  ],
  "Complexidade (Big-O)": [alura("curso", C_ALGO_2), puc(M_ORDENACAO)],

  "Módulos e imports, ambientes virtuais (venv, pip)": [
    alura("curso", C_PY_API),
    alura("trilha", T_PRATICANDO),
  ],

  "HTTP, requests, autenticação (token), paginação": [
    alura("curso", C_PY_API),
    puc(M_IOT),
  ],

  "pytest e casos de borda": [
    alura("curso", "Python: testes automatizados e qualidade de código"),
  ],

  "Conceito e arquitetura, protocolos (HTTP vs MQTT)": [
    puc(M_IOT),
    puc("IoT em um Mundo Conectado"),
  ],

  // ---------- BLOCO 3 ----------
  "Cliente/servidor, HTTP na prática, DNS": [
    alura("trilha", T_FRONT),
    puc(M_WEB),
  ],
  "Estrutura/semântica, formulários, acessibilidade": [
    alura("trilha", T_HTML_CSS),
    puc(M_WEB),
  ],
  "Box model, flexbox, grid, responsivo (mobile-first), variáveis CSS": [
    alura("trilha", T_HTML_CSS),
    puc(M_WEB),
  ],
  "Sintaxe básica, DOM, eventos": [
    alura("curso", "JavaScript: construindo páginas dinâmicas"),
    puc(M_WEB),
  ],
  "Heurísticas de usabilidade, hierarquia visual": [
    puc("Interação Humano-Computador"),
  ],

  // ---------- BLOCO 4 ----------
  "Tipos e coerção (== vs ===), escopo, arrow functions, destructuring/spread": [
    alura("curso", C_JS_LING),
    alura("curso", "JavaScript: evoluindo a aplicação com ES6+"),
    puc(M_TEC_WEB_1),
  ],
  "Callbacks, higher-order, closures": [
    alura("curso", C_JS_LING),
    puc(M_TEC_WEB_1),
  ],
  "this, protótipos, classes ES6": [
    alura("curso", C_JS_LING),
    puc(M_TEC_WEB_1),
  ],
  "map/filter/reduce, find/some/every/sort": [
    alura("curso", "JavaScript: métodos de array"),
    puc(M_TEC_WEB_1),
  ],
  "Event loop, promises, async/await, fetch": [
    alura("curso", "JavaScript: entendendo promises e async/await"),
    alura("curso", "JS na web: CRUD com JavaScript assíncrono"),
    puc(M_TEC_WEB_1),
  ],
  "import/export, ESLint + Prettier": [
    alura("trilha", T_FRONT),
    puc(M_TEC_WEB_1),
  ],

  // ---------- BLOCO 5 ----------
  "Runtime, npm, assincronia no servidor": [
    alura("curso", C_NODE_API),
    puc(M_TEC_WEB_2),
  ],
  "Rotas e verbos, middlewares, status codes/erros, validação": [
    alura("curso", C_NODE_API),
    alura("curso", "Node.js: buscas, filtros e paginação"),
    puc(M_TEC_WEB_2),
  ],
  "Testes na API (Jest)": [
    alura("curso", "Node.js: testando API's REST e scripts assíncronos"),
  ],
  "Modelagem (PK/FK, 1-N, N-N), CRUD, JOINs, agregações, índices/transações": [
    alura("trilha", T_SQL),
    puc(M_BD),
  ],
  "NoSQL na prática — noção de banco de documentos": [
    alura("curso", "MongoDB: Modelagem de dados"),
    alura("curso", "MongoDB: realizando consultas"),
  ],
  "Conexão Node ↔ Postgres (pg/Prisma), variáveis de ambiente (.env)": [
    alura("trilha", T_NODE),
    puc(M_BD),
  ],
  "Hash de senha (bcrypt), JWT vs sessão, OWASP, HTTPS/CORS": [
    alura("trilha", T_NODE),
    alura("curso", "DevOps: tráfego seguro em comunicações web"),
    puc("Sistemas Web Seguros"),
    puc("Segurança da Tecnologia da Informação"),
  ],

  // ---------- BLOCO 6 ----------
  "Tipos, interfaces, unions/narrowing, generics, tsconfig": [
    alura("curso", "TypeScript parte 1: evoluindo seu JavaScript"),
    alura("curso", "TypeScript parte 2: avançando na linguagem"),
    alura("curso", "React: migrando para TypeScript"),
  ],
  "Princípios SOLID e código limpo — noção": [
    alura(
      "curso",
      "SOLID com TypeScript: aplicando boas práticas em orientação a objetos"
    ),
  ],
  "Componentes/JSX, estado, efeitos, listas/formulários, API, roteamento, context":
    [alura("trilha", T_REACT), alura("trilha", "Full Stack: React com Node.js")],
  "Testes de componente (Jest + Testing Library)": [
    alura(
      "curso",
      "React: escrevendo seus primeiros testes com Jest e Testing Library"
    ),
  ],
  "Vite/Next, deploy na Vercel": [alura("trilha", T_REACT)],

  // ---------- BLOCO 7 ----------
  "Ciclo de vida, requisitos (user stories), especificação e modelagem": [
    fiap("Nano ENGENHARIA DE SOFTWARE"),
    puc("Fundamentos de Engenharia de Software"),
    puc("Especificação de Sistemas de Informação"),
    puc("Projeto de Sistemas de Informação"),
  ],
  "Scrum e Kanban": [
    alura("curso", "Scrum: agilidade em seu projeto"),
    alura("trilha", T_AGIL),
    puc("Métodos Ágeis em TI"),
  ],
  "Gestão de projetos": [
    alura("trilha", T_AGIL),
    puc("Gestão de Projetos em Computação"),
  ],
  "Gestão de serviços (ITIL)": [puc("Gestão de Serviços de TI")],

  "Docker, CI/CD (GitHub Actions), Linux": [
    alura("trilha", T_DEVOPS),
    puc("DevOps"),
  ],
  "Cloud (IaaS/PaaS/SaaS)": [
    alura("curso", "Cloud: introdução"),
    puc("Cloud Computing"),
  ],

  "Nativo vs híbrido, React Native primeiro contato": [
    alura("trilha", T_RN),
    puc("Desenvolvimento para Dispositivos Móveis"),
  ],

  // ---------- CAMADA DE PRÁTICA (HackerRank) ----------
  // Bloco 1
  "Prática HackerRank — Python Development (94 exercícios)": [
    hackerrank("Python, Algorithms, Data Structures"),
  ],
  "Certificação HackerRank — Problem Solving (Basic)": [
    hackerrank("Certificação"),
  ],
  "Prática HackerRank — Strings e Regex (36 exercícios)": [
    hackerrank("Python, Algorithms"),
  ],
  "Prática HackerRank — lógica e coleções (55 exercícios)": [
    hackerrank("Algorithms, Interview Preparation Kit"),
  ],
  "Prática HackerRank — módulos e arquivos (20 exercícios)": [
    hackerrank("Python"),
  ],
  "Matemática aplicada — Databases › Basics of Sets and Relations #1 a #7": [
    hackerrank("Databases"),
  ],
  // Bloco 2
  "Prática HackerRank — POO (2 exercícios)": [hackerrank("Python")],
  "Prática HackerRank — pilhas, filas e listas ligadas (~38 exercícios)": [
    hackerrank("Data Structures, Interview Preparation Kit"),
  ],
  "Prática HackerRank — Algoritmos I: ordenação (10 exercícios)": [
    hackerrank("Algorithms"),
  ],
  "Prática HackerRank — Algoritmos II: busca e ordenação (23 exercícios)": [
    hackerrank("Algorithms, Interview Preparation Kit"),
  ],
  "Árvores e heap (HackerRank, 10) — além do roadmap": [
    hackerrank("Data Structures, Python"),
  ],
  "Certificação HackerRank — Problem Solving (Intermediate)": [
    hackerrank("Certificação"),
  ],
  "Certificação HackerRank — Software Engineer Intern (role)": [
    hackerrank("Certificação"),
  ],
  // Bloco 3
  "HTML por dentro (HackerRank, 3)": [hackerrank("Python")],
  "Certificação HackerRank — CSS (Basic)": [hackerrank("Certificação")],
  // Bloco 4
  "Certificação HackerRank — JavaScript (Basic)": [hackerrank("Certificação")],
  "Certificação HackerRank — JavaScript (Intermediate)": [
    hackerrank("Certificação"),
  ],
  // Bloco 5
  "Certificação HackerRank — Node (Basic)": [hackerrank("Certificação")],
  "Certificação HackerRank — Node.js (Intermediate)": [
    hackerrank("Certificação"),
  ],
  "Prática HackerRank — SQL básico e agregação (37 exercícios)": [
    hackerrank("SQL"),
  ],
  "Certificação HackerRank — SQL (Basic)": [hackerrank("Certificação")],
  "Prática HackerRank — JOINs e select avançado (13 exercícios)": [
    hackerrank("SQL"),
  ],
  "Certificação HackerRank — SQL (Intermediate)": [hackerrank("Certificação")],
  "Databases (múltipla escolha) — revisão da matéria Banco de Dados": [
    hackerrank("Databases"),
  ],
  "SQL avançado (HackerRank, 8) — além do roadmap": [hackerrank("SQL")],
  "Certificação HackerRank — Rest API (Intermediate)": [
    hackerrank("Certificação"),
  ],
  "Certificação HackerRank — Software Engineer (role)": [
    hackerrank("Certificação"),
  ],
  // Bloco 6
  "Prática HackerRank — React (10 desafios)": [hackerrank("React")],
  "Certificação HackerRank — React (Basic)": [hackerrank("Certificação")],
  "Certificação HackerRank — Frontend Developer (React) (role)": [
    hackerrank("Certificação"),
  ],
  // Bloco 7
  "Prática HackerRank — Linux Shell (~60 exercícios)": [
    hackerrank("Linux Shell"),
  ],
};
