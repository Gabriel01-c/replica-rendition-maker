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

// Cor dominante do fundo da imagem (azul escuro do centro cirúrgico)
const BG_DEEP = "#050d1a";
const BG_MID = "#0a1a2e";

function PosGraduacaoApresentacao() {
  return (
    <main
      className="min-h-screen w-full"
      style={{
        background: `linear-gradient(180deg, ${BG_DEEP} 0%, ${BG_MID} 60%, ${BG_DEEP} 100%)`,
      }}
    >
      {/* Bloco Hero */}
      <section className="relative w-full">
        {/* Imagem do Dr. no topo */}
        <div className="relative w-full">
          <img
            src={heroDoutor.url}
            alt="Dr. Francisco Amaral"
            className="block w-full h-auto select-none"
            draggable={false}
            style={{
              maxHeight: "80vh",
              objectFit: "cover",
              objectPosition: "center top",
            }}
          />

          {/* Degradê inferior que funde a imagem com o fundo da página */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0"
            style={{
              height: "45%",
              background: `linear-gradient(180deg, rgba(5,13,26,0) 0%, rgba(5,13,26,0.5) 40%, rgba(5,13,26,0.9) 75%, ${BG_DEEP} 100%)`,
            }}
          />
        </div>

        {/* Espaço abaixo para o restante da página (a ser construído) */}
        <div className="h-40" />
      </section>
    </main>
  );
}
