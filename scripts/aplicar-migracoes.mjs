// Aplica no banco as migrations de supabase/migrations/ que ainda não rodaram.
// (Mesmo esquema do site_maranatha: conexão direta pelo DATABASE_URL.)
//
// Uso:
//   npm run migrar                     → aplica as pendentes, em ordem
//   npm run migrar -- --baseline 0012  → UMA VEZ SÓ, num banco onde as
//                                        migrations foram aplicadas à mão:
//                                        marca 0001..0012 como já aplicadas,
//                                        SEM rodar nenhuma delas
//
// Cada migration roda numa transação: se der erro, nada dela fica no banco.
// O que já rodou fica registrado na tabela migracoes_aplicadas.

import { readFileSync, readdirSync } from "node:fs";
import { config } from "dotenv";
import pg from "pg";

config({ path: ".env.local", quiet: true });

const PASTA = "supabase/migrations";
const prefixo = (nome) => nome.split("_")[0]; // "0012_descricoes.sql" → "0012"

// Devolve o código de saída (0 = ok). Toda saída passa pelo `finally` lá
// embaixo, que fecha a conexão — sair no meio deixaria a conexão pendurada.
async function migrar(db) {
  const arquivos = readdirSync(PASTA)
    .filter((n) => n.endsWith(".sql"))
    .sort();
  const i = process.argv.indexOf("--baseline");
  const baseline = i > 0 ? process.argv[i + 1] : null;

  await db.query(`create table if not exists migracoes_aplicadas (
    nome text primary key,
    aplicada_em timestamptz not null default now()
  )`);
  const jaAplicadas = new Set(
    (await db.query("select nome from migracoes_aplicadas")).rows.map((r) => r.nome)
  );

  // --baseline: registra o passado aplicado à mão, sem executar nada
  if (baseline) {
    if (!arquivos.some((n) => prefixo(n) === baseline)) {
      console.error(`Nenhuma migration começa com "${baseline}".`);
      return 1;
    }
    for (const nome of arquivos.filter((n) => prefixo(n) <= baseline)) {
      await db.query(
        "insert into migracoes_aplicadas (nome) values ($1) on conflict do nothing",
        [nome]
      );
      console.log(`[registrada sem rodar] ${nome}`);
    }
    console.log(`Baseline feito até ${baseline}. Agora rode: npm run migrar`);
    return 0;
  }

  // TRAVA: banco com conteúdo mas sem nenhum registro = migrations aplicadas à
  // mão no passado. Rodar tudo de novo seria perigoso (a 0006 e a 0007 apagam
  // e recriam trilhas), então para e explica o que fazer.
  if (jaAplicadas.size === 0) {
    const { tem } = (
      await db.query("select to_regclass('public.tracks') is not null as tem")
    ).rows[0];
    if (tem) {
      console.error(
        "Este banco já tem conteúdo, mas nenhuma migration registrada.\n" +
          "Registre primeiro as que já foram aplicadas à mão, por exemplo:\n" +
          "  npm run migrar -- --baseline 0012"
      );
      return 1;
    }
  }

  const pendentes = arquivos.filter((n) => !jaAplicadas.has(n));
  if (pendentes.length === 0) console.log("Nenhuma migration pendente.");

  for (const nome of pendentes) {
    const sql = readFileSync(`${PASTA}/${nome}`, "utf8");
    try {
      await db.query("begin");
      await db.query(sql);
      await db.query("insert into migracoes_aplicadas (nome) values ($1)", [nome]);
      await db.query("commit");
      console.log(`[aplicada] ${nome}`);
    } catch (e) {
      await db.query("rollback");
      console.error(`[ERRO] ${nome}: ${e.message}\nNada desta migration ficou no banco.`);
      return 1;
    }
  }
  console.log("Migrations em dia.");
  return 0;
}

const url = process.env.DATABASE_URL;
if (!url) {
  console.error(
    "Falta DATABASE_URL no .env.local.\n" +
      "Pegue no Supabase: botão Connect (topo do painel) → Session pooler → URI,\n" +
      "trocando [YOUR-PASSWORD] pela senha do banco."
  );
  process.exitCode = 1;
} else {
  const db = new pg.Client({ connectionString: url });
  // mostra os `raise notice` das migrations (ex.: "grupo já existe — pulando"),
  // menos o "already exists, skipping" (42P07) do `create table if not exists`
  db.on("notice", (n) => {
    if (n.code !== "42P07") console.log(`    aviso do banco: ${n.message}`);
  });
  await db.connect();
  try {
    process.exitCode = await migrar(db);
  } finally {
    await db.end();
  }
}
