import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLang } from '../../i18n/LanguageContext';

interface InquiryFormProps {
  open: boolean;
  onClose: () => void;
  productName?: string;
}

export default function InquiryForm({ open, onClose, productName }: InquiryFormProps) {
  const { lang } = useLang();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [want, setWant] = useState('');
  const [desc, setDesc] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (open) {
      setSent(false);
      setWant(productName ? productName : '');
    }
  }, [open, productName]);

  const labels = {
    title: lang === 'fa' ? 'استعلام قیمت' : 'Inquire Pricing',
    subtitle: lang === 'fa' ? 'مشخصات سفارش خود را وارد کنید' : 'Enter your order details',
    name: lang === 'fa' ? 'نام و نام خانوادگی' : 'Full Name',
    phone: lang === 'fa' ? 'شماره تماس' : 'Phone Number',
    want: lang === 'fa' ? 'محصول مورد نظر' : 'Product of Interest',
    desc: lang === 'fa' ? 'توضیحات سفارش' : 'Order Description',
    descPh: lang === 'fa' ? 'جزئیات بیشتر درباره سفارش خود بنویسید...' : 'Write more details about your order...',
    submit: lang === 'fa' ? 'ارسال سفارش' : 'Submit Order',
    close: lang === 'fa' ? 'بستن' : 'Close',
    sent: lang === 'fa' ? 'سفارش شما ارسال شد' : 'Your order has been sent',
    sentDesc: lang === 'fa' ? 'لطفاً از طریق ایمیل ارسال‌شده، دکمه ارسال را فشار دهید.' : 'Please press send in the opened email client.',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      (lang === 'fa' ? 'استعلام قیمت — ' : 'Price Inquiry — ') + (want || (lang === 'fa' ? 'محصول' : 'Product'))
    );
    const body = encodeURIComponent(
      (lang === 'fa' ? 'نام: ' : 'Name: ') + name + '\n' +
      (lang === 'fa' ? 'شماره تماس: ' : 'Phone: ') + phone + '\n' +
      (lang === 'fa' ? 'محصول مورد نظر: ' : 'Product: ') + want + '\n\n' +
      (lang === 'fa' ? 'توضیحات: ' : 'Description: ') + '\n' + desc
    );
    window.location.href = `mailto:info@namasaz.co?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-full max-w-md bg-[#111] border border-neutral-800/60"
            onClick={(e) => e.stopPropagation()}
            style={{ scrollbarWidth: 'none' }}
          >
            <style>{`div::-webkit-scrollbar { display: none; }`}</style>

            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-neutral-800/50">
              <div>
                <h2 className="text-lg font-normal text-white tracking-tight">{labels.title}</h2>
                <p className="text-[11px] text-neutral-500 font-light mt-1">{labels.subtitle}</p>
              </div>
              <button onClick={onClose} className="w-9 h-9 flex items-center justify-center border border-neutral-700 hover:border-white bg-black/50 backdrop-blur-sm transition-all cursor-pointer">
                <svg className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="4" y1="4" x2="20" y2="20" />
                  <line x1="20" y1="4" x2="4" y2="20" />
                </svg>
              </button>
            </div>

            {sent ? (
              <div className="px-8 py-14 text-center">
                <div className="w-12 h-12 mx-auto mb-5 flex items-center justify-center border border-white/20">
                  <svg className="w-5 h-5 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <h3 className="text-white text-base font-light mb-2">{labels.sent}</h3>
                <p className="text-xs text-neutral-500 font-light leading-relaxed">{labels.sentDesc}</p>
                <button onClick={onClose} className="mt-8 px-8 py-3 border border-neutral-700 hover:border-white text-[10px] tracking-[0.15em] text-neutral-400 hover:text-white font-mono transition-all">
                  {labels.close}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-8 py-7 space-y-5">
                <div>
                  <label className="text-[9px] tracking-[0.2em] text-neutral-600 font-mono block mb-2">{labels.name}</label>
                  <input
                    type="text" required value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black/30 border border-neutral-800 px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
                    dir={lang === 'fa' ? 'rtl' : 'ltr'}
                  />
                </div>

                <div>
                  <label className="text-[9px] tracking-[0.2em] text-neutral-600 font-mono block mb-2">{labels.phone}</label>
                  <input
                    type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-black/30 border border-neutral-800 px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="text-[9px] tracking-[0.2em] text-neutral-600 font-mono block mb-2">{labels.want}</label>
                  <input
                    type="text" value={want} onChange={(e) => setWant(e.target.value)}
                    className="w-full bg-black/30 border border-neutral-800 px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
                    dir={lang === 'fa' ? 'rtl' : 'ltr'}
                  />
                </div>

                <div>
                  <label className="text-[9px] tracking-[0.2em] text-neutral-600 font-mono block mb-2">{labels.desc}</label>
                  <textarea
                    value={desc} onChange={(e) => setDesc(e.target.value)}
                    placeholder={labels.descPh}
                    rows={4}
                    className="w-full bg-black/30 border border-neutral-800 px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors resize-none"
                    dir={lang === 'fa' ? 'rtl' : 'ltr'}
                  />
                </div>

                <button type="submit" className="w-full py-4 border border-neutral-600 hover:border-[#c0392b] text-white text-[11px] tracking-[0.2em] font-mono hover:bg-[#c0392b]/10 transition-all mt-2 cursor-pointer">
                  {labels.submit}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
