import Link from "next/link";
import { Abas } from "@/components/Abas";
import { Barra, destinosDasAbas } from "@/components/Barra";
import { BarraProgresso } from "@/components/BarraProgresso";
import { Constancia } from "@/components/Constancia";
import { Icone } from "@/components/Icone";
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
import { semEmoji } from "@/lib/texto";
import { varsDaTrilha } from "@/lib/tons";

// Home (visual aprovado: .agents/context/mockup-apple/apple.html):
// Trilhas em cima à esquerda, Constância embaixo dela e o Pomodoro à
// direita; no computador a Home inteira cabe na altura da janela.
// Últimas sessões fica recolhida no rodapé.
// Visitante sem login vê tudo e usa o pomodoro; salvar exige conta.
export default async function Home() {
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
    <div className="app app-painel" data-app>
      <Barra email={user?.email ?? null} tracks={tracks} atual="home" titulo="Home" />

      <main className="conteudo miolo">
        {tracks.length === 0 ? (
          <section className="cartao vazio">
            <p>As trilhas ainda não estão no banco.</p>
            <p>
              Se o app é seu: rode <code>npm run seed</code> e recarregue.
            </p>
          </section>
        ) : (
          // a ordem de leitura é Trilhas, Constância, Pomodoro em todos os
          // tamanhos; só a posição visual muda (CSS da .painel-grade)
          <div className="painel-grade">
            <section className="cartao trilhas" aria-labelledby="t-trilhas">
              <div className="cartao-cab">
                <h2 className="cartao-titulo" id="t-trilhas">
                  Trilhas
                </h2>
              </div>
              <ul className="lista-trilhas">
                {trilhas.map((t) => (
                  <li key={t.id}>
                    {/* sem bolinha: a cor vai no nome (--tom) e na barra */}
                    <Link
                      href={`/trilha/${t.slug}`}
                      className="trilha-linha com-cor"
                      style={varsDaTrilha(t.cor)}
                    >
                      <span className="trilha-nome">{semEmoji(t.nome)}</span>
                      {user ? (
                        <span className="trilha-pct tab">
                          {Math.round(t.progresso * 100)}%
                        </span>
                      ) : (
                        <span className="trilha-pct">
                          <span aria-hidden="true">—</span>
                          <span className="sr">sem progresso salvo</span>
                        </span>
                      )}
                      <Icone nome="chev-dir" />
                      <BarraProgresso fracao={user ? t.progresso : 0} />
                    </Link>
                  </li>
                ))}
              </ul>
              {!user && (
                <p className="dica">
                  <Link href="/login">Entre</Link> para marcar e acompanhar seu
                  progresso.
                </p>
              )}
            </section>

            <Constancia
              logado={!!user}
              hoje={hoje}
              streakDias={streak}
              minutosHoje={porDia.get(hoje) ?? 0}
              minutosSemana={minutosNaSemana(
                porDia,
                hoje,
                // linha antiga no banco pode não ter a coluna ainda → segunda
                settings.inicio_semana ?? "seg"
              )}
              minutosMes={minutosNoMes(porDia, hoje)}
              settings={settings}
              trilhas={tracks}
              userId={user?.id ?? null}
            />

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

      {/* abas do pé (só no celular): depois do <main>, na ordem de leitura */}
      <Abas destinos={destinosDasAbas(tracks, "home")} posicao="pe" />
    </div>
  );
}
