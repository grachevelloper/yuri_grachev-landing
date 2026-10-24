import { articles } from './publications.data';

import styles from './Publications.module.css';

export default function Publications() {
  return (
    <section
      className={`container section ${styles.publications} flow`}
      aria-labelledby="publications-title"
    >
      <p className="kicker">ПУБЛИКАЦИИ</p>

      <h2 id="publications-title" className="section-title">
        Тексты как способ присмотреться к моему стилю мышления
      </h2>

      <div className={styles.articles}>
        {articles.map((article) => (
          <a
            className={`${styles.article} ${article.featured ? styles.articleFeatured : ''}`}
            href={article.href}
            target="_blank"
            rel="noopener noreferrer"
            key={article.href}
          >
            <div>
              <h3>{article.title}</h3>

              <p>{article.excerpt}</p>
            </div>

            <span className={styles.articleLink}>Читать в Telegram →</span>
          </a>
        ))}
      </div>
    </section>
  );
}
