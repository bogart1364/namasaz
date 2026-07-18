export default function Lights() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[10, 15, 8]}
        intensity={1.2}
        color="#ffeedd"
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
