import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { skillGroups } from '../data/skills';
import { selectedWorks } from '../data/selectedWorks';
import Footer from '../components/Footer';

const fadeUp = {
  initial: { y: 24, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

function Section({ label, index, children }) {
  return (
    <section style={{ marginTop: '5rem' }}>
      <div className="flex items-center gap-4" style={{ marginBottom: '1.5rem' }}>
        <span className="font-ui text-[13px] font-medium uppercase tracking-[4px] text-accent-electric">
          {label}
        </span>
        <div className="h-px flex-1" style={{ background: 'rgba(245,240,232,0.08)' }} />
        {index && <span className="font-ui text-[12px] text-muted">{index}</span>}
      </div>
      {children}
    </section>
  );
}

export default function AgentsPage() {
  useEffect(() => {
    document.title = 'PM. — For Agents & Crawlers';
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 z-50 w-full glass"
        style={{ borderBottom: '3px solid #F5F0E8' }}
      >
        <div
          className="page-shell flex w-full items-center justify-between gap-6"
          style={{ paddingBlock: '10px' }}
        >
          <a
            href="/"
            className="font-display text-[28px] font-extrabold tracking-tight text-primary"
          >
            PM.
          </a>
          <a
            href="/"
            className="font-ui text-[13px] font-medium uppercase tracking-[3px] text-secondary
                       transition-colors duration-300 hover:text-primary"
          >
            ← Back to site
          </a>
        </div>
      </header>

      <main className="page-shell" style={{ paddingTop: 'clamp(140px, 20vw, 200px)', paddingBottom: '6rem' }}>
        <motion.p
          {...fadeUp}
          className="font-ui text-[13px] font-medium uppercase tracking-[4px] text-accent-electric"
        >
          For AI Agents &amp; Crawlers
        </motion.p>

        <motion.h1
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          style={{ marginTop: '1.5rem' }}
          className="max-w-[16ch] font-display text-[clamp(40px,7vw,88px)] font-extrabold
                     leading-[0.95] tracking-[-3px] text-primary"
        >
          BUILT FOR HUMANS <span className="text-accent-glow">AND AGENTS.</span>
        </motion.h1>

        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.2 }}
          style={{ marginTop: '2rem' }}
          className="max-w-[640px] font-body text-[17px] leading-[1.7] text-secondary"
        >
          This page is a structured, plain-language summary of the site for language models,
          search crawlers, and other automated agents — the same content a human would get from
          browsing the page, without needing to run the JavaScript. A machine-readable copy lives
          at{' '}
          <a href="/llms.txt" className="text-primary underline decoration-accent-glow underline-offset-4">
            /llms.txt
          </a>{' '}
          (the{' '}
          <a
            href="https://llmstxt.org"
            target="_blank"
            rel="noreferrer"
            className="text-primary underline decoration-accent-glow underline-offset-4"
          >
            llms.txt
          </a>{' '}
          convention), and crawling is open per{' '}
          <a href="/robots.txt" className="text-primary underline decoration-accent-glow underline-offset-4">
            /robots.txt
          </a>
          .
        </motion.p>

        <Section label="About" index="01">
          <motion.div {...fadeUp} className="glass max-w-[720px]" style={{ padding: '32px' }}>
            <p className="font-body text-[16px] leading-[1.7] text-secondary">
              <span className="text-primary">PM.</span> is a designer/developer working across
              product design, design systems, and front-end implementation. This portfolio site
              itself is a Vite + React single-page application styled with Tailwind CSS v4 and
              animated with Framer Motion.
            </p>
          </motion.div>
        </Section>

        <Section label="Skills & Frameworks" index="02">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {skillGroups.map((group, i) => (
              <motion.div
                key={group.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.05 }}
                className="glass"
                style={{ padding: '24px' }}
              >
                <h3 className="font-heading text-[18px] font-bold text-primary">{group.title}</h3>
                <p
                  className="font-body text-[14px] leading-[1.6] text-secondary"
                  style={{ marginTop: '0.5rem' }}
                >
                  {group.items.join(', ')}
                </p>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section label="Selected Works" index="03">
          <ul className="flex flex-col gap-4">
            {selectedWorks.map((project, i) => (
              <motion.li
                key={project.id}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.05 }}
                className="glass flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6"
                style={{ padding: '20px 24px' }}
              >
                <span className="font-ui text-[12px] text-muted">{project.num}</span>
                <h3 className="font-heading text-[18px] font-bold text-primary">{project.title}</h3>
                <p className="font-body text-[14px] text-secondary">{project.desc}</p>
              </motion.li>
            ))}
          </ul>
        </Section>

        <Section label="Notes for crawlers" index="04">
          <motion.ul
            {...fadeUp}
            className="flex max-w-[640px] flex-col gap-3 font-body text-[15px] leading-[1.7] text-secondary"
          >
            <li>• This is a client-rendered SPA — section content is not in the raw HTML response; render JavaScript or rely on this page and /llms.txt for a summary.</li>
            <li>• /robots.txt allows crawling of the whole site; /sitemap.xml lists indexable URLs.</li>
            <li>• Social links (GitHub, LinkedIn, Behance) are in the site footer below and in the Contact overlay on the home page.</li>
          </motion.ul>
        </Section>
      </main>

      <Footer />
    </>
  );
}
