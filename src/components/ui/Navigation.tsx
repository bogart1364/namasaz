import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../../i18n/LanguageContext';
import LanguageToggle from './LanguageToggle';

function LogoSVG({ className = 'w-10 h-10', logoSub = 'طراحی و معماری نما ساز' }: { className?: string; logoSub?: string }) {
  return (
    <svg viewBox="0 0 200 80" className={className} fill="none">
      <path d="M20 55 L45 20 L70 55" stroke="#c0392b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M45 55 L70 20 L95 55" stroke="#2c3e50" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M70 55 L95 20 L120 55" stroke="#7f8c8d" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="52" y="35" width="6" height="6" fill="#c0392b" rx="0.5" />
      <rect x="60" y="35" width="6" height="6" fill="#c0392b" rx="0.5" />
      <rect x="52" y="43" width="6" height="6" fill="#c0392b" rx="0.5" />
      <rect x="60" y="43" width="6" height="6" fill="#c0392b" rx="0.5" />
      <text x="70" y="68" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="10" fontWeight="900" fill="#2c3e50" letterSpacing="1">NAMASAZ</text>
      <text x="70" y="78" textAnchor="middle" fontFamily="Tahoma, sans-serif" fontSize="5.5" fill="#c0392b">{logoSub}</text>
    </svg>
  );
}

interface NavigationProps {
  onProductsClick: () => void;
}

export default function Navigation({ onProductsClick }: NavigationProps) {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.articles, href: '#articles' },
    { label: t.nav.contact, href: '#footer' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/70 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4">
          <a href="#" className="flex items-center gap-3 group">
            <LogoSVG className="w-10 h-10 md:w-12 md:h-12" logoSub={t.nav.logoSub} />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item, i) => (
              <a key={i} href={item.href} className="relative group text-[13px] font-light text-neutral-400 hover:text-white transition-colors duration-300 tracking-wide">
                {item.label}
                <span className="absolute -bottom-1 right-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <button onClick={onProductsClick} className="relative group text-[13px] font-light text-neutral-400 hover:text-white transition-colors duration-300 tracking-wide cursor-pointer">
              {t.nav.products}
              <span className="absolute -bottom-1 right-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300" />
            </button>
            <div className="w-[1px] h-4 bg-neutral-700" />
            <LanguageToggle />
          </div>

          <div className="md:hidden flex items-center gap-3">
            <LanguageToggle />
            <button onClick={() => setMenuOpen(!menuOpen)} className="flex flex-col gap-1.5 p-2" aria-label="Menu">
              <motion.span animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="w-6 h-[1px] bg-white block origin-center" />
              <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} className="w-6 h-[1px] bg-white block" />
              <motion.span animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="w-6 h-[1px] bg-white block origin-center" />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg flex items-center justify-center md:hidden">
            <div className="flex flex-col items-center gap-10">
              {navLinks.map((item, i) => (
                <motion.a key={i} href={item.href} onClick={() => setMenuOpen(false)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ delay: i * 0.08 }} className="text-center">
                  <span className="text-2xl font-light text-white block">{item.label}</span>
                </motion.a>
              ))}
              <motion.button
                onClick={() => { onProductsClick(); setMenuOpen(false); }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: navLinks.length * 0.08 }}
                className="text-center cursor-pointer"
              >
                <span className="text-2xl font-light text-white block">{t.nav.products}</span>
              </motion.button>
              <div className="w-8 h-[1px] bg-neutral-700 mt-4" />
              <LanguageToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
