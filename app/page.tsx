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

// Dashboard (layout aprovado em docs/mockups/proposta-final.html):
// Trilhas + Constância empilhadas à esquerda, Foco (pomodoro) à direita,
// últimas sessões recolhidas no rodapé. Tudo cabe na altura da tela.
// Visitante sem login vê tudo e usa o pomodoro; salvar exige conta.
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

  // streak e metas (zerados para visitante)
  const hoje = hojeSP();
  const porDia = minutosPorDia(sessoes);
  const streak = calcularStreak(porDia, {
    minDiario: settings.streak_min_diario_min,
    historicoMin: settings.streak_min_historico, // mínimo não-retroativo
    diasQueContam: settings.dias_que_contam,
    hoje,
  });
  const trilhasInfo = Object.fromEntries(
    tracks.map((t) => [t.id, { nome: t.nome, cor: t.cor }])
  );

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[1320px] flex-col px-[clamp(14px,2.5vw,32px)] py-[clamp(12px,2vh,24px)]">
      <Cabecalho email={user?.email ?? null} tracks={tracks} atual="home" />

      {tracks.length === 0 ? (
        <div className="cartao flex flex-1 items-center justify-center p-8 text-center text-[13px] text-tinta2">
          As trilhas ainda não foram carregadas no banco.
          <br />
          Rode <code className="mx-1 text-tinta">npm run seed</code> e
          recarregue.
        </div>
      ) : (
        <div className="grid flex-1 gap-[clamp(10px,1.5vw,18px)] md:grid-cols-[1fr_1.35fr]">
          {/* Coluna esquerda: Trilhas em cima, Constância embaixo */}
          <div className="flex min-h-0 flex-col gap-[clamp(10px,1.5vw,18px)] max-md:order-2">
            <section className="cartao p-[clamp(16px,1.8vw,24px)]">
              <h2 className="text-[13px] font-semibold text-tinta2">
                Trilhas
              </h2>
              <div className="mt-4 flex flex-col gap-[clamp(12px,2.2vh,22px)]">
                {trilhas.map((t) => (
                  <Link key={t.id} href={`/trilha/${t.slug}`} className="block">
                    <div
                      className="com-cor mb-2 flex items-center gap-1 text-[15px] font-semibold"
                      style={{ "--cor": t.cor } as React.CSSProperties}
                    >
                      <span style={{ color: "var(--cor-texto)" }}>{t.nome}</span>
                      <span className="font-normal text-tinta2">›</span>
                      <span className="ml-auto text-[14px] font-normal tabular-nums text-tinta2">
                        {user ? `${Math.round(t.progresso * 100)}%` : "—"}
                      </span>
                    </div>
                    <BarraProgresso
                      fracao={user ? t.progresso : 0}
                      cor={t.cor}
                    />
                  </Link>
                ))}
              </div>
              {!user && (
                <p className="mt-4 text-[12px] text-tinta2">
                  <Link href="/login" className="text-acao">
                    Entre
                  </Link>{" "}
                  para marcar e acompanhar seu progresso.
                </p>
              )}
            </section>

            <Constancia
              logado={!!user}
              streakDias={streak}
              minutosHoje={porDia.get(hoje) ?? 0}
              minutosSemana={minutosNaSemana(porDia, hoje)}
              minutosMes={minutosNoMes(porDia, hoje)}
              settings={settings}
              trilhas={tracks}
              userId={user?.id ?? null}
            />
          </div>

          {/* Coluna direita: Foco (pomodoro) */}
          <Pomodoro
            trilhas={tracks}
            settings={settings}
            userId={user?.id ?? null}
          />
        </div>
      )}

      <UltimasSessoes
        logado={!!user}
        sessoes={sessoes.slice(0, 8)}
        trilhasInfo={trilhasInfo}
        hoje={hoje}
      />
    </main>
  );
}
