import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLang } from '../../i18n/LanguageContext';
import ProjectDetail from './ProjectDetail';

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

export default function Projects() {
  const { t, align, alignEnd } = useLang();
  const [selectedProject, setSelectedProject] = useState<typeof t.projects.data[0] | null>(null);

  return (
    <>
      <section id="projects" className="relative w-full bg-[#0a0a0a] py-24 px-6 md:px-12 z-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <span className="text-[11px] tracking-[0.25em] text-neutral-500 block mb-4 uppercase font-light">{t.projects.label}</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white tracking-tight">
              {t.projects.title}
            </h2>
            <div className="w-12 h-[1px] bg-neutral-600 mt-6" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {t.projects.data.map((project, i) => (
              <motion.div
                key={project.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
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
                    <div className={`flex items-center gap-2 text-[10px] text-neutral-500 mb-3 ${alignEnd}`}>
                      <span>{project.duration}</span>
                      <span className="w-1 h-1 rounded-full bg-neutral-700" />
                      <span>{project.area}</span>
                    </div>
                    <div className={`flex items-center gap-2 text-xs text-neutral-400 group-hover:text-white transition-colors ${alignEnd}`}>
                      <span>{t.projects.view}</span>
                      <svg className="w-3 h-3 rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
      </section>
      <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}
