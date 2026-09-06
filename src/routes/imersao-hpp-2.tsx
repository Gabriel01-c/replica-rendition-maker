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
    "@font-face{font-family:'Inter Tight';src:url('/congresso-site/assets/fonts/inter-tight-latin.woff2') format('woff2');font-style:normal;font-weight:300 900;font-display:swap}.hpp2-root .section{content-visibility:auto;contain-intrinsic-size:auto 850px}.hpp2-root img{max-width:100%}.hpp2-root .tension .section-title em,.hpp2-root .offer .section-title em{background:none;-webkit-background-clip:border-box;background-clip:border-box;color:#08d9b5}@media(max-width:820px){.hpp2-root .hero{height:calc(100dvh - 34px);min-height:calc(100dvh - 34px)}.hpp2-root .layout{position:relative;height:100%;min-height:0;padding:0;overflow:hidden}.hpp2-root .portrait{position:absolute;inset:0 0 auto;height:clamp(225px,39dvh,260px);min-height:0;overflow:hidden;-webkit-mask-image:linear-gradient(to bottom,#000 0%,#000 62%,rgba(0,0,0,.88) 72%,rgba(0,0,0,.42) 87%,transparent 100%);mask-image:linear-gradient(to bottom,#000 0%,#000 62%,rgba(0,0,0,.88) 72%,rgba(0,0,0,.42) 87%,transparent 100%)}.hpp2-root .portrait::after{content:none!important}.hpp2-root .content{position:absolute;z-index:6;left:0;right:0;top:clamp(215px,37dvh,242px);bottom:max(12px,env(safe-area-inset-bottom));width:100%;margin:0;display:grid;grid-template-rows:auto auto 42px auto 56px;align-content:space-between;text-align:center}.hpp2-root .logo-shell{position:absolute;z-index:7;left:50%;top:-79px;width:min(220px,62%);margin:0;padding:4px 5px;transform:translateX(-50%)}.hpp2-root .logo-shell::before{inset:8% -3% 0;background:radial-gradient(ellipse,rgba(2,72,63,.62),rgba(0,139,116,.34) 44%,transparent 72%);filter:blur(11px)}.hpp2-root h1{margin:0 auto;color:#092d2a;font-family:'Inter Tight',Inter,Arial,sans-serif;font-size:clamp(26px,7.7vw,30px);font-weight:900;line-height:1;letter-spacing:-.055em}.hpp2-root h1 .headline-line{display:block;white-space:nowrap}.hpp2-root h1 strong.headline-line{margin:0;background:linear-gradient(95deg,#034f45 0%,#008b74 42%,#08d8b4 100%);-webkit-background-clip:text;background-clip:text;color:transparent}.hpp2-root .subtitle{max-width:354px;margin:0 auto;font-size:clamp(13.5px,3.85vw,15px);line-height:1.26}.hpp2-root .event-data{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:7px;margin:0}.hpp2-root .data-pill{min-width:0;height:42px;justify-content:center;padding:7px 6px;font-size:clamp(9.5px,2.75vw,10.8px);white-space:nowrap}.hpp2-root .urgency{width:100%;padding:10px 11px 11px}.hpp2-root .urgency-top{margin-bottom:8px}.hpp2-root .lot{font-size:11px}.hpp2-root .sold{font-size:clamp(11.5px,3.15vw,13px)}.hpp2-root .cta{width:100%;min-height:56px;height:56px;margin:0;font-size:14.5px}}@media(max-width:350px){.hpp2-root h1{font-size:24px}.hpp2-root .subtitle{font-size:12.5px}.hpp2-root .data-pill{font-size:8.8px}.hpp2-root .sold{font-size:10.8px}}",
  );

const pageMarkup = sourceBody
  .replace(/<script>[\s\S]*?<\/script>/g, "")
  .replace(
    /<h1 id="headline">[\s\S]*?<\/h1>/,
    '<h1 id="headline"><span class="headline-line">Sua conduta em</span><span class="headline-line">hemorragia pós-parto,</span><strong class="headline-line">pronta para aplicar no plantão.</strong></h1>',
  )
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
