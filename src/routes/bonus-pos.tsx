import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import bg from "@/assets/francisco-pos-safe-v2.png.asset.json";
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
    <main className="fixed inset-0 overflow-hidden bg-[#01050b]">
      {/* Image fills viewport; safe-padding around content absorbs any crop */}
      <img
        src={bg.url}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center center" }}
      />
      {/* Countdown + QR positioned over the left side of the visible content.
          Extended image is 2608x1355; original content sits centered inside.
          Overlay uses % of viewport so it stays over Francisco's left area. */}
      <div
        className="absolute flex flex-col items-start"
        style={{
          left: "clamp(16px, 12vw, 180px)",
          top: "clamp(12px, 9vh, 96px)",
          gap: "clamp(24px, 3.5vh, 56px)",
        }}
      >
        <div
          className="text-white font-semibold tabular-nums leading-none tracking-tight"
          style={{ fontSize: "clamp(32px, 4.2vw, 64px)" }}
        >
          {mm}:{ss}
        </div>
        <img
          src={qr.url}
          alt="QR Code"
          className="block"
          style={{ width: "clamp(88px, 9vw, 140px)", height: "auto", marginTop: "clamp(8px, 1.5vh, 20px)" }}
        />
      </div>
    </main>
  );
}
