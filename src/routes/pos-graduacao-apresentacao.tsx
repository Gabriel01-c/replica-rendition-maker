import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Clock,
  Monitor,
  GraduationCap,
  Calendar,
  FileText,
  Award,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import drAsset from "@/assets/dr-francisco-polemicas.png.asset.json";

export const Route = createFileRoute("/pos-graduacao-apresentacao")({
  head: () => ({
    meta: [
      { title: "Pós-Graduação em Anestesia Obstétrica — Dr. Francisco Amaral" },
      {
        name: "description",
        content:
          "A 1ª Pós-Graduação em Anestesia Obstétrica do Brasil, 100% online.",
      },
    ],
  }),
  component: Page,
});

/* ------------------------------- Tokens ------------------------------- */

const TEAL = "#7fd7e0";
const TEAL_SOFT = "rgba(127,215,224,0.55)";
const GOLD_1 = "#f4dc86";
const GOLD_2 = "#c9a34a";
const GOLD_3 = "#8a6a24";

/* ------------------------------ Countdown ----------------------------- */

function useCountdown(targetIso: string) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, new Date(targetIso).getTime() - now);
  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor((diff % 86_400_000) / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  return { d, h, m, s };
}

const pad = (n: number) => String(n).padStart(2, "0");

function CountdownBox({ value, label }: { value: string; label: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-xl px-3 py-2.5"
      style={{
        minWidth: 68,
        border: `1px solid ${TEAL_SOFT}`,
        background:
          "linear-gradient(180deg, rgba(127,215,224,0.06), rgba(0,0,0,0.35))",
        boxShadow:
          "inset 0 0 12px rgba(127,215,224,0.08), 0 0 18px rgba(127,215,224,0.10)",
      }}
    >
      <div
        className="text-white leading-none"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 500,
          fontSize: 32,
          letterSpacing: "0.02em",
        }}
      >
        {value}
      </div>
      <div
        className="mt-1 text-white/80"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 10,
          letterSpacing: "0.22em",
        }}
      >
        {label}
      </div>
    </div>
  );
}

/* -------------------------------- Selos ------------------------------- */

