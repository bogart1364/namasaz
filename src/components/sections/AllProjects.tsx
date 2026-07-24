import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLang } from '../../i18n/LanguageContext';
import ProjectDetail from './ProjectDetail';

interface AllProjectsProps {
  onClose: () => void;
}

export default function AllProjects({ onClose }: AllProjectsProps) {
  const { t, align } = useLang();
  const [selectedProject, setSelectedProject] = useState<typeof t.projects.data[0] | null>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') { if (selectedProject) setSelectedProject(null); else onClose(); } };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose, selectedProject]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-[#0a0a0a] overflow-y-auto hide-scrollbar"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
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
              {t.projects.label}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white tracking-tight mb-4">
              {t.projects.allProjects}
            </h1>
            <div className="w-12 h-[1px] bg-neutral-600 mt-6" />
          </motion.div>
        </div>

        {/* Projects grid */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {t.projects.data.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="group relative overflow-hidden cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="aspect-[3/4] w-full relative overflow-hidden bg-neutral-900">
                  <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className={`absolute bottom-0 left-0 right-0 p-6 ${align}`}>
                    <span className="text-[10px] tracking-[0.2em] text-neutral-400 block mb-2 font-mono">
                      {project.id} — {project.category} — {project.year}
                    </span>
                    <h3 className="text-lg font-light text-white mb-1.5 group-hover:text-neutral-200 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-neutral-500 mb-3">{project.subtitle}</p>
                    <div className={`flex items-center gap-2 text-[10px] text-neutral-500 mb-3 ${align === 'text-right' ? 'justify-end' : 'justify-start'}`}>
                      <span>{project.duration}</span>
                      <span className="w-1 h-1 rounded-full bg-neutral-700" />
                      <span>{project.area}</span>
                    </div>
                    <div className={`flex items-center gap-2 text-xs text-neutral-400 group-hover:text-white transition-colors ${align === 'text-right' ? 'justify-end' : 'justify-start'}`}>
                      <span>{t.projects.view}</span>
                      <svg className="w-3 h-3 rtl:rotate-180 rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 19 19 12 12 5" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}
