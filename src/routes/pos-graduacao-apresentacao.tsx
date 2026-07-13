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
const TEAL = "#4fd1c5";

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
        {/* Imagem do Dr. no topo */}
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
            {/* Degradê inferior: ~30% da imagem, transparente → azul escuro */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0"
              style={{
                height: "30%",
                background: `linear-gradient(180deg, rgba(5,13,26,0) 0%, rgba(5,13,26,0.45) 35%, rgba(5,13,26,0.82) 70%, ${BG_DEEP} 100%)`,
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

        {/* Conteúdo do Hero — sobe sobre o degradê no mobile */}
        <div className="relative z-10 mx-auto max-w-3xl px-6 -mt-24 sm:-mt-16 text-center">
          <h1
            className="text-white font-semibold tracking-tight mx-auto sm:max-w-3xl"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(26px, 7.5vw, 40px)",
              lineHeight: 0.95,
              maxWidth: "90%",
            }}
          >
            A 1ª Pós-Graduação em
            <br />
            Anestesia Obstétrica
            <br />
            do Brasil{" "}
            <span
              className="font-semibold"
              style={{
                color: TEAL,
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              100% Online
            </span>
          </h1>

          <p
            className="mt-4 sm:mt-6 text-white/75 mx-auto font-normal"
            style={{
              fontSize: "clamp(13.5px, 3.8vw, 17px)",
              lineHeight: 1.45,
              maxWidth: "86%",
            }}
          >
            Domine as emergências, as drogas e as decisões que definem se a
            gestante sobrevive — com formação estruturada, baseada em ciência e
            acessível de qualquer lugar do Brasil.
          </p>

          {/* Chips */}
          <ul className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-x-3 gap-y-3">
            {CHIPS.map((c) => (
              <li
                key={c}
                className="rounded-full border px-4 py-2 text-white/90 font-semibold"
                style={{
                  borderColor: "rgba(244,196,48,0.35)",
                  background: "rgba(255,255,255,0.03)",
                  fontSize: "13px",
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
