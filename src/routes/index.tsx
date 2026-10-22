import { createFileRoute } from "@tanstack/react-router";
import { Experience } from "@/components/Experience";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mayank Chawla — Contemporary Indian Menswear" },
      { name: "description", content: "Mayank Chawla: contemporary Indian menswear. Form, fabric, presence." },
      { property: "og:title", content: "Mayank Chawla — Contemporary Indian Menswear" },
      { property: "og:description", content: "A cinematic journey through the Mayank Chawla collection." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Experience,
});
