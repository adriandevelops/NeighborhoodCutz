import { navLinks } from '@/content/nav';
import { shop } from '@/content/shop';
import styles from './Nav.module.css';

/**
 * Desktop navigation. Fixed, inverted with mix-blend-mode: difference so a
 * single white treatment reads over both the dark hero and the white page.
 * Hidden under 992px, where MobileMenu takes over.
 */
export default function Nav() {
  return (
    <nav className={styles.navbar} data-navbar>
      <div className="container">
        <div className="padding-global">
          <div className={styles.grid}>
            <div className={styles.logoCell}>
              <a href="#top" className={styles.logo}>
                {shop.shortName}
              </a>
            </div>
            <div className={styles.links}>
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className={styles.link}>
                  <span className="tag-dot" />
                  <span className="tag-text">{link.label}</span>
                </a>
              ))}
              <a
                href={shop.booksyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                <span className="tag-dot" />
                <span className="tag-text">Book now</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
