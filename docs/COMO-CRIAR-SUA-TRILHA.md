# Monte o SEU roadmap com este projeto

Este app foi feito para um plano de estudos de programação, mas o motor é **genérico**: trilhas → blocos → grupos → itens, com pomodoro, streak e metas. Serve pra qualquer conteúdo — medicina, concurso, música, idiomas. Você não precisa entender de programação a fundo pra adaptar: o caminho abaixo foi pensado pra ser seguido com calma (ou entregue a uma IA como o Claude, que resolve os passos técnicos pra você).

## O caminho

### 1. Faça uma cópia do projeto
No topo desta página do GitHub, clique em **Fork** (precisa de uma conta GitHub, gratuita). Isso cria a SUA cópia, independente da minha.

### 2. Escreva o seu conteúdo
Todo o conteúdo vive em três arquivos na pasta `supabase/seed/` — um por trilha. Substitua pelo seu. O formato completo está em [COMO-ATUALIZAR-CONTEUDO.md](COMO-ATUALIZAR-CONTEUDO.md), mas a lógica é simples:

- **Trilha** = um grande tema (ex.: "Clínica Médica"), com nome, cor e descrição.
- **Bloco** = uma etapa com começo e fim (ex.: "Cardiologia"). Os blocos abrem em sequência: o próximo destrava quando o anterior fecha.
- **Grupo** = um agrupamento dentro do bloco (ex.: "Arritmias").
- **Item** = a menor unidade marcável, com 4 tipos:
  - `concept` — conteúdo normal (dividem 70% do bloco);
  - `review` — igual ao concept, mas ganha uma tag de destaque (uso pra matérias da faculdade; renomeie a tag pro seu caso);
  - `project` — a entrega prática do bloco, vale 30% (numa trilha de medicina, pode ser um simulado ou prova);
  - `optional` — não conta no progresso (registro pessoal).

Pode criar quantas trilhas quiser, cada uma com sua cor.

### 3. Ajustes finos (opcionais)
- **Tags**: os rótulos "ADS PUC-PR" e "Anthropic" são do MEU conteúdo — troque os textos/cores em `components/ListaBlocos.tsx` (função `LinhaItem`).
- **Pré-requisito cruzado**: minha trilha de IA exige um bloco da trilha Dev. Se as suas trilhas forem independentes, remova o trecho "Pré-requisito cruzado" de `supabase/seed/run.ts`.
- **Nome e textos**: "Roadmap" aparece em `app/layout.tsx`, `components/Cabecalho.tsx` e `app/login/page.tsx`. O README é todo seu.
- **Cores do tema**: `app/globals.css`.

### 4. Coloque no ar
Siga o [GUIA-ATIVACAO.md](GUIA-ATIVACAO.md) — passo a passo sem pressupor conhecimento, usando os planos gratuitos do Supabase (banco + login) e da Vercel (site). Leva ~30 minutos.

### 5. Estude 🍅
Abra o app todo dia, dá play no pomodoro e deixa a chama acesa.

## Dica: deixe uma IA fazer o trabalho técnico

Se você usa Claude, ChatGPT ou similar com acesso ao código, o prompt abaixo resolve o passo 2 e 3:

> Leia docs/COMO-ATUALIZAR-CONTEUDO.md e substitua o conteúdo dos arquivos supabase/seed/trilha-*.ts pelo meu plano de estudos a seguir, criando as trilhas, blocos, grupos e itens no formato do projeto. Ajuste as tags em components/ListaBlocos.tsx para o meu contexto e remova o pré-requisito cruzado se não fizer sentido. Meu plano: [cole seu plano aqui]

## Licença

MIT — pode usar, modificar e publicar a sua versão sem pedir permissão. Se este projeto te ajudar, uma ⭐ no repositório é bem-vinda. 🙂
