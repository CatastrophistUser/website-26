import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

function AnimatedNumber({ target, suffix = '', color }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView, target]);

  return (
    <span ref={ref} className="font-display font-extrabold text-[72px] tracking-[-3px] leading-none" style={{ color }}>
      {count}{suffix}
    </span>
  );
}

const stats = [
  { value: 2, suffix: '+', label: 'Years', color: '#F5F0E8' },
  { value: 20, suffix: '+', label: 'Projects', color: 'var(--color-accent-glow)' },
];

export default function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const panelY = useTransform(scrollYProgress, [0, 1], [80, -40]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="page-shell py-24"
      style={{ marginBottom: '6rem' }}
    >
      <div className="flex flex-col items-start gap-12 lg:flex-row lg:gap-16">
        {/* Left — Manifesto */}
        <div className="flex-1 flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <span className="font-ui font-medium text-[18px] text-accent-electric tracking-[4px] uppercase">
              Manifesto
            </span>
            <div className="flex-1 h-px" style={{ background: 'rgba(245,240,232,0.08)' }} />
          </div>

          <motion.blockquote
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="font-display font-bold text-[40px] text-primary leading-[1.15] tracking-[-1px]"
          >
            "All things tech."
          </motion.blockquote>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-body text-[16px] text-secondary leading-[1.7] max-w-[520px]"
          >
            With over 2 years of experience building web apps, mobile apps, and the
            designs behind them, I work across the full stack — tackling auth,
            microservices, databases, and IoT along the way. Design is where it starts;
            shipping systems that hold up is where it counts.
          </motion.p>
        </div>

        {/* Right — Stats Panel */}
        <motion.div
          style={{ y: panelY }}
          className="w-full max-w-[380px] glass-heavy flex flex-col lg:-mt-16"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="flex items-baseline gap-3 px-8 py-9"
              style={{
                borderBottom: i < stats.length - 1 ? '1px solid rgba(245,240,232,0.06)' : 'none',
              }}
            >
              <AnimatedNumber target={stat.value} suffix={stat.suffix} color={stat.color} />
              <span className="font-ui font-medium text-[12px] text-secondary tracking-[2px] uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
