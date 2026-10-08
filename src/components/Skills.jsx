import { motion } from 'framer-motion';
import { skillGroups } from '../data/skills';

function SkillCard({ group, index }) {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="glass flex flex-col gap-8"
      style={{ padding: '32px' }}
    >
      <div className="flex items-baseline justify-between">
        <h3 className="font-heading text-[24px] font-bold tracking-[-0.5px] text-primary">
          {group.title}
        </h3>
        <span className="font-display text-[14px] font-extrabold text-accent-glow">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <ul className="flex flex-wrap gap-3">
        {group.items.map((item) => (
          <li
            key={item}
            data-magnetic
            className="cursor-pointer border border-primary/15 font-ui text-[13px] font-medium
                       text-secondary transition-colors duration-300
                       hover:border-accent-glow hover:text-primary"
            style={{ padding: '8px 14px' }}
          >
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="page-shell"
      style={{ paddingTop: '6rem', marginBottom: '6rem' }}
    >
      <div className="mb-8 flex items-center gap-4">
        <span className="font-ui text-[18px] font-medium uppercase tracking-[4px] text-accent-electric">
          Skills &amp; Frameworks
        </span>
        <div className="h-px flex-1" style={{ background: 'rgba(245,240,232,0.08)' }} />
        <span className="font-ui text-[12px] text-muted">Toolkit</span>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group, i) => (
          <SkillCard key={group.title} group={group} index={i} />
        ))}
      </div>
    </section>
  );
}
