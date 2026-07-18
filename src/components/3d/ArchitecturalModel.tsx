import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingPlane({
  position,
  rotation,
  args,
  color = '#b8b4ac',
  speed = 0.3,
  amplitude = 0.15,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  args: [number, number];
  color?: string;
  speed?: number;
  amplitude?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = initialY + Math.sin(state.clock.getElapsedTime() * speed) * amplitude;
    }
  });

  return (
    <mesh ref={ref} position={position} rotation={rotation} receiveShadow>
      <planeGeometry args={args} />
      <meshStandardMaterial
        color={color}
        roughness={0.9}
        metalness={0.05}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function WireframeBox({
  position,
  args,
  color = '#444',
}: {
  position: [number, number, number];
  args: [number, number, number];
  color?: string;
}) {
  const ref = useRef<THREE.LineSegments>(null);
  const initialY = position[1];

  const geometry = useMemo(() => {
    const geo = new THREE.BoxGeometry(args[0], args[1], args[2]);
    const edges = new THREE.EdgesGeometry(geo);
    return edges;
  }, [args]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = initialY + Math.sin(state.clock.getElapsedTime() * 0.2 + position[0]) * 0.08;
    }
  });

  return (
    <lineSegments ref={ref} position={position} geometry={geometry}>
      <lineBasicMaterial color={color} linewidth={1} />
    </lineSegments>
  );
}

function ConstructionLine({
  start,
  end,
  color = '#333',
}: {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
}) {
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const vertices = new Float32Array([...start, ...end]);
    geo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    return geo;
  }, [start, end]);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color={color} linewidth={1} />
    </lineSegments>
  );
}

function ThinSlab({
  position,
  rotation,
  args,
  color = '#a8a39b',
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  args: [number, number, number];
  color?: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = initialY + Math.sin(state.clock.getElapsedTime() * 0.15 + position[0] * 0.5) * 0.05;
    }
  });

  return (
    <mesh ref={ref} position={position} rotation={rotation} castShadow receiveShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} roughness={0.88} metalness={0.04} />
    </mesh>
  );
}

export default function ArchitecturalModel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.02;
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      {/* Ground grid */}
      <gridHelper args={[40, 40, '#1a1918', '#141312']} position={[0, -0.5, 0]} />

      {/* === CORE: Deconstructed Building Form === */}
      {/* Main vertical slab - the "spine" */}
      <ThinSlab
        position={[0, 2.5, 0]}
        rotation={[0, 0, 0]}
        args={[0.3, 5, 6]}
        color="#b8b4ac"
      />

      {/* Left wing - angled slab */}
      <ThinSlab
        position={[-2.5, 2, 0.5]}
        rotation={[0, 0.15, 0.08]}
        args={[4, 0.25, 5]}
        color="#c2bdb5"
      />

      {/* Right wing - tilted slab */}
      <ThinSlab
        position={[2.8, 1.8, -0.3]}
        rotation={[0.05, -0.1, -0.06]}
        args={[3.5, 0.2, 4.5]}
        color="#a8a39b"
      />

      {/* Upper floating plane */}
      <ThinSlab
        position={[0.5, 5.2, 0.2]}
        rotation={[0.08, 0.05, 0.03]}
        args={[6, 0.15, 5]}
        color="#b0aba3"
      />

      {/* Cantilevered element */}
      <ThinSlab
        position={[-3.5, 3.8, -1]}
        rotation={[0, 0.2, 0.12]}
        args={[3, 0.18, 2.5]}
        color="#c8c3bb"
      />

      {/* Lower platform */}
      <ThinSlab
        position={[1, 0.3, 1.5]}
        rotation={[0, -0.05, 0]}
        args={[7, 0.12, 8]}
        color="#2a2825"
      />

      {/* === WIREFRAMES: Defining Volume === */}
      <WireframeBox position={[-2, 2.5, 1]} args={[3.5, 4, 4]} color="#3a3835" />
      <WireframeBox position={[2.5, 2, -1]} args={[3, 3, 3.5]} color="#3d3b38" />
      <WireframeBox position={[0, 4, 0]} args={[5, 2, 4]} color="#333130" />

      {/* === CONSTRUCTION LINES: Structural Logic === */}
      {/* Vertical lines */}
      <ConstructionLine start={[-4, 0, 2]} end={[-4, 6, 2]} color="#252322" />
      <ConstructionLine start={[4, 0, -2]} end={[4, 5, -2]} color="#252322" />
      <ConstructionLine start={[0, 0, 3]} end={[0, 7, 3]} color="#252322" />

      {/* Horizontal lines */}
      <ConstructionLine start={[-5, 2, 0]} end={[5, 2, 0]} color="#1f1e1c" />
      <ConstructionLine start={[-4, 4, 1]} end={[4, 4, -1]} color="#1f1e1c" />

      {/* Diagonal tension lines */}
      <ConstructionLine start={[-3, 0, 2]} end={[2, 5, -1]} color="#2a2825" />
      <ConstructionLine start={[3, 0.5, -2]} end={[-1, 4.5, 2]} color="#2a2825" />

      {/* === ACCENT: Small geometric fragments === */}
      <mesh position={[-1.5, 3.5, 2]} rotation={[0.3, 0.5, 0.2]}>
        <tetrahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial color="#c0392b" roughness={0.7} metalness={0.1} />
      </mesh>

      <mesh position={[3, 4.2, 1.5]} rotation={[0.1, 0.8, 0]}>
        <octahedronGeometry args={[0.25, 0]} />
        <meshStandardMaterial color="#c0392b" roughness={0.7} metalness={0.1} />
      </mesh>

      <mesh position={[-3, 1.5, -2]} rotation={[0.4, 0.2, 0.6]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial color="#c0392b" roughness={0.7} metalness={0.1} />
      </mesh>
    </group>
  );
}
