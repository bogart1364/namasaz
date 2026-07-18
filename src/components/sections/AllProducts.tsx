import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLang } from '../../i18n/LanguageContext';
import ProductCard from '../ui/ProductCard';

interface AllProductsProps {
  onClose: () => void;
  initialProductId?: string;
}

export default function AllProducts({ onClose, initialProductId }: AllProductsProps) {
  const { t, lang, align } = useLang();
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const filters = [
    { key: 'all', label: t.products.filterAll },
    { key: 'Lamp', label: t.products.filterLamp },
    { key: 'Coat Rack', label: t.products.filterCoatRack },
    { key: 'Bookshelf', label: t.products.filterBookshelf },
    { key: 'Island', label: t.products.filterIsland },
    { key: 'Console', label: t.products.filterConsole },
    { key: 'Table', label: t.products.filterTable },
    { key: 'Bed', label: t.products.filterBed },
    { key: 'Bench', label: t.products.filterBench },
    { key: 'Dining Table', label: t.products.filterDining },
  ];

  const filtered = filter === 'all'
    ? t.products.data
    : t.products.data.filter(p => p.categoryEn === filter);

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
          <span className="text-[10px] tracking-[0.3em] text-neutral-600 font-mono block mb-4">
            {t.products.label}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white tracking-tight mb-4">
            {t.products.title}
          </h1>
          <p className="text-sm text-neutral-500 font-light max-w-md">
            {t.products.subtitle}
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="mt-10 flex flex-wrap gap-2">
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`py-2 px-5 text-[10px] tracking-[0.15em] font-mono transition-all ${
                filter === f.key
                  ? 'bg-white text-black'
                  : 'border border-neutral-800 text-neutral-500 hover:border-neutral-600 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Products grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              autoOpen={product.id === initialProductId}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-neutral-500 font-light">{lang === 'fa' ? 'محصولی یافت نشد' : 'No products found'}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
