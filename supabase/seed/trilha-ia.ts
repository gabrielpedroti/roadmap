import type { SeedTrack } from "./tipos";

// Transcrição fiel de painel-de-estudos-kit/conteudo/trilha-ia.md
// Contexto: BPO financeiro. Precisão > velocidade. Cursos da Anthropic
// Academy aparecem DENTRO das etapas — não são trilha separada.

export const trilhaIa: SeedTrack = {
  slug: "ia",
  nome: "IA · Automação",
  descricao:
    "IA e automação aplicadas ao BPO financeiro: das ferramentas no-code (Power Automate, n8n) até agentes com a API do Claude — sempre com precisão acima de velocidade.",
  cor: "#D97757", // laranja Claude
  ordem: 2,
  blocos: [
    // ----------------------------------------------------------------
    {
      titulo: "Etapa 0 — Fundamentos",
      semanas: "2-4 semanas",
      comecaAberto: true,
      descricao:
        "Fundamentos de web, APIs e webhooks + primeiros cursos da Anthropic Academy. Corre em paralelo com a Etapa 1.",
      grupos: [
        {
          titulo: "🎓 DIO",
          fonte: "dio",
          itens: [
            {
              titulo: "Formação Fundamentos de Inteligência Artificial",
              descricao: "Em andamento — base de fundamentos de IA pela DIO.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Cursos",
          fonte: "alura",
          itens: [
            {
              titulo: "HTTP: entendendo a web por baixo dos panos (Alura)",
              tipo: "concept",
            },
            {
              titulo: "APIs REST: consumo, autenticação, JSON",
              tipo: "concept",
            },
            {
              titulo: "Webhooks na prática com n8n",
              descricao: "Uma API “ao contrário”.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "🎓 Anthropic Academy",
          fonte: "anthropic",
          itens: [
            {
              titulo: "AI Fluency — Framework & Foundations",
              descricao: "anthropic.skilljar.com",
              tipo: "concept",
            },
            { titulo: "Claude 101", tipo: "concept" },
            { titulo: "Introduction to Claude Cowork", tipo: "concept" },
          ],
        },
      ],
    },
    // ----------------------------------------------------------------
    {
      titulo: "Etapa 1 — IA para Automação de Processos",
      comecaAberto: true,
      descricao:
        "Carreira Alura de IA para Automação de Processos: Power Automate, Copilot Studio, n8n e Excel com IA — retorno imediato no trabalho.",
      grupos: [
        {
          titulo: "Base",
          fonte: "alura",
          itens: [
            { titulo: "Letramento em IA", tipo: "concept" },
            { titulo: "Gestão de Processos (Lean/RPA)", tipo: "concept" },
            { titulo: "IA no trabalho", tipo: "concept" },
          ],
        },
        {
          titulo: "Nível 1",
          fonte: "alura",
          itens: [
            { titulo: "Prompt Engineering", tipo: "concept" },
            { titulo: "Power Automate (curso 1)", tipo: "concept" },
            { titulo: "Power Automate (curso 2)", tipo: "concept" },
            { titulo: "Copilot Studio", tipo: "concept" },
            { titulo: "n8n — fluxos", tipo: "concept" },
            { titulo: "n8n — coleta/análise", tipo: "concept" },
            { titulo: "Gemini no Sheets", tipo: "concept" },
            { titulo: "Claude Cowork", tipo: "concept" },
            { titulo: "Codex", tipo: "concept" },
          ],
        },
        {
          titulo: "Nível 2",
          fonte: "alura",
          itens: [
            { titulo: "Excel avançado com IA", tipo: "concept" },
            { titulo: "Agentes com Gemini (Workspace)", tipo: "concept" },
            { titulo: "Copilot Studio multiagentes", tipo: "concept" },
            { titulo: "Claude Cowork (avançado 1)", tipo: "concept" },
            { titulo: "Claude Cowork (avançado 2)", tipo: "concept" },
            { titulo: "n8n — bases de conhecimento", tipo: "concept" },
            {
              titulo: "n8n — integração de APIs REST",
              descricao: "← chave p/ lançamentos automáticos.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Extras",
          fonte: "alura",
          itens: [
            {
              titulo: "pandas — manipulação de planilhas em Python",
              descricao: "Essencial p/ o conversor com precisão.",
              tipo: "concept",
            },
            {
              titulo: "N3: “Em breve” — acompanhar lançamentos",
              tipo: "optional",
            },
          ],
        },
        {
          titulo: "Matérias da faculdade",
          fonte: "ads-pucpr",
          itens: [
            {
              titulo:
                "Inteligência Analítica em Negócios (Power BI) — Revisado",
              descricao: "Revisão dirigida junto ao Excel+IA desta etapa.",
              tipo: "review",
            },
          ],
        },
      ],
    },
    // ----------------------------------------------------------------
    {
      titulo: "Etapa 2 — Especialista em IA",
      descricao:
        "Especialista em IA: RAG, LangChain, MCP e o projeto-âncora — o agente Claude do caso real do BPO. 🔒 Exige o Bloco 2 da trilha Dev (Python sólido).",
      grupos: [
        {
          titulo: "Base",
          fonte: "alura",
          itens: [
            { titulo: "Pensamento computacional", tipo: "concept" },
            { titulo: "Python — IA Aplicada", tipo: "concept" },
          ],
        },
        {
          titulo: "Nível 1",
          fonte: "alura",
          itens: [
            {
              titulo: "Langflow",
              descricao: "Único restante do nível.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Nível 2",
          fonte: "alura",
          itens: [
            { titulo: "Arquiteturas RAG com LangChain", tipo: "concept" },
            { titulo: "LangChain RAG avançado", tipo: "concept" },
            { titulo: "LangGraph (multiagentes)", tipo: "concept" },
            { titulo: "Protocolos MCP/A2A/AG-UI/BFA", tipo: "concept" },
            { titulo: "MCP com n8n", tipo: "concept" },
            { titulo: "Hugging Face", tipo: "concept" },
            { titulo: "CrewAI", tipo: "concept" },
          ],
        },
        {
          titulo: "Nível 3",
          fonte: "alura",
          itens: [
            {
              titulo: "Observabilidade de LLMs (LangFuse)",
              tipo: "concept",
            },
            { titulo: "Governança de IA", tipo: "concept" },
            { titulo: "IA aplicada a Produto", tipo: "concept" },
            { titulo: "Empreendendo com IA", tipo: "concept" },
            {
              titulo: "Pipelines de IA em Cloud (Azure/AWS/GCP)",
              tipo: "concept",
            },
            { titulo: "MLFlow", tipo: "concept" },
          ],
        },
        {
          titulo: "🎓 Anthropic Academy",
          fonte: "anthropic",
          itens: [
            { titulo: "Claude Platform 101", tipo: "concept" },
            {
              titulo: "Building with the Claude API",
              descricao:
                "Tool use, structured outputs — o coração do agente do BPO.",
              tipo: "concept",
            },
            {
              titulo: "Introduction to Model Context Protocol",
              tipo: "concept",
            },
            { titulo: "MCP — Advanced Topics", tipo: "concept" },
          ],
        },
        {
          titulo: "🏗️ Projeto-âncora da trilha (30%)",
          itens: [
            {
              titulo: "Agente Claude via API",
              descricao:
                "Recebe planilha bagunçada → extrai/classifica → valida em código → lança via API do sistema. O caso real do BPO, seguindo a “constituição” da trilha: LLM nunca faz conta nem lançamento; agente só na ambiguidade; validação de schema em código; human-in-the-loop acima de um limite de valor; logs e reconciliação diária.",
              tipo: "project",
            },
          ],
        },
      ],
    },
    // ----------------------------------------------------------------
    {
      titulo: "Etapa 3 — Engenharia de Agentes de IA",
      descricao:
        "Engenharia de agentes: CI para LLMs e os cursos de Claude Code da Anthropic Academy.",
      grupos: [
        {
          titulo: "Cursos",
          fonte: "alura",
          itens: [
            { titulo: "LangChain e Python com OpenAI", tipo: "concept" },
            {
              titulo: "CI para LLMs (GitHub Actions + Deepeval)",
              tipo: "concept",
            },
            {
              titulo: "Clusterização e NLP",
              descricao: "Se sobrar fôlego.",
              tipo: "optional",
            },
          ],
        },
        {
          titulo: "🎓 Anthropic Academy",
          fonte: "anthropic",
          itens: [
            {
              titulo: "Claude Code 101",
              descricao: "Fazer junto com a pós FIAP.",
              tipo: "concept",
            },
            { titulo: "Claude Code in Action", tipo: "concept" },
            { titulo: "Introduction to agent skills", tipo: "concept" },
            { titulo: "Introduction to subagents", tipo: "concept" },
          ],
        },
        {
          titulo: "Matérias da faculdade",
          fonte: "ads-pucpr",
          itens: [
            {
              titulo: "Técnicas de Machine Learning — Revisado",
              descricao: "Conceitos revisitados nas Etapas 2-3.",
              tipo: "review",
            },
          ],
        },
      ],
    },
  ],
};
