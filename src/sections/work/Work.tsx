import { Fragment } from 'react';

import { contacts } from '../../shared/config/contacts';

import { workContent } from './work.data';
import WorkTopics from './components/WorkTopics/WorkTopics';

import styles from './Work.module.css';

export default function Work() {
  return (
    <section className="container section flow" aria-labelledby="work-title">
      <p className="kicker">{workContent.kicker}</p>

      <h2 id="work-title" className="section-title">
        {workContent.title}
      </h2>

      <p className={styles.workIntro}>{workContent.intro}</p>

      <div className={styles.workGrid}>
        <WorkTopics />

        <div className={styles.workApproach}>
          <h3>{workContent.approachTitle}</h3>

          <p>{workContent.approachBody}</p>

          <aside className={styles.workAccent}>
            <p className="kicker">{workContent.accentKicker}</p>

            <h3>{workContent.accentTitle}</h3>

            <p>{workContent.accentBody}</p>
          </aside>
        </div>
      </div>

      <div className={styles.firstMeeting}>
        <div className={styles.meetingCopy}>
          <p className={styles.meetingLabel}>{workContent.meetingKicker}</p>

          <h3 className={styles.meetingTitle}>{workContent.meetingTitle}</h3>

          <p>{workContent.meetingBody}</p>

          <p className={styles.meetingProcess}>
            {workContent.meetingSteps.map((step, index) => (
              <Fragment key={step}>
                {index > 0 && <span> → </span>}
                {step}
              </Fragment>
            ))}
          </p>
        </div>

        <a
          className={`button ${styles.meetingCta}`}
          href={contacts.telegram}
          target="_blank"
          rel="noopener noreferrer"
        >
          {workContent.meetingCta}
          <span className={styles.desktopArrow}> →</span>
        </a>
      </div>
    </section>
  );
}
