import { useState } from 'react';

import chevronDown from '../../../../assets/images/chevron-down.svg';
import chevronUp from '../../../../assets/images/chevron-up.svg';
import { useMediaQuery } from '../../../../shared/hooks/useMediaQuery';
import { workTopics } from '../../work.data';

import styles from './WorkTopics.module.css';

export default function WorkTopics() {
  const [expandedTopics, setExpandedTopics] = useState(() => new Set([0]));
  const isDesktop = useMediaQuery('(min-width: 900px)');

  function toggleTopic(index: number) {
    setExpandedTopics((current) => {
      const next = new Set(current);

      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }

      return next;
    });
  }

  return (
    <div className={styles.topics}>
      {workTopics.map((topic, index) => {
        const isExpanded = isDesktop || expandedTopics.has(index);
        const panelId = `work-topic-${index}`;

        return (
          <div className={styles.topic} key={topic.title}>
            <span className={styles.number} aria-hidden="true">
              0{index + 1}
            </span>

            <div className={styles.copy}>
              <h3>
                <button
                  type="button"
                  className={styles.toggle}
                  aria-expanded={isExpanded}
                  aria-controls={panelId}
                  disabled={isDesktop}
                  onClick={() => toggleTopic(index)}
                >
                  {topic.title}

                  <img src={isExpanded ? chevronUp : chevronDown} width="24" height="24" alt="" />
                </button>
              </h3>

              <div
                id={panelId}
                className={styles.panel}
                data-expanded={isExpanded}
                aria-hidden={!isExpanded}
                inert={!isExpanded}
              >
                <div className={styles.panelInner}>
                  <p>{topic.body}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
