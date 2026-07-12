import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import heroAsset from "@/assets/hero-pos-graduacao.png.asset.json";

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

// Target date for countdown — ajuste conforme necessário
const TARGET = new Date("2026-07-20T20:00:00-03:00").getTime();

function useCountdown() {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, TARGET - Date.now());
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setT({ d, h, m, s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function Page() {
  const { d, h, m, s } = useCountdown();

  return (
    <main className="min-h-screen bg-[#02141a]">
      <section className="relative mx-auto w-full max-w-[520px]">
        {/* Imagem exata do hero */}
        <img
          src={heroAsset.url}
          alt="A 1ª Pós-Graduação em Anestesia Obstétrica do Brasil"
          className="block w-full h-auto select-none"
          draggable={false}
        />

        {/* Contador dinâmico posicionado sobre a área "00 00 00 00" da imagem */}
        <div
          className="absolute left-0 right-0 flex justify-center gap-[3.2%] px-[4%]"
          style={{ top: "7.2%" }}
        >
          {[
            { v: d, l: "DIAS" },
            { v: h, l: "HRS" },
            { v: m, l: "MIN" },
            { v: s, l: "SEG" },
          ].map((it) => (
            <div
              key={it.l}
              className="flex-1 rounded-md bg-[#02141a] border border-[#0d5b6b]/60 py-[3%] flex flex-col items-center justify-center"
              style={{ aspectRatio: "1 / 0.9" }}
            >
              <span
                className="text-white font-light leading-none tabular-nums"
                style={{ fontSize: "clamp(20px, 7.2vw, 40px)" }}
              >
                {pad(it.v)}
              </span>
              <span
                className="text-[#7fd7e0] tracking-[0.2em] mt-1"
                style={{ fontSize: "clamp(8px, 2.2vw, 12px)" }}
              >
                {it.l}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
