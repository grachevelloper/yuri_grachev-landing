import styles from './SectionPlaceholder.module.css';

export default function SectionPlaceholder() {
  return (
    <div className="container section" role="status" aria-label="Загружается раздел">
      <div className={styles.skeleton} aria-hidden="true">
        <span className={styles.kicker} />

        <div className={styles.heading}>
          <span />
          <span />
        </div>

        <div className={styles.copy}>
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}
