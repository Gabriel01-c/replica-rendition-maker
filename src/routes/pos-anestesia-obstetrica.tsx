import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Check,
  Clock,
  Monitor,
  MessageCircle,
  Award,
  Users,
  Video,
  BookOpen,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import bgAsset from "@/assets/sala-cirurgica-bg.png.asset.json";
import drAsset from "@/assets/dr-francisco.png.asset.json";

export const Route = createFileRoute("/pos-anestesia-obstetrica")({
  head: () => ({
    meta: [
      { title: "Pós em Anestesia Obstétrica — Dr. Francisco Amaral" },
      {
        name: "description",
        content:
          "Formação 100% online em anestesia obstétrica com Dr. Francisco Amaral. Aulas gravadas, encontros ao vivo e suporte no WhatsApp.",
      },
      { property: "og:title", content: "Pós em Anestesia Obstétrica — Dr. Francisco Amaral" },
      {
        property: "og:description",
        content:
          "Formação 100% online em anestesia obstétrica com Dr. Francisco Amaral.",
      },
    ],
  }),
  component: PosAnestesiaObstetrica,
});

const ACCENT = "#38BDF8"; // cyan blue matching the OR light
const CTA_URL = "#inscricao";

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function CountdownBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-white/10 bg-white/[0.03] backdrop-blur-sm px-3 py-2 md:px-5 md:py-3 min-w-[64px] md:min-w-[80px]">
      <span
        className="text-2xl md:text-4xl font-bold tabular-nums text-white"
        style={{ fontFamily: "Manrope, Inter, sans-serif" }}
      >
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] md:text-xs uppercase tracking-widest text-white/60 mt-1">
        {label}
      </span>
    </div>
  );
}

