import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './FloatingObject.css';

type Props = {
  to: string;
  label: string;
  description: string;
  /** Position class from Home.css (e.g. "obj--work") */
  className?: string;
  /** Float animation delay in seconds, so objects don't bob in sync */
  delay?: number;
  children: ReactNode;
};

/** An illustrated object on the Home page that links to a section. */
export default function FloatingObject({ to, label, description, className = '', delay = 0, children }: Props) {
  return (
    <Link
      to={to}
      className={`float-obj ${className}`}
      style={{ animationDelay: `${delay}s` }}
      aria-label={`${label}: ${description}`}
    >
      <span className="float-obj__art">{children}</span>
      <span className="float-obj__label" aria-hidden="true">
        {label} <span className="float-obj__arrow">→</span>
      </span>
    </Link>
  );
}
