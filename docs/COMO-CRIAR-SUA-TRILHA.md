# Como criar o SEU roadmap a partir deste projeto

Este app foi feito para um plano de estudos específico, mas a estrutura é genérica: trilhas → blocos → grupos → itens, com pomodoro, streak e metas. Para montar o seu:

1. **Fork** deste repositório no GitHub (botão Fork).
2. **Troque o conteúdo:** edite os arquivos em `supabase/seed/` com as SUAS trilhas — o formato está documentado em [COMO-ATUALIZAR-CONTEUDO.md](COMO-ATUALIZAR-CONTEUDO.md). Pode criar quantas trilhas quiser (cada uma com `slug`, `nome`, `descricao` e `cor` próprios).
3. **Ajuste o pré-requisito cruzado** em `supabase/seed/run.ts` (ou remova aquele trecho, se as suas trilhas forem independentes).
4. **Suba a sua infra:** siga o [GUIA-ATIVACAO.md](GUIA-ATIVACAO.md) — Supabase e Vercel têm plano gratuito; o processo todo leva ~30 min.
5. **Personalize:** cores por trilha ficam no seed; os tokens do tema (claro/escuro) em `app/globals.css`; textos das telas em `app/` e `components/`.

As regras de progresso (projeto 30% / obrigatórios 70% / opcionais fora) valem para qualquer conteúdo — se quiser outra ponderação, o lugar é `lib/progress.ts` (com testes em `tests/progress.test.ts`).

Dúvidas ou melhorias: abra uma issue. 🙂
