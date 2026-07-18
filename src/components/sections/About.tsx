import { motion, useScroll } from 'framer-motion';
import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useLang } from '../../i18n/LanguageContext';

function FloatingVolume() {
  const groupRef = useRef<THREE.Group>(null);
  const slab1 = useRef<THREE.Mesh>(null);
  const slab2 = useRef<THREE.Mesh>(null);
  const slab3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) groupRef.current.rotation.y = t * 0.08;
    if (slab1.current) {
      slab1.current.position.y = 1.2 + Math.sin(t * 0.5) * 0.3;
      slab1.current.rotation.z = Math.sin(t * 0.3) * 0.05;
    }
    if (slab2.current) {
      slab2.current.position.y = 0.4 + Math.sin(t * 0.4 + 1) * 0.2;
      slab2.current.rotation.x = Math.sin(t * 0.25) * 0.04;
    }
    if (slab3.current) {
      slab3.current.position.y = 2.2 + Math.sin(t * 0.35 + 2) * 0.25;
      slab3.current.rotation.z = Math.sin(t * 0.2 + 1) * 0.06;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      <mesh position={[0, -0.1, 0]}><cylinderGeometry args={[3, 3.5, 0.1, 32]} /><meshStandardMaterial color="#141312" roughness={0.95} metalness={0.02} /></mesh>
      <mesh ref={slab1} position={[0, 1.2, 0]}><boxGeometry args={[0.2, 3, 2.5]} /><meshStandardMaterial color="#b8b4ac" roughness={0.88} metalness={0.04} /></mesh>
      <mesh ref={slab2} position={[0.8, 0.4, 0.3]}><boxGeometry args={[2.5, 0.15, 2]} /><meshStandardMaterial color="#c2bdb5" roughness={0.9} metalness={0.03} /></mesh>
      <mesh ref={slab3} position={[-0.5, 2.2, -0.2]}><boxGeometry args={[2, 0.12, 1.8]} /><meshStandardMaterial color="#a8a39b" roughness={0.88} metalness={0.04} /></mesh>
      <lineSegments position={[0, 1.2, 0]}><edgesGeometry args={[new THREE.BoxGeometry(2.5, 4, 3)]} /><lineBasicMaterial color="#2a2825" /></lineSegments>
      <mesh position={[1.2, 2.8, 0.5]} rotation={[0.3, 0.5, 0.2]}><tetrahedronGeometry args={[0.2, 0]} /><meshStandardMaterial color="#c0392b" roughness={0.7} metalness={0.1} /></mesh>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[new Float32Array([-2,0,1,-2,3.5,1,2,0,-1,2,3,-1,-1,0,2,1.5,2.5,-1.5]), 3]} count={6} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#1f1e1c" />
      </lineSegments>
    </group>
  );
}

function AboutScene() {
  return (
    <Canvas gl={{ antialias: true, alpha: true }} camera={{ position: [4, 3, 5], fov: 35 }} dpr={[1, 1.5]} style={{ width: '100%', height: '100%' }}>
      <color attach="background" args={['#0a0a0a']} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 8, 5]} intensity={1} color="#ffeedd" />
      <directionalLight position={[-4, 6, -3]} intensity={0.3} color="#ddeeff" />
      <Suspense fallback={null}><FloatingVolume /></Suspense>
    </Canvas>
  );
}

