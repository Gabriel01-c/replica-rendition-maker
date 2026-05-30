import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/fisiologia-farmacologia")({
  head: () => ({
    meta: [
      { title: "Raciocínio Clínico em Anestesia Obstétrica — Dr. Francisco Amaral" },
      {
        name: "description",
        content:
          "Programa de aperfeiçoamento em fisiologia e farmacologia aplicadas à anestesia obstétrica, com base no Método RAC — Raciocínio Clínico Aplicado.",
      },
    ],
  }),
  component: Page,
});

// Paleta clínica
const NAVY = "#052d5b";
const BLUE = "#0e53a4";
const SKY = "#add3ff";
const GREEN = "#069b4a";
const MINT = "#38e387";

const fisiologia = [
  "Adaptações cardiovasculares da gestação",
  "Mecânica respiratória e troca gasosa na gestante",
  "Alterações neurológicas e sensibilidade a anestésicos",
  "Perfil hematológico e coagulação periparto",
  "Função renal e equilíbrio hidroeletrolítico",
  "Motilidade gastrointestinal e risco de broncoaspiração",
];

const farmacologia = [
  "Farmacocinética e farmacodinâmica na gestação",
  "Anestésicos venosos: propofol, etomidato e cetamina",
  "Opioides: transferência placentária e repercussão fetal",
  "Vasopressores: fenilefrina, noradrenalina e efedrina",
  "Bloqueadores neuromusculares e reversão",
  "Halogenados: MAC, tônus uterino e impacto fetal",
];

const motivos = [
  {
    n: "01",
    t: "Formação centrada em condutas, não em mecanismos",
    d: "A residência prioriza protocolos. Sem o substrato fisiopatológico, qualquer cenário fora do padrão expõe o anestesiologista.",
  },
  {
    n: "02",
    t: "Domínio insuficiente das adaptações maternas",
    d: "Alterações cardiovasculares, respiratórias e farmacocinéticas redefinem doses, técnicas e margens de segurança em obstetrícia.",
  },
  {
    n: "03",
    t: "Tomada de decisão sem método estruturado",
    d: "Decidir sob pressão exige um framework clínico reprodutível — não improviso nem memorização passiva.",
  },
];

const paraQuem = [
  "Residentes e especialistas em anestesiologia que atuam em centro obstétrico",
  "Profissionais que buscam consistência técnica em cesarianas, analgesia de parto e emergências",
  "Anestesiologistas que desejam fundamentar condutas em fisiologia aplicada",
  "Médicos comprometidos com decisão clínica baseada em evidência e raciocínio estruturado",
];

const naoEh = [
  "Profissionais que buscam apenas resumos ou flashcards de protocolo",
  "Quem não pretende aprofundar fisiopatologia obstétrica",
  "Quem prefere condutas memorizadas sem compreender o mecanismo",
  "Quem não atua nem pretende atuar em anestesia obstétrica",
];

function CTA({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <a
      href="#preco"
      className={`inline-flex items-center gap-2 rounded-md px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:-translate-y-0.5 ${className}`}
      style={{
        background: BLUE,
        boxShadow: `0 8px 24px -8px ${BLUE}99`,
      }}
    >
      {children}
      <span aria-hidden>→</span>
    </a>
  );
}

function SectionLabel({ children, color = BLUE }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      className="mb-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em]"
      style={{ color }}
    >
      <span className="h-px w-8" style={{ background: color }} />
      {children}
    </span>
  );
}

