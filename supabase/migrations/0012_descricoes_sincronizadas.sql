-- =============================================================
-- v1.12 — sincroniza as DESCRIÇÕES de trilhas e blocos com o seed
-- Como aplicar: Supabase Dashboard → SQL Editor → colar tudo → Run
--
-- As migrations 0006/0007/0009 recriaram grupos e itens, mas as descrições
-- de trilha/bloco nunca foram atualizadas junto — o banco ficou com textos
-- de versões antigas do seed (alguns nulos). Esta migration iguala tudo ao
-- seed atual (fonte de verdade, regra 9 do REGRAS-DO-ROADMAP).
--
-- ARQUIVO GERADO a partir dos seeds — não editar à mão.
-- Idempotente; só UPDATEs de texto, nenhum dado de usuário é tocado.
-- =============================================================

-- ---------- trilha dev ----------
update tracks set descricao = $txt$Do zero ao full stack: revisão das 20 matérias técnicas de ADS (PUC-PR) com alicerce sólido, preparando a entrada na Pós Tech Full Stack Development da FIAP.$txt$ where slug = 'dev';

update blocks set descricao = $txt$A base de tudo: ambiente, terminal, Git e lógica de programação com Python.$txt$
where track_id = (select id from tracks where slug = 'dev') and ordem = 1;

update blocks set descricao = $txt$Orientação a objetos, estruturas de dados e o primeiro contato sério com APIs e testes. 🔓 Concluir aqui desbloqueia a Carreira 2 da trilha de IA.$txt$
where track_id = (select id from tracks where slug = 'dev') and ordem = 2;

update blocks set descricao = $txt$Como a web funciona por dentro: HTML semântico, CSS moderno e o primeiro JavaScript no navegador.$txt$
where track_id = (select id from tracks where slug = 'dev') and ordem = 3;

update blocks set descricao = $txt$A linguagem a fundo: assincronia, protótipos e arrays de verdade. ⭐ Fim deste bloco = pré-requisito mínimo da Pós Tech FIAP.$txt$
where track_id = (select id from tracks where slug = 'dev') and ordem = 4;

update blocks set descricao = $txt$O lado do servidor: Node + Express, SQL de verdade no PostgreSQL, autenticação e segurança.$txt$
where track_id = (select id from tracks where slug = 'dev') and ordem = 5;

update blocks set descricao = $txt$O ecossistema moderno de front-end: TypeScript, React e deploy na Vercel.$txt$
where track_id = (select id from tracks where slug = 'dev') and ordem = 6;

update blocks set descricao = $txt$O processo completo de construir software: engenharia, métodos ágeis, DevOps e mobile. Fim deste bloco = entrada confortável na pós.$txt$
where track_id = (select id from tracks where slug = 'dev') and ordem = 7;

-- ---------- trilha ia ----------
update tracks set descricao = $txt$IA e automação aplicadas ao BPO financeiro: 3 carreiras Alura (2 certificados — a Carreira 3 vai só até onde serve ao trabalho) + Anthropic Academy, das ferramentas no-code até agentes com a API do Claude — sempre com precisão acima de velocidade.$txt$ where slug = 'ia';

update blocks set descricao = $txt$Panorama de IA, base de programação e mindset com Claude. A base de programação NÃO é obrigatória — faça só se ainda não tiver o conhecimento.$txt$
where track_id = (select id from tracks where slug = 'ia') and ordem = 1;

update blocks set descricao = $txt$Carreira Alura de IA para Automação — ROI imediato no trabalho. Ao concluir os 3 níveis: 🎓 certificado da Carreira 1.$txt$
where track_id = (select id from tracks where slug = 'ia') and ordem = 2;

update blocks set descricao = $txt$Carreira Alura Especialista em IA — o núcleo técnico do agente do BPO. 🔒 Exige o Bloco 2 do Dev (Python sólido). A base (Pensamento computacional + Python IA) e o Nível 1 já vêm da Etapa 0 e da Carreira 1. Ao concluir: 🎓 certificado da Carreira 2.$txt$
where track_id = (select id from tracks where slug = 'ia') and ordem = 3;

update blocks set descricao = $txt$Carreira Alura Engenharia de Agentes — cobre a matéria Técnicas de Machine Learning da PUC. A base e o Nível 1 já vêm da Carreira 2. O Nível 2 (Deep Learning com PyTorch, 72h) foi CORTADO de propósito: é especialização em ML, fora do escopo do BPO — a consequência assumida é que o certificado desta carreira não fecha.$txt$
where track_id = (select id from tracks where slug = 'ia') and ordem = 4;

-- ---------- trilha ingles ----------
update tracks set descricao = $txt$Recap A1 → B2 com foco em produção: transformar o inglês passivo em inglês FALADO. Regra 50/50 — metade consumo, metade produção.$txt$ where slug = 'ingles';

update blocks set descricao = $txt$Ponto de partida: o teste EF SET mostra o nível real, sem achismo.$txt$
where track_id = (select id from tracks where slug = 'ingles') and ordem = 1;

update blocks set descricao = $txt$As estruturas básicas que precisam sair falando, sem pensar.$txt$
where track_id = (select id from tracks where slug = 'ingles') and ordem = 2;

update blocks set descricao = $txt$Contar o que aconteceu ontem e o que vem amanhã.$txt$
where track_id = (select id from tracks where slug = 'ingles') and ordem = 3;

update blocks set descricao = $txt$Condicionais, modais e voz passiva — conversa de verdade, com opinião.$txt$
where track_id = (select id from tracks where slug = 'ingles') and ordem = 4;

update blocks set descricao = $txt$Nuances, conectores formais e inglês profissional por escrito e falado.$txt$
where track_id = (select id from tracks where slug = 'ingles') and ordem = 5;

