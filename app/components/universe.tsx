"use client";

import { Html, Sparkles } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useSyncExternalStore } from "react";
import * as THREE from "three";
import type { Project } from "../page";
import type { CSSProperties } from "react";

type UniverseProps = {
  projects: Project[];
  onProjectSelect: (project: Project) => void;
};

function ParticleField({ count }: { count: number }) {
  const group = useRef<THREE.Group>(null);
  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);
    let seed = count * 17;
    const nextValue = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let index = 0; index < count; index += 1) {
      const radius = 4 + nextValue() * 12;
      const angle = nextValue() * Math.PI * 2;
      values[index * 3] = Math.cos(angle) * radius + (nextValue() - 0.5) * 4;
      values[index * 3 + 1] = (nextValue() - 0.5) * 12;
      values[index * 3 + 2] = Math.sin(angle) * radius - 5;
    }
    return values;
  }, [count]);

  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.getElapsedTime() * 0.012 + pointer.x * 0.035;
    group.current.rotation.x = pointer.y * 0.025;
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
        </bufferGeometry>
        <pointsMaterial color="#b4c6ff" size={0.018} sizeAttenuation transparent opacity={0.72} depthWrite={false} />
      </points>
      <Sparkles count={Math.floor(count / 8)} scale={[18, 12, 16]} size={1.5} speed={0.12} opacity={0.32} color="#c8d7ff" />
    </group>
  );
}

function CameraDrift() {
  const { camera, pointer } = useThree();
  const target = useRef(new THREE.Vector3());
  useFrame(() => {
    target.current.set(pointer.x * 0.42, pointer.y * 0.28, 8);
    camera.position.lerp(target.current, 0.025);
    camera.lookAt(0, 0, -4);
  });
  return null;
}

function ProjectNodes({ projects, onProjectSelect }: UniverseProps) {
  const nodePositions: [number, number, number][] = [
    [-3.6, 0.45, -2.2],
    [3.1, -0.7, -4.5],
    [0.6, 2.4, -7],
  ];

  return (
    <>
      {projects.map((project, index) => (
        <Html
          key={project.id}
          position={nodePositions[index]}
          center
          distanceFactor={7}
          zIndexRange={[1, 4]}
          className="project-node-html"
        >
          <button
            className="project-node"
            type="button"
            onClick={() => onProjectSelect(project)}
            style={{ "--signal-color": project.color } as CSSProperties}
            aria-label={`Open ${project.title} project`}
          >
            <span className="node-ring" />
            <span className="node-number">{project.index}</span>
            <strong>{project.title}</strong>
            <small>{project.type}</small>
            <span className="node-open"><ArrowUpRightIcon /></span>
          </button>
        </Html>
      ))}
    </>
  );
}

function ArrowUpRightIcon() {
  return <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 13 13 3M5 3h8v8" /></svg>;
}

export function Universe({ projects, onProjectSelect }: UniverseProps) {
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const lowPower = useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia("(max-width: 700px), (prefers-reduced-motion: reduce)");
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(max-width: 700px), (prefers-reduced-motion: reduce)").matches,
    () => false,
  );

  if (!mounted) return <div className="universe-fallback" aria-hidden="true" />;

  return (
    <div className="universe-canvas" aria-hidden="false">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 48 }}
        dpr={lowPower ? [1, 1] : [1, 1.6]}
        gl={{ antialias: !lowPower, alpha: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#050608"]} />
        <fog attach="fog" args={["#050608", 4, 17]} />
        <ParticleField count={lowPower ? 420 : 1400} />
        <ProjectNodes projects={projects} onProjectSelect={onProjectSelect} />
        <CameraDrift />
      </Canvas>
    </div>
  );
}
