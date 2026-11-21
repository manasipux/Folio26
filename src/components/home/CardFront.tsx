import { home, site } from '../../content';
import SmartLink from '../common/SmartLink';
import LazyImage from '../common/LazyImage';

export default function CardFront() {
  return (
    <div className="card-front">
      <div className="card-front__photo-frame">
        <LazyImage {...home.photo} className="card-front__photo" eager width={400} height={400} />
      </div>

      <div className="card-front__text">
        <h1 className="card-front__name">{site.name}</h1>
        <ul role="list" className="card-front__roles" aria-label="Roles">
          {site.roles.map((role) => (
            <li key={role}>{role}</li>
          ))}
        </ul>
        <p className="card-front__meta">
          <span>{site.location}</span>
          <SmartLink href={`mailto:${site.email}`} className="card-front__email">
            {site.email}
          </SmartLink>
        </p>

        <div className="card-front__bottom">
          <div className="card-front__stamp-wrap" aria-hidden="true">
          <div className="card-front__stamp">
            <svg viewBox="0 0 40 40">
              <path d="M6 28c6-10 12-14 28-16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              <circle cx="28" cy="26" r="5" fill="currentColor" />
            </svg>
            <span>{site.stampLabel}</span>
          </div>
          </div>
          <span className="card-front__hint" aria-hidden="true">
            {home.flipHint} <span className="card-front__hint-icon">↻</span>
          </span>
        </div>
      </div>
    </div>
  );
}
