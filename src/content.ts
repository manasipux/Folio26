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

export type Img = { src: string; alt: string; caption?: string; width?: number; height?: number };

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
  email: 'manasipux@gmail.com',
  linkedin: 'https://www.linkedin.com/in/manasiparulekar/',
  linkedinLabel: 'LinkedIn',
  // Shown in the browser tab
  title: 'Manasi — UX Designer',
};

// ------------------------------------------------------------
// Navigation (order = order on screen)
// ------------------------------------------------------------
export const nav = [
  { id: 'home', label: 'Home', to: '/' },
  { id: 'work', label: 'Work', to: '/work' },
  // About me opens on the homepage (the ID card); Contact me scrolls to the footer on any page
  { id: 'about', label: 'About me', to: '/#about' },
  { id: 'contact', label: 'Contact me', to: '#contact' },
] as const;

export type NavId = (typeof nav)[number]['id'];

// ------------------------------------------------------------
// Home
// ------------------------------------------------------------
export const home = {
  // Editorial homepage. Its headline and intro reuse `heading` and `intro` below.
  editorial: {
    label: 'UX Designer · Enterprise AI',
    // This word in the headline starts frosted; rubbing it wipes the glass away
    clearWord: 'clarity',
    // These words start with their letters jumbled; they untangle on hover, or once the word above is cleared
    tangledWords: 'complex systems',
    // Printed on the ID card. Clicking the card opens the About section under the headline.
    card: { role: 'UX Designer – AI', band: 'IBM watsonx Orchestrate' },
    cardHint: 'Click my ID card to get to know me',
    cardHintTouch: 'Tap my ID card to get to know me',
    aboutLabel: 'About me',
    aboutClose: 'Close',
    // Intro under the headline: the first part is set in black, the rest in grey.
    introLead: 'I’ve spent five years in B2B enterprise UX,',
    introRest:
      'designing for environments where simplicity isn’t about reducing features, but about creating clarity within complexity.',
    workHeading: 'Selected work',
    allWork: 'All work',
    aboutHeading: 'About',
    aboutBody:
      'Five years in B2B enterprise UX, built on a background in industrial and graphic design. At IBM I design for complex enterprise systems, where clarity matters more than fewer features.',
    aboutLink: 'More about me',
    contactHeading: 'Contact',
    contactBody: 'Open to roles, projects and conversations about untangling complex systems.',
    contactLink: 'Say hello',
  },

  // Printed on the ID card. heading = the big line, intro = the small print
  // (the small print is hidden on narrow phones, where the card is small).
  heading: 'I’m a UX designer who enjoys bringing clarity to complex systems.',
  intro:
    'I design for complex enterprise environments where simplicity isn’t about reducing features, but about creating clarity within complexity.',
  hint: 'Pick something up off the desk',

  // The desk photo fills the page. Two versions: landscape for wide screens,
  // portrait for phones. AI-generated in Figma.
  scene: {
    alt: 'Top-down photo of a wooden desk: my IBM ID card on a navy lanyard, with SALT and Godrej lanyards tucked under it, a kraft sketchbook with a blue pencil, a small touchscreen phone, wired earphones, and a watch and keys at the edges.',
    landscape: {
      src: '/images/desk-scene.webp',
      srcSmall: '/images/desk-scene-1024.webp',
      width: 1536,
      height: 1024,
      // Where the blank white card sits in the photo (percent)
      card: { x: 16.28, y: 32.3, w: 29.3, h: 27.3 },
    },
    portrait: {
      src: '/images/desk-scene-portrait.webp',
      srcSmall: '/images/desk-scene-portrait-683.webp',
      width: 1024,
      height: 1536,
      card: { x: 25.3, y: 15, w: 47.4, h: 18.6 },
    },
  },

  // Clickable objects in the photo. `box` is the object's position in each
  // photo, in percent: x/y = top-left corner, w/h = size. `to` is where it
  // goes; `action: 'playlist'` opens the Spotify panel instead.
  objects: [
    {
      id: 'about',
      label: 'About me',
      description: 'More about me',
      to: '/about',
      box: { landscape: { x: 15.5, y: 27.8, w: 31.1, h: 33.2 }, portrait: { x: 23.9, y: 13, w: 50.3, h: 21.6 } },
    },
    {
      id: 'salt',
      label: 'Salt.pe',
      description: 'Visual design for SALT',
      to: '/work/salt-pe',
      box: { landscape: { x: 29.8, y: 60.4, w: 5.4, h: 7 }, portrait: { x: 40.4, y: 33.6, w: 8.6, h: 4.4 } },
    },
    // [TODO: point this at a Godrej case study once you add one to `projects`]
    {
      id: 'godrej',
      label: 'Godrej',
      description: 'See my work',
      to: '/work',
      box: { landscape: { x: 35.6, y: 60.4, w: 7.7, h: 6.4 }, portrait: { x: 50, y: 33.6, w: 8.4, h: 4.4 } },
    },
    {
      id: 'work',
      label: 'Work',
      description: 'My sketchbook of projects',
      to: '/work',
      box: { landscape: { x: 50.1, y: 14.2, w: 31.3, h: 66.4 }, portrait: { x: 14.6, y: 41.1, w: 38.8, h: 34.1 } },
    },
    {
      id: 'contact',
      label: 'Contact me',
      description: 'Give me a call',
      to: '/contact',
      box: { landscape: { x: 83.5, y: 28.8, w: 13.3, h: 36.8 }, portrait: { x: 59.4, y: 44.8, w: 23.4, h: 28.3 } },
    },
    {
      id: 'playlist',
      label: 'Now playing',
      description: 'What I design to',
      action: 'playlist',
      box: { landscape: { x: 0, y: 71.3, w: 16.3, h: 27.3 }, portrait: { x: 33.2, y: 77.5, w: 35.6, h: 19.5 } },
    },
  ] as HomeObject[],

  // The earphones open this. Paste your playlist link from Spotify
  // (Share → Copy link to playlist), e.g. https://open.spotify.com/playlist/abc123
  playlist: {
    heading: 'What I design to',
    url: '[TODO: Spotify playlist link]',
    close: 'Close',
    missing: 'Playlist coming soon.',
  },
};

