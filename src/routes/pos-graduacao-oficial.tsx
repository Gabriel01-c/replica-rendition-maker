import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShieldCheck, Clock, Monitor, GraduationCap, Calendar, FileText, Award } from "lucide-react";
import heroImg from "@/assets/dr-francisco-hero-oficial.png.asset.json";

export const Route = createFileRoute("/pos-graduacao-oficial")({
  head: () => ({
    meta: [
      { title: "Pós-Graduação em Anestesia Obstétrica — Dr. Francisco Amaral" },
      {
        name: "description",
        content:
          "A 1ª Pós-Graduação em Anestesia Obstétrica do Brasil 100% Online. 480 horas, 12 disciplinas, certificado reconhecido pelo MEC.",
      },
      { property: "og:title", content: "Pós-Graduação em Anestesia Obstétrica" },
      {
        property: "og:description",
        content: "A 1ª Pós-Graduação em Anestesia Obstétrica do Brasil 100% Online.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@700&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: PosGraduacaoOficialPage,
});

const TEAL = "#5eead4";
const TEAL_SOFT = "#7fe9db";
const GOLD = "#c9a84c";

const FONT_HEAD = "'Manrope', system-ui, sans-serif";
const FONT_BODY = "'Inter', system-ui, sans-serif";

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  return {
    dias: Math.floor(diff / 86400000),
    hrs: Math.floor((diff / 3600000) % 24),
    min: Math.floor((diff / 60000) % 60),
    seg: Math.floor((diff / 1000) % 60),
  };
}
const pad = (n: number) => String(n).padStart(2, "0");

function PosGraduacaoOficialPage() {
  const { dias, hrs, min, seg } = useCountdown(new Date());

  const infoCards = [
    { icon: Clock, label: "480 horas" },
    { icon: Monitor, label: "100% Online" },
    { icon: GraduationCap, label: "12 disciplinas" },
    { icon: Calendar, label: "12 meses" },
    { icon: FileText, label: "Sem TCC" },
    { icon: Award, label: "Certificado\nreconhecido" },
  ];

  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden text-white"
      style={{
        background: "linear-gradient(180deg,#04121e 0%,#061a2b 50%,#04121e 100%)",
        fontFamily: FONT_BODY,
      }}
    >
      {/* Faixa superior */}
      <div
        className="relative z-20 flex items-center justify-center gap-3 border-b border-white/10 px-5 py-3"
        style={{ background: "rgba(4,18,30,0.85)" }}
      >
        <ShieldCheck className="h-5 w-5 shrink-0" style={{ color: TEAL }} />
        <p
          className="text-center text-[11px] font-semibold uppercase leading-tight tracking-[0.14em]"
          style={{ fontFamily: FONT_BODY }}
        >
          Exclusivo para médicos e residentes de anestesiologia já formados
        </p>
      </div>

      {/* Contador */}
      <div className="relative z-20 mx-auto grid w-full max-w-md grid-cols-4 gap-2 px-5 pt-5">
        {[
          { v: dias, l: "DIAS" },
          { v: hrs, l: "HRS" },
          { v: min, l: "MIN" },
          { v: seg, l: "SEG" },
        ].map((b) => (
          <div
            key={b.l}
            className="flex flex-col items-center rounded-lg border py-3"
            style={{
              borderColor: "rgba(94,234,212,0.25)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <span
              className="text-3xl font-light leading-none"
              style={{ fontFamily: FONT_BODY, fontWeight: 300 }}
            >
              {pad(b.v)}
            </span>
            <span
              className="mt-1.5 text-[10px] tracking-[0.2em] text-white/60"
              style={{ fontFamily: FONT_BODY, fontWeight: 500 }}
            >
              {b.l}
            </span>
          </div>
        ))}
      </div>

      {/* HERO: imagem enviada como base */}
      <section className="relative mx-auto w-full max-w-md">
        <div className="relative w-full">
          <img
            src={heroImg.url}
            alt="Dr. Francisco Amaral"
            className="block h-auto w-full select-none"
            draggable={false}
          />
          {/* Overlay sutil para legibilidade dos elementos no topo/base */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(4,18,30,0.55) 0%, rgba(4,18,30,0) 18%, rgba(4,18,30,0) 55%, rgba(4,18,30,0.85) 100%)",
            }}
          />

          {/* Selos sobre a imagem */}
          <div className="pointer-events-none absolute inset-x-0 top-[34%] flex items-start justify-between px-3">
            {/* Selo Acesso Vitalício */}
            <div
              className="flex h-20 w-20 flex-col items-center justify-center rounded-full text-center text-[8px] font-black uppercase leading-tight tracking-widest shadow-xl sm:h-24 sm:w-24 sm:text-[9px]"
              style={{
                fontFamily: FONT_BODY,
                background: "radial-gradient(circle at 30% 30%, #1a1a1a, #000)",
                border: `2px solid ${GOLD}`,
                boxShadow: "0 0 0 3px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.5)",
                color: GOLD,
              }}
            >
              <span>ACESSO</span>
              <span>VITALÍCIO</span>
              <span className="mt-1 text-[8px]">★★★★★</span>
            </div>

            {/* Logo Anhanguera (centro) */}
            <div
              className="mt-2 flex h-14 flex-col items-center justify-center rounded-md px-3 py-1.5 shadow-lg"
              style={{
                background: "rgba(255,255,255,0.95)",
                border: "1px solid rgba(255,255,255,0.6)",
                fontFamily: FONT_HEAD,
              }}
            >
              <span
                className="text-[9px] font-semibold uppercase leading-none tracking-[0.15em]"
                style={{ color: "#7a1414", fontFamily: FONT_BODY, fontWeight: 600 }}
              >
                Faculdade
              </span>
              <span
                className="mt-0.5 text-lg font-extrabold leading-none tracking-tight"
                style={{ color: "#c8102e", fontFamily: FONT_HEAD, fontWeight: 700 }}
              >
                Anhanguera
              </span>
            </div>

            {/* Selo MEC */}
            <div
              className="flex h-20 w-20 flex-col items-center justify-center rounded-full text-center text-[8px] font-black uppercase leading-tight tracking-widest shadow-xl sm:h-24 sm:w-24 sm:text-[9px]"
              style={{
                fontFamily: FONT_BODY,
                background: "radial-gradient(circle at 30% 30%, #1a1a1a, #000)",
                border: `2px solid ${GOLD}`,
                boxShadow: "0 0 0 3px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.5)",
                color: GOLD,
              }}
            >
              <span>RECONHECIDO</span>
              <span>PELO</span>
              <span className="mt-0.5 text-lg font-black leading-none">MEC</span>
            </div>
          </div>
        </div>

        {/* Conteúdo abaixo da imagem, integrado ao hero */}
        <div
          className="relative -mt-16 flex flex-col items-center px-5 pb-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(4,18,30,0) 0%, rgba(4,18,30,0.9) 25%, #04121e 60%)",
          }}
        >
          {/* Lançamento oficial */}
          <div
            className="rounded-full border px-6 py-2 text-[11px] tracking-[0.3em]"
            style={{
              borderColor: TEAL,
              color: TEAL,
              fontFamily: FONT_BODY,
              fontWeight: 600,
            }}
          >
            LANÇAMENTO OFICIAL
          </div>

          {/* Headline */}
          <h1
            className="mt-6 text-center text-[28px] leading-[1.15] sm:text-[32px]"
            style={{ fontFamily: FONT_HEAD, fontWeight: 700 }}
          >
            A 1ª Pós-Graduação em Anestesia Obstétrica do Brasil{" "}
            <span style={{ color: TEAL_SOFT }}>100% Online</span>
          </h1>

          <div
            className="mt-4 h-[2px] w-32 rounded-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${TEAL}, transparent)`,
            }}
          />

          {/* Subheadline */}
          <p
            className="mt-5 text-center text-[15px] leading-relaxed text-white/75"
            style={{ fontFamily: FONT_BODY, fontWeight: 400 }}
          >
            Domine as emergências, as drogas e as decisões que definem se a
            gestante sobrevive — com formação estruturada, baseada em ciência
            e acessível de qualquer lugar do Brasil.
          </p>

          {/* Cards */}
          <div className="mt-8 grid w-full grid-cols-3 gap-2.5">
            {infoCards.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-xl border px-2.5 py-3"
                style={{
                  borderColor: "rgba(94,234,212,0.3)",
                  background: "rgba(94,234,212,0.05)",
                }}
              >
                <Icon className="h-5 w-5 shrink-0" style={{ color: TEAL }} />
                <span
                  className="whitespace-pre-line text-[11.5px] leading-tight"
                  style={{ color: TEAL, fontFamily: FONT_BODY, fontWeight: 500 }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
