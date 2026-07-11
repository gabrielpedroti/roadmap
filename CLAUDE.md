# Roadmap — guia para o Claude Code (e pro Gabriel do futuro)

App pessoal de acompanhamento de estudos: 3 trilhas (Dev, IA · Automação, Inglês), pomodoro com auto-registro, streak e metas. Next.js (App Router) + TypeScript + Tailwind v4 + Supabase (Postgres + Auth magic link). Deploy na Vercel.

## Comandos

| Comando | O quê |
|---|---|
| `npm run dev` | dev server em localhost:3000 |
| `npm test` | vitest — regras de progresso e streak (devem SEMPRE passar) |
| `npm run lint` | ESLint |
| `npm run build` | build de produção (CI roda os três a cada push) |
| `npm run seed` | popula as trilhas no Supabase (service role no .env.local) |

## Regras do projeto (não rediscutir)

- **Dono é dev iniciante**: código simples e didático > código esperto; comentários curtos em PT-BR explicando decisões não-óbvias.
- **Progresso**: projeto 30% / concept+review dividem 70% / optional fora. Bloco sem projeto: obrigatórios valem 100%. Tudo em `lib/progress.ts` (funções puras + testes).
- **Streak ≠ metas** (constância vs volume). Fuso fixo America/Sao_Paulo (`lib/streak.ts`). A chama 🔥 só acende se o mínimo de HOJE foi cumprido.
- **Acesso público**: visualizar roadmaps e usar pomodoro NÃO exige login; salvar (checks, sessões, settings) exige. RLS: conteúdo legível por `anon`, dados de usuário só do dono.
- **Sessão persistente por meses**: cookies via `@supabase/ssr` + refresh no `proxy.ts`. Nunca trocar `getUser()` por `getSession()` no middleware.
- **Tema segue o SISTEMA** (prefers-color-scheme); sem botão de tema. Tokens em `app/globals.css`; cores por trilha vêm do banco (`tracks.cor`) e são clareadas no escuro via `.com-cor`/`color-mix`. Visual aprovado: `docs/mockups/proposta-final.html`.
- Cores: Dev bordô PUCPR `#9D2235` (Pantone 201) · IA laranja Claude `#D97757` · Inglês verde Duolingo `#58CC02` · ação azul `#0071E3`/`#0A84FF`.

## Cuidados

- **NUNCA** rodar `npm audit fix --force` (instala next@9, destrói o projeto).
- **NUNCA** rodar `npm run seed -- --force` com progresso real no banco (apaga user_checks de todos, por cascata).
- `.env.local` nunca é commitado; a SERVICE_ROLE_KEY nunca vai pra Vercel.
- O README é VITRINE (portfólio/LinkedIn) e o Gabriel edita o texto dele — respeitar. `docs/` só tem docs ÚTEIS pra quem visita (guia de ativação, como criar a sua trilha, como atualizar conteúdo). Material interno de trabalho (plano, PRODUCT.md do design, auditoria, mockup aprovado) vive em `.agents/context/` — git-ignorado, só pro Claude. A SPEC original fica fora do git em `painel-de-estudos-kit/`.
- Tags nos itens (em `components/ListaBlocos.tsx`, por título do grupo): review → "ADS PUC-PR" (bordô), grupo com "Anthropic" → "Anthropic" (laranja), grupo com "DIO" → "DIO" (roxo #8E4DFF), optional → "opcional" (neutra). Nada de "não conta"/"faculdade".
- Pomodoro: o MODO (automático / só-foco / só-pausa) é definido por quais TEMPOS estão selecionados — `focoMin`/`pausaMin` podem ser `null` (fase não selecionada); clicar no tempo já selecionado o desmarca. NÃO existe botão de ligar/desligar fase. O relógio usa UM setInterval fixo chamando `tickRef.current()` — não voltar ao padrão de recriar interval em useEffect com deps (congelava a pausa).
- Cor no texto (nome de trilha, título): `--cor` e a classe `.com-cor` precisam estar no MESMO elemento (senão `--cor-texto` calcula sem a cor). Fundo/blur de vidro vão INLINE (Lightning CSS remove backdrop-filter da folha).
- Adicionar conteúdo com progresso já existente: use uma migration idempotente (ex.: `0003_curso_dio.sql`), NÃO `seed --force` (apaga user_checks).

## Estrutura

- `app/` — páginas (dashboard `/`, `/trilha/[slug]`, `/login`, rotas de auth)
- `components/` — Pomodoro, Constancia, ListaBlocos, modais…
- `lib/` — regras de negócio puras + clients Supabase (`lib/supabase/`)
- `supabase/migrations/` — SQL (aplicar no SQL Editor do dashboard)
- `supabase/seed/` — conteúdo das trilhas transcrito + script de seed
