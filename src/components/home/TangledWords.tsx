import { useLayoutEffect, useRef, useState } from 'react';
import { useMediaQuery } from '../common/useMediaQuery';
import './TangledWords.css';

/** Repeatable pseudo-random number in [-1, 1] for a given seed. */
const noise = (seed: number) => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
};

/** A repeatable shuffle of 0..n-1 that moves every letter it can. */
const shuffle = (n: number, seed: number) => {
  const order = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(((noise(seed * 31 + i) + 1) / 2) * (i + 1)) % (i + 1);
    [order[i], order[j]] = [order[j], order[i]];
  }
  // Nudge any letter that landed back on its own spot
  for (let i = 0; i < n; i++) {
    if (order[i] === i && n > 1) {
      const k = (i + 1) % n;
      [order[i], order[k]] = [order[k], order[i]];
    }
  }
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
 * Words whose letters start jumbled (swapped around and slightly tilted, each word
 * keeping to itself so lines never break differently) and slide into order.
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
          const dy = noise(own + 7) * 0.14;
          const turn = noise(own + 3) * 14;
          out.push(`translate(${dx.toFixed(1)}px, ${dy.toFixed(2)}em) rotate(${turn.toFixed(1)}deg)`);
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
                      transitionDelay: tangled ? '0ms' : `${i * 28}ms`,
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
