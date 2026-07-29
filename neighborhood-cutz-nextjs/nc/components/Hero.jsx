'use client';

import { shop } from '@/content/shop';
import { useShopStatus } from '@/hooks/useShopStatus';
import CropMarks from './CropMarks';
import styles from './Hero.module.css';

/**
 * Full-viewport hero.
 *
 * The video frame, logo and bottom bar all start hidden and are animated in
 * by components/Intro.jsx, which finds them via the data attributes below.
 */
export default function Hero() {
  const status = useShopStatus();

  return (
    <section className={styles.hero} data-hero>
      <div className={styles.bg}>
        <div className={styles.media} data-hero-media>
          <div className={styles.mediaInner} data-hero-media-inner>
            <div className={styles.mediaFill} data-hero-fill>
              {/*
                Background video. To use the shop's own footage, upload to
                Vimeo and change only the ID in this URL.
                For self-hosted video, replace this iframe with:
                  <video src="/video/hero.mp4" muted playsInline loop autoPlay />
              */}
              <iframe
                src="https://player.vimeo.com/video/1104326734?background=1&autoplay=1&loop=1&muted=1&dnt=1"
                title="Background video of the shop"
                allow="autoplay; fullscreen"
                tabIndex={-1}
                aria-hidden="true"
              />
              <div className={styles.scrim} />
            </div>
          </div>
          <CropMarks />
        </div>

        {/* Load counter, bottom centre */}
        <div className={styles.loaderWrap}>
          <div className={styles.loader} data-loader>
            <div className="tag-text" data-loader-text>
              0%
            </div>
            <div className={styles.loaderBar}>
              <div className={styles.loaderBarInner} data-loader-bar />
            </div>
          </div>
        </div>

        <div className={styles.logoWrap} data-hero-logo>
          <h1 className={styles.logo}>
            NEIGHBORHOOD
            <br />
            CUTZ
          </h1>
          <span className={`tag-text ${styles.sub}`}>{shop.tagline}</span>
          <CropMarks className={styles.logoCrop} data-hero-crop />
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <div className="padding-global">
            <div className="grid-global" data-hero-bar>
              <div className={styles.copy}>
                <span className="tag">
                  <span className="tag-dot" />
                  Barbershop on Wilshire
                </span>
                <p className="body-mono">{shop.heroCopy}</p>
              </div>

              <div className={styles.status}>
                <span className={styles.statusLine}>
                  <span
                    className={`${styles.dot} ${
                      status ? (status.isOpen ? styles.dotOpen : styles.dotClosed) : ''
                    }`}
                  />
                  <span>{status ? status.label : 'Checking hours'}</span>
                </span>
                <span className="tag-text">{status ? status.detail : '\u00A0'}</span>
                <a
                  href={shop.booksyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  data-cursor-text="Book on Booksy"
                >
                  Book now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
