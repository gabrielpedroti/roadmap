# Product

## Register

product

## Platform

web

## Users

Gabriel (dono e único usuário principal): dev iniciante, trabalha em BPO financeiro, estuda à noite e de manhã cedo pelas 3 trilhas (Dev, IA · Automação, Inglês). Usa o app diariamente em desktop (Windows + navegador) para: dar play no pomodoro, marcar itens estudados e conferir streak/metas. Multiusuário aberto (amigos podem se cadastrar), mas o design serve o uso pessoal diário.

## Product Purpose

Painel de acompanhamento de estudos: 3 trilhas com progresso ponderado (projeto 30% / obrigatórios 70%), pomodoro com auto-registro de sessões, streak de constância e metas de volume. Sucesso = Gabriel abre o painel todo dia, em segundos sabe onde parou e o que falta, e a constância se mantém. O app em si vira projeto de portfólio (ele vai refatorá-lo no Bloco 6 da própria trilha).

## Brand Personality

Minimalista à la Apple: calmo, preciso, bonito sem enfeite. Três palavras: **limpo, focado, recompensador**. A única "festa" permitida é o progresso: cor aparece para dizer quanto falta e para celebrar constância — nunca como decoração.

## Anti-references

- O tema escuro genérico "dashboard dev" do mockup v1 (cinza sobre cinza, sem identidade) — funcional, mas o dono "está longe de gostar".
- Dashboards SaaS carregados: cards idênticos em grade, métricas gigantes com gradiente, glassmorphism.
- Gamificação infantilizada (badges piscando, confete) — a recompensa é sóbria.

## Design Principles

1. **O timer é o palco.** A ação diária nº 1 é dar play; tudo o mais é contexto ao redor.
2. **Cor = identidade da trilha.** Uma cor por trilha (IA: laranja Claude · Inglês: verde Duolingo · Dev: azul), usada em barras, anéis e indicadores — nunca em texto pequeno nem decoração.
3. **Tema segue o sistema.** Claro/escuro automático via `prefers-color-scheme`, sem botão de tema no app.
4. **Familiaridade ganha de surpresa.** Controles com cara de sistema (segmented controls, checkboxes nativos estilizados); nada de affordances inventadas.
5. **Denso onde é tarefa, arejado onde é status.** A tela de trilha pode ser densa (checklist); o dashboard respira.

## Accessibility & Inclusion

WCAG AA como piso: texto de corpo ≥ 4.5:1 nos dois temas; cor de trilha nunca é o único sinal (sempre acompanha rótulo/percentual); `prefers-reduced-motion` respeitado em qualquer animação; alvos de clique ≥ 40px nos controles do pomodoro.
