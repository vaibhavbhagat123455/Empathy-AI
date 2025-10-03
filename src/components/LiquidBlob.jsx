import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, MarchingCubes, MarchingCube, Sphere } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import * as THREE from "three";

const LiquidBlob = () => {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  // Smooth animation controls
  const { scale } = useSpring({
    scale: hovered ? 1.2 : 1,
    config: { mass: 1, tension: 120, friction: 14 },
  });

  useFrame(({ clock, mouse }) => {
    if (ref.current) {
      const time = clock.getElapsedTime();
      
      // Subtle shape shifting effect
      ref.current.rotation.y = time * 0.2;
      ref.current.rotation.x = Math.sin(time * 0.1) * 0.5;
      ref.current.scale.setScalar(scale.get());
      
      // Blob reacts to mouse movement
      ref.current.position.x = mouse.x * 0.5;
      ref.current.position.y = mouse.y * 0.5;
    }
  });

  return (
    <a.group ref={ref} scale={scale} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <MarchingCubes resolution={60} max={150} enableUvs enableColors>
        <MarchingCube position={[0, 0, 0]} scale={1.5} />
        <MarchingCube position={[0.8, 0.9, -0.3]} scale={0.7} />
        <MarchingCube position={[-0.7, -0.9, 0.5]} scale={0.6} />
        <Sphere args={[0.3, 32, 32]} position={[0.5, -0.5, 0.5]} />
        <Sphere args={[0.2, 32, 32]} position={[-0.5, 0.6, -0.4]} />
        <MeshTransmissionMaterial
          color={hovered ? "#D4AF37" : "#111"}
          roughness={0.05}
          thickness={2.5}
          transmission={0.95}
          ior={1.45}
          chromaticAberration={0.03}
          anisotropy={0.8}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </MarchingCubes>
    </a.group>
  );
};

const Scene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <LiquidBlob />
    </Canvas>
  );
};

export default Scene;
