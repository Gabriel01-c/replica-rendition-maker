import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/congresso")({
  head: () => ({
    meta: [
      { title: "Método RAC — Congresso" },
      {
        name: "description",
        content:
          "Como Raciocinar com segurança na anestesia obstétrica — Método RAC.",
      },
    ],
  }),
  component: CongressoPage,
});

const NAVY = "#02035b";
const TEAL = "#01b796";
const VIOLET = "#5758fa";

function CongressoPage() {
  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: NAVY }}>
      {/* Listras sutis ao fundo */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 40px,
            #ffffff 40px,
            #ffffff 41px
          )`,
        }}
      />

      {/* Conteúdo centralizado */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 py-16">
        {/* MÉTODO RAC discreto */}
        <span
          className="mb-3 inline-block text-sm font-bold uppercase tracking-[0.25em] text-white/40"
        >
          MÉTODO RAC
        </span>

        {/* Título */}
        <h1
          className="mb-14 max-w-3xl text-center text-3xl font-black leading-tight text-white md:text-5xl lg:text-6xl"
        >
          Raciocínio Clínico aplicado à prática real da{" "}
          <span style={{ color: TEAL }}>Anestesia Obstétrica</span>
        </h1>

        {/* Subtítulo */}
        <p className="mb-14 max-w-2xl text-center text-lg font-semibold text-white/80 md:text-xl">
          Use o código <span className="rounded bg-white/15 px-2 py-0.5 font-bold text-white">CONGRESSO</span> e garanta seu desconto exclusivo no curso
        </p>

        {/* 3 Cards */}
        <div className="grid w-full max-w-5xl gap-6 sm:grid-cols-3">
          {/* Card 1 */}
          <button
            className="animate-float-1 group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-1 backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/10"
            onClick={() => { /* reservado para imagem futura */ }}
          >
            <div
              className="flex aspect-[4/5] items-center justify-center rounded-xl"
              style={{ background: `linear-gradient(135deg, ${NAVY} 0%, ${VIOLET} 100%)` }}
            >
              <span className="text-5xl text-white/20 md:text-7xl">📷</span>
            </div>
            <div className="absolute inset-x-0 bottom-0 rounded-b-2xl bg-gradient-to-t from-black/60 to-transparent p-4 pt-10">
              <span className="text-sm font-semibold text-white/90">Produto 1</span>
            </div>
          </button>

          {/* Card 2 */}
          <button
            className="animate-float-2 group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-1 backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/10"
            onClick={() => { /* reservado para imagem futura */ }}
          >
            <div
              className="flex aspect-[4/5] items-center justify-center rounded-xl"
              style={{ background: `linear-gradient(135deg, ${NAVY} 0%, ${TEAL} 100%)` }}
            >
              <span className="text-5xl text-white/20 md:text-7xl">📷</span>
            </div>
            <div className="absolute inset-x-0 bottom-0 rounded-b-2xl bg-gradient-to-t from-black/60 to-transparent p-4 pt-10">
              <span className="text-sm font-semibold text-white/90">Produto 2</span>
            </div>
          </button>

          {/* Card 3 */}
          <button
            className="animate-float-3 group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-1 backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/10"
            onClick={() => { /* reservado para imagem futura */ }}
          >
            <div
              className="flex aspect-[4/5] items-center justify-center rounded-xl"
              style={{ background: `linear-gradient(135deg, ${VIOLET} 0%, ${TEAL} 100%)` }}
            >
              <span className="text-5xl text-white/20 md:text-7xl">📷</span>
            </div>
            <div className="absolute inset-x-0 bottom-0 rounded-b-2xl bg-gradient-to-t from-black/60 to-transparent p-4 pt-10">
              <span className="text-sm font-semibold text-white/90">Produto 3</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
