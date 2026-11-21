import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useMediaQuery } from '../common/useMediaQuery';
import CardFront from './CardFront';
import CardBack from './CardBack';
import './FlipCard.css';

const TILT = {
  desktop: { front: -12, back: 8 },
  mobile: { front: -4, back: 3 },
};

/**
 * The big tilted intro card on Home.
 * Flips (3D rotateY) on click / tap, on hover with a mouse, and with
 * Enter / Space via the full-size toggle button.
 * With prefers-reduced-motion: no tilt, no 3D — a simple cross-fade.
 */
export default function FlipCard() {
  const [flipped, setFlipped] = useState(false);
  const reduceMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)');
  const hoverTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  const tilt = reduceMotion ? { front: 0, back: 0 } : isMobile ? TILT.mobile : TILT.desktop;

  // Small hover-intent delay so the card doesn't flip when the mouse just passes over it.
  const onEnter = () => {
    if (!canHover) return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setFlipped(true), 140);
  };
  const onLeave = () => {
    if (!canHover) return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setFlipped(false), 220);
  };

  const ease = [0.65, 0, 0.35, 1] as const;

  return (
    <div
      className={`flip${reduceMotion ? ' flip--reduced' : ''}`}
      data-flipped={flipped}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <motion.div
        className="flip__tilt"
        initial={false}
        animate={{ rotate: flipped ? tilt.back : tilt.front }}
        transition={{ duration: 0.8, ease }}
      >
        {/* Full-size toggle sits underneath the faces; clicks pass through them to it. */}
        <button
          type="button"
          className="flip__toggle"
          aria-pressed={flipped}
          onClick={() => setFlipped((f) => !f)}
        >
          <span className="visually-hidden">
            {flipped ? 'Flip card back to the front' : 'Flip card to read my intro'}
          </span>
        </button>

        {reduceMotion ? (
          <div className="flip__inner">
            <motion.div
              className="flip__face flip__face--front"
              inert={flipped}
              initial={false}
              animate={{ opacity: flipped ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <CardFront />
            </motion.div>
            <motion.div
              className="flip__face flip__face--back flip__face--no3d"
              inert={!flipped}
              initial={false}
              animate={{ opacity: flipped ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <CardBack />
            </motion.div>
          </div>
        ) : (
          <motion.div
            className="flip__inner flip__inner--3d"
            initial={false}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <div className="flip__face flip__face--front" inert={flipped}>
              <CardFront />
            </div>
            <div className="flip__face flip__face--back" inert={!flipped}>
              <CardBack />
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
