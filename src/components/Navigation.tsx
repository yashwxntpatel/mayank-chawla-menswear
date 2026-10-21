import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import horseWhite from "@/assets/horse-white.png";

const LINKS = [
  { label: "Collection", href: "#collection" },
  { label: "About", href: "#designer" },
  { label: "Journal", href: "#journal" },
  { label: "Contact", href: "#contact" },
];

export function Navigation({ onNavigate }: { onNavigate: (href: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    onNavigate(href);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8 md:pt-6">
        <nav
          className={cn(
            "mx-auto flex items-center justify-between rounded-full border px-5 py-3 backdrop-blur-xl transition-all duration-700 ease-[var(--ease-film)] md:px-7",
            scrolled ? "border-border bg-abyss/70" : "border-transparent bg-abyss/0",
          )}
        >
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              go("#top");
            }}
            className={cn("flex items-center gap-3 transition-transform duration-700", scrolled ? "scale-[0.94]" : "scale-100")}
          >
            <img src={horseWhite} alt="" width={22} height={28} className="h-6 w-auto" />
            <span className="text-[0.8rem] font-semibold tracking-[0.28em]">MAYANK CHAWLA</span>
          </a>
          <ul className="hidden items-center gap-9 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(l.href);
                  }}
                  className={cn("eyebrow link-film transition-opacity duration-500", scrolled ? "opacity-100" : "opacity-70 hover:opacity-100")}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="relative z-[60] flex h-10 w-10 items-center justify-center rounded-full border border-border md:hidden"
          >
            <span className={cn("absolute h-px w-4 bg-foreground transition-transform duration-500", open ? "rotate-45" : "-translate-y-[3px]")} />
            <span className={cn("absolute h-px w-4 bg-foreground transition-transform duration-500", open ? "-rotate-45" : "translate-y-[3px]")} />
          </button>
        </nav>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col justify-between bg-abyss px-6 pb-10 pt-32 transition-[clip-path] duration-[1100ms] ease-[var(--ease-film)] md:hidden",
          open ? "[clip-path:circle(150%_at_calc(100%-3rem)_3rem)]" : "pointer-events-none [clip-path:circle(0%_at_calc(100%-3rem)_3rem)]",
        )}
      >
        <div className="glow-violet pointer-events-none absolute inset-0" />
        <ul className="relative space-y-2">
          {LINKS.map((l, i) => (
            <li key={l.href} className="overflow-hidden">
              <a
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(l.href);
                }}
                style={{ transitionDelay: open ? `${200 + i * 70}ms` : "0ms" }}
                className={cn(
                  "display block text-[clamp(3rem,15vw,5rem)] transition-transform duration-1000 ease-[var(--ease-film)]",
                  open ? "translate-y-0" : "translate-y-full",
                )}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="eyebrow relative text-muted-foreground">Contemporary Indian Menswear</p>
      </div>
    </>
  );
}
