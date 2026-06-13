import { createFileRoute } from "@tanstack/react-router";
import { Video, Calendar, Monitor, Check, Lock, X } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import drFrancisco from "@/assets/dr-francisco-polemicas.png.asset.json";
import draAssistente from "@/assets/isadora-leardini.png.asset.json";

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

  return (
    <main className="min-h-screen w-full bg-black text-white flex justify-center">
      <div className="w-full max-w-[430px] flex flex-col">
        {/* Faixa vermelha topo */}
        <div
          className="w-full py-3 overflow-hidden"
          style={{ backgroundColor: RED }}
        >
          <div className="flex whitespace-nowrap animate-marquee">
            <span className="text-[12px] sm:text-[13px] font-bold leading-tight tracking-wide px-8">
              ANESTESIOLOGISTAS, RESIDENTES E MÉDICOS INTERESSADOS EM ANESTESIA OBSTÉTRICA
            </span>
            <span className="text-[12px] sm:text-[13px] font-bold leading-tight tracking-wide px-8">
              ANESTESIOLOGISTAS, RESIDENTES E MÉDICOS INTERESSADOS EM ANESTESIA OBSTÉTRICA
            </span>
            <span className="text-[12px] sm:text-[13px] font-bold leading-tight tracking-wide px-8">
              ANESTESIOLOGISTAS, RESIDENTES E MÉDICOS INTERESSADOS EM ANESTESIA OBSTÉTRICA
            </span>
            <span className="text-[12px] sm:text-[13px] font-bold leading-tight tracking-wide px-8">
              ANESTESIOLOGISTAS, RESIDENTES E MÉDICOS INTERESSADOS EM ANESTESIA OBSTÉTRICA
            </span>
          </div>
        </div>

        <div className="flex flex-col px-5 pt-5 pb-6 gap-4">
          {/* Badges */}
          <div className="flex flex-col gap-2.5 items-center">
            <div
              className="inline-flex items-center gap-2 border rounded-md px-4 py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wide"
              style={{ borderColor: RED, color: "white" }}
            >
              <Lock size={14} style={{ color: RED }} />
              Exclusivo para médicos e residentes
            </div>
            <div
              className="inline-flex items-center gap-2 border rounded-md px-4 py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wide"
              style={{ borderColor: RED, color: "white" }}
            >
              <Video size={14} style={{ color: RED }} />
              Reunião fechada no Google Meet
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-center text-[28px] sm:text-[30px] font-extrabold leading-[1.1] mt-1">
            Polêmicas Jurídicas Intraparto.{" "}
            <span style={{ color: RED }}>Defendendo o médico.</span>
          </h1>

          {/* Fotos lado a lado */}
          <div className="grid grid-cols-2 gap-3 mt-2">
            {[
              {
                src: draAssistente.url,
                alt: "Isadora Leardini",
                name: "Isadora Leardini",
                lines: ["Mestre em Direito", "Especialista em Direito Penal"],
              },
              {
                src: drFrancisco.url,
                alt: "Dr. Francisco Amaral",
                name: "Dr. Francisco Amaral",
                lines: ["PhD — TSA/SBA", "@anestesio_trends"],
              },
            ].map((p) => (
              <div key={p.name} className="flex flex-col">
                <div
                  className="relative w-full aspect-[4/5] overflow-hidden rounded-md border"
                  style={{ borderColor: "rgba(225,29,42,0.35)" }}
                >
                  <img
                    src={p.src}
                    alt={p.alt}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                </div>
                <div
                  className="relative -mt-3 mx-1.5 rounded-md px-3 py-2 text-center bg-neutral-950/90 border"
                  style={{ borderColor: "rgba(225,29,42,0.45)" }}
                >
                  <div
                    className="absolute left-1/2 -top-[1px] -translate-x-1/2 h-[2px] w-10"
                    style={{ backgroundColor: RED }}
                  />
                  <p className="font-bold text-[14px] leading-tight">{p.name}</p>
                  <div
                    className="mx-auto my-1 h-px w-8"
                    style={{ backgroundColor: "rgba(255,255,255,0.18)" }}
                  />
                  {p.lines.map((l) => (
                    <p key={l} className="text-[11.5px] text-white/80 leading-snug uppercase tracking-wide">
                      {l}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>


          {/* Data e Sala */}
          <div className="flex flex-col items-center gap-2 mt-2">
            <div className="flex items-center gap-2 text-[12px] sm:text-[13px] font-semibold uppercase tracking-wide">
              <Calendar size={16} style={{ color: RED }} />
              Quinta-feira 18/06 às 20h30
            </div>
            <div className="flex items-center gap-2 text-[12px] sm:text-[13px] font-semibold uppercase tracking-wide">
              <Monitor size={16} style={{ color: RED }} />
              Sala com capacidade limitada
            </div>
          </div>

          {/* Checks */}
          <ul className="flex flex-col gap-2.5 mt-2 text-[14px] leading-snug">
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

          {/* Botão */}
          <button
            type="button"
            onClick={() => {
              setError("");
              setOpen(true);
            }}
            className="flex items-center justify-center gap-3 w-full rounded-md px-5 py-4 text-lg font-bold uppercase tracking-wide transition-transform hover:scale-[1.01] active:scale-[0.99] mt-2"
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
