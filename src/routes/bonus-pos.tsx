import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import bg from "@/assets/francisco-pos-print.png.asset.json";
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

// Image intrinsic aspect ratio (from reference print)
const IMG_W = 1600;
const IMG_H = 900;

function BonusPos() {
  const [seconds, setSeconds] = useState(30 * 60);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <main className="fixed inset-0 overflow-hidden bg-[#01050b] grid place-items-center">
      {/* Stage matches image aspect ratio; scales to fit viewport (contain).
          All overlays are positioned in % of the stage so they land exactly
          on the baked-in countdown/QR positions of the reference image. */}
      <div
        className="relative"
        style={{
          aspectRatio: `${IMG_W} / ${IMG_H}`,
          width: "min(100vw, calc(100vh * " + IMG_W + " / " + IMG_H + "))",
          height: "min(100vh, calc(100vw * " + IMG_H + " / " + IMG_W + "))",
        }}
      >
        <img
          src={bg.url}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-contain select-none"
          draggable={false}
        />

        {/* Live countdown covering the baked "29:59" */}
        <div
          className="absolute text-white font-bold tabular-nums leading-none tracking-tight"
          style={{
            left: "5.2%",
            top: "10%",
            fontSize: "9.2cqw",
            containerType: "inline-size",
          }}
        >
          <span style={{ fontSize: "9.2cqw" }}>{mm}:{ss}</span>
        </div>

        {/* Live QR covering the baked QR */}
        <img
          src={qr.url}
          alt="QR Code"
          className="absolute block"
          style={{
            left: "5.2%",
            top: "31%",
            width: "16%",
            height: "auto",
          }}
        />
      </div>
    </main>
  );
}
