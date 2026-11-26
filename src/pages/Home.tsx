import { Link } from 'react-router-dom';
import { home, projects, site } from '../content';
import ProjectCard from '../components/work/ProjectCard';
import { usePageTitle } from '../components/common/usePageTitle';
import './Work.css';
import './WorkEditorial.css';
import './Home.css';

/**
 * Editorial homepage: headline, a facts strip, selected work, then About and Contact.
 * The earlier photo-of-a-desk homepage is still in components/home/DeskScene.tsx;
 * to bring it back, render <DeskScene /> here and restore the home special-casing in Layout.
 */
export default function Home() {
  usePageTitle();
  const ed = home.editorial;
  const featured = projects.slice(0, 2);

  return (
    <div className="page home">
      <header className="home__hero">
        <p className="home__label">
          {site.name} · {ed.label}
        </p>
        <h1 className="home__heading">{home.heading}</h1>
        <p className="home__intro">{home.intro}</p>
      </header>

      <dl className="home__facts">
        {ed.facts.map((f) => (
          <div key={f.label}>
            <dt>{f.label}</dt>
            <dd>{f.value}</dd>
          </div>
        ))}
      </dl>

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
