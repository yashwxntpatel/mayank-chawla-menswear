import { journal } from "@/data/journal";
import { RevealText } from "./RevealText";

export function Journal() {
  return (
    <section id="journal" className="relative bg-ivory px-5 py-[16vh] text-ink md:px-10">
      <div className="mb-[8vh]">
        <p className="eyebrow mb-6 text-ink/60" data-reveal>
          Stories from the Atelier
        </p>
        <RevealText lines={["Journal"]} className="display display-lg" />
      </div>
      <div className="grid gap-14 md:grid-cols-3 md:gap-6">
        {journal.map((j, i) => (
          <a
            key={j.title}
            href={j.href}
            target="_blank"
            rel="noreferrer"
            className="group block md:[margin-top:var(--offset)]"
            style={{ ["--offset" as string]: `${i * 8}vh` }}
            data-cursor="Read"
          >
            <div className="overflow-hidden" data-mask>
              <img src={j.image} alt={j.title} loading="lazy" className="media-film aspect-[4/5] w-full object-cover object-top group-hover:scale-105" />
            </div>
            <div className="mt-5 border-t border-ink/15 pt-4" data-reveal>
              <p className="eyebrow text-ink/50">{j.tag}</p>
              <h3 className="mt-2 text-xl font-medium uppercase tracking-tight">{j.title}</h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
