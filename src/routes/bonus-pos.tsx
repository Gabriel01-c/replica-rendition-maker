import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import bg from "@/assets/francisco-pos-base.png.asset.json";

export const Route = createFileRoute("/bonus-pos")({
  head: () => ({
    meta: [
      { title: "Bônus Pós-Graduação — Dr. Francisco" },
      { name: "description", content: "Bônus exclusivo da pós-graduação em Anestesia Obstétrica." },
      { property: "og:title", content: "Bônus Pós-Graduação — Dr. Francisco" },
      { property: "og:description", content: "Bônus exclusivo da pós-graduação em Anestesia Obstétrica." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BonusPos,
});

function BonusPos() {
  const [seconds, setSeconds] = useState(30 * 60);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <main
      className="w-screen h-screen overflow-hidden bg-black bg-no-repeat bg-center bg-contain md:bg-cover"
      style={{ backgroundImage: `url(${bg.url})` }}
    >
      <div className="w-full h-full flex items-center">
        <div className="pl-[6vw] flex flex-col items-start gap-[3vh]">
          <div
            className="text-white font-bold tabular-nums leading-none tracking-tight"
            style={{ fontSize: "clamp(64px, 11vw, 180px)" }}
          >
            {mm}:{ss}
          </div>
          <div
            className="bg-white/95 flex items-center justify-center text-black/40 text-sm"
            style={{ width: "clamp(160px, 18vw, 280px)", height: "clamp(160px, 18vw, 280px)" }}
          >
            QR Code
          </div>
        </div>
      </div>
    </main>
  );
}
