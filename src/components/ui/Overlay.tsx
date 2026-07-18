import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useLang } from '../../i18n/LanguageContext';

export default function Overlay() {
  const { t, align } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  // Drive progress from the actual scroll container (same source as the 3D camera),
  // so it works reliably inside the fixed #scroll-container on mobile.
  const progress = useMotionValue(0);

  useEffect(() => {
    const el = document.getElementById('scroll-container');
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const sectionEnd = window.innerHeight * 3;
      const p = Math.max(0, Math.min(1, el.scrollTop / sectionEnd));
      progress.set(p);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      el.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [progress]);

  const opacity0 = useTransform(progress, [0, 0.15, 0.3], [1, 1, 0]);
  const opacity1 = useTransform(progress, [0.25, 0.45, 0.65], [0, 1, 0]);
  const opacity2 = useTransform(progress, [0.55, 0.75, 1], [0, 1, 1]);

  const opacities = [opacity0, opacity1, opacity2];

  return (
    <div ref={containerRef} className="relative" style={{ height: '300vh' }}>
      {t.overlay.map((page, index) => (
        <div
          key={index}
          className="sticky top-0 h-screen flex items-center pointer-events-none"
        >
          <motion.div
            style={{ opacity: opacities[index] }}
            className={`max-w-xl px-6 md:px-16 ${align} select-none`}
          >
            <span className="text-[10px] tracking-[0.25em] text-neutral-500 block mb-5 font-mono">
              ۰{index + 1} / {align === 'text-right' ? 'مفهوم' : 'CONCEPT'}
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-extralight text-white tracking-tight mb-5">
              {page.title}
            </h2>
            <p className="text-neutral-400 text-base leading-[2] max-w-sm font-light">
              {page.desc}
            </p>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
