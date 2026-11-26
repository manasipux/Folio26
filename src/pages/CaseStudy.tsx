import { Link, useParams } from 'react-router-dom';
import { caseStudyLabels as L, projects } from '../content';
import LazyImage from '../components/common/LazyImage';
import { usePageTitle } from '../components/common/usePageTitle';
import NotFound from './NotFound';
import PersonaPeek from '../components/work/PersonaPeek';
import PerchedBob from '../components/work/PerchedBob';
import SlideCarousel from '../components/work/SlideCarousel';
import Media from '../components/work/Media';
import ProcessStack from '../components/work/ProcessStack';
import ErrorStates from '../components/work/ErrorStates';
import './CaseStudy.css';
import './CaseStudyEnterprise.css';

/** Bob's glasses as a pointer (hotspot at the bridge). */
const GLASSES_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="56" height="28" viewBox="0 0 56 28">' +
  '<path d="M4 9 L1 6 M52 9 L55 6" stroke="#2a2633" stroke-width="2.5" stroke-linecap="round"/>' +
  '<rect x="3" y="7" width="21" height="16" rx="6" fill="#ffffff" fill-opacity="0.55" stroke="#2a2633" stroke-width="3"/>' +
  '<rect x="32" y="7" width="21" height="16" rx="6" fill="#ffffff" fill-opacity="0.55" stroke="#2a2633" stroke-width="3"/>' +
  '<path d="M24 13 q4 -4 8 0" fill="none" stroke="#2a2633" stroke-width="3" stroke-linecap="round"/>' +
  '<path d="M7 11 l5 -2 M36 11 l5 -2" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>' +
  '</svg>';
const GLASSES_CURSOR = `url("data:image/svg+xml,${encodeURIComponent(GLASSES_SVG)}") 28 14, auto`;

/**
 * Template for /work/:slug — every field comes from the project in content.ts.
 * `standalone` (used by /case-study/:slug) drops every link to the rest of the site.
 */
export default function CaseStudy({ standalone = false }: { standalone?: boolean }) {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];
  usePageTitle(project?.title);


  if (!project) return <NotFound />;

  const cs = project.caseStudy;
  const next = projects[(index + 1) % projects.length];
  const meta = [
    [L.role, cs.role],
    [L.timeline, cs.timeline],
    [L.team, cs.team],
    [L.tools, cs.tools],
  ];

  return (
    <article className="page cs">
      {!standalone && (
        <Link to="/work" className="cs__back">
          <span aria-hidden="true">←</span> {L.back}
        </Link>
      )}

      <header className="cs__header">
        <ul role="list" className="tag-list" aria-label="Tags">
          {project.tags.map((tag) => (
            <li key={tag} className="tag">
              {tag}
            </li>
          ))}
        </ul>
        <p className="cs__eyebrow">{project.eyebrow}</p>
        <h1 className="cs__title">{project.title}</h1>
        <div className="cs__context">
          <p className="cs__context-label">{L.context}</p>
          <p className="cs__overview">{cs.overview}</p>
        </div>
      </header>

      <dl className="cs__meta">
        {meta.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      <figure className="cs__hero">
        <LazyImage {...project.cover} eager width={1600} height={1000} />
      </figure>

      <section className="cs__section" aria-labelledby="cs-problem">
        <h2 id="cs-problem">{L.problem}</h2>
        <p>
          {(() => {
            const p = cs.persona;
            const at = p ? cs.problem.indexOf(p.trigger) : -1;
            if (!p || at < 0) return cs.problem;
            return (
              <>
                {cs.problem.slice(0, at)}
                <PersonaPeek label={p.trigger} persona={p} />
                {cs.problem.slice(at + p.trigger.length)}
              </>
            );
          })()}
        </p>
      </section>

      <section className="cs__section" aria-labelledby="cs-process">
        <h2 id="cs-process">{L.process}</h2>
        <ProcessStack steps={cs.process} />
      </section>

      {cs.tables?.map((t, ti) => (
        <section
          key={ti}
          className="cs__section"
          aria-labelledby={`cs-table-${ti}`}
          style={t.cursor === 'glasses' ? { cursor: GLASSES_CURSOR } : undefined}
        >
          <h2 id={`cs-table-${ti}`} className={t.cursor === 'glasses' ? 'cs__perched' : undefined}>
            {t.cursor === 'glasses' && <PerchedBob />}
            {t.title}
          </h2>
          <div className="cs__table-wrap">
            <table className="cs__table">
              {t.caption && <caption>{t.caption}</caption>}
              <thead>
                <tr>
                  {t.columns.map((c) => (
                    <th key={c} scope="col">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.rows.map((row, ri) => (
                  <tr key={ri}>
                    {row.map((cell, ci) =>
                      ci === 0 ? (
                        <th key={ci} scope="row">
                          {cell}
                        </th>
                      ) : (
                        <td key={ci} data-label={t.columns[ci]}>
                          {cell}
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      {cs.decisions && cs.decisions.length > 0 && (
        <section className="cs__section cs__section--stack" aria-labelledby="cs-decisions">
          <h2 id="cs-decisions">{L.decisions}</h2>
          <ul role="list" className="cs__decisions">
            {cs.decisions.map((d, i) => (
              <li key={i}>
                <h3>{d.title}</h3>
                {d.summary && <p className="cs__decision-summary">{d.summary}</p>}
                <p className="cs__decision-why">{d.body}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {cs.spotlights && cs.spotlights.length > 0 && (
        <section className="cs__section cs__section--stack" aria-labelledby="cs-spotlights">
          <h2 id="cs-spotlights">{L.spotlights}</h2>
          <div className="cs__spotlights">
            {cs.spotlights.map((sp, i) => (
              <article key={i} className="cs__spotlight">
                {sp.slides && sp.slides.length > 0 ? (
                  <SlideCarousel slides={sp.slides} />
                ) : (
                  <figure>
                    <Media image={sp.image} />
                    {sp.image.caption && <figcaption>{sp.image.caption}</figcaption>}
                  </figure>
                )}
                <div className="cs__spotlight-text">
                  <p className="cs__spotlight-label">{sp.label}</p>
                  <h3>{sp.title}</h3>
                  {sp.body && <p>{sp.body}</p>}
                  <ul>
                    {sp.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                  {sp.errorStates && <ErrorStates set={sp.errorStates} />}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {cs.images.length > 0 && (
        <div className="cs__gallery">
          {cs.images.map((img, i) => (
            <figure key={i}>
              <LazyImage {...img} width={1200} height={750} />
              {img.caption && <figcaption>{img.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}

      {cs.callout && (
        <aside className="cs__callout" aria-labelledby="cs-callout">
          <h2 id="cs-callout">{cs.callout.heading}</h2>
          <p>{cs.callout.body}</p>
        </aside>
      )}

      <section className="cs__section cs__outcome" aria-labelledby="cs-outcome">
        <h2 id="cs-outcome">{L.outcome}</h2>
        <p>{cs.outcome}</p>
      </section>

      {!standalone && next && next.slug !== project.slug && (
        <Link to={`/work/${next.slug}`} className="cs__next">
          <span className="cs__next-label">{L.next}</span>
          <span className="cs__next-title">
            {next.title} <span aria-hidden="true">→</span>
          </span>
        </Link>
      )}
    </article>
  );
}
