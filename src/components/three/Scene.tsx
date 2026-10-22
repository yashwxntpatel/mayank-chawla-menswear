import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo } from "react";
import { FashionObject } from "./FashionObject";
import { ParticleField } from "./ParticleField";
import { Lighting } from "./Lighting";
import { CameraController } from "./CameraController";

function getTier() {
  const w = window.innerWidth;
  if (w < 768) return { mobile: true, particles: 450, detail: 90, dpr: [1, 1.4] as [number, number] };
  if (w < 1200) return { mobile: false, particles: 900, detail: 140, dpr: [1, 1.6] as [number, number] };
  return { mobile: false, particles: 1600, detail: 200, dpr: [1, 2] as [number, number] };
}

export default function Scene() {
  const tier = useMemo(getTier, []);
  return (
    <Canvas
      dpr={tier.dpr}
      camera={{ position: [0, 0.2, 7.2], fov: 35 }}
      gl={{ antialias: !tier.mobile, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#050507"]} />
      <fog attach="fog" args={["#050507", 7, 18]} />
      <Suspense fallback={null}>
        <Lighting />
        <group scale={tier.mobile ? 0.72 : 1}><FashionObject detail={tier.detail} /></group>
      </Suspense>
      <ParticleField count={tier.particles} />
      <CameraController mobile={tier.mobile} />
    </Canvas>
  );
}
