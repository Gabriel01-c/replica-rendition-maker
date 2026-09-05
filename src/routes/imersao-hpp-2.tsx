import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/imersao-hpp-2")({
  head: () => ({
    meta: [
      {
        title:
          "Imersão Hemorragia Pós-Parto | Dr. Francisco Amaral Egydio",
      },
      {
        name: "description",
        content:
          "Uma imersão online para anestesiologistas dominarem a condução clínica da hemorragia pós-parto.",
      },
    ],
  }),
  component: CongressoPage,
});

function CongressoPage() {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousMargin = document.body.style.margin;

    document.body.style.overflow = "hidden";
    document.body.style.margin = "0";

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.margin = previousMargin;
    };
  }, []);

  return (
    <iframe
      title="Imersão Hemorragia Pós-Parto"
      src="/congresso-site/index.html"
      className="block h-dvh w-full border-0 bg-white"
      allow="clipboard-write"
    />
  );
}
