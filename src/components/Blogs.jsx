import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { blogPosts, BLOG_URL } from '../data/blogs';

function ArrowIcon({ direction = 'up-right' }) {
  const paths = {
    'up-right': 'M5 15L15 5M15 5H7M15 5V13',
    left: 'M16 10H4M4 10L9 5M4 10L9 15',
    right: 'M4 10H16M16 10L11 5M16 10L11 15',
  };
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d={paths[direction]} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BlogCard({ post, index }) {
  return (
    <motion.a
      href={post.href}
      target="_blank"
      rel="noopener noreferrer"
      data-magnetic
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="blog-card glass group relative flex shrink-0 snap-start flex-col justify-between gap-10 overflow-hidden
                 transition-shadow duration-500 hover:shadow-[0_0_40px_rgb(var(--accent-rgb)/0.15)]"
      style={{ padding: '32px', minHeight: '340px' }}
    >
      <span
        className="pointer-events-none absolute right-5 top-3 font-display font-extrabold leading-none"
        style={{ fontSize: '140px', color: 'rgba(245,240,232,0.04)' }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="relative flex flex-col gap-4">
        <span className="font-ui text-[11px] font-medium uppercase tracking-[3px] text-accent-electric">
          {post.tag}
        </span>
        <h3 className="font-heading text-[28px] font-bold leading-tight tracking-[-0.5px] text-primary">
          {post.title}
        </h3>
        <p className="font-body text-[14px] leading-relaxed text-secondary">{post.desc}</p>
      </div>

      <div className="relative flex items-center gap-3 text-primary transition-colors duration-300 group-hover:text-accent-glow">
        <span className="font-ui text-[12px] font-medium uppercase tracking-[2px]">Read Post</span>
        <ArrowIcon />
      </div>
    </motion.a>
  );
}

export default function Blogs() {
  const trackRef = useRef(null);
  const [edges, setEdges] = useState({ atStart: true, atEnd: false });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      setEdges({ atStart: track.scrollLeft <= 4, atEnd: track.scrollLeft >= max - 4 });
    };

    update();
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      track.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const scrollByCard = (direction) => {
    const track = trackRef.current;
    const card = track?.querySelector('.blog-card');
    if (!card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: 'smooth' });
  };

  const navButtonClass =
    'inline-flex h-12 w-12 items-center justify-center border border-primary/15 text-primary transition-colors duration-300 hover:border-accent-glow hover:text-accent-glow disabled:opacity-30 disabled:hover:border-primary/15 disabled:hover:text-primary';

  return (
    <section id="blogs" className="page-shell" style={{ paddingTop: '6rem', marginBottom: '6rem' }}>
      <div className="mb-8 flex items-center gap-4">
        <span className="font-ui text-[18px] font-medium uppercase tracking-[4px] text-accent-electric">
          Blogs
        </span>
        <div className="h-px flex-1" style={{ background: 'rgba(245,240,232,0.08)' }} />
        <span className="font-ui text-[12px] text-muted">Writing</span>
      </div>

      <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="font-display text-[clamp(36px,5vw,56px)] font-bold leading-[1.05] tracking-[-1px] text-primary">
          Notes on design, dev
          <br />
          &amp; all things tech.
        </h2>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Previous post"
            data-magnetic
            onClick={() => scrollByCard(-1)}
            disabled={edges.atStart}
            className={navButtonClass}
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            type="button"
            aria-label="Next post"
            data-magnetic
            onClick={() => scrollByCard(1)}
            disabled={edges.atEnd}
            className={navButtonClass}
          >
            <ArrowIcon direction="right" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="blog-track flex snap-x snap-mandatory gap-6 overflow-x-auto"
        style={{ marginTop: '2.5rem' }}
      >
        {blogPosts.map((post, i) => (
          <BlogCard key={post.href} post={post} index={i} />
        ))}
      </div>

      <div className="flex justify-end" style={{ marginTop: '2.5rem' }}>
        <motion.a
          href={BLOG_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-magnetic
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ padding: '14px 32px 14px 34px' }}
          className="inline-flex items-center gap-3 border border-accent-soft bg-accent-glow font-ui text-[13px]
                     font-semibold uppercase tracking-[2px] text-void shadow-[0_10px_28px_rgb(var(--accent-rgb)/0.22)]
                     transition-shadow duration-300 hover:shadow-[0_0_30px_rgb(var(--accent-rgb)/0.4)]"
        >
          See More
          <ArrowIcon direction="right" />
        </motion.a>
      </div>
    </section>
  );
}
