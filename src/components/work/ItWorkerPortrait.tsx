/** Original ID-photo style illustration: a developer with glasses and a hoodie. */
export default function ItWorkerPortrait() {
  return (
    <svg viewBox="0 0 76 92" width="100%" height="100%" aria-hidden="true">
      {/* hoodie and shoulders */}
      <path d="M6 92 C8 72 20 64 38 64 C56 64 68 72 70 92 Z" fill="#5b4b9a" />
      <path d="M26 66 C30 74 46 74 50 66 L47 64 C44 69 32 69 29 64 Z" fill="#46397c" />
      {/* t-shirt collar */}
      <path d="M30 64 C33 71 43 71 46 64 Z" fill="#f4f2f8" />
      {/* hoodie strings */}
      <path d="M31 70 v9 M45 70 v9" stroke="#e9e5f5" strokeWidth="1.6" strokeLinecap="round" />
      {/* lanyard */}
      <path d="M27 66 L36 86 M49 66 L40 86" stroke="#e8452c" strokeWidth="2" />
      <rect x="33.5" y="84" width="9" height="8" rx="1.5" fill="#fff" />
      {/* neck */}
      <path d="M32 54 h12 v10 c-3 4 -9 4 -12 0 z" fill="#d79d78" />
      {/* ears */}
      <ellipse cx="21.5" cy="40" rx="3.2" ry="4.6" fill="#e3aa85" />
      <ellipse cx="54.5" cy="40" rx="3.2" ry="4.6" fill="#e3aa85" />
      {/* face */}
      <ellipse cx="38" cy="38" rx="16" ry="19" fill="#ecb892" />
      {/* hair */}
      <path
        d="M21.5 36 C20 20 29 13 39 13 C50 13 57 19 55 35 C53 28 49 24 43 23 C38 26 30 27 24 26 C22.5 29 22 32 21.5 36 Z"
        fill="#3a2a24"
      />
      {/* eyebrows */}
      <path d="M27.5 32.5 q4.5 -2.2 8 0 M40.5 32.5 q4.5 -2.2 8 0" stroke="#3a2a24" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {/* glasses */}
      <rect x="25.5" y="34.5" width="11" height="8.5" rx="3" fill="rgb(255 255 255 / 0.35)" stroke="#2a2633" strokeWidth="1.8" />
      <rect x="39.5" y="34.5" width="11" height="8.5" rx="3" fill="rgb(255 255 255 / 0.35)" stroke="#2a2633" strokeWidth="1.8" />
      <path d="M36.5 38 h3 M25.5 37.5 l-3.5 -1 M50.5 37.5 l3.5 -1" stroke="#2a2633" strokeWidth="1.6" strokeLinecap="round" />
      {/* eyes */}
      <circle cx="31" cy="39" r="1.5" fill="#2a2633" />
      <circle cx="45" cy="39" r="1.5" fill="#2a2633" />
      {/* nose and smile */}
      <path d="M38 41.5 q-1.6 4 0.4 4.6" stroke="#c98a66" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M33 49 q5 4 10 0" stroke="#8a4a3a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {/* stubble */}
      <path d="M26 46 C28 56 48 56 50 46 C48 52 28 52 26 46 Z" fill="#3a2a24" opacity="0.12" />
    </svg>
  );
}
