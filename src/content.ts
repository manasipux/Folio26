/**
 * ============================================================
 *  ALL SITE COPY LIVES HERE.
 *  Edit text, links, projects and images in this file only —
 *  you should never need to touch a component to change words.
 *
 *  Anything wrapped like "[TODO: …]" is a placeholder for you
 *  to replace. Search this file for "TODO" to find them all.
 *  Links whose value still starts with "[TODO" are rendered as
 *  plain text (not clickable) so nothing broken ships.
 *
 *  Images: drop files into /public/images and reference them
 *  as "/images/your-file.jpg".
 * ============================================================
 */

export type Img = { src: string; alt: string; caption?: string };

/** True while a value is still a "[TODO: …]" placeholder. */
export const isTodo = (value: string) => value.trim().startsWith('[TODO');

// ------------------------------------------------------------
// Site-wide
// ------------------------------------------------------------
export const site = {
  name: 'Manasi',
  // Full name, if you want it on the card. e.g. 'Manasi Surname'
  fullName: 'Manasi [TODO: surname, or delete this placeholder]',
  roles: ['UX Designer', 'Visual Design', 'Industrial Design'],
  location: 'Kochi, India',
  email: '[TODO: your email address]',
  linkedin: '[TODO: https://www.linkedin.com/in/your-handle]',
  linkedinLabel: 'LinkedIn',
  // Shown in the browser tab
  title: 'Manasi — UX Designer',
  // Tiny label inside the "stamp" on the home card
  stampLabel: 'Folio ’26',
};

// ------------------------------------------------------------
// Navigation (order = order on screen)
// ------------------------------------------------------------
export const nav = [
  { id: 'home', label: 'Home', to: '/' },
  { id: 'work', label: 'Work', to: '/work' },
  { id: 'about', label: 'About me', to: '/about' },
  { id: 'contact', label: 'Contact me', to: '/contact' },
] as const;

export type NavId = (typeof nav)[number]['id'];

// ------------------------------------------------------------
// Home
// ------------------------------------------------------------
export const home = {
  photo: {
    src: '/images/manasi-square.webp',
    alt: 'Manasi smiling outdoors by the water, with trees behind her',
  } satisfies Img,
  // Used inside the "passport photo" object that links to About me
  passportPhoto: '/images/manasi-passport.webp',
  flipHint: 'Flip me',
  back: {
    heading: 'Intro about the type of experiences I create',
    intro:
      'I design for complex enterprise environments where simplicity isn’t about reducing features, but about creating clarity within complexity. I enjoy untangling messy problems, improving workflows, and shaping experiences that feel intuitive without oversimplifying reality.',
    quote: 'I’m a UX designer who enjoys bringing clarity to complex systems.',
  },
  // The three illustrated objects around the card
  objects: {
    work: { label: 'Work', description: 'See my work' },
    about: { label: 'About me', description: 'Read about me' },
    contact: { label: 'Contact me', description: 'Get in touch' },
  },
};

// ------------------------------------------------------------
// Work / projects
// ------------------------------------------------------------
export type ProjectSize = 'large' | 'medium' | 'small';

export type Project = {
  slug: string;
  /** Card + case study title */
  title: string;
  /** Small line above the title, e.g. company or type of work */
  eyebrow: string;
  /** One or two sentences for the Work card */
  summary: string;
  tags: string[];
  size: ProjectSize;
  cover: Img;
  caseStudy: {
    role: string;
    timeline: string;
    team: string;
    tools: string;
    overview: string;
    problem: string;
    process: { heading: string; body: string }[];
    outcome: string;
    images: Img[];
  };
};

// Abstract placeholder art in /public/images/cover-<art>.svg — replace with real screens.
const placeholderCover = (name: string, art: string): Img => ({
  src: `/images/cover-${art}.svg`,
  alt: `Placeholder cover image for ${name}`,
});

const placeholderGallery = (name: string, art: string): Img[] => [
  {
    src: `/images/cover-${art}.svg`,
    alt: `Placeholder image for ${name}`,
    caption: '[TODO: caption for this image]',
  },
  {
    src: `/images/cover-${art}.svg`,
    alt: `Placeholder image for ${name}`,
    caption: '[TODO: caption for this image]',
  },
];

const templateProcess = [
  { heading: 'Research', body: '[TODO: what you learned and how]' },
  { heading: 'Define', body: '[TODO: how you framed the problem]' },
  { heading: 'Design', body: '[TODO: key design decisions and iterations]' },
  { heading: 'Validate', body: '[TODO: how you tested and what changed]' },
];

