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
                <svg viewBox="0 0 48 48" className="w-10 h-10"><path d="M12 36V18L24 12L36 18V36H27V26H21V36H12Z" stroke="#c8c4bc" strokeWidth="1.5" fill="none" /></svg>
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
                    {i === 0 && <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /></svg>}
                    {i === 1 && <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>}
                    {i === 2 && <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>}
                    {i === 3 && <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /></svg>}
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
