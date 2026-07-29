'use client';

import { services } from '@/content/services';
import { shop } from '@/content/shop';
import Slider from './Slider';
import styles from './Services.module.css';

const BREAKPOINTS = {
  0: { slidesPerView: 1.4, spaceBetween: 12 },
  768: { slidesPerView: 3, spaceBetween: 16 },
  992: { slidesPerView: 4.5, spaceBetween: 20 },
};

export default function Services() {
  return (
    <section id="services" className="clip-x">
      <div className="container">
        <div className="padding-global padding-section pt-0">
          <div className="section-head">
            <span className="tag">
              <span className="tag-dot" />
              Services
            </span>
            <a
              href={shop.booksyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-arrow"
            >
              <span>Full menu on Booksy</span> &#8627;
            </a>
          </div>

          <div className="section-intro">
            <h2 className="h-md" data-reveal>
              What we do
            </h2>
            <p className={`body-mono ${styles.intro}`}>
              Prices start where listed and vary slightly by barber. Exact
              pricing shows when you book.
            </p>
          </div>

          <Slider
            items={services}
            breakpoints={BREAKPOINTS}
            renderItem={(service) => (
              <a
                href={shop.booksyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
                data-cursor-text="Book now"
              >
                <div className={styles.thumbWrap}>
                  <div
                    className={styles.thumb}
                    style={{ backgroundImage: `url('${service.image}')` }}
                    role="img"
                    aria-label={service.title}
                  />
                </div>

                <span className={styles.plus} aria-hidden="true">
                  <span className={styles.plusH} />
                  <span className={styles.plusV} />
                </span>

                <span className={styles.info}>
                  <span className={styles.row}>
                    <span className="tag-text">{service.title}</span>
                    <span className="tag-text mute">{service.price}</span>
                  </span>
                  <span className={styles.desc}>
                    <span>
                      <span className={`tag-text mute ${styles.descText}`}>
                        {service.description}
                      </span>
                    </span>
                  </span>
                </span>
              </a>
            )}
          />
        </div>
      </div>
    </section>
  );
}
