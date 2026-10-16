"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { historicoAoMudarMin, hojeSP } from "@/lib/streak";
import type { InicioSemana, UserSettings } from "@/lib/types";
import { Folha } from "./Folha";
import { Passo } from "./Passo";
import { Segmentado } from "./Segmentado";

// 1=seg ... 7=dom (convenção de user_settings.dias_que_contam)
const DIAS = [
  { num: 1, curto: "seg", nome: "segunda-feira" },
  { num: 2, curto: "ter", nome: "terça-feira" },
  { num: 3, curto: "qua", nome: "quarta-feira" },
  { num: 4, curto: "qui", nome: "quinta-feira" },
  { num: 5, curto: "sex", nome: "sexta-feira" },
  { num: 6, curto: "sáb", nome: "sábado" },
  { num: 7, curto: "dom", nome: "domingo" },
];

// Folha "Constância e metas" (abre pela engrenagem do card Constância).
// Guarda tudo na mesma linha user_settings, mas só edita o que é da
// constância — os campos do pomodoro passam intactos no upsert.
export function FolhaConstancia({
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
  const id = useId(); // prefixo dos ids dos campos (htmlFor / aria-labelledby)
  const [form, setForm] = useState({
    ...settings,
    // linha antiga no banco pode não ter a coluna ainda → segunda
    inicio_semana: settings.inicio_semana ?? "seg",
  });
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [avisoDias, setAvisoDias] = useState("");

  // dias que contam: liga/desliga; pelo menos um dia precisa contar
  function alternarDia(valor: string) {
    const num = Number(valor);
    const atuais = form.dias_que_contam;
    const novos = atuais.includes(num)
      ? atuais.filter((d) => d !== num)
      : [...atuais, num].sort((a, b) => a - b);
    if (novos.length === 0) {
      setAvisoDias("Pelo menos um dia precisa contar.");
      return;
    }
    setAvisoDias("");
    setForm({ ...form, dias_que_contam: novos });
  }

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    setSalvando(true);
    setErro(null);

    // Se o mínimo do streak mudou, atualiza o histórico pra que a mudança
    // NÃO seja retroativa: o passado fica congelado no mínimo antigo e o novo
    // vale a partir de hoje.
    const historico = historicoAoMudarMin(
      settings.streak_min_historico,
      settings.streak_min_diario_min,
      form.streak_min_diario_min,
      hojeSP()
    );

    const supabase = createClient();
    // manda o objeto inteiro (settings + edições) pra não perder os campos
    // do pomodoro na mesma linha
    const { error } = await supabase.from("user_settings").upsert({
      ...form,
      streak_min_historico: historico,
      user_id: userId,
    });

    setSalvando(false);
    if (error) {
      // texto amigável (o error.message do Supabase vem em inglês); a folha fica aberta
      setErro("Não deu para salvar. Confira a conexão e tente de novo.");
      return;
    }
    router.refresh();
    onFechar();
  }

  return (
    <Folha
      aberto={aberto}
      onFechar={onFechar}
      titulo="Constância e metas"
      rotuloEnviar="Salvar"
      enviando={salvando}
      onEnviar={salvar}
      erro={erro}
    >
      <h3 className="form-secao">Streak</h3>
      <div className="form-grupo">
        <div className="form-linha">
          <label htmlFor={`${id}-min`}>Mínimo por dia</label>
          <Passo
            id={`${id}-min`}
            valor={form.streak_min_diario_min}
            onMudar={(t) =>
              setForm({ ...form, streak_min_diario_min: Math.max(1, parseInt(t, 10) || 1) })
            }
            min={1}
            unidade="min"
            stepper
            rotuloMenos="Menos 1 minuto no mínimo por dia"
            rotuloMais="Mais 1 minuto no mínimo por dia"
          />
        </div>
        <div className="form-linha col">
          <span className="rotulo" id={`${id}-dias`}>
            Dias que contam
          </span>
          <Segmentado
            modo="multiplo"
            className="form-dias"
            ariaLabelledby={`${id}-dias`}
            opcoes={DIAS.map((d) => ({ valor: String(d.num), conteudo: d.curto, ariaLabel: d.nome }))}
            valores={form.dias_que_contam.map(String)}
            onEscolher={alternarDia}
          />
          <p className="form-status" role="status">
            {avisoDias}
          </p>
        </div>
      </div>
      <p className="form-nota">
        O mínimo novo vale de hoje em diante; os dias que já passaram seguem
        julgados pelo mínimo antigo. Fora dos dias que contam a sequência não
        quebra, e cumprir o mínimo neles soma um dia bônus.
      </p>

      <h3 className="form-secao">Metas de horas</h3>
      <div className="form-grupo">
        <div className="form-linha col">
          <span className="rotulo" id={`${id}-semana`}>
            A semana das metas começa
          </span>
          <Segmentado
            modo="unico"
            ariaLabelledby={`${id}-semana`}
            opcoes={[
              { valor: "dom", conteudo: "domingo" },
              { valor: "seg", conteudo: "segunda" },
            ]}
            valor={form.inicio_semana}
            onEscolher={(v) => setForm({ ...form, inicio_semana: v as InicioSemana })}
          />
        </div>
        <div className="form-linha">
          <label htmlFor={`${id}-sem`}>Meta semanal</label>
          <Passo
            id={`${id}-sem`}
            valor={form.meta_semanal_h}
            onMudar={(t) =>
              setForm({ ...form, meta_semanal_h: Math.max(0.5, parseFloat(t) || 1) })
            }
            min={0.5}
            passo={0.5}
            unidade="h"
            stepper
            rotuloMenos="Menos meia hora na meta semanal"
            rotuloMais="Mais meia hora na meta semanal"
          />
        </div>
        <div className="form-linha">
          <label htmlFor={`${id}-mes`}>Meta mensal</label>
          <Passo
            id={`${id}-mes`}
            valor={form.meta_mensal_h}
            onMudar={(t) =>
              setForm({ ...form, meta_mensal_h: Math.max(0.5, parseFloat(t) || 1) })
            }
            min={0.5}
            passo={0.5}
            unidade="h"
            stepper
            rotuloMenos="Menos meia hora na meta mensal"
            rotuloMais="Mais meia hora na meta mensal"
          />
        </div>
      </div>
    </Folha>
  );
}
