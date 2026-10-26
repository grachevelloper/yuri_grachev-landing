import { navigationLinks } from '../../shared/config/navigation.data';

import { headerContent } from './header.data';

import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerInner}`}>
        <a className={styles.brand} href="#main" aria-label={headerContent.homeLabel}>
          {headerContent.brand}
        </a>

        <nav className={styles.headerNav} aria-label={headerContent.navigationLabel}>
          {navigationLinks.map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <a className={`button ${styles.headerCta}`} href="#contact">
          {headerContent.cta}
        </a>
      </div>
    </header>
  );
}
