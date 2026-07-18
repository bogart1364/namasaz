import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLang } from '../../i18n/LanguageContext';
import ArticleDetail from './ArticleDetail';

interface ArticleSection {
  heading: string;
  paragraphs: string[];
}

interface Article {
  id: number; title: string; subtitle: string; category: string; readTime: string; date: string; image: string; content: string[]; tags: string[]; body?: ArticleSection[];
}

const v = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }),
};

export default function Articles({ onOpenAll }: { onOpenAll: () => void }) {
  const { t, align, alignEnd } = useLang();
  const [sel, setSel] = useState<Article | null>(null);

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

  const articles: Article[] = t.articles.data.map((a, i) => ({ ...a, image: articleImages[i] }));

  return (
    <>
      <section id="articles" className="relative w-full bg-[#080808] py-24 px-6 md:px-12 z-20">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }} className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between text-center md:text-left">
            <div className="text-center md:text-left">
              <span className="text-[10px] tracking-[0.25em] text-neutral-500 block mb-4 font-mono uppercase">{t.articles.label}</span>
              <h2 className="text-4xl md:text-5xl font-extralight text-white tracking-tight">{t.articles.title}</h2>
              <div className="w-12 h-[1px] bg-neutral-600 mt-5 mx-auto md:ml-0 md:mr-auto" />
            </div>
            <button onClick={onOpenAll} className="inline-flex items-center gap-3 text-[11px] tracking-[0.2em] text-neutral-400 hover:text-white transition-colors group mt-6 md:mt-0 cursor-pointer">
              {t.articles.viewAll}
              <span className="w-6 h-[1px] bg-neutral-600 group-hover:w-10 group-hover:bg-white transition-all duration-300" />
            </button>
          </motion.div>

          {/* Featured */}
          <motion.article custom={0} variants={v} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="group mb-6 cursor-pointer" onClick={() => setSel(articles[0])}>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 border border-neutral-800/30 hover:border-neutral-700/50 transition-colors duration-500 overflow-hidden">
              <div className="lg:col-span-2 aspect-video lg:aspect-auto relative overflow-hidden order-2 lg:order-1">
                <img src={articles[0].image} alt={articles[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute bottom-3 right-3"><span className="text-[10px] tracking-[0.15em] text-white bg-black/50 px-2.5 py-1 font-mono">{t.articles.featured}</span></div>
              </div>
              <div className={`lg:col-span-3 flex flex-col justify-center p-8 order-1 lg:order-2 ${align}`}>
                <span className="text-[10px] tracking-[0.15em] text-neutral-500 mb-3 font-mono">{articles[0].category} — {articles[0].readTime} {t.articles.readTime}</span>
                <h3 className="text-xl md:text-2xl font-light text-white mb-2 group-hover:text-neutral-200 transition-colors">{articles[0].title}</h3>
                <p className="text-xs text-neutral-500 mb-4">{articles[0].subtitle}</p>
                <p className="text-sm text-neutral-400 leading-[1.9] max-w-lg font-light">{articles[0].content[0]}</p>
                <div className={`mt-6 flex items-center gap-3 ${alignEnd}`}>
                  <span className="text-[11px] text-neutral-400 group-hover:text-white transition-colors flex items-center gap-2">
                    {t.articles.read}
                    <svg className="w-3 h-3 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 19 19 12 12 5" /></svg>
                  </span>
                  <span className="w-4 h-[1px] bg-neutral-700" />
                  <span className="text-[10px] text-neutral-500 font-mono">{articles[0].date}</span>
                </div>
              </div>
            </div>
          </motion.article>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {articles.slice(1, 6).map((a, i) => (
              <motion.article key={a.id} custom={i + 1} variants={v} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="group cursor-pointer" onClick={() => setSel(a)}>
                <div className="aspect-[4/3] w-full relative overflow-hidden mb-3 bg-neutral-900">
                  <img src={a.image} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <div className={align}>
                  <span className="text-[10px] tracking-[0.15em] text-neutral-600 font-mono">{a.category}</span>
                  <h4 className="text-sm font-light text-neutral-300 mt-1.5 mb-1.5 group-hover:text-white transition-colors leading-[1.8]">{a.title}</h4>
                  <p className="text-xs text-neutral-500 font-light">{a.subtitle}</p>
                  <div className={`mt-2.5 flex items-center gap-2 ${alignEnd}`}>
                    <span className="text-[10px] text-neutral-600 font-mono">{a.readTime} {t.articles.readTime}</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-700" />
                    <span className="text-[10px] text-neutral-600 font-mono">{a.date}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
      <ArticleDetail article={sel} onClose={() => setSel(null)} />
    </>
  );
}
