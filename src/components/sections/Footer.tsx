import { motion } from 'framer-motion';
import { useLang } from '../../i18n/LanguageContext';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer id="footer" className="relative w-full bg-[#050505] z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top */}
        <div className="pt-16 pb-12 border-b border-neutral-900/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Brand */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center lg:text-left">
              <div className="flex items-center gap-3 mb-5 justify-center lg:justify-start">
                <img src="/logo.png" alt={t.footer.brand} className="h-10 w-auto object-contain" />
                <div className="text-center lg:text-left">
                  <span className="text-white text-lg font-light block leading-tight">{t.footer.brand}</span>
                  <span className="text-[9px] tracking-[0.3em] text-neutral-600 block">{t.footer.brandSub}</span>
                </div>
              </div>
              <p className="text-sm text-neutral-500 leading-[2] max-w-md mx-auto lg:mx-0 font-light">{t.footer.brandDesc}</p>
            </motion.div>

            {/* Newsletter */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="text-center lg:text-left">
              <h4 className="text-sm text-white mb-1.5 font-light">{t.footer.newsletter}</h4>
              <p className="text-xs text-neutral-500 mb-4 leading-[1.8] font-light">{t.footer.newsletterDesc}</p>
              <div className="flex flex-col gap-2 max-w-sm mx-auto lg:mx-0">
                <input type="email" placeholder={t.footer.emailPlaceholder} className="w-full bg-transparent border border-neutral-800 px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors text-center lg:text-left" />
                <button className="w-full py-3 bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-colors">{t.footer.subscribe}</button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Links */}
        <div className="py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center md:text-left">
            <h4 className="text-[10px] tracking-[0.25em] text-neutral-500 uppercase mb-4 font-mono">{t.footer.social}</h4>
              <div className="flex flex-col gap-2">
                {t.footer.socialLinks.map((s, i) => (
                  <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-sm text-neutral-500 hover:text-white transition-colors justify-center md:justify-start font-light">
                    <span className="text-neutral-700">
                      {s.en === 'Instagram' && <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><line x1="17.5" y1="6.5" x2="17.5" y2="6.5" /></svg>}
                      {s.en === 'Telegram' && <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M21.94 4.6 18.2 19.3c-.25 1.07-.92 1.33-1.86.83l-5.15-3.8-2.49 2.4c-.27.27-.5.5-1.03.5l.37-5.3 9.66-8.72c.42-.38-.09-.59-.65-.21L6.16 13.2l-5.2-1.63c-1.13-.35-1.15-1.13.24-1.67L20.4 2.9c.94-.35 1.76.21 1.54 1.7z" /></svg>}
                      {s.en === 'X' && <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>}
                      {s.en === 'LinkedIn' && <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 18.34V9.9H5.67v8.44h2.67zM7 8.6a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1zm11.34 9.74v-4.63c0-2.47-1.32-3.62-3.08-3.62-1.42 0-2.06.78-2.42 1.33V9.9h-2.67c.04.75 0 8.44 0 8.44h2.67v-4.71c0-.24.02-.48.09-.65.19-.48.63-.98 1.37-.98.97 0 1.36.74 1.36 1.82v4.52h2.68z" /></svg>}
                    </span>
                    <span>{s.name}</span>
                  </a>
                ))}
              </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="text-center md:text-left">
            <h4 className="text-[10px] tracking-[0.25em] text-neutral-500 uppercase mb-4 font-mono">{t.footer.studio}</h4>
            <ul className="space-y-2">
              {t.footer.studioLinks.map((l, i) => (
                <li key={i}><a href="#" className={`group flex items-center justify-between text-sm text-neutral-500 hover:text-white transition-colors font-light`}>
                  <span>{l.label}</span>
                  <span className="text-[9px] text-neutral-700 group-hover:text-neutral-400 transition-colors font-mono">{l.en}</span>
                </a></li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="text-center md:text-left">
            <h4 className="text-[10px] tracking-[0.25em] text-neutral-500 uppercase mb-4 font-mono">{t.footer.projectLinks}</h4>
            <ul className="space-y-2">
              {t.footer.projectLinksList.map((l, i) => (
                <li key={i}><a href="#" className="group flex items-center justify-between text-sm text-neutral-500 hover:text-white transition-colors font-light">
                  <span>{l.label}</span>
                  <span className="text-[9px] text-neutral-700 group-hover:text-neutral-400 transition-colors font-mono">{l.en}</span>
                </a></li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="text-center md:text-left">
            <h4 className="text-[10px] tracking-[0.25em] text-neutral-500 uppercase mb-4 font-mono">{t.footer.resources}</h4>
            <ul className="space-y-2">
              {t.footer.resourceLinks.map((l, i) => (
                <li key={i}><a href="#" className="group flex items-center justify-between text-sm text-neutral-500 hover:text-white transition-colors font-light">
                  <span>{l.label}</span>
                  <span className="text-[9px] text-neutral-700 group-hover:text-neutral-400 transition-colors font-mono">{l.en}</span>
                </a></li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="py-5 border-t border-neutral-900/50 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[10px] text-neutral-600 font-mono">{t.footer.copyright}</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[10px] text-neutral-600 hover:text-neutral-400 transition-colors font-mono">{t.footer.privacy}</a>
            <a href="#" className="text-[10px] text-neutral-600 hover:text-neutral-400 transition-colors font-mono">{t.footer.terms}</a>
            <a href="#" className="text-[10px] text-neutral-600 hover:text-neutral-400 transition-colors font-mono">{t.footer.cookies}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
