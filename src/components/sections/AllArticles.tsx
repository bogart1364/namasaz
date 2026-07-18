import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useLang } from '../../i18n/LanguageContext';
import ArticleDetail from './ArticleDetail';
import { useState } from 'react';

interface AllArticlesProps {
  onClose: () => void;
}

export default function AllArticles({ onClose }: AllArticlesProps) {
  const { t, align, alignEnd } = useLang();
  const [sel, setSel] = useState<{
    id: number; title: string; subtitle: string; category: string; readTime: string; date: string; image: string; content: string[]; tags: string[]; body?: { heading: string; paragraphs: string[] }[];
  } | null>(null);

  const articleImages = [
    '/assets/renders/article-01.svg',
    '/assets/renders/article-02.svg',
    '/assets/renders/article-03.svg',
    '/assets/renders/article-04.svg',
    '/assets/renders/article-05.svg',
    '/assets/renders/article-06.svg',
    '/assets/renders/article-07.svg',
    '/assets/renders/article-08.svg',
    '/assets/renders/article-09.svg',
    '/assets/renders/article-10.svg',
    '/assets/renders/article-11.svg',
    '/assets/renders/article-12.svg',
    '/assets/renders/article-13.svg',
    '/assets/renders/article-14.svg',
    '/assets/renders/article-15.svg',
    '/assets/renders/article-16.svg',
    '/assets/renders/article-17.svg',
    '/assets/renders/article-18.svg',
    '/assets/renders/article-19.svg',
    '/assets/renders/article-20.svg',
  ];

  const articles = t.articles.data.map((a, i) => ({ ...a, image: articleImages[i] }));

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape' && !sel) onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose, sel]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#0a0a0a] overflow-y-auto"
      style={{ scrollbarWidth: 'none' }}
    >
      <style>{`div::-webkit-scrollbar { display: none; }`}</style>

      {/* Close button */}
      <button
        onClick={onClose}
        className="fixed top-20 left-6 z-[110] w-11 h-11 flex items-center justify-center border border-neutral-700 hover:border-white bg-black/50 backdrop-blur-sm transition-all group cursor-pointer"
      >
        <svg className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="4" y1="4" x2="20" y2="20" />
          <line x1="20" y1="4" x2="4" y2="20" />
        </svg>
      </button>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className={align}>
          <span className="text-[10px] tracking-[0.3em] text-neutral-600 font-mono block mb-4 uppercase">
            {t.articles.label}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white tracking-tight mb-4">
            {t.articles.title}
          </h1>
          <p className="text-sm text-neutral-500 font-light max-w-md">{t.articles.viewAll}</p>
        </motion.div>
      </div>

      {/* Articles grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((a, i) => (
            <motion.article
              key={a.id}
              custom={i}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }),
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              onClick={() => setSel(a)}
              className="group cursor-pointer border border-neutral-800/30 hover:border-neutral-700/50 transition-colors duration-500"
            >
              <div className="aspect-[4/3] w-full relative overflow-hidden bg-neutral-900">
                <img src={a.image} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <div className={`p-5 ${align}`}>
                <span className="text-[10px] tracking-[0.15em] text-neutral-600 font-mono">{a.category}</span>
                <h4 className="text-base font-light text-neutral-200 mt-1.5 mb-1.5 leading-[1.8] group-hover:text-white transition-colors">{a.title}</h4>
                <p className="text-xs text-neutral-500 font-light">{a.subtitle}</p>
                <div className={`mt-3 flex items-center gap-2 ${alignEnd}`}>
                  <span className="text-[10px] text-neutral-600 font-mono">{a.readTime} {t.articles.readTime}</span>
                  <span className="w-1 h-1 rounded-full bg-neutral-700" />
                  <span className="text-[10px] text-neutral-600 font-mono">{a.date}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <ArticleDetail article={sel} onClose={() => setSel(null)} />
    </motion.div>
  );
}
