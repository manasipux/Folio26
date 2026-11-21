import { NavLink } from 'react-router-dom';
import { nav } from '../../content';
import './TextNav.css';

/** Home-page variant: a plain text list, active item highlighted. Desktop only. */
export default function TextNav() {
  return (
    <nav aria-label="Main" className="text-nav">
      <ul role="list">
        {nav.map((item) => (
          <li key={item.id}>
            <NavLink to={item.to} end={item.id === 'home'} className="text-nav__link">
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
