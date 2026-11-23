import { useEffect, useRef } from 'react';
import { home, isTodo } from '../../content';
import './PlaylistDialog.css';

/** Turns a Spotify share link into its embed URL. Returns null if it isn't one. */
function toEmbed(url: string) {
  const m = url.match(/open\.spotify\.com\/(?:intl-[a-z]+\/)?(playlist|album)\/([A-Za-z0-9]+)/);
  return m ? `https://open.spotify.com/embed/${m[1]}/${m[2]}?utm_source=generator` : null;
}

type Props = { open: boolean; onClose: () => void };

/**
 * Native <dialog> holding the Spotify player. The iframe is only rendered
 * while the dialog is open, so Spotify isn't contacted until someone asks.
 */
export default function PlaylistDialog({ open, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const { playlist } = home;
  const embed = isTodo(playlist.url) ? null : toEmbed(playlist.url);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="playlist"
      aria-labelledby="playlist-title"
      onClose={onClose}
      onClick={(e) => {
        // Click on the backdrop closes it
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="playlist__inner">
        <div className="playlist__head">
          <h2 id="playlist-title" className="playlist__title">
            {playlist.heading}
          </h2>
          <button type="button" className="playlist__close" onClick={onClose}>
            {playlist.close}
          </button>
        </div>
        {open &&
          (embed ? (
            <iframe
              className="playlist__frame"
              title={playlist.heading}
              src={embed}
              width="100%"
              height="352"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          ) : (
            <p className="playlist__missing">{playlist.missing}</p>
          ))}
      </div>
    </dialog>
  );
}
