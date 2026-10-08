import { motion } from 'framer-motion';

const navLinks = ['Skills', 'Works', 'About'];

export default function Navbar({ onContactClick }) {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 w-full z-50 glass"
      style={{ borderBottom: '3px solid #F5F0E8' }}
    >
      <div
        className="page-shell flex w-full items-center justify-between gap-6"
        style={{ paddingBlock: '10px' }}
      >
        <span className="font-display font-extrabold text-[28px] text-primary tracking-tight">
          PM.
        </span>

        <div className="flex items-center gap-4 sm:gap-6 lg:gap-10">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              data-magnetic
              className="font-ui font-medium text-[13px] text-secondary tracking-[3px] uppercase
                         hover:text-primary transition-colors duration-300 cursor-pointer"
            >
              {link}
            </a>
          ))}

          <motion.button
            type="button"
            onClick={onContactClick}
            data-magnetic
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ padding: '11px 34px 11px 36px' }}
            className="inline-flex items-center justify-center rounded-[0px] border border-accent-soft
                       bg-accent-glow font-ui font-semibold text-[13px] text-void
                       tracking-[2px] uppercase cursor-pointer shadow-[0_10px_28px_rgb(var(--accent-rgb)/0.22)]
                       hover:shadow-[0_0_30px_rgb(var(--accent-rgb)/0.4)] transition-shadow duration-300"
          >
            Contact
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}
