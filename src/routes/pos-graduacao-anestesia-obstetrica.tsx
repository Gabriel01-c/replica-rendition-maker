import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import drFrancisco from "@/assets/dr-francisco-polemicas-transparent.png.asset.json";
import salaCirurgica from "@/assets/sala-cirurgica.png.asset.json";
import anhanguera from "@/assets/anhanguera.png.asset.json";
import reconhecidoMec from "@/assets/reconhecido-mec.png.asset.json";

export const Route = createFileRoute("/pos-graduacao-anestesia-obstetrica")({
  head: () => ({
    meta: [
      { title: "Pós-Graduação em Anestesia Obstétrica | Dr. Francisco Amaral" },
      {
        name: "description",
        content:
          "A 1ª Pós-Graduação em Anestesia Obstétrica do Brasil 100% online: 480h, 12 disciplinas, 12 meses e sem TCC. Lançamento oficial.",
      },
      {
        property: "og:title",
        content: "Pós-Graduação em Anestesia Obstétrica | Dr. Francisco Amaral",
      },
      {
        property: "og:description",
        content:
          "Domine as emergências, as drogas e as decisões que definem se a gestante sobrevive.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PosAnestesiaObstetrica,
});

const NAVY_DEEP = "#050f1c";
const NAVY = "#0a1929";
const TEAL = "#5eead4";

const TARGET_DATE = new Date("2026-08-15T20:00:00-03:00");

function useCountdown() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = now ? Math.max(0, TARGET_DATE.getTime() - now.getTime()) : 0;
  return [
    { value: Math.floor(diff / 86400000), label: "DIAS" },
    { value: Math.floor((diff / 3600000) % 24), label: "HRS" },
    { value: Math.floor((diff / 60000) % 60), label: "MIN" },
    { value: Math.floor((diff / 1000) % 60), label: "SEG" },
  ];
}

function TopBar() {
  const items = useCountdown();
  return (
    <div
      className="relative z-30 w-full"
      style={{
        background:
          "linear-gradient(90deg, #0a2540 0%, #114a63 50%, #0a2540 100%)",
      }}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-5 py-3 sm:px-8 md:flex-row md:justify-between md:gap-6">
        <p
          className="max-w-md text-center text-[12px] font-extrabold uppercase leading-tight tracking-wide sm:text-sm md:text-left"
          style={{ color: "#f4f7fb" }}
        >
          Última turma fundadora. Condição exclusiva que nunca mais será repetida
        </p>
        <div className="flex items-center gap-2 sm:gap-3">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex min-w-[58px] flex-col items-center rounded-md px-3 py-1.5 sm:min-w-[70px] sm:py-2"
              style={{ backgroundColor: "rgba(3,10,18,0.9)" }}
            >
              <span
                className="text-lg font-bold tabular-nums leading-none sm:text-2xl"
                style={{ color: "#f4f7fb" }}
              >
                {String(item.value).padStart(2, "0")}
              </span>
              <span
                className="mt-1 text-[9px] font-semibold tracking-[0.12em] sm:text-[10px]"
                style={{ color: "rgba(232,238,245,0.6)" }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PosAnestesiaObstetrica() {
  return (
    <main
      className="min-h-screen"
      style={{
        backgroundColor: NAVY_DEEP,
        color: "#e8eef5",
        fontFamily: '"Inter Tight", system-ui, sans-serif',
      }}
    >
      <TopBar />

      {/* HERO */}
      <section className="relative overflow-hidden" style={{ backgroundColor: NAVY_DEEP }}>
        {/* fundo: sala cirúrgica desfocada */}
        <img
          src={salaCirurgica.url}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
          style={{ filter: "blur(18px) saturate(0.7)", opacity: 0.45, transform: "scale(1.08)" }}
          draggable={false}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(1000px 600px at 72% 45%, rgba(94,234,212,0.14), transparent 65%), linear-gradient(180deg, rgba(5,15,28,0.82) 0%, rgba(5,15,28,0.62) 45%, ${NAVY_DEEP} 100%)`,
          }}
        />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-6 px-5 pt-10 sm:px-8 md:grid-cols-2 md:gap-8 md:pt-6">
          {/* TEXTO */}
          <div className="order-2 pb-10 md:order-1 md:pb-20">
            <span
              className="inline-block rounded border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em]"
              style={{ borderColor: "rgba(94,234,212,0.5)", color: TEAL }}
            >
              Lançamento Oficial
            </span>

            <h1
              className="mt-6 text-[34px] font-extrabold leading-[1.06] tracking-tight sm:text-5xl lg:text-[54px]"
              style={{ color: "#f4f7fb" }}
            >
              A 1ª Pós-Graduação em{" "}
              <span style={{ color: TEAL }}>Anestesia Obstétrica do Brasil</span>
            </h1>

            <p
              className="mt-5 max-w-lg text-base leading-relaxed sm:text-lg"
              style={{ color: "rgba(232,238,245,0.78)" }}
            >
              Domine as emergências, as drogas e as decisões que definem se a
              gestante sobrevive, com formação estruturada, baseada em ciência e
              acessível de qualquer lugar do Brasil.
            </p>

            <button
              type="button"
              className="mt-7 w-full max-w-md rounded-md px-8 py-5 text-sm font-extrabold uppercase tracking-[0.06em] transition-transform hover:scale-[1.02] sm:text-base"
              style={{
                background: "linear-gradient(90deg, #00b86b, #00d97e)",
                color: "#032015",
                boxShadow: "0 0 40px rgba(0,217,126,0.35)",
              }}
            >
              Quero participar do lançamento
            </button>

            <p
              className="mt-5 max-w-lg text-sm leading-relaxed sm:text-base"
              style={{ color: "rgba(232,238,245,0.62)" }}
            >
              Se inscreva na lista de interessados para receber a condição especial
              (e única) da turma fundadora.
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {["480H", "100% ONLINE", "12 DISCIPLINAS", "SEM TCC"].map((chip) => (
                <span
                  key={chip}
                  className="rounded border px-3 py-2 text-[11px] font-bold tracking-wide sm:text-xs"
                  style={{
                    borderColor: "rgba(94,234,212,0.35)",
                    color: TEAL,
                    backgroundColor: "rgba(6,18,28,0.6)",
                  }}
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* IMAGEM */}
          <div className="relative order-1 md:order-2">
            <div className="relative mx-auto max-w-[420px] md:ml-auto md:mr-0 md:max-w-[520px]">
              <div
                className="pointer-events-none absolute inset-0 -z-10 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle at 50% 45%, rgba(94,234,212,0.28), transparent 62%)",
                }}
              />
              <img
                src={drFrancisco.url}
                alt="Dr. Francisco Amaral"
                className="w-full select-none object-contain"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 76%, transparent 100%)",
                  maskImage:
                    "linear-gradient(to bottom, black 76%, transparent 100%)",
                }}
                draggable={false}
              />
              <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-4 sm:gap-6">
                <img
                  src={anhanguera.url}
                  alt="Anhanguera"
                  className="w-24 select-none object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.6)] sm:w-32"
                  draggable={false}
                />
                <img
                  src={reconhecidoMec.url}
                  alt="Reconhecido pelo MEC"
                  className="w-20 select-none object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.6)] sm:w-28"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>

        {/* CARD DE INFORMAÇÕES */}
        <div className="relative mx-auto max-w-7xl px-5 pb-16 sm:px-8">
          <div
            className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border md:grid-cols-4"
            style={{
              backgroundColor: "rgba(6,18,28,0.75)",
              borderColor: "rgba(94,234,212,0.22)",
            }}
          >
            {[
              { label: "DURAÇÃO DO PROGRAMA", value: "12 MESES" },
              { label: "COMO VAI FUNCIONAR", value: "EAD | 100% ONLINE" },
              { label: "CARGA HORÁRIA", value: "480 HORAS" },
              { label: "ENCONTROS AO VIVO", value: "QUINZENAIS" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center justify-center px-3 py-6 text-center"
              >
                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.14em] sm:text-[11px]"
                  style={{ color: TEAL }}
                >
                  {item.label}
                </span>
                <span
                  className="mt-2 text-base font-extrabold leading-tight sm:text-lg"
                  style={{ color: "#f4f7fb" }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
          style={{ background: `linear-gradient(to bottom, transparent, ${NAVY})` }}
        />
      </section>
    </main>
  );
}
