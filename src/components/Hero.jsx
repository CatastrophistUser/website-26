import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

function BrutalistGeometry() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-void border-y border-muted/20 flex items-center justify-center">

      {/* Background Industrial Grid */}
      <motion.div
        animate={{ x: [0, -100], y: [0, -100] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 w-[200%] h-[200%] opacity-20"
        style={{
          backgroundImage: 'linear-gradient(var(--color-muted) 2px, transparent 2px), linear-gradient(90deg, var(--color-muted) 2px, transparent 2px)',
          backgroundSize: '100px 100px'
        }}
      />

      {/* Extreme Barcode Scanner overlay */}
      <div className="absolute inset-0 flex rotate-12 opacity-10 scale-150 pointer-events-none mix-blend-plus-lighter">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="h-full bg-accent-glow origin-left flex-1"
            style={{ borderRight: '10px solid transparent' }}
            animate={{ scaleX: [Math.random() + 0.5, Math.random() * 3, Math.random() + 0.5] }}
            transition={{ duration: Math.random() * 0.5 + 0.2, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>

      {/* Massive Wireframe Void */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] border-[2px] border-accent-glow border-dashed rounded-full mix-blend-difference z-10"
      />
      <motion.div
        animate={{ rotate: -360, scale: [1, 1.1, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] border-[40px] border-secondary/10 rounded-full"
      />

      {/* Brutalist Monolith X */}
      <motion.div
        animate={{ rotate: [0, 90, 180, 270, 360], scale: [1, 0.8, 1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "anticipate" }}
        className="absolute flex items-center justify-center mix-blend-exclusion z-20"
      >
        <div className="w-[120vw] h-[60px] max-w-[1500px] bg-accent-glow absolute" />
        <div className="w-[60px] h-[120vw] max-h-[1500px] bg-accent-glow absolute" />
      </motion.div>

      {/* Pulsing Core */}
      <motion.div
        animate={{ scale: [1, 2.5, 0], opacity: [1, 0, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "circInOut" }}
        className="absolute w-[200px] h-[200px] bg-accent-electric mix-blend-overlay rounded-full z-30"
      />

      {/* Heavy Geometric Frame */}
      <div className="absolute inset-8 md:inset-12 border-[8px] md:border-[16px] border-secondary/20 pointer-events-none z-40" />
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  return (
    <section
      ref={sectionRef}
      className="page-shell relative min-h-screen overflow-hidden pt-32 pb-20"
    >
      {/* Decorative Grid Lines */}
      {[360, 720, 1080].map((left) => (
        <div
          key={left}
          className="absolute top-0 h-full w-px"
          style={{ left: `${left}px`, background: 'rgba(245,240,232,0.03)' }}
        />
      ))}

      <motion.div
        style={{ y: textY, opacity, marginTop: '4rem' }}
        className="relative z-10 pt-64 lg:pt-80"
      >
        <div className="flex flex-col">
          <motion.p
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-heading font-bold text-[clamp(28px,3.5vw,48px)] text-secondary
                       tracking-[-1px] leading-[1.2] pl-2"
          >
            BUILDING TOMORROW
          </motion.p>

          <motion.h1
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display font-extrabold text-[clamp(60px,8vw,110px)] text-accent-glow
                       leading-[0.95] tracking-[-4px]"
          >
            LINE BY LINE
          </motion.h1>
        </div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap items-center gap-4 pt-12 pl-2 sm:gap-6"
        >
          <div className="w-20 h-[2px] bg-muted" />
          <p className="font-body text-[16px] text-secondary leading-relaxed max-w-none">
            THE FUTURE BELONGS TO THOSE WHO WORK FOR IT
          </p>
        </motion.div>
      </motion.div>

      <div className="relative h-[600px] mt-16 mb-16">
        <BrutalistGeometry />
      </div>

      <div className="h-48 md:h-10 w-full" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-[var(--page-gutter)] flex flex-col items-center gap-3"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-[1px] h-12 bg-muted"
        />
        <span className="font-ui text-[10px] text-muted tracking-[3px] uppercase">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
