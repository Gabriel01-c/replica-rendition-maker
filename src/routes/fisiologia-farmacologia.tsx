import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const CHECKOUT_URL = "#oferta";

const CSS = `
  :root {
    --bg-main: #010B16;
    --bg-card: #071827;
    --blue-deep: #0B2447;
    --blue-premium: #215085;
    --blue-tech: #3A7CA5;
    --accent: #1FE0B5;
    --accent-2: #4DEA6B;
    --white-soft: #F3F7FA;
    --text-muted: #AAB7C4;
    --border-subtle: rgba(58, 124, 165, 0.18);
    --border-strong: rgba(31, 224, 181, 0.35);
    --gradient-bg: radial-gradient(ellipse at top, #0B2447 0%, #010B16 55%, #010B16 100%);
    --gradient-cta: linear-gradient(135deg, #1FE0B5 0%, #3A7CA5 100%);
    --shadow-card: 0 8px 32px rgba(0, 0, 0, 0.35);
    --shadow-glow: 0 0 60px rgba(31, 224, 181, 0.18);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  body.ff-page-body {
    font-family: 'Manrope', 'Inter', sans-serif;
    background: var(--bg-main);
    color: var(--white-soft);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  .ff-page {
    background: var(--bg-main);
    color: var(--white-soft);
    font-family: 'Manrope', 'Inter', sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
  }

  .ff-page a { color: inherit; text-decoration: none; }
  .ff-page button { font-family: inherit; cursor: pointer; }

  .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

  /* ===== Reveal ===== */
  .reveal { opacity: 0; transform: translateY(24px); transition: opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1); }
  .reveal.visible { opacity: 1; transform: translateY(0); }

  /* ===== Section base ===== */
  section { padding: 80px 0; position: relative; }
  @media (min-width: 768px) { section { padding: 110px 0; } }

  .eyebrow {
    display: inline-block;
    padding: 7px 14px;
    border: 1px solid var(--border-subtle);
    background: rgba(11, 36, 71, 0.4);
    border-radius: 999px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 22px;
  }

  h1, h2, h3 {
    font-family: 'Sora', 'Manrope', sans-serif;
    letter-spacing: -0.025em;
    line-height: 1.12;
    color: var(--white-soft);
  }
  h1 { font-size: clamp(32px, 5vw, 54px); font-weight: 800; }
  h2 { font-size: clamp(26px, 3.6vw, 40px); font-weight: 800; margin-bottom: 18px; }
  h3 { font-size: 19px; font-weight: 700; }
  p { color: var(--text-muted); font-size: 16px; }
  @media (min-width: 768px) { p { font-size: 17px; } }

  .section-head { max-width: 760px; margin: 0 auto 56px; text-align: center; }
  .section-head p { font-size: 17px; }

  /* ===== HERO ===== */
  .hero {
    padding: 120px 0 90px;
    background: var(--gradient-bg);
    position: relative;
    overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute; inset: 0;
    background:
      repeating-linear-gradient(0deg, rgba(58,124,165,0.04) 0px, rgba(58,124,165,0.04) 1px, transparent 1px, transparent 80px),
      repeating-linear-gradient(90deg, rgba(58,124,165,0.04) 0px, rgba(58,124,165,0.04) 1px, transparent 1px, transparent 80px);
    pointer-events: none;
  }
  .hero::after {
    content: '';
    position: absolute;
    top: 10%; right: -10%;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(31,224,181,0.10) 0%, transparent 70%);
    pointer-events: none;
  }

  .hero-grid {
    position: relative; z-index: 2;
    display: grid; grid-template-columns: 1fr; gap: 48px;
    align-items: center;
  }
  @media (min-width: 1024px) {
    .hero-grid { grid-template-columns: 1.05fr 1fr; gap: 64px; }
  }

  .hero h1 { margin-bottom: 22px; }
  .hero h1 .grad {
    background: linear-gradient(135deg, var(--accent) 0%, var(--blue-tech) 100%);
    -webkit-background-clip: text; background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .hero-sub { font-size: 17px; max-width: 560px; margin-bottom: 28px; }
  @media (min-width: 768px) { .hero-sub { font-size: 18px; } }

  .chips { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 32px; }
  .chip {
    padding: 7px 13px;
    background: rgba(11, 36, 71, 0.55);
    border: 1px solid var(--border-subtle);
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
    color: var(--white-soft);
  }

  .cta-btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 10px;
    padding: 18px 36px;
    background: var(--gradient-cta);
    color: #010B16;
    font-weight: 800;
    font-size: 15px;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    border: none;
    border-radius: 12px;
    box-shadow: 0 12px 32px rgba(31, 224, 181, 0.28);
    transition: transform .2s ease, box-shadow .2s ease;
    width: 100%;
    max-width: 380px;
  }
  .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 18px 42px rgba(31, 224, 181, 0.38); }
  .cta-btn:active { transform: translateY(0); }

  .micro {
    margin-top: 14px;
    font-size: 13px;
    color: var(--text-muted);
    letter-spacing: 0.02em;
  }

  /* ===== HERO MOCKUP ===== */
  .mockup-wrap {
    position: relative;
    display: flex; align-items: center; justify-content: center;
  }
  .mockup {
    position: relative;
    width: 100%; max-width: 480px;
    aspect-ratio: 4 / 3;
    background: linear-gradient(160deg, #0B2447 0%, #071827 100%);
    border: 1px solid var(--border-subtle);
    border-radius: 18px;
    box-shadow: var(--shadow-card), var(--shadow-glow);
    overflow: hidden;
    padding: 22px;
  }
  .mockup::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 32px;
    background: rgba(1, 11, 22, 0.6);
    border-bottom: 1px solid var(--border-subtle);
  }
  .mockup::after {
    content: '● ● ●';
    position: absolute; top: 9px; left: 14px;
    color: var(--blue-tech); font-size: 8px; letter-spacing: 4px;
  }
  .mockup-inner {
    margin-top: 36px;
    display: flex; flex-direction: column; gap: 12px;
  }
  .mockup-pill {
    display: inline-block;
    padding: 4px 10px;
    background: rgba(31, 224, 181, 0.12);
    border: 1px solid rgba(31, 224, 181, 0.3);
    border-radius: 999px;
    font-size: 9px;
    color: var(--accent);
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    align-self: flex-start;
  }
  .mockup-title {
    font-family: 'Sora', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: var(--white-soft);
    line-height: 1.2;
  }
  .mockup-lessons { display: flex; flex-direction: column; gap: 8px; margin-top: 8px; }
  .mockup-lesson {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 12px;
    background: rgba(11, 36, 71, 0.5);
    border: 1px solid var(--border-subtle);
    border-radius: 8px;
    font-size: 12px;
    color: var(--white-soft);
  }
  .mockup-lesson .num {
    width: 22px; height: 22px;
    border-radius: 6px;
    background: var(--accent);
    color: #010B16;
    display: flex; align-items: center; justify-content: center;
    font-weight: 800; font-size: 11px;
    flex-shrink: 0;
  }

  /* ===== CARDS ===== */
  .card {
    background: var(--bg-card);
    border: 1px solid var(--border-subtle);
    border-radius: 14px;
    padding: 26px;
    transition: border-color .25s ease, transform .25s ease;
  }
  .card:hover { border-color: var(--border-strong); transform: translateY(-2px); }

  .card h3 { color: var(--white-soft); margin-bottom: 10px; }
  .card p { font-size: 15px; line-height: 1.6; }

  .grid-3 { display: grid; grid-template-columns: 1fr; gap: 18px; }
  @media (min-width: 640px) { .grid-3 { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 1024px) { .grid-3 { grid-template-columns: repeat(3, 1fr); } }

  .grid-2 { display: grid; grid-template-columns: 1fr; gap: 22px; }
  @media (min-width: 900px) { .grid-2 { grid-template-columns: repeat(2, 1fr); } }

  /* ===== AUTHORITY ===== */
  .authority { background: linear-gradient(180deg, #010B16 0%, #061425 100%); }
  .auth-cards { display: grid; grid-template-columns: 1fr; gap: 14px; }
  @media (min-width: 640px) { .auth-cards { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 1024px) { .auth-cards { grid-template-columns: repeat(5, 1fr); } }
  .auth-card {
    background: var(--bg-card);
    border: 1px solid var(--border-subtle);
    border-radius: 12px;
    padding: 22px 18px;
    text-align: center;
  }
  .auth-card .icon {
    width: 38px; height: 38px;
    margin: 0 auto 12px;
    border-radius: 10px;
    background: rgba(31,224,181,0.12);
    border: 1px solid rgba(31,224,181,0.3);
    display: flex; align-items: center; justify-content: center;
    color: var(--accent);
  }
  .auth-card .icon svg { width: 18px; height: 18px; }
  .auth-card .label {
    font-size: 13px;
    font-weight: 700;
    color: var(--white-soft);
    line-height: 1.35;
  }

  /* ===== PAIN ===== */
  .pain-list { display: grid; grid-template-columns: 1fr; gap: 12px; margin-top: 36px; max-width: 720px; margin-left: auto; margin-right: auto; }
  @media (min-width: 640px) { .pain-list { grid-template-columns: repeat(2, 1fr); } }
  .pain-item {
    display: flex; align-items: flex-start; gap: 12px;
    padding: 16px 18px;
    background: var(--bg-card);
    border: 1px solid var(--border-subtle);
    border-radius: 10px;
    font-size: 14px;
    color: var(--white-soft);
    font-weight: 500;
  }
  .pain-item .dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--accent);
    margin-top: 7px; flex-shrink: 0;
    box-shadow: 0 0 8px var(--accent);
  }

  /* ===== METHOD ===== */
  .method-cards { display: grid; grid-template-columns: 1fr; gap: 22px; max-width: 900px; margin: 0 auto; }
  @media (min-width: 768px) { .method-cards { grid-template-columns: repeat(2, 1fr); } }
  .method-card {
    background: linear-gradient(160deg, #071827 0%, #0B2447 100%);
    border: 1px solid var(--border-subtle);
    border-radius: 16px;
    padding: 32px;
    position: relative;
    overflow: hidden;
  }
  .method-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: var(--gradient-cta);
  }
  .method-card .num {
    display: inline-block;
    font-family: 'Sora', sans-serif;
    font-size: 13px;
    color: var(--accent);
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  /* ===== DELIVERABLES ===== */
  .deliv-cols {
    display: grid; grid-template-columns: 1fr; gap: 22px;
    max-width: 1000px; margin: 0 auto;
  }
  @media (min-width: 768px) { .deliv-cols { grid-template-columns: repeat(2, 1fr); } }
  .deliv-col {
    background: var(--bg-card);
    border: 1px solid var(--border-subtle);
    border-radius: 16px;
    padding: 30px;
  }
  .deliv-col h3 {
    color: var(--accent);
    font-size: 18px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 20px;
    padding-bottom: 14px;
    border-bottom: 1px solid var(--border-subtle);
  }
  .deliv-list { list-style: none; display: flex; flex-direction: column; gap: 12px; }
  .deliv-list li {
    display: flex; align-items: flex-start; gap: 10px;
    color: var(--white-soft);
    font-size: 15px;
    line-height: 1.5;
  }
  .deliv-list li svg { width: 18px; height: 18px; color: var(--accent); flex-shrink: 0; margin-top: 2px; }

  .resume-bar {
    margin-top: 32px;
    padding: 18px 24px;
    background: rgba(11, 36, 71, 0.5);
    border: 1px solid var(--border-subtle);
    border-radius: 999px;
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    color: var(--white-soft);
    max-width: 800px;
    margin-left: auto; margin-right: auto;
  }

  /* ===== FOR WHO ===== */
  .for-cols { display: grid; grid-template-columns: 1fr; gap: 22px; max-width: 1000px; margin: 0 auto; }
  @media (min-width: 768px) { .for-cols { grid-template-columns: repeat(2, 1fr); } }
  .for-col {
    background: var(--bg-card);
    border: 1px solid var(--border-subtle);
    border-radius: 16px;
    padding: 30px;
  }
  .for-col h3 {
    margin-bottom: 20px;
    font-size: 17px;
    padding-bottom: 14px;
    border-bottom: 1px solid var(--border-subtle);
  }
  .for-col.yes h3 { color: var(--accent); }
  .for-col.no h3 { color: #ff8b7a; }
  .for-list { list-style: none; display: flex; flex-direction: column; gap: 11px; }
  .for-list li {
    display: flex; align-items: flex-start; gap: 10px;
    color: var(--white-soft);
    font-size: 14.5px;
  }
  .for-list li .ico { width: 18px; height: 18px; flex-shrink: 0; margin-top: 2px; }
  .for-col.yes li .ico { color: var(--accent); }
  .for-col.no li .ico { color: #ff8b7a; }

  /* ===== OFFER ===== */
  .offer {
    background: linear-gradient(160deg, #0B2447 0%, #010B16 100%);
    position: relative;
  }
  .offer::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at center, rgba(31,224,181,0.10) 0%, transparent 60%);
    pointer-events: none;
  }
  .offer-card {
    position: relative; z-index: 2;
    max-width: 720px; margin: 0 auto;
    background: linear-gradient(160deg, #071827 0%, #0B2447 100%);
    border: 1px solid var(--border-strong);
    border-radius: 22px;
    padding: 40px 28px;
    text-align: center;
    box-shadow: 0 30px 80px rgba(0,0,0,0.5), var(--shadow-glow);
  }
  @media (min-width: 768px) { .offer-card { padding: 56px 48px; } }

  .offer-card h2 { font-size: clamp(24px, 3.2vw, 34px); margin-bottom: 18px; }
  .offer-card p { margin-bottom: 28px; }

  .price-block { margin: 32px 0; }
  .price-from { color: var(--text-muted); font-size: 15px; text-decoration: line-through; margin-bottom: 6px; }
  .price-main {
    font-family: 'Sora', sans-serif;
    font-size: clamp(38px, 6vw, 56px);
    font-weight: 800;
    background: linear-gradient(135deg, var(--accent) 0%, var(--blue-tech) 100%);
    -webkit-background-clip: text; background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1;
    margin-bottom: 8px;
  }
  .price-installments { color: var(--white-soft); font-size: 15px; font-weight: 500; }

  .offer-list {
    list-style: none;
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    margin: 28px 0;
    text-align: left;
    max-width: 480px;
    margin-left: auto; margin-right: auto;
  }
  @media (min-width: 540px) { .offer-list { grid-template-columns: repeat(2, 1fr); } }
  .offer-list li {
    display: flex; align-items: center; gap: 8px;
    color: var(--white-soft);
    font-size: 14px;
  }
  .offer-list li svg { width: 16px; height: 16px; color: var(--accent); flex-shrink: 0; }

  /* ===== ABOUT DOCTOR ===== */
  .about-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
    align-items: center;
    max-width: 1100px; margin: 0 auto;
  }
  @media (min-width: 900px) { .about-grid { grid-template-columns: 1fr 1.4fr; gap: 60px; } }
  .doc-photo {
    aspect-ratio: 3/4;
    max-width: 360px;
    width: 100%;
    margin: 0 auto;
    background: linear-gradient(160deg, #0B2447 0%, #071827 100%);
    border: 1px solid var(--border-subtle);
    border-radius: 16px;
    position: relative;
    overflow: hidden;
    display: flex; align-items: flex-end; justify-content: center;
    box-shadow: var(--shadow-card), var(--shadow-glow);
  }
  .doc-photo::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(circle at 30% 20%, rgba(31,224,181,0.15) 0%, transparent 60%);
  }
  .doc-photo .initials {
    position: relative; z-index: 2;
    font-family: 'Sora', sans-serif;
    font-size: 80px;
    font-weight: 800;
    color: rgba(243, 247, 250, 0.12);
    letter-spacing: -0.05em;
    margin-bottom: auto; margin-top: 30%;
  }
  .doc-photo .label {
    position: absolute; bottom: 20px; left: 0; right: 0;
    text-align: center;
    color: var(--text-muted);
    font-size: 12px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    z-index: 2;
  }
  .about-text p { margin-bottom: 16px; font-size: 16px; }
  .about-text p:last-child { margin-bottom: 0; }

  /* ===== GUARANTEE ===== */
  .guarantee {
    background: linear-gradient(180deg, #010B16 0%, #061425 100%);
    text-align: center;
  }
  .guarantee-card {
    max-width: 720px; margin: 0 auto;
    background: var(--bg-card);
    border: 1px solid var(--border-subtle);
    border-radius: 20px;
    padding: 48px 28px;
  }
  .guarantee-seal {
    width: 80px; height: 80px;
    margin: 0 auto 24px;
    border-radius: 50%;
    background: rgba(31,224,181,0.12);
    border: 2px solid var(--accent);
    display: flex; align-items: center; justify-content: center;
    color: var(--accent);
    box-shadow: 0 0 30px rgba(31,224,181,0.3);
  }
  .guarantee-seal svg { width: 36px; height: 36px; }
  .guarantee p { margin-bottom: 28px; font-size: 16px; }

  /* ===== STICKY MOBILE CTA ===== */
  .sticky-cta {
    position: fixed;
    bottom: 0; left: 0; right: 0;
    padding: 12px 16px;
    background: rgba(1, 11, 22, 0.95);
    backdrop-filter: blur(12px);
    border-top: 1px solid var(--border-subtle);
    z-index: 100;
    transform: translateY(100%);
    transition: transform .35s ease;
  }
  .sticky-cta.visible { transform: translateY(0); }
  .sticky-cta .cta-btn { max-width: none; padding: 14px 24px; font-size: 13px; }
  @media (min-width: 900px) { .sticky-cta { display: none; } }

  /* ===== FOOTER ===== */
  .footer {
    padding: 40px 0;
    border-top: 1px solid var(--border-subtle);
    text-align: center;
    color: var(--text-muted);
    font-size: 13px;
  }
  .footer strong { color: var(--white-soft); }

  /* spacing tweak for mobile sticky */
  @media (max-width: 899px) {
    .footer { padding-bottom: 100px; }
  }
`;

