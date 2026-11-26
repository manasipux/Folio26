import { useState } from 'react';
import { Link } from 'react-router-dom';
import { about, home, projects, site } from '../content';
import { withBase } from '../components/common/LazyImage';
import ProjectCard from '../components/work/ProjectCard';
import ClearWord from '../components/home/ClearWord';
import TangledWords from '../components/home/TangledWords';
import { usePageTitle } from '../components/common/usePageTitle';
import './Work.css';
import './WorkEditorial.css';
import './Home.css';

/**
 * Editorial homepage: headline and ID card, selected work, then About and Contact.
 * The earlier photo-of-a-desk homepage is still in components/home/DeskScene.tsx;
 * to bring it back, render <DeskScene /> here and restore the home special-casing in Layout.
 */
export default function Home() {
  usePageTitle();
  const ed = home.editorial;
  const featured = projects.slice(0, 2);
  // Headline play: one word behind frosted glass, two words with jumbled letters.
  // Clearing the glass also untangles the letters.
  const [untangled, setUntangled] = useState(false);
  const [before, after] = home.heading.split(ed.clearWord);
  const [middle, end] = after === undefined ? [] : after.split(ed.tangledWords);
  const untangle = () => setUntangled(true);

  return (
    <div className="page home">
      <header className="home__hero">
        <div className="home__hero-text">
          <p className="home__label">
            {site.name} · {ed.label}
          </p>
          <h1 className="home__heading">
            {after === undefined ? (
              home.heading
            ) : (
              <>
                {before}
                <ClearWord onClear={untangle}>{ed.clearWord}</ClearWord>
                {end === undefined ? (
                  after
                ) : (
                  <>
                    {middle}
                    <TangledWords text={ed.tangledWords} untangled={untangled} onUntangle={untangle} />
                    {end}
                  </>
                )}
              </>
            )}
          </h1>
          <p className="home__intro">
            <strong>{ed.introLead}</strong> {ed.introRest}
          </p>
        </div>

        {/* My ID card, hanging from its lanyard */}
        <div className="idcard" aria-label={`ID card: ${site.name}, ${ed.card.role}, ${site.location}`} role="img">
          <span className="idcard__strap" aria-hidden="true" />
          <span className="idcard__clip" aria-hidden="true" />
          <div className="idcard__card" aria-hidden="true">
            <span className="idcard__slot" />
            <img
              className="idcard__photo"
              src={withBase(about.photo.src)}
              alt=""
              width={800}
              height={1000}
              decoding="async"
            />
            <p className="idcard__name">{site.name}</p>
            <p className="idcard__role">{ed.card.role}</p>
            <p className="idcard__place">{site.location}</p>
            <p className="idcard__band">{ed.card.band}</p>
          </div>
        </div>
      </header>

      <section className="home__section" aria-labelledby="home-work">
        <div className="home__section-head">
          <h2 id="home-work">{ed.workHeading}</h2>
          <Link to="/work" className="home__more">
            {ed.allWork} <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="work">
          <div className="bento">
            {featured.map((project, i) => (
              <ProjectCard key={project.slug} project={project} className={`bento__${'ab'[i]}`} />
            ))}
          </div>
        </div>
      </section>

      <div className="home__split">
        <section className="home__panel" aria-labelledby="home-about">
          <h2 id="home-about">{ed.aboutHeading}</h2>
          <p>{ed.aboutBody}</p>
          <Link to="/about" className="home__more">
            {ed.aboutLink} <span aria-hidden="true">→</span>
          </Link>
        </section>
        <section className="home__panel" aria-labelledby="home-contact">
          <h2 id="home-contact">{ed.contactHeading}</h2>
          <p>{ed.contactBody}</p>
          <Link to="/contact" className="home__more">
            {ed.contactLink} <span aria-hidden="true">→</span>
          </Link>
        </section>
      </div>
    </div>
  );
}
