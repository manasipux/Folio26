import { useEffect, useRef, useState } from 'react';
import BobPeek from './BobPeek';

const NEAR = 150; // px: how close the cursor must be before Bob reacts
const W = 64; // Bob's width

/**
 * Bob perched on a heading. When the mouse comes near, he shuffles along
 * the top of the heading towards it and his eyes follow it.
 */
export default function PerchedBob() {
  const ref = useRef<HTMLSpanElement>(null);
  const [x, setX] = useState(0);
  const [look, setLook] = useState({ x: 0, y: 1 });
  const xRef = useRef(0);

  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // Measure from his resting slot (offsetLeft ignores the transform),
        // so the maths stays stable while he is mid-move.
        const h = host.getBoundingClientRect();
        const restLeft = h.left + el.offsetLeft;
        const cx = restLeft + xRef.current + W / 2;
        const cy = h.top + el.offsetTop + el.offsetHeight * 0.6;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const near = Math.hypot(dx, dy) < NEAR;

        // Eyes: look towards the cursor when it is near, otherwise down at the table.
        setLook(
          near
            ? { x: Math.max(-1.3, Math.min(1.3, dx / 40)), y: Math.max(-1, Math.min(1.2, dy / 40)) }
            : { x: 0, y: 1 },
        );

        // Body: shuffle along the heading towards the cursor, within its width.
        if (near && !reduce) {
          const min = -el.offsetLeft;
          const max = h.width - W - el.offsetLeft;
          const next = Math.max(min, Math.min(max, e.clientX - restLeft - W / 2));
          xRef.current = next;
          setX(next);
        }
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <span ref={ref} className="cs__perch" style={{ transform: `translateX(${x}px)` }}>
      <BobPeek look={look} />
    </span>
  );
}
