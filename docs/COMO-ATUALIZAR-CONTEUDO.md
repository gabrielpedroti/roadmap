# Como atualizar o conteúdo das trilhas

> **Este documento é escrito para uma IA (Claude Code ou similar) executar a tarefa** quando o Gabriel pedir algo como "adiciona um curso na Etapa 1 da IA" ou "muda a descrição do Bloco 3". Siga exatamente.

## Onde o conteúdo vive

O conteúdo das trilhas NÃO é editado pelo app nem direto no banco. A fonte de verdade versionada são três arquivos TypeScript:

```
supabase/seed/trilha-dev.ts      → trilha Dev (7 blocos)
supabase/seed/trilha-ia.ts       → trilha IA · Automação (4 etapas)
supabase/seed/trilha-ingles.ts   → trilha Inglês (Passo 0 + 4 níveis)
supabase/seed/tipos.ts           → o formato (tipos) desses arquivos
supabase/seed/run.ts             → o script que grava tudo no Supabase
```

## O formato

Cada trilha é um `SeedTrack`: `slug`, `nome`, `descricao` (aparece no topo da tela da trilha), `cor` (hex), `ordem` e `blocos[]`.

Cada `SeedBlock` tem `titulo`, `descricao` (resumo de 1 linha, SEM meta-comentários de planejamento), `semanas` (texto livre, opcional), `comecaAberto` (true = não exige o bloco anterior) e `grupos[]`.

Cada `SeedGroup` tem `titulo`, `itens[]` e, opcionalmente, **`fonte`** — de onde o conteúdo vem. A fonte vira a tag colorida na tela e é herdada por todos os itens do grupo (um item pode sobrescrever com a própria `fonte`):

| `fonte` | tag exibida | cor |
|---|---|---|
| `"ads-pucpr"` | ADS-PUCPR | bordô |
| `"dio"` | DIO | roxo |
| `"alura"` | Alura | azul |
| `"anthropic"` | Anthropic | laranja |
| (omitido) | sem tag | — |

Cada `SeedItem` tem `titulo`, `descricao` (opcional — o "ao final você deve...") e `tipo`:

| tipo | efeito na regra de progresso | visual |
|---|---|---|
| `concept` | divide os 70% do bloco | checkbox normal |
| `review` | divide os 70% (igual a concept) | matéria de faculdade (use `fonte: "ads-pucpr"`) |
| `optional` | NÃO conta no progresso | apagado + tag "opcional" |
| `project` | vale 30% do bloco | destaque com 🏗️ |

Regras derivadas que você precisa respeitar:
- Bloco **sem** item `project`: os obrigatórios passam a valer 100% (automático, nada a configurar).
- A tag da fonte vem de `fonte` (tabela acima), NÃO do título do grupo. Se criar um grupo de cursos de uma fonte nova, adicione o valor em `Fonte` (`lib/types.ts`), no mapa `TAGS_FONTE` (`components/ListaBlocos.tsx`) e no CHECK da coluna (`supabase/migrations/0004_fonte_dos_itens.sql`).
- O pré-requisito cruzado (IA Etapa 2 ← Dev Bloco 2) é definido em `run.ts` por `ordem` dos blocos — se reordenar blocos dessas trilhas, ATUALIZE os números lá.

## O processo (siga na ordem)

1. Edite o(s) arquivo(s) `trilha-*.ts` conforme pedido.
2. Rode `npx tsc --noEmit` — precisa passar sem erros.
3. **AVISE O USUÁRIO ANTES DO PASSO 4:** re-seedar com `--force` apaga TODO o conteúdo e, por cascata, **os checks de TODOS os usuários** (o progresso marcado). As sessões de estudo e o streak NÃO são perdidos (ficam em `sessions`). Peça confirmação explícita.
4. Com o `.env.local` preenchido (URL + SUPABASE_SERVICE_ROLE_KEY):
   `npm run seed -- --force`
5. Confira a saída do script: contagens de blocos/grupos/itens por trilha devem bater com o que você editou.
6. Abra o app e confira visualmente a tela da trilha alterada.
7. Commit + push na branch em uso (hoje: `v1`).

## Limitação conhecida (não tente contornar por conta própria)

O seed não é idempotente — não há chave estável por item, então qualquer atualização recria tudo e perde os checks. A correção planejada (v2) é usar slugs estáveis + upsert (item O6 em [AUDITORIA-V1.md](AUDITORIA-V1.md)). Até lá, o fluxo acima com aviso ao usuário é o oficial.
