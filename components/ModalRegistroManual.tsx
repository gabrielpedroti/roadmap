"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { hojeSP } from "@/lib/streak";
import { semEmoji } from "@/lib/texto";
import type { Track } from "@/lib/types";
import { Folha } from "./Folha";
import { Icone } from "./Icone";
import { Passo } from "./Passo";
import { Segmentado } from "./Segmentado";

// Folha "Registrar estudo manual": trilha, data e (hora início/fim OU
// duração). Serve pro estudo feito longe do app — inclusive retroativo.
export function ModalRegistroManual({
  aberto,
  onFechar,
  trilhas,
  userId,
}: {
  aberto: boolean;
  onFechar: () => void;
  trilhas: Track[];
  userId: string;
}) {
  const router = useRouter();
  const id = useId();
  const [trilhaId, setTrilhaId] = useState(trilhas[0]?.id ?? "");
  const [data, setData] = useState(hojeSP());
  const [modo, setModo] = useState<"horario" | "duracao">("horario");
  const [horaInicio, setHoraInicio] = useState("19:00");
  const [horaFim, setHoraFim] = useState("20:00");
  const [duracaoMin, setDuracaoMin] = useState(30);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);

    // Horários digitados são do fuso de São Paulo (UTC-3 fixo, sem
    // horário de verão desde 2019) — o banco guarda em UTC.
    let inicio: Date;
    let fim: Date;
    if (modo === "horario") {
      inicio = new Date(`${data}T${horaInicio}:00-03:00`);
      fim = new Date(`${data}T${horaFim}:00-03:00`);
      if (fim <= inicio) {
        setErro("A hora de fim precisa ser depois da de início.");
        return;
      }
    } else if (data === hojeSP()) {
      // hoje: ancora na hora REAL (acabei de estudar) — o histórico mostra
      // o horário de verdade, não um meio-dia fictício
      fim = new Date();
      inicio = new Date(fim.getTime() - duracaoMin * 60_000);
    } else {
      // data passada: não existe "agora" daquele dia, então marca ao meio-dia
      inicio = new Date(`${data}T12:00:00-03:00`);
      fim = new Date(inicio.getTime() + duracaoMin * 60_000);
    }

    const minutos = Math.round((fim.getTime() - inicio.getTime()) / 60_000);

    setSalvando(true);
    const supabase = createClient();
    const { error } = await supabase.from("sessions").insert({
      user_id: userId,
      track_id: trilhaId,
      started_at: inicio.toISOString(),
      ended_at: fim.toISOString(),
      duration_min: minutos,
      origem: "manual",
    });
    setSalvando(false);

    if (error) {
      // texto amigável (antes ia o error.message cru, em inglês)
      setErro("Não deu para registrar. Confira a conexão e tente de novo.");
      return;
    }
    router.refresh(); // sessão nova entra nas metas, streak e histórico
    onFechar();
  }

  return (
    <Folha
      aberto={aberto}
      onFechar={onFechar}
      titulo="Registrar estudo manual"
      rotuloEnviar="Registrar"
      enviando={salvando}
      onEnviar={salvar}
    >
      <div className="form-grupo">
        <div className="form-linha col">
          <span className="rotulo" id={`${id}-trilha`}>
            Trilha
          </span>
          <Segmentado
            modo="unico"
            className="seg-trilha"
            ariaLabelledby={`${id}-trilha`}
            opcoes={trilhas.map((t) => ({
              valor: t.id,
              conteudo: semEmoji(t.nome),
              titulo: semEmoji(t.nome),
            }))}
            valor={trilhaId}
            onEscolher={setTrilhaId}
          />
        </div>
        <div className="form-linha">
          <label htmlFor={`${id}-data`}>Data</label>
          <div className="passo">
            <input
              id={`${id}-data`}
              type="date"
              value={data}
              max={hojeSP()}
              onChange={(e) => setData(e.target.value)}
            />
          </div>
        </div>
        <div className="form-linha col">
          <span className="rotulo" id={`${id}-modo`}>
            Informar
          </span>
          <Segmentado
            modo="unico"
            ariaLabelledby={`${id}-modo`}
            opcoes={[
              { valor: "horario", conteudo: "início e fim" },
              { valor: "duracao", conteudo: "só a duração" },
            ]}
            valor={modo}
            onEscolher={(v) => setModo(v as "horario" | "duracao")}
          />
        </div>
        {modo === "horario" ? (
          <>
            <div className="form-linha">
              <label htmlFor={`${id}-ini`}>Início</label>
              <div className="passo">
                <input
                  id={`${id}-ini`}
                  type="time"
                  value={horaInicio}
                  onChange={(e) => setHoraInicio(e.target.value)}
                />
              </div>
            </div>
            <div className="form-linha">
              <label htmlFor={`${id}-fim`}>Fim</label>
              <div className="passo">
                <input
                  id={`${id}-fim`}
                  type="time"
                  value={horaFim}
                  onChange={(e) => setHoraFim(e.target.value)}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="form-linha">
            <label htmlFor={`${id}-dur`}>Duração</label>
            <Passo
              id={`${id}-dur`}
              valor={duracaoMin}
              onMudar={(t) => setDuracaoMin(Math.max(1, parseInt(t, 10) || 1))}
              min={1}
              unidade="min"
            />
          </div>
        )}
      </div>

      {erro && (
        <p className="form-erro" role="alert">
          <Icone nome="alerta" />
          <span>{erro}</span>
        </p>
      )}
    </Folha>
  );
}
