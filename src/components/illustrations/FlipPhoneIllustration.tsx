/**
 * PLACEHOLDER ART — Nokia-style flip phone (links to Contact me).
 */
export default function FlipPhoneIllustration() {
  return (
    <svg viewBox="0 0 160 160" aria-hidden="true" focusable="false">
      <g transform="rotate(12 80 80)">
        {/* antenna */}
        <rect x="94" y="6" width="7" height="18" rx="3.5" fill="#2a2633" />
        {/* top half */}
        <rect x="50" y="18" width="60" height="62" rx="12" fill="#a99fd0" />
        <rect x="58" y="28" width="44" height="40" rx="5" fill="#dff3ea" />
        <path d="M65 40h22M65 48h30M65 56h16" stroke="#5b8f7a" strokeWidth="3" strokeLinecap="round" />
        {/* hinge */}
        <rect x="52" y="78" width="56" height="8" rx="4" fill="#5b4b9a" />
        {/* bottom half */}
        <rect x="50" y="84" width="60" height="66" rx="12" fill="#c9bff0" />
        <rect x="66" y="92" width="28" height="10" rx="5" fill="#ff85b3" />
        <g fill="#5b4b9a">
          <circle cx="64" cy="112" r="4" />
          <circle cx="80" cy="112" r="4" />
          <circle cx="96" cy="112" r="4" />
          <circle cx="64" cy="124" r="4" />
          <circle cx="80" cy="124" r="4" />
          <circle cx="96" cy="124" r="4" />
          <circle cx="64" cy="136" r="4" />
          <circle cx="80" cy="136" r="4" />
          <circle cx="96" cy="136" r="4" />
        </g>
      </g>
    </svg>
  );
}
