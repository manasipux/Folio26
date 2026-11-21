import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import IconNav from './IconNav';
import TextNav from './TextNav';
import './Layout.css';

export default function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const mainRef = useRef<HTMLElement>(null);
  const prevPath = useRef(pathname);

  // On route change: back to top, and move focus to the new page for screen readers.
  // (Not on first load, so Tab still starts at the skip link.)
  useEffect(() => {
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;
    window.scrollTo(0, 0);
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      {isHome ? (
        <>
          <TextNav />
          <IconNav mobileOnly />
        </>
      ) : (
        <IconNav />
      )}
      <motion.main
        id="main"
        ref={mainRef}
        tabIndex={-1}
        key={pathname}
        className={`main${isHome ? ' main--home' : ''}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Outlet />
      </motion.main>
    </>
  );
}
