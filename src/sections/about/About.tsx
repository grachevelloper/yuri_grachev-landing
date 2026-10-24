import { credentials } from './about.data';

import styles from './About.module.css';

export default function About() {
  return (
    <section className={`container section ${styles.about}`} aria-labelledby="about-title">
      <div className={styles.aboutCopy}>
        <p className="kicker">ОБО МНЕ</p>

        <h2 id="about-title" className="section-title">
          Мне ближе работа, в которой за проблемой постепенно проявляется история живого человека
        </h2>

        <p>
          Я работаю в психоаналитическом подходе. Мне важно не сводить человека к диагнозу, типу
          личности или иной готовой схеме – даже если такая схема выглядит убедительной.
        </p>

        <p>
          Вместо этого мы вместе исследуем, как сложился именно ваш способ чувствовать, выбирать,
          строить отношения и воспринимать себя – и что в нём сегодня помогает вам, а что уже
          перестало подходить.
        </p>

        <p>
          Помимо частной практики, я работаю в Городской службе медиации и примирения
          психологического центра «Магистр».
        </p>
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
