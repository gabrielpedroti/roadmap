# 🗺️ Roadmap

[![CI](https://github.com/gabrielpedroti/roadmap/actions/workflows/ci.yml/badge.svg)](https://github.com/gabrielpedroti/roadmap/actions/workflows/ci.yml)

**Plano de estudos interativo para me tornar desenvolvedor full stack.**

Era para ser apenas uma revisão da faculdade (ADS · PUC-PR), mas acabou evoluindo para algo maior: um plano que cobre tudo o que ainda preciso desenvolver para me tornar um bom desenvolvedor full stack, com IA e inglês correndo na mesma esteira. Em vez de uma planilha, virou um web app com trilhas de aprendizado, progresso ponderado, pomodoro integrado, streak de constância e metas de estudo.

## Objetivo

Fiz a faculdade durante o boom da IA, o mercado mudou muito, e muita coisa acabou ficando atropelada no meio do caminho. Com este plano de estudos, quero desenvolver habilidades importantes e construir soluções por conta própria, como um bom programador old school que entende o que está fazendo e não depende de ferramentas externas para resolver tudo.

Ao mesmo tempo, não posso ignorar o potencial da IA. Ela traz ganhos reais de produtividade, automação e escalabilidade, e pretendo usá-la como uma aliada para me manter atualizado e preparado para as tendências atuais e futuras da área.

A ideia é unir uma base sólida de programação com o uso inteligente da IA, aproveitando o melhor dos dois mundos.

## As trilhas

- 🎓 **Dev** — revisão das 20 matérias técnicas de ADS (PUC-PR) com alicerce sólido, do Python ao full stack, preparando a entrada na Pós Tech da FIAP.
- 🤖 **IA · Automação** — IA e automação aplicadas ao trabalho real de BPO financeiro: de Power Automate e n8n até agentes com a API do Claude.
- 🇺🇸 **Inglês** — recap A1 → B2 com foco em produção falada: transformar inglês passivo em inglês que sai.

Cada trilha é dividida em blocos com desbloqueio sequencial: o próximo só abre quando o atual está 100% concluído — incluindo o **projeto prático**, que vale 30% do bloco. Há até pré-requisito cruzado entre trilhas (a etapa de agentes de IA exige a base de Python da trilha Dev).

## Como funciona

- 🍅 **Pomodoro integrado** — ao concluir um ciclo de foco, a sessão é registrada automaticamente na trilha selecionada. Pausa não conta como estudo.
- 🔥 **Streak de constância** — a chama só acende no dia em que o mínimo de estudo foi cumprido. Constância e volume são métricas independentes.
- 📊 **Progresso ponderado** — conceitos e revisões dividem 70% do bloco; o projeto vale 30%; itens opcionais não contam.
- 🌗 **Tema automático** — claro ou escuro conforme o sistema, com uma cor de identidade por trilha (o bordô é herança da PUC-PR).
- 🔐 **Login opcional** — magic link por e-mail, sem senha, apenas para salvar o próprio progresso. Cada usuário vê somente os seus dados (RLS no Postgres).

## Quer usar?

**Vai estudar o mesmo que eu?** O app está no ar — o link fica na descrição deste repositório. Entra, navega pelas trilhas sem conta e, se quiser salvar seu progresso, faz login com e-mail.

**Vai estudar outra coisa?** O motor é genérico — serve pra qualquer plano de estudos, de medicina a música. O passo a passo pra montar o seu com este projeto como base está em **[docs/COMO-CRIAR-SUA-TRILHA.md](docs/COMO-CRIAR-SUA-TRILHA.md)**.

## Stack

**Next.js** (App Router) · **TypeScript** · **Tailwind CSS v4** · **Supabase** (Postgres + Auth + RLS) · **Vercel** · **Vitest** (28 testes nas regras de negócio) · **GitHub Actions**

Este app também é parte do próprio plano: refatorá-lo com as próprias mãos é um dos projetos da trilha Dev.

## Rodando

```bash
npm install
npm run dev
```

Setup completo (banco, auth, deploy): [docs/GUIA-ATIVACAO.md](docs/GUIA-ATIVACAO.md)

## Documentação

| Doc | Para quê |
|---|---|
| [COMO-CRIAR-SUA-TRILHA.md](docs/COMO-CRIAR-SUA-TRILHA.md) | montar o SEU roadmap com este projeto (qualquer conteúdo) |
| [GUIA-ATIVACAO.md](docs/GUIA-ATIVACAO.md) | colocar o app no ar do zero (Supabase + Vercel) |
| [COMO-ATUALIZAR-CONTEUDO.md](docs/COMO-ATUALIZAR-CONTEUDO.md) | editar o conteúdo das trilhas (escrito para uma IA executar) |

## Licença

[MIT](LICENSE) — use, estude, adapte.
