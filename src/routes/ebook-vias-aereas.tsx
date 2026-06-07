import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import ebookMockupAsset from "@/assets/ebook-vias-aereas-mockup.png.asset.json";
import {
  Check,
  X,
  Stethoscope,
  Wind,
  Activity,
  HeartPulse,
  Brain,
  Pill,
  ClipboardList,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/ebook-vias-aereas")({
  head: () => ({
    meta: [
      { title: "Como Dominar Vias Aéreas na Emergência sem Decoreba" },
      {
        name: "description",
        content:
          "Aprenda a raciocinar antes, durante e depois da intubação. Ebook com Método RAC aplicado a vias aéreas na emergência.",
      },
      { property: "og:title", content: "Como Dominar Vias Aéreas na Emergência sem Decoreba" },
      {
        property: "og:description",
        content:
          "Clínica, fisiologia e farmacologia para decisões mais seguras em cenários críticos de via aérea.",
      },
    ],
  }),
  component: Page,
});

const CHECKOUT_URL = "https://pay.hub.la/xPrruJVoPpKMO0zfGIsL";

const STYLES = `
:root {
  --va-bg: #020a0f;
  --va-bg-2: #041824;
  --va-panel: #071e2b;
  --va-line: rgba(94, 234, 212, 0.18);
  --va-teal: #5EEAD4;
  --va-teal-strong: #2DD4BF;
  --va-text: #E6F1F5;
  --va-muted: #92B0BC;
}
.va-root {
  background: radial-gradient(1200px 600px at 50% -10%, #03161f 0%, #01080d 60%, #000305 100%);
  color: var(--va-text);
  font-family: 'Manrope', Inter, system-ui, sans-serif;
  min-height: 100vh;
  overflow-x: hidden;
}
.va-grid-bg {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(to right, rgba(94,234,212,0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(94,234,212,0.05) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
  pointer-events: none;
}
.va-glow {
  position: absolute;
  border-radius: 9999px;
  filter: blur(80px);
  opacity: 0.45;
  pointer-events: none;
}

/* ECG line */
.ecg-wrap {
  position: absolute; left: 0; right: 0;
  height: 80px;
  overflow: hidden;
  pointer-events: none;
  opacity: 0.5;
}
.ecg-svg { width: 200%; height: 100%; display: block; animation: ecg-scroll 8s linear infinite; }
@keyframes ecg-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

/* O2 flow lines */
.o2-line {
  stroke-dasharray: 6 14;
  animation: o2-flow 6s linear infinite;
}
@keyframes o2-flow {
  to { stroke-dashoffset: -200; }
}

/* Reveal */
.reveal { opacity: 0; transform: translateY(22px); transition: opacity .7s ease, transform .7s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }

/* Card hover glow */
.va-card {
  background: linear-gradient(160deg, rgba(10,44,62,0.85), rgba(6,33,49,0.7));
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 18px;
  transition: border-color .25s ease, transform .25s ease, box-shadow .25s ease;
}
.va-card:hover {
  border-color: var(--va-teal);
  box-shadow: 0 0 0 1px rgba(94,234,212,0.25), 0 18px 50px rgba(45,212,191,0.15);
  transform: translateY(-3px);
}

.chip {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 12px; border-radius: 999px;
  background: rgba(94,234,212,0.08);
  border: 1px solid rgba(94,234,212,0.2);
  color: var(--va-teal);
  font-size: 12px; font-weight: 600; letter-spacing: .02em;
}

.btn-primary {
  display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  width: 100%; min-height: 58px; padding: 0 24px;
  font-weight: 800; font-size: 15px; letter-spacing: .02em; text-transform: uppercase;
  color: #020a0f;
  background: linear-gradient(180deg, #5EEAD4 0%, #2DD4BF 100%);
  border-radius: 14px; border: none; cursor: pointer;
  box-shadow: 0 14px 40px rgba(45,212,191,0.35);
  transition: transform .18s ease, box-shadow .18s ease;
}
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 20px 50px rgba(45,212,191,0.5); }

.float-cta {
  position: fixed; left: 16px; right: 16px; bottom: 16px;
  z-index: 60;
  transform: translateY(140%);
  transition: transform .35s cubic-bezier(.22,1,.36,1);
}
.float-cta.show { transform: translateY(0); }

/* Sequence icons */
.seq-step {
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  flex: 1; min-width: 0;
}
.seq-icon {
  width: 48px; height: 48px; border-radius: 14px;
  display: grid; place-items: center;
  background: rgba(94,234,212,0.08);
  border: 1px solid rgba(94,234,212,0.25);
  color: var(--va-teal);
  animation: pulse-soft 3.4s ease-in-out infinite;
}
.seq-step:nth-child(2) .seq-icon { animation-delay: .4s; }
.seq-step:nth-child(3) .seq-icon { animation-delay: .8s; }
.seq-step:nth-child(4) .seq-icon { animation-delay: 1.2s; }
.seq-step:nth-child(5) .seq-icon { animation-delay: 1.6s; }
@keyframes pulse-soft {
  0%, 100% { box-shadow: 0 0 0 0 rgba(94,234,212,0.25); }
  50%      { box-shadow: 0 0 0 8px rgba(94,234,212,0); }
}
.seq-label { font-size: 11px; color: var(--va-muted); font-weight: 600; letter-spacing: .04em; text-transform: uppercase; }

/* Mockup placeholder */
.mockup {
  position: relative;
  width: 220px; height: 300px; margin: 0 auto;
  border-radius: 8px 14px 14px 8px;
  background: linear-gradient(160deg, #071e2b 0%, #020a0f 100%);
  border: 1px solid rgba(94,234,212,0.18);
  border-left: 6px solid #0a3448;
  box-shadow: 0 30px 70px rgba(0,0,0,0.55), inset 1px 0 0 rgba(255,255,255,0.04);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 24px 18px; text-align: center;
  transform: perspective(900px) rotateY(-8deg);
}
.mockup-tag { font-size: 10px; letter-spacing: .18em; color: var(--va-teal); font-weight: 700; margin-bottom: 14px; }
.mockup-title { font-size: 18px; font-weight: 800; line-height: 1.2; color: var(--va-text); letter-spacing: -.02em; }
.mockup-sub { font-size: 11px; color: var(--va-muted); margin-top: 10px; }
.mockup-accent { width: 44px; height: 3px; background: var(--va-teal); border-radius: 3px; margin: 14px auto; }
.mockup-placeholder { font-size: 9px; color: rgba(146,176,188,0.7); margin-top: 18px; letter-spacing: .14em; text-transform: uppercase; }

.mockup-mini {
  width: 130px; height: 165px;
  border-radius: 6px 10px 10px 6px;
  background: linear-gradient(160deg, #071e2b 0%, #020a0f 100%);
  border: 1px solid rgba(94,234,212,0.22);
  border-left: 5px solid #0a3448;
  box-shadow: 0 18px 40px rgba(0,0,0,0.55);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 12px 10px; text-align: center;
  transform: perspective(700px) rotateY(-8deg);
}
.mockup-mini-tag { font-size: 7px; letter-spacing: .16em; color: var(--va-teal); font-weight: 700; margin-bottom: 6px; }
.mockup-mini-title { font-size: 12px; font-weight: 800; line-height: 1.15; color: var(--va-text); letter-spacing: -.01em; }
.mockup-mini-accent { width: 28px; height: 2px; background: var(--va-teal); border-radius: 3px; margin: 8px auto; }
.mockup-mini-sub { font-size: 8.5px; color: var(--va-muted); }


.divider-soft {
  height: 1px; width: 100%;
  background: linear-gradient(90deg, transparent, rgba(94,234,212,0.25), transparent);
}

.section { position: relative; padding: 64px 0; }
.container { max-width: 1120px; margin: 0 auto; padding: 0 20px; }

.section-title { font-size: 28px; font-weight: 800; letter-spacing: -0.03em; line-height: 1.12; }
.section-sub { color: var(--va-muted); font-size: 15.5px; line-height: 1.65; }

@media (min-width: 768px) {
  .section { padding: 96px 0; }
  .section-title { font-size: 38px; }
}

@media (prefers-reduced-motion: reduce) {
  .ecg-svg, .o2-line, .seq-icon { animation: none !important; }
  .reveal { opacity: 1; transform: none; }
}
`;

