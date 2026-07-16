import type { OndeEstudar } from "@/lib/types";

// ONDE ESTUDAR cada conceito da trilha Dev — transcrição do mapa do Gabriel
// ("Mapa Trilha Dev - conceitos e fontes.txt", jul/2026).
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

// trilhas/cursos repetidos — declarados uma vez pra não errar o nome
const T_ZERO = "A partir do zero: iniciante em programação";
const T_PYTHON_OO = "Aprenda a programar em Python com OO";
const T_PRATICANDO = "Praticando Python";
const T_FRONT = "Desenvolvimento Front-end HTML/CSS/JS";
const T_HTML_CSS = "HTML e CSS para projetos web";
const T_NODE = "APIs com Node.js e Express";
const T_SQL = "SQL com PostgreSQL";
const T_REACT = "React com JavaScript";
const T_AGIL = "Gestão Ágil de Projetos";
const T_DEVOPS = "Começando em DevOps";
const T_RN = "Desenvolva seu primeiro app com React Native";
const C_VSCODE = "VSCode: dicas e truques";
const C_GIT_1 = "Git e GitHub: controle de versão";
const C_GIT_2 = "Git e GitHub: compartilhando e colaborando";
const C_JS_LING = "JavaScript: explorando a linguagem";
const C_JS_ASYNC = "JavaScript: entendendo promises e async/await";
const M_RACIOCINIO = "Raciocínio Computacional";
const M_MATEMATICA = "Matemática Aplicada à Computação";
const M_POO = "Fundamentos de POO";
const M_ORDENACAO = "Métodos de Pesquisa e Ordenação em Estruturas de Dados";
const M_IOT = "Fundamentos de IoT";
const M_WEB = "Fundamentos de Programação Web";
const M_IHC = "Interação Humano-Computador";
const M_TEC_WEB_1 = "Tecnologias para Desenvolvimento Web (parte 1)";
const M_TEC_WEB_2 = "Tecnologias para Desenvolvimento Web (parte 2)";
const M_BD = "Banco de Dados para TI";
const M_WEB_SEGURO = "Sistemas Web Seguros";
const M_AGEIS = "Métodos Ágeis em TI";
const M_MOBILE = "Desenvolvimento para Dispositivos Móveis";

