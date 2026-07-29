import { shop } from '@/content/shop';
import styles from './BookBar.module.css';

/**
 * Sticky booking bar, phones only. On a small screen the one action that
 * matters is booking, so it stays in reach the whole way down the page.
 */
export default function BookBar() {
  return (
    <a
      className={styles.bar}
      href={shop.booksyUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      Book now on Booksy
    </a>
  );
}
