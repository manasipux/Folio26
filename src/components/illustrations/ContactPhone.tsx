import { motion } from 'motion/react';
import { contact, site } from '../../content';
import './ContactPhone.css';

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];

/**
 * Large decorative flip phone for the Contact page. Unfolds on load.
 * Purely decorative (aria-hidden) — the real links live next to it.
 * Replace with final art later if you like.
 */
export default function ContactPhone() {
  return (
    <div className="cphone" aria-hidden="true">
      <motion.div
        className="cphone__top"
        initial={{ rotateX: -150, opacity: 0.6 }}
        animate={{ rotateX: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 70, damping: 14, delay: 0.2 }}
      >
        <span className="cphone__antenna" />
        <span className="cphone__speaker" />
        <div className="cphone__screen">
          <div className="cphone__status">
            <span className="cphone__signal">
              <i />
              <i />
              <i />
              <i />
            </span>
            <span className="cphone__battery" />
          </div>
          <p className="cphone__label">✉ {contact.phoneStatus}</p>
          <p className="cphone__greeting">{contact.phoneGreeting}</p>
          <p className="cphone__from">{site.name}</p>
          <div className="cphone__softkeys">
            <span>Reply</span>
            <span>Back</span>
          </div>
        </div>
      </motion.div>

      <span className="cphone__hinge" />

      <div className="cphone__bottom">
        <div className="cphone__nav">
          <span className="cphone__call" />
          <span className="cphone__dpad" />
          <span className="cphone__end" />
        </div>
        <div className="cphone__keys">
          {KEYS.map((k) => (
            <span key={k}>{k}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
