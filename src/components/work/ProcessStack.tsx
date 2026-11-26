import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import './ProcessStack.css';

type Step = { heading: string; summary?: string; body: string };

/** Thin strip of each older card that stays visible in the stack. */
const EDGE = 14;
/** Gap kept between the pinned stack and the top of the window. */
const TOP = 40;
/** Space between cards while they are still in the list. */
const GAP = 24;
/** Scroll distance over which older cards tuck away as a new card docks. */
const APPROACH = 220;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const ease = (t: number) => 1 - (1 - t) ** 3;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Process steps as a scroll-driven card stack.
 * Each new card slides up and docks below the previous card's header;
 * older cards tuck away to a thin edge. The last card then folds up to its
 * header too, a paper clip clips the stack together, and the compact stack
 * scrolls away with the next section right behind it. Without JS or with
 * reduced motion it is a plain list of cards.
 */
export default function ProcessStack({ steps }: { steps: Step[] }) {
  const n = steps.length;
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const headRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [enabled, setEnabled] = useState(false);
  // Phones get a plain list with each step's detail folded away.
  const [narrow, setNarrow] = useState(false);
  const [dims, setDims] = useState<{ heads: number[]; fulls: number[] } | null>(null);
  const [scrolled, setScrolled] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const update = () => {
      setNarrow(mq.matches);
      setEnabled(!reduce && !mq.matches);
    };
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const measure = useCallback(() => {
    const heads = headRefs.current.map((h) => (h ? h.offsetTop + h.offsetHeight + 20 : 160));
    // Natural height of each card's content (not its rendered sheet height,
    // which this component sets itself).
    const fulls = cardRefs.current.map((c) => {
      const body = c?.querySelector<HTMLElement>('.pstack__body');
      if (!c || !body) return 300;
      const padBottom = parseFloat(getComputedStyle(c).paddingBottom) || 0;
      const border = parseFloat(getComputedStyle(c).borderBottomWidth) || 0;
      return body.offsetTop + body.offsetHeight + padBottom + border;
    });
    setDims({ heads, fulls });
  }, []);

  useLayoutEffect(() => {
    if (!enabled) return;
    measure();
    const ro = new ResizeObserver(measure);
    // Watch the content, not the cards: the cards' heights are set here on scroll.
    cardRefs.current.forEach((c) => c?.querySelectorAll('div, .pstack__body').forEach((el) => ro.observe(el)));
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [enabled, measure]);

  useEffect(() => {
    if (!enabled || !dims) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const wrap = wrapRef.current;
        if (!wrap) return;
        setScrolled(Math.max(0, TOP - wrap.getBoundingClientRect().top));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, [enabled, dims, n]);

  const list = (style?: (i: number) => React.CSSProperties | undefined) => (
    <ol role="list" className="pstack__list">
      {steps.map((step, i) => (
        <li
          key={i}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          className="pstack__card"
          style={style?.(i)}
        >
          <div
            ref={(el) => {
              headRefs.current[i] = el;
            }}
          >
            <span className="pstack__num" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
              <span className="pstack__of"> / {String(n).padStart(2, '0')}</span>
            </span>
            <h3>{step.heading}</h3>
            {step.summary && <p className="pstack__line">{step.summary}</p>}
          </div>
          {narrow ? (
            <details className="pstack__more">
              <summary>Read more</summary>
              <p className="pstack__body">{step.body}</p>
            </details>
          ) : (
            <p className="pstack__body">{step.body}</p>
          )}
        </li>
      ))}
    </ol>
  );

  if (!enabled || !dims) {
    return <div className="pstack pstack--static">{list()}</div>;
  }

  const { heads, fulls } = dims;
  const last = n - 1;

  // Cards keep their natural height and sit in normal flow, GAP apart.
  // Each one scrolls up until it reaches its dock, then stays put; cards not
  // yet docked are simply the next cards in the list, so there is never an
  // empty gap below the stack.
  const N: number[] = [];
  steps.forEach((_, j) => N.push(j === 0 ? 0 : N[j - 1] + fulls[j - 1] + GAP));

  // Where card j sits once card k is the newest docked card.
  const dockY = (k: number, j: number) => {
    if (j < k) return j * EDGE;
    return k === 0 ? 0 : (k - 1) * EDGE + heads[k - 1];
  };
  const dockAt = (j: number) => N[j] - dockY(j, j); // scroll at which card j docks
  const compactH = last * EDGE + heads[last];
  const foldLen = dockY(last, last) + fulls[last] - compactH;
  const total = N[last] + fulls[last]; // natural height of the list

  const s = clamp(scrolled, 0, dockAt(last) + foldLen);
  let k = 0;
  for (let j = 0; j < n; j++) if (s >= dockAt(j)) k = j;
  const m = k + 1;
  // Older cards tuck away while the incoming card covers its last APPROACH px.
  const t = m <= last ? ease(clamp((APPROACH - (N[m] - s - dockY(m, m))) / APPROACH, 0, 1)) : 0;
  const f = k === last ? clamp((s - dockAt(last)) / foldLen, 0, 1) : 0;
  const clip = ease(clamp((f - 0.45) / 0.55, 0, 1));

  const y = (j: number) => {
    if (j > k) return N[j] - s; // still travelling up in normal flow
    if (k === last) return j < last ? j * EDGE : lerp(dockY(last, last), last * EDGE, f);
    return lerp(dockY(k, j), dockY(m, j), t);
  };
  // In the final stretch the last card folds to its header, exactly as fast as
  // the page scrolls, so the next section stays attached; cards beneath are
  // trimmed to match.
  const h = (j: number) => {
    if (k !== last) return undefined;
    const lastH = lerp(fulls[last], heads[last], f);
    if (j === last) return lastH;
    return Math.min(fulls[j], y(last) + lastH - y(j));
  };

  return (
    <div
      ref={wrapRef}
      className="pstack pstack--live"
      style={{ height: total }}
    >
      <div className="pstack__stage" style={{ transform: `translateY(${s}px)` }}>
        <div className="pstack__inner">
          {list((j) => ({
            transform: `translateY(${y(j)}px)`,
            zIndex: j + 1,
            height: h(j),
            // the last card's full text fades out as it folds to its header
            ['--body-o' as string]: j === last && k === last ? 1 - Math.min(1, f * 2) : 1,
          }))}
        <svg
          className="pstack__clip"
          viewBox="0 0 40 112"
          aria-hidden="true"
          style={{
            opacity: clip,
            transform: `translateY(${lerp(-60, 0, clip)}px) rotate(${lerp(-35, -8, clip)}deg)`,
          }}
        >
          <defs>
            <linearGradient id="pstack-metal" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#eef0f3" />
              <stop offset="0.45" stopColor="#a7adb6" />
              <stop offset="1" stopColor="#6f7682" />
            </linearGradient>
          </defs>
          <path
            d="M14 34 V86 a7 7 0 0 0 14 0 V22 a11 11 0 0 0 -22 0 V92 a14 14 0 0 0 28 0 V40"
            fill="none"
            stroke="url(#pstack-metal)"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
        </div>
      </div>
    </div>
  );
}
