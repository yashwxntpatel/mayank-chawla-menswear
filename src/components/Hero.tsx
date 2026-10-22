import { RevealText } from "./RevealText";
import { Magnetic } from "./Magnetic";

export function Hero({ onExplore }: { onExplore: () => void }) {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col justify-between px-5 pb-8 pt-28 md:px-10 md:pb-10 md:pt-32">
      <div className="flex items-start justify-between">
        <p className="eyebrow text-muted-foreground" data-reveal>
          Gurugram · New Delhi
        </p>
        <p className="eyebrow hidden text-right text-muted-foreground md:block" data-reveal>
          Form. Fabric.
          <br />
          Presence.
        </p>
      </div>

      <div className="pointer-events-none relative">
        <RevealText
          as="h1"
          lines={["Mayank", "Chawla"]}
          className="display display-xl"
          lineClassName="[&:nth-child(2)]:pl-[12vw] md:[&:nth-child(2)]:pl-[24vw]"
          stagger={0.12}
        />
      </div>

      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <RevealText
          as="p"
          lines={["Contemporary", "Indian Menswear"]}
          className="text-lg font-medium uppercase leading-tight tracking-tight md:text-2xl"
        />
        <div className="flex items-end justify-between gap-10 md:flex-col md:items-end" data-reveal>
          <Magnetic>
            <button type="button" onClick={onExplore} className="eyebrow link-film group flex items-center gap-4">
              Explore Collection
              <span className="inline-block h-px w-10 bg-violet-soft transition-all duration-700 group-hover:w-16" />
            </button>
          </Magnetic>
          <div className="flex items-center gap-3 text-muted-foreground">
            <span className="relative block h-10 w-px overflow-hidden bg-border">
              <span className="scroll-cue absolute inset-0 bg-foreground" />
            </span>
            <span className="eyebrow">Scroll</span>
          </div>
        </div>
      </div>
    </section>
  );
}
