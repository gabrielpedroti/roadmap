import Link from "next/link";
import { BarraProgresso } from "@/components/BarraProgresso";
import { Cabecalho } from "@/components/Cabecalho";
import { Constancia } from "@/components/Constancia";
import { Pomodoro } from "@/components/Pomodoro";
import { UltimasSessoes } from "@/components/UltimasSessoes";
import { carregarPainel } from "@/lib/dados";
import { itensPorBloco, progressoDaTrilha } from "@/lib/progress";
import {
  calcularStreak,
  hojeSP,
  minutosNaSemana,
  minutosNoMes,
  minutosPorDia,
} from "@/lib/streak";

// Dashboard — layout fiel ao mockup aprovado:
// Trilhas (esquerda) · Pomodoro (centro) · Constância (direita) · rodapé
export default async function Dashboard() {
  const { user, tracks, blocks, groups, items, feitos, sessoes, settings } =
    await carregarPainel();

  // progresso de cada trilha (regra 30/70, média ponderada)
  const porBloco = itensPorBloco(blocks, groups, items, feitos);
  const trilhas = tracks.map((t) => {
    const listas = blocks
      .filter((b) => b.track_id === t.id)
      .map((b) => porBloco.get(b.id) ?? []);
    return { ...t, progresso: progressoDaTrilha(listas) };
  });

  // streak e metas
  const hoje = hojeSP();
  const porDia = minutosPorDia(sessoes);
  const streak = calcularStreak(porDia, {
    minDiario: settings.streak_min_diario_min,
    diasQueContam: settings.dias_que_contam,
    hoje,
  });
  const nomesDasTrilhas = Object.fromEntries(tracks.map((t) => [t.id, t.nome]));

  return (
    <main className="flex justify-center px-4 py-10">
      <div className="w-full max-w-[720px] rounded-2xl border border-borda-suave bg-moldura p-[18px]">
        <Cabecalho email={user.email ?? ""} />

        {tracks.length === 0 ? (
          <div className="rounded-xl border border-borda bg-cartao p-6 text-center text-[13px] text-suave">
            As trilhas ainda não foram carregadas no banco.
            <br />
            Rode <code className="text-texto">npm run seed</code> no terminal e
            recarregue.
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-[176px_1fr_192px]">
            {/* Coluna esquerda — Trilhas */}
            <div className="rounded-xl border border-borda bg-cartao p-[14px]">
              <div className="mb-[10px] text-[12px] text-suave">Trilhas</div>
              {trilhas.map((t) => (
                <Link
                  key={t.id}
                  href={`/trilha/${t.slug}`}
                  className="mb-3 block"
                >
                  <div className="mb-1 flex justify-between text-[13px]">
                    <span className="text-texto">{t.nome} ›</span>
                    <span className="text-suave">
                      {Math.round(t.progresso * 100)}%
                    </span>
                  </div>
                  <BarraProgresso fracao={t.progresso} cor={t.cor} />
                </Link>
              ))}
              <div className="text-[11px] text-apagado">
                Clique numa trilha para abrir sua tela
              </div>
            </div>

            {/* Centro — Pomodoro */}
            <Pomodoro trilhas={tracks} settings={settings} userId={user.id} />

            {/* Coluna direita — Constância */}
            <Constancia
              streakDias={streak}
              minutosSemana={minutosNaSemana(porDia, hoje)}
              minutosMes={minutosNoMes(porDia, hoje)}
              settings={settings}
              trilhas={tracks}
              userId={user.id}
            />
          </div>
        )}

        <UltimasSessoes
          sessoes={sessoes.slice(0, 8)}
          nomesDasTrilhas={nomesDasTrilhas}
          hoje={hoje}
        />
      </div>
    </main>
  );
}
