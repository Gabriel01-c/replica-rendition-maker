import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import pageSource from "@/content/imersao-hpp-2.source.html?raw";

const sourceCss = pageSource.match(/<style>([\s\S]*?)<\/style>/)?.[1] ?? "";
const sourceBody = pageSource.match(/<body>([\s\S]*?)<\/body>/)?.[1] ?? "";

const pageCss = sourceCss
  .replace(
    "*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#fff;color:var(--ink);font-family:Inter,Arial,sans-serif}",
    ".hpp2-root,.hpp2-root *{box-sizing:border-box}.hpp2-root{margin:0;background:#fff;color:var(--ink);font-family:'Inter Tight',Inter,Arial,sans-serif}",
  )
  .replaceAll(
    "17px/1.35 Inter,Arial,sans-serif",
    "17px/1.35 'Inter Tight',Inter,Arial,sans-serif",
  )
  .replaceAll("url('assets/operating-room.png')", "url('/congresso-site/assets/operating-room.webp')")
  .concat(
    "@font-face{font-family:'Inter Tight';src:url('/congresso-site/assets/fonts/inter-tight-latin.woff2') format('woff2');font-style:normal;font-weight:300 900;font-display:swap}.hpp2-root .section{content-visibility:auto;contain-intrinsic-size:auto 850px}.hpp2-root img{max-width:100%}@media(max-width:820px){.hpp2-root .hero{height:calc(100dvh - 34px);min-height:calc(100dvh - 34px)}.hpp2-root .layout{position:relative;height:100%;min-height:0;padding:0;overflow:hidden}.hpp2-root .portrait{position:absolute;inset:0 0 auto;height:clamp(245px,35dvh,310px);min-height:0}.hpp2-root .content{position:absolute;z-index:6;left:0;right:0;bottom:max(12px,env(safe-area-inset-bottom));width:100%;margin:0;display:block}.hpp2-root .logo-shell{width:min(335px,91%);transform:translateY(-22px);margin-bottom:-16px}.hpp2-root h1{font-size:clamp(27px,7.4vw,32px);line-height:1.02}.hpp2-root .subtitle{margin:9px auto 10px;font-size:14px;line-height:1.34}.hpp2-root .event-data{margin-bottom:9px;gap:7px}.hpp2-root .data-pill{padding:7px 9px;font-size:11px}.hpp2-root .urgency{padding:9px 11px 10px}.hpp2-root .lot{font-size:11px}.hpp2-root .sold{font-size:13px}.hpp2-root .cta{min-height:54px;margin-top:9px;font-size:14px;flex:none}}@media(max-width:390px) and (max-height:760px){.hpp2-root .portrait{height:220px}.hpp2-root .logo-shell{width:min(322px,92%);transform:translateY(-18px);margin-bottom:-13px}.hpp2-root h1{font-size:26px;line-height:1.01}.hpp2-root .subtitle{margin:8px auto 9px;font-size:13.4px;line-height:1.29}.hpp2-root .event-data{margin-bottom:8px;gap:6px}.hpp2-root .data-pill{padding:7px 8px;font-size:10.3px}.hpp2-root .urgency{padding:9px 10px 10px}.hpp2-root .lot{font-size:10.5px}.hpp2-root .sold{font-size:12.2px}.hpp2-root .cta{min-height:52px;margin-top:8px;font-size:13.5px}}",
  );

const pageMarkup = sourceBody
  .replace(/<script>[\s\S]*?<\/script>/g, "")
  .replace(
    'src="assets/francisco-transparent.png"',
    'src="/congresso-site/assets/francisco-hero.webp" srcset="/congresso-site/assets/francisco-hero-480.webp 480w, /congresso-site/assets/francisco-hero.webp 900w" sizes="(max-width: 820px) 100vw, 50vw" width="900" height="1350" loading="eager" fetchpriority="high" decoding="async"',
  )
  .replace(
    'src="assets/francisco-labcoat-transparent.png"',
    'src="/congresso-site/assets/francisco-labcoat.webp" width="900" height="1350" decoding="async"',
  )
  .replace(
    'src="assets/logo-hpp.png"',
    'src="/congresso-site/assets/logo-hpp.webp" srcset="/congresso-site/assets/logo-hpp-520.webp 520w, /congresso-site/assets/logo-hpp.webp 960w" sizes="(max-width: 820px) 305px, 455px" width="960" height="228" decoding="async"',
  )
  .replace(
    'src="assets/logo-imersao.png"',
    'src="/congresso-site/assets/logo-imersao.png" width="419" height="99" decoding="async"',
  )
  .replace(
    'role="progressbar" aria-valuemin="0"',
    'role="progressbar" aria-label="45% dos ingressos vendidos" aria-valuemin="0"',
  );

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
    links: [
      {
        rel: "preload",
        as: "font",
        href: "/congresso-site/assets/fonts/inter-tight-latin.woff2",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        as: "image",
        href: "/congresso-site/assets/francisco-hero-480.webp",
        type: "image/webp",
        media: "(max-width: 820px)",
      },
      {
        rel: "preload",
        as: "image",
        href: "/congresso-site/assets/francisco-hero.webp",
        type: "image/webp",
        media: "(min-width: 821px)",
      },
    ],
  }),
  component: ImersaoHppPage,
});

function ImersaoHppPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    let trackingLoaded = false;
    const loadTracking = () => {
      if (trackingLoaded) return;
      trackingLoaded = true;

      const trackedWindow = window as typeof window & { dataLayer?: Record<string, unknown>[] };
      trackedWindow.dataLayer = trackedWindow.dataLayer || [];
      trackedWindow.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
      const gtm = document.createElement("script");
      gtm.async = true;
      gtm.src = "https://www.googletagmanager.com/gtm.js?id=GTM-NNNKN4GS";
      document.head.appendChild(gtm);

      const dashWindow = window as typeof window & {
        dashfacil?: { _c?: unknown[][]; dfq?: (key: string, value: string) => void };
      };
      const dashfacil = (dashWindow.dashfacil = dashWindow.dashfacil || {});
      dashfacil._c = dashfacil._c || [];
      dashfacil.dfq = (key, value) => dashfacil._c?.push([key, value]);
      dashfacil.dfq("init", "1759");
      const dash = document.createElement("script");
      dash.async = true;
      dash.id = "dashfacil-js";
      dash.src = "https://server.dashfacil.com/static/assets/rastreio.js";
      document.head.appendChild(dash);
    };
    const trackingTimer = window.setTimeout(loadTracking, 6000);
    window.addEventListener("pointerdown", loadTracking, { once: true, passive: true });
    window.addEventListener("scroll", loadTracking, { once: true, passive: true });

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const reveals = [...root.querySelectorAll<HTMLElement>(".reveal")];
    let revealObserver: IntersectionObserver | undefined;

    if (reduced) {
      reveals.forEach((element) => element.classList.add("is-visible"));
    } else {
      revealObserver = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver?.unobserve(entry.target);
            }
          }),
        { threshold: 0.12, rootMargin: "0px 0px -7%" },
      );
      reveals.forEach((element) => revealObserver?.observe(element));
    }

    const faqCleanups = [
      ...root.querySelectorAll<HTMLButtonElement>(".faq-question"),
    ].map((button) => {
      const handler = () => {
        const open = button.getAttribute("aria-expanded") === "true";
        root
          .querySelectorAll<HTMLButtonElement>(".faq-question")
          .forEach((item) => item.setAttribute("aria-expanded", "false"));
        button.setAttribute("aria-expanded", String(!open));
      };
      button.addEventListener("click", handler);
      return () => button.removeEventListener("click", handler);
    });

    const floating = root.querySelector<HTMLElement>(".floating-cta");
    const visibleCtas = new Set<Element>();
    const updateFloating = () =>
      floating?.classList.toggle(
        "show",
        visibleCtas.size === 0 && window.scrollY > 180,
      );
    const ctaObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) =>
          entry.isIntersecting
            ? visibleCtas.add(entry.target)
            : visibleCtas.delete(entry.target),
        );
        updateFloating();
      },
      { threshold: 0.08 },
    );
    root
      .querySelectorAll("[data-has-cta]")
      .forEach((element) => ctaObserver.observe(element));
    window.addEventListener("scroll", updateFloating, { passive: true });

    return () => {
      revealObserver?.disconnect();
      ctaObserver.disconnect();
      faqCleanups.forEach((cleanup) => cleanup());
      window.removeEventListener("scroll", updateFloating);
      window.clearTimeout(trackingTimer);
      window.removeEventListener("pointerdown", loadTracking);
      window.removeEventListener("scroll", loadTracking);
    };
  }, []);

  return (
    <div ref={pageRef} className="hpp2-root">
      <style>{pageCss}</style>
      <div dangerouslySetInnerHTML={{ __html: pageMarkup }} />
    </div>
  );
}
