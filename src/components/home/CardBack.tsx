import { home } from '../../content';

export default function CardBack() {
  return (
    <div className="card-back">
      <h2 className="card-back__heading">{home.back.heading}</h2>
      <p className="card-back__intro">{home.back.intro}</p>
      <blockquote className="card-back__quote">
        <p>“{home.back.quote}”</p>
      </blockquote>
    </div>
  );
}
