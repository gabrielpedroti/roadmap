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

// nomes repetidos — declarados uma vez pra não errar a grafia
const T_INICIANTE = "Iniciante em programação";
const T_PRATICANDO = "Praticando Python";
const T_FRONT = "Desenvolvimento Front-end HTML/CSS/JS";
const T_HTML_CSS = "HTML e CSS para projetos web";
const T_NODE = "APIs com Node.js e Express";
const T_SQL = "SQL com PostgreSQL";
const T_REACT = "React com JavaScript";
const T_AGIL = "Gestão Ágil de Projetos";
const T_DEVOPS = "Começando em DevOps";
const T_RN = "Desenvolva seu primeiro app com React Native";
const C_PY_PRIMEIRA = "Python: crie a sua primeira aplicação";
const C_PY_API = "Python: avance na OO e consuma API";
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

  "Variáveis, operadores, entrada/saída": [
    alura("curso", C_PY_PRIMEIRA),
    alura("trilha", T_INICIANTE),
    puc(M_RACIOCINIO),
  ],
  Condicionais: [
    alura("curso", C_PY_PRIMEIRA),
    alura("curso", "Praticando Python: condicionais if, elif e else"),
    puc(M_RACIOCINIO),
  ],
  Laços: [
    alura("curso", C_PY_PRIMEIRA),
    alura("curso", "Praticando Python: laços for e while"),
    puc(M_RACIOCINIO),
  ],
  Funções: [
    alura("curso", C_PY_PRIMEIRA),
    alura("curso", "Praticando Python: funções"),
    puc(M_RACIOCINIO),
  ],
  "Erros (try/except)": [alura("curso", C_PY_PRIMEIRA), puc(M_RACIOCINIO)],
  "Strings e Regex": [alura("curso", "Praticando Python: Strings e Regex")],

  "Listas e tuplas": [
    alura("curso", "Praticando Python: listas e tuplas"),
    puc(M_RACIOCINIO),
  ],
  "Dicionários e conjuntos": [
    alura("curso", "Praticando Python: conjuntos e dicionários"),
    puc(M_RACIOCINIO),
  ],
  "List comprehensions": [alura("trilha", T_PRATICANDO)],

  "Ler/escrever texto, CSV e JSON": [alura("curso", C_PY_API)],

  // (DIO a confirmar)
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
  "Modelagem (PK/FK, 1-N, N-N), CRUD, JOINs, agregações, índices/transações": [
    alura("trilha", T_SQL),
    puc(M_BD),
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
  "Componentes/JSX, estado, efeitos, listas/formulários, API, roteamento, context":
    [alura("trilha", T_REACT), alura("trilha", "Full Stack: React com Node.js")],
  "Vite/Next, deploy na Vercel": [alura("trilha", T_REACT)],

  // ---------- BLOCO 7 ----------
  "Ciclo de vida, requisitos (user stories), especificação e modelagem": [
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
};
