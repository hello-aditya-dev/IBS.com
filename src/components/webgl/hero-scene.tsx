"use client";

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";

import { NetworkMesh } from "@/components/webgl/network-mesh";
import { ParticleField } from "@/components/webgl/particle-field";

export interface HeroSceneDensity {
  nodeCount?: number;
  radius?: number;
  connections?: number;
  rotationSpeed?: number;
  lineOpacity?: number;
  nodeEmissiveIntensity?: number;
  wireframeOpacity?: number;
  particleCount?: number;
  particleOpacity?: number;
  particleSpeed?: number;
}

/**
 * HeroScene — Three.js network visualization.
 *
 * Uses self-contained directional + ambient + rim lighting instead of
 * the external Environment preset, which required a runtime fetch from
 * raw.githack.com. This removes:
 * - The external network dependency
 * - The console error when the HDRI fetch fails
 * - The CSP noise for raw.githack.com
 * - The DNS/connection setup latency
 *
 * The visual appearance is preserved with multi-directional warm/cool
 * lighting that creates similar reflections and depth.
 *
 * When `active` is false (hero off-screen or page hidden), the frameloop
 * is set to "never" to avoid rendering invisible frames.
 */
export function HeroScene({ active = true, density = {} }: { active?: boolean; density?: HeroSceneDensity }) {
  const mouse = useRef({ x: 0, y: 0 });

  const {
    nodeCount,
    radius,
    connections,
    rotationSpeed,
    lineOpacity,
    nodeEmissiveIntensity,
    wireframeOpacity,
    particleCount,
    particleOpacity,
    particleSpeed,
  } = density;

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouse.current = {
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: -(((e.clientY - rect.top) / rect.height) * 2 - 1),
    };
  };

  // Device-aware DPR: capped at 1 on mobile, 1.25–1.5 on desktop
  const isMobile = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

  return (
    <div className="absolute inset-0" onPointerMove={handlePointerMove}>
      <Canvas
        dpr={isMobile ? 1 : [1, 1.5]}
        camera={{ position: [0, 0, 6.5], fov: 42 }}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: "high-performance",
        }}
        frameloop={active ? "always" : "never"}
      >
        {/* ── Self-contained lighting (no external environment map) ── */}
        <ambientLight intensity={0.9} />
        <directionalLight position={[3, 3, 4]} intensity={1} />
        <directionalLight position={[-4, -2, -2]} intensity={0.35} color="#F97316" />
        {/* Rim light for depth and warm reflections */}
        <directionalLight position={[0, 2, -4]} intensity={0.3} color="#FDBA74" />
        {/* Cool fill from below for contrast */}
        <pointLight position={[0, -3, 2]} intensity={0.2} color="#9CA3AF" />

        <NetworkMesh
          mouse={mouse}
          count={nodeCount}
          radius={radius}
          connections={connections}
          rotationSpeed={rotationSpeed}
          lineOpacity={lineOpacity}
          nodeEmissiveIntensity={nodeEmissiveIntensity}
          wireframeOpacity={wireframeOpacity}
        />
        <ParticleField count={particleCount} opacity={particleOpacity} speed={particleSpeed} />
      </Canvas>
    </div>
  );
}
