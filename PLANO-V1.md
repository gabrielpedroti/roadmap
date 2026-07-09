# Plano de implementação — Painel de Estudos v1

> Fonte de verdade: `painel-de-estudos-kit/SPEC-APP.md` (fora do git). Este arquivo é o plano de execução — cada etapa termina com um teste que o Gabriel consegue fazer sozinho. Marque as etapas conforme forem concluídas.
>
> **Status geral:** código da v1 completo (build + testes verdes). Pendências que dependem do Gabriel: aplicar a migration no Supabase, preencher `.env.local`, rodar o seed, configurar Auth/redirects, testar login real e importar na Vercel — checklist no README.

## Stack e estrutura (decisões fixas)

- Next.js (App Router) + TypeScript + Tailwind CSS, no **root do repositório**.
- Supabase: Postgres + Auth (magic link), acesso via `@supabase/ssr` (sessão em cookies, renovada por middleware).
- Deploy: Vercel (conectado ao repo GitHub).
- Sem biblioteca de estado, sem UI kit — código simples e legível, estrutura convencional:

```
app/
  login/page.tsx          ← tela única de e-mail
  auth/callback/route.ts  ← troca o código do magic link por sessão
  page.tsx                ← dashboard
  trilha/[slug]/page.tsx  ← tela de trilha
components/               ← Pomodoro, Constancia, ModalRegistroManual, etc.
lib/
  supabase/               ← clients browser/server + middleware helper
  progress.ts             ← regra de progresso (funções puras, testáveis)
  streak.ts               ← cálculo de streak e metas (funções puras)
supabase/
  migrations/             ← SQL versionado (schema + RLS)
  seed/                   ← dados das trilhas transcritos + script de seed
middleware.ts             ← refresh automático da sessão
```

## Os 4 pontos críticos e como cada um será resolvido

### 1. Sessão persistente de meses (critério de aceite nº 1)

- `@supabase/ssr` guarda a sessão em **cookies com expiração longa** (padrão ~400 dias), não em localStorage.
- `middleware.ts` renova o access token automaticamente a cada request — é isso que mantém a sessão viva indefinidamente enquanto o refresh token for usado.
- Conferir no painel do Supabase (Auth → Sessions): **"Time-box user sessions" e "Inactivity timeout" desligados** (é o padrão, mas vamos verificar explicitamente).
- Logout **só** pelo botão "sair".
- Teste em duas camadas: (a) imediato — apagar o access token e recarregar → sessão renova sozinha; (b) real — fechar o navegador e voltar dias depois (por isso o auth entra cedo no plano: o relógio do teste de 3 dias começa a contar logo).

### 2. RLS em todas as tabelas de usuário

- `user_checks`, `sessions`, `user_settings`: RLS **habilitado na própria migration** que cria a tabela, com policies `select/insert/update/delete` restritas a `auth.uid() = user_id`.
- Tabelas de conteúdo global (`tracks`, `blocks`, `groups`, `items`): RLS habilitado com policy de **somente leitura para usuários autenticados**; escrita só via service role (seed).
- Teste com dois usuários reais (critério de aceite nº 6).

### 3. Seed das trilhas a partir dos arquivos de conteúdo

- Os `.md` de `painel-de-estudos-kit/conteudo/` estão **fora do git** (gitignore). Por isso o conteúdo será **transcrito** para arquivos de dados TypeScript versionados no repo (`supabase/seed/trilha-dev.ts`, `trilha-ia.ts`, `trilha-ingles.ts`) — mais confiável que parsear markdown, e o conteúdo passa a viver no repositório.
- Script `supabase/seed/run.ts` insere tracks → blocks → groups → items usando a **service role key** (local, nunca commitada, nunca na Vercel).
- Decisões de modelagem (transcritas da SPEC + arquivos de trilha):
  - **Dev:** 7 blocos; subgrupos = groups; itens dos subgrupos = `concept`; "Matéria — Revisado" = `review`; "Refiz o projeto" = `optional`; Projeto do bloco = `project`.
  - **IA:** Etapas 0–3 = blocos. Cursos = `concept`. Projeto-âncora = `project` da Etapa 2 (única etapa com projeto). "N3: Em breve" e "Clusterização e NLP (se sobrar fôlego)" = `optional`. Matérias da faculdade: Power BI = `review` na Etapa 1, Machine Learning = `review` na Etapa 3. Etapas 0 e 1 começam **ambas desbloqueadas** (a trilha diz que a Etapa 0 é paralela à 1).
  - **Inglês:** "Passo 0 — EF SET" = bloco próprio com 1 item (sempre desbloqueado, assim como o A1); estruturas de cada nível = `concept`; **check de saída falado = `project`** do nível (30%), conforme a própria trilha define.
