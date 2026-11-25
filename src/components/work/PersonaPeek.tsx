import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import type { Persona } from '../../content';
import ItWorkerPortrait from './ItWorkerPortrait';
import './PersonaPeek.css';

/**
 * Inline term that reveals a persona card on hover, keyboard focus or tap.
 * Escape closes it. The card stays open while the pointer moves onto it.
 */
export default function PersonaPeek({ label, persona }: { label: string; persona: Persona }) {
  const [open, setOpen] = useState(false);
  const [shift, setShift] = useState(0);
  const cardId = useId();
  const cardRef = useRef<HTMLSpanElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  // What the press started from, so a tap opens/closes reliably even though
  // touch browsers also fire focus (which opens it) before the click.
  const press = useRef<{ type: string; wasOpen: boolean } | null>(null);
  const isOpen = useRef(false);
  isOpen.current = open;

  const show = () => {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 120);
  };

  // Keep the card inside the viewport on narrow screens.
  useLayoutEffect(() => {
    if (!open) {
      setShift(0);
      return;
    }
    const el = cardRef.current;
    if (!el) return;
    // Measure against the content column, not the window: on phones the open
    // card itself can widen the layout viewport.
    const r = el.getBoundingClientRect();
    const bound = (el.closest('section') ?? document.body).getBoundingClientRect();
    const overflow = r.right - bound.right;
    if (overflow > 0) setShift(-Math.min(overflow, r.left - bound.left));
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  return (
    <span
      className="peek"
      onPointerEnter={(e) => e.pointerType === 'mouse' && show()}
      onPointerLeave={(e) => e.pointerType === 'mouse' && hide()}
    >
      <button
        type="button"
        className="peek__trigger"
        aria-expanded={open}
        aria-describedby={open ? cardId : undefined}
        onFocus={show}
        onBlur={hide}
        onPointerDown={(e) => {
          press.current = { type: e.pointerType, wasOpen: isOpen.current };
        }}
        onClick={() => {
          const p = press.current;
          press.current = null;
          if (p?.type === 'mouse') return show(); // hover already handles mouse
          window.clearTimeout(closeTimer.current);
          setOpen(p ? !p.wasOpen : !isOpen.current);
        }}
      >
        {label}
      </button>
      {open && (
        <span
          ref={cardRef}
          id={cardId}
          role="tooltip"
          className="peek__card"
          style={{ transform: `translateX(${shift}px)` }}
        >
          <span className="peek__clip" aria-hidden="true" />
          <span className="peek__band">
            <span>Persona ID</span>
            <span className="peek__band-product">{persona.product}</span>
          </span>
          <span className="peek__id">
            <span className="peek__photo" aria-hidden="true">
              <ItWorkerPortrait />
            </span>
            <span className="peek__who">
              <span className="peek__field">Name</span>
              <span className="peek__name">{persona.name}</span>
              <span className="peek__field">Role</span>
              <span className="peek__role">{persona.role}</span>
            </span>
          </span>
          {persona.quote && <q className="peek__quote">{persona.quote}</q>}
          <span className="peek__rows">
            <span className="peek__row">
              <span className="peek__field">Job</span>
              <span>{persona.summary}</span>
            </span>
            {persona.details.map((d) => (
              <span key={d.label} className="peek__row">
                <span className="peek__field">{d.label}</span>
                <span>{d.value}</span>
              </span>
            ))}
          </span>
          <span className="peek__barcode" aria-hidden="true" />
        </span>
      )}
    </span>
  );
}
