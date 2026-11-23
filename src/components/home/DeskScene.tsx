import { useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { home, type HomeObject } from '../../content';
import { withBase } from '../common/LazyImage';
import PlaylistDialog from './PlaylistDialog';
import './DeskScene.css';

const boxStyle = ({ box }: HomeObject) =>
  ({
    '--x': `${box.x}%`,
    '--y': `${box.y}%`,
    '--w': `${box.w}%`,
    '--h': `${box.h}%`,
  }) as CSSProperties;

/**
 * The flat-lay photo with a clickable area over each object.
 * Hovering or focusing an object dims the rest of the desk and shows its label.
 */
export default function DeskScene() {
  const { scene, objects } = home;
  const [active, setActive] = useState<HomeObject | null>(null);
  const [playlistOpen, setPlaylistOpen] = useState(false);

  const handlers = (obj: HomeObject) => ({
    onPointerEnter: () => setActive(obj),
    onPointerLeave: () => setActive(null),
    onFocus: () => setActive(obj),
    onBlur: () => setActive(null),
  });

  return (
    <>
      <div className="desk">
        <img
          className="desk__photo"
          src={withBase(scene.src)}
          srcSet={`${withBase(scene.srcSmall)} 1024w, ${withBase(scene.src)} ${scene.width}w`}
          sizes="(min-width: 1280px) 70vw, 100vw"
          width={scene.width}
          height={scene.height}
          alt={scene.alt}
          decoding="async"
          fetchPriority="high"
        />

        {/* Spotlight: a hole the size of the hovered object, everything else dimmed */}
        <div
          className={`desk__spot${active ? ' is-on' : ''}`}
          style={active ? boxStyle(active) : undefined}
          aria-hidden="true"
        />

        <ul className="desk__objects" aria-label="Explore">
          {objects.map((obj) => {
            const label = (
              <span className="desk__tag">
                <span className="desk__tag-label">{obj.label}</span>
                <span className="desk__tag-desc">{obj.description}</span>
              </span>
            );
            return (
              <li
                key={obj.id}
                className={`desk__obj${obj.box.y > 50 ? ' desk__obj--low' : ''}`}
                style={boxStyle(obj)}>
                {obj.to ? (
                  <Link to={obj.to} className="desk__hit" {...handlers(obj)}>
                    {label}
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="desk__hit"
                    aria-haspopup="dialog"
                    onClick={() => setPlaylistOpen(true)}
                    {...handlers(obj)}
                  >
                    {label}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <PlaylistDialog open={playlistOpen} onClose={() => setPlaylistOpen(false)} />
    </>
  );
}
