import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useLang } from '../../i18n/LanguageContext';

interface Review {
  id: string;
  productId: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: { seconds: number; nanoseconds: number };
}

interface ReviewSystemProps {
  productId: string;
}

function StarIcon({ filled, hover, onClick, onHover, onLeave }: {
  filled: boolean; hover?: boolean; onClick?: () => void; onHover?: () => void; onLeave?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`transition-colors duration-200 ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
      disabled={!onClick}
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill={filled || hover ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    </button>
  );
}

export default function ReviewSystem({ productId }: ReviewSystemProps) {
  const { lang } = useLang();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, 'reviews'),
      where('productId', '==', productId),
      orderBy('createdAt', 'desc')
    );
    const unsub = onSnapshot(q, (snap: { docs: Array<{ id: string; data: () => Record<string, unknown> }> }) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() } as unknown as Review));
      setReviews(data);
      setLoading(false);
    });
    return () => unsub();
  }, [productId]);

  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim() || rating === 0) return;
    setSubmitting(true);
    await addDoc(collection(db, 'reviews'), {
      productId,
      name: name.trim(),
      rating,
      comment: comment.trim(),
      createdAt: serverTimestamp(),
    });
    setSubmitting(false);
    setSubmitted(true);
    setName('');
    setRating(0);
    setComment('');
    setShowForm(false);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const formatDate = (ts: { seconds: number }) => {
    const d = new Date(ts.seconds * 1000);
    return lang === 'fa'
      ? `${d.getFullYear()}/${String(d.getMonth()+1).padStart(2,'0')}/${String(d.getDate()).padStart(2,'0')}`
      : `${d.toLocaleString('en', { month: 'short' })} ${d.getDate()}, ${d.getFullYear()}`;
  };

  return (
    <div className="mt-8 border-t border-neutral-800/50 pt-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map(s => (
              <StarIcon key={s} filled={s <= Math.round(avgRating)} />
            ))}
          </div>
          <span className="text-sm text-neutral-400 font-light">
            {avgRating.toFixed(1)} / 5
          </span>
          <span className="text-xs text-neutral-600 font-mono">
            ({reviews.length} {lang === 'fa' ? 'نظر' : 'reviews'})
          </span>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 text-[11px] tracking-[0.15em] text-neutral-500 hover:text-white font-mono transition-all border border-neutral-800 hover:border-neutral-600 py-2 px-5 cursor-pointer"
        >
          {showForm ? (lang === 'fa' ? 'بستن' : 'Close') : (lang === 'fa' ? 'نظر بدهید' : 'Write a Review')}
          <svg className={`w-3 h-3 transition-transform ${showForm ? 'rotate-45' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>

      {/* Success message */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 py-3 px-5 border border-green-800/50 bg-green-900/10 text-green-400 text-xs font-light"
          >
            {lang === 'fa' ? 'نظر شما ثبت شد. مرسی!' : 'Your review has been submitted. Thank you!'}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Review Form */}
      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="mb-8 overflow-hidden"
          >
            <div className="p-6 border border-neutral-800/50 bg-neutral-900/20 space-y-5">
              {/* Star rating input */}
              <div>
                <label className="text-[10px] tracking-[0.2em] text-neutral-500 font-mono block mb-2">
                  {lang === 'fa' ? 'امتیاز' : 'Rating'}
                </label>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(s => (
                    <StarIcon
                      key={s}
                      filled={s <= rating}
                      hover={s <= hoverRating}
                      onClick={() => setRating(s)}
                      onHover={() => setHoverRating(s)}
                      onLeave={() => setHoverRating(0)}
                    />
                  ))}
                  {rating > 0 && (
                    <span className="text-xs text-neutral-500 font-mono mr-2">
                      {rating}/5
                    </span>
                  )}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="text-[10px] tracking-[0.2em] text-neutral-500 font-mono block mb-2">
                  {lang === 'fa' ? 'نام' : 'Name'}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-transparent border border-neutral-800 px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors font-light"
                  placeholder={lang === 'fa' ? 'نام شما' : 'Your name'}
                />
              </div>

              {/* Comment */}
              <div>
                <label className="text-[10px] tracking-[0.2em] text-neutral-500 font-mono block mb-2">
                  {lang === 'fa' ? 'نظر' : 'Comment'}
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  rows={3}
                  className="w-full bg-transparent border border-neutral-800 px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors font-light resize-none"
                  placeholder={lang === 'fa' ? 'نظر خود را بنویسید...' : 'Write your review...'}
                />
              </div>

              {/* Submit */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitting || rating === 0 || !name.trim() || !comment.trim()}
                  className="flex items-center gap-2 text-[11px] tracking-[0.15em] font-mono transition-all border border-neutral-700 hover:border-white text-neutral-400 hover:text-white py-2.5 px-6 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  {submitting
                    ? (lang === 'fa' ? '...' : '...')
                    : (lang === 'fa' ? 'ثبت نظر' : 'Submit')
                  }
                </button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Reviews List */}
      {loading ? (
        <div className="py-8 text-center">
          <div className="w-5 h-5 border border-neutral-600 border-t-neutral-400 rounded-full animate-spin mx-auto" />
        </div>
      ) : reviews.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-sm text-neutral-600 font-light">
            {lang === 'fa' ? 'هنوز نظری ثبت نشده. اولین نفر باشید!' : 'No reviews yet. Be the first!'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-5 border-b border-neutral-800/30 last:border-0"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-xs text-neutral-400 font-light">
                    {review.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <span className="text-sm text-white font-light">{review.name}</span>
                    <div className="flex items-center gap-0.5 mt-0.5">
                      {[1,2,3,4,5].map(s => (
                        <StarIcon key={s} filled={s <= review.rating} />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] text-neutral-600 font-mono">
                  {formatDate(review.createdAt)}
                </span>
              </div>
              <p className="text-sm text-neutral-400 font-light leading-[1.8] mt-3 pl-11">
                {review.comment}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
