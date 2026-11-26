import { useEffect, useId, useRef, useState } from 'react';
import type { Img } from '../../content';
import Media from './Media';
import './SlideCarousel.css';

export type Slide = { label: string; image?: Img };

/**
 * Step-by-step carousel for flow GIFs. Native horizontal scroll with snap,
 * step chips, Previous/Next buttons and arrow keys. A slide without an image
 * shows a placeholder until its GIF is added.
 * Each recording plays once, then the carousel moves on to the next step
 * (and from the last step back to the first).
 */
export default function SlideCarousel({ slides }: { slides: Slide[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState<number[]>(() => slides.map(() => 0));
  const id = useId();

  // Keep the active step in sync with the scroll position.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setActive(Math.round(track.scrollLeft / Math.max(1, track.clientWidth)));
      });
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener('scroll', onScroll);
    };
  }, []);

  // After a recording finishes, move on; wrap to the first step after the last.
  const advance = (from: number) => {
    if (from !== active) return;
    go(from + 1 < slides.length ? from + 1 : 0);
  };

  const go = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const next = Math.max(0, Math.min(slides.length - 1, i));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollTo({ left: next * track.clientWidth, behavior: reduce ? 'auto' : 'smooth' });
    setActive(next);
  };

  return (
    <div className="carousel" role="group" aria-roledescription="carousel" aria-label="Flow walkthrough">
      {/* Progress bar: one segment per step. Past steps are full, the current
          step fills as its recording plays, upcoming steps are empty. */}
      <div className="carousel__progress" role="tablist" aria-label="Steps">
        {slides.map((s, i) => {
          const fill = i < active ? 1 : i > active ? 0 : s.image ? progress[i] || 0.02 : 0;
          return (
            <button
              key={s.label}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={i === active}
              aria-controls={`${id}-slide-${i}`}
              className="carousel__seg"
              onClick={() => go(i)}
            >
              <span className="carousel__seg-track" aria-hidden="true">
                <span className="carousel__seg-fill" style={{ transform: `scaleX(${fill})` }} />
              </span>
              <span className="carousel__seg-label">{s.label}</span>
            </button>
          );
        })}
      </div>

      <div
        ref={trackRef}
        className="carousel__track"
        tabIndex={0}
        aria-label="Use the left and right arrow keys to move between steps"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') {
            e.preventDefault();
            go(active + 1);
          } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            go(active - 1);
          }
        }}
      >
        {slides.map((s, i) => (
          <figure
            key={s.label}
            id={`${id}-slide-${i}`}
            role="tabpanel"
            aria-labelledby={`${id}-tab-${i}`}
            aria-roledescription="slide"
            className="carousel__slide"
          >
            {s.image ? (
              <>
                <Media
                  image={s.image}
                  active={i === active}
                  onEnded={() => advance(i)}
                  onProgress={(p) =>
                    setProgress((prev) => {
                      const next = [...prev];
                      next[i] = p;
                      return next;
                    })
                  }
                />
                {s.image.caption && <figcaption>{s.image.caption}</figcaption>}
              </>
            ) : (
              <div className="carousel__placeholder">
                <span>{s.label}</span>
                <small>Recording coming soon</small>
              </div>
            )}
          </figure>
        ))}
      </div>

      <div className="carousel__controls">
        <button
          type="button"
          className="carousel__arrow"
          onClick={() => go(active - 1)}
          disabled={active === 0}
          aria-label="Previous step"
        >
          ←
        </button>
        <span className="carousel__count" aria-live="polite">
          {active + 1} / {slides.length}
        </span>
        <button
          type="button"
          className="carousel__arrow"
          onClick={() => go(active + 1)}
          disabled={active === slides.length - 1}
          aria-label="Next step"
        >
          →
        </button>
      </div>
    </div>
  );
}
