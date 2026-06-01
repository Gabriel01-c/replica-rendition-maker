import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import MOCKUP_URL from "@/assets/mockup-fisio-farmaco-v3.png";

const CTA_LINK = "https://pay.hub.la/xPrruJVoPpKMO0zfGIsL";

const CSS = `
  :root {
    --dark-blackblue: #011722;
    --text-light: #D8E2E8;
    --text-white: #FFFFFF;
    --yellow: #F4C430;
    --whatsapp: #15b98d;
    --whatsapp-hover: #12a37c;
    --gradient-hero: linear-gradient(135deg, #011722 0%, #062B3A 48%, #08384A 100%);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { height: 100%; }
  body {
    font-family: 'Manrope', Inter, Arial, sans-serif;
    line-height: 1.5;
    color: var(--text-white);
    background: var(--dark-blackblue);
    overflow: hidden;
  }
  a { text-decoration: none; color: inherit; }

  .fullscreen-page {
    height: 100vh;
    height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--gradient-hero);
    position: relative;
    overflow: hidden;
    padding: clamp(16px, 3vh, 32px) 16px;
  }
  .fullscreen-page::before {
    content: '';
    position: absolute; inset: 0;
    background: repeating-linear-gradient(135deg, rgba(255,255,255,0.035) 0px, rgba(255,255,255,0.035) 1px, transparent 1px, transparent 60px);
    pointer-events: none;
  }

  .access-card {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 640px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .reveal { opacity: 0; transform: translateY(14px); transition: opacity 500ms ease, transform 500ms ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .reveal-d1 { transition-delay: 80ms; }
  .reveal-d2 { transition-delay: 160ms; }
  .reveal-d3 { transition-delay: 240ms; }
  .reveal-d4 { transition-delay: 320ms; }

  .access-badge {
    display: inline-block;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.14);
    color: var(--yellow);
    border-radius: 999px;
    padding: 7px 16px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .access-headline {
    font-size: clamp(26px, 4.6vh, 42px);
    font-weight: 800;
    letter-spacing: -0.035em;
    line-height: 1.08;
    color: var(--text-white);
  }

  .access-sub {
    font-size: clamp(15px, 2.1vh, 18px);
    color: var(--text-light);
    line-height: 1.55;
    max-width: 560px;
  }

  .mockup-wrap {
    width: 100%;
    max-width: 420px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: -20px;
  }
  .mockup-wrap img {
    max-width: 100%;
    max-height: clamp(220px, 48vh, 340px);
    height: auto;
    width: auto;
    display: block;
    filter: drop-shadow(0 18px 30px rgba(0,0,0,0.45));
  }

  .object-fill { object-fit: fill !important; }

  .whatsapp-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 420px;
    min-height: 56px;
    padding: 0 28px;
    background: var(--whatsapp);
    color: var(--white);
    font-size: 14px;
    font-weight: 800;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    border-radius: 14px;
    border: none;
    cursor: pointer;
    box-shadow: 0 14px 34px rgba(21,185,141,0.28);
    transition: all 180ms ease;
  }
  .whatsapp-btn:hover {
    background: var(--whatsapp-hover);
    transform: translateY(-2px);
    box-shadow: 0 18px 42px rgba(21,185,141,0.36);
  }
  .whatsapp-btn:active { transform: scale(0.99); }
`;


const BODY_HTML = `
<div class="fullscreen-page">
  <div class="access-card">
    <span class="access-badge reveal">Acesso Liberado</span>

    <h1 class="access-headline reveal reveal-d1">
      Evolua seu raciocínio na anestesia obstétrica
    </h1>

    <p class="access-sub reveal reveal-d2">
      Agora que você já vai aprender como escolher o vasoativo certo no plantão, o próximo passo é aprender a raciocinar com segurança nas principais situações da anestesia obstétrica.
    </p>

    <div class="mockup-wrap reveal reveal-d3">
      <img src="${MOCKUP_URL}" alt="Módulos Fisiologia da Gestante e Farmacologia" class="object-fill" />
    </div>

    <a href="${CTA_LINK}" class="whatsapp-btn reveal reveal-d4" aria-label="Quero Raciocinar com Segurança" target="_blank" rel="noopener noreferrer">
      Quero Raciocinar com Segurança
    </a>
  </div>
</div>
`;

export const Route = createFileRoute("/ebook-vasoativo-obg")({
  component: WhatsAppAccessPage,
});

function WhatsAppAccessPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div dangerouslySetInnerHTML={{ __html: BODY_HTML }} />
    </>
  );
}
