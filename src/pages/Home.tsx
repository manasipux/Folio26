import { home } from '../content';
import FlipCard from '../components/home/FlipCard';
import FloatingObject from '../components/home/FloatingObject';
import PencilIllustration from '../components/illustrations/PencilIllustration';
import PassportIllustration from '../components/illustrations/PassportIllustration';
import FlipPhoneIllustration from '../components/illustrations/FlipPhoneIllustration';
import { usePageTitle } from '../components/common/usePageTitle';
import './Home.css';

export default function Home() {
  usePageTitle();
  const { objects } = home;

  return (
    <div className="home">
      <div className="home__card">
        <FlipCard />
      </div>

      <nav className="home__objects" aria-label="Explore">
        <FloatingObject to="/work" {...objects.work} className="obj--work" delay={0}>
          <PencilIllustration />
        </FloatingObject>
        <FloatingObject to="/about" {...objects.about} className="obj--about" delay={-2}>
          <PassportIllustration />
        </FloatingObject>
        <FloatingObject to="/contact" {...objects.contact} className="obj--contact" delay={-4}>
          <FlipPhoneIllustration />
        </FloatingObject>
      </nav>
    </div>
  );
}