function Page() {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <div
      className="min-h-screen bg-white text-slate-900"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* BLOCO 1 — Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(160deg, ${NAVY} 0%, #03224a 60%, ${BLUE} 130%)`,
        }}
      >
        {/* grid técnico de fundo */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `linear-gradient(${SKY} 1px, transparent 1px), linear-gradient(90deg, ${SKY} 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 pt-12 pb-16 md:pt-24 md:pb-28">
          <div className="grid items-center gap-10 md:grid-cols-12 md:gap-12">
            <div className="text-white md:col-span-7">
              <SectionLabel color={MINT}>Método RAC · Anestesia Obstétrica</SectionLabel>
              <h1 className="mb-5 text-3xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-[3.4rem]">
                Raciocínio Clínico Aplicado à{" "}
                <span style={{ color: MINT }}>Anestesia Obstétrica</span>
              </h1>
              <p className="mb-7 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
                Programa de aperfeiçoamento em fisiologia materna e farmacologia perioperatória,
                estruturado para decisão clínica segura em cenários obstétricos eletivos e de
                emergência.
              </p>
              <div className="mb-8 grid max-w-md grid-cols-3 gap-4 text-white/90">
                {[
                  { v: "12", l: "Módulos" },
                  { v: "20+", l: "Anos de prática" },
                  { v: "100%", l: "Online" },
                ].map((s) => (
                  <div key={s.l} className="border-l-2 pl-3" style={{ borderColor: MINT }}>
                    <div className="text-2xl font-bold tracking-tight md:text-3xl">{s.v}</div>
                    <div className="text-[11px] uppercase tracking-wider text-white/60">{s.l}</div>
                  </div>
                ))}
              </div>
              <CTA>Acessar o programa</CTA>
            </div>

            <div className="hidden md:col-span-5 md:block">
              <div
                className="relative rounded-lg border p-6 backdrop-blur"
                style={{
                  borderColor: `${SKY}33`,
                  background: "rgba(255,255,255,0.04)",
                }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
                    Estrutura do Programa
                  </span>
                  <span
                    className="rounded-sm px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                    style={{ background: MINT, color: NAVY }}
                  >
                    RAC
                  </span>
                </div>
                <ul className="space-y-3 text-sm text-white/90">
                  {[
                    "Fisiologia materna aplicada",
                    "Farmacologia perioperatória",
                    "Raciocínio clínico estruturado",
                    "Cenários de alta complexidade",
                  ].map((i, idx) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-sm text-[10px] font-bold"
                        style={{ background: `${MINT}22`, color: MINT }}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCO 2 — Problema */}
      <section className="border-b border-slate-200 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-5">
          <SectionLabel>Contexto Clínico</SectionLabel>
          <h2
            className="mb-6 text-2xl font-bold leading-tight tracking-tight md:text-4xl"
            style={{ color: NAVY }}
          >
            Quando o cenário foge do protocolo, o que sustenta a decisão é o raciocínio clínico —
            não a memória.
          </h2>
          <p className="text-base leading-relaxed text-slate-700 md:text-lg">
            A insegurança em sala obstétrica raramente decorre de falta de estudo. Ela reflete uma
            lacuna estrutural: a ausência de um modelo reprodutível para integrar fisiologia,
            farmacologia e contexto cirúrgico em tempo real.
          </p>
        </div>
      </section>

      {/* BLOCO 3 — 3 motivos */}
      <section className="py-16 md:py-24" style={{ background: "#f6f8fb" }}>
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-12 max-w-2xl">
            <SectionLabel>Diagnóstico</SectionLabel>
            <h2
              className="text-3xl font-bold tracking-tight md:text-4xl"
              style={{ color: NAVY }}
            >
              Três lacunas recorrentes na formação do anestesiologista
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {motivos.map((m) => (
              <div
                key={m.n}
                onMouseEnter={() => setHover(m.n)}
                onMouseLeave={() => setHover(null)}
                className="relative overflow-hidden rounded-md border bg-white p-7 transition-all duration-200"
                style={{
                  borderColor: hover === m.n ? BLUE : "#e2e8f0",
                  boxShadow: hover === m.n ? `0 12px 32px -16px ${NAVY}40` : "none",
                }}
              >
                <div
                  className="mb-4 font-mono text-xs font-semibold tracking-widest"
                  style={{ color: BLUE }}
                >
                  {m.n} / 03
                </div>
                <h3
                  className="mb-3 text-lg font-bold leading-snug tracking-tight"
                  style={{ color: NAVY }}
                >
                  {m.t}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">{m.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOCO 4 — Conteúdo */}
      <section
        className="py-16 md:py-24"
        style={{ background: `linear-gradient(180deg, ${NAVY} 0%, #03224a 100%)` }}
      >
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-12 max-w-2xl">
            <SectionLabel color={MINT}>Currículo</SectionLabel>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Eixos do programa
            </h2>
            <p className="mt-3 text-base text-white/70">
              Conteúdo organizado em dois blocos integrados, com aplicação clínica direta em cada
              módulo.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {[
              { code: "I", title: "FISIOLOGIA MATERNA", items: fisiologia, color: SKY },
              { code: "II", title: "FARMACOLOGIA APLICADA", items: farmacologia, color: MINT },
            ].map((bloco) => (
              <div
                key={bloco.title}
                className="rounded-md border bg-white p-7 md:p-9"
                style={{ borderColor: `${bloco.color}55` }}
              >
                <div className="mb-6 flex items-baseline gap-3 border-b pb-4" style={{ borderColor: "#e2e8f0" }}>
                  <span
                    className="font-mono text-xs font-bold tracking-widest"
                    style={{ color: BLUE }}
                  >
                    EIXO {bloco.code}
                  </span>
                  <h3 className="text-xl font-bold tracking-tight" style={{ color: NAVY }}>
                    {bloco.title}
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  {bloco.items.map((item, i) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 border-b border-slate-100 py-2 last:border-0"
                    >
                      <span
                        className="font-mono text-xs font-semibold pt-0.5"
                        style={{ color: BLUE }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm leading-relaxed text-slate-800">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOCO 5 — Para quem / não é */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-12 max-w-2xl">
            <SectionLabel>Público-alvo</SectionLabel>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl" style={{ color: NAVY }}>
              Indicações do programa
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-md border bg-white p-8" style={{ borderColor: `${GREEN}40` }}>
              <div className="mb-5 flex items-center gap-3 border-b pb-4" style={{ borderColor: "#e2e8f0" }}>
                <span
                  className="inline-flex h-7 w-7 items-center justify-center rounded-sm text-sm font-bold text-white"
                  style={{ background: GREEN }}
                >
                  ✓
                </span>
                <h3 className="text-lg font-bold tracking-tight" style={{ color: NAVY }}>
                  Indicado para
                </h3>
              </div>
              <ul className="space-y-3">
                {paraQuem.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm leading-relaxed text-slate-700">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full" style={{ background: GREEN }} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-md border bg-white p-8" style={{ borderColor: "#e2e8f0" }}>
              <div className="mb-5 flex items-center gap-3 border-b pb-4" style={{ borderColor: "#e2e8f0" }}>
                <span
                  className="inline-flex h-7 w-7 items-center justify-center rounded-sm text-sm font-bold text-white"
                  style={{ background: "#64748b" }}
                >
                  —
                </span>
                <h3 className="text-lg font-bold tracking-tight" style={{ color: NAVY }}>
                  Não recomendado
                </h3>
              </div>
              <ul className="space-y-3">
                {naoEh.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm leading-relaxed text-slate-700">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCO 6 — Investimento */}
      <section id="preco" className="py-16 md:py-24" style={{ background: "#f6f8fb" }}>
        <div className="mx-auto max-w-4xl px-5">
          <div className="mx-auto mb-10 max-w-3xl border-l-2 pl-5" style={{ borderColor: BLUE }}>
            <p className="text-base italic leading-relaxed text-slate-700 md:text-lg">
              "Vinte anos em sala cirúrgica mostraram que o anestesiologista inseguro não precisa
              de mais protocolo — precisa de método. É isso que estruturei aqui."
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Dr. Francisco Amaral · TSA / MSc / PhD
            </p>
          </div>

          <div
            className="overflow-hidden rounded-md border"
            style={{ borderColor: `${BLUE}40`, background: "white" }}
          >
            <div className="border-b p-8 md:p-10" style={{ borderColor: "#e2e8f0", background: NAVY }}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <SectionLabel color={MINT}>Investimento</SectionLabel>
                  <h3 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                    Programa completo
                  </h3>
                </div>
                <span
                  className="rounded-sm px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                  style={{ background: MINT, color: NAVY }}
                >
                  Acesso imediato
                </span>
              </div>
            </div>
            <div className="p-8 md:p-10">
              <div className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <span className="text-sm text-slate-500 line-through">R$ 997</span>
                <span className="text-5xl font-bold tracking-tight md:text-6xl" style={{ color: NAVY }}>
                  R$ 297
                </span>
                <span className="text-sm text-slate-600">
                  à vista · ou 12× de <strong>R$ 30,18</strong>
                </span>
              </div>
              <div className="mb-8 grid grid-cols-1 gap-3 text-sm text-slate-700 sm:grid-cols-3">
                {["Acesso vitalício", "Conteúdo 100% online", "Garantia de 7 dias"].map((b) => (
                  <div key={b} className="flex items-center gap-2 rounded-sm border border-slate-200 px-3 py-2">
                    <span className="text-xs font-bold" style={{ color: GREEN }}>
                      ✓
                    </span>
                    {b}
                  </div>
                ))}
              </div>
              <a
                href="#"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:-translate-y-0.5 md:w-auto"
                style={{ background: GREEN, boxShadow: `0 10px 28px -10px ${GREEN}99` }}
              >
                Garantir matrícula
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCO 7 — Sobre */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid items-start gap-10 md:grid-cols-5">
            <div className="md:col-span-2">
              <div
                className="aspect-[4/5] w-full overflow-hidden rounded-md border"
                style={{
                  borderColor: `${BLUE}40`,
                  background: `linear-gradient(160deg, ${NAVY} 0%, ${BLUE} 100%)`,
                }}
              >
                <div className="flex h-full w-full items-end p-6">
                  <div className="text-white">
                    <div className="font-mono text-xs uppercase tracking-widest text-white/60">
                      Coordenação
                    </div>
                    <div className="text-2xl font-bold tracking-tight">Dr. Francisco Amaral</div>
                    <div className="mt-1 text-xs text-white/70">
                      Anestesiologista · TSA / MSc / PhD
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-3">
              <SectionLabel>Coordenação científica</SectionLabel>
              <h2 className="mb-5 text-3xl font-bold tracking-tight md:text-4xl" style={{ color: NAVY }}>
                Dr. Francisco Amaral
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-slate-700 md:text-[1.05rem]">
                <p>
                  Anestesiologista com mais de <strong>20 anos de atuação</strong> em sala
                  cirúrgica. Mestre e Doutor pela <strong>UFPR</strong>, com fellowship nos
                  Estados Unidos e participação no conselho da Sociedade Paranaense de
                  Anestesiologia.
                </p>
                <p>
                  Estruturou o <strong style={{ color: BLUE }}>Método RAC</strong> — Raciocínio
                  Clínico Aplicado — a partir da observação sistemática das lacunas de formação
                  no ensino de anestesia obstétrica.
                </p>
                <p>
                  O método integra fisiologia, farmacologia e tomada de decisão em um framework
                  reprodutível, voltado à segurança perioperatória da gestante.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCO 8 — Garantia */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-3xl px-5">
          <div
            className="rounded-md border p-8 md:p-10"
            style={{ borderColor: `${GREEN}55`, background: "#f0fbf5" }}
          >
            <div className="flex items-start gap-5">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm font-bold text-white"
                style={{ background: GREEN }}
              >
                7d
              </div>
              <div>
                <h3 className="mb-2 text-xl font-bold tracking-tight md:text-2xl" style={{ color: NAVY }}>
                  Garantia incondicional de 7 dias
                </h3>
                <p className="text-sm leading-relaxed text-slate-700 md:text-base">
                  Caso o conteúdo não corresponda à expectativa técnica, o reembolso é integral —
                  solicitado por e-mail, sem burocracia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer
        className="py-8 text-center text-xs"
        style={{ background: NAVY, color: "rgba(255,255,255,0.6)" }}
      >
        © {new Date().getFullYear()} Dr. Francisco Amaral · Método RAC — Todos os direitos
        reservados
      </footer>
    </div>
  );
}
