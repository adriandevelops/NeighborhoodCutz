import { about, shop, stats } from '@/content/shop';
import styles from './About.module.css';

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <div className="padding-global padding-section">
          <div className="grid-global">
            <div className={styles.head}>
              <span className="tag">
                <span className="tag-dot" />
                {about.eyebrow}
              </span>
              <h2 className="h-lg" data-reveal>
                {about.heading}
              </h2>
            </div>

            <div className={styles.body}>
              {about.body.map((paragraph) => (
                <p className="body-mono" key={paragraph.slice(0, 32)}>
                  {paragraph}
                </p>
              ))}
              <a
                href={shop.booksyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                data-cursor-text="Book on Booksy"
              >
                Book now &#8627;
              </a>
            </div>

            <div className={styles.stats}>
              {stats.map((stat) => (
                <div className={styles.stat} key={stat.label}>
                  <span className={styles.statNum}>{stat.value}</span>
                  <span className="tag-text mute">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