export default function About() {
  const { t, align } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  useScroll({ target: sectionRef, offset: ['start end', 'end start'] });

  return (
    <section id="about" ref={sectionRef} className="relative w-full bg-[#0a0a0a] z-20 overflow-hidden">
      {/* 3D Volume Section */}
      <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
        <div className="absolute inset-0"><AboutScene /></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="text-center px-6 max-w-3xl">
            <span className="text-[10px] tracking-[0.3em] text-neutral-400 block mb-5 font-mono">{t.about.label}</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extralight text-white tracking-tight mb-6 leading-[1.3]">
              {t.about.title1} <span className="text-[#c0392b]">{t.about.titleHighlight1}</span> {t.about.title2} <span className="text-[#c0392b]">{t.about.titleHighlight2}</span> {t.about.title3}
            </h2>
            <div className="w-16 h-[1px] bg-[#c0392b] mx-auto mb-6" />
            <p className="text-neutral-400 text-sm leading-[2] max-w-lg mx-auto font-light">{t.about.desc}</p>
          </motion.div>
        </div>
        <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-white/15" />
        <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-white/15" />
        <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-white/15" />
        <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-white/15" />
        <div className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
          <span className="text-[9px] tracking-[0.4em] text-white/20 font-mono">EST. 2018 — TEHRAN</span>
        </div>
      </div>

      {/* About Text + Stats */}
      <div className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Text */}
            <div className="order-1">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }}>
                <span className="text-[10px] tracking-[0.25em] text-neutral-500 block mb-4 font-mono uppercase">{t.about.aboutLabel}</span>
                <h2 className="text-3xl md:text-4xl font-extralight text-white tracking-tight mb-8">
                  {t.about.studioName}
                  <span className="block text-base text-neutral-500 mt-2 font-light">{t.about.studioSub}</span>
                </h2>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, delay: 0.15 }} className="space-y-4">
                {[t.about.p1, t.about.p2, t.about.p3].map((p, i) => (
                  <p key={i} className="text-neutral-400 text-sm leading-[2] font-light">{p}</p>
                ))}
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} className="mt-8 p-6 border border-neutral-800/30 bg-neutral-900/20">
                <p className="text-neutral-300 text-sm leading-[2.5] font-light italic text-center">
                  {t.about.poem1}<br />{t.about.poem2}
                </p>
                <span className="block text-[10px] text-neutral-600 mt-3 text-center font-mono">{t.about.poemAuthor}</span>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, delay: 0.35 }} className="mt-8">
                <span className="text-[10px] tracking-[0.25em] text-neutral-500 block mb-4 font-mono uppercase">{t.about.servicesLabel}</span>
                <div className="space-y-0">
                  {t.about.services.map((service, i) => (
                    <div key={i} className={`flex items-center justify-between py-2.5 border-b border-neutral-800/40 group cursor-pointer ${align}`}>
                      <span className="text-sm text-neutral-300 group-hover:text-white transition-colors font-light">{service.title}</span>
                      <span className="text-[10px] text-neutral-600 group-hover:text-neutral-400 transition-colors font-mono">{service.en}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Stats */}
            <div className="flex flex-col justify-center order-2">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, delay: 0.2 }}>
                <div className="grid grid-cols-2 gap-3">
                  {t.about.stats.map((stat, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1 }} className="text-center p-5 border border-neutral-800/20 hover:border-neutral-700/40 transition-colors">
                      <span className="text-2xl md:text-3xl font-extralight text-white block mb-1">{stat.number}</span>
                      <span className="text-[10px] text-neutral-500 font-light">{stat.label}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 p-6 border border-neutral-800/20">
                  <span className="text-[10px] tracking-[0.25em] text-neutral-500 block mb-4 font-mono uppercase">{t.about.contactLabel}</span>
                  <div className="space-y-0">
                    {[
                      ...t.about.phones.map((p) => ({ label: t.about.phone, value: p, dir: 'ltr' as const })),
                      { label: t.about.email, value: t.about.emailValue, dir: 'ltr' as const },
                      { label: t.about.address, value: t.about.addressValue, dir: 'rtl' as const },
                    ].map((item, i) => (
                      <div key={i} className={`flex items-center justify-between py-2.5 border-b border-neutral-800/30 last:border-0 ${align}`}>
                        <span className="text-sm text-neutral-400 font-light">{item.label}</span>
                        <span className="text-sm text-white font-light" dir={item.dir}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
