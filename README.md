# 🗺️ Roadmap

[![CI](https://github.com/gabrielpedroti/roadmap/actions/workflows/ci.yml/badge.svg)](https://github.com/gabrielpedroti/roadmap/actions/workflows/ci.yml)

**Meu plano de estudos até me tornar desenvolvedor full stack — transformado em produto.**

Começa pela revisão da faculdade (ADS · PUC-PR), mas cobre tudo o que falta pra virar dev de verdade — com IA e inglês correndo na mesma esteira. Em vez de planilha, virou um web app: trilhas com progresso ponderado, pomodoro que registra as sessões sozinho, streak de constância e metas de horas.

## Por quê

Entrei na área bem no boom da IA — e escolhi um caminho do meio.

Quero ser uma mistura do **programador old school**, que sabe codar sozinho e entende o que está acontecendo debaixo do capô, com alguém que **usa IA a favor**: ela traz facilidade e ganho de performance reais, e não apostar nisso é ficar atrasado no mercado. Não quero ser um *vibecoder* que só aceita o que o modelo cospe — mas também não dá pra mirar no passado.

Por isso o plano tem fundamento e futuro ao mesmo tempo: base sólida de programação primeiro, IA aplicada ao trabalho real junto, e inglês porque é a língua em que tudo isso acontece.

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
| [AUDITORIA-V1.md](docs/AUDITORIA-V1.md) | auditoria técnica com débitos conhecidos e priorizados |

## Licença

[MIT](LICENSE) — use, estude, adapte.
