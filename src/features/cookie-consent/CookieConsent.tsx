import { useEffect, useState } from 'react';

import { startMetrika, stopMetrika } from '../../shared/lib/analytics/metrika';
import { readAnalyticsConsent, saveAnalyticsConsent } from './model/consentStorage';
import type { AnalyticsConsent } from './model/consentStorage';

import styles from './CookieConsent.module.css';

type CookieConsentProps = {
  settingsOpen: boolean;
  onClose: () => void;
};

export default function CookieConsent({ settingsOpen, onClose }: CookieConsentProps) {
  const [consent, setConsent] = useState(readAnalyticsConsent);

  useEffect(() => {
    if (consent === 'accepted') {
      startMetrika();
    }
  }, [consent]);

  function chooseConsent(value: AnalyticsConsent) {
    saveAnalyticsConsent(value);
    setConsent(value);

    if (value === 'accepted') {
      startMetrika();
    } else {
      stopMetrika();
    }

    onClose();
  }

  if (consent && !settingsOpen) {
    return null;
  }

  return (
    <aside className={styles.cookieConsent} aria-label="Настройки cookies">
      <p>
        С вашего согласия мы используем Яндекс Метрику для анализа посещаемости.{' '}
        <a className="text-link" href={`${import.meta.env.BASE_URL}privacy.html`}>
          Политика конфиденциальности
        </a>
      </p>

      <div className={styles.actions}>
        <button
          type="button"
          className="button button-secondary"
          onClick={() => chooseConsent('declined')}
        >
          Отклонить
        </button>

        <button type="button" className="button" onClick={() => chooseConsent('accepted')}>
          Согласиться
        </button>
      </div>
    </aside>
  );
}
