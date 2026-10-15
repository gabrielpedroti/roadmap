"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { UserSettings } from "@/lib/types";
import { Folha } from "./Folha";
import { Icone } from "./Icone";
import { Passo } from "./Passo";

// Folha "Tempos do pomodoro" (abre pela engrenagem do card Pomodoro). Só
// edita os campos do pomodoro — os da constância passam intactos no upsert
// da mesma linha user_settings.
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
  const id = useId();
  const [form, setForm] = useState({ ...settings });
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState(false);

  // número inteiro, nunca abaixo de 1
  function num(texto: string) {
    return Math.max(1, parseInt(texto, 10) || 1);
  }

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    setSalvando(true);
    setErro(false);

    const supabase = createClient();
    const { error } = await supabase
      .from("user_settings")
      .upsert({ ...form, user_id: userId });

    setSalvando(false);
    if (error) {
      setErro(true); // texto amigável (antes ia o error.message cru, em inglês)
      return;
    }
    router.refresh();
    onFechar();
  }

  // os quatro campos: [chave em user_settings, rótulo, unidade]
  const campos = [
    ["pomodoro_foco_min", "Foco padrão", "min"],
    ["pausa_curta_min", "Pausa curta", "min"],
    ["pausa_longa_min", "Pausa longa", "min"],
    ["ciclos_ate_pausa_longa", "Ciclos até a longa", ""],
  ] as const;

  return (
    <Folha
      aberto={aberto}
      onFechar={onFechar}
      titulo="Tempos do pomodoro"
      rotuloEnviar="Salvar"
      enviando={salvando}
      onEnviar={salvar}
    >
      <p className="form-nota">
        Os tempos de foco e pausa também mudam na hora, pelos botões do timer.
        Aqui fica o padrão e a regra da pausa longa.
      </p>
      <div className="form-grupo">
        {campos.map(([chave, rotulo, unidade]) => (
          <div className="form-linha" key={chave}>
            <label htmlFor={`${id}-${chave}`}>{rotulo}</label>
            <Passo
              id={`${id}-${chave}`}
              valor={form[chave]}
              onMudar={(t) => setForm({ ...form, [chave]: num(t) })}
              min={1}
              unidade={unidade}
            />
          </div>
        ))}
      </div>

      {erro && (
        <p className="form-erro" role="alert">
          <Icone nome="alerta" />
          <span>Não deu para salvar. Confira a conexão e tente de novo.</span>
        </p>
      )}
    </Folha>
  );
}
