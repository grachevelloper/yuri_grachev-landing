import { Fragment } from 'react';

import AddressLink from '../../shared/ui/AddressLink/AddressLink';
import { navigationLinks } from '../../shared/config/navigation.data';
import { contacts } from '../../shared/config/contacts';

import { footerContent } from './footer.data';

import styles from './Footer.module.css';

export default function Footer({ onCookieSettings }: { onCookieSettings?: () => void }) {
  return (
    <footer className={styles.footer}>
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

          <a href={contacts.telegram} target="_blank" rel="noopener noreferrer">
            {footerContent.telegramCta}
          </a>

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
