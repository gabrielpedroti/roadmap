# Auditoria técnica — Painel de Estudos v1

**Data:** julho/2026 · **Escopo:** todo o repositório (commit `efc9f87`) — arquitetura, segurança, organização, documentação e escalabilidade.
**Método:** análise manual do código + `npm audit` + `npm outdated` + typecheck/testes/build. Priorização pela fórmula **(Impacto + Risco) × (6 − Esforço)**, cada fator de 1 a 5 — quanto maior a nota, mais urgente.

> Contexto que pesa na avaliação: app **pessoal**, v1 recém-nascida, dono é dev iniciante que vai refatorar o código como aprendizado. Vários "débitos" abaixo foram decisões conscientes da SPEC (ex.: não polir antes da v1) — estão marcados como tal.

---

## 1. Pontos fortes (o que está saudável)

- **RLS desde a primeira migration** em todas as tabelas, com isolamento por `auth.uid()` — o requisito de segurança nº 1 da SPEC está no banco, não confiado ao app.
- **Regras de negócio em funções puras** ([lib/progress.ts](../lib/progress.ts), [lib/streak.ts](../lib/streak.ts)) com **28 testes** cobrindo a regra 30/70, opcionais, média ponderada, desbloqueio cruzado e fuso horário.
- **Sessão persistente no padrão oficial** do `@supabase/ssr` (cookies + renovação no proxy), sem gambiarra.
- **Seed versionado e conferível**: conteúdo transcrito em TS, contagens batem com os `.md` do kit (Dev 175 · IA 57 · Inglês 45 itens).
- **Dependências mínimas**: só Supabase + Next + Tailwind (+ vitest/tsx/dotenv em dev). Nada pra apodrecer à toa.
- Código comentado no ponto certo (decisões não-óbvias), estrutura convencional do Next.

---

## 2. Achados, por categoria

### 🔐 Segurança

| ID | Achado | Nota |
|---|---|---|
| S1 | **Integridade dos dados não é imposta no servidor.** O RLS garante *quem* escreve, mas não *o quê*: pelo console do navegador dá pra inserir sessão de 100.000 min, com `ended_at` antes de `started_at`, data futura, ou marcar itens de blocos bloqueados. Só corrompe os próprios dados (app pessoal), mas quebra streak/metas silenciosamente. **Correção:** constraints na migration 0002 (`ended_at > started_at`, `duration_min <= 1440`, `started_at <= now()`). | **20** |
| S3 | **2 vulnerabilidades moderadas** no `npm audit`: postcss < 8.5.10 (XSS no stringify), dependência **transitiva do Next**, superfície de build — não roda com input de usuário. **Correção:** atualizar o Next quando sair patch. ⚠️ **NÃO rodar `npm audit fix --force`** — ele instalaria `next@9.3.3` (downgrade destrutivo sugerido erroneamente pelo npm). | **15** |
| S2 | **Cadastro aberto** (qualquer e-mail cria conta) — é requisito da SPEC, mas significa que qualquer pessoa com a URL consome seu free tier. Mitigado pelo rate limit do e-mail do Supabase. Aceitável agora; se incomodar, allowlist de e-mails no futuro. | 12 |
| S4 | Sem cabeçalhos de segurança extras (CSP, X-Frame-Options). O Next cobre o básico; app sem conteúdo de terceiros tem superfície pequena. Adicionar `headers()` no `next.config.ts` quando sobrar tempo. | 12 |
| S5 | `user_settings` sem validação no banco (aceitaria meta 0 ou negativa via API; o formulário impede). Juntar com S1 na migration 0002. | 10 |

O que **não** encontrei (procurei): vazamento de service role key (só no `.env.local`, ignorado e com `.example` limpo), open redirect no callback (destino fixo), SQL injection (tudo via SDK parametrizado), dados de um usuário visíveis a outro (RLS cobre).

### 🏛️ Arquitetura

| ID | Achado | Nota |
|---|---|---|
| A1 | **Tipos do banco mantidos à mão** ([lib/types.ts](../lib/types.ts)) com casts `as Track[]` em [lib/dados.ts](../lib/dados.ts). Se o schema mudar, o TypeScript **não avisa** — o erro só aparece em runtime. **Correção:** gerar tipos com `npx supabase gen types typescript` e importar no client (elimina os casts). | **24** |
| A2 | `carregarPainel()` busca **tudo para toda tela** (a tela de trilha carrega sessões que não usa). Com ~277 itens e um usuário, irrelevante; com estatísticas v2 e histórico grande, vira lentidão. Decisão consciente pela simplicidade — registrar e revisitar na v2. | 12 |
| A3 | Escritas feitas **direto do client** nos componentes (inserts de sessões/checks). Padrão válido com RLS, mas espalha a lógica; Server Actions centralizariam validação (resolve junto com S1). Refatoração natural pra v2 — e ótimo exercício de aprendizado. | 8 |
| A5 | Registro manual **não cruza meia-noite** (23:30 → 00:30 dá erro de validação). Limitação conhecida; contornável registrando em duas partes. | 8 |
| A6 | Cliques muito rápidos no mesmo checkbox podem gerar conflito de chave primária (o segundo insert chega antes do primeiro terminar) e reverter visualmente. Raro e sem corrupção — o estado se corrige. | 8 |
| A4 | `getUser()` no proxy = 1 chamada de rede ao Supabase por navegação. É o padrão oficial (necessário pra renovar o token); latência aceitável. Registrado como custo conhecido, **não mexer**. | 2 |

### 📁 Organização

