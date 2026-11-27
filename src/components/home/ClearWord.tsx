import { useEffect, useRef, useState, type PointerEvent } from 'react';
import './ClearWord.css';

const STRIPS = 16; // the glass is wiped in thin vertical bands, each tracked separately
const WIPE = 0.34; // how much one pass over a strip clears it (about three passes)

/**
 * A word behind frosted glass. Rubbing across it (mouse or finger) wipes the
 * glass away where you rub, like a scratch card; a click or tap clears it all.
 * Once clear, it stays clear.
 */
export default function ClearWord({ children, onClear }: { children: string; onClear?: () => void }) {
  const [frost, setFrost] = useState<number[]>(() => Array(STRIPS).fill(1));
  const lastStrip = useRef<number | null>(null);
  const ref = useRef<HTMLSpanElement>(null);
  const done = frost.every((f) => f <= 0.05);
  const told = useRef(false);
  useEffect(() => {
    if (done && !told.current) {
      told.current = true;
      onClear?.();
    }
  }, [done, onClear]);

  const rub = (e: PointerEvent<HTMLSpanElement>) => {
    if (done || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const at = Math.min(STRIPS - 1, Math.max(0, Math.floor(((e.clientX - r.left) / r.width) * STRIPS)));
    const from = lastStrip.current ?? at;
    if (from === at && lastStrip.current !== null) return;
    lastStrip.current = at;
    const lo = Math.min(from, at);
    const hi = Math.max(from, at);
    setFrost((prev) => prev.map((f, i) => (i >= lo && i <= hi ? Math.max(0, f - WIPE) : f)));
  };

  const clearAll = () => setFrost(Array(STRIPS).fill(0));

  // One smooth pane of glass, masked so it's only as opaque as each rubbed spot,
  // with soft edges on all four sides so it melts into the page instead of reading as a box
  const mask = `linear-gradient(90deg, ${frost
    .map((f, i) => `rgb(0 0 0 / ${f.toFixed(2)}) ${(((i + 0.5) / STRIPS) * 100).toFixed(1)}%`)
    .join(', ')}), linear-gradient(90deg, transparent, #000 0.2em, #000 calc(100% - 0.2em), transparent), linear-gradient(180deg, transparent, #000 0.16em, #000 calc(100% - 0.16em), transparent)`;

  return (
    <span
      ref={ref}
      className={`clear-word${done ? ' is-clear' : ''}`}
      tabIndex={done ? -1 : 0}
      onPointerMove={rub}
      onPointerLeave={() => (lastStrip.current = null)}
      onClick={clearAll}
      onFocus={clearAll}
    >
      {children}
      <span
        className="clear-word__glass"
        aria-hidden="true"
        style={{ maskImage: mask, WebkitMaskImage: mask }}
      />
    </span>
  );
}
