import { Link } from 'react-router-dom';
import { work, type Project } from '../../content';
import LazyImage from '../common/LazyImage';
import './ProjectCard.css';

type Props = {
  project: Project;
  className?: string;
};

/** A lavender bento card. The whole card is clickable via a stretched link on the title. */
export default function ProjectCard({ project, className = '' }: Props) {
  const showCover = project.size !== 'small';
  return (
    <article className={`pcard pcard--${project.size} ${className}`}>
      <ul role="list" className="tag-list pcard__tags" aria-label="Tags">
        {project.tags.map((tag) => (
          <li key={tag} className="tag">
            {tag}
          </li>
        ))}
      </ul>

      <div className="pcard__body">
        <p className="pcard__eyebrow">{project.eyebrow}</p>
        <h2 className="pcard__title">
          <Link to={`/work/${project.slug}`} className="pcard__link">
            {project.title}
          </Link>
        </h2>
        <p className="pcard__summary">{project.summary}</p>
      </div>

      {showCover && (
        <div className="pcard__cover">
          <LazyImage {...project.cover} width={800} height={500} />
        </div>
      )}

      <span className="pcard__cta" aria-hidden="true">
        {work.cardCta} <span className="pcard__arrow">→</span>
      </span>
    </article>
  );
}
