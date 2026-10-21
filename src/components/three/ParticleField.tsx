import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { experience } from "@/lib/experience-state";

function createDotTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.35)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

export function ParticleField({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);
  const texture = useMemo(createDotTexture, []);
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const violet = new THREE.Color("#8b6cff");
    const pale = new THREE.Color("#d9d4ea");
    for (let i = 0; i < count; i++) {
      const r = 2.2 + Math.random() * 9;
      const th = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(th) * r;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = Math.sin(th) * r - 2;
      const c = Math.random() < 0.35 ? violet : pale;
      colors.set([c.r, c.g, c.b], i * 3);
    }
    return { positions, colors };
  }, [count]);

  useFrame((_, raw) => {
    const pts = points.current;
    if (!pts) return;
    const dt = Math.min(raw, 0.05);
    pts.rotation.y += dt * (0.015 + Math.abs(experience.velocity) * 0.0015);
    const ty = experience.progress * 4;
    pts.position.y += (ty - pts.position.y) * (1 - Math.exp(-2 * dt));
    pts.position.x += (experience.pointer.x * 0.35 - pts.position.x) * (1 - Math.exp(-1.5 * dt));
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        size={0.06}
        vertexColors
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}
