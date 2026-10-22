import { useFrame } from "@react-three/fiber";
import { experience } from "@/lib/experience-state";

/**
 * Scroll-scripted dolly: approach → orbit aside → retreat → return for the finale.
 * Keyframes are [progress, x, y, z].
 */
const KEYS: [number, number, number, number][] = [
  [0, 0, 0.2, 7.2],
  [0.18, 0.6, 0, 4.2],
  [0.4, -1.6, 0.6, 5.2],
  [0.7, 1.8, -0.4, 8.5],
  [0.92, 0, 0.1, 6.2],
  [1, 0, 0.2, 5.6],
];

function sample(p: number) {
  for (let i = 1; i < KEYS.length; i++) {
    const [p1, ...b] = KEYS[i]!;
    const [p0, ...a] = KEYS[i - 1]!;
    if (p <= p1) {
      const k = (p - p0) / (p1 - p0);
      const s = k * k * (3 - 2 * k);
      return a.map((v, j) => v + (b[j]! - v) * s);
    }
  }
  return KEYS[KEYS.length - 1]!.slice(1);
}

export function CameraController({ mobile }: { mobile: boolean }) {
  useFrame(({ camera }, raw) => {
    const dt = Math.min(raw, 0.05);
    const [x = 0, y = 0, z = 6] = sample(experience.progress);
    const ease = 1 - Math.exp(-(mobile ? 2.2 : 3) * dt);
    const tx = (mobile ? x * 0.4 : x) + experience.pointer.x * 0.25;
    const ty = y + experience.pointer.y * 0.15;
    const tz = mobile ? z + 2.2 : z;
    camera.position.x += (tx - camera.position.x) * ease;
    camera.position.y += (ty - camera.position.y) * ease;
    camera.position.z += (tz - camera.position.z) * ease;
    camera.lookAt(0, 0, 0);
  });
  return null;
}
