import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

import SectionErrorBoundary from '../SectionErrorBoundary/SectionErrorBoundary';

import styles from './DeferredSection.module.css';

type DeferredSectionProps = {
  id: string;
  children: ReactNode;
};

type ContentProps = DeferredSectionProps & {
  onReady: () => void;
};

function Content({ id, children, onReady }: ContentProps) {
  useEffect(() => {
    onReady();

    if (location.hash === `#${id}`) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'auto' });
    }
  }, [id, onReady]);

  return <div className={styles.sectionContent}>{children}</div>;
}

export default function DeferredSection({ id, children }: DeferredSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const markReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const followHash = () => {
      if (location.hash === `#${id}`) {
        setLoaded(true);
        setVisible(true);
      }
    };

    followHash();
    window.addEventListener('hashchange', followHash);

    if (!('IntersectionObserver' in window)) {
      setLoaded(true);
      setVisible(true);

      return () => window.removeEventListener('hashchange', followHash);
    }

    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          loadObserver.disconnect();
        }
      },
      { rootMargin: '400px' },
    );

    const revealObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          revealObserver.disconnect();
        }
      },
      { threshold: 0.05 },
    );

    loadObserver.observe(element);
    revealObserver.observe(element);

    return () => {
      loadObserver.disconnect();
      revealObserver.disconnect();
      window.removeEventListener('hashchange', followHash);
    };
  }, [id]);

  return (
    <div
      id={id}
      ref={ref}
      className={`${styles.deferredSection} ${visible ? styles.isVisible : ''}`}
      data-ready={ready}
    >
      {loaded && (
        <SectionErrorBoundary>
          <Suspense
            fallback={
              <p className="container" role="status">
                Загрузка…
              </p>
            }
          >
            <Content id={id} onReady={markReady}>
              {children}
            </Content>
          </Suspense>
        </SectionErrorBoundary>
      )}
    </div>
  );
}
