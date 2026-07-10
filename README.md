# Roadmap

Web app de acompanhamento de estudos com 3 trilhas (Dev, IA · Automação, Inglês), pomodoro com auto-registro, streak de constância e metas de volume. Os roadmaps e o pomodoro são **públicos** (não precisa de conta); login por magic link salva progresso, sessões e streak.

**Stack:** Next.js (App Router) + TypeScript + Tailwind v4 · Supabase (Postgres + Auth) · Vercel.

- 🚀 **Como colocar no ar (passo a passo pra leigos):** [docs/GUIA-ATIVACAO.md](docs/GUIA-ATIVACAO.md)
- 📋 Plano de implementação: [PLANO-V1.md](PLANO-V1.md) · Auditoria técnica: [docs/AUDITORIA-V1.md](docs/AUDITORIA-V1.md)
- 🎨 Visual aprovado: [docs/mockups/proposta-final.html](docs/mockups/proposta-final.html) — tema segue o sistema (claro/escuro automático)
- 🤖 Convenções pro Claude Code: [CLAUDE.md](CLAUDE.md)

## Rodando localmente

1. `npm install`
2. Copie `.env.local.example` para `.env.local` e preencha (ver o [guia](docs/GUIA-ATIVACAO.md)).
3. `npm run dev` → http://localhost:3000

## Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | servidor de desenvolvimento |
| `npm test` | testes das regras de progresso e streak (vitest) |
| `npm run seed` | popula as trilhas no Supabase |
| `npm run build` | build de produção |
| `npm run lint` | ESLint |

O CI (GitHub Actions) roda lint + testes + build a cada push.

## Regras de negócio principais

- **Progresso do bloco:** projeto = 30%; conceitos + revisões dividem 70%; opcionais não contam. Bloco sem projeto: obrigatórios dividem 100%.
- **Progresso da trilha:** média dos blocos ponderada pelo nº de itens obrigatórios.
- **Desbloqueio:** sequencial por trilha + pré-requisito cruzado (IA Etapa 2 ← Dev Bloco 2).
- **Streak ≠ metas:** streak = constância (mínimo diário nos dias que contam; a chama 🔥 só acende quando o mínimo de HOJE foi cumprido); metas = volume (h/semana, h/mês). Pausa do pomodoro não conta como estudo.
- **Pomodoro sem trilha:** dá pra rodar o timer sem selecionar trilha (clicar de novo desmarca) — nesse caso o foco não é registrado.
- **Fuso horário:** timestamps em UTC no banco; dias/semanas/meses calculados em America/Sao_Paulo.

## ⚠️ Avisos importantes

- **Nunca** rode `npm audit fix --force` (o npm sugere um downgrade destrutivo do Next).
- **Nunca** rode `npm run seed -- --force` depois que houver progresso real — apaga os checks de todos os usuários.
- No plano gratuito, o Supabase **pausa o projeto após ~1 semana sem uso**; se o login parar do nada, reative no dashboard (Restore project).
- A service role key fica só no `.env.local` — nunca no git, nunca na Vercel.
