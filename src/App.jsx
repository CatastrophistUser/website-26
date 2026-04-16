import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Works from './components/Works';
import About from './components/About';
import CTA from './components/CTA';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const [contactOverlay, setContactOverlay] = useState({ open: false, source: 'nav' });

  useEffect(() => {
    document.body.style.overflow = contactOverlay.open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [contactOverlay.open]);

  useEffect(() => {
    if (!contactOverlay.open) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setContactOverlay((current) => ({ ...current, open: false }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [contactOverlay.open]);

  const openContact = (source) => setContactOverlay({ open: true, source });
  const closeContact = () => setContactOverlay((current) => ({ ...current, open: false }));

  const revealOrigin =
    contactOverlay.source === 'cta'
      ? 'circle(0px at 50% calc(100% - 120px))'
      : 'circle(0px at calc(100% - 108px) 58px)';

  return (
    <>
      {/* Custom Magnetic Cursor */}
      <CustomCursor />

      {/* Film Grain Overlay */}
      <div className="grain-overlay" />

      {/* Page Layout */}
      <Navbar onContactClick={() => openContact('nav')} />
      <main className="w-full cursor-none overflow-x-clip md:cursor-none">
        <Hero />
        <Works />
        <About />
        <CTA onContactClick={() => openContact('cta')} />
      </main>
      <Footer />

      <AnimatePresence>
        {contactOverlay.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[120] overflow-hidden"
          >
            <motion.div
              initial={{ clipPath: revealOrigin }}
              animate={{ clipPath: 'circle(160% at 50% 50%)' }}
              exit={{ clipPath: revealOrigin }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 bg-accent-glow"
            />

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="relative z-10 flex min-h-screen flex-col"
            >
              <div className="page-shell flex items-center justify-between py-8">
                <span className="font-display text-[28px] font-extrabold tracking-tight text-void">PM.</span>
                <button
                  type="button"
                  onClick={closeContact}
                  className="inline-flex h-14 w-14 items-center justify-center rounded-[8px] border border-[rgba(10,10,10,0.35)] text-[24px] text-void transition-colors duration-300 hover:bg-[rgba(10,10,10,0.08)]"
                >
                  ×
                </button>
              </div>

              <div className="page-shell flex flex-1 flex-col justify-center py-16">
                <span className="font-ui text-[12px] font-semibold uppercase tracking-[4px] text-[rgba(10,10,10,0.65)]">
                  Contact
                </span>
                <h2 className="mt-6 max-w-[10ch] font-display text-[clamp(64px,11vw,160px)] font-extrabold leading-[0.9] tracking-[-0.06em] text-void">
                  LET&apos;S BUILD IT.
                </h2>
                <p className="mt-8 max-w-[620px] font-body text-[18px] leading-[1.7] text-[rgba(10,10,10,0.78)]">
                  Reach out through the channels below for collaborations, product design work, and visual systems.
                </p>

                <div className="mt-14 grid gap-6 md:grid-cols-3">
                  <a
                    href="#"
                    className="rounded-[10px] border border-[rgba(10,10,10,0.18)] bg-[rgba(245,240,232,0.14)] px-7 py-8 text-void transition-transform duration-300 hover:-translate-y-1"
                  >
                    <span className="font-ui text-[11px] font-semibold uppercase tracking-[3px] text-[rgba(10,10,10,0.58)]">
                      Social
                    </span>
                    <div className="mt-3 font-display text-[28px] font-extrabold tracking-[-0.04em]">Github</div>
                    <div className="mt-2 font-body text-[15px] text-[rgba(10,10,10,0.76)]">Code, experiments, and shipping work.</div>
                  </a>
                  <a
                    href="#"
                    className="rounded-[10px] border border-[rgba(10,10,10,0.18)] bg-[rgba(245,240,232,0.14)] px-7 py-8 text-void transition-transform duration-300 hover:-translate-y-1"
                  >
                    <span className="font-ui text-[11px] font-semibold uppercase tracking-[3px] text-[rgba(10,10,10,0.58)]">
                      Social
                    </span>
                    <div className="mt-3 font-display text-[28px] font-extrabold tracking-[-0.04em]">LinkedIn</div>
                    <div className="mt-2 font-body text-[15px] text-[rgba(10,10,10,0.76)]">Professional updates and direct outreach.</div>
                  </a>
                  <a
                    href="#"
                    className="rounded-[10px] border border-[rgba(10,10,10,0.18)] bg-[rgba(245,240,232,0.14)] px-7 py-8 text-void transition-transform duration-300 hover:-translate-y-1"
                  >
                    <span className="font-ui text-[11px] font-semibold uppercase tracking-[3px] text-[rgba(10,10,10,0.58)]">
                      Portfolio
                    </span>
                    <div className="mt-3 font-display text-[28px] font-extrabold tracking-[-0.04em]">Behance</div>
                    <div className="mt-2 font-body text-[15px] text-[rgba(10,10,10,0.76)]">Selected visual work and case studies.</div>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
