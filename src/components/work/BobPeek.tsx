/** Tiny Bob peeking over a ledge: head, glasses and fingertips only. */
export default function BobPeek({ look = { x: 0, y: 0 } }: { look?: { x: number; y: number } }) {
  return (
    <svg viewBox="0 0 64 40" width="64" height="40" aria-hidden="true">
      {/* ears */}
      <ellipse cx="17" cy="27" rx="3" ry="4.2" fill="#e3aa85" />
      <ellipse cx="47" cy="27" rx="3" ry="4.2" fill="#e3aa85" />
      {/* head, cut off by the ledge */}
      <path d="M17 40 V26 C17 12 24 5 32 5 C40 5 47 12 47 26 V40 Z" fill="#ecb892" />
      {/* hair */}
      <path d="M16.5 24 C15.5 10 23 3 32.5 3 C42 3 48.5 9 47 23 C45 17 41 14 36 13.5 C31 16 24 16.5 19 15.5 C17.6 18 17 21 16.5 24 Z" fill="#3a2a24" />
      {/* glasses */}
      <rect x="20" y="22" width="10.5" height="8" rx="3" fill="#ffffff" fillOpacity="0.4" stroke="#2a2633" strokeWidth="1.8" />
      <rect x="33.5" y="22" width="10.5" height="8" rx="3" fill="#ffffff" fillOpacity="0.4" stroke="#2a2633" strokeWidth="1.8" />
      <path d="M30.5 25.5 h3" stroke="#2a2633" strokeWidth="1.6" strokeLinecap="round" />
      {/* eyes, which follow the cursor */}
      <circle cx={25.3 + look.x} cy={26.6 + look.y} r="1.4" fill="#2a2633" />
      <circle cx={38.8 + look.x} cy={26.6 + look.y} r="1.4" fill="#2a2633" />
      {/* fingertips gripping the ledge */}
      <g className="bobpeek__fingers" fill="#ecb892" stroke="#c98a66" strokeWidth="0.8">
        <rect x="6" y="33" width="5" height="7" rx="2.5" style={{ animationDelay: '0s' }} />
        <rect x="11.5" y="32" width="5" height="8" rx="2.5" style={{ animationDelay: '0.27s' }} />
        <rect x="47.5" y="32" width="5" height="8" rx="2.5" style={{ animationDelay: '0.13s' }} />
        <rect x="53" y="33" width="5" height="7" rx="2.5" style={{ animationDelay: '0.4s' }} />
      </g>
    </svg>
  );
}