function GoldSeal({
  lines,
  stars = false,
  ribbon = false,
}: {
  lines: string[];
  stars?: boolean;
  ribbon?: boolean;
}) {
  return (
    <div className="relative" style={{ width: 118, height: 118 }}>
      {/* aro externo */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(from 210deg, ${GOLD_1}, ${GOLD_2}, ${GOLD_3}, ${GOLD_2}, ${GOLD_1})`,
          boxShadow:
            "0 6px 24px rgba(0,0,0,0.55), inset 0 0 0 2px rgba(255,255,255,0.15)",
        }}
      />
      {/* anel escuro */}
      <div
        className="absolute rounded-full"
        style={{
          inset: 6,
          background: "#0b0b0b",
          boxShadow: "inset 0 0 0 1px rgba(212,175,80,0.55)",
        }}
      />
      {/* miolo escuro texturizado */}
      <div
        className="absolute rounded-full flex flex-col items-center justify-center text-center"
        style={{
          inset: 10,
          background:
            "radial-gradient(circle at 50% 40%, #1c1c1c 0%, #0a0a0a 75%)",
          boxShadow:
            "inset 0 0 14px rgba(0,0,0,0.9), inset 0 0 0 1px rgba(212,175,80,0.35)",
        }}
      >
        {lines.map((l, i) => (
          <div
            key={i}
            className="text-white"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: l.length > 6 ? 11 : 13,
              letterSpacing: "0.14em",
              lineHeight: 1.15,
            }}
          >
            {l}
          </div>
        ))}
        {stars && (
          <div
            className="mt-1"
            style={{ color: GOLD_1, fontSize: 9, letterSpacing: "2px" }}
          >
            ★★★★★
          </div>
        )}
      </div>
      {ribbon && (
        <>
          <div
            className="absolute"
            style={{
              left: -6,
              bottom: -4,
              width: 22,
              height: 26,
              background: `linear-gradient(135deg, ${GOLD_2}, ${GOLD_3})`,
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 70%, 0 100%)",
            }}
          />
          <div
            className="absolute"
            style={{
              right: -6,
              bottom: -4,
              width: 22,
              height: 26,
              background: `linear-gradient(225deg, ${GOLD_2}, ${GOLD_3})`,
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 70%, 0 100%)",
            }}
          />
        </>
      )}
    </div>
  );
}

/* -------------------------------- Chip -------------------------------- */

function Chip({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; color?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex items-center gap-2.5 rounded-xl px-3 py-2.5"
      style={{
        border: `1px solid ${TEAL_SOFT}`,
        background: "rgba(127,215,224,0.04)",
        boxShadow: "inset 0 0 10px rgba(127,215,224,0.06)",
      }}
    >
      <Icon size={18} strokeWidth={1.6} color={TEAL} />
      <span
        className="text-[13px] leading-tight"
        style={{ color: TEAL, fontFamily: "'Inter', sans-serif" }}
      >
        {children}
      </span>
    </div>
  );
}

/* --------------------------------- Page ------------------------------- */

function Page() {
  // conta 7 dias a partir do primeiro carregamento (editável)
  const { d, h, m, s } = useCountdown(
    new Date(Date.now() + 7 * 86_400_000).toISOString(),
  );

  return (
    <main
      className="min-h-screen w-full text-white overflow-hidden"
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        background:
          "radial-gradient(120% 80% at 50% 0%, #0a3a44 0%, #062a33 35%, #02171d 70%, #010a0e 100%)",
      }}
    >
      <div className="relative mx-auto w-full max-w-[560px] px-5 pt-6 pb-14">
        {/* Banner topo: exclusivo */}
        <div
          className="relative flex items-center justify-center gap-3 rounded-md px-4 py-3"
          style={{
            border: `1px solid ${TEAL_SOFT}`,
            background:
              "linear-gradient(180deg, rgba(127,215,224,0.08), rgba(0,0,0,0.2))",
            boxShadow: "inset 0 0 14px rgba(127,215,224,0.08)",
          }}
        >
          <ShieldCheck size={22} color={TEAL} strokeWidth={1.6} />
          <div
            className="text-center text-[11px] leading-[1.35] text-white"
            style={{ letterSpacing: "0.18em", fontWeight: 600 }}
          >
            EXCLUSIVO PARA MÉDICOS E RESIDENTES DE
            <br />
            ANESTESIOLOGIA JÁ FORMADOS
          </div>
        </div>

        {/* Countdown */}
        <div className="mt-5 grid grid-cols-4 gap-3">
          <CountdownBox value={pad(d)} label="DIAS" />
          <CountdownBox value={pad(h)} label="HRS" />
          <CountdownBox value={pad(m)} label="MIN" />
          <CountdownBox value={pad(s)} label="SEG" />
        </div>

        {/* Bloco do médico */}
        <div className="relative mt-6" style={{ height: 460 }}>
          {/* ECG line SVG behind */}
          <svg
            aria-hidden
            viewBox="0 0 560 200"
            className="absolute left-0 right-0"
            style={{ top: 120, width: "100%", opacity: 0.55 }}
          >
            <defs>
              <linearGradient id="ecg" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor={TEAL} stopOpacity="0" />
                <stop offset="20%" stopColor={TEAL} stopOpacity="0.6" />
                <stop offset="50%" stopColor={TEAL} stopOpacity="1" />
                <stop offset="80%" stopColor={TEAL} stopOpacity="0.6" />
                <stop offset="100%" stopColor={TEAL} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 100 L120 100 L140 100 L150 60 L165 140 L180 100 L220 100 L240 100 L260 100 L280 100 L300 100 L320 100 L340 100 L360 100 L380 40 L395 160 L410 100 L560 100"
              fill="none"
              stroke="url(#ecg)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ filter: "drop-shadow(0 0 6px rgba(127,215,224,0.7))" }}
            />
          </svg>

          {/* Halo radial atrás do médico */}
          <div
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 rounded-full"
            style={{
              top: 60,
              width: 340,
              height: 340,
              background:
                "radial-gradient(circle, rgba(127,215,224,0.55) 0%, rgba(127,215,224,0.18) 35%, rgba(127,215,224,0) 70%)",
              filter: "blur(6px)",
            }}
          />

          {/* Foto do médico centralizada */}
          <img
            src={drAsset.url}
            alt="Dr. Francisco Amaral"
            className="absolute left-1/2 -translate-x-1/2 block"
            style={{
              top: 20,
              width: 340,
              height: "auto",
              objectFit: "contain",
              filter:
                "drop-shadow(0 20px 30px rgba(0,0,0,0.55)) drop-shadow(0 0 20px rgba(127,215,224,0.15))",
            }}
            draggable={false}
          />

          {/* Selo esquerdo — Acesso Vitalício */}
          <div className="absolute" style={{ left: 4, top: 235 }}>
            <GoldSeal lines={["ACESSO", "VITALÍCIO"]} stars />
          </div>

          {/* Selo direito — Reconhecido MEC */}
          <div className="absolute" style={{ right: 4, top: 235 }}>
            <GoldSeal lines={["RECONHECIDO", "PELO", "MEC"]} ribbon />
          </div>
        </div>

        {/* Pill Lançamento Oficial */}
        <div className="flex justify-center -mt-2">
          <div
            className="px-8 py-2.5 rounded-md"
            style={{
              border: `1px solid ${TEAL_SOFT}`,
              background: "rgba(127,215,224,0.04)",
              boxShadow:
                "inset 0 0 12px rgba(127,215,224,0.10), 0 0 20px rgba(127,215,224,0.12)",
            }}
          >
            <span
              className="text-white"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.28em",
              }}
            >
              LANÇAMENTO OFICIAL
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1
          className="mt-6 text-center text-white"
          style={{
            fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
            fontWeight: 500,
            fontSize: "clamp(30px, 8vw, 42px)",
            lineHeight: 1.08,
          }}
        >
          A 1ª Pós-Graduação em
          <br />
          Anestesia Obstétrica
          <br />
          do Brasil
          <br />
          <span style={{ color: TEAL, fontWeight: 600 }}>100% Online.</span>
        </h1>

        <div
          aria-hidden
          className="mx-auto mt-3 h-[2px] w-40"
          style={{
            background:
              "linear-gradient(90deg, transparent, #7fd7e0, transparent)",
          }}
        />

        {/* Descrição */}
        <p className="mt-5 text-center text-[14px] leading-[1.65] text-white/70">
          Domine as emergências, as drogas e as decisões que definem se a
          gestante sobrevive — com formação estruturada, baseada em ciência e
          acessível de qualquer lugar do Brasil.
        </p>

        {/* Chips */}
        <div className="mt-6 grid grid-cols-3 gap-2.5">
          <Chip icon={Clock}>480 horas</Chip>
          <Chip icon={Monitor}>100% Online</Chip>
          <Chip icon={GraduationCap}>12 disciplinas</Chip>
          <Chip icon={Calendar}>12 meses</Chip>
          <Chip icon={FileText}>Sem TCC</Chip>
          <Chip icon={Award}>
            Certificado
            <br />
            reconhecido
          </Chip>
        </div>

        {/* Chevron */}
        <div className="mt-8 flex justify-center">
          <ChevronDown
            size={26}
            color={TEAL}
            strokeWidth={1.6}
            className="animate-bounce"
          />
        </div>
      </div>
    </main>
  );
}
