import { createFileRoute } from "@tanstack/react-router";
import { Video, Calendar, Monitor, Check } from "lucide-react";
import drFrancisco from "@/assets/dr-francisco-v3.png.asset.json";

export const Route = createFileRoute("/live-secreta")({
  head: () => ({
    meta: [
      { title: "Live Secreta — Dr. Francisco Amaral" },
      {
        name: "description",
        content:
          "Reunião fechada no Google Meet com Dr. Francisco Amaral — decisões mais seguras em anestesia obstétrica, mesmo fora do protocolo.",
      },
      { property: "og:title", content: "Live Secreta — Dr. Francisco Amaral" },
      {
        property: "og:description",
        content:
          "Reunião fechada no Google Meet — anestesia obstétrica fora do protocolo.",
      },
    ],
  }),
  component: LiveSecretaPage,
});

const RED = "#E11D2A";
const GREEN = "#1FA84A";

function LiveSecretaPage() {
  return (
    <main className="min-h-screen w-full bg-black text-white">
      {/* Faixa topo */}
      <div
        className="w-full text-center py-3 px-4 text-[13px] sm:text-sm md:text-base font-semibold tracking-wide uppercase"
        style={{ backgroundColor: RED }}
      >
        Exclusivo para anestesiologistas, residentes e médicos interessados em
        anestesia obstétrica.
      </div>

      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-10 md:py-16 grid md:grid-cols-[1fr_minmax(280px,420px)] gap-10 items-center">
        {/* Coluna esquerda — conteúdo */}
        <div className="order-2 md:order-1">
          <div
            className="inline-flex items-center gap-2 border rounded-md px-3 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wide mb-6"
            style={{ borderColor: RED, color: "white" }}
          >
            <Video size={16} style={{ color: RED }} />
            Reunião fechada no Google Meet
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.1] mb-6">
            Aprenda a tomar decisões mais seguras em anestesia obstétrica{" "}
            <span style={{ color: RED }}>
              mesmo quando a gestante sai completamente do protocolo.
            </span>
          </h1>

          <ul className="space-y-4 mb-8 text-base sm:text-lg leading-relaxed">
            <li className="flex gap-3">
              <Check
                size={22}
                strokeWidth={3}
                className="shrink-0 mt-1"
                style={{ color: RED }}
              />
              <span>
                O raciocínio clínico que utilizo para tomar decisões em
                cenários de alta pressão.
              </span>
            </li>
            <li className="flex gap-3">
              <Check
                size={22}
                strokeWidth={3}
                className="shrink-0 mt-1"
                style={{ color: RED }}
              />
              <span>
                Por que muitos anestesistas experientes ainda se sentem
                inseguros diante de complicações obstétricas.
              </span>
            </li>
            <li className="flex gap-3">
              <Check
                size={22}
                strokeWidth={3}
                className="shrink-0 mt-1"
                style={{ color: RED }}
              />
              <span>
                Como desenvolver critérios que permitem agir com segurança
                mesmo quando o caso não se encaixa no que está escrito nos
                livros.
              </span>
            </li>
          </ul>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div
              className="flex items-center gap-3 border rounded-md px-4 py-3 text-sm font-semibold uppercase tracking-wide"
              style={{ borderColor: RED }}
            >
              <Calendar size={18} style={{ color: RED }} />
              Quinta-feira 18/06 às 20h30
            </div>
            <div
              className="flex items-center gap-3 border rounded-md px-4 py-3 text-sm font-semibold uppercase tracking-wide"
              style={{ borderColor: RED }}
            >
              <Monitor size={18} style={{ color: RED }} />
              Sala com capacidade limitada
            </div>
          </div>

          <a
            href="https://pay.hub.la/3rzxUpiSVGGSHi9ReKFR"
            className="flex items-center justify-center gap-3 w-full rounded-md px-6 py-4 text-lg sm:text-xl font-bold uppercase tracking-wide transition-transform hover:scale-[1.01] active:scale-[0.99]"
            style={{ backgroundColor: GREEN, color: "white" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
              aria-hidden="true"
            >
              <path d="M20.52 3.48A11.78 11.78 0 0 0 12.06 0C5.5 0 .17 5.33.17 11.89c0 2.09.55 4.13 1.6 5.93L0 24l6.34-1.66a11.86 11.86 0 0 0 5.72 1.46h.01c6.56 0 11.89-5.33 11.89-11.89 0-3.18-1.24-6.17-3.44-8.43ZM12.07 21.3h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.76.99 1-3.67-.22-.38a9.39 9.39 0 0 1-1.43-4.84c0-5.18 4.22-9.4 9.4-9.4 2.51 0 4.87.98 6.65 2.76a9.36 9.36 0 0 1 2.75 6.65c0 5.18-4.22 9.4-9.25 9.4Zm5.16-7.04c-.28-.14-1.66-.82-1.92-.92-.26-.09-.45-.14-.64.14-.19.28-.74.92-.91 1.11-.17.19-.34.21-.62.07-.28-.14-1.18-.43-2.25-1.39-.83-.74-1.39-1.66-1.56-1.94-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.19-.28.28-.47.09-.19.05-.36-.02-.5-.07-.14-.64-1.54-.88-2.11-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.36-.26.28-1 1-1 2.43s1.03 2.83 1.17 3.02c.14.19 2.02 3.08 4.9 4.32.69.3 1.22.47 1.64.6.69.22 1.32.19 1.82.12.55-.08 1.66-.68 1.9-1.34.23-.66.23-1.22.16-1.34-.07-.12-.26-.19-.54-.33Z" />
            </svg>
            Entrar no grupo
          </a>
        </div>

        {/* Coluna direita — Dr. Francisco */}
        <div className="order-1 md:order-2 flex flex-col items-center text-center md:text-left">
          <div className="relative w-full max-w-[360px]">
            <img
              src={drFrancisco.url}
              alt="Dr. Francisco Amaral — Anestesista Obstétrico"
              className="w-full h-auto object-contain"
              loading="eager"
            />
          </div>
          <div className="mt-4 md:self-start">
            <div
              className="flex items-center gap-2 text-sm font-medium"
              style={{ color: RED }}
            >
              <span
                className="inline-block w-6 h-px"
                style={{ backgroundColor: RED }}
              />
              Anestesista Obstétrico
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
              Dr. Francisco Amaral
            </h2>
            <p className="text-sm text-white/70 mt-1">
              PhD · TSA/SBA · @anestesio_trends
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
