import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

import styles from './RevealSection.module.css';

type RevealSectionProps = {
  id: string;
  children: ReactNode;
};

export default function RevealSection({ id, children }: RevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const element = ref.current;

    if (!element || !('IntersectionObserver' in window)) {
      return;
    }

    const followHash = () => {
      if (location.hash === `#${id}`) {
        setVisible(true);
        element.scrollIntoView({ behavior: 'auto' });
      }
    };

    setVisible(element.getBoundingClientRect().top < window.innerHeight);
    followHash();
    window.addEventListener('hashchange', followHash);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', followHash);
    };
  }, [id]);

  return (
    <div id={id} tabIndex={-1} ref={ref} className={visible ? styles.isVisible : undefined}>
      <div className={styles.sectionContent}>{children}</div>
    </div>
  );
}
