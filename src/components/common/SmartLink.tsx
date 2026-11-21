import type { ReactNode } from 'react';
import { isTodo } from '../../content';

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
};

/**
 * External/mailto link that renders as plain text while its href
 * is still a "[TODO: …]" placeholder, so no broken links ship.
 */
export default function SmartLink({ href, children, className }: Props) {
  if (isTodo(href) || href.includes('[TODO')) {
    return <span className={className}>{children}</span>;
  }
  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  );
}
