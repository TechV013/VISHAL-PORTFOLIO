"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * HeroScene — "The Architecture"
 *
 * A 3D system diagram that reflects the work:
 *   - Central core  → the ML/decision layer (cognitive monitoring)
 *   - Outer nodes   → the services (room booking's API, DB, payments, etc.)
 *   - Edges         → the data flow between them
 *   - Wireframe     → the underlying signal/data plane
 *
 * Camera slow-orbits and pulls back slightly with scroll.
 */

const GOLD = new THREE.Color("#D4A857");
const GOLD_BRIGHT = new THREE.Color("#E8C887");
const COBALT = new THREE.Color("#5A8DEE");

// Pre-defined node positions — 6 services in a hexagonal arrangement
const NODE_COUNT = 6;
const NODE_RADIUS = 1.7;
const NODES = Array.from({ length: NODE_COUNT }).map((_, i) => {
  const t = (i / NODE_COUNT) * Math.PI * 2;
  return {
    base: new THREE.Vector3(
      Math.cos(t) * NODE_RADIUS,
      Math.sin(t * 2) * 0.35,
      Math.sin(t) * NODE_RADIUS,
    ),
    label: ["API", "WEB", "ML", "DB", "AUTH", "JOB"][i] ?? "SVC",
  };
});

/* ─────────────────────────────────────────────────────────────
 * Central core — pulsing gold sphere (the "brain")
 * ───────────────────────────────────────────────────────────── */
function Core() {
  const ref = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime;
      const pulse = 1 + Math.sin(t * 1.5) * 0.08;
      ref.current.scale.setScalar(pulse);
      ref.current.rotation.y = t * 0.2;
      ref.current.rotation.x = t * 0.1;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.4;
      ringRef.current.rotation.x = Math.PI / 2;
    }
  });
  return (
    <group>
      <mesh ref={ref}>
        <icosahedronGeometry args={[0.32, 2]} />
        <meshStandardMaterial
          color={GOLD_BRIGHT}
          emissive={GOLD}
          emissiveIntensity={0.6}
          metalness={0.9}
          roughness={0.18}
        />
      </mesh>
      <mesh ref={ringRef}>
        <torusGeometry args={[0.55, 0.012, 12, 64]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────
 * Service node — small gold cube that bobs
 * ───────────────────────────────────────────────────────────── */
function ServiceNode({
  base,
  index,
}: {
  base: THREE.Vector3;
  index: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.x = base.x + Math.cos(t * 0.4 + index) * 0.06;
    ref.current.position.y = base.y + Math.sin(t * 0.6 + index * 1.3) * 0.12;
    ref.current.position.z = base.z + Math.sin(t * 0.4 + index) * 0.06;
    ref.current.rotation.x = t * 0.15 + index;
    ref.current.rotation.y = t * 0.2 + index;
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.18, 0.18, 0.18]} />
      <meshStandardMaterial
        color={GOLD}
        emissive={GOLD}
        emissiveIntensity={0.35}
        metalness={0.85}
        roughness={0.25}
      />
    </mesh>
  );
}

/* ─────────────────────────────────────────────────────────────
 * Edges — lines from core to each service, plus ring edges
 * ───────────────────────────────────────────────────────────── */
function Edges() {
  const groupRef = useRef<THREE.Group>(null);
  const lineMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: GOLD,
        transparent: true,
        opacity: 0.35,
      }),
    [],
  );
  const cobaltMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: COBALT,
        transparent: true,
        opacity: 0.45,
      }),
    [],
  );

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  // Core-to-service edges
  const coreLines = NODES.map((n, i) => {
    const geom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      n.base,
    ]);
    return { geom, key: `core-${i}` };
  });

  // Ring edges between adjacent services
  const ringLines = NODES.map((n, i) => {
    const next = NODES[(i + 1) % NODES.length];
    const geom = new THREE.BufferGeometry().setFromPoints([n.base, next.base]);
    return { geom, key: `ring-${i}` };
  });

  return (
    <group ref={groupRef}>
      {coreLines.map((l) => (
        // eslint-disable-next-line react/no-unknown-property
        <primitive key={l.key} object={new THREE.Line(l.geom, lineMaterial)} />
      ))}
      {ringLines.map((l) => (
        // eslint-disable-next-line react/no-unknown-property
        <primitive
          key={l.key}
          object={new THREE.Line(l.geom, cobaltMaterial)}
        />
      ))}
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────
 * Signal plane — wireframe surface rippling with noise (the data layer)
 * ───────────────────────────────────────────────────────────── */
function SignalPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geom = useMemo(() => {
    const g = new THREE.PlaneGeometry(7, 7, 32, 32);
    g.rotateX(-Math.PI / 2);
    return g;
  }, []);
  const basePositions = useMemo(() => {
    return geom.attributes.position.array.slice();
  }, [geom]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const arr = meshRef.current.geometry.attributes.position
      .array as Float32Array;
    for (let i = 0; i < arr.length; i += 3) {
      const x = basePositions[i];
      const z = basePositions[i + 2];
      const wave =
        Math.sin(x * 0.6 + t * 0.8) * 0.18 +
        Math.cos(z * 0.5 + t * 0.6) * 0.18 +
        Math.sin((x + z) * 0.4 + t * 0.5) * 0.1;
      arr[i + 1] = wave - 1.4;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} geometry={geom}>
      <meshBasicMaterial
        color={GOLD}
        wireframe
        transparent
        opacity={0.18}
      />
    </mesh>
  );
}

