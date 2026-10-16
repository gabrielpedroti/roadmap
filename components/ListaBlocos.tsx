"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { blocoInicial, fonteDoGrupo, fonteEfetiva, textoDoPct } from "@/lib/blocos";
import {
  blocoConcluido,
  blocoDesbloqueado,
  progressoDaTrilha,
  progressoDoBloco,
  type ItemProgresso,
} from "@/lib/progress";
import { semEmoji } from "@/lib/texto";
import type {
  Block,
  Fonte,
  Item,
  ItemGroup,
  OndeEstudar,
  Plataforma,
} from "@/lib/types";
import { BarraProgresso } from "./BarraProgresso";
import { Icone } from "./Icone";

// ATENÇÃO, "marca" tem dois sentidos neste arquivo: `Marca`, `varsDaMarca` e
// a classe .com-marca são a marca COMERCIAL (Alura, DIO…) dos chips e tags;
// já <span className="marca"> e .marca-v são o CÍRCULO de marcar o item.

// Cores OFICIAIS de cada marca (conferidas em out/2026 no Simple Icons ou no
// site/logo da própria marca). A mesma marca tem a mesma cor nos dois mapas.
const COR = {
  pucpr: "#9D2235", // bordô PUCPR (Pantone 201)
  alura: "#052FD3", // azul primário do alura.com.br
  dio: "#7F28B5", // roxo primário do dio.me
  claude: "#D97757", // laranja Claude (Anthropic Academy)
  fiap: "#ED145B", // magenta FIAP
  hackerrank: "#00EA64", // verde HackerRank
  coursera: "#0056D2", // azul Coursera
  deeplearning: "#FD4A61", // coral do logo DeepLearning.AI
};
type Marca = keyof typeof COR;

// Tom da LETRA ajustado, só onde a regra geral (78% da cor com preto no
// claro, 65% com branco no escuro: .com-marca no globals.css) fica abaixo de
// 4.5:1 sobre o fundo do chip. Mesmo matiz da marca.
const LETRA: Partial<Record<Marca, { claro?: string; escuro?: string }>> = {
  pucpr: { escuro: "#C37884" },
  alura: { escuro: "#6E86E5" },
  dio: { escuro: "#B07AD1" },
  claude: { claro: "#A15840" },
  fiap: { claro: "#c5134f" }, // menos escuro que a PUC: o magenta não vira vinho
  hackerrank: { claro: "#008137" },
  coursera: { escuro: "#73a2e6" }, // 55% da cor com branco
  deeplearning: { claro: "#C0384A" },
};

// Variáveis CSS da marca, para um elemento com a classe .com-marca
function varsDaMarca(marca: Marca): CSSProperties {
  const letra = LETRA[marca];
  return {
    "--cor": COR[marca],
    ...(letra?.claro && { "--cor-texto-claro": letra.claro }),
    ...(letra?.escuro && { "--cor-texto-escuro": letra.escuro }),
  } as CSSProperties;
}

// Nome e marca de cada plataforma nos chips de "onde estudar"
const PLATAFORMAS: Record<Plataforma, { nome: string; marca: Marca }> = {
  alura: { nome: "Alura", marca: "alura" },
  puc: { nome: "PUC", marca: "pucpr" },
  dio: { nome: "DIO", marca: "dio" },
  anthropic: { nome: "Anthropic", marca: "claude" },
  fiap: { nome: "FIAP", marca: "fiap" },
  hackerrank: { nome: "HackerRank", marca: "hackerrank" },
};

// A tag de cada item sai da FONTE dele (vem do banco) — nada de adivinhar
// pelo título do grupo. Conceito sem fonte específica fica sem tag.
const TAGS_FONTE: Record<Fonte, { texto: string; marca: Marca }> = {
  "ads-pucpr": { texto: "ADS-PUCPR", marca: "pucpr" },
  dio: { texto: "DIO", marca: "dio" },
  alura: { texto: "Alura", marca: "alura" },
  anthropic: { texto: "Anthropic", marca: "claude" },
  coursera: { texto: "Coursera", marca: "coursera" },
  deeplearning: { texto: "DeepLearning.AI", marca: "deeplearning" },
};

