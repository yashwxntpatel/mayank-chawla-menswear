import { images } from "@/data/collections";
import { RevealText } from "./RevealText";

export function FormScene() {
  return (
    <section className="relative px-5 py-[18vh] md:px-10 md:py-[24vh]">
      <p className="eyebrow mb-10 text-muted-foreground" data-reveal>
        The House
      </p>
      <div className="relative grid gap-12 md:grid-cols-12 md:gap-6">
        <RevealText lines={["Form", "is language."]} className="display display-lg relative z-10 md:col-span-12" />
        <div className="md:col-span-5 md:col-start-2 md:mt-24" data-speed="0.15">
          <p className="copy max-w-sm" data-reveal>
            Sculpted tuxedos, regal bandhgalas and indowesterns, each one finished by hand in our Delhi atelier.
          </p>
        </div>
        <figure className="relative overflow-hidden md:col-span-5 md:col-start-8 md:-mt-[22vh]" data-mask data-cursor="View">
          <img
            src={images.form}
            alt="Crest indowestern by Mayank Chawla"
            loading="lazy"
            data-zoom
            className="media-film aspect-[3/4] w-full object-cover object-top"
          />
          <div className="veil-bottom absolute inset-x-0 bottom-0 h-1/3" />
          <figcaption className="eyebrow absolute bottom-5 left-5 text-foreground/80">Crest Indowestern</figcaption>
        </figure>
      </div>
    </section>
  );
}
