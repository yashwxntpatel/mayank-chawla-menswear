import { collections } from "@/data/collections";
import { RevealText } from "./RevealText";
import { cn } from "@/lib/utils";

export function Collection() {
  return (
    <section id="collection" className="relative px-5 py-[16vh] md:px-10">
      <div className="mb-[10vh] flex items-end justify-between gap-6">
        <RevealText lines={["The", "Collection"]} className="display display-lg" />
        <p className="eyebrow hidden text-muted-foreground md:block" data-reveal>
          Scene 03
        </p>
      </div>
      <div className="space-y-[14vh] md:space-y-[20vh]">
        {collections.map((c, i) => (
          <article
            key={c.index}
            className={cn("group relative grid items-end gap-6 md:grid-cols-12", i % 2 === 1 && "md:[&>figure]:col-start-4")}
          >
            <figure className="relative overflow-hidden md:col-span-9" data-mask data-cursor="Explore">
              <img
                src={c.image}
                alt={`${c.title} collection campaign image`}
                width={1600}
                height={1104}
                loading="lazy"
                data-zoom
                className="media-film aspect-[4/5] w-full object-cover group-hover:scale-[1.04] md:aspect-[16/10]"
              />
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-1000 glow-violet group-hover:opacity-100" />
              <div className="veil-bottom absolute inset-x-0 bottom-0 h-1/2" />
              <span className="display text-outline absolute -bottom-[0.12em] right-3 text-[clamp(6rem,22vw,20rem)]">
                {c.index}
              </span>
            </figure>
            <div
              className={cn(
                "relative z-10 md:col-span-4 md:row-start-1 md:mb-12",
                i % 2 === 1 ? "md:col-start-1" : "md:col-start-9",
              )}
              data-reveal
            >
              <p className="eyebrow text-violet-soft">{c.index}</p>
              <h3 className="display display-md mt-3 transition-transform duration-1000 ease-[var(--ease-film)] group-hover:translate-x-2">
                {c.title}
              </h3>
              <p className="copy mt-4 max-w-xs">{c.line}</p>
              <a href="#contact" className="eyebrow link-film mt-6 inline-block">
                View Collection →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
