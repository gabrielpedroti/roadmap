import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// Convenção do Next 16: este arquivo substitui o antigo middleware.ts.
export default async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  // Roda em tudo, exceto arquivos estáticos e imagens
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp3)$).*)",
  ],
};
