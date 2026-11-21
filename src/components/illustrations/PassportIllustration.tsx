/**
 * PLACEHOLDER ART — Passport photo (links to About me).
 * Swap for your own illustration or a real cropped photo.
 */
export default function PassportIllustration() {
  return (
    <svg viewBox="0 0 160 160" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="passport-clip">
          <circle cx="80" cy="80" r="62" />
        </clipPath>
      </defs>
      <circle cx="80" cy="80" r="74" fill="#fff" stroke="#a99fd0" strokeWidth="3" strokeDasharray="6 6" />
      <g clipPath="url(#passport-clip)">
        <rect width="160" height="160" fill="#e9e4fb" />
        <circle cx="80" cy="68" r="22" fill="#a99fd0" />
        <path d="M34 150c4-30 22-46 46-46s42 16 46 46z" fill="#a99fd0" />
      </g>
      {/* little stamp */}
      <g transform="rotate(-18 128 126)">
        <rect x="108" y="114" width="42" height="22" rx="4" fill="none" stroke="#ff85b3" strokeWidth="3" />
        <path d="M115 125h28" stroke="#ff85b3" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  );
}
