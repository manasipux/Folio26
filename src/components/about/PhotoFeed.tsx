import { about, site } from '../../content';
import LazyImage from '../common/LazyImage';
import './PhotoFeed.css';

/**
 * Tall rounded panel that scrolls inside itself, like a social media feed.
 * Scroll-snap per post; scrollbar hidden; keyboard-scrollable (it's focusable).
 */
export default function PhotoFeed() {
  return (
    <section className="feed" aria-labelledby="feed-title">
      <header className="feed__header">
        <LazyImage {...about.photo} alt="" className="feed__avatar" width={40} height={40} />
        <div>
          <h2 id="feed-title" className="feed__title">
            {about.feedLabel}
          </h2>
          <p className="feed__sub">
            {site.name} · {site.location}
          </p>
        </div>
      </header>

      <div
        className="feed__scroller"
        tabIndex={0}
        role="region"
        aria-label={`${about.feedLabel}: scrollable photo feed`}
      >
        <ul role="list" className="feed__list">
          {about.feed.map((post, i) => (
            <li key={i} className="feed__post">
              <figure>
                <LazyImage src={post.src} alt={post.alt} className="feed__img" width={600} height={600} />
                {post.caption && <figcaption className="feed__caption">{post.caption}</figcaption>}
              </figure>
            </li>
          ))}
        </ul>
      </div>
      <p className="feed__hint" aria-hidden="true">
        Scroll ↓
      </p>
    </section>
  );
}
