import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShieldCheck, Clock, Laptop, GraduationCap, Calendar, FileText, Award, ChevronDown } from "lucide-react";
import drFranciscoVerde from "@/assets/dr-francisco-verde.png.asset.json";

export const Route = createFileRoute("/pos-graduacao-apresentacao")({
  head: () => ({
    meta: [
      { title: "Pós-Graduação em Anestesia Obstétrica — Dr. Francisco Amaral" },
      { name: "description", content: "A 1ª Pós-Graduação em Anestesia Obstétrica do Brasil, 100% online. Reconhecida pelo MEC." },
      { property: "og:title", content: "Pós-Graduação em Anestesia Obstétrica — Dr. Francisco Amaral" },
      { property: "og:description", content: "A 1ª Pós-Graduação em Anestesia Obstétrica do Brasil, 100% online. Reconhecida pelo MEC." },
    ],
  }),
  component: PosGraduacaoApresentacao,
});

function pad(n: number) {
  return String(Math.max(0, Math.floor(n))).padStart(2, "0");
}

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  const days = diff / 86400000;
  const hrs = (diff % 86400000) / 3600000;
  const min = (diff % 3600000) / 60000;
  const sec = (diff % 60000) / 1000;
  return { days: pad(days), hrs: pad(hrs), min: pad(min), sec: pad(sec) };
}

function AnhangueraLogo() {
  return (
    <div className="flex flex-col items-center gap-1 select-none">
      <svg viewBox="0 0 60 54" className="h-11 w-12" aria-hidden="true">
        <path d="M30 2 L58 52 L44 52 L30 26 L16 52 L2 52 Z" fill="#EF6C1A" />
        <path d="M30 26 L38 42 L22 42 Z" fill="#0b2438" />
      </svg>
      <span
        className="text-white text-[22px] leading-none tracking-wide"
        style={{ fontFamily: "'Trebuchet MS', 'Segoe UI', sans-serif", fontWeight: 500 }}
      >
        Anhanguera
      </span>
    </div>
  );
}

function GoldBadge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div
        className="grid place-items-center rounded-full text-center"
        style={{
          width: 116,
          height: 116,
          background:
            "radial-gradient(circle at 30% 25%, #f8e29a 0%, #d4a44a 35%, #8a6320 75%, #4b3510 100%)",
          boxShadow:
            "0 10px 25px rgba(0,0,0,0.55), inset 0 0 0 2px rgba(255,255,255,0.15), inset 0 0 0 5px rgba(0,0,0,0.35), inset 0 0 0 6px rgba(212,164,74,0.9)",
        }}
      >
        <div
          className="grid place-items-center rounded-full"
          style={{
            width: 92,
            height: 92,
            background: "radial-gradient(circle at 50% 40%, #14202b 0%, #0a1420 100%)",
            boxShadow: "inset 0 0 0 1px rgba(212,164,74,0.6)",
          }}
        >
          <div className="px-2 text-center">{children}</div>
        </div>
      </div>
    </div>
  );
}

function TimeBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="grid place-items-center rounded-2xl border border-cyan-400/40 bg-[#0a1a26]/70 backdrop-blur-sm"
        style={{
          width: 78,
          height: 74,
          boxShadow: "inset 0 0 20px rgba(34,211,238,0.08), 0 4px 20px rgba(0,0,0,0.4)",
        }}
      >
        <span
          className="text-white text-[38px] leading-none font-light"
          style={{ fontFamily: "'Inter', system-ui, sans-serif", fontVariantNumeric: "tabular-nums" }}
        >
          {value}
        </span>
      </div>
      <span className="mt-2 text-[11px] tracking-[0.25em] text-cyan-200/80 font-medium">{label}</span>
    </div>
  );
}

function FeatureChip({ icon: Icon, children }: { icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <div
      className="flex items-center gap-3 rounded-2xl border border-cyan-400/30 bg-[#0a1a26]/60 px-4 py-3 backdrop-blur-sm"
      style={{ boxShadow: "inset 0 0 20px rgba(34,211,238,0.06)" }}
    >
      <Icon className="h-5 w-5 shrink-0 text-cyan-300" />
      <span className="text-cyan-100 text-[15px] leading-tight">{children}</span>
    </div>
  );
}

