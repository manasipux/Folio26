import type { NavId } from '../../content';

/** Small line icons for the nav squares — one per page object. */
const paths: Record<NavId, React.ReactNode> = {
  // House
  home: (
    <>
      <path d="M4 11.5 12 5l8 6.5" />
      <path d="M6.5 10v9h11v-9" />
      <path d="M10.5 19v-4.5h3V19" />
    </>
  ),
  // Pencil
  work: (
    <>
      <path d="M15.5 4.5l4 4L9 19H5v-4z" />
      <path d="M13 7l4 4" />
    </>
  ),
  // Passport photo
  about: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="10.2" r="2.6" />
      <path d="M7.4 17.2c1-2.2 2.7-3.2 4.6-3.2s3.6 1 4.6 3.2" />
    </>
  ),
  // Flip phone
  contact: (
    <>
      <rect x="7.5" y="3" width="9" height="8.5" rx="2" />
      <rect x="7.5" y="12.5" width="9" height="8.5" rx="2" />
      <path d="M10 6h4M10 16h.01M12 16h.01M14 16h.01M10 18h.01M12 18h.01M14 18h.01" />
    </>
  ),
};

export default function NavIcon({ id }: { id: NavId }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[id]}
    </svg>
  );
}
