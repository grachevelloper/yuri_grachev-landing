import { contacts } from '../../shared/config/contacts';
import WorkTopics from './components/WorkTopics/WorkTopics';

import styles from './Work.module.css';

export default function Work() {
  return (
    <section className="container section flow" aria-labelledby="work-title">
      <p className="kicker">О РАБОТЕ</p>

      <h2 id="work-title" className="section-title">
        Не обязательно заранее понимать, что именно с вами происходит
      </h2>

      <p className={styles.workIntro}>
        Трудности могут касаться отношений с другими, отношения к себе или собственных решений. За
        похожими переживаниями у разных людей стоят совсем разные истории.
      </p>

      <div className={styles.workGrid}>
        <WorkTopics />

        <div className={styles.workApproach}>
          <h3>В терапии не нужно становиться проще, правильнее или удобнее</h3>

          <p>
            Мне важно не подгонять человека под готовое объяснение. Вместо этого мы постепенно
            разбираемся в том, как устроена именно ваша внутренняя логика: почему одни чувства
            оказываются особенно сильными, чего приходится избегать, что помогает сохранять
            устойчивость и что мешает жить так, как хотелось бы.
          </p>

          <aside className={styles.workAccent}>
            <p className="kicker">НЕ ТОЛЬКО О ПРОБЛЕМАХ</p>

            <h3>В терапии есть место не только тому, что беспокоит.</h3>

            <p>
              Иногда разговор о самых обыкновенных вещах в психоаналитическом кабинете обретает
              новые краски и открывает новые грани себя.
            </p>
          </aside>
        </div>
      </div>

      <div className={styles.firstMeeting}>
        <div className={styles.meetingCopy}>
          <p className={styles.meetingLabel}>ПЕРВАЯ ВСТРЕЧА</p>

          <h3 className={styles.meetingTitle}>Ни к чему не обязывает.</h3>

          <p>
            Мы познакомимся, обсудим, что привело вас в терапию, и попробуем понять, может ли такой
            способ работы быть вам полезен. Если решим продолжать, договоримся о регулярности встреч
            и других условиях.
          </p>

          <p className={styles.meetingProcess}>
            Первая встреча <span>→</span> решение о продолжении <span>→</span> регулярная работа
          </p>
        </div>

        <a
          className={`button ${styles.meetingCta}`}
          href={contacts.telegram}
          target="_blank"
          rel="noopener noreferrer"
        >
          Договориться о первой встрече
          <span className={styles.desktopArrow}> →</span>
        </a>
      </div>
    </section>
  );
}
