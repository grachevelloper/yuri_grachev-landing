import { contacts } from '../../shared/config/contacts';
import portrait360 from '../../assets/images/portrait-360.webp';
import portrait720 from '../../assets/images/portrait-720.webp';
import portrait960 from '../../assets/images/portrait-960.webp';

import { heroContent } from './hero.data';

import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={`container ${styles.hero}`} aria-labelledby="hero-title">
      <div className={styles.heroCopy}>
        <p className={`kicker ${styles.heroKicker}`}>{heroContent.kicker}</p>

        <h1 id="hero-title" className={styles.heroTitle}>
          <span className={styles.heroScript}>{heroContent.scriptTitle}</span>
          <span className={styles.heroSerif}>{heroContent.serifTitle}</span>
        </h1>

        <p className={styles.heroLead}>{heroContent.lead}</p>

        <div className={styles.heroActions}>
          <p className={styles.heroMeta}>{heroContent.meta}</p>

          <a
            className={`button ${styles.heroCta}`}
            href={contacts.telegram}
            target="_blank"
            rel="noopener noreferrer"
          >
            {heroContent.cta}
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
            alt={heroContent.portraitAlt}
          />
        </div>
      </div>
    </section>
  );
}
