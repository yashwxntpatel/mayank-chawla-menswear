<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- The WebGL scene (src/components/three) is a fixed background lazy-loaded client-side and reads scroll/pointer from src/lib/experience-state.ts; DOM motion is declared via data-* attributes handled in src/animations/scrollAnimations.ts — keeps 3D and DOM decoupled and SSR-safe.
