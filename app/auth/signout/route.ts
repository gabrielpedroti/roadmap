import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Único jeito de deslogar é este POST (botão "sair" no cabeçalho).
export async function POST(request: Request) {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL("/login", request.url), {
    status: 302,
  });
}
