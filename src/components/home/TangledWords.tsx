import { useLayoutEffect, useRef, useState } from 'react';
import { useMediaQuery } from '../common/useMediaQuery';
import './TangledWords.css';

/** Repeatable pseudo-random number in [-1, 1] for a given seed. */
const noise = (seed: number) => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
};

/**
 * A light jumble of 0..n-1: swap two pairs of neighbouring letters,
 * away from the first letter, so the word still reads at a glance ("comlpex").
 */
const shuffle = (n: number, seed: number) => {
  const order = Array.from({ length: n }, (_, i) => i);
  if (n < 4) return order;
  const first = 1 + (Math.abs(Math.floor(noise(seed) * 100)) % Math.max(1, Math.floor(n / 2) - 1));
  const second = Math.min(n - 2, first + 2 + (Math.abs(Math.floor(noise(seed + 5) * 100)) % 2));
  for (const i of [first, second]) [order[i], order[i + 1]] = [order[i + 1], order[i]];
  return order;
};

type Props = {
  text: string;
  /** Once true, the letters slide into order and stay there. */
  untangled: boolean;
  /** Called when someone hovers, taps or focuses the jumble. */
  onUntangle: () => void;
};

/**
 * Words with a few letters quietly swapped (each word
 * keeping to itself so lines never break differently) that slide into order.
 * Screen readers always get the plain text.
 */
export default function TangledWords({ text, untangled, onUntangle }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [moves, setMoves] = useState<string[] | null>(null);
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const words = text.split(' ');

  // Measure where each letter sits, then work out where its jumbled twin sits
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const measure = () => {
      const letters = Array.from(el.querySelectorAll<HTMLElement>('.tangle__ch'));
      const xs = letters.map((l) => l.offsetLeft);
      const ws = letters.map((l) => l.offsetWidth);
      const out: string[] = [];
      let start = 0;
      words.forEach((w, wi) => {
        const n = w.length;
        // order[p] = which letter sits at position p in the jumbled word
        const order = shuffle(n, wi + 1);
        const target: number[] = [];
        let x = xs[start];
        order.forEach((letter) => {
          target[letter] = x;
          x += ws[start + letter];
        });
        for (let i = 0; i < n; i++) {
          const own = start + i;
          const dx = target[i] - xs[own];
          const moved = Math.abs(dx) > 0.5;
          const dy = moved ? noise(own + 7) * 0.05 : 0;
          out.push(`translate(${dx.toFixed(1)}px, ${dy.toFixed(2)}em)`);
        }
        start += n;
      });
      setMoves(out);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, reduced]);

  const tangled = !untangled && !reduced && moves !== null;
  let k = 0;

  return (
    <span
      ref={ref}
      className={`tangle${tangled ? ' is-tangled' : ''}`}
      tabIndex={tangled ? 0 : -1}
      onPointerEnter={onUntangle}
      onClick={onUntangle}
      onFocus={onUntangle}
    >
      <span className="visually-hidden">{text}</span>
      <span aria-hidden="true">
        {words.map((w, wi) => (
          <span key={wi}>
            {wi > 0 && ' '}
            <span className="tangle__word">
              {Array.from(w).map((ch) => {
                const i = k++;
                return (
                  <span
                    key={i}
                    className="tangle__ch"
                    style={{
                      transform: tangled && moves ? moves[i] : 'none',
                      transitionDelay: tangled ? '0ms' : `${i * 12}ms`,
                    }}
                  >
                    {ch}
                  </span>
                );
              })}
            </span>
          </span>
        ))}
      </span>
    </span>
  );
}
