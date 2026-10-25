import { aboutContent, credentials } from './about.data';

import styles from './About.module.css';

export default function About() {
  return (
    <section className={`container section ${styles.about}`} aria-labelledby="about-title">
      <div className={styles.aboutCopy}>
        <p className="kicker">{aboutContent.kicker}</p>

        <h2 id="about-title" className="section-title">
          {aboutContent.title}
        </h2>

        <p>{aboutContent.approach}</p>

        <p>{aboutContent.collaboration}</p>

        <p>{aboutContent.practice}</p>
      </div>

      <div className={styles.credentials}>
        {credentials.map((item) => (
          <div className={styles.credential} key={item.label}>
            <p className="kicker">{item.label}</p>

            <p>{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
