import { home } from '../../content';
import { withBase } from '../common/LazyImage';
import './PassportIllustration.css';

/**
 * Passport-style photo print (links to About me): a circular photo on white
 * photo paper, held by a paperclip. Uses home.passportPhoto from content.ts.
 */
export default function PassportIllustration() {
  return (
    <span className="passport" aria-hidden="true">
      <span className="passport__print">
        <img src={withBase(home.passportPhoto)} alt="" width={360} height={360} loading="lazy" decoding="async" />
      </span>
      <svg className="passport__clip" viewBox="0 0 24 64">
        <path
          d="M8 40V10a4 4 0 0 1 8 0v38a6 6 0 0 1-12 0V14"
          fill="none"
          stroke="#b9bcc4"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <path d="M8 40V10a4 4 0 0 1 8 0v38a6 6 0 0 1-12 0V14" fill="none" stroke="#fff" strokeWidth=".8" strokeLinecap="round" opacity=".7" />
      </svg>
    </span>
  );
}
