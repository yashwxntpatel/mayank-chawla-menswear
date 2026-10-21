import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { experience } from "@/lib/experience-state";

type DrapeSpec = {
  radius: number;
  height: number;
  arc: number;
  pleats: number;
  pleatDepth: number;
  twist: number;
  flare: number;
};

/** A pleated, twisted shell — a sculptural reading of a stand collar / drape. */
function createDrape(spec: DrapeSpec, segments: number) {
  const geo = new THREE.PlaneGeometry(1, 1, segments, Math.round(segments / 3));
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const u = pos.getX(i) + 0.5;
    const v = pos.getY(i) + 0.5;
    const fold = Math.sin(u * spec.pleats * Math.PI * 2) * spec.pleatDepth * (0.35 + v);
    const r = (spec.radius + fold) * (1 + (0.5 - v) * spec.flare);
    const angle = (u - 0.5) * spec.arc + spec.twist * (v - 0.5);
    pos.setXYZ(i, Math.sin(angle) * r, (v - 0.5) * spec.height, Math.cos(angle) * r);
  }
  geo.computeVertexNormals();
  return geo;
}

const LAYERS: (DrapeSpec & { rot: [number, number, number]; y: number })[] = [
  { radius: 1.05, height: 2.6, arc: Math.PI * 1.55, pleats: 7, pleatDepth: 0.07, twist: 0.9, flare: 0.35, rot: [0.08, 0, 0.05], y: 0 },
  { radius: 0.82, height: 2.1, arc: Math.PI * 1.25, pleats: 11, pleatDepth: 0.04, twist: -1.1, flare: 0.5, rot: [-0.05, 2.4, -0.08], y: 0.15 },
  { radius: 1.32, height: 1.1, arc: Math.PI * 0.9, pleats: 4, pleatDepth: 0.12, twist: 1.6, flare: -0.25, rot: [0.25, 4.1, 0.18], y: -0.75 },
];

export function FashionObject({ detail }: { detail: number }) {
  const group = useRef<THREE.Group>(null);
  const geometries = useMemo(() => LAYERS.map((l) => createDrape(l, detail)), [detail]);

  useFrame((state, raw) => {
    const g = group.current;
    if (!g) return;
    const dt = Math.min(raw, 0.05);
    const p = experience.progress;
    const t = state.clock.elapsedTime;
    g.rotation.y += dt * (0.12 + Math.min(Math.abs(experience.velocity) * 0.004, 0.6));
    const targetX = 0.18 + p * 1.1 + experience.pointer.y * 0.08;
    const targetZ = Math.sin(p * Math.PI) * 0.35 + experience.pointer.x * 0.06;
    g.rotation.x += (targetX - g.rotation.x) * (1 - Math.exp(-3 * dt));
    g.rotation.z += (targetZ - g.rotation.z) * (1 - Math.exp(-3 * dt));
    g.position.y = Math.sin(t * 0.5) * 0.06;
  });

  return (
    <group ref={group}>
      {LAYERS.map((l, i) => (
        <mesh key={i} geometry={geometries[i]} rotation={l.rot} position-y={l.y}>
          <meshPhysicalMaterial
            color={i === 1 ? "#2a2633" : "#16151b"}
            metalness={1}
            roughness={i === 2 ? 0.32 : 0.16}
            clearcoat={1}
            clearcoatRoughness={0.12}
            envMapIntensity={1.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}
