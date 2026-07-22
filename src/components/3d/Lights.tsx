export default function Lights() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[10, 15, 8]}
        intensity={1.2}
        color="#ffeedd"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
        shadow-bias={-0.0001}
      />
      <directionalLight
        position={[-8, 10, -6]}
        intensity={0.4}
        color="#ddeeff"
      />
      <hemisphereLight args={['#b1a99a', '#1a1916', 0.25]} />
    </>
  );
}
