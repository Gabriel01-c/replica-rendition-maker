import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ShieldCheck,
  ChevronDown,
  Clock,
  Monitor,
  GraduationCap,
  Calendar,
  FileText,
  Award,
} from "lucide-react";
import drFrancisco from "@/assets/dr-francisco-polemicas.png.asset.json";

export const Route = createFileRoute("/pos-graduacao-apresentacao")({
  head: () => ({
    meta: [
      { title: "Pós-Graduação em Anestesia Obstétrica | Dr. Francisco Amaral" },
      {
        name: "description",
        content:
          "A 1ª Pós-Graduação em Anestesia Obstétrica do Brasil 100% Online. Formação estruturada, baseada em ciência.",
      },
    ],
  }),
  component: PosGraduacaoApresentacao,
});

// Design tokens (edite aqui)
const BG_DEEP = "#02141a";
const BG_MID = "#063038";
const TEAL = "#7fd7e0";
const TEAL_SOFT = "rgba(127, 215, 224, 0.35)";
const GOLD_1 = "#f4dc86";
const GOLD_2 = "#b8892f";
const GOLD_3 = "#8a6320";
const TEXT = "#e9f5f6";
const MUTED = "#a9c4c8";

function useCountdown(targetMs: number) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, targetMs - now);
  const dias = Math.floor(diff / 86400000);
  const hrs = Math.floor((diff % 86400000) / 3600000);
  const min = Math.floor((diff % 3600000) / 60000);
  const seg = Math.floor((diff % 60000) / 1000);
  return { dias, hrs, min, seg };
}

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div
      style={{
        flex: 1,
        borderRadius: 14,
        padding: "10px 6px",
        background: "linear-gradient(180deg, rgba(127,215,224,0.08), rgba(2,20,26,0.6))",
        border: `1px solid ${TEAL_SOFT}`,
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 600,
          fontSize: 34,
          lineHeight: 1,
          color: TEXT,
        }}
      >
        {String(value).padStart(2, "0")}
      </div>
      <div
        style={{
          marginTop: 4,
          fontSize: 11,
          letterSpacing: 2,
          color: MUTED,
          fontWeight: 500,
        }}
      >
        {label}
      </div>
    </div>
  );
}

