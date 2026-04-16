import { motion } from 'framer-motion';

const PRINCIPLES = [
  { label: 'HIERARCHY', shape: 'circle', color: 'var(--color-accent-electric)' },
  { label: 'CONTRAST', shape: 'square', color: 'var(--color-accent-glow)' },
  { label: 'ALIGNMENT', shape: 'triangle', color: 'var(--color-primary)' },
  { label: 'PROXIMITY', shape: 'diamond', color: 'var(--color-accent-electric)' },
  { label: 'BALANCE', shape: 'pill', color: 'var(--color-accent-glow)' },
  { label: 'REPETITION', shape: 'ring', color: 'var(--color-primary)' },
  { label: 'WHITE SPACE', shape: 'circle', color: 'var(--color-accent-electric)' },
  { label: 'RHYTHM', shape: 'square', color: 'var(--color-accent-glow)' },
];

const Shape = ({ type, color }) => {
  switch (type) {
    case 'circle':
      return <div className="w-4 h-4 rounded-full border-2" style={{ borderColor: color }} />;
    case 'square':
      return <div className="w-4 h-4 border-2" style={{ borderColor: color }} />;
    case 'triangle':
      return (
        <div 
          className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[16px]" 
          style={{ borderBottomColor: color }}
        />
      );
    case 'diamond':
      return <div className="w-4 h-4 rotate-45 border-2" style={{ borderColor: color }} />;
    case 'pill':
      return <div className="w-8 h-4 rounded-full border-2" style={{ borderColor: color }} />;
    case 'ring':
      return <div className="w-4 h-4 rounded-full border-2 border-dashed" style={{ borderColor: color }} />;
    default:
      return null;
  }
};

export default function DesignTicker() {
  const tickerItems = [...PRINCIPLES, ...PRINCIPLES, ...PRINCIPLES, ...PRINCIPLES];

  return (
    <div className="w-full overflow-hidden bg-void py-20 border-y border-glass-border relative">
      {/* Gradient Fades for depth */}
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-void to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-void to-transparent z-10" />

      <motion.div
        animate={{ x: ['-25%', 0] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex gap-32 whitespace-nowrap items-center min-w-max"
      >
        {tickerItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-10 opacity-70 hover:opacity-100 transition-opacity">
            <Shape type={item.shape} color={item.color} />
            <span className="font-heading font-black text-[32px] md:text-[48px] tracking-[-0.04em] text-primary">
              {item.label}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
