// Carrega tudo que as telas precisam, numa tacada só (Server Components).
// Volume pequeno (conteúdo das trilhas + dados do próprio usuário),
// então buscar tudo é mais simples que otimizar query por tela.

import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";
import {
  SETTINGS_PADRAO,
  type Block,
  type Item,
  type ItemGroup,
  type Sessao,
  type Track,
  type UserSettings,
} from "./types";

export async function carregarPainel() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login"); // o proxy já barra, isto é só garantia

  // streak pode olhar bem pra trás — 1 ano de sessões cobre com folga
  const umAnoAtras = new Date(
    Date.now() - 365 * 24 * 60 * 60 * 1000
  ).toISOString();

  const [tracks, blocks, groups, items, checks, sessoes, settings] =
    await Promise.all([
      supabase.from("tracks").select("*").order("ordem"),
      supabase.from("blocks").select("*").order("ordem"),
      supabase.from("item_groups").select("*").order("ordem"),
      supabase.from("items").select("*").order("ordem"),
      supabase.from("user_checks").select("item_id"),
      supabase
        .from("sessions")
        .select("*")
        .gte("started_at", umAnoAtras)
        .order("started_at", { ascending: false }),
      supabase.from("user_settings").select("*").maybeSingle(),
    ]);

  return {
    user,
    tracks: (tracks.data ?? []) as Track[],
    blocks: (blocks.data ?? []) as Block[],
    groups: (groups.data ?? []) as ItemGroup[],
    items: (items.data ?? []) as Item[],
    feitos: new Set(
      ((checks.data ?? []) as { item_id: string }[]).map((c) => c.item_id)
    ),
    sessoes: (sessoes.data ?? []) as Sessao[],
    // sem linha salva ainda → usa os padrões da SPEC (a linha só é criada
    // quando o usuário salvar o modal de configurações)
    settings: (settings.data ?? {
      user_id: user.id,
      ...SETTINGS_PADRAO,
    }) as UserSettings,
  };
}
