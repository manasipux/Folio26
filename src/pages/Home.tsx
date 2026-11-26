import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { about, home, projects, resume, site } from '../content';
import { withBase } from '../components/common/LazyImage';
import ProjectCard from '../components/work/ProjectCard';
import ClearWord from '../components/home/ClearWord';
import TangledWords from '../components/home/TangledWords';
import { usePageTitle } from '../components/common/usePageTitle';
import './Work.css';
import './WorkEditorial.css';
import './Home.css';

/**
 * Editorial homepage: headline and ID card, then selected work. Clicking the ID card
 * (or "About me" in the navigation, which links to /#about) opens the About section
 * under the headline. Contact details live in the site footer.
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
  // Don't leave the jumble for a skimming reader to mistake for a typo:
  // the letters slide into order on their own shortly after the page loads.
  useEffect(() => {
    const t = window.setTimeout(untangle, 1800);
    return () => window.clearTimeout(t);
  }, []);

  // About opens from the ID card, or arrives open via /#about
  const { hash, key } = useLocation();
  const navigate = useNavigate();
  const [aboutOpen, setAboutOpen] = useState(hash === '#about');
  const aboutRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (hash !== '#about') return;
    setAboutOpen(true);
    const t = window.setTimeout(() => aboutRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 80);
    return () => window.clearTimeout(t);
  }, [hash, key]);
  const toggleAbout = () => {
    const next = !aboutOpen;
    setAboutOpen(next);
    // On phones the panel opens right under the card; bring it into view once it has grown.
    if (next && window.matchMedia('(max-width: 900px)').matches) {
      window.setTimeout(() => aboutRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 450);
    }
    navigate({ hash: next ? '#about' : '' }, { replace: true, preventScrollReset: true });
  };

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

        {/* My ID card, hanging from its lanyard. Click it to open the About section. */}
        <div className="idcard">
          <span className="idcard__strap" aria-hidden="true" />
          <span className="idcard__clip" aria-hidden="true" />
          <button
            type="button"
            className="idcard__card"
            aria-expanded={aboutOpen}
            aria-controls="about"
            onClick={toggleAbout}
          >
            <span className="visually-hidden">{ed.aboutLabel}: </span>
            <span className="idcard__slot" aria-hidden="true" />
            <img
              className="idcard__photo"
              src={withBase(about.photo.src)}
              alt=""
              width={800}
              height={1000}
              decoding="async"
            />
            <span className="idcard__name">{site.name}</span>
            <span className="idcard__role">{ed.card.role}</span>
            <span className="idcard__place">{site.location}</span>
            <span className="idcard__band" aria-hidden="true">{ed.card.band}</span>
          </button>
          <p className="idcard__hint" aria-hidden="true">
            {aboutOpen ? (
              ed.aboutClose
            ) : (
              <>
                <span className="idcard__hint-mouse">{ed.cardHint}</span>
                <span className="idcard__hint-touch">{ed.cardHintTouch}</span>
              </>
            )}{' '}
            <span>{aboutOpen ? '↑' : '↓'}</span>
          </p>
        </div>
        <div className={`home__about-wrap${aboutOpen ? ' is-open' : ''}`}>
          <section
            id="about"
            ref={aboutRef}
            className="home__about"
            aria-labelledby="home-about"
            inert={!aboutOpen}
          >
            <div className="home__about-card">
            <div className="home__about-head">
              <p className="home__label">{ed.aboutLabel}</p>
              <button type="button" className="home__more home__about-close" onClick={toggleAbout}>
                {ed.aboutClose} <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="home__about-body">
              <h2 id="home-about" className="home__about-headline">
                {about.headline}
              </h2>
              <div className="home__about-copy">
                {about.short.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                <a className="home__about-resume" href={withBase(resume.href)} target="_blank" rel="noreferrer">
                  Download my résumé <span aria-hidden="true">↓</span>
                  <span className="visually-hidden"> ({resume.note}, opens in a new tab)</span>
                </a>
                <details className="home__about-more">
                  <summary>{about.longToggleLabel}</summary>
                  {about.long.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </details>
              </div>
            </div>
            </div>
          </section>
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

    </div>
  );
}
