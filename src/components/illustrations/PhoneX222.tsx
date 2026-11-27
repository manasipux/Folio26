import { useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from 'motion/react';
import { contact, site } from '../../content';
import SmartLink from '../common/SmartLink';
import './PhoneX222.css';

/**
 * Micromax X222, drawn in HTML/CSS. The screen is real HTML, so on the
 * Contact page its home-screen tiles are working links.
 *
 *  - decorative (default): aria-hidden, tiles are plain shapes (Home page object)
 *  - interactive: tiles are links; boots with a short "Hello!" first
 *
 * Size: the phone is drawn at 300×540px. Scale it with the --x222-scale
 * CSS variable on a parent (e.g. 0.45 for a small object).
 */
type Props = { interactive?: boolean };

type TileKind = 'email' | 'linkedin' | 'work' | 'about';
const TILE_ORDER: TileKind[] = ['email', 'linkedin', 'work', 'about'];

export default function PhoneX222({ interactive = false }: Props) {
  const reduceMotion = useReducedMotion();
  const [booted, setBooted] = useState(!interactive || !!reduceMotion);

  useEffect(() => {
    if (booted) return;
    const t = window.setTimeout(() => setBooted(true), 1300);
    return () => window.clearTimeout(t);
  }, [booted]);

  const tile = (kind: TileKind) => {
    const inner = (
      <>
        <AppIcon kind={kind} />
        <span className="x222__tile-label">{contact.phone.tiles[kind]}</span>
      </>
    );
    if (!interactive) return <span className="x222__tile">{inner}</span>;
    if (kind === 'email')
      return (
        <SmartLink href={`mailto:${site.email}`} className="x222__tile">
          {inner}
        </SmartLink>
      );
    if (kind === 'linkedin')
      return (
        <SmartLink href={site.linkedin} className="x222__tile">
          {inner}
        </SmartLink>
      );
    return (
      <Link to={kind === 'work' ? '/#work' : '/#about'} className="x222__tile">
        {inner}
      </Link>
    );
  };

  return (
    <div className="x222" aria-hidden={interactive ? undefined : true}>
      <div className="x222__body">
        <span className="x222__earpiece" />
        <span className="x222__model">X222</span>

        <div className="x222__bezel">
          <div className="x222__screen">
            {interactive && (
              <div className={`x222__boot${booted ? ' is-done' : ''}`} aria-hidden="true">
                <span>{contact.phone.bootText}</span>
              </div>
            )}
            <div className="x222__dots">
              <i className="is-active" />
              <i />
              <i />
            </div>
            {interactive ? (
              <ul role="list" className="x222__grid" aria-label="Phone shortcuts">
                {TILE_ORDER.map((k) => (
                  <li key={k}>{tile(k)}</li>
                ))}
              </ul>
            ) : (
              <div className="x222__grid">
                {TILE_ORDER.map((k) => (
                  <span key={k}>{tile(k)}</span>
                ))}
              </div>
            )}
            <div className="x222__dock">
              <DockIcon>
                <path d="M7 4.5c.6-.6 1.6-.6 2.1.1l1.6 2.2c.4.6.3 1.4-.2 1.9l-1 .9a10 10 0 0 0 4.9 4.9l.9-1c.5-.5 1.3-.6 1.9-.2l2.2 1.6c.7.5.7 1.5.1 2.1l-1.2 1.2c-.9.9-2.3 1.2-3.5.6A17 17 0 0 1 5.2 9.2c-.6-1.2-.3-2.6.6-3.5z" />
              </DockIcon>
              <DockIcon>
                <rect x="6" y="3.5" width="12" height="17" rx="2.5" />
                <circle cx="12" cy="10" r="2.6" />
                <path d="M8.5 16.5c.8-1.6 2-2.3 3.5-2.3s2.7.7 3.5 2.3" />
              </DockIcon>
              <DockIcon>
                <path d="M4 6.5C4 5.1 5.1 4 6.5 4h11C18.9 4 20 5.1 20 6.5v7c0 1.4-1.1 2.5-2.5 2.5H11l-4.5 3.5V16h0C5.1 16 4 14.9 4 13.5z" />
              </DockIcon>
              <DockIcon>
                <path d="M9 7 4.5 11 9 15" />
                <path d="M5 11h9.5a4.5 4.5 0 0 1 0 9H12" />
              </DockIcon>
            </div>
          </div>
        </div>

        <span className="x222__brand">
          <span className="x222__brand-m">m</span>icromax
        </span>

        <div className="x222__keys">
          <span className="x222__key x222__key--left" />
          <span className="x222__nav-ring">
            <span />
          </span>
          <span className="x222__key x222__key--right" />
        </div>
      </div>
    </div>
  );
}

function DockIcon({ children }: { children: ReactNode }) {
  return (
    <span className="x222__dock-btn">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </span>
  );
}

/** Glossy feature-phone style app icons. */
function AppIcon({ kind }: { kind: TileKind }) {
  const glyph: Record<TileKind, ReactNode> = {
    email: (
      <>
        <rect x="5" y="7.5" width="22" height="16" rx="2.5" fill="#fff" />
        <path d="M6 9l10 7.5L26 9" fill="none" stroke="#e0662a" strokeWidth="2.2" strokeLinejoin="round" />
      </>
    ),
    linkedin: (
      <>
        <rect x="7" y="13" width="4" height="11" rx="1" fill="#fff" />
        <circle cx="9" cy="9.2" r="2.3" fill="#fff" />
        <path d="M14 13h3.8v1.6c.8-1.2 2-1.9 3.6-1.9 2.6 0 3.6 1.7 3.6 4.4V24h-4v-6c0-1.4-.5-2.2-1.6-2.2-1.2 0-1.8.9-1.8 2.2v6H14z" fill="#fff" />
      </>
    ),
    work: (
      <>
        <path d="M20.5 6.5l5 5L13 24H8v-5z" fill="#fff" />
        <path d="M18 9l5 5" stroke="#c9302c" strokeWidth="2" />
      </>
    ),
    about: (
      <>
        <circle cx="16" cy="12" r="5" fill="#fff" />
        <path d="M7 25c1.5-4.5 5-6.5 9-6.5s7.5 2 9 6.5z" fill="#fff" />
      </>
    ),
  };
  return (
    <span className={`x222-icon x222-icon--${kind}`}>
      <svg viewBox="0 0 32 32" aria-hidden="true">
        {glyph[kind]}
      </svg>
    </span>
  );
}