/* ─────────────────────────────────────────────────────────────
 * Grid floor — far below the architecture
 * ───────────────────────────────────────────────────────────── */
function GridFloor() {
  return (
    <gridHelper
      args={[20, 40, GOLD, new THREE.Color("#1B2C4A")]}
      position={[0, -2.6, 0]}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
 * Rising particles — gold dust streaming up through the network
 * ───────────────────────────────────────────────────────────── */
function Particles({ count = 140 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const data = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = Math.random() * 1.8;
      const a = Math.random() * Math.PI * 2;
      arr[i * 3] = Math.cos(a) * r;
      arr[i * 3 + 1] = -1.2 + Math.random() * 3.5;
      arr[i * 3 + 2] = Math.sin(a) * r;
      speeds[i] = 0.15 + Math.random() * 0.25;
    }
    return { arr, speeds };
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const arr = (ref.current.geometry.attributes.position as THREE.BufferAttribute)
      .array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += data.speeds[i] * delta;
      if (arr[i * 3 + 1] > 2.4) {
        arr[i * 3 + 1] = -1.4;
        const r = Math.random() * 1.8;
        const a = Math.random() * Math.PI * 2;
        arr[i * 3] = Math.cos(a) * r;
        arr[i * 3 + 2] = Math.sin(a) * r;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[data.arr, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color={GOLD_BRIGHT}
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ─────────────────────────────────────────────────────────────
 * Camera — slow orbit + pull-back on scroll
 * ───────────────────────────────────────────────────────────── */
function CameraRig() {
  const camera = useThree((s) => s.camera);
  const target = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      target.current = Math.min(window.scrollY, window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const s = target.current;
    const radius = 4.6;
    const camY = 1.4 - s * 0.0004;
    camera.position.x = Math.sin(t * 0.08) * radius;
    camera.position.z = Math.cos(t * 0.08) * radius;
    camera.position.y = camY;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ─────────────────────────────────────────────────────────────
 * Entry
 * ───────────────────────────────────────────────────────────── */
export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 1.4, 4.6], fov: 42 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.35} />
      <pointLight position={[3, 3, 3]} intensity={1.3} color="#E8C887" />
      <pointLight position={[-3, -1, 2]} intensity={0.5} color="#5A8DEE" />
      <directionalLight position={[2, 4, 2]} intensity={0.35} color="#F4F1E8" />
      <CameraRig />
      <GridFloor />
      <SignalPlane />
      <Edges />
      <Core />
      {NODES.map((n, i) => (
        <ServiceNode key={i} base={n.base} index={i} />
      ))}
      <Particles />
    </Canvas>
  );
}

export function HeroSceneFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 400 240"
        className="w-full max-w-[480px]"
        aria-hidden
      >
        <defs>
          <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#D4A857" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#E8C887" />
            <stop offset="100%" stopColor="#5A8DEE" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        {/* Center core */}
        <circle cx="200" cy="120" r="18" fill="#E8C887" />
        <circle cx="200" cy="120" r="28" fill="none" stroke="#D4A857" strokeWidth="1" />
        <circle cx="200" cy="120" r="40" fill="none" stroke="#D4A857" strokeWidth="0.6" opacity="0.5" />
        {/* Service nodes */}
        {[
          [80, 80],
          [320, 80],
          [60, 160],
          [340, 160],
          [140, 50],
          [260, 50],
        ].map(([x, y], i) => (
          <g key={i}>
            <line
              x1="200"
              y1="120"
              x2={x}
              y2={y}
              stroke="url(#line)"
              strokeWidth="0.8"
            />
            <rect
              x={x - 7}
              y={y - 7}
              width="14"
              height="14"
              fill="none"
              stroke="#D4A857"
              strokeWidth="1.2"
            />
            <rect
              x={x - 4}
              y={y - 4}
              width="8"
              height="8"
              fill="#D4A857"
              opacity="0.6"
            />
          </g>
        ))}
        {/* Signal mesh at bottom */}
        <path
          d="M 20 220 Q 80 200 140 215 T 260 210 T 380 218"
          fill="none"
          stroke="#D4A857"
          strokeWidth="1.2"
          opacity="0.6"
        />
        <path
          d="M 20 230 Q 80 215 140 225 T 260 222 T 380 228"
          fill="none"
          stroke="#5A8DEE"
          strokeWidth="0.8"
          opacity="0.4"
        />
      </svg>
    </div>
  );
}
