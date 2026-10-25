import AddressLink from '../../shared/ui/AddressLink/AddressLink';
import { contacts } from '../../shared/config/contacts';

import { contactContent, conditions } from './contact.data';

import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section className={`container section ${styles.contact}`} aria-labelledby="contact-title">
      <div className={`${styles.conditions} flow`}>
        <p className="kicker">{contactContent.kicker}</p>

        <h2 id="contact-title" className="section-title">
          {contactContent.title}
        </h2>

        {conditions.map(({ label, value, mobilePrefix, isAddress }) => (
          <div className={styles.condition} key={label}>
            <p>
              {mobilePrefix && <span className={styles.mobilePrefix}>{mobilePrefix}</span>}
              {label}
            </p>

            <p>{isAddress ? <AddressLink /> : value}</p>
          </div>
        ))}
      </div>

      <div className={styles.contactCard}>
        <p className="kicker">{contactContent.meetingKicker}</p>

        <h3>{contactContent.meetingTitle}</h3>

        <p className={styles.contactDescription}>{contactContent.meetingDescription}</p>

        <div className={styles.contactActions}>
          <a className="button" href={contacts.telegram} target="_blank" rel="noopener noreferrer">
            {contactContent.telegramCta}
          </a>

          <a
            className="button button-secondary"
            href={contacts.max}
            target="_blank"
            rel="noopener noreferrer"
          >
            {contactContent.maxCta}
          </a>
        </div>

        <p className={styles.contactMeta}>{contactContent.meta}</p>
      </div>
    </section>
  );
}
