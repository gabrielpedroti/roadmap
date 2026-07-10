import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Roda a cada request (via proxy.ts). Duas responsabilidades:
// 1. Renovar o access token automaticamente — é isso que mantém a sessão
//    persistente por meses sem o usuário perceber.
// 2. Mandar quem já está logado de /login direto pro painel.
//
// O app é PÚBLICO para visualização (roadmaps e pomodoro funcionam sem
// conta); login só é necessário para salvar progresso — por isso não
// existe mais redirecionamento forçado para /login.
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

  if (user && request.nextUrl.pathname.startsWith("/login")) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return response;
}
