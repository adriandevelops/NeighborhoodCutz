import styles from './MarkerOverlay.module.css';

/**
 * Fixed page-edge brackets plus mid-height edge ticks. They sit above
 * everything and invert with mix-blend-mode: difference, so the same
 * markers read correctly over the dark hero and the white body below.
 */
export default function MarkerOverlay() {
  return (
    <div className={styles.overlay} data-marker-overlay aria-hidden="true">
      <i className={styles.tl} />
      <i className={styles.tr} />
      <i className={styles.bl} />
      <i className={styles.br} />
      <i className={styles.ml} />
      <i className={styles.mr} />
    </div>
  );
}