function PosGraduacaoApresentacao() {
  // Countdown target: 7 days from load
  const [target] = useState(() => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
  const t = useCountdown(target);

  return (
    <main
      className="min-h-screen w-full overflow-hidden text-white"
      style={{
        background:
          "radial-gradient(ellipse at 50% 30%, #0e3549 0%, #072030 45%, #041521 100%)",
      }}
    >
      {/* Heartbeat/monitor backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[720px] opacity-[0.09] mix-blend-screen"
        style={{
          backgroundImage:
            "linear-gradient(transparent 96%, rgba(34,211,238,0.6) 96%), linear-gradient(90deg, transparent 96%, rgba(34,211,238,0.6) 96%)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse at 50% 30%, #000 40%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 30%, #000 40%, transparent 75%)",
        }}
      />

      <section className="relative mx-auto flex max-w-[520px] flex-col items-center px-5 pt-6 pb-10">
        {/* Top banner */}
        <div className="flex w-full items-center justify-center gap-3 border-y border-cyan-400/25 py-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-cyan-400/40 bg-cyan-400/10">
            <ShieldCheck className="h-5 w-5 text-cyan-300" />
          </div>
          <p className="text-center text-[13px] font-semibold uppercase leading-tight tracking-[0.12em] text-white">
            <span className="text-cyan-300">Exclusivo</span> para{" "}
            <span className="text-cyan-300">médicos</span> e{" "}
            <span className="text-cyan-300">residentes</span> de
            <br />
            anestesiologia já formados
          </p>
        </div>

        {/* Countdown */}
        <div className="mt-8 grid grid-cols-4 gap-3">
          <TimeBox value={t.days} label="DIAS" />
          <TimeBox value={t.hrs} label="HRS" />
          <TimeBox value={t.min} label="MIN" />
          <TimeBox value={t.sec} label="SEG" />
        </div>

        {/* Doctor + badges */}
        <div className="relative mt-6 w-full">
          <div className="relative mx-auto w-full max-w-[440px]">
            {/* Glow behind photo */}
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 -z-0 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(34,211,238,0.35) 0%, transparent 60%)" }}
            />
            <img
              src={drFranciscoVerde.url}
              alt="Dr. Francisco Amaral"
              className="relative z-10 mx-auto block h-auto w-full object-contain"
              draggable={false}
            />

            {/* Left badge */}
            <GoldBadge className="absolute left-0 top-[46%] z-20 -translate-y-1/2">
              <div className="flex flex-col items-center leading-tight">
                <span className="text-[11px] tracking-[0.18em] text-[#d4a44a] font-semibold">ACESSO</span>
                <span className="text-[15px] tracking-[0.12em] text-white font-bold mt-0.5">VITALÍCIO</span>
                <div className="mt-1 flex gap-[2px] text-[#d4a44a] text-[10px]">
                  {"★★★★★".split("").map((s, i) => (
                    <span key={i}>{s}</span>
                  ))}
                </div>
              </div>
            </GoldBadge>

            {/* Right badge */}
            <GoldBadge className="absolute right-0 top-[46%] z-20 -translate-y-1/2">
              <div className="flex flex-col items-center leading-tight">
                <span className="text-[10px] tracking-[0.18em] text-white font-semibold">RECONHECIDO</span>
                <span className="text-[10px] tracking-[0.18em] text-white font-semibold">PELO</span>
                <span className="text-[22px] tracking-[0.08em] text-white font-black mt-0.5">MEC</span>
              </div>
            </GoldBadge>

            {/* Anhanguera logo overlay */}
            <div className="absolute left-1/2 bottom-[6%] z-20 -translate-x-1/2">
              <AnhangueraLogo />
            </div>
          </div>
        </div>

        {/* Lançamento oficial pill */}
        <div className="mt-6 rounded-xl border border-cyan-400/50 px-8 py-3">
          <span className="text-[15px] font-semibold tracking-[0.22em] text-cyan-200">
            LANÇAMENTO OFICIAL
          </span>
        </div>

        {/* Title */}
        <h1
          className="mt-6 text-center text-white"
          style={{
            fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
            fontWeight: 500,
            fontSize: "40px",
            lineHeight: 1.08,
            letterSpacing: "-0.01em",
          }}
        >
          A 1ª Pós-Graduação em<br />
          Anestesia Obstétrica<br />
          do Brasil
          <div
            className="mt-1 inline-block relative"
            style={{ color: "#4bd4d4" }}
          >
            100% Online.
            <span
              aria-hidden
              className="absolute left-1/2 -bottom-1 h-[2px] w-[85%] -translate-x-1/2 rounded-full"
              style={{ background: "linear-gradient(90deg, transparent, #4bd4d4, transparent)" }}
            />
          </div>
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-[440px] text-center text-[16px] leading-[1.55] text-slate-300/90">
          Domine as emergências, as drogas e as decisões que definem se a gestante sobrevive — com formação estruturada, baseada em ciência e acessível de qualquer lugar do Brasil.
        </p>

        {/* Feature grid */}
        <div className="mt-8 grid w-full grid-cols-3 gap-3">
          <FeatureChip icon={Clock}>480 horas</FeatureChip>
          <FeatureChip icon={Laptop}>100% Online</FeatureChip>
          <FeatureChip icon={GraduationCap}>12 disciplinas</FeatureChip>
          <FeatureChip icon={Calendar}>12 meses</FeatureChip>
          <FeatureChip icon={FileText}>Sem TCC</FeatureChip>
          <FeatureChip icon={Award}>
            Certificado<br />reconhecido
          </FeatureChip>
        </div>

        {/* Scroll indicator */}
        <ChevronDown className="mt-10 h-8 w-8 animate-bounce text-cyan-300/70" />
      </section>
    </main>
  );
}
