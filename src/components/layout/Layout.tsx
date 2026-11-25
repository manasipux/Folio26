import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import IconNav from './IconNav';
import './Layout.css';

export default function Layout({ bare = false }: { bare?: boolean }) {
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
      {/* On Home, the objects on the desk are the navigation */}
      {!isHome && !bare && <IconNav />}
      <motion.main
        id="main"
        ref={mainRef}
        tabIndex={-1}
        key={pathname}
        className={`main${isHome ? ' main--home' : ''}${bare ? ' main--bare' : ''}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Outlet />
      </motion.main>
    </>
  );
}
