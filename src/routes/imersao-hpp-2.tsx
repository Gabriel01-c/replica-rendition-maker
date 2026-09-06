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
    ".hpp2-root .section{content-visibility:auto;contain-intrinsic-size:auto 850px}.hpp2-root img{max-width:100%}",
  );

const pageMarkup = sourceBody
  .replace(/<script>[\s\S]*?<\/script>/g, "")
  .replace(
    'src="assets/francisco-transparent.png"',
    'src="/congresso-site/assets/francisco-hero.webp" width="900" height="1350" decoding="async"',
  )
  .replace(
    'src="assets/francisco-labcoat-transparent.png"',
    'src="/congresso-site/assets/francisco-labcoat.webp" width="900" height="1350" decoding="async"',
  )
  .replace(
    'src="assets/logo-hpp.png"',
    'src="/congresso-site/assets/logo-hpp.webp" width="960" height="228" decoding="async"',
  )
  .replace(
    'src="assets/logo-imersao.png"',
    'src="/congresso-site/assets/logo-imersao.png" width="419" height="99" decoding="async"',
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
        as: "image",
        href: "/congresso-site/assets/francisco-hero.webp",
        type: "image/webp",
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
    };
  }, []);

  return (
    <div ref={pageRef} className="hpp2-root">
      <style>{pageCss}</style>
      <div dangerouslySetInnerHTML={{ __html: pageMarkup }} />
    </div>
  );
}
