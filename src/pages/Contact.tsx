import { contact, site } from '../content';
import SmartLink from '../components/common/SmartLink';
import PhoneX222 from '../components/illustrations/PhoneX222';
import { usePageTitle } from '../components/common/usePageTitle';
import './Contact.css';

export default function Contact() {
  usePageTitle('Contact me');

  const values = {
    email: { href: `mailto:${site.email}`, text: site.email },
    linkedin: { href: site.linkedin, text: site.linkedin.replace(/^https?:\/\/(www\.)?/, '') },
  };

  return (
    <div className="page contact">
      <div className="contact__text">
        <h1 className="contact__heading">{contact.heading}</h1>
        <p className="contact__invite">{contact.invite}</p>

        {/* Styled like a phone menu: numbered options */}
        <ul role="list" className="contact__menu">
          {contact.menu.map((item) => {
            const v = values[item.kind];
            return (
              <li key={item.key}>
                <SmartLink href={v.href} className="contact__option">
                  <span className="contact__key" aria-hidden="true">
                    {item.key}
                  </span>
                  <span className="contact__option-text">
                    <span className="contact__option-label">{item.label}</span>
                    <span className="contact__option-value">{v.text}</span>
                  </span>
                  <span className="contact__arrow" aria-hidden="true">
                    →
                  </span>
                </SmartLink>
              </li>
            );
          })}
        </ul>

        <p className="contact__location">{contact.locationLine}</p>
      </div>

      <div className="contact__phone">
        <PhoneX222 interactive />
      </div>
    </div>
  );
}
