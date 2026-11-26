import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { nav } from '../../content';
import NavIcon from './NavIcons';
import './IconNav.css';

/**
 * Desktop: vertical stack of square icon buttons, sticky on the left.
 *          The active one shows its label; others reveal it on hover/focus.
 * Mobile:  restyled (CSS only) into a bottom tab bar.
 */
export default function IconNav() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const onHomeAbout = pathname === '/' && hash === '#about';

  return (
    <nav aria-label="Main" className="icon-nav">
      <ul role="list" className="icon-nav__list">
        {nav.map((item) => {
          const inner = (
            <>
              <span className="icon-nav__square">
                <NavIcon id={item.id} />
              </span>
              <span className="icon-nav__label">{item.label}</span>
            </>
          );
          // Contact: stay on this page and scroll down to the footer
          if (item.id === 'contact') {
            return (
              <li key={item.id}>
                <a
                  href="#contact"
                  className="icon-nav__item"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate({ pathname, hash: '#contact' }, { preventScrollReset: true });
                  }}
                >
                  {inner}
                </a>
              </li>
            );
          }
          // About: the homepage with the About section open
          if (item.id === 'about') {
            return (
              <li key={item.id}>
                <Link
                  to={item.to}
                  className={`icon-nav__item${onHomeAbout ? ' active' : ''}`}
                  aria-current={onHomeAbout ? 'location' : undefined}
                >
                  {inner}
                </Link>
              </li>
            );
          }
          return (
            <li key={item.id}>
              <NavLink
                to={item.to}
                end={item.id === 'home'}
                className={({ isActive }) => {
                  const active = item.id === 'home' ? isActive && !onHomeAbout : isActive;
                  return `icon-nav__item${active ? ' active' : ''}`;
                }}
              >
                {inner}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
