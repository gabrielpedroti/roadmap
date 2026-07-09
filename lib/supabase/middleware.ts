import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Roda a cada request (via proxy.ts). Duas responsabilidades:
// 1. Renovar o access token automaticamente — é isso que mantém a sessão
//    persistente por meses sem o usuário perceber.
// 2. Redirecionar quem não está logado para /login.
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANTE: getUser() valida o token no servidor do Supabase e o renova
  // se estiver perto de vencer. Não remover nem trocar por getSession().
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const rota = request.nextUrl.pathname;
  const rotaPublica = rota.startsWith("/login") || rota.startsWith("/auth");

  if (!user && !rotaPublica) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (user && rota.startsWith("/login")) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return response;
}
