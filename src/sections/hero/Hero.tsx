import { contacts } from '../../shared/config/contacts';
import portrait360 from '../../assets/images/portrait-360.webp';
import portrait720 from '../../assets/images/portrait-720.webp';
import portrait960 from '../../assets/images/portrait-960.webp';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={`container ${styles.hero}`} aria-labelledby="hero-title">
      <div className={styles.heroCopy}>
        <p className={`kicker ${styles.heroKicker}`}>ПСИХОЛОГ</p>

        <h1 id="hero-title" className={styles.heroTitle}>
          <span className={styles.heroScript}>Психоаналитическая</span>
          <span className={styles.heroSerif}>психотерапия</span>
        </h1>

        <p className={styles.heroLead}>
          Индивидуальная работа для тех, кому мало решения отдельной проблемы и кто хочет лучше
          понимать, как он устроен изнутри: что делает отношения такими важными, чувства – такими
          сильными и почему некоторые решения оказываются намного сложнее, чем выглядят со стороны.
        </p>

        <div className={styles.heroActions}>
          <p className={styles.heroMeta}>
            Новосибирск&nbsp; · &nbsp;очно и онлайн&nbsp; · &nbsp;3 500 ₽
          </p>

          <a
            className={`button ${styles.heroCta}`}
            href={contacts.telegram}
            target="_blank"
            rel="noopener noreferrer"
          >
            Договориться о встрече →
          </a>
        </div>
      </div>

      <div className={styles.portraitFrame}>
        <div className={styles.portraitCrop}>
          <img
            className={styles.portrait}
            src={portrait720}
            srcSet={`${portrait360} 360w, ${portrait720} 720w, ${portrait960} 960w`}
            sizes="(min-width: 1280px) 480px, (min-width: 900px) 40vw, (min-width: 600px) 568px, calc(100vw - 32px)"
            width="480"
            height="590"
            fetchPriority="high"
            alt="Юрий Грачев, психолог, в кресле с книгой"
          />
        </div>
      </div>
    </section>
  );
}
