import { useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { about, home, site, type Box, type HomeObject } from "../../content";
import { withBase } from "../common/LazyImage";
import { useMediaQuery } from "../common/useMediaQuery";
import PlaylistDialog from "./PlaylistDialog";
import "./DeskScene.css";

const boxStyle = (box: Box) =>
  ({
    "--x": `${box.x}%`,
    "--y": `${box.y}%`,
    "--w": `${box.w}%`,
    "--h": `${box.h}%`,
  }) as CSSProperties;

/**
 * The whole Home page: a desk photo scaled to cover the screen, with a
 * clickable area over each object and my intro printed on the ID card.
 * Hovering or focusing an object dims the rest of the desk and shows its label.
 */
export default function DeskScene() {
  const { scene, objects } = home;
  const portrait = useMediaQuery("(max-aspect-ratio: 1/1)");
  const layout = portrait ? "portrait" : "landscape";
  const photo = scene[layout];

  const [active, setActive] = useState<HomeObject | null>(null);
  const [playlistOpen, setPlaylistOpen] = useState(false);

  const handlers = (obj: HomeObject) => ({
    onPointerEnter: () => setActive(obj),
    onPointerLeave: () => setActive(null),
    onFocus: () => setActive(obj),
    onBlur: () => setActive(null),
  });

  return (
    <div className="desk">
      <div
        className={`desk__stage desk__stage--${layout}`}
        style={{ "--ratio": photo.width / photo.height } as CSSProperties}
      >
        <img
          key={layout}
          className="desk__photo"
          src={withBase(photo.src)}
          srcSet={`${withBase(photo.srcSmall)} ${photo.width * (2 / 3)}w, ${withBase(photo.src)} ${photo.width}w`}
          sizes={portrait ? "160vw" : "100vw"}
          width={photo.width}
          height={photo.height}
          alt={scene.alt}
          decoding="async"
          fetchPriority="high"
        />

        {/* My intro, "printed" on the blank ID card in the photo */}
        <header className="id-card" style={boxStyle(photo.card)}>
          <div className="id-card__inner">
            <div className="id-card__body">
              <p className="id-card__name">{site.name}</p>
              <p className="id-card__role">
                {site.roles[0]} · {site.location}
              </p>
              <h1 className="id-card__heading">{home.heading}</h1>
              <p className="id-card__intro">{home.intro}</p>
            </div>
            <img
              className="id-card__photo"
              src={withBase(about.photo.src)}
              alt=""
              width={800}
              height={1000}
              decoding="async"
            />
          </div>
        </header>

        {/* Spotlight: a hole the size of the hovered object, everything else dimmed */}
        <div
          className={`desk__spot${active ? " is-on" : ""}`}
          style={active ? boxStyle(active.box[layout]) : undefined}
          aria-hidden="true"
        />

        <nav aria-label="Main">
          <ul className="desk__objects">
            {objects.map((obj) => {
              const box = obj.box[layout];
              const label = (
                <span className="desk__tag">
                  <span className="desk__tag-label">{obj.label}</span>
                  <span className="desk__tag-desc">{obj.description}</span>
                </span>
              );
              return (
                <li
                  key={obj.id}
                  className={[
                    "desk__obj",
                    `desk__obj--${obj.id}`,
                    box.y + box.h > 75 && "desk__obj--low",
                    box.w < 10 && "desk__obj--small",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  style={boxStyle(box)}
                >
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
        </nav>
      </div>

      <p className="desk__hint" aria-hidden="true">
        {home.hint}
      </p>

      <PlaylistDialog
        open={playlistOpen}
        onClose={() => setPlaylistOpen(false)}
      />
    </div>
  );
}