- Teste: contagem de blocos/grupos/itens por trilha bate com os arquivos originais; conferência amostral de títulos e tipos.

### 4. Progresso ponderado (30/70, opcionais fora)

- Funções puras em `lib/progress.ts` + testes unitários (vitest) — é a regra central do app, merece teste automatizado:
  - `project` = 30% do bloco; `concept` + `review` dividem 70% em partes iguais; `optional` **não entra na conta**.
  - **Bloco sem item `project`** (IA Etapas 0, 1 e 3; Inglês Passo 0): obrigatórios dividem **100%** — senão o bloco nunca fecharia.
  - Progresso da trilha = média dos blocos **ponderada pelo nº de itens obrigatórios** de cada bloco.
- Desbloqueio sequencial: bloco N+1 abre com 100% dos obrigatórios + projeto do bloco N. Modelo: coluna `prereq_block_id` (anterior na trilha, ou `null` para os que começam abertos) + coluna `cross_prereq_block_id` para o **pré-requisito cruzado: IA Etapa 2 ← Dev Bloco 2** (sinalizado na UI).
- Blocos bloqueados: visíveis, cinza, com "antes de começar: conclua X".

## Modelo de dados (migrations)

Conforme a sugestão da SPEC, com os ajustes acima:

- `tracks` (id, slug, nome, cor, ordem)
- `blocks` (id, track_id, titulo, descricao, ordem, semanas_estimadas, prereq_block_id, cross_prereq_block_id)
- `groups` (id, block_id, titulo, ordem)
- `items` (id, group_id, titulo, descricao, ordem, tipo: `concept | review | optional | project`)
- `user_checks` (user_id, item_id, checked_at) — PK composta (user_id, item_id)
- `sessions` (id, user_id, track_id, started_at, ended_at, duration_min, origem: `pomodoro | manual`)
- `user_settings` (user_id PK, streak_min_diario_min=30, dias_que_contam=[1..7], meta_semanal_h=10, meta_mensal_h=40, pomodoro_foco_min=25, pausa_curta_min=5, pausa_longa_min=15, ciclos_ate_pausa_longa=4)

Convenções: timestamps em UTC no banco; **dia, semana e mês calculados em America/Sao_Paulo** (streak e metas dependem disso). `user_settings` criado sob demanda com defaults no primeiro acesso (sem trigger — mais simples de entender).

## Etapas (cada uma pequena e testável)

### Etapa 0 — Esqueleto + deploy
Scaffold do Next.js + TS + Tailwind no root do repo, página inicial provisória, projeto conectado à Vercel com deploy verde.
**Preciso de você:** URL e anon key do Supabase (vão em `.env.local` e nas env vars da Vercel).
**Teste:** abrir a URL da Vercel e ver a página.

### Etapa 1 — Schema + RLS
Migrations SQL de todas as tabelas com RLS e policies desde a criação.
**Teste:** tabelas visíveis no Supabase Studio; query anônima em `user_checks` não retorna nada.

### Etapa 2 — Auth com sessão persistente ⭐ (entra cedo de propósito)
Tela de login (só e-mail + botão), magic link, callback, middleware de refresh, botão "sair", rotas protegidas. Configurar Site URL/redirects no Supabase (localhost + domínio Vercel). Deploy.
**Teste:** login por e-mail; fechar navegador e reabrir → logado. **A partir daqui roda o teste real de 3 dias em paralelo** (critério nº 1). Obs.: o e-mail padrão do Supabase tem limite de poucos envios/hora — suficiente pra uso pessoal.

