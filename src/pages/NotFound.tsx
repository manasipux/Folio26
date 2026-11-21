import { Link } from 'react-router-dom';
import { notFound } from '../content';
import { usePageTitle } from '../components/common/usePageTitle';

export default function NotFound() {
  usePageTitle(notFound.heading);
  return (
    <div className="page" style={{ display: 'grid', gap: '1.5rem', placeContent: 'center', minHeight: '60vh' }}>
      <h1 style={{ fontSize: 'var(--fs-h1)', lineHeight: 1.1 }}>{notFound.heading}</h1>
      <p style={{ fontSize: 'var(--fs-lg)', color: 'var(--c-ink-muted)' }}>{notFound.body}</p>
      <Link to="/" className="tag" style={{ justifySelf: 'start', textDecoration: 'none', fontSize: '1rem' }}>
        {notFound.cta} →
      </Link>
    </div>
  );
}
