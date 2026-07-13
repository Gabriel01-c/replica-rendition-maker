import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import drFrancisco from "@/assets/dr-francisco-foto45.jpg.asset.json";

export const Route = createFileRoute("/pos-anestesia-obstetrica")({
  head: () => ({
    meta: [
      { title: "Pós-Graduação em Anestesia Obstétrica | Dr. Francisco Amaral" },
      {
        name: "description",
        content:
          "A 1ª Pós-Graduação em Anestesia Obstétrica do Brasil, 100% online. Domine emergências, drogas e decisões críticas na gestante.",
      },
      { property: "og:title", content: "Pós-Graduação em Anestesia Obstétrica" },
      {
        property: "og:description",
        content:
          "Formação estruturada, baseada em ciência e acessível de qualquer lugar do Brasil.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: PosAnestesiaObstetrica,
});

// ---------- Countdown ----------
function useCountdown(targetMs: number) {
  const [now, setNow] = useState<number>(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const diff = Math.max(0, targetMs - now);
  const s = Math.floor(diff / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

const pad = (n: number) => n.toString().padStart(2, "0");

function CountdownBlock({ value, label }: { value: number; label: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 backdrop-blur-sm"
      style={{ minWidth: 62 }}
    >
      <span
        className="text-2xl leading-none tracking-tight text-white tabular-nums"
        style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
      >
        {pad(value)}
      </span>
      <span
        className="mt-1 text-[10px] uppercase tracking-[0.14em] text-white/60"
        style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
      >
        {label}
      </span>
    </div>
  );
}

// ---------- Component ----------
function PosAnestesiaObstetrica() {
  // 7 days out — replace with real target when known.
  const target = useState(() => Date.now() + 7 * 24 * 60 * 60 * 1000)[0];
  const { days, hours, minutes, seconds } = useCountdown(target);

  const cards = [
    { label: "480 horas" },
    { label: "100% Online" },
    { label: "12 disciplinas" },
    { label: "12 meses" },
    { label: "Sem TCC" },
    { label: "Certificado reconhecido" },
  ];

  const inter = { fontFamily: "Inter, sans-serif" };
  const cormorant = { fontFamily: '"Cormorant Garamond", serif' };

  return (
    <main
      className="relative min-h-screen w-full overflow-hidden text-white"
      style={{
        background:
          "radial-gradient(120% 60% at 50% 0%, #0f3a44 0%, #0a2730 45%, #061a22 75%, #04121a 100%)",
      }}
    >
      {/* Ambient center-cirúrgico glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px]"
        style={{
          background:
            "radial-gradient(60% 40% at 50% 22%, rgba(64,180,180,0.18) 0%, rgba(64,180,180,0) 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
          opacity: 0.35,
          mixBlendMode: "overlay",
        }}
      />

      {/* Top ribbon */}
      <div className="relative z-10 border-b border-white/5 bg-black/25">
        <p
          className="mx-auto max-w-md px-4 py-2.5 text-center text-[10.5px] uppercase leading-tight tracking-[0.18em] text-white/85"
          style={{ ...inter, fontWeight: 600 }}
        >
          Exclusivo para médicos e residentes de anestesiologia já formados
        </p>
      </div>

      {/* Countdown */}
      <div className="relative z-10 mx-auto flex max-w-md items-center justify-center gap-2 px-4 pt-5">
        <CountdownBlock value={days} label="Dias" />
        <CountdownBlock value={hours} label="Hrs" />
        <CountdownBlock value={minutes} label="Min" />
        <CountdownBlock value={seconds} label="Seg" />
      </div>

      {/* Visual area: doctor + halo + heartbeat */}
      <div className="relative z-10 mx-auto mt-6 w-full max-w-md">
        <div className="relative h-[360px] w-full">
          {/* Halo behind doctor */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(80,210,205,0.28) 0%, rgba(80,210,205,0.08) 40%, rgba(80,210,205,0) 70%)",
              filter: "blur(6px)",
            }}
          />

          {/* Heartbeat line — subtle SVG */}
          <svg
            aria-hidden
            viewBox="0 0 400 80"
            className="absolute left-0 right-0 top-1/2 w-full -translate-y-1/2 opacity-[0.18]"
            preserveAspectRatio="none"
            style={{ height: 80 }}
          >
            <path
              d="M0 40 L80 40 L100 40 L110 20 L125 60 L140 10 L155 55 L170 40 L230 40 L245 25 L258 55 L272 40 L400 40"
              fill="none"
              stroke="rgb(120, 220, 210)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Doctor photo */}
          <img
            src={drFrancisco.url}
            alt="Dr. Francisco Amaral"
            className="absolute bottom-0 left-1/2 h-full -translate-x-1/2 object-contain object-bottom"
            style={{
              maxWidth: "92%",
              filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.55))",
            }}
          />

          {/* Bottom fade — soft transition into text */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
            style={{
              background:
                "linear-gradient(to bottom, rgba(6,26,34,0) 0%, rgba(6,26,34,0.75) 60%, rgba(4,18,26,1) 100%)",
            }}
          />
        </div>
      </div>

      {/* Textual block */}
      <section className="relative z-10 mx-auto max-w-md px-6 pb-10 -mt-4 text-center">
        <h1
          className="text-[34px] leading-[1.08] tracking-tight text-white"
          style={{ ...cormorant, fontWeight: 600 }}
        >
          A 1ª Pós-Graduação em
          <br />
          Anestesia Obstétrica
          <br />
          do Brasil
        </h1>

        <p
          className="mt-3 text-[26px] leading-none"
          style={{
            ...cormorant,
            fontWeight: 600,
            color: "#4FD1C5",
          }}
        >
          100% Online
        </p>

        <div
          aria-hidden
          className="mx-auto mt-5 h-px w-16"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(79,209,197,0.6), transparent)",
          }}
        />

        <p
          className="mx-auto mt-5 max-w-[340px] text-[14.5px] leading-relaxed text-white/75"
          style={{ ...inter, fontWeight: 400 }}
        >
          Domine as emergências, as drogas e as decisões que definem se a
          gestante sobrevive — com formação estruturada, baseada em ciência e
          acessível de qualquer lugar do Brasil.
        </p>

        {/* Info cards */}
        <div className="mt-8 grid grid-cols-2 gap-3">
          {cards.map((c) => (
            <div
              key={c.label}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-4 text-center backdrop-blur-[2px] transition-colors"
              style={{
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.04), 0 4px 18px rgba(0,0,0,0.35)",
              }}
            >
              <span
                className="block text-[13px] tracking-wide text-white"
                style={{ ...inter, fontWeight: 600 }}
              >
                {c.label}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
