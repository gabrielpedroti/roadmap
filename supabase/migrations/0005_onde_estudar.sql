-- =============================================================
-- v1.5 — "onde estudar" cada conceito (chips na tela da trilha)
-- Como aplicar: Supabase Dashboard → SQL Editor → colar tudo → Run
--
-- Diferente de items.fonte (que diz que o item É um curso), esta coluna diz
-- ONDE ESTUDAR o conceito: lista de { plataforma, tipo, nome }.
-- Idempotente e NÃO apaga progresso (mexe só na tabela de conteúdo).
--
-- ARQUIVO GERADO a partir de supabase/seed/onde-estudar-dev.ts — não editar
-- na mão; regerar se o mapa mudar.
-- =============================================================

alter table items add column if not exists onde_estudar jsonb not null default '[]'::jsonb;

-- limpa antes pra poder rodar de novo sem duplicar
update items i set onde_estudar = '[]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev';

update items i set onde_estudar = '[{"plataforma":"alura","tipo":"curso","nome":"VSCode: dicas e truques"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Instalar e configurar Python + VS Code';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"curso","nome":"VSCode: dicas e truques"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'VS Code proficiente';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"curso","nome":"Windows Prompt: utilizando o CMD"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Terminal básico';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"curso","nome":"Git e GitHub: controle de versão"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'O que é controle de versão';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"curso","nome":"Git e GitHub: controle de versão"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Ciclo básico';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"curso","nome":"Git e GitHub: controle de versão"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Histórico';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"curso","nome":"Git e GitHub: compartilhando e colaborando"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Branches';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"curso","nome":"Git e GitHub: compartilhando e colaborando"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'GitHub';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"curso","nome":"Git e GitHub: compartilhando e colaborando"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Fluxo diário';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"A partir do zero: iniciante em programação"},{"plataforma":"puc","tipo":"materia","nome":"Raciocínio Computacional"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Variáveis e tipos';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"A partir do zero: iniciante em programação"},{"plataforma":"puc","tipo":"materia","nome":"Raciocínio Computacional"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Operadores';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"Aprenda a programar em Python com OO"},{"plataforma":"puc","tipo":"materia","nome":"Raciocínio Computacional"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Entrada e saída';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"A partir do zero: iniciante em programação"},{"plataforma":"puc","tipo":"materia","nome":"Raciocínio Computacional"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Condicionais';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"A partir do zero: iniciante em programação"},{"plataforma":"puc","tipo":"materia","nome":"Raciocínio Computacional"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Laços';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"Aprenda a programar em Python com OO"},{"plataforma":"puc","tipo":"materia","nome":"Raciocínio Computacional"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Funções';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"Aprenda a programar em Python com OO"},{"plataforma":"puc","tipo":"materia","nome":"Raciocínio Computacional"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Erros';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"Aprenda a programar em Python com OO"},{"plataforma":"puc","tipo":"materia","nome":"Raciocínio Computacional"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Listas';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"Aprenda a programar em Python com OO"},{"plataforma":"puc","tipo":"materia","nome":"Raciocínio Computacional"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Dicionários';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"Aprenda a programar em Python com OO"},{"plataforma":"puc","tipo":"materia","nome":"Raciocínio Computacional"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Tuplas e sets';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"Praticando Python"},{"plataforma":"puc","tipo":"materia","nome":"Raciocínio Computacional"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'List comprehensions';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"Aprenda a programar em Python com OO"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Ler e escrever arquivos texto';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"Praticando Python"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'CSV';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"Praticando Python"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'JSON';
update items i set onde_estudar = '[{"plataforma":"puc","tipo":"materia","nome":"Matemática Aplicada à Computação"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Lógica proposicional';
update items i set onde_estudar = '[{"plataforma":"puc","tipo":"materia","nome":"Matemática Aplicada à Computação"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Bases numéricas';
update items i set onde_estudar = '[{"plataforma":"puc","tipo":"materia","nome":"Matemática Aplicada à Computação"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Proporção e porcentagem aplicadas';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"Aprenda a programar em Python com OO"},{"plataforma":"puc","tipo":"materia","nome":"Fundamentos de POO"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Classes e objetos';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"Aprenda a programar em Python com OO"},{"plataforma":"puc","tipo":"materia","nome":"Fundamentos de POO"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Encapsulamento';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"Aprenda a programar em Python com OO"},{"plataforma":"puc","tipo":"materia","nome":"Fundamentos de POO"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Herança';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"Aprenda a programar em Python com OO"},{"plataforma":"puc","tipo":"materia","nome":"Fundamentos de POO"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Polimorfismo';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"Praticando Python"},{"plataforma":"puc","tipo":"materia","nome":"Fundamentos de POO"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Composição';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"Praticando Python"},{"plataforma":"puc","tipo":"materia","nome":"Fundamentos de POO"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Métodos especiais';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"curso","nome":"Estrutura de dados: pilhas, filas e listas com Python"},{"plataforma":"puc","tipo":"materia","nome":"Métodos de Pesquisa e Ordenação em Estruturas de Dados"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Pilha e fila';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"curso","nome":"Estrutura de dados: pilhas, filas e listas com Python"},{"plataforma":"puc","tipo":"materia","nome":"Métodos de Pesquisa e Ordenação em Estruturas de Dados"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Lista ligada';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"curso","nome":"Algoritmos II"},{"plataforma":"puc","tipo":"materia","nome":"Métodos de Pesquisa e Ordenação em Estruturas de Dados"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Busca';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"curso","nome":"Algoritmos I"},{"plataforma":"alura","tipo":"curso","nome":"Algoritmos II"},{"plataforma":"puc","tipo":"materia","nome":"Métodos de Pesquisa e Ordenação em Estruturas de Dados"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Ordenação';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"curso","nome":"Algoritmos II"},{"plataforma":"puc","tipo":"materia","nome":"Métodos de Pesquisa e Ordenação em Estruturas de Dados"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Complexidade';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"Aprenda a programar em Python com OO"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Módulos e imports';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"Praticando Python"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Ambientes virtuais';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"curso","nome":"Python: avance na OO e consuma API"},{"plataforma":"puc","tipo":"materia","nome":"Fundamentos de IoT"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'HTTP essencial';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"curso","nome":"Python: avance na OO e consuma API"},{"plataforma":"puc","tipo":"materia","nome":"Fundamentos de IoT"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'requests';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"curso","nome":"Python: avance na OO e consuma API"},{"plataforma":"puc","tipo":"materia","nome":"Fundamentos de IoT"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Autenticação';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"curso","nome":"Python: avance na OO e consuma API"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Paginação';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"curso","nome":"Python: testes automatizados e qualidade de código"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'pytest básico';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"curso","nome":"Python: testes automatizados e qualidade de código"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Casos de borda';
update items i set onde_estudar = '[{"plataforma":"puc","tipo":"materia","nome":"Fundamentos de IoT"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Conceito e arquitetura IoT';
update items i set onde_estudar = '[{"plataforma":"puc","tipo":"materia","nome":"IoT em um Mundo Conectado"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Protocolos';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"Desenvolvimento Front-end HTML/CSS/JS"},{"plataforma":"puc","tipo":"materia","nome":"Fundamentos de Programação Web"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Cliente/servidor';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"Desenvolvimento Front-end HTML/CSS/JS"},{"plataforma":"puc","tipo":"materia","nome":"Fundamentos de Programação Web"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'HTTP na prática';
update items i set onde_estudar = '[{"plataforma":"puc","tipo":"materia","nome":"Fundamentos de Programação Web"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'DNS e domínios';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"HTML e CSS para projetos web"},{"plataforma":"puc","tipo":"materia","nome":"Fundamentos de Programação Web"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Estrutura e semântica';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"HTML e CSS para projetos web"},{"plataforma":"puc","tipo":"materia","nome":"Fundamentos de Programação Web"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Formulários';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"HTML e CSS para projetos web"},{"plataforma":"puc","tipo":"materia","nome":"Interação Humano-Computador"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Acessibilidade básica';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"HTML e CSS para projetos web"},{"plataforma":"puc","tipo":"materia","nome":"Fundamentos de Programação Web"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Box model';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"HTML e CSS para projetos web"},{"plataforma":"puc","tipo":"materia","nome":"Fundamentos de Programação Web"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Flexbox';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"HTML e CSS para projetos web"},{"plataforma":"puc","tipo":"materia","nome":"Fundamentos de Programação Web"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Grid';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"HTML e CSS para projetos web"},{"plataforma":"puc","tipo":"materia","nome":"Fundamentos de Programação Web"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Responsivo';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"HTML e CSS para projetos web"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Variáveis CSS e organização';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"Desenvolvimento Front-end HTML/CSS/JS"},{"plataforma":"puc","tipo":"materia","nome":"Fundamentos de Programação Web"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Sintaxe básica';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"Desenvolvimento Front-end HTML/CSS/JS"},{"plataforma":"puc","tipo":"materia","nome":"Fundamentos de Programação Web"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'DOM';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"Desenvolvimento Front-end HTML/CSS/JS"},{"plataforma":"puc","tipo":"materia","nome":"Fundamentos de Programação Web"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Eventos';
update items i set onde_estudar = '[{"plataforma":"puc","tipo":"materia","nome":"Interação Humano-Computador"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Heurísticas de usabilidade';
update items i set onde_estudar = '[{"plataforma":"puc","tipo":"materia","nome":"Interação Humano-Computador"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Hierarquia visual';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"curso","nome":"JavaScript: explorando a linguagem"},{"plataforma":"puc","tipo":"materia","nome":"Tecnologias para Desenvolvimento Web (parte 1)"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Tipos e coerção';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"curso","nome":"JavaScript: explorando a linguagem"},{"plataforma":"puc","tipo":"materia","nome":"Tecnologias para Desenvolvimento Web (parte 1)"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Escopo e hoisting';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"curso","nome":"JavaScript: explorando a linguagem"},{"plataforma":"puc","tipo":"materia","nome":"Tecnologias para Desenvolvimento Web (parte 1)"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Arrow functions';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"curso","nome":"JavaScript: explorando a linguagem"},{"plataforma":"puc","tipo":"materia","nome":"Tecnologias para Desenvolvimento Web (parte 1)"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Destructuring, spread, template literals';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"curso","nome":"JavaScript: explorando a linguagem"},{"plataforma":"puc","tipo":"materia","nome":"Tecnologias para Desenvolvimento Web (parte 1)"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Callbacks e higher-order functions';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"curso","nome":"JavaScript: explorando a linguagem"},{"plataforma":"puc","tipo":"materia","nome":"Tecnologias para Desenvolvimento Web (parte 1)"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Closures';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"curso","nome":"JavaScript: explorando a linguagem"},{"plataforma":"puc","tipo":"materia","nome":"Tecnologias para Desenvolvimento Web (parte 1)"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'this';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"curso","nome":"JavaScript: explorando a linguagem"},{"plataforma":"puc","tipo":"materia","nome":"Tecnologias para Desenvolvimento Web (parte 1)"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Protótipos';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"curso","nome":"JavaScript: explorando a linguagem"},{"plataforma":"puc","tipo":"materia","nome":"Tecnologias para Desenvolvimento Web (parte 1)"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Classes ES6';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"curso","nome":"JavaScript: métodos de array"},{"plataforma":"puc","tipo":"materia","nome":"Tecnologias para Desenvolvimento Web (parte 1)"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'map / filter / reduce';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"Desenvolvimento Front-end HTML/CSS/JS"},{"plataforma":"puc","tipo":"materia","nome":"Tecnologias para Desenvolvimento Web (parte 1)"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'find, some, every, sort';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"curso","nome":"JavaScript: entendendo promises e async/await"},{"plataforma":"puc","tipo":"materia","nome":"Tecnologias para Desenvolvimento Web (parte 1)"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Event loop';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"curso","nome":"JavaScript: entendendo promises e async/await"},{"plataforma":"puc","tipo":"materia","nome":"Tecnologias para Desenvolvimento Web (parte 1)"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Promises';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"curso","nome":"JavaScript: entendendo promises e async/await"},{"plataforma":"puc","tipo":"materia","nome":"Tecnologias para Desenvolvimento Web (parte 1)"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'async/await';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"curso","nome":"JS na web: CRUD com JavaScript assíncrono"},{"plataforma":"puc","tipo":"materia","nome":"Tecnologias para Desenvolvimento Web (parte 1)"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'fetch';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"Desenvolvimento Front-end HTML/CSS/JS"},{"plataforma":"puc","tipo":"materia","nome":"Tecnologias para Desenvolvimento Web (parte 1)"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'import/export';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"Desenvolvimento Front-end HTML/CSS/JS"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'ESLint + Prettier';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"APIs com Node.js e Express"},{"plataforma":"puc","tipo":"materia","nome":"Tecnologias para Desenvolvimento Web (parte 2)"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Runtime e npm';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"APIs com Node.js e Express"},{"plataforma":"puc","tipo":"materia","nome":"Tecnologias para Desenvolvimento Web (parte 2)"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Assincronia no servidor';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"APIs com Node.js e Express"},{"plataforma":"puc","tipo":"materia","nome":"Tecnologias para Desenvolvimento Web (parte 2)"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Rotas e verbos';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"APIs com Node.js e Express"},{"plataforma":"puc","tipo":"materia","nome":"Tecnologias para Desenvolvimento Web (parte 2)"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Middlewares';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"APIs com Node.js e Express"},{"plataforma":"puc","tipo":"materia","nome":"Tecnologias para Desenvolvimento Web (parte 2)"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Status codes e erros';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"APIs com Node.js e Express"},{"plataforma":"puc","tipo":"materia","nome":"Sistemas Web Seguros"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Validação de entrada';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"SQL com PostgreSQL"},{"plataforma":"puc","tipo":"materia","nome":"Banco de Dados para TI"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Modelagem';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"SQL com PostgreSQL"},{"plataforma":"puc","tipo":"materia","nome":"Banco de Dados para TI"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'CRUD em SQL';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"SQL com PostgreSQL"},{"plataforma":"puc","tipo":"materia","nome":"Banco de Dados para TI"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'JOINs';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"SQL com PostgreSQL"},{"plataforma":"puc","tipo":"materia","nome":"Banco de Dados para TI"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Agregações';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"SQL com PostgreSQL"},{"plataforma":"puc","tipo":"materia","nome":"Banco de Dados para TI"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Índices e transações';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"APIs com Node.js e Express"},{"plataforma":"puc","tipo":"materia","nome":"Banco de Dados para TI"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Conexão Node ↔ Postgres';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"APIs com Node.js e Express"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Variáveis de ambiente';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"APIs com Node.js e Express"},{"plataforma":"puc","tipo":"materia","nome":"Sistemas Web Seguros"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Hash de senha';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"APIs com Node.js e Express"},{"plataforma":"puc","tipo":"materia","nome":"Sistemas Web Seguros"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'JWT vs sessão';
update items i set onde_estudar = '[{"plataforma":"puc","tipo":"materia","nome":"Segurança da Tecnologia da Informação"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'OWASP essencial';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"APIs com Node.js e Express"},{"plataforma":"puc","tipo":"materia","nome":"Sistemas Web Seguros"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'HTTPS e CORS';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"TypeScript (parte 1)"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Tipos básicos';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"TypeScript (parte 1)"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Interfaces e types';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"TypeScript (parte 2)"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Unions e narrowing';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"TypeScript (parte 2)"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Generics básicos';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"TypeScript (parte 1)"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'tsconfig';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"React com JavaScript"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Componentes e JSX';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"React com JavaScript"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Estado';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"React com JavaScript"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Efeitos';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"React com JavaScript"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Listas e formulários';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"React com JavaScript"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Consumo de API';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"React com JavaScript"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Roteamento';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"React com JavaScript"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Context';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"React com JavaScript"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Vite/Next';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"React com JavaScript"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Deploy na Vercel';
update items i set onde_estudar = '[{"plataforma":"puc","tipo":"materia","nome":"Fundamentos de Engenharia de Software"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Ciclo de vida';
update items i set onde_estudar = '[{"plataforma":"puc","tipo":"materia","nome":"Especificação de Sistemas de Informação"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Requisitos';
update items i set onde_estudar = '[{"plataforma":"puc","tipo":"materia","nome":"Projeto de Sistemas de Informação"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Especificação e modelagem';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"curso","nome":"Scrum: agilidade em seu projeto"},{"plataforma":"puc","tipo":"materia","nome":"Métodos Ágeis em TI"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Scrum';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"Gestão Ágil de Projetos"},{"plataforma":"puc","tipo":"materia","nome":"Métodos Ágeis em TI"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Kanban';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"Gestão Ágil de Projetos"},{"plataforma":"puc","tipo":"materia","nome":"Gestão de Projetos em Computação"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Gestão de projetos';
update items i set onde_estudar = '[{"plataforma":"puc","tipo":"materia","nome":"Gestão de Serviços de TI"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Gestão de serviços';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"Começando em DevOps"},{"plataforma":"puc","tipo":"materia","nome":"DevOps"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Docker';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"Começando em DevOps"},{"plataforma":"puc","tipo":"materia","nome":"DevOps"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'CI/CD';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"curso","nome":"Cloud: introdução"},{"plataforma":"puc","tipo":"materia","nome":"Cloud Computing"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Cloud';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"Desenvolva seu primeiro app com React Native"},{"plataforma":"puc","tipo":"materia","nome":"Desenvolvimento para Dispositivos Móveis"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'Nativo vs híbrido';
update items i set onde_estudar = '[{"plataforma":"alura","tipo":"trilha","nome":"Desenvolva seu primeiro app com React Native"},{"plataforma":"puc","tipo":"materia","nome":"Desenvolvimento para Dispositivos Móveis"}]'::jsonb
from item_groups g join blocks b on b.id = g.block_id join tracks t on t.id = b.track_id
where i.group_id = g.id and t.slug = 'dev' and i.titulo = 'React Native primeiro contato';

-- Confira:  select count(*) from items where onde_estudar <> '[]'::jsonb;
-- (esperado: 123)
