import { Canvas } from '@react-three/fiber';
import Lights from './Lights';
import ArchitecturalModel from './ArchitecturalModel';
import CameraController from './CameraController';

export default function Scene() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        gl={{ antialias: true, alpha: false }}
        camera={{ position: [10, 4, 10], fov: 40 }}
        dpr={[1, 1.5]}
        style={{ width: '100%', height: '100%' }}
      >
        <color attach="background" args={['#0a0a0a']} />
        <fog attach="fog" args={['#0a0a0a', 12, 35]} />
        <Lights />
        <ArchitecturalModel />
        <CameraController />
      </Canvas>
    </div>
  );
}
