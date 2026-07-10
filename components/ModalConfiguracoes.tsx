"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { UserSettings } from "@/lib/types";
import { Modal } from "./Modal";

const DIAS = [
  { num: 1, rotulo: "seg" },
  { num: 2, rotulo: "ter" },
  { num: 3, rotulo: "qua" },
  { num: 4, rotulo: "qui" },
  { num: 5, rotulo: "sex" },
  { num: 6, rotulo: "sáb" },
  { num: 7, rotulo: "dom" },
];

const campo =
  "w-full rounded-lg border border-hairline bg-fundo px-2 py-[7px] text-[13px] text-tinta";
const rotulo = "mb-1 block text-[11px] text-tinta2";

// Engrenagem: streak, dias que contam, metas e tempos do pomodoro.
// Salvar faz upsert — a linha de user_settings nasce aqui na 1ª vez.
export function ModalConfiguracoes({
  aberto,
  onFechar,
  settings,
  userId,
}: {
  aberto: boolean;
  onFechar: () => void;
  settings: UserSettings;
  userId: string;
}) {
  const router = useRouter();
  const [form, setForm] = useState({ ...settings });
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  function alternarDia(num: number) {
    const atuais = form.dias_que_contam;
    const novos = atuais.includes(num)
      ? atuais.filter((d) => d !== num)
      : [...atuais, num].sort((a, b) => a - b);
    if (novos.length === 0) return; // pelo menos um dia precisa contar
    setForm({ ...form, dias_que_contam: novos });
  }

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    setSalvando(true);
    setErro(null);

    const supabase = createClient();
    const { error } = await supabase
      .from("user_settings")
      .upsert({ ...form, user_id: userId });

    setSalvando(false);
    if (error) {
      setErro(error.message);
      return;
    }
    router.refresh(); // barras e regra do streak recalculam na hora
    onFechar();
  }

  function num(valor: string, minimo = 1) {
    return Math.max(minimo, parseInt(valor, 10) || minimo);
  }

  return (
    <Modal titulo="Configurações" aberto={aberto} onFechar={onFechar}>
      <form onSubmit={salvar} className="flex flex-col gap-3">
        <div>
          <label className={rotulo}>Streak — mínimo por dia (min)</label>
          <input
            type="number"
            min={1}
            value={form.streak_min_diario_min}
            onChange={(e) =>
              setForm({ ...form, streak_min_diario_min: num(e.target.value) })
            }
            className={campo}
          />
        </div>

        <div>
          <label className={rotulo}>Dias que contam pro streak</label>
          <div className="flex flex-wrap gap-1">
            {DIAS.map((d) => (
              <button
                key={d.num}
                type="button"
                onClick={() => alternarDia(d.num)}
                className={`cursor-pointer rounded-full border border-hairline px-[10px] py-1 text-[12px] ${
                  form.dias_que_contam.includes(d.num)
                    ? "bg-seg font-semibold text-tinta"
                    : "bg-transparent text-tinta2"
                }`}
              >
                {d.rotulo}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className={rotulo}>Meta semanal (h)</label>
            <input
              type="number"
              min={1}
              step="0.5"
              value={form.meta_semanal_h}
              onChange={(e) =>
                setForm({
                  ...form,
                  meta_semanal_h: Math.max(0.5, parseFloat(e.target.value) || 1),
                })
              }
              className={campo}
            />
          </div>
          <div>
            <label className={rotulo}>Meta mensal (h)</label>
            <input
              type="number"
              min={1}
              step="0.5"
              value={form.meta_mensal_h}
              onChange={(e) =>
                setForm({
                  ...form,
                  meta_mensal_h: Math.max(0.5, parseFloat(e.target.value) || 1),
                })
              }
              className={campo}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className={rotulo}>Foco padrão (min)</label>
            <input
              type="number"
              min={1}
              value={form.pomodoro_foco_min}
              onChange={(e) =>
                setForm({ ...form, pomodoro_foco_min: num(e.target.value) })
              }
              className={campo}
            />
          </div>
          <div>
            <label className={rotulo}>Pausa curta (min)</label>
            <input
              type="number"
              min={1}
              value={form.pausa_curta_min}
              onChange={(e) =>
                setForm({ ...form, pausa_curta_min: num(e.target.value) })
              }
              className={campo}
            />
          </div>
          <div>
            <label className={rotulo}>Pausa longa (min)</label>
            <input
              type="number"
              min={1}
              value={form.pausa_longa_min}
              onChange={(e) =>
                setForm({ ...form, pausa_longa_min: num(e.target.value) })
              }
              className={campo}
            />
          </div>
          <div>
            <label className={rotulo}>Ciclos até a longa</label>
            <input
              type="number"
              min={1}
              value={form.ciclos_ate_pausa_longa}
              onChange={(e) =>
                setForm({ ...form, ciclos_ate_pausa_longa: num(e.target.value) })
              }
              className={campo}
            />
          </div>
        </div>

        {erro && <p className="text-[11px] text-red-400">{erro}</p>}

        <button
          type="submit"
          disabled={salvando}
          className="rounded-full bg-acao py-[10px] text-[14px] font-semibold text-white disabled:opacity-60"
        >
          {salvando ? "Salvando..." : "Salvar"}
        </button>
      </form>
    </Modal>
  );
}
