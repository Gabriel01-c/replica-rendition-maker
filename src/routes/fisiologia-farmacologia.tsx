import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import HERO_MOCKUP from "@/assets/mockup-fisio-farmaco-hero.png.asset.json";
import FRANCISCO_PHOTO from "@/assets/francisco.png";


export const Route = createFileRoute("/fisiologia-farmacologia")({
  head: () => ({
    meta: [
      { title: "Raciocínio Clínico em Anestesia Obstétrica — Dr. Francisco Amaral" },
      {
        name: "description",
        content:
          "Aprenda a tomar decisões certas em qualquer situação obstétrica, sem decorar protocolo, sem travar na hora que mais importa.",
      },
    ],
  }),
  component: Page,
});

const NAVY = "#02035b";
const TEAL = "#01b796";
const VIOLET = "#5758fa";

const fisiologia = [
  "Fisiologia Cardiovascular da Gestante",
  "Fisiologia Respiratória da Gestante",
  "Fisiologia Neurológica da Gestante",
  "Fisiologia Hematológica da Gestante",
  "Fisiologia Renal da Gestante",
  "Fisiologia Gastrointestinal da Gestante",
];

const farmacologia = [
  "Farmacologia na Gestante",
  "Farmacologia dos Anestésicos Venosos",
  "Farmacologia dos Opioides em Gestantes",
  "Vasopressores em Gestantes",
  "Farmacologia dos Relaxantes Musculares",
  "Halogenados em Gestantes",
];

const motivos = [
  {
    n: "01",
    t: "Você foi treinado para decorar, não para raciocinar",
    d: "A residência te ensinou condutas. Ninguém te ensinou o porquê por trás delas. E é o porquê que te salva quando o caso foge do protocolo.",
  },
  {
    n: "02",
    t: "Você não domina as adaptações da gestante",
    d: "A fisiologia da gestante muda tudo: cardiovascular, respiratório, neurológico. Sem entender essas mudanças, qualquer procedimento complexo gera hesitação.",
  },
  {
    n: "03",
    t: "Você nunca foi treinado para decidir sob pressão",
    d: "Raciocínio clínico não é improviso. É método. E sem método, a pressão do momento paralisa.",
  },
];

const paraQuem = [
  "É residente em anestesiologia e sente insegurança em procedimentos obstétricos",
  "Busca mais confiança para tomar decisões anestésicas em gestantes",
  "Já atua em plantões mas trava na hora de raciocinar sob pressão",
  "Quer dominar fisiologia e farmacologia obstétrica aplicadas à decisão clínica real",
];

const naoEh = [
  "Procura conteúdo superficial ou resumido demais",
  "Não deseja aprofundar o raciocínio clínico na anestesia obstétrica",
  "Não pretende evoluir tecnicamente dentro da especialidade",
  "Busca fórmulas prontas sem compreender o motivo das condutas",
];

function CTA({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
  return (
    <a
      href="#preco"
      className={`inline-block whitespace-nowrap rounded-full px-8 py-4 font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl ${className}`}
      style={{
        background: `linear-gradient(135deg, ${TEAL} 0%, ${VIOLET} 100%)`,
      }}
    >
      {children ?? "QUERO ESSE RACIOCÍNIO AGORA"}
    </a>
  );
}

function FloatingCTA() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section]")
    );
    if (!sections.length) return;

    const update = () => {
      const mid = window.innerHeight / 2;
      let active: HTMLElement | null = null;
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) {
          active = s;
          break;
        }
      }
      if (!active) {
        active =
          sections.find((s) => s.getBoundingClientRect().bottom > 0) ?? sections[0];
      }
      const hasCta = active?.dataset.hascta === "true";
      setVisible(!hasCta);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  if (!visible) return null;

  return (
    <a
      href="#preco"
      className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-full px-7 py-4 text-sm font-bold text-white shadow-2xl transition-all hover:-translate-y-0.5 md:text-base"
      style={{ background: TEAL }}
    >
      QUERO ESSE RACIOCÍNIO AGORA
    </a>
  );
}

