import { conditions } from './contact.data';
import { contacts } from '../../shared/config/contacts';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section className={`container section ${styles.contact}`} aria-labelledby="contact-title">
      <div className={`${styles.conditions} flow`}>
        <p className="kicker">ПРАКТИЧЕСКАЯ ИНФОРМАЦИЯ</p>

        <h2 id="contact-title" className="section-title">
          Условия и формат
        </h2>
        {conditions.map(([label, value]) => (
          <div className={styles.condition} key={label}>
            <p>{label}</p>

            <p>{value}</p>
          </div>
        ))}
      </div>

      <div className={styles.contactCard}>
        <p className="kicker">ПЕРВАЯ ВСТРЕЧА</p>

        <h3>Записаться на первую встречу</h3>

        <p className={styles.contactDescription}>
          Чтобы договориться о первой встрече, достаточно написать в Telegram или MAX. Время и
          формат обсудим в переписке.
        </p>

        <a className="button" href={contacts.telegram} target="_blank" rel="noopener noreferrer">
          Написать в Telegram
        </a>

        <a
          className="button button-secondary"
          href={contacts.max}
          target="_blank"
          rel="noopener noreferrer"
        >
          Написать в MAX
        </a>

        <p className={styles.contactMeta}>
          Очно и онлайн&nbsp; · &nbsp;45–50 минут&nbsp; · &nbsp;3 500 ₽
        </p>
      </div>
    </section>
  );
}
