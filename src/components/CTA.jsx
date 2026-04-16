import { motion } from 'framer-motion';
import { useMagneticElement } from '../hooks/useMagneticCursor';

export default function CTA({ onContactClick }) {
  const magnetic = useMagneticElement();

  return (
    <section className="page-shell relative flex flex-col items-center py-32">
      {/* Divider */}
      <div
        className="w-full h-px mb-16"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(245,240,232,0.12) 50%, transparent 100%)' }}
      />

      {/* Massive CTA text */}
      <div className="flex flex-col items-center gap-4 text-center">
        <motion.h2
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display font-extrabold text-[clamp(40px,5.8vw,78px)] text-primary
                     tracking-[-4px] leading-none text-center whitespace-nowrap"
        >
          DESIGN DEVELOP
        </motion.h2>

        <motion.h2
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display font-extrabold text-[clamp(48px,7vw,96px)] text-accent-glow
                     tracking-[-4px] leading-none text-center"
        >
          SCALE
        </motion.h2>
      </div>

      {/* Glowing CTA Button */}
      <motion.div
        ref={magnetic.ref}
        style={{ x: magnetic.x, y: magnetic.y, marginTop: '8rem' }}
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="relative"
      >
        {/* Grain on button */}
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-[0.08]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 128 128' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: '128px 128px',
            mixBlendMode: 'overlay',
          }}
        />
        <motion.button
          type="button"
          onClick={onContactClick}
          data-magnetic
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative inline-flex min-h-[60px] items-center justify-center rounded-[4px] border border-[#ffb08f]
                     pl-24 pr-18 py-0 bg-accent-glow font-display font-extrabold text-[14px] text-center text-void
                     tracking-[10px] uppercase cursor-pointer glow-pulse shadow-[0_14px_40px_rgba(255,107,53,0.28)]"
        >
          CONNECT
        </motion.button>
      </motion.div>
    </section>
  );
}
