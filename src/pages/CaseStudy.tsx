import { Link, useParams } from 'react-router-dom';
import { caseStudyLabels as L, projects } from '../content';
import LazyImage from '../components/common/LazyImage';
import { usePageTitle } from '../components/common/usePageTitle';
import NotFound from './NotFound';
import './CaseStudy.css';

/** Template for /work/:slug — every field comes from the project in content.ts */
export default function CaseStudy() {
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
      <Link to="/work" className="cs__back">
        <span aria-hidden="true">←</span> {L.back}
      </Link>

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
        <p className="cs__overview">{cs.overview}</p>
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
        <p>{cs.problem}</p>
      </section>

      <section className="cs__section" aria-labelledby="cs-process">
        <h2 id="cs-process">{L.process}</h2>
        <ol role="list" className="cs__steps">
          {cs.process.map((step, i) => (
            <li key={i}>
              <span className="cs__step-num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3>{step.heading}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {cs.tables?.map((t, ti) => (
        <section key={ti} className="cs__section" aria-labelledby={`cs-table-${ti}`}>
          <h2 id={`cs-table-${ti}`}>{t.title}</h2>
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
        <section className="cs__section" aria-labelledby="cs-decisions">
          <h2 id="cs-decisions">{L.decisions}</h2>
          <ul role="list" className="cs__decisions">
            {cs.decisions.map((d, i) => (
              <li key={i}>
                <h3>{d.title}</h3>
                <p>{d.body}</p>
              </li>
            ))}
          </ul>
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

      {next && next.slug !== project.slug && (
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
