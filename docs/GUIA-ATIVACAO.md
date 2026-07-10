# Guia de ativação — do zero até o app no ar

Roteiro completo, sem pressupor que você conhece Supabase ou Vercel. Tempo total: ~30 min. Faça na ordem.

**O que é cada coisa:**
- **Supabase** = o banco de dados + login do app, na nuvem, com plano grátis. É onde ficam as trilhas, seus checks e sessões.
- **Vercel** = onde o site roda na internet (também grátis). Ela pega o código do GitHub e publica sozinha a cada push.

---

## Parte 1 — Supabase (banco + login)

### 1.1 Criar o projeto
1. Acesse [supabase.com](https://supabase.com) → **Sign in** (entre com o GitHub).
2. **New project** → escolha a organização; nome: `roadmap`; **Database password**: gere uma e **guarde num lugar seguro** (não vamos usar no dia a dia, mas é a senha-mestra do banco); região: **South America (São Paulo)**.
3. Aguarde ~2 min até o projeto ficar pronto.

### 1.2 Criar as tabelas (migrations)
1. No menu lateral do projeto: **SQL Editor** → **New query**.
2. Abra o arquivo `supabase/migrations/0001_schema.sql` do repositório, copie TUDO, cole no editor e clique **Run**.
3. Repita com `supabase/migrations/0002_publico_e_descricoes.sql` (roda os arquivos da pasta `migrations/` SEMPRE em ordem numérica).
4. Deve aparecer "Success. No rows returned". Confira em **Table Editor**: as tabelas `tracks`, `blocks`, `item_groups`, `items`, `user_checks`, `sessions`, `user_settings` devem existir.

### 1.3 Pegar as chaves
1. Menu lateral: **Project Settings** (engrenagem) → **API Keys**.
2. Você vai usar três coisas:
   - **Project URL** (algo como `https://abcdefgh.supabase.co`)
   - **anon public** key (pode ser exposta no navegador — o RLS protege os dados)
   - **service_role** key (⚠️ SECRETA — só pro seed, nunca no git nem na Vercel)

### 1.4 Configurar o `.env.local`
1. Na raiz do projeto, copie o arquivo `.env.local.example` e renomeie a cópia para `.env.local`.
2. Preencha as três variáveis com os valores do passo 1.3.

### 1.5 Popular as trilhas (seed)
No terminal, na pasta do projeto:
```
npm install   (só na primeira vez)
npm run seed
```
Deve imprimir: `✔ Dev: 7 blocos... ✔ IA · Automação... ✔ Inglês... Seed concluído!`

### 1.6 Configurar o login por e-mail
1. No Supabase: **Authentication → URL Configuration**.
2. **Site URL**: por enquanto `http://localhost:3000` (depois trocamos pela URL da Vercel).
3. **Redirect URLs** → Add URL: `http://localhost:3000/auth/callback`.
4. Em **Authentication → Sessions**, confira que **Time-box user sessions** e **Inactivity timeout** estão desligados (é o padrão) — é isso que mantém você logado por meses.

### 1.7 Testar na sua máquina
```
npm run dev
```
Abra http://localhost:3000 e confira:
- O painel abre SEM login, com as 3 trilhas e o pomodoro funcionando.
- Clique em **entrar**, digite seu e-mail → chega um e-mail "Magic Link" (olhe o spam) → clique no link **no mesmo navegador** → você volta logado.
- Marque um item numa trilha, rode um pomodoro curto (foco custom de 1 min) → aparece em "Últimas sessões".

> Limite do e-mail grátis do Supabase: poucos envios por hora. Se pedir link demais, espere uma hora.

---

## Parte 2 — Vercel (site no ar)

### 2.1 Importar o projeto
1. Acesse [vercel.com](https://vercel.com) → **Sign up/Login com GitHub**.
2. **Add New → Project** → aparece a lista dos seus repositórios → **Import** no `roadmap`.
3. Em **Branch**, se estiver publicando antes do merge, selecione `v1` (senão `main`).

### 2.2 Variáveis de ambiente
Ainda na tela de import, abra **Environment Variables** e adicione DUAS (a service_role NÃO vai):

| Nome | Valor |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | a Project URL do passo 1.3 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | a anon key do passo 1.3 |

### 2.3 Deploy
Clique **Deploy** e aguarde (~2 min). No final a Vercel mostra a URL do site (ex.: `https://roadmap-xxxx.vercel.app`).

### 2.4 Avisar o Supabase da URL nova
1. Volte no Supabase: **Authentication → URL Configuration**.
2. **Site URL**: troque para a URL da Vercel.
3. **Redirect URLs** → adicione `https://SUA-URL.vercel.app/auth/callback` (mantenha a de localhost também).

### 2.5 Teste final no ar
- Abra a URL da Vercel no celular e no PC: painel abre sem login, tema acompanha o claro/escuro do aparelho.
- Faça login pelo site publicado e confira que o progresso salva.
- **Teste da sessão persistente:** feche o navegador, volte outro dia → deve continuar logado.

---

## Já tinha instalado e chegou uma atualização?

Quando o código ganhar uma migration nova (`supabase/migrations/000X_*.sql`):
1. Rode o(s) arquivo(s) novo(s) no **SQL Editor**, em ordem numérica.
2. Se a atualização mudou o CONTEÚDO das trilhas, rode `npm run seed -- --force` — ⚠️ isso apaga os checks marcados de todos os usuários (sessões e streak ficam intactos).
3. `git pull` na sua máquina; a Vercel redeploya sozinha a cada push na branch conectada.

## Problemas comuns

| Sintoma | Causa provável | Solução |
|---|---|---|
| "As trilhas ainda não foram carregadas" | seed não rodou | Parte 1.5 |
| E-mail de login não chega | spam ou limite/hora | olhe o spam; espere 1h |
| Link do e-mail dá "link inválido" | aberto em outro navegador, ou Redirect URL errada | abra no mesmo navegador; confira 1.6/2.4 |
| Login para de funcionar do nada | projeto Supabase pausado (plano grátis, ~1 semana sem uso) | dashboard do Supabase → Restore project |
| Site com erro 500 | env vars erradas na Vercel | confira 2.2 e redeploy |

## Manutenção mínima

- **Backup mensal (2 min):** Supabase → Table Editor → `user_checks` e `sessions` → Export CSV. Guarda no Drive.
- A cada push no GitHub, o CI roda testes e a Vercel publica sozinha. Se o CI ficar vermelho, não saiu deploy quebrado — me chama pra consertar.
