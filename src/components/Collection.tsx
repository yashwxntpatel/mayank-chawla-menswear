import { collections } from "@/data/collections";
import horseGold from "@/assets/horse-gold.png";
import { RevealText } from "./RevealText";
import { cn } from "@/lib/utils";

export function Collection() {
  return (
    <section id="collection" className="relative px-5 py-[16vh] md:px-10">
      <div className="mb-[10vh]">
        <p className="eyebrow mb-6 text-muted-foreground" data-reveal>
          Signature Collections
        </p>
        <RevealText lines={["Three worlds.", "One signature."]} className="display display-lg" />
      </div>
      <div className="space-y-[14vh] md:space-y-[20vh]">
        {collections.map((c, i) => (
          <article key={c.title} className="group relative grid items-end gap-6 md:grid-cols-12">
            <figure
              className={cn("relative overflow-hidden md:col-span-6", i % 2 === 1 ? "md:col-start-7" : "md:col-start-1")}
              data-mask
              data-cursor="Explore"
            >
              <img
                src={c.image}
                alt={`${c.title} collection by Mayank Chawla`}
                loading="lazy"
                data-zoom
                className="media-film aspect-[3/4] w-full object-cover object-top group-hover:scale-[1.04]"
              />
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-1000 glow-violet group-hover:opacity-100" />
              <div className="veil-bottom absolute inset-x-0 bottom-0 h-1/3" />
            </figure>
            <div
              className={cn(
                "relative z-10 md:row-start-1 md:mb-16",
                i % 2 === 1 ? "md:col-span-5 md:col-start-1" : "md:col-span-5 md:col-start-8",
              )}
              data-reveal
            >
              <img src={horseGold} alt="" width={28} height={36} loading="lazy" className="h-9 w-auto" />
              <h3 className="display display-md mt-5 transition-transform duration-1000 ease-[var(--ease-film)] group-hover:translate-x-2">
                {c.title}
              </h3>
              <p className="copy mt-4 max-w-xs">{c.line}</p>
              <a href={c.href} target="_blank" rel="noreferrer" className="eyebrow link-film mt-6 inline-block">
                View Collection →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
