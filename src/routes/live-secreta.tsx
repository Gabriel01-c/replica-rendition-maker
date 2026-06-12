import { createFileRoute } from "@tanstack/react-router";
import { Video, Calendar, Monitor, Check, Lock, X } from "lucide-react";
import { useState } from "react";
import drFrancisco from "@/assets/dr-francisco-v3.png.asset.json";
import draAssistente from "@/assets/dra-assistente.png.asset.json";
import { supabase } from "@/integrations/supabase/client";

const WEBHOOK_URL = "https://n8n-n8n.s7gbvq.easypanel.host/webhook/livei-secreta";

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
const WHATSAPP_URL = "https://chat.whatsapp.com/HDtCkQnhYAOEBn3pfs3iIz?s=sw&p=i&ilr=0";

function LiveSecretaPage() {
  const marqueeText =
    "EXCLUSIVO PARA ANESTESIOLOGISTAS, RESIDENTES E MÉDICOS INTERESSADOS EM ANESTESIA OBSTÉTRICA.";
  const marqueeItems = Array.from({ length: 6 });

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
    const payload = { nome, email, whatsapp, source: "live-secreta" };

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

  const checks = (
    <ul className="space-y-2 md:space-y-3 text-sm md:text-[15px] leading-snug">
      <li className="flex gap-2">
        <Check size={18} strokeWidth={3} className="shrink-0 mt-0.5" style={{ color: RED }} />
        <span>O raciocínio clínico que utilizo para tomar decisões em cenários de alta pressão.</span>
      </li>
      <li className="flex gap-2">
        <Check size={18} strokeWidth={3} className="shrink-0 mt-0.5" style={{ color: RED }} />
        <span>Por que muitos anestesistas experientes ainda se sentem inseguros diante de complicações obstétricas.</span>
      </li>
      <li className="flex gap-2">
        <Check size={18} strokeWidth={3} className="shrink-0 mt-0.5" style={{ color: RED }} />
        <span>Como desenvolver critérios que permitem agir com segurança mesmo quando o caso não se encaixa no que está escrito nos livros.</span>
      </li>
    </ul>
  );

  const ctaButton = (
    <button
      type="button"
      onClick={() => {
        setError("");
        setOpen(true);
      }}
      className="flex items-center justify-center gap-3 w-full rounded-md px-5 py-3 md:py-3.5 text-base sm:text-lg font-bold uppercase tracking-wide transition-transform hover:scale-[1.01] active:scale-[0.99]"
      style={{ backgroundColor: GREEN, color: "white" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path d="M20.52 3.48A11.78 11.78 0 0 0 12.06 0C5.5 0 .17 5.33.17 11.89c0 2.09.55 4.13 1.6 5.93L0 24l6.34-1.66a11.86 11.86 0 0 0 5.72 1.46h.01c6.56 0 11.89-5.33 11.89-11.89 0-3.18-1.24-6.17-3.44-8.43ZM12.07 21.3h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.76.99 1-3.67-.22-.38a9.39 9.39 0 0 1-1.43-4.84c0-5.18 4.22-9.4 9.4-9.4 2.51 0 4.87.98 6.65 2.76a9.36 9.36 0 0 1 2.75 6.65c0 5.18-4.22 9.4-9.25 9.4Zm5.16-7.04c-.28-.14-1.66-.82-1.92-.92-.26-.09-.45-.14-.64.14-.19.28-.74.92-.91 1.11-.17.19-.34.21-.62.07-.28-.14-1.18-.43-2.25-1.39-.83-.74-1.39-1.66-1.56-1.94-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.19-.28.28-.47.09-.19.05-.36-.02-.5-.07-.14-.64-1.54-.88-2.11-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.36-.26.28-1 1-1 2.43s1.03 2.83 1.17 3.02c.14.19 2.02 3.08 4.9 4.32.69.3 1.22.47 1.64.6.69.22 1.32.19 1.82.12.55-.08 1.66-.68 1.9-1.34.23-.66.23-1.22.16-1.34-.07-.12-.26-.19-.54-.33Z" />
      </svg>
      Entrar no grupo
    </button>
  );

  return (
    <main className="min-h-screen w-full bg-black text-white flex flex-col">
      {/* Faixa marquee topo */}
      <div
        className="w-full overflow-hidden py-2 shrink-0"
        style={{ backgroundColor: RED }}
      >
        <div className="flex whitespace-nowrap animate-[marquee_12s_linear_infinite]">
          {marqueeItems.map((_, i) => (
            <span
              key={i}
              className="mx-6 text-[12px] sm:text-sm md:text-base font-bold tracking-wide"
            >
              {marqueeText} ★
            </span>
          ))}
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-4 md:py-6 grid md:grid-cols-[1fr_minmax(280px,420px)] gap-6 items-start">
        {/* Bloco 1 */}
        <div className="flex flex-col">
          <div className="flex flex-col gap-2 mb-3">
            <div
              className="inline-flex self-start items-center gap-2 border rounded-md px-2.5 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wide"
              style={{ borderColor: RED, color: "white" }}
            >
              <Lock size={14} style={{ color: RED }} />
              Exclusivo para médicos e residentes
            </div>
            <div
              className="inline-flex self-start items-center gap-2 border rounded-md px-2.5 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wide"
              style={{ borderColor: RED, color: "white" }}
            >
              <Video size={14} style={{ color: RED }} />
              Reunião fechada no Google Meet
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-[1.15] mb-3">
            Polêmicas Jurídicas Intraparto. <span style={{ color: RED }}>Defendendo o médico.</span>
          </h1>

          <div className="flex flex-row flex-wrap gap-2 mb-4">
            <div
              className="flex items-center gap-2 border rounded-md px-3 py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wide"
              style={{ borderColor: RED }}
            >
              <Calendar size={14} style={{ color: RED }} />
              Quinta-feira 18/06 às 20h30
            </div>
            <div
              className="flex items-center gap-2 border rounded-md px-3 py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wide"
              style={{ borderColor: RED }}
            >
              <Monitor size={14} style={{ color: RED }} />
              Sala com capacidade limitada
            </div>
          </div>

          <div className="mb-4">{checks}</div>

          {ctaButton}
        </div>

        {/* Bloco 2 — imagens lado a lado */}
        <div className="flex flex-row items-end justify-center gap-2 md:-mt-6">
          <img
            src={drFrancisco.url}
            alt="Dr. Francisco Amaral — Anestesista Obstétrico"
            className="w-1/2 max-w-[200px] md:max-w-full h-auto object-contain"
            loading="eager"
          />
          <img
            src={draAssistente.url}
            alt="Convidada"
            className="w-1/2 max-w-[200px] md:max-w-full h-auto object-contain"
            loading="eager"
          />
        </div>
      </section>

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
                {submitting ? "Enviando..." : "Entrar no grupo"}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
