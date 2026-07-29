import { gallery } from '@/content/gallery';
import { shop } from '@/content/shop';
import CropMarks from './CropMarks';
import styles from './Gallery.module.css';

/**
 * An editorial grid rather than another slider, so the work sits still and
 * can be scanned. Tile spans vary to break the uniform-sheet look.
 */
export default function Gallery() {
  return (
    <section id="gallery">
      <div className="container">
        <div className="padding-global padding-section pt-0">
          <div className="section-head">
            <span className="tag">
              <span className="tag-dot" />
              Gallery
            </span>
            <a
              href={shop.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-arrow"
            >
              <span>More on Instagram</span> &#8627;
            </a>
          </div>

          <div className="section-intro">
            <h2 className="h-md" data-reveal>
              Work from the chair
            </h2>
          </div>

          <div className={styles.grid}>
            {gallery.map((item) => (
              <a
                key={item.image}
                href={shop.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.item} ${styles[item.size]}`}
                aria-label={item.alt}
                data-cursor-text="View"
              >
                <CropMarks className={styles.crop} />
                <div
                  className={styles.shot}
                  style={{ backgroundImage: `url('${item.image}')` }}
                  role="img"
                  aria-label={item.alt}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