function Page() {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white text-slate-900" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* BLOCO 1 — Hero */}
      <section
        data-section
        data-bg="dark"
        data-hascta="true"
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, #01021f 0%, #02043a 60%, #060764 100%)`,
        }}
      >
        {/* Grid quadriculado moderno */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          }}
        />
        {/* Listras diagonais sutis */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 18px, #ffffff 18px, #ffffff 19px)`,
          }}
        />
        {/* Brilho atmosférico */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 15% 20%, ${TEAL}55 0%, transparent 45%), radial-gradient(circle at 85% 80%, ${VIOLET}55 0%, transparent 45%)`,
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 pt-10 pb-12 md:pt-20 md:pb-24">
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="text-white">
              <span
                className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider"
                style={{ background: TEAL, color: NAVY }}
              >
                aulas aplicadas com casos clínicos
              </span>
              <h1 className="mb-4 text-3xl font-black leading-tight md:text-5xl lg:text-6xl">
                Como Raciocinar com Segurança na{" "}
                <span style={{ color: TEAL }}>Anestesia Obstétrica</span>
              </h1>
              <p className="mb-2 text-base text-white/85 md:mb-6 md:text-lg">
                Aprenda a tomar decisões certas em qualquer situação obstétrica, sem decorar
                protocolo, sem travar na hora que mais importa.
              </p>
              <div className="-mb-2 flex justify-center md:hidden">
                <img
                  src={HERO_MOCKUP.url}
                  alt="Módulos Fisiologia da Gestante e Farmacologia"
                  className="w-full max-w-xs h-auto drop-shadow-2xl"
                />
              </div>
              <CTA />
            </div>
            <div className="hidden md:flex md:justify-center">
              <img
                src={HERO_MOCKUP.url}
                alt="Módulos Fisiologia da Gestante e Farmacologia"
                className="w-full max-w-lg h-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* BLOCO 2 — Dor */}
      <section
        data-section
        data-bg="dark"
        data-hascta="false"
        className="py-16 md:py-24"
        style={{
          background: `linear-gradient(135deg, #01021f 0%, #02043a 60%, #060764 100%)`,
        }}
      >
        <div className="mx-auto max-w-4xl px-5 text-center">
          <h2 className="mb-6 text-2xl font-bold leading-tight text-white md:text-4xl">
            Você já ficou em dúvida numa situação obstétrica com o paciente instável e a equipe te
            olhando?
          </h2>
          <p className="text-lg text-white/85 md:text-xl">
            Essa sensação não é falta de esforço. É falta de{" "}
            <span className="font-bold" style={{ color: VIOLET }}>
              raciocínio clínico estruturado
            </span>
            . E enquanto isso não mudar, a insegurança vai continuar aparecendo nos momentos que
            mais importam.
          </p>
        </div>
      </section>

      {/* BLOCO 3 — 3 motivos */}
      <section data-section data-bg="light" data-hascta="false" className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl" style={{ color: NAVY }}>
            Isso acontece por <span style={{ color: TEAL }}>3 motivos</span>
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {motivos.map((m) => (
              <div
                key={m.n}
                onMouseEnter={() => setHover(m.n)}
                onMouseLeave={() => setHover(null)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                style={{
                  borderTop: `4px solid ${hover === m.n ? VIOLET : TEAL}`,
                }}
              >
                <div
                  className="mb-4 text-5xl font-black transition-colors"
                  style={{ color: hover === m.n ? VIOLET : TEAL }}
                >
                  {m.n}
                </div>
                <h3 className="mb-3 text-lg font-bold" style={{ color: NAVY }}>
                  {m.t}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">{m.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOCO 4 — O que vai dominar */}
      <section
        data-section
        data-bg="dark"
        data-hascta="false"
        className="py-16 md:py-24"
        style={{
          background: `linear-gradient(160deg, ${NAVY} 0%, #0d0e8a 100%)`,
        }}
      >
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-12 text-center">
            <span
              className="mb-3 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider"
              style={{ background: TEAL, color: NAVY }}
            >
              Conteúdo das Aulas
            </span>
            <h2 className="text-3xl font-bold text-white md:text-5xl">
              O que você vai <span style={{ color: TEAL }}>DOMINAR</span>
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {[
              { title: "Fisiologia", items: fisiologia, color: TEAL, label: "Módulo 01" },
              { title: "Farmacologia", items: farmacologia, color: VIOLET, label: "Módulo 02" },
            ].map((bloco) => (
              <ModuloCard
                key={bloco.title}
                title={bloco.title}
                items={bloco.items}
                color={bloco.color}
                label={bloco.label}
              />
            ))}
          </div>


        </div>
      </section>

      {/* BLOCO 5 — Para quem é / não é */}
      <section data-section data-bg="light" data-hascta="false" className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
              Diagnóstico rápido
            </span>
            <h2 className="text-3xl font-bold md:text-4xl" style={{ color: NAVY }}>
              Essa formação é para você?
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {/* PARA */}
            {(() => {
              const GREEN = "#10b981";
              return (
                <div
                  className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 transition-all duration-300 hover:-translate-y-1"
                  style={{ boxShadow: `0 20px 60px -30px ${GREEN}80` }}
                >
                  <div
                    className="absolute inset-x-0 top-0 h-[3px]"
                    style={{ background: `linear-gradient(90deg, transparent, ${GREEN}, transparent)` }}
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-10 blur-3xl"
                    style={{ background: GREEN }}
                  />
                  <div className="relative">
                    <div className="mb-5 flex items-center gap-3">
                      <span
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-base font-bold text-white"
                        style={{ background: GREEN }}
                      >
                        ✓
                      </span>
                      <span
                        className="text-[11px] font-semibold uppercase tracking-[0.25em]"
                        style={{ color: GREEN }}
                      >
                        Perfeita para você
                      </span>
                    </div>
                    <h3 className="mb-7 text-2xl font-semibold tracking-tight md:text-3xl" style={{ color: NAVY }}>
                      Sim, é para mim
                    </h3>
                    <ul className="space-y-3">
                      {paraQuem.map((p) => (
                        <li
                          key={p}
                          className="flex items-start gap-3.5 rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 transition-colors hover:border-slate-200 hover:bg-white"
                        >
                          <span
                            className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                            style={{ background: GREEN }}
                          >
                            ✓
                          </span>
                          <span className="pt-0.5 text-[15px] font-normal leading-snug text-slate-700">
                            {p}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })()}

            {/* NÃO */}
            {(() => {
              const RED = "#e11d48";
              return (
                <div
                  className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 transition-all duration-300 hover:-translate-y-1"
                  style={{ boxShadow: `0 20px 60px -30px ${RED}80` }}
                >
                  <div
                    className="absolute inset-x-0 top-0 h-[3px]"
                    style={{ background: `linear-gradient(90deg, transparent, ${RED}, transparent)` }}
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -left-20 -bottom-20 h-56 w-56 rounded-full opacity-10 blur-3xl"
                    style={{ background: RED }}
                  />
                  <div className="relative">
                    <div className="mb-5 flex items-center gap-3">
                      <span
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-base font-bold text-white"
                        style={{ background: RED }}
                      >
                        ✕
                      </span>
                      <span
                        className="text-[11px] font-semibold uppercase tracking-[0.25em]"
                        style={{ color: RED }}
                      >
                        Não é para você se
                      </span>
                    </div>
                    <h3 className="mb-7 text-2xl font-semibold tracking-tight md:text-3xl" style={{ color: NAVY }}>
                      Não é para mim
                    </h3>
                    <ul className="space-y-3">
                      {naoEh.map((p) => (
                        <li
                          key={p}
                          className="flex items-start gap-3.5 rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 transition-colors hover:border-slate-200 hover:bg-white"
                        >
                          <span
                            className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                            style={{ background: RED }}
                          >
                            ✕
                          </span>
                          <span className="pt-0.5 text-[15px] font-normal leading-snug text-slate-700">
                            {p}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>


      {/* BLOCO 6 — Preço */}
      <section id="preco" data-section data-bg="light" data-hascta="true" className="py-16 md:py-24" style={{ background: "#f7f8fc" }}>
        <div className="mx-auto max-w-4xl px-5">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="text-lg italic leading-relaxed text-slate-700 md:text-xl">
              "Vinte anos dentro de sala cirúrgica me ensinaram que o anestesista inseguro não
              precisa de mais protocolo, precisa de raciocínio. É isso que eu coloquei aqui."
            </p>
          </div>
          <div
            className="overflow-hidden rounded-3xl shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${NAVY} 0%, ${VIOLET} 100%)`,
            }}
          >
            <div className="p-8 text-center text-white md:p-12">
              <span
                className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider"
                style={{ background: TEAL, color: NAVY }}
              >
                Oferta por tempo limitado
              </span>
              <div className="mb-2 text-lg text-white/70 line-through">De R$ 997</div>
              <div className="mb-2 text-sm font-semibold uppercase tracking-wider text-white/90">
                Por apenas
              </div>
              <div className="mb-2 text-6xl font-black md:text-7xl" style={{ color: TEAL }}>
                R$ 197
              </div>
              <div className="mb-6 text-base text-white/90">
                à vista <span className="opacity-60">ou</span>{" "}
                <span className="font-bold">12x de R$ 20,02</span>
              </div>
              <div className="mb-8 flex flex-wrap justify-center gap-3 text-xs">
                <span className="rounded-full bg-white/10 px-4 py-2 font-semibold backdrop-blur">
                  ✓ Acesso imediato
                </span>
                <span className="rounded-full bg-white/10 px-4 py-2 font-semibold backdrop-blur">
                  ✓ 100% online
                </span>
                <span className="rounded-full bg-white/10 px-4 py-2 font-semibold backdrop-blur">
                  ✓ Garantia de 7 dias
                </span>
              </div>
              <div className="flex justify-center">
                <a
                  href="#"
                  className="inline-block whitespace-nowrap rounded-full bg-white px-7 py-3 text-sm font-black shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl md:px-9 md:py-3.5 md:text-base"
                  style={{ color: NAVY }}
                >
                  QUERO ESSE RACIOCÍNIO AGORA
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCO 7 — Sobre Francisco */}
      <section
        data-section
        data-bg="dark"
        data-hascta="false"
        className="py-16 md:py-24"
        style={{
          background: `linear-gradient(160deg, #01021f 0%, #050636 60%, #0a0b4a 100%)`,
        }}
      >
        <div className="mx-auto max-w-3xl px-5">
          <div className="flex flex-col items-center text-left">
            <span
              className="mb-3 inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider"
              style={{ background: TEAL, color: NAVY }}
            >
              Quem está por trás
            </span>
            <h2 className="mb-4 text-3xl font-black text-white md:text-4xl">
              Dr. Francisco Amaral
            </h2>
            <p className="mb-4 text-base leading-relaxed text-white/80 md:text-lg">
              Anestesiologista com mais de <strong className="text-white">20 anos de sala cirúrgica</strong>. Mestre e
              Doutor pela UFPR, Fellowship nos Estados Unidos e membro do conselho da Sociedade
              Paranaense de Anestesiologia.
            </p>
            <p className="mb-4 text-base leading-relaxed text-white/80 md:text-lg">
              Ao longo desses anos, percebi que o problema da maioria dos anestesistas não é falta de esforço, é falta de raciocínio clínico estruturado.
              Decoraram protocolos. Nunca aprenderam o porquê.
            </p>
            <p className="mb-0 text-base leading-relaxed text-white/80 md:text-lg">
              Criei o <strong style={{ color: TEAL }}>Método RAC</strong> para mudar isso. E é
              ele que está por trás de tudo que você vai aprender aqui.
            </p>
            <img
              src={FRANCISCO_PHOTO}
              alt="Dr. Francisco Amaral"
              className="mx-auto block w-full max-w-xl h-auto drop-shadow-2xl my-0"
            />
            <a
              href="#"
              className="inline-block whitespace-nowrap rounded-full px-7 py-3 text-sm font-black shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl md:px-9 md:py-3.5 md:text-base"
              style={{ background: TEAL, color: NAVY }}
            >
              QUERO ESSE RACIOCÍNIO AGORA
            </a>
          </div>
        </div>
      </section>

      {/* BLOCO 8 — Garantia */}
      <section data-section data-bg="light" data-hascta="false" className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5">
          <div
            className="relative overflow-hidden rounded-3xl border-2 p-8 text-center md:p-12"
            style={{ borderColor: TEAL, background: "#f0fdf9" }}
          >
            <div
              className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full text-4xl text-white shadow-xl"
              style={{ background: `linear-gradient(135deg, ${TEAL}, ${VIOLET})` }}
            >
              🛡️
            </div>
            <h3 className="mb-3 text-2xl font-black md:text-3xl" style={{ color: NAVY }}>
              Risco zero. Garantia de 7 dias.
            </h3>
            <p className="text-base leading-relaxed text-slate-700 md:text-lg">
              Se você entrar, estudar e sentir que o conteúdo não era o que esperava —{" "}
              <strong>devolvo 100% do seu dinheiro</strong>. Sem perguntas, sem burocracia.
            </p>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-xs text-slate-500" style={{ background: NAVY, color: "rgba(255,255,255,0.7)" }}>
        © {new Date().getFullYear()} Dr. Francisco Amaral — Todos os direitos reservados
      </footer>
      <FloatingCTA />
    </div>
  );
}

function ModuloCard({
  title,
  items,
  color,
  label,
}: {
  title: string;
  items: string[];
  color: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-[28px] border border-white/[0.08] p-8 md:p-12"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
      }}
    >
      {/* hairline top accent */}
      <div
        aria-hidden
        className="absolute inset-x-10 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        }}
      />

      {/* watermark numeral */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-2 -top-4 select-none font-serif text-[140px] leading-none tracking-tighter md:text-[180px]"
        style={{
          color,
          opacity: 0.07,
          fontStyle: "italic",
        }}
      >
        {label.replace("Módulo ", "")}
      </div>

      <div className="relative mb-10">
        <span
          className="mb-3 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.32em] text-white/50"
        >
          <span
            className="inline-block h-px w-6"
            style={{ background: color }}
          />
          {label}
        </span>
        <div className="flex items-end justify-between gap-4">
          <h3 className="font-serif text-3xl font-normal tracking-tight text-white md:text-4xl">
            {title}
          </h3>
          <span className="pb-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
            {items.length} aulas
          </span>
        </div>
      </div>

      <ul className="relative space-y-2.5">
        {items.map((item, i) => (
          <li
            key={item}
            className="group/item relative flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(10px)",
              transition: `opacity 600ms cubic-bezier(0.16,1,0.3,1) ${i * 90}ms, transform 600ms cubic-bezier(0.16,1,0.3,1) ${i * 90}ms, background-color 300ms, border-color 300ms`,
            }}
          >
            {/* left accent bar */}
            <span
              aria-hidden
              className="absolute inset-y-3 left-0 w-[2px] rounded-full opacity-30 transition-opacity duration-300 group-hover/item:opacity-100"
              style={{ background: color }}
            />

            {/* number badge */}
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold tabular-nums transition-all duration-300"
              style={{
                background: `${color}14`,
                color,
                border: `1px solid ${color}33`,
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <span className="flex-1 text-[15px] font-normal leading-snug text-white/90 transition-colors group-hover/item:text-white">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );


}
