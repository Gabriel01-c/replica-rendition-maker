import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShieldCheck, Clock, Monitor, GraduationCap, Calendar, FileText, Award, ChevronsDown } from "lucide-react";
import drFrancisco from "@/assets/dr-francisco-verde-transparent.png";

export const Route = createFileRoute("/pos-graduacao")({
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
        content:
          "A 1ª Pós-Graduação em Anestesia Obstétrica do Brasil 100% Online.",
      },
    ],
  }),
  component: PosGraduacaoPage,
});

const NAVY = "#0a1929";
const NAVY_DEEP = "#061424";
const TEAL = "#5eead4";
const TEAL_SOFT = "#4dd4c4";
const GOLD = "#c9a84c";

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hrs = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const min = Math.floor((diff / (1000 * 60)) % 60);
  const seg = Math.floor((diff / 1000) % 60);
  return { dias, hrs, min, seg };
}

const pad = (n: number) => String(n).padStart(2, "0");

function PosGraduacaoPage() {
  // Target: static 00 look — set to now so it stays at 00s until real date is provided
  const target = new Date();
  const { dias, hrs, min, seg } = useCountdown(target);

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
      className="relative min-h-screen w-full overflow-x-hidden"
      style={{
        background: `radial-gradient(ellipse at top, ${NAVY} 0%, ${NAVY_DEEP} 70%)`,
      }}
    >
      {/* Faint surgical-room ECG background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, ${TEAL} 0%, transparent 40%),
            radial-gradient(circle at 80% 40%, ${TEAL} 0%, transparent 40%)
          `,
        }}
      />

      {/* Subtle cardiac monitor screens — heartbeat lines */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.18]"
        viewBox="0 0 400 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="monitor-grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 L 0 30" fill="none" stroke={TEAL} strokeWidth="0.4" strokeOpacity="0.22" />
          </pattern>
        </defs>

        {/* Monitor screen 1 — top left */}
        <g transform="translate(20, 60)">
          <rect width="120" height="70" rx="6" fill="rgba(6,20,36,0.55)" stroke={TEAL} strokeOpacity="0.25" strokeWidth="1" />
          <rect x="4" y="4" width="112" height="62" fill="url(#monitor-grid)" />
          <polyline
            fill="none"
            stroke={TEAL}
            strokeWidth="1.4"
            strokeOpacity="0.55"
            strokeLinecap="round"
            strokeLinejoin="round"
            points="10,35 25,35 30,28 35,45 40,20 45,38 50,35 70,35 75,28 80,45 85,20 90,38 95,35 110,35"
          />
        </g>

        {/* Monitor screen 2 — top right */}
        <g transform="translate(260, 100)">
          <rect width="120" height="70" rx="6" fill="rgba(6,20,36,0.55)" stroke={TEAL} strokeOpacity="0.25" strokeWidth="1" />
          <rect x="4" y="4" width="112" height="62" fill="url(#monitor-grid)" />
          <polyline
            fill="none"
            stroke={TEAL}
            strokeWidth="1.4"
            strokeOpacity="0.55"
            strokeLinecap="round"
            strokeLinejoin="round"
            points="10,35 22,35 28,30 33,42 38,24 43,36 48,35 68,35 73,30 78,42 83,24 88,36 93,35 110,35"
          />
        </g>

        {/* Monitor screen 3 — mid left */}
        <g transform="translate(10, 320)">
          <rect width="110" height="65" rx="6" fill="rgba(6,20,36,0.55)" stroke={TEAL} strokeOpacity="0.22" strokeWidth="1" />
          <rect x="4" y="4" width="102" height="57" fill="url(#monitor-grid)" />
          <polyline
            fill="none"
            stroke={TEAL}
            strokeWidth="1.2"
            strokeOpacity="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points="8,32 20,32 26,26 31,40 36,22 41,34 46,32 64,32 69,26 74,40 79,22 84,34 89,32 105,32"
          />
        </g>

        {/* Monitor screen 4 — mid right */}
        <g transform="translate(270, 360)">
          <rect width="110" height="65" rx="6" fill="rgba(6,20,36,0.55)" stroke={TEAL} strokeOpacity="0.22" strokeWidth="1" />
          <rect x="4" y="4" width="102" height="57" fill="url(#monitor-grid)" />
          <polyline
            fill="none"
            stroke={TEAL}
            strokeWidth="1.2"
            strokeOpacity="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points="8,32 20,32 26,26 31,40 36,22 41,34 46,32 64,32 69,26 74,40 79,22 84,34 89,32 105,32"
          />
        </g>

        {/* Monitor screen 5 — lower left */}
        <g transform="translate(30, 580)">
          <rect width="115" height="68" rx="6" fill="rgba(6,20,36,0.55)" stroke={TEAL} strokeOpacity="0.2" strokeWidth="1" />
          <rect x="4" y="4" width="107" height="60" fill="url(#monitor-grid)" />
          <polyline
            fill="none"
            stroke={TEAL}
            strokeWidth="1.3"
            strokeOpacity="0.48"
            strokeLinecap="round"
            strokeLinejoin="round"
            points="9,34 22,34 28,28 33,42 38,22 43,36 48,34 68,34 73,28 78,42 83,22 88,36 93,34 108,34"
          />
        </g>

        {/* Monitor screen 6 — lower right */}
        <g transform="translate(255, 620)">
          <rect width="115" height="68" rx="6" fill="rgba(6,20,36,0.55)" stroke={TEAL} strokeOpacity="0.2" strokeWidth="1" />
          <rect x="4" y="4" width="107" height="60" fill="url(#monitor-grid)" />
          <polyline
            fill="none"
            stroke={TEAL}
            strokeWidth="1.3"
            strokeOpacity="0.48"
            strokeLinecap="round"
            strokeLinejoin="round"
            points="9,34 22,34 28,28 33,42 38,22 43,36 48,34 68,34 73,28 78,42 83,22 88,36 93,34 108,34"
          />
        </g>
      </svg>

      {/* Top badge */}
      <div
        className="relative z-10 flex items-center justify-center gap-3 border-b border-white/10 px-5 py-4"
        style={{
          background: `linear-gradient(180deg, rgba(94,234,212,0.06), transparent)`,
          backgroundImage: `radial-gradient(circle at 50% 0%, rgba(94,234,212,0.15) 1px, transparent 1px)`,
          backgroundSize: "8px 8px",
        }}
      >
        <ShieldCheck className="h-6 w-6 shrink-0" style={{ color: TEAL }} />
        <p className="text-center text-[11px] font-semibold uppercase leading-tight tracking-[0.12em] text-white sm:text-sm">
          Exclusivo para médicos e residentes de
          <br />
          anestesiologia já formados
        </p>
      </div>

      <div className="relative z-10 mx-auto flex max-w-md flex-col items-center px-5 pb-10 pt-8">
        {/* Countdown */}
        <div className="grid w-full grid-cols-4 gap-2">
          {[
            { v: dias, l: "DIAS" },
            { v: hrs, l: "HRS" },
            { v: min, l: "MIN" },
            { v: seg, l: "SEG" },
          ].map((b) => (
            <div
              key={b.l}
              className="flex flex-col items-center rounded-lg border py-3"
              style={{ borderColor: "rgba(94,234,212,0.25)", background: "rgba(255,255,255,0.02)" }}
            >
              <span className="text-3xl font-light text-white sm:text-4xl">{pad(b.v)}</span>
              <span className="mt-1 text-[10px] tracking-[0.2em] text-white/60">{b.l}</span>
            </div>
          ))}
        </div>

        {/* Dr. Francisco with glow + seals */}
        <div className="relative mt-8 w-full">
          {/* radial glow */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[110%] w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{ background: `radial-gradient(circle, ${TEAL}55 0%, transparent 60%)` }}
          />

          <img
            src={drFrancisco}
            alt="Dr. Francisco Amaral"
            className="relative z-10 mx-auto block h-auto w-[85%] select-none"
            draggable={false}
          />

          {/* ACESSO VITALÍCIO seal */}
          <div
            className="absolute left-0 top-[38%] z-20 flex h-24 w-24 flex-col items-center justify-center rounded-full text-center text-[9px] font-black uppercase leading-tight tracking-widest text-white shadow-xl sm:h-28 sm:w-28"
            style={{
              background: `radial-gradient(circle at 30% 30%, #1a1a1a, #000)`,
              border: `2px solid ${GOLD}`,
              boxShadow: `0 0 0 3px rgba(0,0,0,0.6), 0 8px 30px rgba(0,0,0,0.5)`,
            }}
          >
            <span style={{ color: GOLD }}>ACESSO</span>
            <span style={{ color: GOLD }}>VITALÍCIO</span>
            <span className="mt-1 text-[8px]" style={{ color: GOLD }}>★★★★★</span>
          </div>

          {/* MEC seal */}
          <div
            className="absolute right-0 top-[38%] z-20 flex h-24 w-24 flex-col items-center justify-center rounded-full text-center text-[9px] font-black uppercase leading-tight tracking-widest text-white shadow-xl sm:h-28 sm:w-28"
            style={{
              background: `radial-gradient(circle at 30% 30%, #1a1a1a, #000)`,
              border: `2px solid ${GOLD}`,
              boxShadow: `0 0 0 3px rgba(0,0,0,0.6), 0 8px 30px rgba(0,0,0,0.5)`,
            }}
          >
            <span style={{ color: GOLD }}>RECONHECIDO</span>
            <span style={{ color: GOLD }}>PELO</span>
            <span className="mt-0.5 text-xl font-black" style={{ color: GOLD }}>MEC</span>
          </div>
        </div>

        {/* LANÇAMENTO OFICIAL pill */}
        <div
          className="mt-2 rounded-full border px-6 py-2 text-xs font-bold tracking-[0.3em]"
          style={{ borderColor: TEAL, color: TEAL }}
        >
          LANÇAMENTO OFICIAL
        </div>

        {/* Headline */}
        <h1 className="mt-6 text-center font-serif text-4xl leading-tight text-white sm:text-5xl">
          A 1ª Pós-Graduação em Anestesia Obstétrica do Brasil{" "}
          <span style={{ color: TEAL_SOFT }}>100% Online.</span>
        </h1>

        {/* Decorative underline */}
        <div
          className="mt-3 h-[2px] w-40 rounded-full"
          style={{ background: `linear-gradient(90deg, transparent, ${TEAL}, transparent)` }}
        />

        {/* Subheadline */}
        <p className="mt-6 text-center text-[15px] leading-relaxed text-white/70">
          Domine as emergências, as drogas e as decisões que definem se a
          gestante sobrevive — com formação estruturada, baseada em ciência e
          acessível de qualquer lugar do Brasil.
        </p>

        {/* Info cards */}
        <div className="mt-8 grid w-full grid-cols-3 gap-2.5">
          {infoCards.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-xl border px-3 py-3"
              style={{
                borderColor: "rgba(94,234,212,0.3)",
                background: "rgba(94,234,212,0.04)",
              }}
            >
              <Icon className="h-5 w-5 shrink-0" style={{ color: TEAL }} />
              <span className="whitespace-pre-line text-[12px] font-medium leading-tight" style={{ color: TEAL }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Chevron */}
        <ChevronsDown className="mt-10 h-8 w-8 animate-bounce" style={{ color: TEAL }} />
      </div>
    </div>
  );
}
