import { motion } from 'framer-motion';

const socials = ['Github', 'LinkedIn', 'Behance'];

export default function Footer() {
  return (
    <footer
      className="page-shell brutal-border border-l-0 border-r-0 border-b-0"
      style={{ marginTop: '6rem' }}
    >
      <div className="grid gap-6 py-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
        <span className="font-display font-extrabold text-[20px] text-primary lg:justify-self-start">PM.</span>

        <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-8 lg:justify-self-center">
          {socials.map((s) => (
            <a
              key={s}
              href="#"
              data-magnetic
              className="font-ui font-medium text-[12px] text-secondary tracking-[2px] uppercase
                         hover:text-primary transition-colors duration-300 cursor-pointer"
            >
              {s}
            </a>
          ))}
        </div>

        <span className="font-body text-[12px] text-accent-glow lg:justify-self-end">
          Designed by Pranjal — All rights reserved
        </span>
      </div>
    </footer>
  );
}
