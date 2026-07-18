import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLang } from '../../i18n/LanguageContext';
import InquiryForm from './InquiryForm';

interface Product {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  categoryEn: string;
  material: string;
  materialEn: string;
  origin: string;
  originEn: string;
  story: string;
  storyEn: string;
  dimension: string;
  dimensionEn: string;
  color: string;
  colorEn: string;
  finish: string;
  finishEn: string;
  weight: string;
  weightEn: string;
  style: string;
  styleEn: string;
  price: string;
  priceEn: string;
  image: string;
  images: string[];
}

interface ProductCardProps {
  product: Product;
  onOpenInGallery?: () => void;
  autoOpen?: boolean;
}

export default function ProductCard({ product, onOpenInGallery, autoOpen }: ProductCardProps) {
  const { lang, align } = useLang();
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);
  const [infoOpen, setInfoOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);

  useEffect(() => {
    if (autoOpen) {
      setCurrentImg(0);
      setGalleryOpen(true);
      setInfoOpen(false);
    }
  }, [autoOpen]);

  const name = lang === 'fa' ? product.name : product.nameEn;
  const altName = lang === 'fa' ? product.nameEn : product.name;
  const category = lang === 'fa' ? product.category : product.categoryEn;
  const material = lang === 'fa' ? product.material : product.materialEn;
  const origin = lang === 'fa' ? product.origin : product.originEn;
  const story = lang === 'fa' ? product.story : product.storyEn;
  const dimension = lang === 'fa' ? product.dimension : product.dimensionEn;
  const color = lang === 'fa' ? product.color : product.colorEn;
  const finish = lang === 'fa' ? product.finish : product.finishEn;
  const weight = lang === 'fa' ? product.weight : product.weightEn;
  const style = lang === 'fa' ? product.style : product.styleEn;
  const price = lang === 'fa' ? product.price : product.priceEn;

  const labels = {
    material: lang === 'fa' ? 'متریال' : 'Material',
    origin: lang === 'fa' ? 'خاستگاه' : 'Origin',
    story: lang === 'fa' ? 'داستان' : 'Story',
    dimension: lang === 'fa' ? 'ابعاد' : 'Dimension',
    color: lang === 'fa' ? 'رنگ' : 'Color',
    finish: lang === 'fa' ? 'نوع پوشش' : 'Finish',
    weight: lang === 'fa' ? 'وزن' : 'Weight',
    style: lang === 'fa' ? 'سبک' : 'Style',
    price: lang === 'fa' ? 'قیمت' : 'Price',
    inquire: lang === 'fa' ? 'استعلام قیمت' : 'Inquire Pricing',
    info: lang === 'fa' ? 'مشخصات' : 'Details',
    photos: lang === 'fa' ? 'تصویر' : 'photos',
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
        className="group relative overflow-hidden border border-neutral-800/40 bg-[#111] cursor-pointer hover:border-neutral-600/60 transition-all duration-500"
        onClick={() => {
          if (onOpenInGallery) {
            onOpenInGallery();
          } else {
            setCurrentImg(0);
            setGalleryOpen(true);
            setInfoOpen(false);
          }
        }}
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <img src={product.image} alt={name} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
          <div className="absolute top-4 left-4 z-20">
            <span className="text-[8px] tracking-[0.25em] font-mono uppercase text-white/70 bg-white/10 backdrop-blur-md px-3 py-1.5 border border-white/5">{category}</span>
          </div>
          {product.images.length > 1 && (
            <div className="absolute top-4 right-4 z-20">
              <span className="text-[8px] font-mono text-white/50 bg-black/30 backdrop-blur-md px-2 py-1 border border-white/5">{product.images.length} {labels.photos}</span>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-8 z-20">
            <div className={`flex items-baseline gap-2 mb-1.5 ${align}`}>
              <h3 className="text-lg font-normal text-white tracking-tight">{name}</h3>
              <span className="text-[9px] text-white/40 font-mono">{altName}</span>
            </div>
            <p className="text-[10px] text-white/40 font-light tracking-wide">{material}</p>
          </div>
        </div>
        <div className="px-5 py-3.5 flex items-center justify-between border-t border-white/5">
          <div className={`flex items-center gap-2.5 ${align}`}>
            <div className="w-7 h-7 bg-white/5 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white/40" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div>
              <span className="text-[10px] text-white/70 block font-light leading-tight">{name}</span>
              <span className="text-[8px] text-white/30 font-mono tracking-wider">{category}</span>
            </div>
          </div>
          <button onClick={(e) => { e.stopPropagation(); setInquiryOpen(true); }} className="py-1.5 px-4 bg-white/5 backdrop-blur-sm text-white/60 text-[9px] tracking-[0.15em] font-mono border border-white/10 hover:bg-white/10 hover:text-white/80 hover:border-white/20 transition-all duration-300">
            {lang === 'fa' ? 'استعلام' : 'INQUIRE'}
          </button>
        </div>
      </motion.div>

      {/* Gallery */}
      <AnimatePresence>
        {galleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#0a0a0a]"
          >
            {/* Top bar */}
            <div className="absolute top-0 left-0 right-0 z-[210] flex items-center justify-between px-6 py-5 bg-gradient-to-b from-black/80 to-transparent">
              <button onClick={() => setGalleryOpen(false)} className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer">
                <svg className="w-3.5 h-3.5 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="4" y1="4" x2="20" y2="20" />
                  <line x1="20" y1="4" x2="4" y2="20" />
                </svg>
              </button>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setInfoOpen(!infoOpen)}
                  className={`flex items-center gap-2 px-4 py-2 text-[10px] tracking-[0.15em] font-mono border transition-all cursor-pointer ${
                    infoOpen ? 'bg-white text-black border-white' : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white/80'
                  }`}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                  {labels.info}
                </button>
                <span className="text-[10px] text-white/30 font-mono">{currentImg + 1} / {product.images.length}</span>
              </div>
            </div>

            {/* Main image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImg}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  src={product.images[currentImg]}
                  alt={`${name} - ${currentImg + 1}`}
                  className="max-w-full max-h-full object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
              </AnimatePresence>
            </div>

            {/* Nav arrows */}
            {product.images.length > 1 && (
              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none">
                <button
                  onClick={() => setCurrentImg(prev => prev > 0 ? prev - 1 : product.images.length - 1)}
                  className="pointer-events-auto w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
                >
                  <svg className="w-5 h-5 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  onClick={() => setCurrentImg(prev => prev < product.images.length - 1 ? prev + 1 : 0)}
                  className="pointer-events-auto w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
                >
                  <svg className="w-5 h-5 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            )}

            {/* Bottom thumbnails */}
            {product.images.length > 1 && (
              <div className="absolute bottom-0 left-0 right-0 z-[210] flex justify-center pb-5 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex gap-2 p-2 bg-black/40 backdrop-blur-md border border-white/5">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImg(i)}
                      className={`w-14 h-14 overflow-hidden transition-all duration-300 cursor-pointer border border-transparent ${
                        i === currentImg ? 'border-white/40 scale-105' : 'opacity-40 hover:opacity-70'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Info panel — slides from right */}
            <AnimatePresence>
              {infoOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-[220] bg-black/40"
                    onClick={() => setInfoOpen(false)}
                  />
                  <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'tween', duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-0 right-0 bottom-0 z-[230] w-full max-w-md bg-[#111] border-l border-neutral-800/40 overflow-y-auto flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                    style={{ scrollbarWidth: 'none' }}
                  >
                    <style>{`div::-webkit-scrollbar { display: none; }`}</style>

                    {/* Close bar */}
                    <div className="flex items-center justify-end px-10 pt-8 pb-4">
                      <button onClick={() => setInfoOpen(false)} className="w-9 h-9 flex items-center justify-center bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                        <svg className="w-3 h-3 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <line x1="4" y1="4" x2="20" y2="20" />
                          <line x1="20" y1="4" x2="4" y2="20" />
                        </svg>
                      </button>
                    </div>

                    {/* Panel header */}
                    <div className="px-10 pb-10">
                      <span className="text-[10px] tracking-[0.3em] text-neutral-500 font-mono block mb-4">{category}</span>
                      <h2 className="text-2xl font-normal text-white tracking-tight leading-tight">{name}</h2>
                      <p className="text-xs text-neutral-500 font-mono mt-1.5">{altName}</p>
                    </div>

                    {/* Divider */}
                    <div className="mx-10 h-[1px] bg-neutral-800/40" />

                    {/* Specs grid */}
                    <div className="px-10 py-10">
                      <span className="text-[9px] tracking-[0.25em] text-neutral-600 font-mono block mb-8">{lang === 'fa' ? 'مشخصات فنی' : 'SPECIFICATIONS'}</span>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-8">
                        <SpecItem label={labels.material} value={material} />
                        <SpecItem label={labels.origin} value={origin} />
                        <SpecItem label={labels.dimension} value={dimension} />
                        <SpecItem label={labels.color} value={color} />
                        <SpecItem label={labels.finish} value={finish} />
                        <SpecItem label={labels.weight} value={weight} />
                        <SpecItem label={labels.style} value={style} />
                        <SpecItem label={labels.price} value={price} />
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="mx-10 h-[1px] bg-neutral-800/40" />

                    {/* Story */}
                    <div className="px-10 py-10">
                      <span className="text-[9px] tracking-[0.25em] text-neutral-600 font-mono block mb-6">{labels.story}</span>
                      <p className="text-sm text-neutral-400 leading-[2.4] font-light">{story}</p>
                    </div>

                    {/* Divider */}
                    <div className="mx-10 h-[1px] bg-neutral-800/40" />

                    {/* CTA */}
                    <div className="mt-auto px-10 py-10">
                      <button
                        onClick={() => setInquiryOpen(true)}
                        className="w-full py-4 bg-white text-black text-[11px] tracking-[0.2em] font-mono hover:bg-neutral-200 transition-all"
                      >
                        {labels.inquire}
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <InquiryForm open={inquiryOpen} onClose={() => setInquiryOpen(false)} productName={name} />
    </>
  );
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-[9px] tracking-[0.25em] text-neutral-600 font-mono block mb-2">{label}</span>
      <p className="text-[13px] text-neutral-300 font-light leading-relaxed">{value}</p>
    </div>
  );
}
