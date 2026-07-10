# 🗺️ Roadmap

[![CI](https://github.com/gabrielpedroti/roadmap/actions/workflows/ci.yml/badge.svg)](https://github.com/gabrielpedroti/roadmap/actions/workflows/ci.yml)

**Meu plano de estudos até me tornar desenvolvedor full stack — transformado em produto.**

Em vez de uma planilha ou um bloco de notas, o plano virou um web app: três trilhas de estudo com progresso ponderado, pomodoro que registra as sessões sozinho, streak de constância e metas de horas. Aberto para visualização — [qualquer pessoa pode navegar pelas trilhas](https://github.com/gabrielpedroti/roadmap) e usar o pomodoro sem conta.

## As trilhas

| Trilha | Objetivo | Duração estimada |
|---|---|---|
| 🎓 **Dev** | Revisar as 20 matérias técnicas de ADS (PUC-PR) com alicerce sólido e chegar pronto na Pós Tech Full Stack da FIAP | ~14 meses |
| 🤖 **IA · Automação** | Automação e IA aplicadas ao trabalho real de BPO financeiro — de Power Automate e n8n até agentes com a API do Claude | ~12 meses |
| 🇺🇸 **Inglês** | Recap A1 → B2 com foco em produção falada: transformar inglês passivo em inglês que sai | ~12-15 meses |

Cada trilha é dividida em blocos com desbloqueio sequencial: o próximo só abre quando o atual está 100% concluído — incluindo o **projeto prático**, que vale 30% do bloco. Há até pré-requisito cruzado entre trilhas (a etapa de agentes de IA exige a base de Python da trilha Dev).

## Como funciona

- 🍅 **Pomodoro integrado** — ao concluir um ciclo de foco, a sessão é registrada automaticamente na trilha selecionada. Pausa não conta como estudo.
- 🔥 **Streak de constância** — a chama só acende no dia em que o mínimo de estudo foi cumprido. Constância e volume são métricas independentes.
- 📊 **Progresso ponderado** — conceitos e revisões dividem 70% do bloco; o projeto vale 30%; itens opcionais não contam.
- 🌗 **Tema automático** — claro ou escuro conforme o sistema, com uma cor de identidade por trilha (o bordô é herança da PUC-PR).
- 🔐 **Login opcional** — magic link por e-mail, sem senha, apenas para salvar o próprio progresso. Cada usuário vê somente os seus dados (RLS no Postgres).

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
| [GUIA-ATIVACAO.md](docs/GUIA-ATIVACAO.md) | colocar o app no ar do zero (Supabase + Vercel) |
| [COMO-ATUALIZAR-CONTEUDO.md](docs/COMO-ATUALIZAR-CONTEUDO.md) | editar o conteúdo das trilhas (escrito para uma IA executar) |
| [COMO-CRIAR-SUA-TRILHA.md](docs/COMO-CRIAR-SUA-TRILHA.md) | usar este projeto como base para o SEU plano de estudos |
| [AUDITORIA-V1.md](docs/AUDITORIA-V1.md) | auditoria técnica com débitos conhecidos e priorizados |

## Licença

[MIT](LICENSE) — use, estude, adapte.
