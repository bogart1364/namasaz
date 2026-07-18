import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useLang } from '../../i18n/LanguageContext';

interface ProjectDetailProps {
  project: {
    id: string;
    title: string;
    subtitle: string;
    category: string;
    year: string;
    location: string;
    area: string;
    duration: string;
    client: string;
    description: string;
    images: string[];
    specs: { label: string; value: string }[];
  } | null;
  onClose: () => void;
}

export default function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  const { t, align, alignEnd } = useLang();

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [project]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && project) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose, project]);

  if (!project) return null;

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

      {/* Back link */}
      <button
        onClick={onClose}
        className={`fixed top-20 right-6 z-[110] flex items-center gap-2 text-[11px] tracking-[0.15em] text-neutral-400 font-mono hover:text-white transition-colors group cursor-pointer`}
      >
        {t.projects.allProjects}
        <svg className="w-3.5 h-3.5 rtl:group-hover:translate-x-1 ltr:group-hover:-translate-x-1 transition-transform rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 5 12 12 19" />
        </svg>
      </button>

      {/* Hero image */}
      <div className="w-full h-[60vh] md:h-[70vh] relative">
        <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/30" />
        <div className={`absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-10 ${align === 'text-right' ? 'text-right' : 'text-left'}`}>
          <span className="text-[10px] tracking-[0.3em] text-neutral-400 font-mono">
            {project.id} — {project.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-extralight text-white tracking-tight mt-2">
            {project.title}
          </h1>
          <p className="text-sm text-neutral-500 mt-1.5">{project.subtitle}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 md:px-16 py-12">
        {/* Project info grid */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 pb-8 border-b border-neutral-800/50 ${align}`}>
          {project.specs.map((spec, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>
              <span className="text-[10px] tracking-[0.2em] text-neutral-600 font-mono block mb-1.5">{spec.label}</span>
              <span className="text-sm text-white font-light">{spec.value}</span>
            </motion.div>
          ))}
        </div>

        {/* Description */}
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10 ${align}`}>
          <div className="lg:col-span-1">
            <span className="text-[10px] tracking-[0.2em] text-neutral-500 font-mono block mb-3">{t.projects.intro}</span>
            <h3 className="text-xl font-light text-white mb-1">{project.title}</h3>
            <p className="text-xs text-neutral-500 font-mono">{project.subtitle}</p>
          </div>
          <div className="lg:col-span-2">
            <p className="text-sm text-neutral-400 leading-[2] font-light">{project.description}</p>
          </div>
        </div>

        {/* Gallery */}
        <div className="mb-10">
          <span className="text-[10px] tracking-[0.2em] text-neutral-500 font-mono block mb-4">
            {t.projects.gallery} — {project.images.length} {t.projects.images}
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {project.images.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className={`relative overflow-hidden ${i === 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-[4/3]'}`}
              >
                <img src={img} alt={`${project.title} - ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors duration-500" />
                <div className="absolute bottom-2 right-2">
                  <span className="text-[10px] text-white/50 font-mono bg-black/40 px-2 py-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Construction details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 py-8 border-y border-neutral-800/50">
          <div>
            <span className="text-[10px] tracking-[0.2em] text-neutral-500 font-mono block mb-4">{t.projects.construction}</span>
            <div className="space-y-0">
              {[
                { label: t.projects.structure, value: t.projects.structureValue },
                { label: t.projects.floors, value: t.projects.floorsValue },
                { label: t.projects.foundation, value: t.projects.foundationValue },
                { label: t.projects.hvac, value: t.projects.hvacValue },
              ].map((item, i) => (
                <div key={i} className={`flex items-center justify-between py-2.5 border-b border-neutral-800/30 ${align}`}>
                  <span className="text-sm text-neutral-400 font-light">{item.label}</span>
                  <span className="text-sm text-white font-light">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <span className="text-[10px] tracking-[0.2em] text-neutral-500 font-mono block mb-4">{t.projects.timeline}</span>
            <div className="space-y-0">
              {[
                { label: t.projects.designDuration, value: t.projects.designDurationValue },
                { label: t.projects.execDuration, value: project.duration },
                { label: t.projects.startDate, value: t.projects.startDateValue },
                { label: t.projects.endDate, value: t.projects.endDateValue },
              ].map((item, i) => (
                <div key={i} className={`flex items-center justify-between py-2.5 border-b border-neutral-800/30 ${align}`}>
                  <span className="text-sm text-neutral-400 font-light">{item.label}</span>
                  <span className="text-sm text-white font-light">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className={`flex items-center gap-6 ${alignEnd}`}>
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-[11px] tracking-[0.15em] text-neutral-400 font-mono hover:text-white transition-colors group"
          >
            {t.projects.allProjects}
            <svg className="w-3.5 h-3.5 rtl:group-hover:translate-x-1 ltr:group-hover:-translate-x-1 transition-transform rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 5 12 12 19" />
            </svg>
          </button>
          <div className="w-[1px] h-3 bg-neutral-700" />
          <a href="#" className="flex items-center gap-2 text-[11px] tracking-[0.15em] text-neutral-400 font-mono hover:text-white transition-colors group">
            {t.projects.nextProject}
            <svg className="w-3.5 h-3.5 rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 19 19 12 12 5" />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
