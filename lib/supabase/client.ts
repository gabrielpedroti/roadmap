import { createBrowserClient } from "@supabase/ssr";

// Client do Supabase para componentes que rodam no navegador ("use client").
// O @supabase/ssr guarda a sessão em cookies de longa duração — é isso que
// mantém o login vivo por meses (requisito crítico da SPEC).
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
