/**
 * PLACEHOLDER ART — Pencil (links to Work).
 * Replace the <svg> contents with your final illustration; keep
 * aria-hidden (the link around it carries the accessible name).
 */
export default function PencilIllustration() {
  return (
    <svg viewBox="0 0 160 160" aria-hidden="true" focusable="false">
      <g transform="rotate(-35 80 80)">
        {/* body */}
        <rect x="28" y="64" width="92" height="32" rx="4" fill="#c9bff0" />
        <rect x="28" y="64" width="92" height="10.5" fill="#ddd5f7" />
        <rect x="28" y="85.5" width="92" height="10.5" fill="#a99fd0" />
        {/* ferrule + eraser */}
        <rect x="112" y="62" width="14" height="36" rx="2" fill="#d9d6e0" />
        <path d="M116 62v36M121 62v36" stroke="#b5b1bf" strokeWidth="2" />
        <rect x="126" y="62" width="18" height="36" rx="7" fill="#ff85b3" />
        {/* wood + lead */}
        <path d="M28 64 6 80l22 16z" fill="#f4dcc0" />
        <path d="M13 75 6 80l7 5z" fill="#2a2633" />
      </g>
    </svg>
  );
}
