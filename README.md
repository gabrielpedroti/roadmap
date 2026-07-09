# Painel de Estudos

Web app pessoal de acompanhamento de estudos com 3 trilhas (Dev, IA · Automação, Inglês), pomodoro com auto-registro, streak de constância e metas de volume.

**Stack:** Next.js (App Router) + TypeScript + Tailwind · Supabase (Postgres + Auth por magic link) · Vercel.

O plano de implementação está em [PLANO-V1.md](PLANO-V1.md). A especificação (fonte de verdade) fica em `painel-de-estudos-kit/SPEC-APP.md` (pasta fora do git).

## Rodando localmente

1. `npm install`
2. Copie `.env.local.example` para `.env.local` e preencha com URL e chaves do Supabase (Dashboard → Settings → API).
3. `npm run dev` → http://localhost:3000

## Setup do Supabase (uma vez)

1. **Schema:** abra o SQL Editor no dashboard do Supabase, cole o conteúdo de `supabase/migrations/0001_schema.sql` e execute.
2. **Seed das trilhas:** `npm run seed` (usa a service role key do `.env.local`). Para re-seedar do zero: `npm run seed -- --force` (apaga os checks de todos os usuários!).
3. **Auth:**
   - Authentication → URL Configuration → **Site URL**: a URL da Vercel; **Redirect URLs**: adicionar `http://localhost:3000/auth/callback` e `https://SEU-APP.vercel.app/auth/callback`.
   - Authentication → Sessions: conferir que **Time-box user sessions** e **Inactivity timeout** estão DESLIGADOS (padrão) — é o que garante a sessão persistente por meses.
   - O e-mail padrão do Supabase tem limite baixo de envios/hora — suficiente para uso pessoal.

## Deploy na Vercel

1. Importar o repositório do GitHub na Vercel.
2. Environment Variables: `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` (a service role key NÃO vai pra Vercel).
3. Deploy. Depois, conferir a Redirect URL do Supabase com o domínio final.

## Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | servidor de desenvolvimento |
| `npm test` | testes das regras de progresso e streak (vitest) |
| `npm run seed` | popula as trilhas no Supabase |
| `npm run build` | build de produção |
| `npm run lint` | ESLint |

## Regras de negócio principais

- **Progresso do bloco:** projeto = 30%; conceitos + revisões dividem 70%; opcionais não contam. Bloco sem projeto: obrigatórios dividem 100%.
- **Progresso da trilha:** média dos blocos ponderada pelo nº de itens obrigatórios.
- **Desbloqueio:** sequencial por trilha + pré-requisito cruzado (IA Etapa 2 ← Dev Bloco 2).
- **Streak ≠ metas:** streak = constância (mínimo diário nos dias que contam); metas = volume (h/semana, h/mês). Pausa do pomodoro não conta como estudo.
- **Fuso horário:** timestamps em UTC no banco; dias/semanas/meses calculados em America/Sao_Paulo.