export const Route = createFileRoute("/fisiologia-farmacologia")({
  head: () => ({
    meta: [
      { title: "Como Raciocinar com Segurança na Anestesia Obstétrica — Dr. Francisco Amaral" },
      {
        name: "description",
        content:
          "Formação técnica para anestesistas: domine fisiologia e farmacologia da gestante e tome decisões clínicas com mais clareza em situações obstétricas.",
      },
      { property: "og:title", content: "Como Raciocinar com Segurança na Anestesia Obstétrica" },
      {
        property: "og:description",
        content:
          "Aprenda a tomar decisões clínicas com mais clareza em situações obstétricas — sem depender apenas de protocolos decorados.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: FisiologiaFarmacologiaPage,
});

function FisiologiaFarmacologiaPage() {
  const [stickyVisible, setStickyVisible] = useState(false);

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
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    const onScroll = () => setStickyVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="ff-page">

        {/* HERO */}
        <section className="hero">
          <div className="container">
            <div className="hero-grid">
              <div className="reveal">
                <span className="eyebrow">Formação técnica para anestesistas</span>
                <h1>
                  Como Raciocinar com Segurança na <span className="grad">Anestesia Obstétrica</span>
                </h1>
                <p className="hero-sub">
                  Aprenda a tomar decisões clínicas com mais clareza em situações obstétricas —
                  dominando fisiologia e farmacologia sem depender apenas de protocolos decorados.
                </p>
                <div className="chips">
                  <span className="chip">2 módulos</span>
                  <span className="chip">12 aulas</span>
                  <span className="chip">Fisiologia + Farmacologia</span>
                  <span className="chip">100% online</span>
                  <span className="chip">Acesso imediato</span>
                </div>
                <a href={CHECKOUT_URL} className="cta-btn">Garantir minha vaga</a>
                <p className="micro">Acesso imediato • 100% online • Garantia de 7 dias</p>
              </div>

              <div className="mockup-wrap reveal">
                <div className="mockup">
                  <div className="mockup-inner">
                    <span className="mockup-pill">Área do aluno</span>
                    <div className="mockup-title">Anestesia Obstétrica<br/>— Método RAC</div>
                    <div className="mockup-lessons">
                      <div className="mockup-lesson"><span className="num">01</span>Fisiologia Cardiovascular da Gestante</div>
                      <div className="mockup-lesson"><span className="num">02</span>Fisiologia Respiratória da Gestante</div>
                      <div className="mockup-lesson"><span className="num">03</span>Farmacologia na Gestante</div>
                      <div className="mockup-lesson"><span className="num">04</span>Vasopressores em Gestantes</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AUTHORITY */}
        <section className="authority">
          <div className="container">
            <div className="section-head reveal">
              <h2>Criado por quem vive a anestesia na prática há mais de 20 anos</h2>
            </div>
            <div className="auth-cards reveal">
              {[
                { label: "+20 anos de sala cirúrgica" },
                { label: "Mestre e Doutor pela UFPR" },
                { label: "Fellowship nos Estados Unidos" },
                { label: "Conselho da SPA-PR" },
                { label: "Método RAC aplicado à decisão clínica" },
              ].map((c, i) => (
                <div key={i} className="auth-card">
                  <div className="icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <div className="label">{c.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PAIN */}
        <section>
          <div className="container">
            <div className="section-head reveal">
              <h2>A dúvida aparece exatamente quando não dá para hesitar</h2>
              <p>
                Você já ficou diante de uma situação obstétrica instável, com a equipe esperando
                sua decisão, e sentiu que o protocolo sozinho não era suficiente? Essa insegurança
                não significa falta de esforço. Na maioria das vezes, ela vem de uma lacuna mais
                profunda: falta de raciocínio clínico estruturado para entender o que está
                acontecendo e decidir com segurança.
              </p>
            </div>
            <div className="pain-list reveal">
              {[
                "Medo de errar em procedimentos complexos",
                "Dificuldade em se posicionar diante da equipe",
                "Ansiedade quando o caso foge do padrão",
                "Insegurança para adaptar condutas",
                "Sensação de que estudou muito, mas ainda trava na prática",
              ].map((t, i) => (
                <div key={i} className="pain-item"><span className="dot"/>{t}</div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY PROBLEM PERSISTS */}
        <section style={{ background: "linear-gradient(180deg, #010B16 0%, #061425 100%)" }}>
          <div className="container">
            <div className="section-head reveal">
              <h2>O problema não é estudar pouco.<br/>É estudar sem estrutura de decisão.</h2>
              <p>
                Na anestesia obstétrica, decorar condutas até ajuda em casos simples. Mas quando a
                gestante muda o cenário, o raciocínio precisa vir antes da resposta pronta.
              </p>
            </div>
            <div className="grid-3 reveal">
              <div className="card">
                <h3>Treinado para decorar, não para raciocinar</h3>
                <p>A residência ensina muitas condutas, mas nem sempre ensina o porquê por trás delas. E é o porquê que sustenta a decisão quando o caso sai do esperado.</p>
              </div>
              <div className="card">
                <h3>Adaptações fisiológicas da gestante não dominadas</h3>
                <p>A gestação muda o sistema cardiovascular, respiratório, neurológico, hematológico, renal e gastrointestinal. Sem entender essas mudanças, a decisão fica frágil.</p>
              </div>
              <div className="card">
                <h3>Nunca foi treinado para decidir sob pressão</h3>
                <p>Raciocínio clínico não é improviso. É método. Sem método, a pressão do centro obstétrico paralisa.</p>
              </div>
            </div>
          </div>
        </section>

        {/* METHOD RAC */}
        <section>
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">Método RAC</span>
              <h2>Uma forma mais segura de pensar antes de agir</h2>
              <p>
                O curso foi construído para organizar seu raciocínio clínico em anestesia obstétrica
                a partir de dois pilares fundamentais: fisiologia da gestante e farmacologia
                aplicada à decisão anestésica. Não é uma coleção de aulas soltas. É uma jornada
                para entender o motivo das condutas, antecipar riscos e tomar decisões com mais
                clareza em cenários obstétricos reais.
              </p>
            </div>
            <div className="method-cards reveal">
              <div className="method-card">
                <span className="num">Módulo 01</span>
                <h3>Fisiologia da Gestante</h3>
                <p style={{ marginTop: 12 }}>
                  Entenda como as alterações fisiológicas da gestação mudam a forma de avaliar,
                  conduzir e decidir.
                </p>
              </div>
              <div className="method-card">
                <span className="num">Módulo 02</span>
                <h3>Farmacologia na Gestante</h3>
                <p style={{ marginTop: 12 }}>
                  Domine a lógica por trás dos fármacos usados em anestesia obstétrica e sua
                  aplicação clínica.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* DELIVERABLES */}
        <section style={{ background: "linear-gradient(180deg, #010B16 0%, #061425 100%)" }}>
          <div className="container">
            <div className="section-head reveal">
              <h2>O que você vai dominar dentro da formação</h2>
            </div>
            <div className="deliv-cols reveal">
              <div className="deliv-col">
                <h3>Fisiologia</h3>
                <ul className="deliv-list">
                  {[
                    "Fisiologia Cardiovascular da Gestante",
                    "Fisiologia Respiratória da Gestante",
                    "Fisiologia Neurológica da Gestante",
                    "Fisiologia Hematológica da Gestante",
                    "Fisiologia Renal da Gestante",
                    "Fisiologia Gastrointestinal da Gestante",
                  ].map((t, i) => (
                    <li key={i}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="deliv-col">
                <h3>Farmacologia</h3>
                <ul className="deliv-list">
                  {[
                    "Farmacologia na Gestante",
                    "Farmacologia dos Anestésicos Venosos",
                    "Farmacologia dos Opioides em Gestantes",
                    "Vasopressores em Gestantes",
                    "Farmacologia dos Relaxantes Musculares",
                    "Halogenados em Gestantes",
                  ].map((t, i) => (
                    <li key={i}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="resume-bar reveal">
              2 módulos • 12 aulas • acesso imediato • 100% online • conteúdo técnico e direto ao ponto
            </div>
          </div>
        </section>

        {/* DIFFERENTIALS */}
        <section>
          <div className="container">
            <div className="section-head reveal">
              <h2>Não é sobre decorar mais. É sobre decidir melhor.</h2>
              <p>
                A proposta da formação é tirar você da dependência de respostas prontas e levar
                para uma compreensão mais profunda da anestesia obstétrica. Você vai entender o
                que muda na gestante, por que isso altera a conduta anestésica e como esse
                raciocínio impacta suas decisões em situações reais.
              </p>
            </div>
            <div className="grid-3 reveal">
              {[
                { t: "Foco em raciocínio clínico", d: "Não apenas protocolo decorado, mas estrutura de pensamento clínico aplicável." },
                { t: "Fisiologia e farmacologia aplicadas", d: "Conteúdo conectado diretamente à prática clínica em sala obstétrica." },
                { t: "Linguagem técnica e objetiva", d: "Sem rodeios. Densidade técnica com clareza didática." },
                { t: "Pensado para residentes e em atualização", d: "Estrutura adequada para quem está em formação ou em reciclagem." },
                { t: "Vivência real de sala cirúrgica", d: "Abordagem criada por anestesiologista com mais de duas décadas de prática." },
              ].map((c, i) => (
                <div key={i} className="card">
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOR WHO */}
        <section style={{ background: "linear-gradient(180deg, #010B16 0%, #061425 100%)" }}>
          <div className="container">
            <div className="section-head reveal">
              <h2>Essa formação é para anestesistas que querem mais clareza na hora de decidir</h2>
            </div>
            <div className="for-cols reveal">
              <div className="for-col yes">
                <h3>É para você se:</h3>
                <ul className="for-list">
                  {[
                    "É residente em anestesiologia e sente insegurança em obstetrícia",
                    "Quer tomar decisões com mais segurança em gestantes",
                    "Já atua em plantões, mas trava em situações complexas",
                    "Quer dominar fisiologia e farmacologia aplicadas à prática clínica",
                    "Vai fazer prova de título e precisa organizar o raciocínio",
                    "Está há um tempo sem estudar obstetrícia e quer se atualizar",
                  ].map((t, i) => (
                    <li key={i}>
                      <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="for-col no">
                <h3>Não é para você se:</h3>
                <ul className="for-list">
                  {[
                    "Procura conteúdo superficial",
                    "Quer apenas fórmulas prontas",
                    "Não pretende aprofundar raciocínio clínico",
                    "Busca promessa milagrosa ou atalho sem estudo",
                    "Não quer evoluir tecnicamente dentro da anestesia obstétrica",
                  ].map((t, i) => (
                    <li key={i}>
                      <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* OFFER */}
        <section className="offer" id="oferta">
          <div className="container">
            <div className="offer-card reveal">
              <span className="eyebrow">Oferta de lançamento</span>
              <h2>Entre agora na formação Como Raciocinar com Segurança na Anestesia Obstétrica</h2>
              <p>
                Vinte anos dentro de sala cirúrgica me ensinaram que o anestesista inseguro não
                precisa de mais protocolo decorado. Precisa de raciocínio. Foi por isso que criei
                essa formação.
              </p>
              <div className="price-block">
                <div className="price-from">De R$ 997</div>
                <div className="price-main">R$ 297</div>
                <div className="price-installments">à vista no Pix • ou 12x de R$ 30,18 no cartão</div>
              </div>
              <ul className="offer-list">
                {[
                  "2 módulos completos",
                  "12 aulas",
                  "Acesso imediato",
                  "100% online",
                  "Garantia de 7 dias",
                  "Pix ou cartão de crédito",
                ].map((t, i) => (
                  <li key={i}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                    {t}
                  </li>
                ))}
              </ul>
              <a href={CHECKOUT_URL} className="cta-btn" style={{ marginTop: 12 }}>Garantir minha vaga agora</a>
              <p className="micro">Compra segura • Acesso imediato • Garantia de 7 dias</p>
            </div>
          </div>
        </section>

        {/* ABOUT DOCTOR */}
        <section>
          <div className="container">
            <div className="section-head reveal" style={{ marginBottom: 40 }}>
              <h2>Quem é o Dr. Francisco Amaral</h2>
            </div>
            <div className="about-grid">
              <div className="doc-photo reveal">
                <div className="initials">FA</div>
                <div className="label">Dr. Francisco Amaral</div>
              </div>
              <div className="about-text reveal">
                <p>
                  Sou o Dr. Francisco Amaral, anestesiologista com mais de 20 anos de sala cirúrgica.
                </p>
                <p>
                  Sou Mestre e Doutor pela UFPR, fiz Fellowship nos Estados Unidos e integro o
                  conselho da Sociedade Paranaense de Anestesiologia.
                </p>
                <p>
                  Ao longo da minha trajetória, percebi que muitos anestesistas não travam por
                  falta de esforço. Eles travam porque foram ensinados a decorar condutas, mas não
                  a construir raciocínio clínico estruturado.
                </p>
                <p>
                  O Método RAC nasceu para mudar isso. Ele é a base desta formação e foi criado
                  para ajudar anestesistas a entenderem o porquê das decisões na anestesia
                  obstétrica.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* GUARANTEE */}
        <section className="guarantee">
          <div className="container">
            <div className="guarantee-card reveal">
              <div className="guarantee-seal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
              </div>
              <span className="eyebrow">Risco zero por 7 dias</span>
              <h2>Garantia incondicional de 7 dias</h2>
              <p>
                Entre, estude e avalie o conteúdo. Se você sentir que a formação não é para você,
                basta solicitar o reembolso dentro do prazo de 7 dias e devolvemos 100% do valor
                pago. Sem burocracia.
              </p>
              <a href={CHECKOUT_URL} className="cta-btn">Quero acessar a formação agora</a>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="container">
            <strong>Dr. Francisco Amaral</strong> · Anestesia Obstétrica · Método RAC<br/>
            © {new Date().getFullYear()} — Todos os direitos reservados.
          </div>
        </footer>

        {/* Sticky mobile CTA */}
        <div className={`sticky-cta ${stickyVisible ? "visible" : ""}`}>
          <a href={CHECKOUT_URL} className="cta-btn">Garantir minha vaga</a>
        </div>
      </div>
    </>
  );
}
