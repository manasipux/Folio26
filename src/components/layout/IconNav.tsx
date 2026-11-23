import { NavLink } from 'react-router-dom';
import { nav } from '../../content';
import NavIcon from './NavIcons';
import './IconNav.css';

/**
 * Desktop: vertical stack of square icon buttons, sticky on the left.
 *          The active one shows its label; others reveal it on hover/focus.
 * Mobile:  restyled (CSS only) into a bottom tab bar.
 */
export default function IconNav() {
  return (
    <nav aria-label="Main" className="icon-nav">
      <ul role="list" className="icon-nav__list">
        {nav.map((item) => (
          <li key={item.id}>
            <NavLink to={item.to} end={item.id === 'home'} className="icon-nav__item">
              <span className="icon-nav__square">
                <NavIcon id={item.id} />
              </span>
              <span className="icon-nav__label">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