| ID | Achado | Nota |
|---|---|---|
| O1 | **Sem CI.** Lint, testes e build só rodam na sua máquina — um push quebrado chega quebrado na Vercel. **Correção (quick win nº 1):** GitHub Actions com `lint + test + build` a cada push (~20 linhas de YAML). Bônus didático: CI/CD é item do Bloco 7 da sua própria trilha. | **30** |
| O3 | **Projeto dentro do OneDrive.** `node_modules` e `.next` são milhares de arquivos que o OneDrive tenta sincronizar: instalações lentas, risco de arquivo travado no meio do build e de conflito de sincronização. **Correção:** mover os projetos pra fora (ex.: `C:\dev\roadmap`) ou marcar `node_modules`/`.next` como "não sincronizar". | **24** |
| O2 | Sem `error.tsx`/`loading.tsx` no App Router: se o Supabase falhar, o usuário vê a tela de erro crua do Next. Dois arquivos pequenos resolvem. | **20** |
| O6 | **Re-seed é destrutivo**: `npm run seed -- --force` apaga os checks de TODOS os usuários (cascata). Hoje é o único jeito de ajustar conteúdo das trilhas. **Correção (v2):** slug estável por item + upsert, preservando progresso. Até lá: **nunca** rodar `--force` depois que houver progresso real. | 16 |
| O4 | Sem `CLAUDE.md` na raiz documentando convenções e comandos pra sessões futuras do Claude Code (e pra você daqui a 6 meses). | 15 |
| O5 | Sem Prettier/`.editorconfig` (formatação na sorte do editor) e sem `engines`/`.nvmrc` (versão do Node não pinada entre sua máquina e a Vercel). | 10 |

### 📚 Documentação

| ID | Achado | Nota |
|---|---|---|
| D2 | **Free tier do Supabase pausa o projeto após ~1 semana sem uso** — e aí login e dados param até você reativar no dashboard. Não estava documentado em lugar nenhum; pra um app de *constância diária* o risco é baixo, mas férias existem. **Correção:** seção de troubleshooting no README. | **30** |
| D3 | A SPEC (fonte de verdade) vive **só na sua máquina** (`painel-de-estudos-kit/` é git-ignorada de propósito). Se o disco morrer, morre a fonte de verdade. **Correção:** backup da pasta (a transcrição do conteúdo já está versionada no seed — o risco restante é a SPEC e os guias). | **20** |
| D1 | README cobre setup e regras, mas falta: visão de arquitetura (mapa de pastas + fluxo do auth), troubleshooting (rate limit de e-mail, projeto pausado) e um screenshot quando a v1 estiver no ar. | 15 |

### 📈 Escalabilidade

| ID | Achado | Nota |
|---|---|---|
| E4 | **Sem backup automatizado** no free tier (sem point-in-time recovery). Progresso de meses pode se perder por um acidente (ex.: um `--force`, ver O6). **Correção:** export ocasional (CSV pelo dashboard ou `pg_dump`) — mensal já resolve. | **25** |
| E2 | `sessions` cresce sem limite. A janela de 1 ano + índice `(user_id, started_at)` seguram bem; estatísticas da v2 devem agregar **no banco** (SQL `GROUP BY`), não baixando tudo pro JS. | 9 |
| E3 | Limites do free tier (500 MB de banco, 50k usuários ativos/mês): no seu caso de uso, **anos** de folga. Registrado só pra constar. | — |

---

## 3. Ranking consolidado

| # | ID | Item | Categoria | Nota | Esforço |
|---|----|------|-----------|------|---------|
| 1 | O1 | CI no GitHub Actions | Organização | 30 | baixo |
| 2 | D2 | Documentar pausa do free tier | Documentação | 30 | baixo |
| 3 | E4 | Rotina de backup | Escalabilidade | 25 | baixo |
| 4 | A1 | Tipos gerados do banco | Arquitetura | 24 | baixo |
| 5 | O3 | Sair do OneDrive | Organização | 24 | médio |
| 6 | S1 | Constraints de integridade | Segurança | 20 | baixo |
| 7 | O2 | error.tsx / loading.tsx | Organização | 20 | baixo |
| 8 | D3 | Backup do kit (SPEC) | Documentação | 20 | baixo |
| 9 | O6 | Seed idempotente | Organização | 16 | alto (v2) |
| 10 | S3 | Patch do Next (postcss) | Segurança | 15 | baixo |
| 11–22 | — | Demais itens (O4, D1, S2, A2, S4, O5, S5, E2, A3, A5, A6, A4) | — | ≤15 | — |

## 4. Plano de remediação em fases

**Fase 1 — antes/junto do primeiro deploy (~1-2h de trabalho):**
O1 (CI) · S1+S5 (migration 0002 com constraints) · O2 (error/loading) · D2+D1 (README: troubleshooting + arquitetura) · O4 (CLAUDE.md) · decisão sobre O3 (OneDrive).

**Fase 2 — primeiras semanas de uso real:**
A1 (tipos gerados) · E4+D3 (rotina de backup mensal: banco + kit) · O5 (prettier + engines) · S3 (atualizar Next no primeiro patch).

**Fase 3 — v2 (junto das estatísticas planejadas):**
O6 (seed idempotente preservando progresso) · A3 (Server Actions com validação) · E2 (agregações em SQL) · A2 (queries por tela) · S2 (allowlist, se quiser) · A5/A6 (arestas de UX).

---

*Relatório gerado na auditoria de jul/2026. Reavaliar após a v1 entrar em uso real — débito técnico se prioriza pelo atrito que causa, e atrito só aparece com uso.*
