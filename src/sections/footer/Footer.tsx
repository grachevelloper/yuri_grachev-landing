import { Fragment, useEffect, useRef, useState } from 'react';

import AddressLink from '../../shared/ui/AddressLink/AddressLink';
import { navigationLinks } from '../../shared/config/navigation.data';

import { footerContent } from './footer.data';

import styles from './Footer.module.css';

export default function Footer({ onCookieSettings }: { onCookieSettings?: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const [backgroundReady, setBackgroundReady] = useState(false);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setBackgroundReady(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBackgroundReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px' },
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={ref} className={styles.footer} data-background-ready={backgroundReady}>
      <div className={`container ${styles.footerInner}`}>
        <div className={styles.footerCopy}>
          <p className={styles.footerTitle}>
            {footerContent.titleFirstLine}
            <br />
            {footerContent.titleSecondLine}
          </p>

          <p className={styles.footerTagline}>{footerContent.tagline}</p>
        </div>

        <div className={styles.footerContacts}>
          <p>
            <AddressLink />
          </p>

          <a href="#contact">{footerContent.contactCta}</a>

          <nav aria-label={footerContent.navigationLabel}>
            {navigationLinks.map((link, index) => (
              <Fragment key={link.href}>
                {index > 0 && <span aria-hidden="true"> · </span>}
                <a href={link.href}>{link.label}</a>
              </Fragment>
            ))}
          </nav>

          <p className={styles.footerLegal}>
            {footerContent.copyright}{' '}
            <a href={`${import.meta.env.BASE_URL}privacy.html`}>{footerContent.privacyLink}</a>
          </p>
          {onCookieSettings && (
            <button type="button" className={styles.cookieSettings} onClick={onCookieSettings}>
              {footerContent.cookieSettings}
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}
