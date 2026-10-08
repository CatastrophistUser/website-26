import { motion } from 'framer-motion';

const socials = [
  { label: 'LeetCode', href: 'https://leetcode.com/u/CatastrophistUser/', external: true },
  { label: 'Codeforces', href: 'https://codeforces.com/profile/CatastrophistUser', external: true },
  { label: 'Github', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Behance', href: '#' },
  { label: 'Agents', href: '/agents' },
];

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
              key={s.label}
              href={s.href}
              data-magnetic
              {...(s.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="font-ui font-medium text-[12px] text-secondary tracking-[2px] uppercase
                         hover:text-primary transition-colors duration-300 cursor-pointer"
            >
              {s.label}
            </a>
          ))}
        </div>

        <span className="font-body text-[12px] text-accent-glow lg:justify-self-end">
          Designed by Pranjal
        </span>
      </div>
    </footer>
  );
}
