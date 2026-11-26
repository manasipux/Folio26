import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import Layout from './components/layout/Layout';
import Home from './pages/Home';

// Home loads eagerly; other pages are split into their own chunks.
const Work = lazy(() => import('./pages/Work'));
const CaseStudy = lazy(() => import('./pages/CaseStudy'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    // reducedMotion="user": Motion drops transform animations (keeps opacity)
    // when the visitor has prefers-reduced-motion turned on.
    <MotionConfig reducedMotion="user">
      <Suspense fallback={null}>
        <Routes>
          {/* A case study on its own, with no navigation: for sharing one link */}
          <Route element={<Layout bare />}>
            <Route path="case-study/:slug" element={<CaseStudy standalone />} />
          </Route>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="work" element={<Work />} />
            <Route path="work/:slug" element={<CaseStudy />} />
            {/* About lives on the homepage and contact in the footer; old links still work */}
            <Route path="about" element={<Navigate to="/#about" replace />} />
            <Route path="contact" element={<Navigate to="/#contact" replace />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </MotionConfig>
  );
}
