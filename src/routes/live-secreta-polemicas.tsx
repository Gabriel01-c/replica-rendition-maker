import { createFileRoute } from "@tanstack/react-router";
import { Video, Calendar, Monitor, Check, X } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import drFrancisco from "@/assets/dr-francisco-polemicas.png.asset.json";

const WEBHOOK_URL = "https://n8n-n8n.s7gbvq.easypanel.host/webhook/livei-secreta";
const RED = "#E11D2A";
const GREEN = "#1FA84A";
const WHATSAPP_URL = "https://chat.whatsapp.com/HDtCkQnhYAOEBn3pfs3iIz?s=sw&p=i&ilr=0";

export const Route = createFileRoute("/live-secreta-polemicas")({
  head: () => ({
    meta: [
      { title: "Polêmicas Jurídicas Intraparto — Dr. Francisco Amaral" },
      {
        name: "description",
        content:
          "Reunião fechada no Google Meet — Polêmicas jurídicas no intraparto e defesa do médico anestesista.",
      },
      { property: "og:title", content: "Polêmicas Jurídicas Intraparto — Dr. Francisco Amaral" },
      {
        property: "og:description",
        content: "Reunião fechada no Google Meet — defendendo o médico.",
      },
    ],
  }),
  component: LiveSecretaPolemicasPage,
});

const PEOPLE = [
  {
    src: drFrancisco.url,
    alt: "Dr. Francisco Amaral",
    name: "Dr. Francisco Amaral",
    lines: ["PhD — TSA/SBA", "@anestesio_trends"],
  },
];

function PersonName({ name, lines }: { name: string; lines: string[] }) {
  return (
    <div className="mt-3 text-center">
      <p className="font-bold text-[15px] md:text-[16px] leading-tight">{name}</p>
      <div
        className="mx-auto mt-1.5 h-[2px] w-10"
        style={{ backgroundColor: RED }}
      />
      <div className="mt-1.5 space-y-0.5">
        {lines.map((l) => (
          <p
            key={l}
            className="text-[11px] md:text-[12px] text-white/75 leading-snug uppercase tracking-wide"
          >
            {l}
          </p>
        ))}
      </div>
    </div>
  );
}