function EcgLine({ className = "" }: { className?: string }) {
  return (
    <div className={`ecg-wrap ${className}`}>
      <svg className="ecg-svg" viewBox="0 0 800 80" preserveAspectRatio="none">
        <path
          d="M0 40 H120 L130 40 L138 20 L146 60 L154 30 L162 40 H280 L290 40 L298 20 L306 60 L314 30 L322 40 H440 L450 40 L458 20 L466 60 L474 30 L482 40 H600 L610 40 L618 20 L626 60 L634 30 L642 40 H800"
          fill="none"
          stroke="#5EEAD4"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}

function O2Flow() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 400 600"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        className="o2-line"
        d="M-20 120 C 100 80, 200 200, 420 140"
        fill="none"
        stroke="#5EEAD4"
        strokeWidth="1.2"
        opacity="0.5"
      />
      <path
        className="o2-line"
        d="M-20 280 C 120 220, 240 360, 420 300"
        fill="none"
        stroke="#5EEAD4"
        strokeWidth="1.2"
        opacity="0.35"
        style={{ animationDelay: "1.5s" }}
      />
      <path
        className="o2-line"
        d="M-20 460 C 80 400, 260 540, 420 480"
        fill="none"
        stroke="#5EEAD4"
        strokeWidth="1.2"
        opacity="0.25"
        style={{ animationDelay: "3s" }}
      />
    </svg>
  );
}

