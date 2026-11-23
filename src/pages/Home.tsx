import { home, site } from '../content';
import DeskScene from '../components/home/DeskScene';
import { usePageTitle } from '../components/common/usePageTitle';
import './Home.css';

export default function Home() {
  usePageTitle();

  return (
    <div className="home">
      <header className="home__intro">
        <p className="home__eyebrow">
          {site.name} · {site.roles[0]} · {site.location}
        </p>
        <h1 className="home__heading">{home.heading}</h1>
        <p className="home__text">{home.intro}</p>
      </header>

      <DeskScene />

      <p className="home__hint">{home.hint}</p>
    </div>
  );
}
