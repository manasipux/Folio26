import { projects, work } from '../content';
import ProjectCard from '../components/work/ProjectCard';
import { usePageTitle } from '../components/common/usePageTitle';
import './Work.css';

/**
 * Bento grid. Slots are filled in the order projects appear in content.ts:
 * [0][1] large top row · [2][3] medium bottom row · [4][5] stacked right column.
 */
const AREAS = ['a', 'b', 'c', 'd', 'e', 'f'];

export default function Work() {
  usePageTitle(work.heading);
  return (
    <div className="page work">
      <h1 className="visually-hidden">{work.heading}</h1>
      <div className="bento">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            className={AREAS[i] ? `bento__${AREAS[i]}` : ''}
          />
        ))}
      </div>
    </div>
  );
}