function LiveSecretaPolemicasPage() {
  const [form, setForm] = useState({ nome: "", email: "", whatsapp: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setError("");
    const nome = form.nome.trim().slice(0, 100);
    const email = form.email.trim().slice(0, 255);
    const whatsapp = form.whatsapp.trim().slice(0, 30);
    if (!nome || !email || !whatsapp) {
      setError("Preencha todos os campos para continuar.");
      return;
    }
    setSubmitting(true);
    const payload = { nome, email, whatsapp, source: "live-secreta-polemicas" };
    try {
      await Promise.allSettled([
        supabase.from("leads").insert(payload),
        fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, submitted_at: new Date().toISOString() }),
        }),
      ]);
    } catch (err) {
      console.error("lead submit error", err);
    }
    window.location.href = WHATSAPP_URL;
  };

  const ctaButton = (
    <button
      type="button"
      onClick={() => {
        setError("");
        setOpen(true);
      }}
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
      GARANTIR MINHA VAGA
    </button>
  );

  const badges = (
    <div className="flex flex-col md:flex-row gap-2.5 md:gap-3 items-center md:items-start md:justify-start">
      <div
        className="inline-flex items-center gap-2 border rounded-md px-4 py-2 text-[11px] md:text-xs font-semibold uppercase tracking-wide"
        style={{ borderColor: RED, color: "white" }}
      >
        <Video size={14} style={{ color: RED }} />
        Reunião fechada no Google Meet
      </div>
    </div>
  );

  const dateInfo = (
    <div className="flex flex-col md:flex-row items-center md:items-start md:justify-start gap-2 md:gap-5">
      <div className="flex items-center gap-2 text-[12px] md:text-[13px] font-semibold uppercase tracking-wide">
        <Calendar size={16} style={{ color: RED }} />
        Quinta-feira 18/06 às 20h30
      </div>
      <div className="flex items-center gap-2 text-[12px] md:text-[13px] font-semibold uppercase tracking-wide">
        <Monitor size={16} style={{ color: RED }} />
        Sala com capacidade limitada
      </div>
    </div>
  );

  const checks = (
    <ul className="flex flex-col gap-2.5 md:gap-3 text-[14px] md:text-[15px] leading-snug md:text-left">
      <li className="flex gap-2.5">
        <Check size={20} strokeWidth={3} className="shrink-0 mt-0.5" style={{ color: RED }} />
        <span>Quais decisões clínicas mais geram processos contra anestesistas no intraparto</span>
      </li>
      <li className="flex gap-2.5">
        <Check size={20} strokeWidth={3} className="shrink-0 mt-0.5" style={{ color: RED }} />
        <span>Como documentar sua conduta para se proteger juridicamente em qualquer cenário</span>
      </li>
      <li className="flex gap-2.5">
        <Check size={20} strokeWidth={3} className="shrink-0 mt-0.5" style={{ color: RED }} />
        <span>O que fazer quando a equipe toma uma decisão errada e você já estava na sala</span>
      </li>
    </ul>
  );

  return (
    <main className="min-h-screen w-full bg-black text-white flex flex-col">
      {/* Faixa vermelha topo */}
      <div className="w-full py-3 overflow-hidden" style={{ backgroundColor: RED }}>
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="text-[12px] sm:text-[13px] md:text-sm font-bold leading-tight tracking-wide px-8"
            >
              ANESTESIOLOGISTAS, RESIDENTES E MÉDICOS INTERESSADOS EM ANESTESIA OBSTÉTRICA
            </span>
          ))}
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden flex justify-center">
        <div className="w-full max-w-[430px] flex flex-col px-5 pt-5 pb-6 gap-4">
          {badges}
          <h1 className="text-center text-[22px] font-extrabold leading-[1.15] mt-1">
            Aprenda a tomar decisões mais seguras em anestesia obstétrica mesmo quando a gestante sai completamente do protocolo.
          </h1>

          <div className="grid grid-cols-1 gap-4 mt-2 max-w-[260px] mx-auto">
            {PEOPLE.map((p) => (
              <div key={p.name} className="flex flex-col">
                <div
                  className="relative w-full aspect-[4/5] overflow-hidden rounded-md"
                >
                  <img
                    src={p.src}
                    alt={p.alt}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                </div>
                <PersonName name={p.name} lines={p.lines} />
              </div>
            ))}
          </div>

          {dateInfo}
          {checks}
          {ctaButton}
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden md:flex flex-1 w-full">
        <div className="w-full max-w-7xl mx-auto px-10 lg:px-16 py-10 lg:py-14 grid grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Coluna texto */}
          <div className="col-span-7 flex flex-col gap-6">
            {badges}
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-[1.05]">
              Polêmicas Jurídicas Intraparto.{" "}
              <span style={{ color: RED }}>Defendendo o médico.</span>
            </h1>
            {dateInfo}
            {checks}
            <div className="max-w-md">{ctaButton}</div>
          </div>

          {/* Coluna imagens */}
          <div className="col-span-5 grid grid-cols-1 gap-5 lg:gap-6 max-w-[320px] mx-auto">
            {PEOPLE.map((p) => (
              <div key={p.name} className="flex flex-col">
                <div
                  className="relative w-full aspect-[4/5] overflow-hidden rounded-md"
                >
                  <img
                    src={p.src}
                    alt={p.alt}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                </div>
                <PersonName name={p.name} lines={p.lines} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popup formulário */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => !submitting && setOpen(false)}
        >
          <div
            className="relative w-full max-w-md rounded-lg bg-neutral-900 border border-white/10 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => !submitting && setOpen(false)}
              className="absolute top-3 right-3 text-white/60 hover:text-white"
              aria-label="Fechar"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-extrabold mb-1 text-white">Garanta sua vaga</h2>
            <p className="text-sm text-white/70 mb-4">
              Preencha seus dados para entrar no grupo.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <input
                type="text"
                required
                maxLength={100}
                placeholder="Seu nome"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                className="w-full rounded-md bg-white/5 border border-white/20 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-white/50"
              />
              <input
                type="email"
                required
                maxLength={255}
                placeholder="Seu melhor e-mail"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-md bg-white/5 border border-white/20 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-white/50"
              />
              <input
                type="tel"
                required
                maxLength={30}
                placeholder="Seu WhatsApp (com DDD)"
                value={form.whatsapp}
                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                className="w-full rounded-md bg-white/5 border border-white/20 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-white/50"
              />

              {error && (
                <p className="text-xs text-red-400 text-center -mt-1 mb-1">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="mt-1 flex items-center justify-center gap-3 w-full rounded-md px-5 py-3 text-base font-bold uppercase tracking-wide transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ backgroundColor: GREEN, color: "white" }}
              >
                {submitting ? "Enviando..." : "GARANTIR MINHA VAGA"}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
