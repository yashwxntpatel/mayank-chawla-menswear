import { lazy, Suspense, useEffect, useRef, useState } from "react";
import type Lenis from "lenis";
import { initScrollAnimations, initSmoothScroll } from "@/animations/scrollAnimations";
import { experience } from "@/lib/experience-state";
import { Navigation } from "./Navigation";
import { Hero } from "./Hero";
import { FormScene } from "./FormScene";
import { Collection } from "./Collection";
import { Detail } from "./Detail";
import { Designer } from "./Designer";
import { Journal } from "./Journal";
import { Finale } from "./Finale";
import { Cursor } from "./Cursor";

const Scene = lazy(() => import("./three/Scene"));

export function Experience() {
  const root = useRef<HTMLDivElement>(null);
  const lenis = useRef<Lenis | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const scroll = initSmoothScroll();
    lenis.current = scroll.lenis;
    const cleanup = root.current ? initScrollAnimations(root.current) : undefined;
    const onPointer = (e: PointerEvent) => {
      experience.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      experience.pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointer);
    return () => {
      window.removeEventListener("pointermove", onPointer);
      cleanup?.();
      scroll.destroy();
    };
  }, []);

  const navigate = (href: string) => {
    const target = href === "#top" ? 0 : document.querySelector<HTMLElement>(href);
    if (target === null) return;
    if (lenis.current) lenis.current.scrollTo(target, { duration: 1.8 });
    else window.scrollTo({ top: target === 0 ? 0 : target.offsetTop, behavior: "smooth" });
  };

  return (
    <div ref={root} className="relative">
      <div className="fixed inset-0 z-0" aria-hidden>
        {mounted && (
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        )}
      </div>
      <div className="grain" aria-hidden />
      <div className="vignette" aria-hidden />
      <Cursor />
      <Navigation onNavigate={navigate} />
      <main className="relative z-10">
        <Hero onExplore={() => navigate("#collection")} />
        <FormScene />
        <Collection />
        <Detail />
        <Designer />
        <Journal />
      </main>
      <div className="relative z-10">
        <Finale onExplore={() => navigate("#collection")} />
      </div>
    </div>
  );
}
