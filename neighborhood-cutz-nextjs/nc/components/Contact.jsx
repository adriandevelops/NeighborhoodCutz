'use client';

import { shop } from '@/content/shop';
import { directionsUrl, mapEmbedUrl } from '@/lib/links';
import { formatHour } from '@/lib/hours';
import { useShopStatus } from '@/hooks/useShopStatus';
import CropMarks from './CropMarks';
import styles from './Contact.module.css';

export default function Contact() {
  const status = useShopStatus();

  return (
    <section id="contact">
      <div className="container">
        <div className="padding-global padding-section pt-0">
          <div className="grid-global">
            <div className={styles.head}>
              <span className="tag">
                <span className="tag-dot" />
                Visit the shop
              </span>
              <h2 className="h-md" data-reveal>
                Find us on Wilshire
              </h2>

              <div className={styles.block}>
                <span className={`tag-text ${styles.label}`}>Address</span>
                <a
                  className={styles.big}
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-text="Get directions"
                >
                  {shop.address.line1}
                  <br />
                  {shop.address.line2}
                </a>
                <span className="tag-text mute">{shop.address.building}</span>
              </div>

              <div className={styles.block}>
                <span className={`tag-text ${styles.label}`}>Phone</span>
                <a className={styles.big} href={shop.phone.href} data-cursor-text="Call the shop">
                  {shop.phone.display}
                </a>
              </div>

              <div className={styles.block}>
                <span className={`tag-text ${styles.label}`}>Hours</span>
                <div className={styles.hours}>
                  {shop.hours.map((entry, index) => (
                    <div
                      key={entry.day}
                      className={`${styles.hoursRow} ${
                        status && status.todayIndex === index ? styles.today : ''
                      }`}
                    >
                      <span>{entry.day}</span>
                      <span>
                        {entry.closed
                          ? 'Closed'
                          : `${formatHour(entry.open)} \u2013 ${formatHour(entry.close)}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.block}>
                <span className={`tag-text ${styles.label}`}>Good to know</span>
                <div className={styles.chips}>
                  {shop.highlights.map((item) => (
                    <span className={styles.chip} key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={shop.booksyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-solid"
                data-cursor-text="Book on Booksy"
              >
                Book now
              </a>
            </div>

            <div className={styles.map}>
              <CropMarks />
              <iframe
                title={`Map to ${shop.name}, ${shop.address.line1}`}
                src={mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
