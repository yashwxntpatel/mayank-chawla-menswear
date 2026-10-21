import formImage from "@/assets/form.jpg";
import { RevealText } from "./RevealText";

export function FormScene() {
  return (
    <section className="relative px-5 py-[18vh] md:px-10 md:py-[24vh]">
      <p className="eyebrow mb-10 text-muted-foreground" data-reveal>
        Scene 02 — The Form
      </p>
      <div className="relative grid gap-12 md:grid-cols-12 md:gap-6">
        <RevealText lines={["Form", "is language."]} className="display display-lg relative z-10 md:col-span-12" />
        <div className="md:col-span-5 md:col-start-2 md:mt-24" data-speed="0.15">
          <p className="copy max-w-sm" data-reveal>
            Every garment begins as structure — a line held, a seam placed, a collar that decides how a man stands.
            Indian in its roots, contemporary in its cut.
          </p>
        </div>
        <figure
          className="relative overflow-hidden md:col-span-5 md:col-start-8 md:-mt-[22vh]"
          data-mask
          data-cursor="View"
        >
          <img
            src={formImage}
            alt="Man in a black bandhgala standing in a dark concrete space"
            width={1200}
            height={1600}
            loading="lazy"
            data-zoom
            className="media-film aspect-[3/4] w-full object-cover"
          />
          <div className="veil-bottom absolute inset-x-0 bottom-0 h-1/3" />
          <figcaption className="eyebrow absolute bottom-5 left-5 text-foreground/80">Look 01 — Bandhgala</figcaption>
        </figure>
      </div>
    </section>
  );
}
