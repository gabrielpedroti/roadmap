"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { UserSettings } from "@/lib/types";
import { Modal } from "./Modal";

const campo =
  "w-full rounded-lg border border-hairline bg-fundo px-2 py-[7px] text-[13px] text-tinta";
const rotulo = "mb-1 block text-[11px] text-tinta2";

// Config do POMODORO (tempos padrão + regra da pausa longa). Abre pela
// engrenagem do card "Foco". Só edita os campos do pomodoro — os da
// constância passam intactos no upsert da mesma linha user_settings.
export function ModalConfigPomodoro({
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

  function num(valor: string, minimo = 1) {
    return Math.max(minimo, parseInt(valor, 10) || minimo);
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
    router.refresh();
    onFechar();
  }

  return (
    <Modal titulo="Tempos do pomodoro" aberto={aberto} onFechar={onFechar}>
      <form onSubmit={salvar} className="flex flex-col gap-3">
        <p className="text-[12px] text-tinta2">
          Os tempos padrão de foco e pausa também podem ser trocados na hora,
          pelos botões do timer. Aqui você define o padrão e a regra da pausa
          longa.
        </p>
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
