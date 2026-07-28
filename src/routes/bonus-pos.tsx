import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import bg from "@/assets/francisco-pos-safe.png.asset.json";
import qr from "@/assets/qr-bonus-pos.png.asset.json";

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
    <main className="fixed inset-0 overflow-hidden">
      {/* Image fills viewport completely, no visible borders */}
      <img
        src={bg.url}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center center" }}
      />
      {/* Countdown + QR overlaid on the left */}
      <div
        className="absolute flex flex-col items-start"
        style={{
          left: "6vw",
          top: "14vh",
          gap: "clamp(14px, 2.2vh, 28px)",
        }}
      >
        <div
          className="text-white font-bold tabular-nums leading-none tracking-tight"
          style={{ fontSize: "clamp(56px, 9vw, 150px)" }}
        >
          {mm}:{ss}
        </div>
        <img
          src={qr.url}
          alt="QR Code"
          className="block"
          style={{ width: "clamp(180px, 20vw, 320px)", height: "auto" }}
        />
      </div>
    </main>
  );
}
