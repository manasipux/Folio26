import { about } from '../content';
import LazyImage from '../components/common/LazyImage';
import PhotoFeed from '../components/about/PhotoFeed';
import { usePageTitle } from '../components/common/usePageTitle';
import './About.css';

export default function About() {
  usePageTitle('About me');
  return (
    <div className="page about">
      <h1 className="about__headline">{about.headline}</h1>

      <div className="about__grid">
        <section className="about__intro" aria-label="About me">
          <LazyImage {...about.photo} className="about__photo" eager width={400} height={400} />
          <div className="about__copy">
            {about.short.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
            <details className="about__more">
              <summary>{about.longToggleLabel}</summary>
              <div className="about__long">
                {about.long.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </details>
          </div>
        </section>

        <PhotoFeed />
      </div>
    </div>
  );
}
