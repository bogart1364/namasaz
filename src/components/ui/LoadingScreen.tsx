import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  isLoading: boolean;
}

export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] bg-[#0a0a0a] flex items-center justify-center"
        >
          <div className="flex flex-col items-center gap-6">
            {/* Logo mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <svg viewBox="0 0 200 80" className="w-20 h-20" fill="none">
                <path d="M20 55 L45 20 L70 55" stroke="#c0392b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M45 55 L70 20 L95 55" stroke="#2c3e50" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M70 55 L95 20 L120 55" stroke="#7f8c8d" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="52" y="35" width="6" height="6" fill="#c0392b" rx="0.5" />
                <rect x="60" y="35" width="6" height="6" fill="#c0392b" rx="0.5" />
                <rect x="52" y="43" width="6" height="6" fill="#c0392b" rx="0.5" />
                <rect x="60" y="43" width="6" height="6" fill="#c0392b" rx="0.5" />
              </svg>
            </motion.div>

            {/* Progress bar */}
            <div className="w-40 h-[1px] bg-neutral-800 overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 2, ease: 'easeInOut' }}
                className="h-full bg-white/40"
              />
            </div>

            {/* Text */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-[9px] tracking-[0.4em] text-neutral-600 font-mono"
            >
              NAMASAZ
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