/**
 * Order matters for the bento grid on the Work page:
 *  1st + 2nd  → the two large cards across the top
 *  3rd + 4th  → the two medium cards on the bottom row
 *  5th + 6th  → the stacked cards in the right-hand column
 */
export const projects: Project[] = [
  {
    slug: 'ibm',
    eyebrow: 'IBM · Enterprise UX',
    title: '[TODO: IBM case study title]',
    summary:
      '[TODO: one-line summary. Keep it free of confidential client or product details.]',
    tags: ['Enterprise UX', 'IBM'],
    size: 'large',
    cover: placeholderCover('the IBM case study', 'ibm'),
    caseStudy: {
      role: 'UX Designer',
      timeline: '[TODO: e.g. 2023 – 2024]',
      team: '[TODO: team you worked with]',
      tools: '[TODO: tools used]',
      overview:
        '[TODO: short overview. Share only what you are cleared to share publicly — no confidential IBM or client details.]',
      problem: '[TODO: the problem, in user terms]',
      process: templateProcess,
      outcome: '[TODO: add outcome — only real, shareable results]',
      images: placeholderGallery('the IBM case study', 'ibm'),
    },
  },
  {
    slug: 'epfo-portal-redesign',
    eyebrow: 'High-impact UX',
    title: 'EPFO Portal Redesign',
    summary: '[TODO: one-line summary]',
    tags: ['UX Design', 'Redesign'],
    size: 'large',
    cover: placeholderCover('the EPFO Portal Redesign', 'epfo'),
    caseStudy: {
      role: '[TODO: your role]',
      timeline: '[TODO: timeline]',
      team: '[TODO: team]',
      tools: '[TODO: tools]',
      overview: '[TODO: overview]',
      problem: '[TODO: the problem]',
      process: templateProcess,
      outcome: '[TODO: add outcome]',
      images: placeholderGallery('the EPFO Portal Redesign', 'epfo'),
    },
  },
  {
    slug: 'ai-research-synthesizer',
    eyebrow: 'UX work',
    title: 'AI Research Synthesizer',
    summary: '[TODO: one-line summary]',
    tags: ['UX Design'],
    size: 'medium',
    cover: placeholderCover('the AI Research Synthesizer', 'ai'),
    caseStudy: {
      role: '[TODO: your role]',
      timeline: '[TODO: timeline]',
      team: '[TODO: team]',
      tools: '[TODO: tools]',
      overview: '[TODO: overview]',
      problem: '[TODO: the problem]',
      process: templateProcess,
      outcome: '[TODO: add outcome]',
      images: placeholderGallery('the AI Research Synthesizer', 'ai'),
    },
  },
  {
    // Spare slot from the wireframe. Rename the slug + fill in, or delete this object.
    slug: 'ux-project',
    eyebrow: 'UX work',
    title: '[TODO: UX project title]',
    summary: '[TODO: one-line summary]',
    tags: ['UX Design'],
    size: 'medium',
    cover: placeholderCover('this UX project', 'ux'),
    caseStudy: {
      role: '[TODO: your role]',
      timeline: '[TODO: timeline]',
      team: '[TODO: team]',
      tools: '[TODO: tools]',
      overview: '[TODO: overview]',
      problem: '[TODO: the problem]',
      process: templateProcess,
      outcome: '[TODO: add outcome]',
      images: placeholderGallery('this UX project', 'ux'),
    },
  },
  {
    slug: 'salt-pe',
    eyebrow: 'Visual design',
    title: 'Salt.pe',
    summary:
      'Before transitioning fully into UX, I worked in graphic design where I developed a strong foundation in visual hierarchy, typography, and communication clarity — skills that continue to inform my UX practice.',
    tags: ['Visual Design'],
    size: 'small',
    cover: placeholderCover('Salt.pe', 'salt'),
    caseStudy: {
      role: '[TODO: your role]',
      timeline: '[TODO: timeline]',
      team: '[TODO: team]',
      tools: '[TODO: tools]',
      overview: '[TODO: overview]',
      problem: '[TODO: the brief]',
      process: templateProcess,
      outcome: '[TODO: add outcome]',
      images: placeholderGallery('Salt.pe', 'salt'),
    },
  },
  {
    slug: 'student-work',
    eyebrow: 'ID work · Student work',
    title: 'Brand as Design Foundation',
    summary: '[TODO: one-line summary]',
    tags: ['Industrial Design'],
    size: 'small',
    cover: placeholderCover('Brand as Design Foundation', 'student'),
    caseStudy: {
      role: '[TODO: your role]',
      timeline: '[TODO: timeline]',
      team: '[TODO: team]',
      tools: '[TODO: tools]',
      overview: '[TODO: overview]',
      problem: '[TODO: the brief]',
      process: templateProcess,
      outcome: '[TODO: add outcome]',
      images: placeholderGallery('Brand as Design Foundation', 'student'),
    },
  },
];

