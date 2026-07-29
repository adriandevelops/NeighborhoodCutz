'use client';

import { useEffect, useState } from 'react';
import { barbers } from '@/content/barbers';
import { shop } from '@/content/shop';
import { directionsUrl, externalProps } from '@/lib/links';
import CropMarks from './CropMarks';
import styles from './Footer.module.css';

const columns = [
  {
    head: 'visit',
    items: [
      { label: shop.address.line1, href: directionsUrl },
      { label: shop.address.line2, href: directionsUrl },
      { label: 'Get directions', href: directionsUrl },
    ],
  },
  {
    head: 'book',
    items: [
      { label: 'Book on Booksy', href: shop.booksyUrl },
      { label: `Call ${shop.phone.display}`, href: shop.phone.href },
      { label: 'Walk-ins accepted', href: shop.booksyUrl },
    ],
  },
  {
    head: 'barbers',
    items: barbers.map((barber) => ({ label: barber.name, href: barber.url })),
  },
  {
    head: 'follow',
    items: [
      { label: 'Instagram', href: shop.instagramUrl },
      { label: 'Google', href: directionsUrl },
      { label: 'Booksy', href: shop.booksyUrl },
    ],
  },
];

export default function Footer() {
  // Columns are always open on desktop and collapse into accordions
  // under 768px. `openKey` only applies at mobile widths.
  const [openKey, setOpenKey] = useState(null);
  const [year, setYear] = useState('');

  useEffect(() => setYear(String(new Date().getFullYear())), []);

  const toggle = (key) => {
    if (!window.matchMedia('(max-width: 767px)').matches) return;
    setOpenKey((current) => (current === key ? null : key));
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="padding-global">
          <div className={styles.box}>
            <CropMarks />

            <div className={styles.brand}>
              <a href="#top" className={styles.logo}>
                Neighborhood
                <br />
                Cutz
              </a>
              <div className={styles.list}>
                <div className="tag-text">{shop.address.line1}</div>
                <div className="tag-text">{shop.address.line2}</div>
                <div className="tag-text mute">
                  &copy; {year} {shop.name}
                </div>
              </div>
            </div>

            <div className={styles.links}>
              {columns.map((column) => (
                <div
                  className={styles.col}
                  key={column.head}
                  data-accordion-status={openKey === column.head ? 'active' : 'not-active'}
                >
                  <button
                    className={`${styles.colHead} tag-text`}
                    type="button"
                    onClick={() => toggle(column.head)}
                  >
                    [{column.head}]
                    <span className={styles.accIcon} aria-hidden="true">
                      <span className={styles.accH} />
                      <span className={styles.accV} />
                    </span>
                  </button>

                  <div className={styles.body}>
                    <div>
                      <div className={styles.list}>
                        {column.items.map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            className="tag-text"
                            {...externalProps(item.href)}
                          >
                            <span>{item.label}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
