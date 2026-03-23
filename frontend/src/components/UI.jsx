import { useEffect, useRef, useState } from 'react';
import { BADGE_STYLES } from '../data/constants';

/* ── Section Tag ── */
export function SectionTag({ children }) {
  return (
    <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] uppercase text-violet-400 mb-4">
      <span className="w-4 h-px bg-violet-400 inline-block" />
      {children}
    </div>
  );
}

/* ── Section Title ── */
export function SectionTitle({ children, className = '' }) {
  return (
    <h2 className={`font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.05] mb-4 ${className}`}>
      {children}
    </h2>
  );
}

/* ── Scroll Reveal ── */
export function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(28px)',
        transition: `opacity 0.65s ${delay}ms cubic-bezier(0.23,1,0.32,1), transform 0.65s ${delay}ms cubic-bezier(0.23,1,0.32,1)`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Badge ── */
export function Badge({ type, children }) {
  return (
    <span className={`text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full ${BADGE_STYLES[type] || BADGE_STYLES.baseline}`}>
      {children}
    </span>
  );
}

/* ── Primary Button ── */
export function PrimaryBtn({ children, onClick, className = '', disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`cursor-pointer inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(124,92,252,0.35)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 tracking-wide ${className}`}
    >
      {children}
    </button>
  );
}

/* ── Secondary Button ── */
export function SecondaryBtn({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer inline-flex items-center gap-2 bg-transparent text-white hover:text-violet-300 font-medium text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5 rounded-full border border-white/10 hover:border-violet-500/60 transition-all duration-200 tracking-wide ${className}`}
    >
      {children}
    </button>
  );
}

/* ── Animated Confidence Bar ── */
export function ConfBar({ value, colorClass = 'from-violet-600 to-violet-400', delay = 0 }) {
  const [w, setW] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setTimeout(() => setW(value), delay);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value, delay]);
  return (
    <div ref={ref} className="h-1.5 bg-white/5 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full bg-gradient-to-r ${colorClass}`}
        style={{ width: w + '%', transition: 'width 1.4s cubic-bezier(0.23,1,0.32,1)' }}
      />
    </div>
  );
}

/* ── Spinner ── */
export function Spinner({ size = 12 }) {
  return (
    <div className={`w-${size} h-${size} rounded-full border-[3px] border-white/10 border-t-violet-500 animate-spin`} />
  );
}

/* ── Ambient Glow (decorative) ── */
export function Glow({ className = '' }) {
  return (
    <div className={`absolute rounded-full pointer-events-none ${className}`} />
  );
}
