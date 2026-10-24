import office720 from '../../assets/images/office-720.webp';
import office1200 from '../../assets/images/office-1200.webp';
import office1448 from '../../assets/images/office-1448.webp';

import styles from './Office.module.css';

export default function Office() {
  return (
    <div className={`container ${styles.office}`}>
      <figure>
        <img
          src={office1200}
          srcSet={`${office720} 720w, ${office1200} 1200w, ${office1448} 1448w`}
          sizes="(min-width: 1232px) 1200px, calc(100vw - 32px)"
          width="1448"
          height="1086"
          loading="lazy"
          decoding="async"
          alt="Кабинет для очных встреч: диван, кресло и растения у окна"
        />

        <figcaption>Где я работаю очно</figcaption>
      </figure>
    </div>
  );
}
