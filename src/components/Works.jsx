import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { selectedWorks } from '../data/selectedWorks';

function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.3], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], [60, 0]);
  const isFeatured = project.layout === 'featured';

  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity, y }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      data-magnetic
      className={`cursor-pointer transition-shadow duration-500 hover:shadow-[0_0_40px_rgb(var(--accent-rgb)/0.15)]
        ${project.brutal ? 'brutal-border' : 'glass'}
        ${isFeatured ? 'col-span-2' : ''}
      `}
    >
      <div className={`flex ${isFeatured ? 'flex-row' : 'flex-col'}`}>
        <div
          className={`relative flex items-end p-8 ${isFeatured ? 'w-[55%] h-[380px]' : 'w-full h-[280px]'
            }`}
          style={{ background: project.gradient }}
        >
          {project.image && (
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          <span
            className="font-display font-extrabold absolute top-5 left-6 leading-none"
            style={{
              fontSize: isFeatured ? '180px' : '140px',
              color: 'rgba(245,240,232,0.04)',
            }}
          >
            {project.num}
          </span>
          {isFeatured && (
            <div className="relative z-10">
              <span
                className="font-ui font-medium text-[11px] tracking-[3px] uppercase"
                style={{ color: project.categoryColor }}
              >
                {project.category}
              </span>
            </div>
          )}
        </div>

        <div className={`flex flex-col gap-3 ${isFeatured ? 'flex-1 justify-between p-10' : 'p-7'}`}>
          {!isFeatured && (
            <span
              className="font-ui font-medium text-[11px] tracking-[3px] uppercase"
              style={{ color: project.categoryColor }}
            >
              {project.category}
            </span>
          )}
          <div className="flex flex-col gap-3">
            <h3
              className={`font-heading font-bold text-primary ${isFeatured ? 'text-[36px] tracking-[-1px] leading-tight' : 'text-[28px] tracking-[-0.5px]'
                }`}
            >
              {project.title}
            </h3>
            <p className={`font-body text-secondary leading-relaxed ${isFeatured ? 'text-[15px]' : 'text-[14px]'}`}>
              {project.desc}
            </p>
          </div>
          {isFeatured && (
            <div className="mt-4 flex items-center gap-3">
              <span className="font-ui font-medium text-[12px] text-primary tracking-[2px] uppercase">
                View Project
              </span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 15L15 5M15 5H7M15 5V13" stroke="#F5F0E8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Works() {
  return (
    <section
      id="works"
      className="page-shell pt-48 pb-20"
      style={{ marginBottom: '6rem' }}
    >
      <div className="mb-8 flex items-center gap-4">
        <span className="font-ui font-medium text-[18px] text-accent-electric tracking-[4px] uppercase">
          Selected Works
        </span>
        <div className="h-px flex-1" style={{ background: 'rgba(245,240,232,0.08)' }} />
        <span className="font-ui text-[12px] text-muted">2024 - 2026</span>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {selectedWorks.map((project) => (
          <div key={project.id} className={project.layout === 'offset' ? '-mt-10' : ''}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
}