function PosAnestesiaObstetrica() {
  // countdown target: 14 days ahead
  const [target] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d;
  });
  const c = useCountdown(target);

  const heroCards = [
    {
      icon: Video,
      title: "Aulas gravadas",
      desc: "Módulos objetivos, direto ao ponto do plantão obstétrico.",
    },
    {
      icon: Users,
      title: "Encontros ao vivo",
      desc: "Discussão de casos reais com Dr. Francisco Amaral.",
    },
    {
      icon: MessageCircle,
      title: "Suporte no WhatsApp",
      desc: "Tire dúvidas com quem vive a sala de parto todo dia.",
    },
  ];

  const modules = [
    "Analgesia de parto sem hesitação",
    "Cesárea de urgência: decisões em minutos",
    "Manejo hemodinâmico da gestante grave",
    "Complicações neuroaxiais e como reagir",
    "Hemorragia obstétrica — protocolo de decisão",
    "Pré-eclâmpsia grave e eclâmpsia",
    "Cardiopatas na obstetrícia",
    "Documentação e proteção jurídica do anestesista",
  ];

  const bonuses = [
    { icon: BookOpen, title: "E-book Vasoativos na Obstetrícia" },
    { icon: BookOpen, title: "E-book Via Aérea da Gestante" },
    { icon: ShieldCheck, title: "Guia de Documentação Defensiva" },
    { icon: Sparkles, title: "Comunidade fechada de alunos" },
  ];

  return (
    <main
      className="min-h-screen w-full text-white antialiased"
      style={{
        fontFamily: "Inter, system-ui, sans-serif",
        backgroundColor: "#020a14",
      }}
    >
      {/* Top exclusivity strip */}
      <div className="w-full border-b border-white/5 bg-black/60 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-2 text-center text-[11px] md:text-xs uppercase tracking-[0.2em] text-white/70 font-medium">
          Exclusivo para anestesiologistas e residentes de anestesiologia
        </div>
      </div>

      {/* HERO */}
      <section className="relative w-full overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgAsset.url})` }}
          aria-hidden
        />
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(2,10,20,0.55) 0%, rgba(2,10,20,0.75) 55%, #020a14 100%)",
          }}
          aria-hidden
        />

        <div className="relative mx-auto max-w-6xl px-4 pt-8 pb-16 md:pt-12 md:pb-24">
          {/* Countdown */}
          <div className="flex flex-col items-center gap-3">
            <span className="text-[11px] md:text-xs uppercase tracking-[0.25em] text-white/60">
              Inscrições encerram em
            </span>
            <div className="flex gap-2 md:gap-3">
              <CountdownBlock value={c.days} label="Dias" />
              <CountdownBlock value={c.hours} label="Horas" />
              <CountdownBlock value={c.minutes} label="Min" />
              <CountdownBlock value={c.seconds} label="Seg" />
            </div>
          </div>

          {/* Doctor centered */}
          <div className="relative mt-8 md:mt-10 flex justify-center">
            {/* halo */}
            <div
              className="absolute top-8 md:top-4 h-[280px] w-[280px] md:h-[440px] md:w-[440px] rounded-full blur-3xl opacity-60"
              style={{
                background:
                  "radial-gradient(circle, rgba(56,189,248,0.45) 0%, rgba(56,189,248,0) 65%)",
              }}
              aria-hidden
            />
            <img
              src={drAsset.url}
              alt="Dr. Francisco Amaral"
              className="relative z-10 h-[260px] md:h-[420px] w-auto object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.65)]"
              loading="eager"
            />
          </div>

          {/* Headline */}
          <div className="relative z-10 mt-6 md:mt-10 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-sm px-4 py-1.5 text-[11px] md:text-xs uppercase tracking-widest text-white/80">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: ACCENT }}
              />
              Pós-graduação · Turma 2026
            </div>

            <h1
              className="mt-5 text-3xl sm:text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight text-white max-w-4xl mx-auto"
              style={{ fontFamily: "Manrope, Inter, sans-serif" }}
            >
              Pós-graduação em{" "}
              <span style={{ color: ACCENT }}>Anestesia Obstétrica</span> com
              raciocínio clínico de sala cirúrgica
            </h1>

            <div className="mt-5 inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs md:text-sm font-semibold uppercase tracking-wider text-white">
              <Monitor size={16} style={{ color: ACCENT }} />
              100% Online
            </div>

            <p className="mt-6 mx-auto max-w-2xl text-sm md:text-lg text-white/70 leading-relaxed font-normal">
              A formação que forma anestesistas obstétricos seguros — com aulas
              gravadas, encontros ao vivo e suporte direto pelo WhatsApp com
              Dr. Francisco Amaral.
            </p>

            {/* Hero cards */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 max-w-4xl mx-auto text-left">
              {heroCards.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-5 hover:border-white/20 transition-colors"
                >
                  <div
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10"
                    style={{ backgroundColor: "rgba(56,189,248,0.1)" }}
                  >
                    <Icon size={20} style={{ color: ACCENT }} />
                  </div>
                  <h3
                    className="mt-4 text-base font-semibold text-white"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {title}
                  </h3>
                  <p className="mt-1.5 text-sm text-white/60 leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-col items-center gap-3">
              <a
                href={CTA_URL}
                className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-sm md:text-base font-semibold uppercase tracking-wider text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  backgroundColor: ACCENT,
                  boxShadow: "0 10px 40px -10px rgba(56,189,248,0.6)",
                }}
              >
                Quero garantir minha vaga
              </a>
              <div className="flex items-center gap-2 text-xs text-white/50">
                <Clock size={12} />
                Vagas limitadas para esta turma
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre / Manifesto */}
      <section className="relative mx-auto max-w-4xl px-4 py-16 md:py-24">
        <div className="text-center">
          <span
            className="text-xs uppercase tracking-[0.3em] font-semibold"
            style={{ color: ACCENT }}
          >
            Por que existe essa formação
          </span>
          <h2
            className="mt-4 text-2xl md:text-4xl font-bold leading-tight text-white"
            style={{ fontFamily: "Manrope, Inter, sans-serif" }}
          >
            Vinte anos dentro de sala cirúrgica me ensinaram que o anestesista
            inseguro não precisa de mais protocolo,{" "}
            <span style={{ color: ACCENT }}>precisa de raciocínio.</span>
          </h2>
          <p className="mt-6 text-base md:text-lg text-white/70 leading-relaxed font-normal">
            Foi esse raciocínio que coloquei aqui. Com aulas gravadas, encontros
            ao vivo e suporte no WhatsApp — para você tomar decisões com
            segurança quando a paciente na sua frente não segue o manual.
          </p>
        </div>
      </section>

      {/* Módulos */}
      <section className="relative border-y border-white/5 bg-white/[0.015]">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <span
              className="text-xs uppercase tracking-[0.3em] font-semibold"
              style={{ color: ACCENT }}
            >
              Conteúdo programático
            </span>
            <h2
              className="mt-4 text-2xl md:text-4xl font-bold text-white"
              style={{ fontFamily: "Manrope, Inter, sans-serif" }}
            >
              O que você vai dominar
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {modules.map((m, i) => (
              <div
                key={m}
                className="flex items-start gap-4 rounded-lg border border-white/10 bg-white/[0.02] p-4 md:p-5 hover:border-white/20 transition-colors"
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md font-bold text-sm"
                  style={{
                    backgroundColor: "rgba(56,189,248,0.12)",
                    color: ACCENT,
                    fontFamily: "Manrope, Inter, sans-serif",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex-1">
                  <p className="text-sm md:text-base font-semibold text-white leading-snug">
                    {m}
                  </p>
                </div>
                <Check size={18} style={{ color: ACCENT }} className="shrink-0 mt-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bônus */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <span
            className="text-xs uppercase tracking-[0.3em] font-semibold"
            style={{ color: ACCENT }}
          >
            Bônus inclusos
          </span>
          <h2
            className="mt-4 text-2xl md:text-4xl font-bold text-white"
            style={{ fontFamily: "Manrope, Inter, sans-serif" }}
          >
            Você também recebe
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {bonuses.map(({ icon: Icon, title }) => (
            <div
              key={title}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-center"
            >
              <div
                className="mx-auto inline-flex h-11 w-11 items-center justify-center rounded-lg"
                style={{ backgroundColor: "rgba(56,189,248,0.1)" }}
              >
                <Icon size={22} style={{ color: ACCENT }} />
              </div>
              <p className="mt-3 text-sm font-semibold text-white leading-snug">
                {title}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Instrutor */}
      <section className="relative border-t border-white/5 bg-white/[0.015]">
        <div className="mx-auto max-w-5xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div className="relative flex justify-center">
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-40"
              style={{
                background:
                  "radial-gradient(circle, rgba(56,189,248,0.4) 0%, rgba(56,189,248,0) 70%)",
              }}
              aria-hidden
            />
            <img
              src={drAsset.url}
              alt="Dr. Francisco Amaral"
              className="relative h-[320px] md:h-[420px] w-auto object-contain"
            />
          </div>
          <div>
            <span
              className="text-xs uppercase tracking-[0.3em] font-semibold"
              style={{ color: ACCENT }}
            >
              Seu professor
            </span>
            <h2
              className="mt-3 text-2xl md:text-4xl font-bold text-white leading-tight"
              style={{ fontFamily: "Manrope, Inter, sans-serif" }}
            >
              Dr. Francisco Amaral
            </h2>
            <p className="mt-5 text-base text-white/70 leading-relaxed">
              Anestesiologista com mais de 20 anos de sala cirúrgica e milhares
              de partos acompanhados. Referência em anestesia obstétrica e
              formação de médicos que querem decidir com segurança em qualquer
              cenário.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["20+ anos de sala", "Anestesia Obstétrica", "Milhares de alunos"].map(
                (t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/80"
                  >
                    <Award size={12} style={{ color: ACCENT }} />
                    {t}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="inscricao" className="mx-auto max-w-4xl px-4 py-20 md:py-28 text-center">
        <h2
          className="text-3xl md:text-5xl font-bold text-white leading-tight"
          style={{ fontFamily: "Manrope, Inter, sans-serif" }}
        >
          Sua próxima decisão intraparto pode ser{" "}
          <span style={{ color: ACCENT }}>diferente.</span>
        </h2>
        <p className="mt-5 text-base md:text-lg text-white/70 max-w-2xl mx-auto">
          Garanta sua vaga na turma 2026 da pós-graduação em Anestesia
          Obstétrica com Dr. Francisco Amaral.
        </p>
        <a
          href={CTA_URL}
          className="mt-10 inline-flex items-center justify-center rounded-lg px-10 py-4 text-base font-semibold uppercase tracking-wider text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
          style={{
            backgroundColor: ACCENT,
            boxShadow: "0 10px 40px -10px rgba(56,189,248,0.6)",
          }}
        >
          Quero garantir minha vaga
        </a>
      </section>

      <footer className="border-t border-white/5 py-8 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Dr. Francisco Amaral · Todos os direitos reservados
      </footer>
    </main>
  );
}
