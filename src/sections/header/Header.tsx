import { contacts } from '../../shared/config/contacts';

import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerInner}`}>
        <a className={styles.brand} href="#main" aria-label="Юрий Грачев — в начало">
          Юрий Грачев
        </a>

        <nav className={styles.headerNav} aria-label="Основная навигация">
          <a href="#work">О работе</a>

          <a href="#about">Обо мне</a>

          <a href="#publications">Публикации</a>
        </nav>

        <a
          className={`button ${styles.headerCta}`}
          href={contacts.telegram}
          target="_blank"
          rel="noopener noreferrer"
        >
          Записаться
        </a>
      </div>
    </header>
  );
}
