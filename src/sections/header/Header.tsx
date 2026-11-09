import { useEffect, useState } from 'react';

import { navigationLinks } from '../../shared/config/navigation.data';

import { headerContent } from './header.data';

import styles from './Header.module.css';

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let previousY = Math.max(0, window.scrollY);
    let directionStart = previousY;
    let previousDirection = 0;

    const onScroll = () => {
      const y = Math.max(0, window.scrollY);
      const direction = Math.sign(y - previousY);

      setScrolled(y > 16);

      if (direction !== 0 && direction !== previousDirection) {
        directionStart = previousY;
        previousDirection = direction;
      }

      if (y <= 80) {
        setHidden(false);
      } else if (Math.abs(y - directionStart) >= 12) {
        setHidden(direction > 0);
      }

      previousY = y;
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={styles.header} data-hidden={hidden} data-scrolled={scrolled}>
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
