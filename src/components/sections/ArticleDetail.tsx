import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useLang } from '../../i18n/LanguageContext';

interface ArticleSection {
  heading: string;
  paragraphs: string[];
}

interface Article {
  id: number; title: string; subtitle: string; category: string; readTime: string; date: string; image: string; content: string[]; tags: string[]; body?: ArticleSection[];
}

interface ArticleDetailProps {
  article: Article | null;
  onClose: () => void;
}

export default function ArticleDetail({ article, onClose }: ArticleDetailProps) {
  const { t, align, alignEnd } = useLang();

  useEffect(() => {
    if (article) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [article]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape' && article) onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose, article]);

  if (!article) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#0a0a0a] overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
      <style>{`div::-webkit-scrollbar { display: none; }`}</style>

      <button onClick={onClose} className="fixed top-6 left-6 z-[110] w-11 h-11 flex items-center justify-center border border-neutral-700 hover:border-white bg-black/50 backdrop-blur-sm transition-all group cursor-pointer">
        <svg className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="4" y1="4" x2="20" y2="20" /><line x1="20" y1="4" x2="4" y2="20" /></svg>
      </button>

      <button onClick={onClose} className="fixed top-6 right-6 z-[110] flex items-center gap-2 text-[11px] tracking-[0.15em] text-neutral-400 font-mono hover:text-white transition-colors group cursor-pointer">
        {t.articles.allArticles}
        <svg className="w-3.5 h-3.5 rtl:group-hover:translate-x-1 ltr:group-hover:-translate-x-1 transition-transform rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 5 12 12 19" /></svg>
      </button>

      <div className="w-full h-[50vh] md:h-[60vh] relative">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/20" />
      </div>

      <div className="max-w-3xl mx-auto px-6 md:px-16 -mt-16 relative z-10 pb-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
          <div className={`flex items-center gap-3 mb-5 ${alignEnd}`}>
            <span className="text-[10px] text-neutral-600 font-mono">{article.date}</span>
            <span className="w-1 h-1 rounded-full bg-neutral-700" />
            <span className="text-[10px] text-neutral-600 font-mono">{article.readTime} {t.articles.readTime}</span>
            <span className="w-1 h-1 rounded-full bg-neutral-700" />
            <span className="text-[10px] tracking-[0.2em] text-neutral-500 font-mono">{article.category}</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extralight text-white tracking-tight mb-3 leading-tight">{article.title}</h1>
          <p className="text-xs text-neutral-500 font-mono mb-8">{article.subtitle}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
          {article.body ? (
            article.body.map((section, si) => (
              <div key={si} className="mb-9">
                <h2 className="text-lg md:text-xl font-light text-white tracking-tight mb-4 flex items-center gap-3">
                  <span className="w-6 h-[1px] bg-[#c0392b]" />
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph, pi) => (
                  <p key={pi} className="text-sm md:text-base text-neutral-400 leading-[2.1] mb-4 font-light">{paragraph}</p>
                ))}
              </div>
            ))
          ) : (
            article.content.map((paragraph, i) => (
              <p key={i} className="text-sm md:text-base text-neutral-400 leading-[2.1] mb-5 font-light">{paragraph}</p>
            ))
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-10 pt-6 border-t border-neutral-800/50">
          <span className="text-[10px] tracking-[0.2em] text-neutral-600 font-mono block mb-3">{t.articles.tags}</span>
          <div className={`flex flex-wrap gap-2 ${alignEnd}`}>
            {article.tags.map((tag, i) => (
              <span key={i} className="px-2.5 py-1 text-[10px] text-neutral-500 border border-neutral-800/50 font-mono hover:border-neutral-600 hover:text-neutral-300 transition-colors">{tag}</span>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-8 flex items-center gap-3 p-5 bg-neutral-900/30 border border-neutral-800/30 justify-end">
          <div className={align}>
            <span className="text-sm text-white block font-light">{t.articles.author}</span>
            <span className="text-[10px] text-neutral-500 font-mono">{t.articles.authorSub}</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-neutral-500"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" fill="none" stroke="currentColor" strokeWidth="1.5" /><circle cx="12" cy="7" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
          </div>
        </motion.div>

        <div className="mt-8 flex justify-center">
          <button onClick={onClose} className="flex items-center gap-2 text-[11px] tracking-[0.15em] text-neutral-400 font-mono hover:text-white transition-colors group">
            {t.articles.allArticles}
            <svg className="w-3.5 h-3.5 rtl:group-hover:translate-x-1 ltr:group-hover:-translate-x-1 transition-transform rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 5 12 12 19" /></svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
