import { motion } from 'framer-motion';
import { useLang } from '../../i18n/LanguageContext';

function LogoSVG({ logoSub = 'طراحی و معماری نما ساز' }: { logoSub?: string }) {
  return (
    <svg viewBox="0 0 200 80" className="w-28 h-28 md:w-36 md:h-36" fill="none">
      <path d="M20 55 L45 20 L70 55" stroke="#c0392b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M45 55 L70 20 L95 55" stroke="#2c3e50" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M70 55 L95 20 L120 55" stroke="#7f8c8d" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="52" y="35" width="6" height="6" fill="#c0392b" rx="0.5" />
      <rect x="60" y="35" width="6" height="6" fill="#c0392b" rx="0.5" />
      <rect x="52" y="43" width="6" height="6" fill="#c0392b" rx="0.5" />
      <rect x="60" y="43" width="6" height="6" fill="#c0392b" rx="0.5" />
      <text x="70" y="68" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="11" fontWeight="900" fill="#2c3e50" letterSpacing="1">NAMASAZ</text>
      <text x="70" y="78" textAnchor="middle" fontFamily="Tahoma, sans-serif" fontSize="5.5" fill="#c0392b">{logoSub}</text>
    </svg>
  );
}

export default function Hero() {
  const { t } = useLang();

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center px-10 md:px-16 pointer-events-none z-10 text-center">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="mb-10"
      >
        <LogoSVG logoSub={t.nav.logoSub} />
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight text-white tracking-tight leading-[1.1] mb-6">
          {t.hero.title}
        </h1>
        <span className="text-sm md:text-base text-neutral-500 tracking-[0.3em]">{t.hero.subtitle}</span>
      </motion.div>

      {/* Poem */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1.2 }}
        className="mt-12 max-w-lg"
      >
        <p className="text-neutral-400 text-base md:text-lg leading-[2.5] font-light italic">
          « {t.hero.poem1}
          <br />
          {t.hero.poem2} »
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-12 flex items-center gap-4"
      >
        <div className="w-12 h-[1px] bg-neutral-600" />
        <span className="text-xs tracking-[0.2em] text-neutral-500">{t.hero.scroll}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-10 bg-neutral-600"
        />
      </motion.div>
    </section>
  );
}
