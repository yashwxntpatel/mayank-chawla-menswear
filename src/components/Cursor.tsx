import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

/** Desktop-only cursor: a point that expands over links and labels images. */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<"idle" | "link" | "label">("idle");
  const [label, setLabel] = useState("");

  useEffect(() => {
    setEnabled(window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;
    const x = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      const labelled = target.closest<HTMLElement>("[data-cursor]");
      if (labelled) {
        setLabel(labelled.dataset['cursor'] ?? "");
        setMode("label");
      } else if (target.closest("a, button")) {
        setMode("link");
      } else {
        setMode("idle");
      }
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={ref} className="pointer-events-none fixed left-0 top-0 z-[70] mix-blend-difference" aria-hidden>
      <div
        className={cn(
          "flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-foreground transition-[width,height,background-color] duration-500 ease-[var(--ease-film)]",
          mode === "idle" && "h-2 w-2",
          mode === "link" && "h-10 w-10 bg-foreground/90",
          mode === "label" && "h-20 w-20",
        )}
      >
        {mode === "label" && <span className="eyebrow text-[0.6rem] text-abyss">{label}</span>}
      </div>
    </div>
  );
}
