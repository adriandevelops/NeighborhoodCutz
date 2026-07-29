'use client';

import { useEffect, useRef } from 'react';
import styles from './Cursor.module.css';

/**
 * Trailing label that follows the pointer and reads whatever
 * data-cursor-text sits on the hovered element.
 *
 * Only runs on devices with a real pointer. Touch devices skip it entirely.
 */
export default function Cursor() {
  const rootRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const root = rootRef.current;
    const label = labelRef.current;
    if (!root || !label) return;

    let targetX = 0, targetY = 0, x = 0, y = 0, frame;

    const onMove = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      const hovered = event.target.closest?.('[data-cursor-text]');
      if (hovered) {
        root.dataset.cursor = 'active';
        label.textContent = hovered.dataset.cursorText || 'View';
      } else {
        root.dataset.cursor = '';
      }
    };

    const loop = () => {
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;
      root.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onMove);
    loop();

    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={styles.cursor} ref={rootRef} aria-hidden="true">
      <div className={styles.bubble}>
        <span ref={labelRef}>View</span>
      </div>
    </div>
  );
}
