import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Lights from './Lights';
import ArchitecturalModel from './ArchitecturalModel';
import CameraController from './CameraController';

function SceneLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-10">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border border-neutral-600 border-t-white rounded-full animate-spin" />
        <span className="text-[10px] tracking-[0.3em] text-neutral-500 font-mono">LOADING</span>
      </div>
    </div>
  );
}

export default function Scene() {
  return (
    <div className="fixed inset-0 z-0">
      <SceneLoader />
      <Canvas
        shadows
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        camera={{ position: [10, 4, 10], fov: 40 }}
        dpr={[1, 1.5]}
        style={{ width: '100%', height: '100%' }}
      >
        <color attach="background" args={['#0a0a0a']} />
        <fog attach="fog" args={['#0a0a0a', 12, 35]} />
        <Suspense fallback={null}>
          <Lights />
          <ArchitecturalModel />
          <CameraController />
        </Suspense>
      </Canvas>
    </div>
  );
}