function Mockup() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="va-glow"
        style={{ width: 280, height: 280, background: "#2DD4BF", top: -40, left: -40 }}
      />
      <img
        src={ebookMockupAsset.url}
        alt="Ebook Vias Aéreas na Emergência - Dr. Francisco Amaral"
        className="relative w-full max-w-[460px] h-auto mx-auto"
      />
    </div>
  );
}

function CtaButton({ children = "QUERO DOMINAR VIAS AÉREAS" }: { children?: React.ReactNode }) {
  return (
    <a
      href={CHECKOUT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-primary"
    >
      {children} <ArrowRight size={18} />
    </a>
  );
}

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function Page() {
  useReveal();
  const heroRef = useRef<HTMLDivElement | null>(null);
  const priceRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const [showFloat, setShowFloat] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const heroBottom = heroRef.current?.getBoundingClientRect().bottom ?? 0;
      const priceRect = priceRef.current?.getBoundingClientRect();
      const aboutRect = aboutRef.current?.getBoundingClientRect();
      const vh = window.innerHeight;

      const passedHero = heroBottom < 80;
      const inPrice =
        priceRect ? priceRect.top < vh * 0.85 && priceRect.bottom > vh * 0.15 : false;
      const inAbout =
        aboutRect ? aboutRect.top < vh * 0.85 && aboutRect.bottom > vh * 0.15 : false;

      setShowFloat(passedHero && !inPrice && !inAbout);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div className="va-root">
        {/* ============ HERO ============ */}
        <section ref={heroRef} className="section relative !py-6 md:!py-24 pt-6 md:pt-16">
          <div className="va-grid-bg" />
          <div
            aria-hidden
            className="va-glow"
            style={{ width: 420, height: 420, background: "#2DD4BF", top: -120, left: -120 }}
          />
          <div
            aria-hidden
            className="va-glow"
            style={{ width: 360, height: 360, background: "#072d3f", top: 80, right: -80 }}
          />

          <div className="container relative">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="reveal text-center md:text-left">
                <span className="chip mb-3 md:mb-5">
                  <Sparkles size={14} /> Método RAC aplicado
                </span>
                <h1 className="text-[26px] md:text-[2.75rem] lg:text-5xl font-extrabold leading-[1.1] tracking-tight mb-2 md:mb-5">
                  Descubra como dominar{" "}
                  <span style={{ color: "var(--va-teal)" }}>vias aéreas na emergência</span> sem
                  depender de decoreba
                </h1>
                <p className="section-sub mb-3 md:mb-5 max-w-xl mx-auto md:mx-0 text-[12.5px] md:text-[15.5px] leading-snug md:leading-relaxed">
                  Aprenda a raciocinar antes, durante e depois da intubação, conectando clínica,
                  fisiologia e farmacologia para tomar decisões mais seguras em cenários críticos.
                </p>

                <div className="relative h-10 mb-2 md:mb-5 overflow-hidden" aria-hidden>
                  <div className="ecg-wrap" style={{ position: "absolute", inset: 0, height: "100%", opacity: 0.6 }}>
                    <svg className="ecg-svg" viewBox="0 0 800 80" preserveAspectRatio="none">
                      <path
                        d="M0 40 H120 L130 40 L138 20 L146 60 L154 30 L162 40 H280 L290 40 L298 20 L306 60 L314 30 L322 40 H440 L450 40 L458 20 L466 60 L474 30 L482 40 H600 L610 40 L618 20 L626 60 L634 30 L642 40 H800"
                        fill="none"
                        stroke="#5EEAD4"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.8"
                      />
                    </svg>
                  </div>
                </div>

                <div className="md:hidden mb-4 flex justify-center">
                  <img
                    src={ebookMockupAsset.url}
                    alt="Ebook Vias Aéreas na Emergência - Dr. Francisco Amaral"
                    className="w-full max-w-[280px] h-auto"
                  />
                </div>

                <div className="max-w-md mx-auto md:mx-0">
                  <CtaButton />
                </div>

                <div className="hidden md:flex flex-wrap gap-2 mt-6">
                  {[
                    "Método RAC",
                    "Vias aéreas",
                    "Emergência",
                    "Fisiologia e farmacologia",
                    "Decisões seguras",
                  ].map((c) => (
                    <span key={c} className="chip">
                      {c}
                    </span>
                  ))}
                </div>
              </div>


              <div className="hidden md:flex justify-center reveal">
                <Mockup />
              </div>
            </div>
          </div>
        </section>


        <div className="divider-soft" />

        {/* ============ BLOCO 2 - DOR ============ */}
        <section className="section relative">
          <div className="container max-w-3xl text-center">
            <h2 className="section-title reveal mb-5">
              O problema não é só{" "}
              <span style={{ color: "var(--va-teal)" }}>passar o tubo</span>
            </h2>
            <div className="section-sub space-y-4 reveal">
              <p>
                Na emergência, a via aérea não acontece em um cenário limpo e previsível. O paciente pode estar:
              </p>
              <ul className="grid grid-cols-2 gap-3 text-left mx-auto max-w-md">
                {["Chocado", "Hipóxico", "Acidótico", "Obeso", "Sangrando"].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 shadow-[0_0_20px_rgba(34,197,94,0.08)]"
                  >
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 drop-shadow-[0_0_4px_rgba(34,197,94,0.6)]" />
                    <span className="font-semibold text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                E quando a saturação cai, a pressão despenca e a equipe espera sua decisão, decorar
                algoritmo não é suficiente.
              </p>
              <p style={{ color: "var(--va-text)" }} className="font-semibold">
                Você precisa entender o que está acontecendo antes de agir.
              </p>
            </div>

            {/* Mini sequência */}
            <div className="reveal mt-12 flex gap-3 justify-between">
              {[
                { icon: Stethoscope, label: "Avaliar" },
                { icon: Wind, label: "Otimizar" },
                { icon: Activity, label: "Intubar" },
                { icon: HeartPulse, label: "Estabilizar" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="seq-step">
                  <div className="seq-icon">
                    <Icon size={22} />
                  </div>
                  <span className="seq-label">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider-soft" />

        {/* ============ BLOCO 3 - 3 MOTIVOS ============ */}
        <section className="section relative">
          <EcgLine className="top-12 opacity-30" />
          <div className="container relative">
            <h2 className="section-title text-center reveal mb-12">
              Isso acontece por <span style={{ color: "var(--va-teal)" }}>3 motivos</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  icon: Brain,
                  title: "Você foi treinado para executar, não para raciocinar",
                  text: "Muitos médicos aprendem a intubação como sequência mecânica. Mas o paciente grave exige leitura clínica antes da técnica.",
                },
                {
                  icon: HeartPulse,
                  title:
                    "Você enxerga a via aérea como anatomia e esquece a fisiologia",
                  text: "Na emergência, a anatomia pode parecer fácil, mas o paciente pode colapsar por choque, hipoxemia, acidose ou falência hemodinâmica.",
                },
                {
                  icon: Pill,
                  title: "Você escolhe condutas e drogas por hábito",
                  text: "Etomidato, cetamina, propofol, rocurônio, succinilcolina, vasopressores, VNI, ONAF e videolaringoscópio. Cada escolha precisa ter um motivo.",
                },
              ].map(({ icon: Icon, title, text }, i) => (
                <div key={i} className="va-card reveal p-6">
                  <div
                    className="w-12 h-12 rounded-xl grid place-items-center mb-4"
                    style={{
                      background: "rgba(94,234,212,0.1)",
                      border: "1px solid rgba(94,234,212,0.25)",
                      color: "var(--va-teal)",
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className="text-lg font-extrabold mb-2 leading-snug">{title}</h3>
                  <p className="text-sm" style={{ color: "var(--va-muted)" }}>
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider-soft" />

        {/* ============ BLOCO 4 - O QUE VOCÊ VAI DOMINAR ============ */}
        <section className="section relative">
          <div className="container">
            <h2 className="section-title text-center reveal mb-12 max-w-2xl mx-auto">
              O que você vai{" "}
              <span style={{ color: "var(--va-teal)" }}>dominar dentro do ebook</span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  title: "Quando intubar",
                  text: "A decisão crítica baseada em proteção de via aérea, oxigenação, ventilação e curso clínico previsto.",
                },
                {
                  title: "Via aérea anatomicamente difícil",
                  text: "Como antecipar dificuldade com LEMON, ROMAN, RODS e SMART.",
                },
                {
                  title: "Via aérea fisiologicamente difícil",
                  text: "Como reconhecer o paciente que pode colapsar durante a intubação.",
                },
                {
                  title: "Farmacologia da intubação",
                  text: "Como escolher indutores e bloqueadores com base na hemodinâmica e no risco clínico.",
                },
                {
                  title: "Preparação da sala",
                  text: "Como organizar plano A, ventilação, dispositivo extraglótico e via aérea cirúrgica.",
                },
                {
                  title: "Pós intubação e transporte",
                  text: "Por que a via aérea não termina quando o tubo entra.",
                },
                {
                  title: "Casos clínicos pelo Método RAC",
                  text: "Aplicações práticas em choque séptico, obesidade grave, pediatria e trauma facial.",
                },
              ].map((c, i) => (
                <div key={i} className="va-card reveal p-6">
                  <div className="flex items-start gap-3">
                    <ClipboardList
                      size={20}
                      style={{ color: "var(--va-teal)", marginTop: 2, flexShrink: 0 }}
                    />
                    <div>
                      <h3 className="font-extrabold mb-1.5 leading-snug">{c.title}</h3>
                      <p className="text-sm" style={{ color: "var(--va-muted)" }}>
                        {c.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider-soft" />

        {/* ============ BLOCO 5 - É / NÃO É PARA VOCÊ ============ */}
        <section className="section relative">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-5">
              <div
                className="va-card reveal p-7"
                style={{
                  background: "linear-gradient(160deg, rgba(15,60,25,0.85), rgba(8,35,15,0.7))",
                  borderColor: "rgba(74,222,128,0.4)",
                  boxShadow: "0 0 30px rgba(74,222,128,0.12), inset 0 0 40px rgba(74,222,128,0.03)",
                }}
              >
                <h3 className="text-xl font-extrabold mb-5" style={{ color: "#4ADE80" }}>
                  É para você se
                </h3>
                <ul className="space-y-3">
                  {[
                    "Você atua ou pretende atuar com pacientes críticos",
                    "Você quer mais segurança no manejo de vias aéreas",
                    "Você sente que decorar algoritmo não é suficiente",
                    "Você quer entender o raciocínio por trás da intubação",
                    "Você quer revisar fisiologia, farmacologia e estratégia de forma aplicada",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3 text-sm">
                      <Check
                        size={18}
                        style={{
                          color: "#4ADE80",
                          flexShrink: 0,
                          marginTop: 2,
                          filter: "drop-shadow(0 0 4px rgba(74,222,128,0.6))",
                        }}
                      />
                      <span style={{ color: "var(--va-text)" }}>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="va-card reveal p-7"
                style={{
                  background: "linear-gradient(160deg, rgba(60,15,15,0.85), rgba(35,10,10,0.7))",
                  borderColor: "rgba(248,113,113,0.4)",
                  boxShadow: "0 0 30px rgba(248,113,113,0.12), inset 0 0 40px rgba(248,113,113,0.03)",
                }}
              >
                <h3 className="text-xl font-extrabold mb-5" style={{ color: "#F87171" }}>
                  Não é para você se
                </h3>
                <ul className="space-y-3">
                  {[
                    "Você busca um conteúdo superficial",
                    "Você quer apenas checklist pronto sem entender o motivo",
                    "Você não atua com emergência, UTI, anestesia ou pacientes críticos",
                    "Você procura promessa fácil para um procedimento complexo",
                    "Você não quer aprofundar raciocínio clínico",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3 text-sm">
                      <X
                        size={18}
                        style={{
                          color: "#F87171",
                          flexShrink: 0,
                          marginTop: 2,
                          filter: "drop-shadow(0 0 4px rgba(248,113,113,0.6))",
                        }}
                      />
                      <span style={{ color: "var(--va-text)" }}>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <div className="divider-soft" />

        {/* ============ BLOCO 6 - PREÇO ============ */}
        <section ref={priceRef} className="section relative">
          <div
            aria-hidden
            className="va-glow"
            style={{ width: 500, height: 500, background: "#2DD4BF", top: 0, left: "50%", transform: "translateX(-50%)" }}
          />
          <div className="container max-w-2xl relative">
            <div className="va-card reveal p-8 md:p-10 text-center" style={{ borderColor: "rgba(94,234,212,0.35)" }}>
              <h2 className="section-title mb-4 text-balance text-[22px] md:text-[38px] leading-tight">
                Acesse agora o ebook{" "}
                <span style={{ color: "var(--va-teal)" }}>
                  Como Dominar Vias Aéreas na Emergência sem Decoreba
                </span>
              </h2>
              <p className="section-sub mb-7">
                Um material direto para quem quer parar de tratar a via aérea como um ato mecânico
                e começar a raciocinar com mais segurança em cenários críticos.
              </p>

              <div className="mb-7">
                <div className="text-sm line-through" style={{ color: "var(--va-muted)" }}>
                  De R$ 97,00
                </div>
                <div className="text-5xl font-extrabold my-2" style={{ color: "var(--va-teal)" }}>
                  R$ 45,00
                </div>
                <div className="text-sm" style={{ color: "var(--va-muted)" }}>
                  Ou 10x de R$ 5,33
                </div>
              </div>

              <ul className="text-left space-y-2.5 mb-8 max-w-md mx-auto">
                {[
                  "Ebook digital completo",
                  "Método RAC aplicado às vias aéreas",
                  "Raciocínio clínico, fisiologia e farmacologia",
                  "Acesso imediato",
                  "Garantia de 7 dias",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm">
                    <Check size={18} style={{ color: "var(--va-teal)", marginTop: 2 }} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

              <CtaButton />
            </div>
          </div>
        </section>

        <div className="divider-soft" />

        {/* ============ BLOCO 7 - QUEM ESTÁ POR TRÁS ============ */}
        <section ref={aboutRef} className="section relative pb-32">
          <div className="container max-w-3xl text-center">
            <h2 className="section-title reveal mb-6">
              Quem está por trás do{" "}
              <span style={{ color: "var(--va-teal)" }}>Método RAC</span>
            </h2>
            <div className="section-sub space-y-4 reveal mb-9 max-w-2xl mx-auto">
              <p>
                Dr. Francisco Amaral Egydio de Carvalho é anestesiologista, TSA pela SBA, Mestre e
                Doutor pela UFPR.
              </p>
              <p>
                Com ampla experiência acadêmica e prática, desenvolveu o Método RAC para ajudar
                médicos a deixarem de ser apenas executores de algoritmos e passarem a raciocinar
                de forma integrada, conectando clínica, fisiologia e farmacologia na tomada de
                decisão.
              </p>
              <p>
                Neste ebook, ele aplica esse método ao manejo de vias aéreas na emergência.
              </p>
            </div>
            <div className="max-w-md mx-auto reveal">
              <CtaButton />
            </div>
          </div>
        </section>

        {/* Floating CTA */}
        <div className={`float-cta ${showFloat ? "show" : ""}`}>
          <div className="max-w-md mx-auto">
            <CtaButton />
          </div>
        </div>
      </div>
    </>
  );
}
