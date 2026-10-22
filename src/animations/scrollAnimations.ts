import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { experience } from "@/lib/experience-state";

gsap.registerPlugin(ScrollTrigger);

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Lenis smooth scroll wired into GSAP's ticker and the shared experience state. */
export function initSmoothScroll() {
  const reduced = prefersReducedMotion();
  const update = (progress: number, velocity: number) => {
    experience.progress = progress;
    experience.velocity = velocity;
  };

  if (reduced) {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      update(max > 0 ? window.scrollY / max : 0, 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return { lenis: null, destroy: () => window.removeEventListener("scroll", onScroll) };
  }

  const lenis = new Lenis({ duration: 1.25, smoothWheel: true });
  lenis.on("scroll", (l: Lenis) => {
    update(l.progress, l.velocity);
    ScrollTrigger.update();
  });
  const tick = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return {
    lenis,
    destroy: () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    },
  };
}

/** Declarative scroll choreography driven by data attributes. */
export function initScrollAnimations(root: HTMLElement) {
  const reduced = prefersReducedMotion();
  const ctx = gsap.context(() => {
    gsap.utils.toArray<HTMLElement>("[data-line]").forEach((el) => {
      gsap.fromTo(
        el,
        { yPercent: 110, rotate: reduced ? 0 : 3 },
        {
          yPercent: 0,
          rotate: 0,
          duration: reduced ? 0.01 : 1.4,
          ease: "expo.out",
          delay: Number(el.dataset['delay'] ?? 0),
          scrollTrigger: { trigger: el.parentElement, start: "top 88%" },
        },
      );
    });

    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: reduced ? 0 : 40, filter: reduced ? "none" : "blur(10px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.3,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        },
      );
    });

    if (reduced) return;

    gsap.utils.toArray<HTMLElement>("[data-mask]").forEach((el) => {
      gsap.fromTo(
        el,
        { clipPath: "inset(18% 12% 18% 12%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "center center", scrub: true },
        },
      );
    });

    gsap.utils.toArray<HTMLElement>("[data-zoom]").forEach((el) => {
      gsap.fromTo(
        el,
        { scale: 1.3 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    });

    gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
      const speed = Number(el.dataset['speed']);
      gsap.to(el, {
        yPercent: speed * -100,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      });
    });

    gsap.utils.toArray<HTMLElement>("[data-drift]").forEach((el) => {
      const dir = Number(el.dataset['drift']);
      gsap.fromTo(
        el,
        { xPercent: dir * 12 },
        {
          xPercent: dir * -12,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    });
  }, root);

  return () => ctx.revert();
}
