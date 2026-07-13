import { createFileRoute } from "@tanstack/react-router";
import heroDoutor from "@/assets/dr-francisco-hero-cirurgico.png.asset.json";

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
  component: PosGraduacaoApresentacao,
});

const BG_DEEP = "#050d1a";
const BG_MID = "#0a1a2e";
const ACCENT = "#f4c430";

const CHIPS = [
  "480 horas",
  "100% Online",
  "12 disciplinas",
  "12 meses",
  "Sem TCC",
  "Certificado reconhecido",
];

function PosGraduacaoApresentacao() {
  return (
    <main
      className="min-h-screen w-full"
      style={{
        background: `linear-gradient(180deg, ${BG_DEEP} 0%, ${BG_MID} 55%, ${BG_DEEP} 100%)`,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <section className="relative w-full">
        {/* Imagem do Dr. no topo, menor */}
        <div className="relative w-full flex justify-center">
          <div className="relative w-full max-w-[520px]">
            <img
              src={heroDoutor.url}
              alt="Dr. Francisco Amaral"
              className="block w-full h-auto select-none"
              draggable={false}
              style={{
                maxHeight: "52vh",
                objectFit: "cover",
                objectPosition: "center top",
              }}
            />
            {/* Degradê inferior fundindo com a página */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0"
              style={{
                height: "55%",
                background: `linear-gradient(180deg, rgba(5,13,26,0) 0%, rgba(5,13,26,0.55) 45%, rgba(5,13,26,0.92) 78%, ${BG_DEEP} 100%)`,
              }}
            />
            {/* Degradês laterais suaves para fundir com o fundo */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-16"
              style={{
                background: `linear-gradient(90deg, ${BG_DEEP} 0%, rgba(5,13,26,0) 100%)`,
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 w-16"
              style={{
                background: `linear-gradient(270deg, ${BG_DEEP} 0%, rgba(5,13,26,0) 100%)`,
              }}
            />
          </div>
        </div>

        {/* Conteúdo do Hero */}
        <div className="relative z-10 mx-auto max-w-3xl px-6 -mt-16 sm:-mt-24 text-center">
          <h1
            className="text-white font-bold leading-[1.12] tracking-tight"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(28px, 5.2vw, 46px)",
            }}
          >
            A 1ª Pós-Graduação em{" "}
            <span style={{ color: ACCENT }}>Anestesia Obstétrica</span> do Brasil{" "}
            <span className="whitespace-nowrap">100% Online</span>
          </h1>

          <p
            className="mt-6 text-white/75 mx-auto"
            style={{
              fontSize: "clamp(15px, 1.9vw, 18px)",
              lineHeight: 1.6,
              maxWidth: "640px",
            }}
          >
            Domine as emergências, as drogas e as decisões que definem se a
            gestante sobrevive — com formação estruturada, baseada em ciência e
            acessível de qualquer lugar do Brasil.
          </p>

          {/* Chips */}
          <ul className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-3">
            {CHIPS.map((c) => (
              <li
                key={c}
                className="rounded-full border px-4 py-2 text-white/90"
                style={{
                  borderColor: "rgba(244,196,48,0.35)",
                  background: "rgba(255,255,255,0.03)",
                  fontSize: "13px",
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                }}
              >
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className="h-32" />
      </section>
    </main>
  );
}
