import detail from "@/assets/detail.jpg";
import horseBlack from "@/assets/horse-black.png";
import { RevealText } from "./RevealText";

const WORDS = ["Fabric", "Texture", "Construction", "Silhouette", "Craft"];

export function Detail() {
  return (
    <section className="relative">
      <div className="relative h-[110svh] overflow-hidden" data-cursor="Discover">
        <img
          src={detail}
          alt="Close-up of tonal embroidery on a charcoal lapel"
          width={1600}
          height={1008}
          loading="lazy"
          data-zoom
          className="media-film absolute inset-0 h-full w-full object-cover"
        />
        <div className="veil-top absolute inset-x-0 top-0 h-1/3" />
        <div className="veil-bottom absolute inset-x-0 bottom-0 h-1/2" />
        <div className="absolute inset-0 flex flex-col justify-end px-5 pb-[12vh] md:px-10">
          <p className="eyebrow mb-6 text-muted-foreground" data-reveal>
            Scene 04 — The Detail
          </p>
          <RevealText lines={["Closer,", "it speaks."]} className="display display-lg" />
        </div>
      </div>
      <div className="overflow-hidden border-y border-border py-8">
        <p className="display whitespace-nowrap text-[clamp(2.5rem,7vw,7rem)] text-muted-foreground/40" data-drift="1">
          {WORDS.join("  /  ")}  /  {WORDS.join("  /  ")}
        </p>
      </div>
      <div className="relative flex flex-col items-center gap-8 bg-ivory px-6 py-[16vh] text-center text-ink">
        <img src={horseBlack} alt="Mayank Chawla horse emblem" width={80} height={100} loading="lazy" className="h-20 w-auto" data-reveal />
        <p className="max-w-2xl text-[clamp(1.4rem,3vw,2.4rem)] font-medium leading-tight tracking-tight" data-reveal>
          Modern form, rooted in detail. Cut with precision, finished by hand, worn with quiet certainty.
        </p>
      </div>
    </section>
  );
}
