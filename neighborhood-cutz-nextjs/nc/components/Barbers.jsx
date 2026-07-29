'use client';

import { barbers } from '@/content/barbers';
import { shop } from '@/content/shop';
import CropMarks from './CropMarks';
import Slider from './Slider';
import styles from './Barbers.module.css';

const BREAKPOINTS = {
  0: { slidesPerView: 1.3, spaceBetween: 12 },
  768: { slidesPerView: 2.4, spaceBetween: 16 },
  992: { slidesPerView: 3.4, spaceBetween: 20 },
};

export default function Barbers() {
  return (
    <section id="barbers" className="clip-x">
      <div className="container">
        <div className="padding-global padding-section pt-0">
          <div className="section-head">
            <span className="tag">
              <span className="tag-dot" />
              Our barbers
            </span>
            <a
              href={shop.booksyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-arrow"
            >
              <span>See all availability</span> &#8627;
            </a>
          </div>

          <div className="section-intro">
            <h2 className="h-md" data-reveal>
              Pick your barber
            </h2>
            <p className={`body-mono ${styles.intro}`}>
              Every chair books separately. Tap a barber to see their calendar,
              prices and photo work on Booksy.
            </p>
          </div>

          <Slider
            items={barbers}
            breakpoints={BREAKPOINTS}
            renderItem={(barber, index) => (
              <a
                href={barber.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
                data-cursor-text={`Book ${barber.name}`}
              >
                <div className={styles.thumbWrap}>
                  <CropMarks className={styles.crop} />
                  {barber.recommended && (
                    <span className={styles.flag}>Recommended</span>
                  )}
                  <div
                    className={styles.thumb}
                    style={{ backgroundImage: `url('${barber.image}')` }}
                    role="img"
                    aria-label={`${barber.name}, barber at ${shop.name}`}
                  />
                </div>
                <div className={styles.bottom}>
                  <span className="tag-text mute">
                    [{String(index + 1).padStart(2, '0')}]
                  </span>
                  <span className={styles.title}>
                    <span className="tag-text">{barber.name}</span>
                    <span className="tag-text mute">
                      {barber.rating} &middot; {barber.reviews} reviews
                    </span>
                  </span>
                </div>
              </a>
            )}
          />
        </div>
      </div>
    </section>
  );
}