export type Box = { x: number; y: number; w: number; h: number };

export type HomeObject = {
  id: string;
  label: string;
  description: string;
  to?: string;
  action?: 'playlist';
  box: { landscape: Box; portrait: Box };
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
  /**
   * A tall snapshot of the case study page. On hover, the card scrolls through it.
   * Regenerate it after changing the case study (ask Claude, or screenshot the page at 1280px wide).
   */
  peek?: Img;
  /** Hidden projects stay in this file but don't show on the site. */
  hidden?: boolean;
  caseStudy: {
    role: string;
    timeline: string;
    team: string;
    tools: string;
    overview: string;
    problem: string;
    /** `summary` is the one-liner shown on the closed tile; `body` opens on click. */
    process: { heading: string; summary?: string; body: string }[];
    outcome: string;
    images: Img[];
    /** Optional richer sections — only rendered when present. */
    /** `summary` is the short, bold decision; `body` is the reasoning. */
    decisions?: { title: string; summary?: string; body: string }[];
    /** A closer look at one flow: an image with a few annotated points. */
    /** `slides` turns the image into a step-by-step carousel (a slide without an image shows a placeholder). */
    spotlights?: { label: string; title: string; body?: string; points: string[]; image: Img; slides?: { label: string; image?: Img }[]; /** Full width: text above, media across the page. For detailed screen recordings. */ wide?: boolean; }[];
    /** `cursor: 'glasses'` turns the pointer into Bob's glasses over the section. */
    tables?: { title: string; cursor?: 'glasses'; caption?: string; columns: string[]; rows: string[][] }[];
    callout?: { heading: string; body: string };
    errors?: ErrorStateSet;
    /** Inline persona: the first match of `trigger` in the problem text opens a card. */
    persona?: { trigger: string } & Persona;
  };
};

/** "How I handle errors": principles on the page, examples in a modal. */
export type ErrorStateSet = {
  heading: string;
  body: string;
  principles: string[];
  button: string;
  title: string;
  intro?: string;
  items: { title: string; body: string; image: Img }[];
};

