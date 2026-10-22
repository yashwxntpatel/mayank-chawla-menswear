import { journal } from "@/data/journal";
import { RevealText } from "./RevealText";

export function Journal() {
  return (
    <section id="journal" className="relative px-5 py-[16vh] md:px-10">
      <div className="mb-[8vh] flex items-end justify-between">
        <RevealText lines={["Journal"]} className="display display-lg" />
        <p className="eyebrow text-muted-foreground" data-reveal>
          Scene 06
        </p>
      </div>
      <div className="grid gap-14 md:grid-cols-3 md:gap-6">
        {journal.map((j, i) => (
          <a key={j.index} href="#journal" className="group block" style={{ marginTop: `${i * 8}vh` }} data-cursor="Read">
            <div className="overflow-hidden" data-mask>
              <img
                src={j.image}
                alt={j.title}
                width={1200}
                height={1500}
                loading="lazy"
                className="media-film aspect-[4/5] w-full object-cover group-hover:scale-105"
              />
            </div>
            <div className="mt-5 flex items-baseline gap-4 border-t border-border pt-4" data-reveal>
              <span className="eyebrow text-violet-soft">{j.index}</span>
              <div>
                <h3 className="text-xl font-medium uppercase tracking-tight">{j.title}</h3>
                <p className="eyebrow mt-2 text-muted-foreground">{j.tag}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
