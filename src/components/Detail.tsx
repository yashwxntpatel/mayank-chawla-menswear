import { images } from "@/data/collections";
import horseBlack from "@/assets/horse-black.png";
import { RevealText } from "./RevealText";

const WORDS = ["Velvet", "Cutdana", "Silver Thread", "Silhouette", "Craft"];

export function Detail() {
  return (
    <section className="relative">
      <div className="relative h-[110svh] overflow-hidden" data-cursor="Discover">
        <img
          src={images.detail}
          alt="Hand embroidery detail on velvet"
          loading="lazy"
          data-zoom
          className="media-film absolute inset-0 h-full w-full object-cover"
        />
        <div className="veil-top absolute inset-x-0 top-0 h-1/3" />
        <div className="veil-bottom absolute inset-x-0 bottom-0 h-1/2" />
        <div className="absolute inset-0 flex flex-col justify-end px-5 pb-[12vh] md:px-10">
          <p className="eyebrow mb-6 text-muted-foreground" data-reveal>
            Craft &amp; Detail
          </p>
          <RevealText lines={["Look", "closer."]} className="display display-lg" />
        </div>
      </div>
      <div className="overflow-hidden border-y border-border bg-abyss py-8">
        <p className="display whitespace-nowrap text-[clamp(2.5rem,7vw,7rem)] text-muted-foreground/40" data-drift="1">
          {WORDS.join("  /  ")}  /  {WORDS.join("  /  ")}
        </p>
      </div>
      <div className="relative bg-ivory px-5 py-[16vh] text-ink md:px-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
          <img src={horseBlack} alt="Mayank Chawla horse emblem" width={80} height={100} loading="lazy" className="h-20 w-auto" data-reveal />
          <p className="text-[clamp(1.4rem,3vw,2.4rem)] font-medium leading-tight tracking-tight" data-reveal>
            Cutdana placed by hand. Silver thread traced across velvet. Embroidery that reveals itself only when you
            stand near enough to deserve it.
          </p>
        </div>
        <div className="mt-[10vh] grid grid-cols-3 gap-3 md:gap-6">
          {images.details.map((src, i) => (
            <div key={src} className="overflow-hidden" data-speed={String(0.05 + i * 0.05)}>
              <img src={src} alt="Embroidery detail" loading="lazy" className="media-film aspect-[3/4] w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
