-- =============================================================
-- v1.10 — troca do curso-base de Python (adendo de 26/08 do plano)
-- Como aplicar: Supabase Dashboard → SQL Editor → colar tudo → Run.
--
-- O Nano "PYTHON" da FIAP é de 2018; o "PYTHON DEVELOPMENT" (80h, 6 cap)
-- é a versão atual. Esta migration corrige os chips que a 0009 gravou:
--   1) base da linguagem (B1): "Nano PYTHON (cap. 1-5)" → "Nano PYTHON
--      DEVELOPMENT" (sem anotação de capítulos — o mapa era do curso velho);
--   2) "Ler/escrever texto, CSV e JSON" (B1): volta pra Alura, o Nano novo
--      não cobre arquivos;
--   3) IoT (B2): sai o "(cap. 7-8)", volta a ser só as matérias da PUC.
--
-- Idempotente e não mexe em checks. Nada além dos chips/onde_estudar.
-- =============================================================

-- 1) os 7 conceitos da base da linguagem (todos menos o de CSV/JSON)
update items set onde_estudar = '[
  {"plataforma":"fiap","tipo":"curso","nome":"Nano PYTHON DEVELOPMENT"},
  {"plataforma":"puc","tipo":"materia","nome":"Raciocínio Computacional"}
]'::jsonb
where onde_estudar @> '[{"nome":"Nano PYTHON (cap. 1-5)"}]'::jsonb
  and titulo <> 'Ler/escrever texto, CSV e JSON';

-- 2) arquivos/CSV/JSON: de volta pro curso Alura já mapeado
update items set onde_estudar = '[
  {"plataforma":"alura","tipo":"curso","nome":"Python: avance na OO e consuma API"}
]'::jsonb
where titulo = 'Ler/escrever texto, CSV e JSON';

-- 3) IoT: de volta pra só as matérias da PUC
update items set onde_estudar = '[
  {"plataforma":"puc","tipo":"materia","nome":"Fundamentos de IoT"},
  {"plataforma":"puc","tipo":"materia","nome":"IoT em um Mundo Conectado"}
]'::jsonb
where titulo = 'Conceito e arquitetura, protocolos (HTTP vs MQTT)';
