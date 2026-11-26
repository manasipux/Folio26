import { useRef } from 'react';
import LazyImage from '../common/LazyImage';
import type { ErrorStateSet } from '../../content';
import './ErrorStates.css';

/** Ghost button that opens a modal gallery of error states. */
export default function ErrorStates({ set }: { set: ErrorStateSet }) {
  const ref = useRef<HTMLDialogElement>(null);
  const open = () => ref.current?.showModal();
  const close = () => ref.current?.close();

  return (
    <>
      <button type="button" className="errs__open" onClick={open} aria-haspopup="dialog">
        {set.button} <span aria-hidden="true">→</span>
      </button>
      <dialog
        ref={ref}
        className="errs"
        aria-labelledby="errs-title"
        // close when the backdrop (the dialog element itself) is clicked
        onClick={(e) => {
          if (e.target === ref.current) close();
        }}
      >
        <div className="errs__inner">
          <header className="errs__head">
            <div>
              <h2 id="errs-title">{set.title}</h2>
              {set.intro && <p className="errs__intro">{set.intro}</p>}
            </div>
            <button type="button" className="errs__close" onClick={close} aria-label="Close">
              ×
            </button>
          </header>
          <ul role="list" className="errs__grid">
            {set.items.map((it) => (
              <li key={it.title} className="errs__item">
                <LazyImage src={it.image.src} alt={it.image.alt} width={960} height={600} />
                <h3>{it.title}</h3>
                <p>{it.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </>
  );
}
