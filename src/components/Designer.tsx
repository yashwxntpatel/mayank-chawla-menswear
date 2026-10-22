import portrait from "@/assets/designer.jpg";
import horseGold from "@/assets/horse-gold.png";
import { RevealText } from "./RevealText";

export function Designer() {
  return (
    <section id="designer" className="relative grid gap-12 px-5 py-[18vh] md:grid-cols-12 md:gap-6 md:px-10">
      <figure className="relative overflow-hidden md:col-span-5" data-mask data-cursor="View">
        <img
          src={portrait}
          alt="Hands pinning black wool on a tailor's form in the atelier"
          width={1200}
          height={1600}
          loading="lazy"
          data-zoom
          className="media-film aspect-[3/4] w-full object-cover"
        />
      </figure>
      <div className="flex flex-col justify-between md:col-span-6 md:col-start-7">
        <div>
          <p className="eyebrow text-muted-foreground" data-reveal>
            Scene 05 — The Designer
          </p>
          <RevealText lines={["Mayank", "Chawla"]} className="display display-lg mt-8" />
        </div>
        <div className="mt-16 max-w-md space-y-6" data-speed="0.1">
          <p className="copy" data-reveal>
            A contemporary Indian menswear label shaped by architecture, tailoring and the discipline of detail.
          </p>
          <p className="copy text-muted-foreground/70" data-reveal>
            [Designer biography — add Mayank's own words here.]
          </p>
          <img src={horseGold} alt="" width={48} height={60} loading="lazy" className="h-14 w-auto" data-reveal />
        </div>
      </div>
    </section>
  );
}
