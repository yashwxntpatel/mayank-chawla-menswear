import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { experience } from "@/lib/experience-state";

export function Lighting() {
  const key = useRef<THREE.PointLight>(null);
  const rim = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const p = experience.progress;
    const t = state.clock.elapsedTime;
    if (key.current) {
      key.current.position.set(Math.cos(p * Math.PI * 2 + t * 0.1) * 4, 2 - p * 3, 3);
      key.current.intensity = 26 + Math.sin(p * Math.PI) * 18;
    }
    if (rim.current) rim.current.position.set(-3 + experience.pointer.x, 3, -3);
  });

  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight ref={key} color="#7357ff" intensity={30} distance={14} />
      <pointLight ref={rim} color="#e8e4ff" intensity={14} distance={10} />
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={3} color="#ffffff" position={[0, 5, -2]} scale={[8, 1.2, 1]} rotation-x={Math.PI / 2} />
        <Lightformer form="rect" intensity={4} color="#7357ff" position={[-5, 0, 1]} scale={[1, 8, 1]} rotation-y={Math.PI / 2} />
        <Lightformer form="rect" intensity={2.5} color="#a48bff" position={[5, 1, -1]} scale={[1, 6, 1]} rotation-y={-Math.PI / 2} />
        <Lightformer form="ring" intensity={1.5} color="#ffffff" position={[0, 0, 6]} scale={3} />
      </Environment>
    </>
  );
}
