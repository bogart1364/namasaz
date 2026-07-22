import { useRef, useCallback } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const _targetPos = new THREE.Vector3();
const _targetLookAt = new THREE.Vector3();

function getScrollProgress() {
  const el = document.getElementById('scroll-container');
  if (!el) return 0;
  const scrollTop = el.scrollTop;
  const sectionEnd = window.innerHeight * 3;
  return Math.max(0, Math.min(1, scrollTop / sectionEnd));
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function CameraController() {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(10, 4, 10));
  const targetLookAt = useRef(new THREE.Vector3(0, 2, 0));
  const currentProgress = useRef(0);

  const update = useCallback(() => {
    const progress = getScrollProgress();
    // Smooth the progress to avoid jitter
    currentProgress.current += (progress - currentProgress.current) * 0.08;
    const p = currentProgress.current;
    const eased = easeInOutCubic(p);

    // Camera orbit path
    const angle = eased * Math.PI * 1.2 + 0.8;
    const radius = 12 - eased * 4;
    const height = 5 - eased * 2;

    _targetPos.set(
      Math.cos(angle) * radius,
      height,
      Math.sin(angle) * radius,
    );
    _targetLookAt.set(0, 2 + eased * 1.5, 0);

    // Smoother lerp factor
    targetPos.current.lerp(_targetPos, 0.05);
    targetLookAt.current.lerp(_targetLookAt, 0.05);

    camera.position.copy(targetPos.current);
    camera.lookAt(targetLookAt.current);
  }, [camera]);

  useFrame(update);

  return null;
}
