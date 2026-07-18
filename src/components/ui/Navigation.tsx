import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../../i18n/LanguageContext';
import LanguageToggle from './LanguageToggle';

interface NavigationProps {
  onProductsClick: () => void;
}

export default function Navigation({ onProductsClick }: NavigationProps) {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const el = document.getElementById('scroll-container');
    const handleScroll = () => setScrolled((el?.scrollTop ?? window.scrollY) > 80);
    if (el) {
      el.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      return () => el.removeEventListener('scroll', handleScroll);
    }
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
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#0a0a0a]/85 backdrop-blur-md border-b border-white/5' : 'bg-gradient-to-b from-[#0a0a0a]/90 via-[#0a0a0a]/50 to-transparent backdrop-blur-sm'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4">
          <a href="#" className="flex items-center gap-3 group">
            <img src="/logo.png" alt="NAMASAZ" className="h-9 w-auto object-contain md:h-11" />
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
