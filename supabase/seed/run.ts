// Seed do conteúdo global das trilhas.
//
// Como rodar (uma vez, no seu computador):
//   npm run seed             → só roda se o banco estiver vazio
//   npm run seed -- --force  → APAGA todo o conteúdo (e os checks de todos
//                              os usuários, por cascata!) e insere de novo
//
// Usa a SERVICE ROLE KEY (ignora RLS) — ela fica só no .env.local.

import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import type { SeedTrack } from "./tipos";
import { trilhaDev } from "./trilha-dev";
import { trilhaIa } from "./trilha-ia";
import { trilhaIngles } from "./trilha-ingles";

config({ path: ".env.local" });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Faltam NEXT_PUBLIC_SUPABASE_URL e/ou SUPABASE_SERVICE_ROLE_KEY no .env.local"
  );
  process.exit(1);
}

const db = createClient(url, serviceKey, {
  auth: { persistSession: false },
});

// Encerra com mensagem clara se qualquer insert falhar
function ouFalha<T>(resultado: { data: T | null; error: { message: string } | null }, contexto: string): T {
  if (resultado.error) {
    console.error(`Erro em ${contexto}: ${resultado.error.message}`);
    process.exit(1);
  }
  return resultado.data as T;
}

async function inserirTrilha(trilha: SeedTrack) {
  const track = ouFalha(
    await db
      .from("tracks")
      .insert({
        slug: trilha.slug,
        nome: trilha.nome,
        descricao: trilha.descricao,
        cor: trilha.cor,
        ordem: trilha.ordem,
      })
      .select()
      .single(),
    `track ${trilha.slug}`
  ) as { id: string };

  let blocoAnteriorId: string | null = null;
  let totalGrupos = 0;
  let totalItens = 0;

  for (const [i, bloco] of trilha.blocos.entries()) {
    const b = ouFalha(
      await db
        .from("blocks")
        .insert({
          track_id: track.id,
          titulo: bloco.titulo,
          descricao: bloco.descricao ?? null,
          ordem: i + 1,
          semanas_estimadas: bloco.semanas ?? null,
          // desbloqueio sequencial: exige o bloco anterior, exceto quem começa aberto
          prereq_block_id: bloco.comecaAberto ? null : blocoAnteriorId,
        })
        .select()
        .single(),
      `block "${bloco.titulo}"`
    ) as { id: string };

    for (const [j, grupo] of bloco.grupos.entries()) {
      const g = ouFalha(
        await db
          .from("item_groups")
          .insert({ block_id: b.id, titulo: grupo.titulo, ordem: j + 1 })
          .select()
          .single(),
        `grupo "${grupo.titulo}"`
      ) as { id: string };

      ouFalha(
        await db.from("items").insert(
          grupo.itens.map((item, k) => ({
            group_id: g.id,
            titulo: item.titulo,
            descricao: item.descricao ?? null,
            ordem: k + 1,
            tipo: item.tipo,
          }))
        ),
        `itens do grupo "${grupo.titulo}"`
      );

      totalGrupos++;
      totalItens += grupo.itens.length;
    }

    blocoAnteriorId = b.id;
  }

  console.log(
    `✔ ${trilha.nome}: ${trilha.blocos.length} blocos, ${totalGrupos} grupos, ${totalItens} itens`
  );
}

async function main() {
  const force = process.argv.includes("--force");

  const existentes = ouFalha(
    await db.from("tracks").select("id"),
    "checagem inicial"
  ) as { id: string }[];

  if (existentes.length > 0) {
    if (!force) {
      console.error(
        "O banco já tem conteúdo. Use `npm run seed -- --force` para apagar e re-seedar.\n" +
          "ATENÇÃO: --force apaga também os checks de TODOS os usuários (cascata)."
      );
      process.exit(1);
    }
    console.log("--force: apagando conteúdo existente...");
    ouFalha(
      await db.from("tracks").delete().neq("ordem", -1),
      "limpeza das trilhas"
    );
  }

  await inserirTrilha(trilhaDev);
  await inserirTrilha(trilhaIa);
  await inserirTrilha(trilhaIngles);

  // Pré-requisito cruzado (único caso da SPEC):
  // IA "Etapa 2" só abre depois do "Bloco 2" da trilha Dev.
  const devBloco2 = ouFalha(
    await db
      .from("blocks")
      .select("id, tracks!inner(slug)")
      .eq("tracks.slug", "dev")
      .eq("ordem", 2)
      .single(),
    "busca Dev Bloco 2"
  ) as { id: string };

  const iaEtapa2 = ouFalha(
    await db
      .from("blocks")
      .select("id, tracks!inner(slug)")
      .eq("tracks.slug", "ia")
      .eq("ordem", 3) // Etapa 0 é ordem 1, então Etapa 2 = ordem 3
      .single(),
    "busca IA Etapa 2"
  ) as { id: string };

  ouFalha(
    await db
      .from("blocks")
      .update({ cross_prereq_block_id: devBloco2.id })
      .eq("id", iaEtapa2.id),
    "pré-requisito cruzado"
  );

  console.log("✔ Pré-requisito cruzado: IA Etapa 2 ← Dev Bloco 2");
  console.log("\nSeed concluído! Confira as contagens acima contra os .md do kit.");
}

main();