### Etapa 3 — Seed das trilhas
Transcrição dos 3 arquivos de conteúdo + script de seed (service role key local).
**Preciso de você:** service role key (só no `.env.local`).
**Teste:** contagens e amostras batem com os `.md`.

### Etapa 4 — Regra de progresso + coluna Trilhas
`lib/progress.ts` com testes unitários; dashboard começa a nascer: coluna esquerda com as 3 trilhas, % real e barra (cores do mockup: Dev `#5dcaa5`, IA `#afa9ec`, Inglês `#85b7eb`).
**Teste:** `npm test` verde; trilhas em 0% para usuário novo.

### Etapa 5 — Tela de trilha
Blocos com barra individual, expandir → grupos → itens com checkbox (update otimista + persistência imediata). Tipos visualmente distintos (review com badge "faculdade", opcional apagado com "não conta", projeto em destaque). Blocos bloqueados em cinza com pré-requisito indicado, incluindo o cruzado (IA Etapa 2).
**Teste:** critérios de aceite nº 3 e nº 4 — fechar Bloco 1 Dev desbloqueia o 2; opcional não mexe na %.

### Etapa 6 — Pomodoro com auto-registro
Centro do dashboard fiel ao mockup: seletor de trilha ACIMA do display, chips de foco (25/50/90/✎) e pausa (5/10/15), config de pausa longa na engrenagem, Iniciar/reset. Ao **concluir um ciclo de foco**, sessão auto-registrada (pausa não conta; reset antes do fim descarta). Notificação sonora + visual no fim de foco e de pausa. Estado do timer sobrevive a refresh (localStorage).
**Teste:** critério nº 2 com foco curto de teste (custom 1 min) e depois um de 50 min real.

### Etapa 7 — Registro manual + últimas sessões
Modal "+ Registrar manual" (trilha, data, hora início/fim OU duração) e rodapé colapsável de últimas sessões (data, trilha, duração, origem).
**Teste:** registrar 30 min ontem → aparece no rodapé (base do critério nº 5).

### Etapa 8 — Streak + metas
Coluna direita: foguinho + dias + regra; barras de meta semanal (seg–dom) e mensal (mês civil), somando pomodoro + manual, em America/Sao_Paulo. Streak (constância: mínimo diário nos dias que contam) e metas (volume) **independentes**.
**Teste:** critério nº 5 completo — manual de 30 min ontem mantém o streak de ontem.

### Etapa 9 — Configurações
Modal da engrenagem: mínimo diário, dias que contam, metas semanal/mensal, tempos do pomodoro. Tudo persiste em `user_settings` e recalcula na hora.
**Teste:** critério nº 7 — meta semanal pra 12h → barra recalcula.

### Etapa 10 — Fechamento da v1
Passar os **7 critérios de aceite** um a um (o nº 1 já estará rodando desde a Etapa 2; nº 6 com um segundo e-mail real), revisão do visual contra o mockup (fidelidade, não polimento), README com como rodar.
**Depois disso:** polimento visual com Impeccable (`/impeccable init` + `polish`) — não antes.

## Mapa: critérios de aceite → etapas

| # | Critério | Etapa |
|---|---|---|
| 1 | Fechar navegador, voltar em 3 dias → logado | 2 (teste corre em paralelo) |
| 2 | Pomodoro 50 min → últimas sessões + metas + streak | 6 + 8 |
| 3 | Bloco 1 Dev completo → Bloco 2 abre; barra reflete 30/70 | 4 + 5 |
| 4 | Opcional não altera % | 4 + 5 |
| 5 | Manual 30 min ontem → streak de ontem conta | 7 + 8 |
| 6 | Segundo usuário → trilhas zeradas, isolamento total | 1 + 2 + 10 |
| 7 | Meta semanal 12h → barra recalcula | 9 |

## Decisões pequenas tomadas agora (pra não travar depois)

- Reset do pomodoro antes do fim do foco **descarta** o tempo (a SPEC registra só ciclo concluído; se doer na prática, ajustamos na v2).
- Streak: dias configurados fora dos "dias que contam" não quebram a sequência.
- `user_settings` nasce com defaults no primeiro acesso do usuário (código, não trigger).
- Conteúdo transcrito (não parseado) — vira fonte versionada no repo; os `.md` do kit continuam sendo a referência humana.