export const ondeEstudarDev: Record<string, OndeEstudar[]> = {
  // ---------- BLOCO 1 ----------
  "Instalar e configurar Python + VS Code": [alura("curso", C_VSCODE)],
  "VS Code proficiente": [alura("curso", C_VSCODE)],
  "Terminal básico": [alura("curso", "Windows Prompt: utilizando o CMD")],

  "O que é controle de versão": [alura("curso", C_GIT_1)],
  "Ciclo básico": [alura("curso", C_GIT_1)],
  Histórico: [alura("curso", C_GIT_1)],
  Branches: [alura("curso", C_GIT_2)],
  GitHub: [alura("curso", C_GIT_2)],
  "Fluxo diário": [alura("curso", C_GIT_2)],

  "Variáveis e tipos": [alura("trilha", T_ZERO), puc(M_RACIOCINIO)],
  Operadores: [alura("trilha", T_ZERO), puc(M_RACIOCINIO)],
  "Entrada e saída": [alura("trilha", T_PYTHON_OO), puc(M_RACIOCINIO)],
  Condicionais: [alura("trilha", T_ZERO), puc(M_RACIOCINIO)],
  Laços: [alura("trilha", T_ZERO), puc(M_RACIOCINIO)],
  Funções: [alura("trilha", T_PYTHON_OO), puc(M_RACIOCINIO)],
  Erros: [alura("trilha", T_PYTHON_OO), puc(M_RACIOCINIO)],

  Listas: [alura("trilha", T_PYTHON_OO), puc(M_RACIOCINIO)],
  Dicionários: [alura("trilha", T_PYTHON_OO), puc(M_RACIOCINIO)],
  "Tuplas e sets": [alura("trilha", T_PYTHON_OO), puc(M_RACIOCINIO)],
  "List comprehensions": [alura("trilha", T_PRATICANDO), puc(M_RACIOCINIO)],

  "Ler e escrever arquivos texto": [alura("trilha", T_PYTHON_OO)],
  CSV: [alura("trilha", T_PRATICANDO)],
  JSON: [alura("trilha", T_PRATICANDO)],

  "Lógica proposicional": [puc(M_MATEMATICA)],
  "Bases numéricas": [puc(M_MATEMATICA)],
  "Proporção e porcentagem aplicadas": [puc(M_MATEMATICA)],

  // ---------- BLOCO 2 ----------
  "Classes e objetos": [alura("trilha", T_PYTHON_OO), puc(M_POO)],
  Encapsulamento: [alura("trilha", T_PYTHON_OO), puc(M_POO)],
  Herança: [alura("trilha", T_PYTHON_OO), puc(M_POO)],
  Polimorfismo: [alura("trilha", T_PYTHON_OO), puc(M_POO)],
  Composição: [alura("trilha", T_PRATICANDO), puc(M_POO)],
  "Métodos especiais": [alura("trilha", T_PRATICANDO), puc(M_POO)],
  // "Critério de saída de POO" não tem fonte — é autoavaliação

  "Pilha e fila": [
    alura("curso", "Estrutura de dados: pilhas, filas e listas com Python"),
    puc(M_ORDENACAO),
  ],
  "Lista ligada": [
    alura("curso", "Estrutura de dados: pilhas, filas e listas com Python"),
    puc(M_ORDENACAO),
  ],
  Busca: [alura("curso", "Algoritmos II"), puc(M_ORDENACAO)],
  Ordenação: [
    alura("curso", "Algoritmos I"),
    alura("curso", "Algoritmos II"),
    puc(M_ORDENACAO),
  ],
  Complexidade: [alura("curso", "Algoritmos II"), puc(M_ORDENACAO)],

  "Módulos e imports": [alura("trilha", T_PYTHON_OO)],
  "Ambientes virtuais": [alura("trilha", T_PRATICANDO)],

  "HTTP essencial": [
    alura("curso", "Python: avance na OO e consuma API"),
    puc(M_IOT),
  ],
  requests: [alura("curso", "Python: avance na OO e consuma API"), puc(M_IOT)],
  Autenticação: [
    alura("curso", "Python: avance na OO e consuma API"),
    puc(M_IOT),
  ],
  Paginação: [alura("curso", "Python: avance na OO e consuma API")],

  "pytest básico": [
    alura("curso", "Python: testes automatizados e qualidade de código"),
  ],
  "Casos de borda": [
    alura("curso", "Python: testes automatizados e qualidade de código"),
  ],

  "Conceito e arquitetura IoT": [puc(M_IOT)],
  Protocolos: [puc("IoT em um Mundo Conectado")],

  // ---------- BLOCO 3 ----------
  "Cliente/servidor": [alura("trilha", T_FRONT), puc(M_WEB)],
  "HTTP na prática": [alura("trilha", T_FRONT), puc(M_WEB)],
  "DNS e domínios": [puc(M_WEB)],

  "Estrutura e semântica": [alura("trilha", T_HTML_CSS), puc(M_WEB)],
  Formulários: [alura("trilha", T_HTML_CSS), puc(M_WEB)],
  "Acessibilidade básica": [alura("trilha", T_HTML_CSS), puc(M_IHC)],

  "Box model": [alura("trilha", T_HTML_CSS), puc(M_WEB)],
  Flexbox: [alura("trilha", T_HTML_CSS), puc(M_WEB)],
  Grid: [alura("trilha", T_HTML_CSS), puc(M_WEB)],
  Responsivo: [alura("trilha", T_HTML_CSS), puc(M_WEB)],
  "Variáveis CSS e organização": [alura("trilha", T_HTML_CSS)],

  "Sintaxe básica": [alura("trilha", T_FRONT), puc(M_WEB)],
  DOM: [alura("trilha", T_FRONT), puc(M_WEB)],
  Eventos: [alura("trilha", T_FRONT), puc(M_WEB)],

  "Heurísticas de usabilidade": [puc(M_IHC)],
  "Hierarquia visual": [puc(M_IHC)],

  // ---------- BLOCO 4 ----------
  "Tipos e coerção": [alura("curso", C_JS_LING), puc(M_TEC_WEB_1)],
  "Escopo e hoisting": [alura("curso", C_JS_LING), puc(M_TEC_WEB_1)],
  "Arrow functions": [alura("curso", C_JS_LING), puc(M_TEC_WEB_1)],
  "Destructuring, spread, template literals": [
    alura("curso", C_JS_LING),
    puc(M_TEC_WEB_1),
  ],

  "Callbacks e higher-order functions": [
    alura("curso", C_JS_LING),
    puc(M_TEC_WEB_1),
  ],
  Closures: [alura("curso", C_JS_LING), puc(M_TEC_WEB_1)],

  this: [alura("curso", C_JS_LING), puc(M_TEC_WEB_1)],
  Protótipos: [alura("curso", C_JS_LING), puc(M_TEC_WEB_1)],
  "Classes ES6": [alura("curso", C_JS_LING), puc(M_TEC_WEB_1)],

  "map / filter / reduce": [
    alura("curso", "JavaScript: métodos de array"),
    puc(M_TEC_WEB_1),
  ],
  "find, some, every, sort": [alura("trilha", T_FRONT), puc(M_TEC_WEB_1)],

  "Event loop": [alura("curso", C_JS_ASYNC), puc(M_TEC_WEB_1)],
  Promises: [alura("curso", C_JS_ASYNC), puc(M_TEC_WEB_1)],
  "async/await": [alura("curso", C_JS_ASYNC), puc(M_TEC_WEB_1)],
  fetch: [
    alura("curso", "JS na web: CRUD com JavaScript assíncrono"),
    puc(M_TEC_WEB_1),
  ],

  "import/export": [alura("trilha", T_FRONT), puc(M_TEC_WEB_1)],
  "ESLint + Prettier": [alura("trilha", T_FRONT)],

  // ---------- BLOCO 5 ----------
  "Runtime e npm": [alura("trilha", T_NODE), puc(M_TEC_WEB_2)],
  "Assincronia no servidor": [alura("trilha", T_NODE), puc(M_TEC_WEB_2)],

  "Rotas e verbos": [alura("trilha", T_NODE), puc(M_TEC_WEB_2)],
  Middlewares: [alura("trilha", T_NODE), puc(M_TEC_WEB_2)],
  "Status codes e erros": [alura("trilha", T_NODE), puc(M_TEC_WEB_2)],
  "Validação de entrada": [alura("trilha", T_NODE), puc(M_WEB_SEGURO)],

  Modelagem: [alura("trilha", T_SQL), puc(M_BD)],
  "CRUD em SQL": [alura("trilha", T_SQL), puc(M_BD)],
  JOINs: [alura("trilha", T_SQL), puc(M_BD)],
  Agregações: [alura("trilha", T_SQL), puc(M_BD)],
  "Índices e transações": [alura("trilha", T_SQL), puc(M_BD)],

  "Conexão Node ↔ Postgres": [alura("trilha", T_NODE), puc(M_BD)],
  "Variáveis de ambiente": [alura("trilha", T_NODE)],

  "Hash de senha": [alura("trilha", T_NODE), puc(M_WEB_SEGURO)],
  "JWT vs sessão": [alura("trilha", T_NODE), puc(M_WEB_SEGURO)],
  "OWASP essencial": [puc("Segurança da Tecnologia da Informação")],
  "HTTPS e CORS": [alura("trilha", T_NODE), puc(M_WEB_SEGURO)],

  // ---------- BLOCO 6 ----------
  "Tipos básicos": [alura("trilha", "TypeScript (parte 1)")],
  "Interfaces e types": [alura("trilha", "TypeScript (parte 1)")],
  "Unions e narrowing": [alura("trilha", "TypeScript (parte 2)")],
  "Generics básicos": [alura("trilha", "TypeScript (parte 2)")],
  tsconfig: [alura("trilha", "TypeScript (parte 1)")],

  "Componentes e JSX": [alura("trilha", T_REACT)],
  Estado: [alura("trilha", T_REACT)],
  Efeitos: [alura("trilha", T_REACT)],
  "Listas e formulários": [alura("trilha", T_REACT)],
  "Consumo de API": [alura("trilha", T_REACT)],
  Roteamento: [alura("trilha", T_REACT)],
  Context: [alura("trilha", T_REACT)],

  "Vite/Next": [alura("trilha", T_REACT)],
  "Deploy na Vercel": [alura("trilha", T_REACT)],

  // ---------- BLOCO 7 ----------
  "Ciclo de vida": [puc("Fundamentos de Engenharia de Software")],
  Requisitos: [puc("Especificação de Sistemas de Informação")],
  "Especificação e modelagem": [puc("Projeto de Sistemas de Informação")],

  Scrum: [alura("curso", "Scrum: agilidade em seu projeto"), puc(M_AGEIS)],
  Kanban: [alura("trilha", T_AGIL), puc(M_AGEIS)],
  "Gestão de projetos": [
    alura("trilha", T_AGIL),
    puc("Gestão de Projetos em Computação"),
  ],
  "Gestão de serviços": [puc("Gestão de Serviços de TI")],

  Docker: [alura("trilha", T_DEVOPS), puc("DevOps")],
  "CI/CD": [alura("trilha", T_DEVOPS), puc("DevOps")],
  Cloud: [alura("curso", "Cloud: introdução"), puc("Cloud Computing")],

  "Nativo vs híbrido": [alura("trilha", T_RN), puc(M_MOBILE)],
  "React Native primeiro contato": [alura("trilha", T_RN), puc(M_MOBILE)],
};
