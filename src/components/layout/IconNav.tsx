import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { nav } from "../../content";
import NavIcon from "./NavIcons";
import "./IconNav.css";

/**
 * Desktop: vertical stack of square icon buttons, sticky on the left.
 *          The active one shows its label; others reveal it on hover/focus.
 * Mobile:  restyled (CSS only) into a bottom tab bar.
 */
export default function IconNav() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const onHomeAbout = pathname === "/" && hash === "#about";
  // Work: the homepage section, and any case study under /work/
  const onWork =
    (pathname === "/" && hash === "#work") || pathname.startsWith("/work/");

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
          if (item.id === "contact") {
            return (
              <li key={item.id}>
                <a
                  href="#contact"
                  className="icon-nav__item"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(
                      { pathname, hash: "#contact" },
                      { preventScrollReset: true },
                    );
                  }}
                >
                  {inner}
                </a>
              </li>
            );
          }
          // About and Work: sections of the homepage (/#about, /#work)
          if (item.id === "about" || item.id === "work") {
            const on = item.id === "about" ? onHomeAbout : onWork;
            return (
              <li key={item.id}>
                <Link
                  to={item.to}
                  className={`icon-nav__item${on ? " active" : ""}`}
                  aria-current={on ? "location" : undefined}
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
                end={item.id === "home"}
                className={({ isActive }) => {
                  const active =
                    item.id === "home"
                      ? isActive && !onHomeAbout && !onWork
                      : isActive;
                  return `icon-nav__item${active ? " active" : ""}`;
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
