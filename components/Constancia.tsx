"use client";

import { useState } from "react";
import Link from "next/link";
import { estadoDaChama } from "@/lib/chama";
import { formatarHoras } from "@/lib/formato";
import type { Track, UserSettings } from "@/lib/types";
import { BarraProgresso } from "./BarraProgresso";
import { Chama } from "./Chama";
import { Icone } from "./Icone";
import { ModalConfigConstancia } from "./ModalConfigConstancia";
import { ModalRegistroManual } from "./ModalRegistroManual";

// Card de Constância. Streak e metas são INDEPENDENTES: a chama e o número
// medem constância (mínimo diário); as barras medem volume (horas).
// REGRA DA CHAMA (lib/chama.ts): só acende se o mínimo de HOJE foi cumprido,
// ou se hoje não é dia que conta. A legenda diz o porquê.
export function Constancia({
  logado,
  hoje,
  streakDias,
  minutosHoje,
  minutosSemana,
  minutosMes,
  settings,
  trilhas,
  userId,
}: {
  logado: boolean;
  hoje: string; // YYYY-MM-DD em São Paulo (vem do servidor)
  streakDias: number;
  minutosHoje: number;
  minutosSemana: number;
  minutosMes: number;
  settings: UserSettings;
  trilhas: Track[];
  userId: string | null;
}) {
  const [registroAberto, setRegistroAberto] = useState(false);
  const [configAberta, setConfigAberta] = useState(false);

  // visitante: convite no lugar do dado (sem engrenagem)
  if (!logado || !userId) {
    return (
      <section className="cartao const" aria-labelledby="t-const">
        <div className="cartao-cab">
          <h2 className="cartao-titulo" id="t-const">
            Constância
          </h2>
        </div>
        <div className="visitante-miolo">
          <Chama acesa={false} convite />
          <p>Streak diário e metas de horas ficam salvos na sua conta.</p>
          <Link href="/login" className="btn btn-prim">
            Entrar para acompanhar
          </Link>
        </div>
      </section>
    );
  }

  const chama = estadoDaChama({
    hoje,
    minutosHoje,
    minimo: settings.streak_min_diario_min,
    diasQueContam: settings.dias_que_contam,
  });

  return (
    <>
      <section className="cartao const" aria-labelledby="t-const">
        <div className="cartao-cab">
          <h2 className="cartao-titulo" id="t-const">
            Constância
          </h2>
          <button
            type="button"
            className="btn-icone"
            aria-label="Ajustes de constância e metas"
            title="Constância e metas"
            onClick={() => setConfigAberta(true)}
          >
            <Icone nome="engrenagem" />
          </button>
        </div>

        {/* o herói: o NÚMERO manda e a chama acompanha a altura dele */}
        <div className="const-topo">
          <div className="heroi">
            <Chama acesa={chama.acesa} />
            <div>
              {/* o espaço é real: o leitor de tela lê "12 dias" (e não
                  "12dias"); no visual quem separa é a margem do span */}
              <p className="streak tab">
                {streakDias} <span>{streakDias === 1 ? "dia" : "dias"}</span>
              </p>
              <p className="chama-legenda">{chama.legenda}</p>
            </div>
          </div>
        </div>

        <div className="metas">
          <Meta rotulo="Semana" nomeDaBarra="Meta da semana" minutos={minutosSemana} metaH={settings.meta_semanal_h} />
          <Meta rotulo="Mês" nomeDaBarra="Meta do mês" minutos={minutosMes} metaH={settings.meta_mensal_h} />
        </div>

        <button
          type="button"
          className="btn btn-tinta btn-largo btn-p"
          onClick={() => setRegistroAberto(true)}
        >
          <Icone nome="mais" />
          Registrar manual
        </button>
      </section>

      {/* as folhas ficam fora da section do cartão */}
      <ModalRegistroManual
        aberto={registroAberto}
        onFechar={() => setRegistroAberto(false)}
        trilhas={trilhas}
        userId={userId}
      />
      <ModalConfigConstancia
        aberto={configAberta}
        onFechar={() => setConfigAberta(false)}
        settings={settings}
        userId={userId}
      />
    </>
  );
}

// "Semana   7,5 de 10 h" + a barra (meta ultrapassada: barra cheia, valor real no texto)
function Meta({
  rotulo,
  nomeDaBarra,
  minutos,
  metaH,
}: {
  rotulo: string;
  nomeDaBarra: string;
  minutos: number;
  metaH: number;
}) {
  const feito = formatarHoras(minutos);
  const alvo = formatarHoras(metaH * 60);
  return (
    <div>
      <div className="meta-l1">
        <span>{rotulo}</span>
        <span className="meta-val tab">
          <b>{feito}</b> de {alvo} h
        </span>
      </div>
      <BarraProgresso
        fracao={minutos / (metaH * 60)}
        rotulo={nomeDaBarra}
        textoValor={`${feito} de ${alvo} horas`}
      />
    </div>
  );
}