export type BlocoTela = Block & {
  prereqRotulo: string | null;
  crossRotulo: string | null;
  grupos: (ItemGroup & { itens: Item[] })[];
};

// progresso e desbloqueio de um bloco, recalculados a cada check (calcularEstado)
type InfoDoBloco = {
  progresso: number;
  concluido: boolean;
  desbloqueado: boolean;
  prereqOk: boolean;
  crossOk: boolean;
};

// Ao escolher um bloco no roteiro, só rola se o topo dele estiver escondido:
// acima disto ele fica sob a barra de cima (--h-barra, até 68 px, + folga)
const ABAIXO_DA_BARRA = 80;

// Tela da trilha: o campo colorido (com o progresso da trilha) e a divisão.
// - Largo (container ≥ 820 px): o roteiro (todos os blocos) à esquerda e o
//   bloco escolhido à direita, sempre aberto.
// - Estreito: acordeão (cada bloco abre e fecha).
// Marca/desmarca com update OTIMISTA: o estado local muda na hora (barras,
// % e desbloqueio recalculam via lib/progress) e o Supabase grava em
// seguida — se falhar, reverte e mostra o erro na própria linha.
// `userId` null = visitante: tudo visível, checkboxes desabilitados.
export function ListaBlocos({
  trilha,
  blocos,
  feitosIniciais,
  concluidosForaDaTrilha,
  userId,
}: {
  trilha: { nome: string; descricao: string | null };
  blocos: BlocoTela[];
  feitosIniciais: string[];
  concluidosForaDaTrilha: string[];
  userId: string | null;
}) {
  const router = useRouter();
  const [feitos, setFeitos] = useState(() => new Set(feitosIniciais));
  // bloco que começa escolhido (largo) e aberto (acordeão)
  const [inicial] = useState(() =>
    blocoInicial(
      blocos.map((b) => b.id),
      calcularEstado(blocos, new Set(feitosIniciais), concluidosForaDaTrilha)
    )
  );
  const [escolhido, setEscolhido] = useState<string | null>(inicial);
  const [abertos, setAbertos] = useState<Set<string>>(
    () => new Set(inicial ? [inicial] : [])
  );
  // largo = o roteiro está visível (o CSS decide pela largura do container)
  const [largo, setLargo] = useState(false);
  // item cuja gravação falhou: o aviso aparece na linha dele
  const [erroItem, setErroItem] = useState<{ itemId: string; marcar: boolean } | null>(null);
  const divisaoRef = useRef<HTMLDivElement>(null);

  const estado = calcularEstado(blocos, feitos, concluidosForaDaTrilha);
  const somenteLeitura = userId === null;
  const progressoTotal = progressoDaTrilha(
    blocos.map((b) =>
      b.grupos.flatMap((g) => g.itens.map((i) => ({ tipo: i.tipo, feito: feitos.has(i.id) })))
    )
  );

  // Largo: o cabeçalho do bloco deixa de ser botão (quem escolhe é o
  // roteiro). O servidor renderiza o acordeão; o CSS já mostra o certo antes
  // do JavaScript, e aqui só se ajusta a semântica.
  useEffect(() => {
    const divisao = divisaoRef.current;
    const roteiro = divisao?.querySelector(".roteiro");
    if (!divisao || !roteiro) return;
    const ro = new ResizeObserver(() =>
      setLargo(getComputedStyle(roteiro).display !== "none")
    );
    ro.observe(divisao);
    return () => ro.disconnect();
  }, []);

  function alternarAberto(blocoId: string) {
    const novos = new Set(abertos);
    if (novos.has(blocoId)) novos.delete(blocoId);
    else novos.add(blocoId);
    setAbertos(novos);
  }

  // roteiro: mostra o bloco à direita; se o topo dele estiver fora da tela,
  // rola até ele (instantâneo com movimento reduzido)
  function escolher(blocoId: string) {
    setEscolhido(blocoId);
    setAbertos(new Set(abertos).add(blocoId));
    requestAnimationFrame(() => {
      const alvo = document.getElementById(`bloco-${blocoId}`);
      if (!alvo) return;
      const topo = alvo.getBoundingClientRect().top;
      if (topo < ABAIXO_DA_BARRA || topo > window.innerHeight) {
        const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        alvo.scrollIntoView({ block: "start", behavior: reduzido ? "auto" : "smooth" });
      }
    });
  }

  // grava um check (marcar = true) ou o remove; otimista, com reversão
  async function salvarItem(itemId: string, marcar: boolean) {
    const novos = new Set(feitos);
    if (marcar) novos.add(itemId);
    else novos.delete(itemId);
    setFeitos(novos); // otimista: a tela responde antes do banco

    const supabase = createClient();
    const { error } = marcar
      ? await supabase.from("user_checks").insert({ user_id: userId!, item_id: itemId })
      : await supabase
          .from("user_checks")
          .delete()
          .eq("user_id", userId!)
          .eq("item_id", itemId);

    if (error) {
      setFeitos(feitos); // deu ruim → volta como estava
      setErroItem({ itemId, marcar }); // e diz o porquê, na linha do item
    } else {
      setErroItem(null); // um salvamento que deu certo limpa o aviso
      router.refresh(); // mantém o % da Home em dia ao voltar
    }
  }

  function alternarItem(item: Item, bloqueado: boolean) {
    if (bloqueado || somenteLeitura) return;
    salvarItem(item.id, !feitos.has(item.id));
  }

  // "Tentar de novo" repete a MESMA ação (marcar ou desmarcar)
  function tentarDeNovo() {
    if (!erroItem) return;
    if (feitos.has(erroItem.itemId) === erroItem.marcar) {
      setErroItem(null); // já está como deveria
      return;
    }
    salvarItem(erroItem.itemId, erroItem.marcar);
  }

  return (
    <>
      <div className="campo">
        <div className="campo-in">
          <h1 className="campo-titulo">{trilha.nome}</h1>
          {trilha.descricao && <p className="campo-desc">{trilha.descricao}</p>}
          {somenteLeitura ? (
            <p className="campo-visit">
              Você está no modo visualização. <Link href="/login">Entre</Link>{" "}
              para marcar seu progresso.
            </p>
          ) : (
            <div className="campo-prog">
              <span className="campo-pct tab">{Math.round(progressoTotal * 100)}%</span>
              <span className="campo-rot">concluído</span>
              <BarraProgresso
                fracao={progressoTotal}
                rotulo={`Progresso da trilha ${trilha.nome}`}
              />
            </div>
          )}
        </div>
      </div>

      {/* trilha recém-criada, ainda sem blocos: só o campo (sem o
          cartão "Blocos" vazio do roteiro no largo) */}
      {blocos.length > 0 && (
        <div className="divisao" ref={divisaoRef}>
          <div className="divisao-grade">
            <nav className="roteiro" aria-label={`Blocos da trilha ${trilha.nome}`}>
              <h2 className="roteiro-cab">Blocos</h2>
              <ol className="roteiro-lista">
                {blocos.map((bloco) => (
                  <ItemDoRoteiro
                    key={bloco.id}
                    bloco={bloco}
                    info={estado.get(bloco.id)!}
                    escolhido={escolhido === bloco.id}
                    logado={!somenteLeitura}
                    onEscolher={() => escolher(bloco.id)}
                  />
                ))}
              </ol>
            </nav>

            <div className="blocos">
              {blocos.map((bloco) => (
                <CartaoDoBloco
                  key={bloco.id}
                  bloco={bloco}
                  info={estado.get(bloco.id)!}
                  aberto={abertos.has(bloco.id)}
                  escolhido={escolhido === bloco.id}
                  largo={largo}
                  logado={!somenteLeitura}
                  feitos={feitos}
                  itemComErro={erroItem?.itemId ?? null}
                  onAlternarAberto={() => alternarAberto(bloco.id)}
                  onAlternarItem={alternarItem}
                  onTentarDeNovo={tentarDeNovo}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Um bloco no roteiro (largo): o título, a linha das semanas e do % e a
// barra (só logado). A linha 2 só existe quando tem algo a mostrar: sem
// semanas, o estado ("33%", "bloqueado") fica sozinho à esquerda, e o bloco
// sem semanas e sem estado não ganha uma linha vazia
function ItemDoRoteiro({
  bloco,
  info,
  escolhido,
  logado,
  onEscolher,
}: {
  bloco: BlocoTela;
  info: InfoDoBloco;
  escolhido: boolean;
  logado: boolean;
  onEscolher: () => void;
}) {
  const bloqueado = !info.desbloqueado;
  const estadoTexto = textoDoPct({
    logado,
    bloqueado,
    progresso: info.progresso,
    semanas: bloco.semanas_estimadas,
    noRoteiro: true,
  });
  return (
    <li>
      <button
        type="button"
        className={bloqueado ? "rot-item bloqueado" : "rot-item"}
        aria-controls={`bloco-${bloco.id}`}
        aria-current={escolhido ? "true" : undefined}
        onClick={onEscolher}
      >
        <span className="rot-titulo">
          <Icone nome="cadeado" className="rot-cad" />
          <span>{semEmoji(bloco.titulo)}</span>
        </span>
        {bloco.semanas_estimadas || estadoTexto ? (
          <span className="rot-meta">
            {bloco.semanas_estimadas && <span>{bloco.semanas_estimadas}</span>}
            {estadoTexto && <span className="rot-estado tab">{estadoTexto}</span>}
          </span>
        ) : null}
        {logado && <BarraProgresso fracao={info.progresso} />}
      </button>
    </li>
  );
}

// Um bloco em cartão: no estreito é um item do acordeão; no largo, o bloco
// escolhido no roteiro (sempre aberto, o CSS esconde os outros)
function CartaoDoBloco({
  bloco,
  info,
  aberto,
  escolhido,
  largo,
  logado,
  feitos,
  itemComErro,
  onAlternarAberto,
  onAlternarItem,
  onTentarDeNovo,
}: {
  bloco: BlocoTela;
  info: InfoDoBloco;
  aberto: boolean;
  escolhido: boolean;
  largo: boolean;
  logado: boolean;
  feitos: Set<string>;
  itemComErro: string | null;
  onAlternarAberto: () => void;
  onAlternarItem: (item: Item, bloqueado: boolean) => void;
  onTentarDeNovo: () => void;
}) {
  const bloqueado = !info.desbloqueado;
  // só mostra os pré-requisitos que ainda FALTAM
  const faltando = [
    !info.prereqOk ? bloco.prereqRotulo : null,
    !info.crossOk ? bloco.crossRotulo : null,
  ].filter((r): r is string => r !== null);
  const classes = ["bloco", bloqueado && "bloqueado", escolhido && "sel"]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      id={`bloco-${bloco.id}`}
      className={classes}
      data-aberto={aberto ? "" : undefined}
      aria-labelledby={`bloco-${bloco.id}-t`}
    >
      {/* <h2><button>: quem navega por títulos acha cada bloco.
          No largo o botão vira só título (desligado, sem papel) */}
      <h2 className="bloco-h">
        <button
          type="button"
          className="bloco-cab"
          {...(largo
            ? { disabled: true, role: "none" }
            : { "aria-expanded": aberto, "aria-controls": `bloco-${bloco.id}-c` })}
          onClick={onAlternarAberto}
        >
          <span className="bloco-l1">
            <Icone nome="chev-dir" className="bloco-chev" />
            <Icone nome="cadeado" className="bloco-cad" />
            <span className="bloco-titulo" id={`bloco-${bloco.id}-t`}>
              {semEmoji(bloco.titulo)}
            </span>
            <span className="bloco-pct tab">
              {textoDoPct({
                logado,
                bloqueado,
                progresso: info.progresso,
                semanas: bloco.semanas_estimadas,
                noRoteiro: false,
              })}
            </span>
          </span>
          {/* visitante: nenhum % e nenhuma barra (as semanas vão no espaço do %) */}
          {logado && <BarraProgresso fracao={info.progresso} />}
          {logado && bloco.semanas_estimadas && (
            <span className="bloco-meta">{bloco.semanas_estimadas}</span>
          )}
        </button>
      </h2>

      {bloqueado && faltando.length > 0 && (
        <p className="bloco-trava">
          <Icone nome="cadeado" />
          <span>Antes de começar: conclua {faltando.map(semEmoji).join(" e ")}</span>
        </p>
      )}

      <div className="bloco-corpo" id={`bloco-${bloco.id}-c`}>
        {bloco.descricao && <p className="bloco-desc">{semEmoji(bloco.descricao)}</p>}
        {bloco.grupos.map((grupo) => {
          // todos com a mesma fonte: a tag sobe para o título do grupo
          const fonteGrupo = fonteDoGrupo(grupo.itens);
          const tagGrupo = fonteGrupo ? TAGS_FONTE[fonteGrupo] : null;
          const ehProjeto =
            grupo.itens.length > 0 && grupo.itens.every((i) => i.tipo === "project");
          return (
            <section key={grupo.id} className={ehProjeto ? "grupo grupo-projeto" : "grupo"}>
              <h3 className="grupo-titulo">
                {semEmoji(grupo.titulo)}
                {tagGrupo && <Tag texto={tagGrupo.texto} marca={tagGrupo.marca} />}
              </h3>
              <ul className="lista">
                {grupo.itens.map((item) => (
                  <LinhaItem
                    key={item.id}
                    item={item}
                    marcado={feitos.has(item.id)}
                    desabilitado={bloqueado || !logado}
                    mostrarFonte={!tagGrupo}
                    onAlternar={() => onAlternarItem(item, bloqueado)}
                    comErro={itemComErro === item.id}
                    onTentarDeNovo={onTentarDeNovo}
                  />
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </section>
  );
}

// progresso + desbloqueio de cada bloco a partir do estado atual dos checks
function calcularEstado(
  blocos: BlocoTela[],
  feitos: Set<string>,
  concluidosForaDaTrilha: string[]
): Map<string, InfoDoBloco> {
  const itensDoBloco = new Map(
    blocos.map((b) => [
      b.id,
      b.grupos.flatMap((g) =>
        g.itens.map(
          (i): ItemProgresso => ({ tipo: i.tipo, feito: feitos.has(i.id) })
        )
      ),
    ])
  );

  const concluidos = new Set(concluidosForaDaTrilha);
  for (const b of blocos) {
    if (blocoConcluido(itensDoBloco.get(b.id)!)) concluidos.add(b.id);
  }

  return new Map(
    blocos.map((b) => {
      const prereqOk = !b.prereq_block_id || concluidos.has(b.prereq_block_id);
      const crossOk =
        !b.cross_prereq_block_id || concluidos.has(b.cross_prereq_block_id);
      return [
        b.id,
        {
          progresso: progressoDoBloco(itensDoBloco.get(b.id)!),
          concluido: concluidos.has(b.id),
          desbloqueado: blocoDesbloqueado(b, concluidos),
          prereqOk,
          crossOk,
        },
      ];
    })
  );
}

// Tag de fonte (fundo opaco na cor da marca) ou neutra ("opcional", contorno)
function Tag({ id, texto, marca }: { id?: string; texto: string; marca?: Marca }) {
  if (!marca) {
    return (
      <span id={id} className="tag tag-neutra">
        {texto}
      </span>
    );
  }
  return (
    <span id={id} className="tag com-marca" style={varsDaMarca(marca)}>
      {texto}
    </span>
  );
}

// Chip de "onde estudar": Alura · Trilha: Nome  |  Alura · Nome (curso)
// |  PUC · Nome (matéria). A palavra "Trilha:" só aparece pra trilha.
function ChipOndeEstudar({ fonte }: { fonte: OndeEstudar }) {
  const p = PLATAFORMAS[fonte.plataforma];
  // plataforma que o banco já tem mas este código ainda não conhece (migration
  // rodada antes do deploy): esconde o chip em vez de derrubar a página
  if (!p) return null;
  return (
    <span className="chip com-marca" style={varsDaMarca(p.marca)}>
      <b>{p.nome}</b>
      <span aria-hidden="true">·</span>
      {fonte.tipo === "trilha" ? `Trilha: ${semEmoji(fonte.nome)}` : semEmoji(fonte.nome)}
    </span>
  );
}

// Uma linha de item: o círculo de marcar (estilo Lembretes), o título, as
// tags, a descrição e os chips. concept = normal · optional = título cinza +
// tag "opcional" + círculo tracejado · project = negrito + ícone ferramenta.
// A tag da FONTE sai do campo `fonte` (ou subiu para o grupo).
function LinhaItem({
  item,
  marcado,
  desabilitado,
  mostrarFonte,
  onAlternar,
  comErro,
  onTentarDeNovo,
}: {
  item: Item;
  marcado: boolean;
  desabilitado: boolean;
  mostrarFonte: boolean;
  onAlternar: () => void;
  comErro: boolean;
  onTentarDeNovo: () => void;
}) {
  const ehProjeto = item.tipo === "project";
  const ehOpcional = item.tipo === "optional";
  const fonte = mostrarFonte ? fonteEfetiva(item) : null;
  const tagFonte = fonte ? TAGS_FONTE[fonte] : null;
  const base = `item-${item.id}`;
  // o nome do checkbox: o título, mais as tags que estão na linha
  const rotulos = [`${base}-t`, tagFonte && `${base}-f`, ehOpcional && `${base}-o`]
    .filter(Boolean)
    .join(" ");
  const classes = ["item", ehProjeto && "projeto", ehOpcional && "opcional"]
    .filter(Boolean)
    .join(" ");

  return (
    <li className={classes}>
      <label className="item-linha">
        <span className="marca">
          <input
            type="checkbox"
            checked={marcado}
            disabled={desabilitado}
            onChange={onAlternar}
            aria-labelledby={rotulos}
            aria-describedby={item.descricao ? `${base}-d` : undefined}
          />
          <Icone nome="visto" className="marca-v" />
        </span>
        <span className="item-txt">
          <span className="item-titulo" id={`${base}-t`}>
            {ehProjeto && <Icone nome="ferramenta" className="ic-proj" />}
            {semEmoji(item.titulo)}
          </span>
          {tagFonte && <Tag id={`${base}-f`} texto={tagFonte.texto} marca={tagFonte.marca} />}
          {ehOpcional && <Tag id={`${base}-o`} texto="opcional" />}
          {item.descricao && (
            <span className="item-desc" id={`${base}-d`}>
              {semEmoji(item.descricao)}
            </span>
          )}
          {item.onde_estudar?.length > 0 && (
            <span className="chips">
              {item.onde_estudar.map((f, i) => (
                <ChipOndeEstudar key={i} fonte={f} />
              ))}
            </span>
          )}
        </span>
      </label>
      {/* a gravação falhou: a marca já voltou; o motivo fica na própria linha */}
      {comErro && (
        <div className="erro-inline" role="alert">
          <Icone nome="alerta" />
          <p>Não deu para salvar este item. Confira a conexão e tente de novo.</p>
          <button type="button" onClick={onTentarDeNovo}>
            Tentar de novo
          </button>
        </div>
      )}
    </li>
  );
}
