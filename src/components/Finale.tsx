import horseWhite from "@/assets/horse-white.png";
import { RevealText } from "./RevealText";
import { Magnetic } from "./Magnetic";

export function Finale({ onExplore }: { onExplore: () => void }) {
  return (
    <footer id="contact" className="relative flex min-h-[100svh] flex-col justify-between px-5 pb-8 pt-[20vh] md:px-10">
      <div className="glow-violet pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative">
        <p className="eyebrow mb-8 text-muted-foreground" data-reveal>
          Scene 07 — The Finale
        </p>
        <RevealText lines={["Designed for", "presence."]} className="display display-md" />
        <div className="mt-12 flex flex-wrap gap-10" data-reveal>
          <Magnetic>
            <button type="button" onClick={onExplore} className="eyebrow link-film">
              Explore the Collection
            </button>
          </Magnetic>
          <Magnetic>
            <a href="mailto:hello@example.com" className="eyebrow link-film text-violet-soft">
              Contact
            </a>
          </Magnetic>
        </div>
      </div>
      <div className="relative">
        <img src={horseWhite} alt="" width={60} height={76} loading="lazy" className="mb-6 h-16 w-auto" data-reveal />
        <RevealText as="p" lines={["Mayank", "Chawla"]} className="display display-xl" />
        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 md:flex-row md:items-center md:justify-between">
          <ul className="flex gap-8">
            <li><a href="#contact" className="eyebrow link-film">Instagram</a></li>
            <li><a href="mailto:hello@example.com" className="eyebrow link-film">Contact</a></li>
            <li><a href="#journal" className="eyebrow link-film">Journal</a></li>
          </ul>
          <p className="eyebrow text-muted-foreground">© {new Date().getFullYear()} Mayank Chawla</p>
        </div>
      </div>
    </footer>
  );
}
