import { useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function getScrollProgress() {
  const el = document.getElementById('scroll-container');
  if (!el) return 0;
  const scrollTop = el.scrollTop;
  const sectionEnd = window.innerHeight * 3;
  return Math.max(0, Math.min(1, scrollTop / sectionEnd));
}

export default function CameraController() {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(10, 4, 10));
  const targetLookAt = useRef(new THREE.Vector3(0, 2, 0));

  useFrame(() => {
    const progress = getScrollProgress();

    // Smooth orbit around the model
    const angle = progress * Math.PI * 1.2 + 0.8;
    const radius = 12 - progress * 4;
    const height = 5 - progress * 2;

    const tx = Math.cos(angle) * radius;
    const tz = Math.sin(angle) * radius;
    const ty = height;

    targetPos.current.lerp(new THREE.Vector3(tx, ty, tz), 0.03);
    targetLookAt.current.lerp(new THREE.Vector3(0, 2 + progress * 1.5, 0), 0.03);

    camera.position.copy(targetPos.current);
    camera.lookAt(targetLookAt.current);
  });

  return null;
}
