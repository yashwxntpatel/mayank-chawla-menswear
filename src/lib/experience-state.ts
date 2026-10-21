/**
 * Mutable, render-free state shared between the DOM scroll layer and the
 * WebGL scene. Written by Lenis / pointer listeners, read inside useFrame.
 */
export const experience = {
  progress: 0,
  velocity: 0,
  pointer: { x: 0, y: 0 },
};
