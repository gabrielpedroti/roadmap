import type { SeedTrack } from "./tipos";

// Transcrição fiel de painel-de-estudos-kit/conteudo/trilha-ingles.md
// Recap A1 → B2: transformar vocabulário passivo em produção.
// Estruturas = conceitos (70%); check de saída FALADO = projeto (30%).
// Critério de avanço: "produzo isso falando, sem pausa longa".

export const trilhaIngles: SeedTrack = {
  slug: "ingles",
  nome: "Inglês",
  descricao:
    "Recap A1 → B2 com foco em produção: transformar o inglês passivo em inglês FALADO. Regra 50/50 — metade consumo, metade produção.",
  cor: "#58CC02", // verde Duolingo
  ordem: 3,
  blocos: [
    // ----------------------------------------------------------------
    {
      titulo: "Passo 0 — Diagnóstico",
      comecaAberto: true,
      descricao:
        "Ponto de partida: o teste EF SET mostra o nível real, sem achismo.",
      grupos: [
        {
          titulo: "Diagnóstico",
          itens: [
            {
              titulo: "EF SET (efset.org)",
              descricao:
                "Gratuito, ~50 min, certificado CEFR. Refazer a cada 3 meses.",
              tipo: "concept",
            },
          ],
        },
      ],
    },
    // ----------------------------------------------------------------
    {
      titulo: "Nível A1 — Fundação",
      semanas: "~3-4 semanas de revisão",
      comecaAberto: true,
      descricao:
        "As estruturas básicas que precisam sair falando, sem pensar.",
      grupos: [
        {
          titulo: "Estruturas",
          itens: [
            {
              titulo: "Verb to be (am/is/are)",
              descricao: "Afirmativa, negativa, pergunta.",
              tipo: "concept",
            },
            {
              titulo: "Pronomes",
              descricao: "I/you/he · my/your · mine/yours.",
              tipo: "concept",
            },
            {
              titulo: "Artigos (a/an/the) e plural",
              descricao: "Regular + irregulares: man→men.",
              tipo: "concept",
            },
            {
              titulo: "Present simple",
              descricao: "he workS; do/does em perguntas e negativas.",
              tipo: "concept",
            },
            { titulo: "There is / There are", tipo: "concept" },
            {
              titulo: "Question words",
              descricao: "what, where, when, who, why, how.",
              tipo: "concept",
            },
            {
              titulo: "Preposições in/on/at",
              descricao: "Lugar e tempo.",
              tipo: "concept",
            },
            { titulo: "Can / can't", tipo: "concept" },
            {
              titulo: "Números, horas, datas, dias, meses",
              tipo: "concept",
            },
            { titulo: "Imperativo", tipo: "concept" },
          ],
        },
        {
          titulo: "🎤 Check de saída (30%)",
          itens: [
            {
              titulo: "Apresentar-se por 2 min falando",
              descricao:
                "Nome, trabalho, rotina, gostos — sem travar. Tema de conversa: daily routine, my job at the office.",
              tipo: "project",
            },
          ],
        },
      ],
    },
    // ----------------------------------------------------------------
    {
      titulo: "Nível A2 — Passado e planos",
      semanas: "~4-6 semanas",
      descricao: "Contar o que aconteceu ontem e o que vem amanhã.",
      grupos: [
        {
          titulo: "Estruturas",
          itens: [
            {
              titulo: "Past simple",
              descricao: "Regulares (-ed) e irregulares principais.",
              tipo: "concept",
            },
            {
              titulo: "Present continuous",
              descricao: "E diferença p/ present simple.",
              tipo: "concept",
            },
            {
              titulo: "Futuro: going to vs will",
              descricao: "going to (planos) vs will (decisões/previsões).",
              tipo: "concept",
            },
            { titulo: "Comparativo e superlativo", tipo: "concept" },
            {
              titulo: "Countable/uncountable",
              descricao: "+ some, any, much, many, a lot of.",
              tipo: "concept",
            },
            { titulo: "Advérbios de frequência", tipo: "concept" },
            { titulo: "Like/love/hate + -ing", tipo: "concept" },
            {
              titulo: "Object pronouns",
              descricao: "me, him, us, them.",
              tipo: "concept",
            },
            {
              titulo: "Conectores básicos",
              descricao: "and, but, because, so, then.",
              tipo: "concept",
            },
            {
              titulo: "Would like / Let's / How about",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "🎤 Check de saída (30%)",
          itens: [
            {
              titulo:
                "Contar o que fez ontem e o que vai fazer amanhã, 3 min falando",
              descricao:
                "Tema: what I did at work this week, my study plans.",
              tipo: "project",
            },
          ],
        },
      ],
    },
    // ----------------------------------------------------------------
    {
      titulo: "Nível B1 — Autonomia",
      semanas: "~2-3 meses",
      descricao:
        "Condicionais, modais e voz passiva — conversa de verdade, com opinião.",
      grupos: [
        {
          titulo: "Estruturas",
          itens: [
            {
              titulo: "Present perfect",
              descricao: "E a diferença crucial p/ past simple.",
              tipo: "concept",
            },
            {
              titulo: "Past continuous",
              descricao: "I was working when...",
              tipo: "concept",
            },
            { titulo: "1ª e 2ª condicionais", tipo: "concept" },
            {
              titulo: "Modais",
              descricao: "should, must, have to, might, could.",
              tipo: "concept",
            },
            {
              titulo: "Voz passiva",
              descricao: "Presente e passado.",
              tipo: "concept",
            },
            {
              titulo: "Relative clauses",
              descricao: "who, which, that, where.",
              tipo: "concept",
            },
            { titulo: "Reported speech básico", tipo: "concept" },
            { titulo: "Used to", tipo: "concept" },
            {
              titulo: "Gerúndio vs infinitivo",
              descricao: "stop doing / decide to do.",
              tipo: "concept",
            },
            {
              titulo: "Phrasal verbs comuns",
              descricao: "find out, set up, give up, look for.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "🎤 Check de saída (30%)",
          itens: [
            {
              titulo:
                "Explicar um problema e propor solução falando 5 min",
              descricao:
                "Ex.: uma automação que você fez. Tema: explaining my n8n workflows, describing a bug, giving opinions.",
              tipo: "project",
            },
          ],
        },
      ],
    },
    // ----------------------------------------------------------------
    {
      titulo: "Nível B2 — Consolidação",
      semanas: "~3-4 meses",
      descricao:
        "Nuances, conectores formais e inglês profissional por escrito e falado.",
      grupos: [
        {
          titulo: "Estruturas",
          itens: [
            { titulo: "Present perfect continuous", tipo: "concept" },
            { titulo: "Past perfect", tipo: "concept" },
            { titulo: "3ª condicional e mistas", tipo: "concept" },
            {
              titulo: "Passiva avançada",
              descricao:
                "it's being processed / it should have been sent.",
              tipo: "concept",
            },
            { titulo: "Reported speech completo", tipo: "concept" },
            { titulo: "Wish / If only", tipo: "concept" },
            {
              titulo: "Causative",
              descricao: "have/get something done.",
              tipo: "concept",
            },
            {
              titulo: "Modais de dedução",
              descricao: "must have been, can't have been.",
              tipo: "concept",
            },
            {
              titulo: "Conectores formais",
              descricao:
                "although, despite, however, therefore, whereas.",
              tipo: "concept",
            },
            {
              titulo:
                "Collocations, phrasal verbs ampliados, discourse markers",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "🎤 Check de saída (30%)",
          itens: [
            {
              titulo: "Discutir tema abstrato 10 min + escrita profissional",
              descricao:
                "Ex.: vantagens/riscos de IA no trabalho. + Escrever um e-mail profissional e um README em inglês sem tradutor.",
              tipo: "project",
            },
          ],
        },
      ],
    },
  ],
};
