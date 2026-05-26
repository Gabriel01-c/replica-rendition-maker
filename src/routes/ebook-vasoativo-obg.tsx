import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

const WHATSAPP_LINK = "https://chat.whatsapp.com/BtP56iwn2ZPAao4DhqtaTv?mode=gi_t";

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
      Entre no grupo para acessar conteúdos complementares e aprofundar seu raciocínio nas decisões da anestesia obstétrica.
    </p>

    <a href="${WHATSAPP_LINK}" class="whatsapp-btn reveal reveal-d3" aria-label="Entrar no grupo do WhatsApp">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.125.297-.323.446-.484.149-.162.198-.273.297-.458.099-.184.05-.347-.025-.484-.075-.136-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.3A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
      Entrar no Grupo do WhatsApp
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
