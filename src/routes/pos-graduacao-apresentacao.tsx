import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import doutorAsset from "@/assets/doutor-cutout.png.asset.json";
import {
  ShieldCheck,
  Clock,
  Laptop,
  GraduationCap,
  CalendarDays,
  FileText,
  Award,
  ChevronsDown,
} from "lucide-react";

export const Route = createFileRoute("/pos-graduacao-apresentacao")({
  head: () => ({
    meta: [
      { title: "Pós-Graduação em Anestesia Obstétrica — Dr. Francisco Amaral" },
      {
        name: "description",
        content:
          "A 1ª Pós-Graduação em Anestesia Obstétrica do Brasil, 100% online. Reconhecida pelo MEC.",
      },
    ],
  }),
  component: Page,
});

const TARGET = new Date("2026-07-20T20:00:00-03:00").getTime();

function useCountdown() {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, TARGET - Date.now());
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

const pad = (n: number) => n.toString().padStart(2, "0");

function GoldBadge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-full flex items-center justify-center text-center ${className}`}
      style={{
        background:
          "radial-gradient(circle at 30% 30%, #f5d97a 0%, #c9a24c 45%, #8a6a24 100%)",
        boxShadow:
          "0 0 0 2px #3a2a10, 0 0 0 4px #c9a24c, 0 8px 24px rgba(0,0,0,0.6), inset 0 2px 6px rgba(255,255,255,0.4), inset 0 -6px 12px rgba(0,0,0,0.35)",
      }}
    >
      <div
        className="absolute inset-[6px] rounded-full flex items-center justify-center"
        style={{
          background: "radial-gradient(circle at 50% 40%, #1a1a1a 0%, #000 90%)",
          boxShadow: "inset 0 2px 6px rgba(0,0,0,0.8)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Page() {
  const { d, h, m, s } = useCountdown();

  const timeParts = [
    { v: d, l: "DIAS" },
    { v: h, l: "HRS" },
    { v: m, l: "MIN" },
    { v: s, l: "SEG" },
  ];

  const features = [
    { icon: Clock, label: "480 horas" },
    { icon: Laptop, label: "100% Online" },
    { icon: GraduationCap, label: "12 disciplinas" },
    { icon: CalendarDays, label: "12 meses" },
    { icon: FileText, label: "Sem TCC" },
    { icon: Award, label: "Certificado\nreconhecido" },
  ];

  return (
    <main
      className="min-h-screen w-full font-sans text-white overflow-hidden relative"
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        background:
          "radial-gradient(ellipse at 50% 40%, #0a3d47 0%, #05242c 40%, #02131a 100%)",
      }}
    >
      {/* Fundo com padrão de "monitores/ECG" bem sutil */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(127,215,224,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(127,215,224,.6) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto w-full max-w-[520px] px-4 pt-4 pb-8">
        {/* Banner topo */}
        <div
          className="flex items-center gap-3 rounded-lg px-3 py-3 border"
          style={{
            borderColor: "rgba(127,215,224,0.25)",
            background:
              "linear-gradient(90deg, rgba(10,61,71,0.6) 0%, rgba(5,36,44,0.6) 100%)",
          }}
        >
          <div
            className="shrink-0 w-9 h-9 rounded-md flex items-center justify-center"
            style={{
              background: "rgba(127,215,224,0.12)",
              border: "1px solid rgba(127,215,224,0.35)",
            }}
          >
            <ShieldCheck className="w-5 h-5 text-[#7fd7e0]" />
          </div>
          <p
            className="text-[11px] sm:text-[12px] font-semibold tracking-[0.14em] leading-tight text-white/95"
            style={{ letterSpacing: "0.14em" }}
          >
            EXCLUSIVO PARA <span className="text-[#7fd7e0]">MÉDICOS</span> E{" "}
            <span className="text-[#7fd7e0]">RESIDENTES</span> DE
            <br />
            ANESTESIOLOGIA JÁ FORMADOS
          </p>
        </div>

        {/* Contador */}
        <div className="mt-5 grid grid-cols-4 gap-2 sm:gap-3">
          {timeParts.map((t) => (
            <div
              key={t.l}
              className="rounded-xl py-3 flex flex-col items-center justify-center"
              style={{
                background:
                  "linear-gradient(180deg, rgba(10,61,71,0.55), rgba(2,19,26,0.55))",
                border: "1px solid rgba(127,215,224,0.25)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              <span className="text-white text-3xl sm:text-4xl font-light tabular-nums leading-none">
                {pad(t.v)}
              </span>
              <span className="mt-1 text-[10px] sm:text-[11px] tracking-[0.2em] text-[#7fd7e0]/90">
                {t.l}
              </span>
            </div>
          ))}
        </div>

        {/* Doutor + selos */}
        <div className="relative mt-6 h-[380px] sm:h-[440px] flex items-end justify-center">
          {/* halo por trás do doutor */}
          <div
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 top-6 w-[320px] h-[320px] rounded-full blur-2xl"
            style={{
              background:
                "radial-gradient(circle, rgba(127,215,224,0.35) 0%, rgba(127,215,224,0) 70%)",
            }}
          />
          {/* linha ECG estilizada */}
          <svg
            aria-hidden
            viewBox="0 0 400 60"
            className="absolute left-0 right-0 top-24 w-full opacity-40"
          >
            <path
              d="M0 30 L80 30 L100 30 L110 10 L120 50 L130 20 L140 30 L200 30 L220 30 L230 5 L240 55 L250 25 L260 30 L400 30"
              fill="none"
              stroke="#7fd7e0"
              strokeWidth="1.2"
            />
          </svg>

          <img
            src={doutorAsset.url}
            alt="Dr. Francisco Amaral"
            className="relative z-10 h-full w-auto object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
            draggable={false}
          />

          {/* Selo esquerdo — Acesso Vitalício */}
          <GoldBadge className="absolute left-1 sm:left-2 top-[45%] w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] z-20">
            <div className="text-center px-2">
              <div
                className="text-[#f5d97a] font-bold text-[13px] sm:text-[14px] leading-tight tracking-wide"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                ACESSO
                <br />
                VITALÍCIO
              </div>
              <div className="text-[#f5d97a] text-[10px] mt-1 tracking-widest">
                ★ ★ ★ ★ ★
              </div>
            </div>
          </GoldBadge>

          {/* Selo direito — MEC */}
          <GoldBadge className="absolute right-1 sm:right-2 top-[42%] w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] z-20">
            <div className="text-center">
              <div
                className="text-[#f5d97a] text-[9px] sm:text-[10px] tracking-[0.15em]"
              >
                RECONHECIDO
                <br />
                PELO
              </div>
              <div
                className="text-[#f5d97a] font-extrabold text-[24px] sm:text-[28px] leading-none mt-0.5"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                MEC
              </div>
            </div>
          </GoldBadge>
        </div>

        {/* Pill Lançamento Oficial */}
        <div className="flex justify-center -mt-2">
          <div
            className="px-8 py-2.5 rounded-full border text-[13px] tracking-[0.25em] font-semibold text-white"
            style={{
              borderColor: "rgba(127,215,224,0.6)",
              background: "rgba(127,215,224,0.05)",
              boxShadow: "0 0 20px rgba(127,215,224,0.2)",
            }}
          >
            LANÇAMENTO OFICIAL
          </div>
        </div>

        {/* Título */}
        <h1
          className="mt-6 text-center text-white leading-[1.05]"
          style={{
            fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
            fontWeight: 500,
            fontSize: "clamp(30px, 8vw, 44px)",
          }}
        >
          A 1ª Pós-Graduação em
          <br />
          Anestesia Obstétrica
          <br />
          do Brasil
          <br />
          <span className="text-[#7fd7e0] font-semibold italic">
            100% Online.
          </span>
        </h1>
        <div
          aria-hidden
          className="mx-auto mt-2 h-[2px] w-40"
          style={{
            background:
              "linear-gradient(90deg, transparent, #7fd7e0, transparent)",
          }}
        />

        {/* Descrição */}
        <p className="mt-5 text-center text-[15px] leading-[1.55] text-white/70 px-2">
          Domine as emergências, as drogas e as decisões que definem se a
          gestante sobrevive — com formação estruturada, baseada em ciência e
          acessível de qualquer lugar do Brasil.
        </p>

        {/* Features */}
        <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.label}
                className="rounded-xl px-2 py-3 flex items-center gap-2 border"
                style={{
                  borderColor: "rgba(127,215,224,0.25)",
                  background:
                    "linear-gradient(180deg, rgba(10,61,71,0.35), rgba(2,19,26,0.35))",
                }}
              >
                <Icon className="w-4 h-4 text-[#7fd7e0] shrink-0" />
                <span className="text-[11px] sm:text-[12px] text-white leading-tight whitespace-pre-line">
                  {f.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Chevron */}
        <div className="flex justify-center mt-8 animate-bounce">
          <ChevronsDown className="w-7 h-7 text-[#7fd7e0]/70" />
        </div>
      </div>
    </main>
  );
}
