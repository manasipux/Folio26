import { useEffect } from 'react';
import { site } from '../../content';

/** Sets document.title as "<page> — <site title>" (or just the site title). */
export function usePageTitle(page?: string) {
  useEffect(() => {
    document.title = page ? `${page} — ${site.title}` : site.title;
  }, [page]);
}
