import type { ElementType } from "react";
import { cn } from "@/lib/utils";

type Props = {
  lines: string[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  stagger?: number;
};

/** Masked line-by-line reveal; animated by [data-line] in scrollAnimations. */
export function RevealText({ lines, as: Tag = "h2", className, lineClassName, stagger = 0.08 }: Props) {
  return (
    <Tag className={className} aria-label={lines.join(" ")}>
      {lines.map((line, i) => (
        <span key={i} className={cn("block overflow-hidden pb-[0.06em]", lineClassName)} aria-hidden>
          <span data-line data-delay={i * stagger} className="block origin-bottom-left">
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
