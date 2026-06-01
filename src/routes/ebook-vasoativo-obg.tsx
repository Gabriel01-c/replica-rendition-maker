import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

const CTA_LINK = "https://pay.hub.la/xPrruJVoPpKMO0zfGIsL";

const CSS = `
  :root {
    --dark-main: #021D2B;
    --dark-navy: #062B3A;
    --dark-petrol: #08384A;
    --dark-blackblue: #011722;
    --white: #FFFFFF;
    --text-light: #D8E2E8;
    --text-white: #FFFFFF;
    --text-muted: #8BA1AD;
    --yellow: #F4C430;
    --whatsapp: #15b98d;
    --whatsapp-hover: #12a37c;
    --gradient-hero: linear-gradient(135deg, #011722 0%, #062B3A 48%, #08384A 100%);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'Manrope', Inter, Arial, sans-serif;
    font-weight: 400;
    line-height: 1.55;
    color: var(--text-white);
    background: var(--dark-blackblue);
    overflow-x: hidden;
  }

  a { text-decoration: none; color: inherit; }

  /* ===== FULLSCREEN PAGE ===== */
  .fullscreen-page {
    min-height: 100vh;
    min-height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--gradient-hero);
    position: relative;
    overflow: hidden;
    padding: 40px 20px;
  }

  /* subtle grid texture like the original hero */
  .fullscreen-page::before {
    content: '';
    position: absolute; inset: 0;
    background: repeating-linear-gradient(135deg, rgba(255,255,255,0.035) 0px, rgba(255,255,255,0.035) 1px, transparent 1px, transparent 60px);
    pointer-events: none;
  }

  /* ===== CENTER CARD ===== */
  .access-card {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 560px;
    text-align: center;
  }

  /* REVEAL ANIMATION */
  .reveal {
    opacity: 0;
    transform: translateY(22px);
    transition: opacity 620ms cubic-bezier(0.22,1,0.36,1), transform 620ms cubic-bezier(0.22,1,0.36,1);
  }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .reveal-d1 { transition-delay: 90ms; }
  .reveal-d2 { transition-delay: 180ms; }
  .reveal-d3 { transition-delay: 270ms; }
  .reveal-d4 { transition-delay: 360ms; }

  @media (prefers-reduced-motion: reduce) {
    .reveal { transition: none !important; }
  }

  /* ===== BADGE ===== */
  .access-badge {
    display: inline-block;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.14);
    color: var(--yellow);
    border-radius: 999px;
    padding: 8px 16px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 28px;
  }

  /* ===== HEADLINE ===== */
  .access-headline {
    font-size: 32px;
    font-weight: 800;
    letter-spacing: -0.035em;
    line-height: 1.08;
    color: var(--text-white);
    margin-bottom: 18px;
  }
  @media (min-width: 520px) {
    .access-headline { font-size: 38px; }
  }

  /* ===== SUBHEADLINE ===== */
  .access-sub {
    font-size: 16px;
    color: var(--text-light);
    line-height: 1.65;
    max-width: 480px;
    margin: 0 auto 36px;
  }

  /* ===== WHATSAPP BUTTON ===== */
  .whatsapp-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    max-width: 420px;
    min-height: 60px;
    padding: 0 32px;
    background: var(--whatsapp);
    color: var(--white);
    font-family: 'Manrope', sans-serif;
    font-size: 15px;
    font-weight: 800;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    border-radius: 14px;
    border: none;
    cursor: pointer;
    box-shadow: 0 14px 34px rgba(21,185,141,0.22);
    transition: all 180ms ease;
    text-decoration: none;
    margin-bottom: 18px;
  }
  .whatsapp-btn:hover {
    background: var(--whatsapp-hover);
    transform: translateY(-2px);
    box-shadow: 0 18px 42px rgba(21,185,141,0.30);
  }
  .whatsapp-btn:active { transform: scale(0.99); }
  .whatsapp-btn svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  /* ===== MICROCOPY ===== */
  .access-micro {
    font-size: 13px;
    color: var(--text-muted);
    line-height: 1.5;
    max-width: 380px;
    margin: 0 auto 0;
  }

  /* ===== WHATSAPP VISUAL ===== */
  .whatsapp-visual {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    margin-bottom: 32px;
    opacity: 0.85;
  }
  .whatsapp-phone {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.10);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .whatsapp-phone svg {
    width: 24px;
    height: 24px;
    color: var(--whatsapp);
  }
  .whatsapp-notif {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 14px;
    padding: 12px 16px;
    text-align: left;
    max-width: 260px;
  }
  .whatsapp-notif-title {
    font-size: 12px;
    font-weight: 700;
    color: var(--text-white);
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .whatsapp-notif-title svg {
    width: 14px;
    height: 14px;
    color: var(--whatsapp);
  }
  .whatsapp-notif-text {
    font-size: 12px;
    color: var(--text-muted);
    line-height: 1.4;
  }
`;

const BODY_HTML = `
<div class="fullscreen-page">
  <div class="access-card">

    <div class="reveal">
      <span class="access-badge">Acesso Liberado</span>
    </div>

    <h1 class="access-headline reveal reveal-d1">
      Evolua seu raciocínio na anestesia obstétrica
    </h1>

    <p class="access-sub reveal reveal-d2">
      Agora que você já vai aprender como escolher o vasoativo certo no plantão, o próximo passo é aprender a raciocinar com segurança nas principais situações da anestesia obstétrica.
    </p>

    <a href="${CTA_LINK}" class="whatsapp-btn reveal reveal-d3" aria-label="Quero Raciocinar com Segurança" target="_blank" rel="noopener noreferrer">
      Quero Raciocinar com Segurança
    </a>

    <p class="access-micro reveal reveal-d4">
      Recomendamos entrar agora para não perder os próximos avisos da formação.
    </p>

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
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
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
