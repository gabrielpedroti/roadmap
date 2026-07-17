import type { SeedTrack } from "./tipos";

// Trilha IA · Automação — guiada por CARREIRA / CURSO (mapa do Gabriel, jul/2026)
// Contexto: BPO financeiro. Precisão > velocidade.
// Espinha: 3 carreiras Alura (3 certificados) + Anthropic Academy (grátis, com
// cert) + reforço Coursera/DIO/DeepLearning. Regra de ouro: curso compartilhado
// entre carreiras é feito UMA vez — por isso cada carreira lista SÓ os cursos
// novos dela (os "[já feito]" não se repetem).
//
// A badge de cada item vem da `fonte` do grupo (Alura, Anthropic, DIO...).

export const trilhaIa: SeedTrack = {
  slug: "ia",
  nome: "IA · Automação",
  descricao:
    "IA e automação aplicadas ao BPO financeiro: 3 carreiras Alura (3 certificados) + Anthropic Academy, das ferramentas no-code até agentes com a API do Claude — sempre com precisão acima de velocidade.",
  cor: "#D97757", // laranja Claude
  ordem: 2,
  blocos: [
    // ----------------------------------------------------------------
    {
      titulo: "Etapa 0 — Fundamentos",
      semanas: "2-4 semanas",
      comecaAberto: true,
      descricao:
        "Panorama de IA, base de programação e mindset com Claude. A base de programação NÃO é obrigatória — faça só se ainda não tiver o conhecimento.",
      grupos: [
        {
          titulo: "Conceitual — você já fez",
          fonte: "dio",
          itens: [
            {
              titulo: "Fundamentos de Inteligência Artificial",
              descricao:
                "Panorama de IA: machine learning, NLP, IA generativa e agentes.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Programação (base das Carreiras 2 e 3)",
          fonte: "alura",
          itens: [
            {
              titulo:
                "Pensamento computacional: fundamentos da computação e lógica de programação",
              descricao:
                "8h. Você já cobre isso na lógica da trilha Dev — dá pra pular ou fazer rápido.",
              tipo: "concept",
            },
            {
              titulo: "Python: Inteligência Artificial Aplicada",
              descricao:
                "12h. Porta de entrada Python→IA (precisa do seu Python dos Blocos 1-2 do Dev). Não é exigido pela Carreira 1 (low-code); é base das Carreiras 2 e 3.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Mindset (grátis + certificado)",
          fonte: "anthropic",
          itens: [
            { titulo: "AI Fluency: Framework & Foundations", tipo: "concept" },
            { titulo: "Claude 101", tipo: "concept" },
          ],
        },
      ],
    },
    // ----------------------------------------------------------------
    {
      titulo: "Carreira 1 — IA para Automação de Processos",
      comecaAberto: true,
      descricao:
        "Carreira Alura de IA para Automação — ROI imediato no trabalho. Ao concluir os 3 níveis: 🎓 certificado da Carreira 1.",
      grupos: [
        {
          titulo: "Base (20h)",
          fonte: "alura",
          itens: [
            {
              titulo:
                "Letramento em IA: competências essenciais e domínio crítico",
              tipo: "concept",
            },
            {
              titulo:
                "Gestão de Processos: mapeamento e automação com Lean e RPA",
              tipo: "concept",
            },
            {
              titulo: "IA no trabalho: produtividade com assistentes e agentes",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Nível 1 — Construção de Automações (75h)",
          fonte: "alura",
          itens: [
            {
              titulo:
                "Prompt Engineering: projetando e automatizando interações com LLMs",
              tipo: "concept",
            },
            {
              titulo: "Power Automate: criando fluxos de trabalho automatizados",
              tipo: "concept",
            },
            {
              titulo:
                "Power Automate: automatizando tarefas de um analista de dados",
              tipo: "concept",
            },
            {
              titulo: "Copilot Studio: fundamentos e automação",
              tipo: "concept",
            },
            {
              titulo:
                "Automação de processos com n8n: modelagem de fluxos e integração de sistemas",
              tipo: "concept",
            },
            {
              titulo: "Automação de processos com n8n: coleta e análise de dados",
              tipo: "concept",
            },
            {
              titulo:
                "Gemini no Google Sheets: planilhas com IA e fluxos entre aplicativos",
              tipo: "concept",
            },
            {
              titulo:
                "Claude Cowork: produtividade e gestão de projetos inteligente",
              tipo: "concept",
            },
            {
              titulo:
                "Codex: assistentes, skills e fluxos de trabalho inteligentes",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Nível 2 — IA aplicada aos Processos (50h)",
          fonte: "alura",
          itens: [
            {
              titulo: "Excel: manipulação avançada de dados e automação com IA",
              tipo: "concept",
            },
            {
              titulo:
                "Agentes de IA com Gemini: automatize fluxos no Google Workspace",
              tipo: "concept",
            },
            {
              titulo: "Copilot Studio: criando solução multiagentes",
              tipo: "concept",
            },
            {
              titulo: "Claude Cowork: integrações e fluxos de projeto",
              tipo: "concept",
            },
            { titulo: "Claude Cowork: orquestração de agentes", tipo: "concept" },
            {
              titulo:
                "Automação de processos com n8n: integração de bases de conhecimento",
              tipo: "concept",
            },
            {
              titulo:
                "Automação de processos com n8n: integração de APIs REST",
              descricao: "Chave dos lançamentos automáticos do BPO.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Nível 3 — Automação Inteligente em Ambiente Corporativo",
          fonte: "alura",
          itens: [
            {
              titulo: "Automação Inteligente em Ambiente Corporativo",
              descricao: "Em breve — acompanhar o lançamento.",
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
              descricao: "Revisão dirigida junto ao Excel + IA deste nível.",
              tipo: "review",
            },
          ],
        },
      ],
    },
    // ----------------------------------------------------------------
    {
      titulo: "Carreira 2 — Especialista em IA",
      descricao:
        "Carreira Alura Especialista em IA — o núcleo técnico do agente do BPO. 🔒 Exige o Bloco 2 do Dev (Python sólido). A base (Pensamento computacional + Python IA) e o Nível 1 já vêm da Etapa 0 e da Carreira 1. Ao concluir: 🎓 certificado da Carreira 2.",
      grupos: [
        {
          titulo: "Nível 1 — novidade",
          fonte: "alura",
          itens: [
            {
              titulo:
                "Langflow: criação e orquestração de fluxos e agentes de IA",
              descricao:
                "Único curso novo do Nível 1 — o resto você já fez na Carreira 1.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Nível 2 — Arquitetura de sistemas com agentes (74h)",
          fonte: "alura",
          itens: [
            {
              titulo: "Inteligência artificial: preparação para o mercado",
              tipo: "concept",
            },
            {
              titulo:
                "Arquiteturas RAG com LLMs: embeddings, busca semântica e agentes com LangChain",
              tipo: "concept",
            },
            { titulo: "LangChain: técnicas avançadas de RAG", tipo: "concept" },
            {
              titulo: "LangGraph: orquestrando agentes e multiagentes",
              tipo: "concept",
            },
            {
              titulo:
                "Protocolos e arquitetura para agentes: MCP, A2A, AG-UI e BFA",
              tipo: "concept",
            },
            {
              titulo:
                "Model Context Protocol (MCP): otimização de agentes de IA com n8n",
              tipo: "concept",
            },
            {
              titulo:
                "Hugging Face: explorando e aplicando soluções com modelos de IA",
              tipo: "concept",
            },
            {
              titulo:
                "CrewAI: orquestração e desenvolvimento de sistemas multiagentes",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Nível 3 — Operação e governança (57h)",
          fonte: "alura",
          itens: [
            {
              titulo:
                "Observabilidade para LLMs: monitoramento e avaliação com LangFuse",
              tipo: "concept",
            },
            {
              titulo:
                "Governança de Inteligência Artificial: fundamentos, riscos e boas práticas",
              tipo: "concept",
            },
            {
              titulo: "IA aplicada a Produto: estratégias e soluções digitais",
              tipo: "concept",
            },
            {
              titulo: "Empreendendo com IA: da ideação ao modelo de negócio",
              tipo: "concept",
            },
            {
              titulo: "Pipelines de IA em Cloud: Azure, AWS e GCP",
              tipo: "concept",
            },
            {
              titulo:
                "MLFlow: gerenciamento de experimentos e integração com IA generativa",
              tipo: "concept",
            },
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
                "Tool use e structured outputs — o coração do agente do BPO.",
              tipo: "concept",
            },
            { titulo: "Introduction to MCP", tipo: "concept" },
            { titulo: "MCP: Advanced Topics", tipo: "concept" },
          ],
        },
        {
          titulo: "Reforço opcional",
          itens: [
            {
              titulo: "Docs Anthropic: Building effective agents",
              descricao:
                "Leitura OBRIGATÓRIA antes de codar o projeto: workflows, chaining, routing, orchestrator-workers. Bate com a regra “precisão vem da arquitetura”.",
              tipo: "optional",
              fonte: "anthropic",
            },
            {
              titulo:
                "Coursera: IBM RAG and Agentic AI (Professional Certificate)",
              descricao: "Reforça as Etapas 2 e 3. Usar auxílio financeiro.",
              tipo: "optional",
              fonte: "coursera",
            },
            {
              titulo: "DeepLearning.AI: short courses de LangChain, RAG e agentes",
              descricao: "Rápidos; reforçam agentes e RAG.",
              tipo: "optional",
              fonte: "deeplearning",
            },
            {
              titulo: "Automação com n8n (25h)",
              descricao: "Reforça a Carreira 1 (n8n). Grátis, bolsa Santander.",
              tipo: "optional",
              fonte: "dio",
            },
          ],
        },
        {
          titulo: "🏗️ Projeto-âncora da trilha (30%)",
          itens: [
            {
              titulo: "Agente Claude via API",
              descricao:
                "Recebe planilha bagunçada → extrai/classifica → valida em código → lança via API do sistema. O caso real do BPO, seguindo a “constituição”: LLM nunca faz conta nem lançamento; agente só na ambiguidade; validação de schema em código; human-in-the-loop acima de um limite de valor; logs e reconciliação diária.",
              tipo: "project",
            },
          ],
        },
      ],
    },
    // ----------------------------------------------------------------
    {
      titulo: "Carreira 3 — Engenharia de Agentes de IA",
      descricao:
        "Carreira Alura Engenharia de Agentes — cobre a matéria Técnicas de Machine Learning da PUC. A base e o Nível 1 já vêm da Carreira 2. A parte pesada (Deep Learning com PyTorch) roda junto da pós FIAP. Ao concluir: 🎓 certificado da Carreira 3.",
      grupos: [
        {
          titulo: "Base + Nível 1 — novidades",
          fonte: "alura",
          itens: [
            {
              titulo: "LangChain e Python: criando ferramentas com a OpenAI",
              tipo: "concept",
            },
            {
              titulo: "Clusterização: lidando com dados sem rótulo",
              tipo: "concept",
            },
            {
              titulo:
                "NLP: aplicando processamento de linguagem natural para análise de sentimentos",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Nível 2 — Machine Learning, Deep Learning e Fine Tuning (72h)",
          fonte: "alura",
          itens: [
            {
              titulo: "Redes Neurais: Deep Learning com PyTorch",
              tipo: "concept",
            },
            {
              titulo: "Treinando uma Rede Neural: Deep Learning com PyTorch",
              tipo: "concept",
            },
            {
              titulo: "Redes Neurais Recorrentes (RNN) com PyTorch",
              tipo: "concept",
            },
            {
              titulo: "Redes Neurais Convolucionais (CNN) com PyTorch",
              tipo: "concept",
            },
            {
              titulo: "Modelos de Difusão: fundamentos e aplicações avançadas",
              tipo: "concept",
            },
            {
              titulo: "Transformers: fundamentos e prática com PyTorch",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Nível 3 — MLOps e AIOps (74h)",
          fonte: "alura",
          itens: [
            {
              titulo:
                "Integração contínua para LLMs: GitHub Actions e Deepeval",
              tipo: "concept",
            },
            {
              titulo: "Data Science: testando relações com Regressão Linear",
              tipo: "concept",
            },
            {
              titulo: "Hugging Face: transferindo aprendizado de modelos de NLP",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "🎓 Anthropic Academy (junto da pós FIAP)",
          fonte: "anthropic",
          itens: [
            { titulo: "Claude Code 101", tipo: "concept" },
            { titulo: "Claude Code in Action", tipo: "concept" },
            { titulo: "Claude Code Skills", tipo: "concept" },
            { titulo: "Claude Code Subagents", tipo: "concept" },
          ],
        },
        {
          titulo: "🏁 Formação Claude Cowork (fechar o certificado)",
          fonte: "alura",
          itens: [
            {
              titulo:
                "Claude Cowork: casos de uso em gestão, produto e marketing",
              descricao:
                "Por último, só pra fechar o certificado da formação Cowork — o resto você já fez dentro das carreiras. 4h.",
              tipo: "concept",
            },
          ],
        },
        {
          titulo: "Matérias da faculdade",
          fonte: "ads-pucpr",
          itens: [
            {
              titulo: "Técnicas de Machine Learning — Revisado",
              descricao:
                "Coberta pelos cursos de ML e Deep Learning desta carreira.",
              tipo: "review",
            },
          ],
        },
      ],
    },
  ],
};
