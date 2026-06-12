import { createFileRoute } from "@tanstack/react-router";
import imgAsset from "@/assets/pagina-salasecreta.jpeg.asset.json";

export const Route = createFileRoute("/live-secreta")({
  head: () => ({
    meta: [
      { title: "Live Secreta — Dr. Francisco Amaral" },
      {
        name: "description",
        content:
          "Reunião fechada no Google Meet com Dr. Francisco Amaral — decisões mais seguras em anestesia obstétrica.",
      },
      { property: "og:title", content: "Live Secreta — Dr. Francisco Amaral" },
      {
        property: "og:description",
        content:
          "Reunião fechada no Google Meet — anestesia obstétrica fora do protocolo.",
      },
      { property: "og:image", content: imgAsset.url },
    ],
  }),
  component: LiveSecretaPage,
});

function LiveSecretaPage() {
  return (
    <main className="min-h-screen w-full bg-black flex items-center justify-center">
      <img
        src={imgAsset.url}
        alt="Live secreta com Dr. Francisco Amaral — Anestesia Obstétrica"
        className="w-full h-auto max-w-[1500px] block"
      />
    </main>
  );
}
