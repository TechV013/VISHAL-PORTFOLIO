"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type Obs = {
  id: string;
  category: string;
  title: string;
  status: string;
  detail: string;
  meta: string;
  color: string;
};

type Props = {
  items: Obs[];
  onSelect?: (id: string) => void;
  hovered?: string | null;
};

const PALETTE = [
  "#D4A857",
  "#5A8DEE",
  "#5BB58A",
  "#E07A8E",
  "#F0B860",
  "#A6843A",
  "#E8C887",
];

function ObsessionOrb({
  index,
  total,
  obs,
  hovered,
  setHovered,
  onSelect,
}: {
  index: number;
  total: number;
  obs: Obs;
  hovered: string | null;
  setHovered: (id: string | null) => void;
  onSelect: (id: string) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const initial = useMemo(() => {
    const t = (index / total) * Math.PI * 2;
    return {
      base: new THREE.Vector3(
        Math.cos(t) * (2.2 + (index % 2) * 0.4),
        (index - total / 2) * 0.35 + Math.sin(t) * 0.3,
        Math.sin(t) * (1.4 + (index % 3) * 0.3),
      ),
      phase: t,
    };
  }, [index, total]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const x = initial.base.x + Math.sin(t * 0.4 + initial.phase) * 0.18;
    const y = initial.base.y + Math.cos(t * 0.5 + initial.phase) * 0.12;
    const z = initial.base.z + Math.sin(t * 0.3 + initial.phase * 1.3) * 0.18;
    meshRef.current.position.set(x, y, z);
    if (glowRef.current) {
      glowRef.current.position.set(x, y, z);
    }
    const isHov = hovered === obs.id;
    const target = isHov ? 1.4 : 1;
    const s = (meshRef.current.scale.x + (target - meshRef.current.scale.x) * 0.1);
    meshRef.current.scale.setScalar(s);
    if (glowRef.current) {
      glowRef.current.scale.setScalar(s * (isHov ? 2.4 : 1.5));
    }
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(obs.id);
        }}
        onPointerOut={() => setHovered(null)}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(obs.id);
        }}
        scale={1}
      >
        <icosahedronGeometry args={[0.3, 2]} />
        <meshStandardMaterial
          color={obs.color}
          emissive={obs.color}
          emissiveIntensity={0.55}
          metalness={0.85}
          roughness={0.18}
        />
      </mesh>
      <mesh ref={glowRef} scale={1.5}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial
          color={obs.color}
          transparent
          opacity={0.06}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const n = 220;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 3 + Math.random() * 4;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(p) * Math.cos(t);
      arr[i * 3 + 1] = r * Math.sin(p) * Math.sin(t) * 0.6;
      arr[i * 3 + 2] = r * Math.cos(p);
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#D4A857"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function CameraDrift() {
  useFrame((state) => {
    state.camera.position.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.4;
    state.camera.position.y = Math.cos(state.clock.elapsedTime * 0.12) * 0.2;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export function ObsessionField({ items, onSelect }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);
  const hov = items.find((o) => o.id === hovered) || null;

  return (
    <div className="relative w-full overflow-hidden hairline bg-bg-2/30">
      <div className="absolute top-3 left-3 z-10 font-mono text-[9px] uppercase tracking-[0.2em] text-gold bg-bg/80 backdrop-blur-sm px-2 py-1">
        [ field.obsessions · n={items.length} ]
      </div>
      <div className="absolute top-3 right-3 z-10 font-mono text-[9px] uppercase tracking-[0.2em] text-cobalt bg-bg/80 backdrop-blur-sm px-2 py-1">
        drag · hover · click
      </div>
      <div className="absolute bottom-3 left-3 z-10 font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
        <span className="text-emerald">●</span> live · webgl
      </div>

      <div className="aspect-[16/9] w-full">
        <Canvas
          camera={{ position: [0, 0, 5.2], fov: 42 }}
          dpr={[1, 1.6]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[3, 2, 3]} intensity={1.2} color="#D4A857" />
          <pointLight position={[-3, -1.5, 1]} intensity={0.6} color="#5A8DEE" />
          <directionalLight position={[0, 4, 2]} intensity={0.4} color="#F4F1E8" />
          <CameraDrift />
          <ParticleField />
          {items.map((o, i) => (
            <ObsessionOrb
              key={o.id}
              index={i}
              total={items.length}
              obs={o}
              hovered={hovered}
              setHovered={setHovered}
              onSelect={(id) => onSelect?.(id)}
            />
          ))}
        </Canvas>
      </div>

      {/* Hover / selected overlay */}
      <div className="absolute bottom-3 right-3 z-10 max-w-xs glass-strong px-4 py-3 text-right">
        {hov ? (
          <>
            <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-dim">
              {hov.category}
            </div>
            <div className="font-display text-base text-ink leading-tight mt-0.5">
              {hov.title}
            </div>
            <div className="font-mono text-[10px] text-gold mt-1">
              {hov.status}
            </div>
          </>
        ) : (
          <>
            <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-dim">
              {items.length} running
            </div>
            <div className="font-display text-base text-ink-2 leading-tight mt-0.5">
              Hover or drag any orb to inspect.
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function ObsessionStatic({ items }: { items: Obs[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
      {items.map((o, i) => (
        <ObsessionItem key={o.id} index={i} obs={o} />
      ))}
    </div>
  );
}

function ObsessionItem({ index, obs }: { index: number; obs: Obs }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div
      className={`group relative ${mounted ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-dim mb-2 flex items-center gap-2">
        <span className="text-gold numeral">
          {String(0x1000 + index * 0x47).toUpperCase()}
        </span>
        <span className="text-dim">·</span>
        <span className="text-emerald">running</span>
      </div>
      <div className="flex items-center gap-3 mb-2">
        <span
          className="inline-flex h-7 w-7 items-center justify-center font-display text-xs text-bg"
          style={{ background: obs.color }}
        >
          {obs.category.charAt(0)}
        </span>
        <h4 className="font-display text-xl text-ink leading-tight">
          {obs.title}
        </h4>
      </div>
      <p className="font-mono text-[11px] text-gold leading-relaxed tracking-[0.04em]">
        {`> ${obs.status}`}
      </p>
      <p className="mt-2 text-sm text-ink-2 leading-relaxed font-display">
        {obs.detail}
      </p>
      <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
        {obs.meta}
      </div>
    </div>
  );
}

export type { Obs };
