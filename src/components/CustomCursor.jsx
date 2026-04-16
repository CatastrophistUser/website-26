import { motion } from 'framer-motion';
import { useMagneticCursor } from '../hooks/useMagneticCursor';

export default function CustomCursor() {
  const { cursorXSpring, cursorYSpring, isHovering } = useMagneticCursor();

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
        }}
        className={`magnetic-cursor hidden md:block ${isHovering ? 'expanded' : ''}`}
      />

      {/* Trailing ring */}
      <motion.div
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
        }}
        className="fixed pointer-events-none z-[9999] hidden md:block"
      >
        <motion.div
          animate={{
            width: isHovering ? 80 : 40,
            height: isHovering ? 80 : 40,
            x: isHovering ? -30 : -10,
            y: isHovering ? -30 : -10,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="rounded-full border border-accent-glow/30"
        />
      </motion.div>
    </>
  );
}
