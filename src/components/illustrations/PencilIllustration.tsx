/**
 * Blue drafting pencil (links to Work) — hexagonal body, black end cap,
 * sharpened wood tip. Swap the <svg> for final art any time; keep aria-hidden.
 */
export default function PencilIllustration() {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="pc-cap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4a4a4a" />
          <stop offset=".35" stopColor="#151515" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <linearGradient id="pc-wood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6dcb3" />
          <stop offset=".5" stopColor="#e9c28c" />
          <stop offset="1" stopColor="#c99a62" />
        </linearGradient>
        <linearGradient id="pc-lead" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6b6b6b" />
          <stop offset="1" stopColor="#1e1e1e" />
        </linearGradient>
      </defs>
      <g transform="rotate(-38 100 100)">
        {/* body: three visible hex faces */}
        <rect x="40" y="93" width="134" height="4.6" fill="#62b6f2" />
        <rect x="40" y="97.6" width="134" height="5" fill="#1f80d8" />
        <rect x="40" y="102.6" width="134" height="4.4" fill="#0f5aa6" />
        <rect x="40" y="93.6" width="134" height="1" fill="#fff" opacity=".35" />
        {/* tiny foil print, like a grade stamp */}
        <rect x="128" y="98.9" width="22" height="1.6" rx=".8" fill="#fff" opacity=".85" />
        <rect x="153" y="98.9" width="6" height="1.6" rx=".8" fill="#fff" opacity=".85" />
        {/* white band + black end cap */}
        <rect x="174" y="93" width="2.4" height="14" fill="#f4f4f4" />
        <path d="M176.4 93h12.6a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-12.6z" fill="url(#pc-cap)" />
        <rect x="178" y="94.2" width="12" height="1.4" rx=".7" fill="#fff" opacity=".35" />
        {/* sharpened wood with scalloped edge */}
        <path d="M40 93 c-2 1.6 -2 3.2 0 4.6 c-2 1.6 -2 3.4 0 5 c-2 1.5 -2 3 0 4.4 L14 100.4 L14 99.6 Z" fill="url(#pc-wood)" />
        <path d="M40 97.6 c-2 1.6 -2 3.4 0 5 L22 100.6 L22 99.4 Z" fill="#000" opacity=".06" />
        {/* graphite */}
        <path d="M17 98.2 L6 100 L17 101.8 Z" fill="url(#pc-lead)" />
      </g>
    </svg>
  );
}
