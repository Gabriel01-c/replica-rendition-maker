import { createFileRoute } from "@tanstack/react-router";
import heroAsset from "@/assets/hero-doutor-fundo.png.asset.json";

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

function Page() {
  return (
    <main
      className="min-h-screen w-full text-white"
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        background:
          "linear-gradient(180deg, #000000 0%, #001a12 40%, #00281c 100%)",
      }}
    >
      {/* Hero image */}
      <div className="relative w-full">
        <img
          src={heroAsset.url}
          alt="Dr. Francisco Amaral"
          className="block w-full h-auto"
          draggable={false}
        />
        {/* Degradê que funde a base da imagem com o fundo da página */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,10,7,0.7) 55%, #000000 100%)",
          }}
        />
      </div>

      {/* Conteúdo abaixo com continuidade natural */}
      <section className="relative mx-auto w-full max-w-[560px] px-5 pt-2 pb-16 text-center">
        {/* Pill Lançamento Oficial */}
        <div className="flex justify-center">
          <div
            className="px-8 py-2.5 rounded-full border text-[13px] tracking-[0.28em] font-semibold text-white"
            style={{
              borderColor: "rgba(127,215,224,0.55)",
              background: "rgba(127,215,224,0.06)",
              boxShadow:
                "0 0 24px rgba(127,215,224,0.18), inset 0 0 12px rgba(127,215,224,0.08)",
            }}
          >
            LANÇAMENTO OFICIAL
          </div>
        </div>

        {/* Headline */}
        <h1
          className="mt-7 text-white leading-[1.05]"
          style={{
            fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
            fontWeight: 500,
            fontSize: "clamp(32px, 8.5vw, 46px)",
          }}
        >
          A 1ª Pós-Graduação em
          <br />
          Anestesia Obstétrica
          <br />
          do Brasil
          <br />
          <span
            className="italic font-semibold"
            style={{ color: "#7fd7e0" }}
          >
            100% Online.
          </span>
        </h1>

        <div
          aria-hidden
          className="mx-auto mt-4 h-[2px] w-44"
          style={{
            background:
              "linear-gradient(90deg, transparent, #7fd7e0, transparent)",
          }}
        />

        <p className="mt-6 text-[15px] leading-[1.6] text-white/70">
          Domine as emergências, as drogas e as decisões que definem se a
          gestante sobrevive — com formação estruturada, baseada em ciência e
          acessível de qualquer lugar do Brasil.
        </p>
      </section>
    </main>
  );
}
