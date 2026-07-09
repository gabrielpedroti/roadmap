import type { SeedTrack } from "./tipos";

// Transcrição fiel de painel-de-estudos-kit/conteudo/trilha-ia.md
// Contexto: BPO financeiro. Precisão > velocidade. Cursos da Anthropic
// Academy aparecem DENTRO das etapas — não são trilha separada.

export const trilhaIa: SeedTrack = {
  slug: "ia",
  nome: "IA · Automação",
  cor: "#afa9ec",
  ordem: 2,
  blocos: [
    // ----------------------------------------------------------------
    {
      titulo: "Etapa 0 — Fundamentos",
      semanas: "2-4 semanas",
      comecaAberto: true,
      descricao:
        "Paralela à Etapa 1. Formação Fundamentos de IA (Alura): pulada — redundante com curso intro já em andamento.",
      grupos: [
        {
          titulo: "Cursos",
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
        "Carreira Alura (19 cursos). Fazer inteira, na ordem dos níveis. ROI imediato no trabalho.",
      grupos: [
        {
          titulo: "Base",
          itens: [
            { titulo: "Letramento em IA", tipo: "concept" },
            { titulo: "Gestão de Processos (Lean/RPA)", tipo: "concept" },
            { titulo: "IA no trabalho", tipo: "concept" },
          ],
        },
        {
          titulo: "Nível 1",
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
        "Carreira Alura (26 cursos). 🔒 Pré-requisito: Bloco 2 da trilha Dev concluído (POO + Python sólido). Nível 1 já virá ~80% feito da Etapa 1 (cursos compartilhados contam uma vez).",
      grupos: [
        {
          titulo: "Base",
          itens: [
            { titulo: "Pensamento computacional", tipo: "concept" },
            { titulo: "Python — IA Aplicada", tipo: "concept" },
          ],
        },
        {
          titulo: "Nível 1",
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
        "Carreira Alura (só o restante). Pular: bloco PyTorch/Deep Learning/Transformers/Difusão — fora do escopo BPO; retomar só se quiser seguir ML.",
      grupos: [
        {
          titulo: "Cursos",
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
