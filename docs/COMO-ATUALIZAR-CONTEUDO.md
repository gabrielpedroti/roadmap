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
| `"coursera"` | Coursera | azul escuro |
| `"deeplearning"` | DeepLearning.AI | teal |
| (omitido) | sem tag | — |

Uma fonte nova precisa ser adicionada em 3 lugares: o tipo `Fonte` (`lib/types.ts`), o mapa `TAGS_FONTE` (`components/ListaBlocos.tsx`) e o CHECK da coluna (numa migration, ex. a 0007 liberou coursera/deeplearning).

### Onde estudar cada conceito (os chips)

Além da `fonte` (que diz que o item **é** um curso), um conceito pode apontar **onde estudá-lo** — vira os chips embaixo da descrição. Na trilha Dev isso vive num arquivo separado, `supabase/seed/onde-estudar-dev.ts`, com o título do conceito como chave:

```ts
"Variáveis e tipos": [alura("trilha", T_ZERO), puc(M_RACIOCINIO)],
"CSV": [alura("trilha", T_PRATICANDO)],
```

Cada entrada é `{ plataforma, tipo, nome }`. O chip mostra `Plataforma · Nome`, e a palavra **"Trilha:"** aparece só quando `tipo` é `"trilha"` (curso e matéria mostram só o nome). Conceito sem entrada não mostra chip.

⚠️ A chave é o **título exato** do conceito. Se mudar um título em `trilha-dev.ts`, atualize a chave — o `npm run seed` **falha de propósito** se achar uma chave órfã. Se mudar o mapa, **regere a migration** (o `0005_onde_estudar.sql` é gerado, não escrito à mão).

### Tipos de item

Cada `SeedItem` tem `titulo`, `descricao` (opcional — o "ao final você deve...") e `tipo`:

| tipo | efeito na regra de progresso | visual |
|---|---|---|
| `concept` | divide os 70% do bloco | checkbox normal |
| `review` | divide os 70% (igual a concept) | matéria de faculdade (use `fonte: "ads-pucpr"`) |
| `optional` | NÃO conta no progresso | apagado + tag "opcional" |
| `project` | vale 30% do bloco | destaque com 🏗️ |

Regras derivadas que você precisa respeitar:
- Bloco **sem** item `project`: os obrigatórios passam a valer 100% (automático, nada a configurar).
- A tag da fonte vem de `fonte` (tabela acima), NÃO do título do grupo. Se criar um grupo de cursos de uma fonte nova, adicione o valor em `Fonte` (`lib/types.ts`), no mapa `TAGS_FONTE` (`components/ListaBlocos.tsx`) e recrie o CHECK da coluna numa migration NOVA (o vigente foi recriado pela `0007_ia_reestruturada.sql` — editar a `0004` não tem efeito em bancos existentes).
- O pré-requisito cruzado (IA Carreira 2 ← Dev Bloco 2) é definido em `run.ts` por `ordem` dos blocos — se reordenar blocos dessas trilhas, ATUALIZE os números lá.

## O processo (siga na ordem)

1. Edite o(s) arquivo(s) `trilha-*.ts` conforme pedido — e o `.md` correspondente do kit junto (regra 9 de `docs/REGRAS-DO-ROADMAP.md`: as duas fontes nunca divergem).
2. Rode `npx tsc --noEmit` — precisa passar sem erros.
3. **Num banco em uso, o caminho é SEMPRE uma migration idempotente** (ex.: `0009_plano_ago_2026.sql`): ela aplica só os deltas e preserva os checks. Escreva-a ancorando posições por TÍTULO de grupo/item vizinho, não por número de ordem.
4. `npm run seed -- --force` fica SÓ para banco zerado (instalação nova). Além de apagar os checks de todos, com sessões gravadas ele nem roda (veja "Limitação conhecida" abaixo). Se for o caso de usá-lo, avise o usuário e peça confirmação explícita antes.
5. Confira o resultado: contagens de blocos/grupos/itens por trilha devem bater com o que você editou.
6. Abra o app e confira visualmente a tela da trilha alterada.
7. Commit + push na `main` (a Vercel deploya a cada push).

## Limitação conhecida (não tente contornar por conta própria)

O seed não é idempotente — não há chave estável por item, então re-seedar do zero recria tudo e perde os checks marcados. A correção planejada é usar slugs estáveis + upsert. Até lá, o caminho para mudar conteúdo **sem perder progresso** é uma migration pontual (veja `supabase/migrations/`, ex. `0003_curso_dio.sql`), e o `seed --force` fica só para começar do zero.

**Descoberto em ago/2026:** com sessões de estudo gravadas, o `seed --force` nem
chega a rodar — `sessions.track_id` referencia `tracks` **sem** `on delete cascade`,
então o delete das trilhas falha com erro de foreign key. Na prática, num banco em
uso o caminho é SEMPRE migration; o `--force` só funciona em banco sem sessões.