export type Persona = {
  name: string;
  role: string;
  /** Shown on the card's header band. */
  product?: string;
  quote?: string;
  summary: string;
  details: { label: string; value: string }[];
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
const allProjects: Project[] = [
  {
    slug: 'ibm',
    eyebrow: 'IBM watsonx Orchestrate · Enterprise UX',
    title: 'Deploying AI agents: channel and voice configuration',
    summary:
      'Turning dense technical requirements into setup flows that let builders put AI agents into Teams, Slack, WhatsApp and phone calls, without drowning in settings.',
    tags: ['Enterprise UX', 'AI platform', 'Complex forms'],
    size: 'large',
    cover: {
      src: '/images/cover-ibm.webp',
      alt: 'Layered screens from the project: Microsoft Teams app registration at the back, the Text to speech step with Deepgram and the voice preview in the middle, and a pronunciation dictionary error (Enter valid IPA pronunciation) in front.',
      width: 1600,
      height: 1000,
    },
    peek: {
      src: '/images/peek-ibm.webp',
      alt: 'Preview of the case study page, scrolling from top to bottom',
      width: 640,
      height: 3335,
    },
    caseStudy: {
      role: 'UX Designer, channel and voice configuration',
      timeline: '2025 – 2026, ongoing',
      team: 'Product manager, engineering',
      tools: 'Figma, Carbon Design System',
      overview:
        'watsonx Orchestrate lets enterprises build AI agents. An agent only becomes useful once it lives where people already work, so builders have to deploy it to channels like Microsoft Teams, Slack, WhatsApp and Facebook Messenger, and, for voice agents, choose how it listens and speaks. I designed the configuration flows for both.',
      problem:
        'For a builder (our persona, Bob), “connect a channel” is not one form but many. Each channel needs credentials created in a different product. The same channel needs a different connection depending on where Orchestrate runs: IBM Cloud, AWS or on-premises. Draft and live environments each hold their own setup. Voice adds speech-to-text and text-to-speech providers such as ElevenLabs and Deepgram, whose documentation lists far more parameters than most builders will ever touch. Requirements arrived as a PM epic with fields and acceptance criteria. My job was deciding how a builder actually gets through them.',
      process: [
        {
          heading: 'Start from what already worked',
          summary: 'Built on proven patterns from watsonx Assistant and IBM’s Watson speech setup instead of starting from scratch.',
          body: 'This was the first version of channels in Orchestrate’s agent builder, so rather than reinventing it I adapted the proven integration patterns from watsonx Assistant, then extended them for new fields and deployment-specific connection types. For voice, I built on the existing IBM Watson speech setup and its preview panel, so third-party providers feel like part of the same product.',
        },
        {
          heading: 'Map every variation',
          summary: 'Mapped how channel, deployment, environment and provider each change the setup.',
          body: 'Before designing screens I mapped what changes the setup: channel, deployment, environment and, for voice, provider. That map showed which parts could share one pattern and which genuinely had to differ.',
        },
        {
          heading: 'Translate the documentation',
          summary: 'Turned provider documentation written for engineers into a form builders can get through.',
          body: 'Requirements came as a PM epic, backed by provider documentation written for engineers, with many more parameters than builders need. I worked out what each one does, then went through them in a 3-in-a-box review with the PM and engineering lead to decide which to show, which to move to advanced settings, and which the system could handle itself.',
        },
        {
          heading: 'Design for the moment after “Save”',
          summary: 'Inline errors, so builders catch problems before their users do.',
          body: 'A form that saves is not the same as an agent that works. Errors appear inline, right where they need fixing, and for voice, the existing preview lets builders hear the result before real users do.',
        },
      ],
      tables: [
        {
          title: 'Four factors I had to design for',
          caption: 'Based on IBM’s public watsonx Orchestrate documentation.',
          columns: ['Factor', 'Examples', 'What it changes in the form'],
          rows: [
            [
              'Channel',
              'Teams, Slack, WhatsApp (via Twilio), Facebook Messenger',
              'Different credentials: Teams needs an app ID, password and tenant ID; Slack a client ID, signing secret and workspace IDs; WhatsApp a Twilio account SID and auth token',
            ],
            [
              'Deployment',
              'IBM Cloud, AWS, on-premises',
              'A different connection type for the same channel',
            ],
            [
              'Environment',
              'Draft, live',
              'Each environment holds its own setup, one per channel type',
            ],
            [
              'Voice provider',
              'ElevenLabs, Deepgram and others',
              'Different models, languages and parameter ranges',
            ],
          ],
        },
        {
          title: 'Through Bob’s eyes',
          cursor: 'glasses',
          caption:
            'How I decided what Bob sees: a tiered model, agreed field by field in a 3-in-a-box review with product and engineering, working from each provider’s own documentation, such as Deepgram’s Flux configuration reference. Some settings were cut; the rest were kept and placed in a tier.',
          columns: ['Tier', 'Rule', 'How it appears'],
          rows: [
            ['Required', 'The connection cannot work without it', 'Always visible, at the top'],
            [
              'Common',
              'Most builders will want to adjust it',
              'Visible, with a sensible default already filled in',
            ],
            [
              'Advanced',
              'Rarely changed, or safe to default',
              'Moved to a final “Advanced settings” step',
            ],
            ['Removed', 'Not relevant to builders, or set by the system', 'Not shown at all'],
          ],
        },
      ],
      decisions: [
        {
          title: 'The provider leads',
          summary: 'Pick a provider first; every field below adapts to it.',
          body: 'Models, languages and voices all depend on the provider, so it is the first field. Switching provider resets everything to that provider’s defaults, so a builder never carries over a setting the new provider doesn’t support.',
        },
        {
          title: 'Complexity comes last',
          summary: 'Four steps, with advanced settings saved for the end.',
          body: 'Details, Speech to text, Text to speech, then Advanced settings. Each step groups access details first and behaviour second, and anything most builders won’t touch waits in the final step.',
        },
        {
          title: 'One experience, any provider',
          summary: 'IBM, ElevenLabs or Deepgram: same layout, same preview.',
          body: 'I extended the existing Watson setup and preview to third-party providers instead of designing new ones, and added a clear notice whenever a model is non-IBM and governed by its own licence terms.',
        },
      ],
      spotlights: [
        {
          label: 'Voice configuration',
          title: 'Bringing third-party voices in',
          points: [
            'Provider first: the form rebuilds around it. Watson asks for an instance URL and API key; Deepgram for a model, turn-taking, key terms and filters',
            'Switching provider resets every field to that provider’s defaults',
            'Cost and licence up front: paid providers carry a $ in the list and a warning when chosen, and third-party models show their licence terms',
            'Every slider has an exact-value field beside it, and tooltips appear only where a setting needs explaining, like end-of-turn threshold',
            'Settings most builders won’t touch wait in a final Advanced settings step',
          ],
          image: {
            src: '/images/voice-tts.mp4',
            alt: 'Screen recording of the Text to speech step: the builder switches the provider from Deepgram to ElevenLabs and sees a cost warning, changes the model to Eleven Turbo, turns Speaker Boost off, tunes the speed, stability and style sliders, previews the voice and saves.',
            caption: 'Text to speech: switch to ElevenLabs, pick a model, then tune speed, stability and style and preview the voice before saving.',
            width: 1200,
            height: 1124,
          },
          slides: [
            {
              label: 'Details',
              image: {
                src: '/images/voice-details.mp4',
                alt: 'Screen recording of the Details step: the builder names the voice configuration, keeps the default voice orchestrator, and moves on to the next step.',
                caption: 'Details: name the voice configuration and choose the voice orchestrator.',
                width: 1200,
                height: 1210,
              },
            },
            {
              label: 'Speech to text',
              image: {
                src: '/images/voice-stt.mp4',
                alt: 'Screen recording of the Speech to text step: the builder switches the provider to Deepgram, which brings in a third-party licence note and a different set of fields, picks the Flux General English model, checks the tooltip on the end-of-turn threshold, turns on numerals, adds "refund" as a key term and turns on the profanity filter.',
                caption: 'Speech to text: switch to Deepgram and the form reshapes around its model, turn-taking, key terms and filters.',
                width: 1200,
                height: 1210,
              },
            },
            {
              label: 'Text to speech',
              image: {
                src: '/images/voice-tts.mp4',
                alt: 'Screen recording of the Text to speech step: the builder switches the provider from Deepgram to ElevenLabs and sees a cost warning, changes the model to Eleven Turbo, turns Speaker Boost off, tunes the speed, stability and style sliders, previews the voice and saves.',
                caption: 'Text to speech: switch to ElevenLabs, pick a model, then tune speed, stability and style and preview the voice before saving.',
                width: 1200,
                height: 1124,
              },
            },
            {
              label: 'Advanced settings',
              image: {
                src: '/images/voice-advanced.mp4',
                alt: 'Screen recording of the Advanced settings step: the builder adjusts voice activity detection thresholds and speech delays, reviews keypad (DTMF) input and silence handling settings, and sees the reasoning engine choice before finishing.',
                caption: 'Advanced settings: voice activity detection, keypad (DTMF) input, silence handling and the reasoning engine, kept out of the way until a builder needs them.',
                width: 1200,
                height: 1210,
              },
            },
          ],
        },
        {
          label: 'Channel configuration',
          title: 'One pattern, many channels',
          points: [
            'Every channel follows the same shape: a short overview, numbered steps that mirror the setup in the channel’s own console, then optional settings. Microsoft Teams, shown here, is one of several',
            'Instructions sit next to the fields they fill: each step says where to find a value, right above where it goes',
            'Values the platform generates, like Teams’ messaging endpoint, come with a copy button',
            'Saved credentials are never shown back (“Value stored, leave blank to keep unchanged”), with a reminder to renew secrets before they expire',
            'Each channel asks only for its own credentials, and the fields change with the deployment: IBM Cloud, AWS or on-premises',
          ],
          image: {
            src: '/images/channel-teams-start.mp4',
            alt: 'Microsoft Teams channel setup',
            width: 1200,
            height: 1206,
          },
          slides: [
            {
              label: 'Get started',
              image: {
                src: '/images/channel-teams-start.mp4',
                alt: 'Screen recording of the Get started step for Microsoft Teams: a short overview lists the four things to do (create an app registration in Azure, create a bot, create a Teams app, publish the bot) before any fields.',
                caption: 'Get started: what Bob will do outside the product, before he touches a field.',
                width: 1200,
                height: 1206,
              },
            },
            {
              label: 'App registration',
              image: {
                src: '/images/channel-teams-app-reg.mp4',
                alt: 'Screen recording of the App registration step: numbered Azure instructions sit above the Application (client) ID, Tenant ID and Client secret fields, which the builder fills in; the secret is masked.',
                caption: 'App registration: each instruction sits right above the field it fills.',
                width: 1200,
                height: 1206,
              },
            },
            {
              label: 'Create your bot',
              image: {
                src: '/images/channel-teams-bot.mp4',
                alt: 'Screen recording of the Create your bot step: the builder copies the application ID and the generated messaging endpoint with copy buttons, next to a note on configuring a single-tenant app.',
                caption: 'Create your bot: values the platform generates come with a copy button, ready to paste into Azure.',
                width: 1200,
                height: 1206,
              },
            },
            {
              label: 'Create your Teams app',
              image: {
                src: '/images/channel-teams-app.mp4',
                alt: 'Screen recording of the Create your Teams app step: numbered Developer Portal instructions with the application ID ready to copy.',
                caption: 'Create your Teams app: the last steps in Teams’ own Developer Portal, with the ID it needs on hand.',
                width: 1200,
                height: 1206,
              },
            },
            {
              label: 'Settings',
              image: {
                src: '/images/channel-teams-settings.mp4',
                alt: 'Screen recording of the optional Settings step: the builder turns on thumbs up/down feedback and reviews the Standard and Fast response modes before finishing.',
                caption: 'Settings (optional): how the agent behaves in the channel, kept to the end.',
                width: 1200,
                height: 1206,
              },
            },
          ],
        },
      ],
      errors: {
        heading: 'How I handle errors',
        body: 'Every error should answer two questions where the builder is already looking: what went wrong, and what do I do now?',
        principles: [],
        button: 'See examples',
        title: 'How I handle errors',
        intro: 'Examples from the pronunciation dictionary in voice configuration, where builders can override how the agent says up to 500 words. The same rules apply across the channel and voice flows.',
        items: [
          {
            title: 'Limits: say the rule and the way out',
            body: 'At 500 entries, the notification names the limit and the fix: delete an entry to add a new one.',
            image: { src: '/images/voice-error-1.webp', alt: 'Error notification: Maximum entries reached. You can add up to 500 pronunciation overrides. Delete an existing entry to add a new one.' },
          },
          {
            title: 'Invalid input: flag the field, not the form',
            body: 'An invalid pronunciation is flagged on the field itself, next to the word it belongs to, before anything is added.',
            image: { src: '/images/voice-error-2.webp', alt: 'Pronunciation dictionary with the word Apple and an invalid pronunciation; the field is outlined in red with the message: Enter valid IPA pronunciation.' },
          },
          {
            title: 'Conflicts: catch them before they are saved',
            body: 'A word that already has a pronunciation is caught on entry, so the list never holds two answers for one word.',
            image: { src: '/images/voice-error-3.webp', alt: 'The word Hello entered again; the field is outlined in red with the message: Pronunciation already exists.' },
          },
          {
            title: 'Empty results: suggest a next step',
            body: 'A search that finds nothing says so plainly and suggests what to try instead.',
            image: { src: '/images/voice-error-4.webp', alt: 'Search for banana in the pronunciation list returns an empty state: No results found. Try a different keyword or check for spelling mistakes.' },
          },
        ],
      },
      callout: {
        heading: 'Designing for AI',
        body: 'These flows are where an AI agent leaves the builder and meets real people, in a chat app or on a call. Preview, pronunciation control and sensible defaults exist so builders can trust what the agent will say and sound like before anyone else hears it.',
      },
      persona: {
        trigger: 'our persona, Bob',
        name: 'Bob',
        role: 'Builder',
        product: 'watsonx Orchestrate',
        quote: 'My role is to help increase productivity for our end users.',
        summary:
          'Pro-code developer who owns the full agent lifecycle, from build to post-launch quality. Writes evaluation suites, only ships when they pass, debugs failures by inspecting traces, and turns production issues into regression tests.',
        details: [
          {
            label: 'Common titles',
            value:
              'Software Developer, AI Engineer, Agent Builder, Agent Dev, AI Quality Engineer, ML Evaluation Engineer',
          },
          {
            label: 'In this project',
            value:
              'Connects his agents to Teams, Slack, WhatsApp and Facebook Messenger, and sets up voice for agents that take calls',
          },
        ],
      },
      outcome:
        'Core voice interactions scaled substantially, growing from the low hundreds of thousands to well over half a million requests. These efforts contributed to channel traffic growth of roughly 80%, while improving the experience across Slack and Microsoft Teams, among the platform’s most heavily used customer channels.',
      images: [],
    },
  },
  {
    slug: 'agent-assist-translation',
    eyebrow: 'IBM watsonx Orchestrate · Agent Assist',
    title: 'Real-time translation for customer care agents',
    summary:
      'Letting English-speaking agents serve customers in any language, mid-chat, without a transfer or a second tool.',
    tags: ['Enterprise UX', 'AI assist', 'Customer care'],
    size: 'large',
    cover: {
      src: '/images/cover-agent-assist-translation.webp',
      alt: 'Layered screens from the prototype: the customer’s Spanish message, Agent Assist’s chat transcript showing it in English, a reply translated into Spanish with a Copy & Translate confirmation, and the customer’s phone with the whole conversation in Spanish.',
      width: 1600,
      height: 1000,
    },
    peek: {
      src: '/images/peek-agent-assist-translation.webp',
      alt: 'Preview of the case study page, scrolling from top to bottom',
      width: 640,
      height: 2502,
    },
    caseStudy: {
      role: 'Lead UX Designer, Agent Assist',
      timeline: 'A few weeks of design iterations; test prototypes built in one day',
      team: 'Product manager, architect, engineering',
      tools: 'Figma, Figma Make, Carbon Design System',
      overview:
        'Agent Assist is the AI assistant in watsonx Orchestrate that sits beside a human care agent during live conversations, suggesting responses and surfacing answers. It’s an app that runs inside whichever contact-center (CCaaS) platform a business uses; here, Genesys. I designed real-time translation for it: customer messages arrive in English, and agents reply in the customer’s own language.',
      problem:
        'Customers write in many languages, but agents work in English. Before this, agents copied each customer message into a separate translator widget by hand, translated their reply the same way, and pasted it back, all while the customer waited. Agent Assist also doesn’t send messages itself: agents chat with customers in the host platform, Genesys in this case. So translation had to work in both directions, keep pace with a live chat, and still get the reply into a window Agent Assist doesn’t control.',
      process: [
        {
          heading: 'Follow the conversation, both ways',
          summary: 'Split the work into reading the customer and replying to them.',
          body: 'Translation is two different jobs. Reading a customer’s message carries little risk; sending a reply the agent can’t read does. Treating them separately shaped every decision that followed.',
        },
        {
          heading: 'Build on the assist flow agents already use',
          summary: 'Translation works on AI-suggested responses, not just typed ones.',
          body: 'Agents already lean on Agent Assist’s suggested responses. Rather than a separate translator, translation plugs into that flow: a suggestion gets a Copy & Translate action, and the agent’s own replies get a Translation tab beside the chat transcript.',
        },
        {
          heading: 'Iterate on the handoff to Genesys',
          summary: 'Several rounds over a few weeks, down to one action per reply.',
          body: 'With replies sent from Genesys, every translated message has to cross between two tools. Over a few weeks of iterations I reduced that crossing to a single action: Copy & Translate puts the reply, already in the customer’s language, on the clipboard and confirms it with a short message. [TODO: what the earlier iterations looked like]',
        },
        {
          heading: 'Prototype both sides of the chat',
          summary: 'Two linked prototypes, built in Figma Make in one day, for user testing.',
          body: 'To test with real back-and-forth, I built two prototypes that talk to each other live: a customer simulator on a phone, where a tester plays a customer writing in Spanish, and the agent’s workspace with Agent Assist beside the Genesys chat. Messages, typing and hand-offs sync between the two, so one person can play the customer while another works the case as the agent. [TODO: what testing showed, and what changed]',
        },
      ],
      decisions: [
        {
          title: 'Incoming is automatic, outgoing is on request',
          summary: 'Agents read in English instantly; they choose when to translate a reply.',
          body: 'Every incoming message appears in English in the chat transcript without a click, replacing the manual copy into a translator widget. Understanding the customer should cost nothing. Outgoing translation is triggered by the agent, so nothing reaches the customer until the agent has chosen it.',
        },
        {
          title: 'Copy and translate in one action',
          summary: 'AI suggestions go to the clipboard already translated.',
          body: 'Agent Assist runs inside the host platform but can’t post into its chat, so the clipboard is the bridge. That also keeps the flow the same on any CCaaS platform, not just Genesys. Combining copy and translate into one action means a suggested reply is one click away from being pasted, and a confirmation tells the agent it worked. Free-form replies go through the Translation tab and end in the same copy step.',
        },
        {
          title: 'One detected language at a time',
          summary: 'The system detects the customer’s language, so agents never pick one.',
          body: 'For this release, Agent Assist detects the customer’s language and translates to and from it for the whole conversation. Leaving out a language picker keeps the agent’s screen focused on the customer. Choosing or switching languages is planned for a later release.',
        },
      ],
      spotlights: [
        {
          label: 'Real-time translation',
          title: 'Replying in the customer’s language',
          wide: true,
          points: [
            'Incoming customer messages appear in English in the chat transcript',
            'Copy & Translate an AI-suggested reply in one click',
            'Write your own reply in the Translation tab and copy the translated text',
            'Paste into the host platform’s chat (here, Genesys); the customer reads it in their language',
            'The language is detected automatically, one per conversation',
          ],
          image: {
            src: '/images/cover-agent-assist-translation.webp',
            alt: 'Layered screens from the prototype: Spanish on the customer’s side, English on the agent’s.',
            width: 1600,
            height: 1000,
          },
          slides: [
            {
              label: 'Incoming message',
              image: {
                src: '/images/tr-incoming.mp4',
                alt: 'Screen recording: the agent answers a new chat. The customer wrote “Hola, quiero reservar un vuelo” in Genesys, and Agent Assist’s chat transcript shows it as “Hello, I want to book a flight”, with a suggested Book flight action.',
                caption: 'The customer writes in Spanish; Agent Assist shows the agent the message in English.',
                width: 1800,
                height: 1200,
              },
            },
            {
              label: 'AI-suggested reply',
              image: {
                src: '/images/tr-suggestion.mp4',
                alt: 'Screen recording: the agent runs Book flight, Agent Assist suggests a reply in English, and the agent uses Copy & Translate. A confirmation appears and the reply is pasted into Genesys in Spanish.',
                caption: 'Copy & Translate puts the suggested reply on the clipboard in Spanish, ready to paste.',
                width: 1800,
                height: 1200,
              },
            },
            {
              label: 'Free-form reply',
              image: {
                src: '/images/tr-freeform.mp4',
                alt: 'Screen recording: in the Translation tab the agent types “I’m sorry, I see you mentioned the date already”, gets the Spanish translation, copies it and sends it from Genesys.',
                caption: 'For their own words, the agent writes in English in the Translation tab and copies the Spanish.',
                width: 1800,
                height: 1200,
              },
            },
            {
              label: 'Customer’s view',
              image: {
                src: '/images/tr-customer.mp4',
                alt: 'Screen recording of the customer simulator on a phone: the conversation with the care agent reads entirely in Spanish, including a list of flight options, and the customer replies with a flight number.',
                caption: 'In the customer simulator, the whole conversation reads in Spanish.',
                width: 1800,
                height: 1200,
              },
            },
          ],
        },
      ],
      callout: {
        heading: 'Designing for AI',
        body: 'Here the agent can’t check the AI’s work: they don’t read the customer’s language. So the design keeps the agent in charge of every outgoing message, and translation only reaches the customer when the agent sends it on.',
      },
      outcome:
        'Real-time translation was designed for an airline client whose customer service teams currently handle approximately 4,000 customer interactions per week through Agent Assist, with usage continuing to grow as the airline expands its operations.',
      images: [],
    },
  },
  {
    slug: 'epfo-portal-redesign',
    hidden: true,
    eyebrow: 'High-impact UX',
    title: 'EPFO Portal Redesign',
    summary: '[TODO: one-line summary]',
    tags: ['UX Design', 'Redesign'],
    size: 'medium',
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
    hidden: true,
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
    slug: 'salt-pe',
    hidden: true,
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
    hidden: true,
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

/** What the site shows: every project not marked `hidden`. */
export const projects = allProjects.filter((p) => !p.hidden);

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
    'For the past five years, I’ve worked as a UX designer at IBM, designing for complex enterprise systems where usability, structure, and clarity are essential. I’m particularly interested in simplifying complexity, improving workflows, and crafting experiences that feel intuitive without oversimplifying reality.',
    'My multidisciplinary foundation continues to inform my thinking, while my professional focus remains firmly rooted in UX design.',
  ],
  longToggleLabel: 'Read the longer story',
  // Long version — tucked behind the "Read the longer story" toggle
  long: [
    'I didn’t start my career in UX.',
    'My background is in industrial design, where I first learned to think about how people interact with products, how form, function, constraints, and human behaviour come together. Designing for the physical world shaped how I approach problems today, with structure, curiosity, and a strong sensitivity to usability.',
    'I later moved into graphic design, which sharpened my visual thinking and strengthened my understanding of hierarchy, clarity, and communication. Over time, I found myself increasingly drawn to interaction, systems, and the logic behind how things work, a shift that naturally led me into user experience design.',
    'For the past five years, I’ve been working as a UX designer at IBM, designing for complex enterprise environments where simplicity isn’t about reducing features, but about creating clarity within complexity. I enjoy untangling messy problems, improving workflows, and shaping experiences that feel intuitive without oversimplifying reality.',
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
/** Résumé PDF, linked from the footer and the About panel. */
export const resume = {
  label: 'Résumé',
  href: '/files/Manasi-Parulekar-Resume.pdf',
  note: 'PDF',
};

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
  context: 'Context',
  problem: 'The problem',
  process: 'Process',
  outcome: 'Outcome',
  decisions: 'Key decisions',
  spotlights: 'The experience',
  next: 'Next project',
};

export const notFound = {
  heading: 'Page not found',
  body: 'This page doesn’t exist — let’s get you back.',
  cta: 'Go home',
};
