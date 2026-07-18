import { motion } from 'framer-motion';
import { useLang } from '../../i18n/LanguageContext';
import ProductCard from '../ui/ProductCard';

interface ProductsProps {
  onOpenAll: (productId?: string) => void;
}

export default function Products({ onOpenAll }: ProductsProps) {
  const { t, align } = useLang();
  const visibleProducts = t.products.data.slice(0, 6);

  return (
    <section id="products" className="relative w-full bg-[#0a0a0a] z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={`mb-16 ${align}`}
        >
          <span className="text-[10px] tracking-[0.3em] text-neutral-600 font-mono block mb-4">
            {t.products.label}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white tracking-tight mb-4">
            {t.products.title}
          </h2>
          <p className="text-sm text-neutral-500 font-light max-w-md">
            {t.products.subtitle}
          </p>
        </motion.div>

        {/* Workshop banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-12 py-6 px-6 md:px-8 border border-neutral-800/50 bg-neutral-900/20"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className={align}>
              <h3 className="text-base text-white font-light mb-1">{t.products.workshop}</h3>
              <p className="text-xs text-neutral-500 font-light">{t.products.workshopDesc}</p>
            </div>
            <div className="flex items-center gap-5">
              <div className="w-2 h-2 bg-red-600 animate-pulse" />
              <span className="text-[10px] tracking-[0.2em] text-neutral-500 font-mono">HANDMADE</span>
              <button
                onClick={() => onOpenAll()}
                className="group flex items-center gap-2 text-[10px] tracking-[0.15em] text-neutral-500 hover:text-white font-mono transition-all border border-neutral-800 hover:border-neutral-600 py-1.5 px-4"
              >
                {t.products.viewAll}
                <svg className="w-3 h-3 rtl:rotate-180 rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 19 19 12 12 5" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Products grid — first 6 only */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenInGallery={() => onOpenAll(product.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
