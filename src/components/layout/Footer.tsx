import { contact, site } from '../../content';
import './Footer.css';

/** Contact details on every page. "Contact me" in the navigation scrolls here. */
export default function Footer() {
  return (
    <footer id="contact" className="footer" aria-labelledby="footer-heading" tabIndex={-1}>
      <div className="footer__inner">
        <div className="footer__intro">
          <h2 id="footer-heading" className="footer__heading">
            {contact.heading}
          </h2>
          <p className="footer__invite">{contact.invite}</p>
        </div>

        <ul className="footer__links" role="list">
          <li>
            <span className="footer__label">Email</span>
            <a className="footer__link" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </li>
          <li>
            <span className="footer__label">{site.linkedinLabel}</span>
            <a className="footer__link" href={site.linkedin} target="_blank" rel="noreferrer">
              linkedin.com/in/manasiparulekar <span aria-hidden="true">↗</span>
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <span className="footer__label">Based in</span>
            <span className="footer__text">{site.location}</span>
          </li>
        </ul>
      </div>
      <p className="footer__small">
        © {new Date().getFullYear()} {site.name} · {site.title.split('—')[1]?.trim() ?? ''}
      </p>
    </footer>
  );
}
