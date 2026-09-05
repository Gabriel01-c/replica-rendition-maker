import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";

const RED = "#E11D2A";
const GREEN = "#1FA84A";
const AZURE_FLAT = "#007CF0";
const WHATSAPP_URL = "https://chat.whatsapp.com/Jgyn3iV9qhG46UfY9q6xks";
const AZURE_GRADIENT = "linear-gradient(135deg, #007CF0 0%, #00BFFF 50%, #7EC8E3 100%)";

export const Route = createFileRoute("/live-secreta-obg")({
  head: () => ({
    meta: [
      { title: "Obrigado — Imersão" },
      {
        name: "description",
        content: "Inscrição confirmada. Entre no grupo oficial da imersão no WhatsApp para receber o link.",
      },
      { property: "og:title", content: "Obrigado — Imersão" },
      {
        property: "og:description",
        content: "Inscrição confirmada. Entre no grupo oficial da imersão no WhatsApp.",
      },
    ],
    scripts: [
      {
        type: "text/javascript",
        children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-KXJTGGKS');`,
      },
    ],
  }),
  component: LiveSecretaObgPage,
});

function LiveSecretaObgPage() {
  return (
    <>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-KXJTGGKS"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
      <main className="min-h-screen w-full bg-white flex flex-col">
      {/* Faixa vermelha topo */}
      <div className="w-full py-3 overflow-hidden" style={{ backgroundColor: RED }}>
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="text-[12px] sm:text-[13px] md:text-sm font-bold leading-tight tracking-wide px-8"
            >
              INSCRIÇÃO CONFIRMADA — ENTRE NO GRUPO DA IMERSÃO AGORA
            </span>
          ))}
        </div>
      </div>

      <div className="flex-1 flex justify-center px-5 py-10 md:py-16">
        <div className="w-full max-w-[560px] flex flex-col items-center text-center gap-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: AZURE_STRONG }}
          >
            <Check size={36} strokeWidth={3} className="text-white" />
          </div>

          <h1
            className="text-[26px] md:text-4xl font-extrabold leading-[1.15]"
            style={{ color: AZURE_FLAT }}
          >
            Sua participação está quase garantida
          </h1>

          <p
            className="text-[15px] md:text-base leading-relaxed"
            style={{ color: "#1a3a5c" }}
          >
            Falta o próximo passo: clique no botão abaixo para entrar no{" "}
            <strong>grupo oficial do WhatsApp</strong>. É por lá que você vai
            receber o link da imersão e os avisos antes de começar.
          </p>

          <div
            className="w-full rounded-md border p-4 text-left"
            style={{ borderColor: "rgba(0,124,240,0.2)", backgroundColor: "rgba(0,124,240,0.05)" }}
          >
            <p
              className="text-[13px] md:text-sm leading-snug"
              style={{ color: "#1a3a5c" }}
            >
              <strong className="block mb-1" style={{ color: RED }}>
                Importante
              </strong>
              Sem entrar no grupo, você não vai receber o link de acesso à
              imersão.
            </p>
          </div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full rounded-md px-5 py-4 text-lg font-bold uppercase tracking-wide transition-transform hover:scale-[1.01] active:scale-[0.99]"
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
            ENTRAR NO GRUPO DA IMERSÃO
          </a>

          <p
            className="text-[12px] md:text-[13px] leading-snug"
            style={{ color: "#1a3a5c" }}
          >
            Ao clicar você será redirecionado para o WhatsApp.
          </p>
        </div>
      </div>
    </main>
    </>
  );
}
