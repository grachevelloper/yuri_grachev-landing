import { contacts } from '../../shared/config/contacts';

import styles from './Footer.module.css';

export default function Footer({ onCookieSettings }: { onCookieSettings?: () => void }) {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerInner}`}>
        <div className={styles.footerCopy}>
          <p className={styles.footerTitle}>
            Психоаналитическая
            <br />
            психотерапия
          </p>

          <p className={styles.footerTagline}>
            Пространство, в котором не нужно становиться проще, чтобы начать лучше себя понимать.
          </p>
        </div>

        <div className={styles.footerContacts}>
          <p>Красный проспект, 82</p>

          <a href={contacts.telegram} target="_blank" rel="noopener noreferrer">
            Telegram для первой связи
          </a>

          <nav aria-label="Навигация в подвале">
            <a href="#work">О работе</a>
            <span aria-hidden="true"> · </span>

            <a href="#about">Обо мне</a>
            <span aria-hidden="true"> · </span>

            <a href="#publications">Публикации</a>
          </nav>

          <p className={styles.footerLegal}>
            © 2026 ·{' '}
            <a href={`${import.meta.env.BASE_URL}privacy.html`}>Политика конфиденциальности</a>
          </p>
          {onCookieSettings && (
            <button type="button" className={styles.cookieSettings} onClick={onCookieSettings}>
              Настройки cookies
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}