function GoldSeal({
  lines,
  ribbon,
}: {
  lines: string[];
  ribbon?: string;
}) {
  return (
    <div style={{ width: 92, position: "relative" }}>
      <div
        style={{
          width: 92,
          height: 92,
          borderRadius: "50%",
          background: `conic-gradient(from 210deg, ${GOLD_1}, ${GOLD_2}, ${GOLD_3}, ${GOLD_1})`,
          padding: 3,
          boxShadow: "0 6px 20px rgba(0,0,0,0.45)",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "radial-gradient(circle at 30% 30%, #1a1a1a, #060606)",
            border: `2px solid ${GOLD_1}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            padding: 8,
            textAlign: "center",
          }}
        >
          {lines.map((l, i) => (
            <div
              key={i}
              style={{
                fontSize: l.length > 3 ? 10 : 14,
                fontWeight: 700,
                letterSpacing: 0.5,
                color: GOLD_1,
                lineHeight: 1.1,
              }}
            >
              {l}
            </div>
          ))}
        </div>
      </div>
      {ribbon && (
        <div
          style={{
            position: "absolute",
            bottom: -6,
            left: "50%",
            transform: "translateX(-50%)",
            background: `linear-gradient(180deg, ${GOLD_1}, ${GOLD_2})`,
            color: "#1a1a1a",
            fontSize: 9,
            fontWeight: 700,
            padding: "2px 8px",
            borderRadius: 3,
            letterSpacing: 0.5,
          }}
        >
          {ribbon}
        </div>
      )}
    </div>
  );
}

function Chip({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 12px",
        borderRadius: 12,
        border: `1px solid ${TEAL_SOFT}`,
        background: "rgba(127,215,224,0.04)",
        color: TEAL,
        fontSize: 13,
        fontWeight: 500,
        minHeight: 44,
      }}
    >
      <Icon size={18} strokeWidth={1.8} style={{ flexShrink: 0 }} />
      <span style={{ lineHeight: 1.2 }}>{label}</span>
    </div>
  );
}

function PosGraduacaoApresentacao() {
  const target = 7 * 86400000; // 7 dias a partir do load
  const [targetMs] = useState(() => Date.now() + target);
  const { dias, hrs, min, seg } = useCountdown(targetMs);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: `radial-gradient(ellipse at top, ${BG_MID} 0%, ${BG_DEEP} 60%, #010a0e 100%)`,
        color: TEXT,
        fontFamily: "'Inter', sans-serif",
        overflowX: "hidden",
      }}
    >
      <section
        style={{
          maxWidth: 480,
          margin: "0 auto",
          padding: "20px 20px 32px",
        }}
      >
        {/* Faixa superior EXCLUSIVO */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            padding: "12px 8px",
            borderBottom: `1px solid ${TEAL_SOFT}`,
            marginBottom: 20,
          }}
        >
          <ShieldCheck size={22} color={TEAL} strokeWidth={2} style={{ flexShrink: 0 }} />
          <p
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: 1.2,
              textAlign: "center",
              color: TEXT,
              lineHeight: 1.3,
              margin: 0,
            }}
          >
            EXCLUSIVO PARA MÉDICOS E RESIDENTES DE
            <br />
            ANESTESIOLOGIA JÁ FORMADOS
          </p>
        </div>

        {/* Contador */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          <CountdownBox value={dias} label="DIAS" />
          <CountdownBox value={hrs} label="HRS" />
          <CountdownBox value={min} label="MIN" />
          <CountdownBox value={seg} label="SEG" />
        </div>

        {/* Imagem do Dr. com halo + fundo cirúrgico sutil */}
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "1 / 1",
            marginBottom: 20,
          }}
        >
          {/* Fundo centro cirúrgico (ECG SVG sutil) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              overflow: "hidden",
              borderRadius: 8,
            }}
          >
            <svg
              viewBox="0 0 400 400"
              preserveAspectRatio="none"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.35 }}
            >
              <defs>
                <linearGradient id="ecg" x1="0" x2="1">
                  <stop offset="0" stopColor={TEAL} stopOpacity="0" />
                  <stop offset="0.5" stopColor={TEAL} stopOpacity="0.9" />
                  <stop offset="1" stopColor={TEAL} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,220 L80,220 L100,220 L110,180 L120,260 L130,140 L140,280 L150,220 L400,220"
                stroke="url(#ecg)"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </div>

          {/* Halo/clarão atrás do Dr. */}
          <div
            style={{
              position: "absolute",
              top: "18%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "78%",
              height: "78%",
              background: `radial-gradient(circle, ${TEAL_SOFT} 0%, rgba(127,215,224,0.12) 40%, transparent 70%)`,
              filter: "blur(6px)",
              pointerEvents: "none",
            }}
          />

          {/* Dr. Francisco */}
          <img
            src={drFrancisco.url}
            alt="Dr. Francisco Amaral"
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center bottom",
              zIndex: 2,
            }}
          />

          {/* Degradê inferior para integrar com o texto */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "35%",
              background: `linear-gradient(180deg, transparent 0%, ${BG_DEEP} 90%)`,
              zIndex: 3,
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Selos + Anhanguera */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            marginBottom: 20,
            marginTop: -8,
          }}
        >
          <GoldSeal lines={["ACESSO", "VITALÍCIO"]} ribbon="★★★★★" />
          <div style={{ textAlign: "center", flex: 1 }}>
            <div style={{ fontSize: 11, color: MUTED, letterSpacing: 1, marginBottom: 2 }}>
              PARCERIA
            </div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 20,
                fontWeight: 600,
                color: "#ff6a2c",
              }}
            >
              Anhanguera
            </div>
          </div>
          <GoldSeal lines={["RECONHECIDO", "PELO", "MEC"]} />
        </div>

        {/* Lançamento Oficial */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <div
            style={{
              padding: "10px 24px",
              border: `1.5px solid ${TEAL}`,
              borderRadius: 8,
              color: TEAL,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: 3,
            }}
          >
            LANÇAMENTO OFICIAL
          </div>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            fontSize: "clamp(30px, 8.5vw, 42px)",
            lineHeight: 1.1,
            textAlign: "center",
            color: TEXT,
            margin: "0 0 8px",
          }}
        >
          A 1ª Pós-Graduação em Anestesia Obstétrica do Brasil
        </h1>

        {/* Destaque 100% Online */}
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 600,
              fontSize: "clamp(28px, 8vw, 40px)",
              color: TEAL,
              borderBottom: `2px solid ${TEAL}`,
              paddingBottom: 4,
            }}
          >
            100% Online.
          </span>
        </div>

        {/* Subheadline */}
        <p
          style={{
            textAlign: "center",
            color: MUTED,
            fontSize: 15,
            lineHeight: 1.6,
            margin: "0 auto 24px",
            maxWidth: 420,
          }}
        >
          Domine as emergências, as drogas e as decisões que definem se a gestante
          sobrevive — com formação estruturada, baseada em ciência e acessível de
          qualquer lugar do Brasil.
        </p>

        {/* 6 caixas de features */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
            marginBottom: 24,
          }}
        >
          <Chip icon={Clock} label="480 horas" />
          <Chip icon={Monitor} label="100% Online" />
          <Chip icon={GraduationCap} label="12 disciplinas" />
          <Chip icon={Calendar} label="12 meses" />
          <Chip icon={FileText} label="Sem TCC" />
          <Chip icon={Award} label="Certificado reconhecido" />
        </div>

        {/* Chevron */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ChevronDown
            size={28}
            color={TEAL}
            strokeWidth={1.5}
            className="animate-bounce"
          />
        </div>
      </section>
    </main>
  );
}