export const work = {
  heading: 'Work', // read by screen readers; the nav label shows it visually
  cardCta: 'View case study',
};

// ------------------------------------------------------------
// About me
// ------------------------------------------------------------
export const about = {
  headline:
    'My background across industrial, graphic, and UX design continues to shape how I think about structure, clarity, and user interaction.',
  photo: {
    src: '/images/manasi-portrait.webp',
    alt: 'Manasi smiling by a river at golden hour, trees in the background',
  } satisfies Img,
  avatar: '/images/manasi-avatar.webp',
  // Short version — shown on the page
  short: [
    'My background spans industrial design, graphic design, and user experience design, a progression that has shaped how I approach problem-solving today.',
    'For the past four years, I’ve worked as a UX designer at IBM, designing for complex enterprise systems where usability, structure, and clarity are essential. I’m particularly interested in simplifying complexity, improving workflows, and crafting experiences that feel intuitive without oversimplifying reality.',
    'My multidisciplinary foundation continues to inform my thinking, while my professional focus remains firmly rooted in UX design.',
  ],
  longToggleLabel: 'Read the longer story',
  // Long version — tucked behind the "Read the longer story" toggle
  long: [
    'I didn’t start my career in UX.',
    'My background is in industrial design, where I first learned to think about how people interact with products, how form, function, constraints, and human behaviour come together. Designing for the physical world shaped how I approach problems today, with structure, curiosity, and a strong sensitivity to usability.',
    'I later moved into graphic design, which sharpened my visual thinking and strengthened my understanding of hierarchy, clarity, and communication. Over time, I found myself increasingly drawn to interaction, systems, and the logic behind how things work, a shift that naturally led me into user experience design.',
    'For the past four years, I’ve been working as a UX designer at IBM, designing for complex enterprise environments where simplicity isn’t about reducing features, but about creating clarity within complexity. I enjoy untangling messy problems, improving workflows, and shaping experiences that feel intuitive without oversimplifying reality.',
    'While my multidisciplinary background continues to inform how I think, my professional focus is firmly rooted in UX design, crafting thoughtful, structured, and human-centered digital experiences.',
    'Outside of work, I’m naturally drawn to observing how people interact with everyday products, interfaces, and systems, a curiosity that tends to follow me everywhere. I’m particularly interested in interaction patterns, behavioural nuances, and the small details that quietly shape how experiences feel.',
  ],
  feedLabel: 'Life outside work',
  // The scrolling "social feed" panel. Swap src/alt/caption for your own photos.
  feed: [
    {
      src: '/images/feed-1.svg',
      alt: 'Placeholder: a beach at sunset',
      caption: 'I like beaches and sunsets',
    },
    {
      src: '/images/feed-2.svg',
      alt: 'Placeholder photo',
      caption: '[TODO: caption]',
    },
    {
      src: '/images/feed-3.svg',
      alt: 'Placeholder photo',
      caption: '[TODO: caption]',
    },
    {
      src: '/images/feed-4.svg',
      alt: 'Placeholder photo',
      caption: '[TODO: caption]',
    },
  ] satisfies Img[],
};

// ------------------------------------------------------------
// Contact me
// ------------------------------------------------------------
export const contact = {
  heading: 'Say hello',
  invite:
    'Whether it’s a role, a project, or a chat about untangling complex systems, my line is open.',
  // The Micromax X222 on the Contact page: a short "boot" message, then a home screen
  // whose tiles are real links.
  phone: {
    bootText: 'Hello!',
    tiles: { email: 'Email', linkedin: 'LinkedIn', work: 'My work', about: 'About me' },
  },
  menu: [
    { key: '1', label: 'Email', kind: 'email' },
    { key: '2', label: 'LinkedIn', kind: 'linkedin' },
  ] as const,
  locationLine: 'Based in Kochi, India',
};

// ------------------------------------------------------------
// Case study page labels
// ------------------------------------------------------------
export const caseStudyLabels = {
  back: 'All work',
  role: 'Role',
  timeline: 'Timeline',
  team: 'Team',
  tools: 'Tools',
  problem: 'The problem',
  process: 'Process',
  outcome: 'Outcome',
  next: 'Next project',
};

export const notFound = {
  heading: 'Page not found',
  body: 'This page doesn’t exist — let’s get you back.',
  cta: 'Go home',
};
