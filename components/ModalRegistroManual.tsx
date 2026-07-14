"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { hojeSP } from "@/lib/streak";
import type { Track } from "@/lib/types";
import { Modal } from "./Modal";

const campo =
  "w-full rounded-lg border border-hairline bg-fundo px-2 py-[7px] text-[13px] text-tinta";
const rotulo = "mb-1 block text-[11px] text-tinta2";

// "+ Registrar manual": trilha, data e (hora início/fim OU duração).
// Serve pro estudo feito longe do app — inclusive retroativo.
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
      setErro(error.message);
      return;
    }
    router.refresh(); // sessão nova entra nas metas, streak e histórico
    onFechar();
  }

  return (
    <Modal titulo="Registrar estudo manual" aberto={aberto} onFechar={onFechar}>
      <form onSubmit={salvar} className="flex flex-col gap-3">
        <div>
          <label className={rotulo}>Trilha</label>
          <select
            value={trilhaId}
            onChange={(e) => setTrilhaId(e.target.value)}
            className={campo}
          >
            {trilhas.map((t) => (
              <option key={t.id} value={t.id}>
                {t.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={rotulo}>Data</label>
          <input
            type="date"
            value={data}
            max={hojeSP()}
            onChange={(e) => setData(e.target.value)}
            className={campo}
          />
        </div>

        <div className="flex gap-3 text-[12px] text-tinta2">
          <label className="flex cursor-pointer items-center gap-1">
            <input
              type="radio"
              checked={modo === "horario"}
              onChange={() => setModo("horario")}
            />
            início e fim
          </label>
          <label className="flex cursor-pointer items-center gap-1">
            <input
              type="radio"
              checked={modo === "duracao"}
              onChange={() => setModo("duracao")}
            />
            só a duração
          </label>
        </div>

        {modo === "horario" ? (
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className={rotulo}>Início</label>
              <input
                type="time"
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
                className={campo}
              />
            </div>
            <div>
              <label className={rotulo}>Fim</label>
              <input
                type="time"
                value={horaFim}
                onChange={(e) => setHoraFim(e.target.value)}
                className={campo}
              />
            </div>
          </div>
        ) : (
          <div>
            <label className={rotulo}>Duração (min)</label>
            <input
              type="number"
              min={1}
              value={duracaoMin}
              onChange={(e) =>
                setDuracaoMin(Math.max(1, parseInt(e.target.value, 10) || 1))
              }
              className={campo}
            />
          </div>
        )}

        {erro && <p className="text-[11px] text-red-400">{erro}</p>}

        <button
          type="submit"
          disabled={salvando}
          className="rounded-full bg-acao py-[10px] text-[14px] font-semibold text-white disabled:opacity-60"
        >
          {salvando ? "Salvando..." : "Registrar"}
        </button>
      </form>
    </Modal>
  );
}
