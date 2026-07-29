'use client';

import { useEffect, useRef, useState } from 'react';
import { navLinks } from '@/content/nav';
import { shop } from '@/content/shop';
import { directionsUrl } from '@/lib/links';
import styles from './MobileMenu.module.css';

/**
 * Full-screen menu for under 992px. The panel scales in from its top-right
 * corner. Escape closes it, background scroll is frozen while open, and
 * focus returns to the trigger on close.
 */
export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const shadeRef = useRef(null);
  const triggerRef = useRef(null);
  const closeRef = useRef(null);

  // Animate the panel, freeze the page behind it.
  useEffect(() => {
    const panel = panelRef.current;
    const shade = shadeRef.current;
    if (!panel || !shade) return;

    document.body.classList.toggle('is-locked', open);

    const lenis = window.__lenis;
    if (lenis) (open ? lenis.stop() : lenis.start());

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      panel.style.transform = open ? 'scale(1)' : 'scale(0)';
      shade.style.opacity = open ? '1' : '0';
      return;
    }

    let cancelled = false;
    import('gsap').then(({ gsap }) => {
      if (cancelled) return;
      if (open) {
        gsap.to(shade, { opacity: 1, duration: 0.4, ease: 'power2.out' });
        gsap.to(panel, { scale: 1, duration: 0.7, ease: 'power4.inOut' });
        gsap.fromTo(
          panel.querySelectorAll('[data-stagger]'),
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.05, delay: 0.25, ease: 'power3.out' }
        );
      } else {
        gsap.to(shade, { opacity: 0, duration: 0.3, ease: 'power2.in' });
        gsap.to(panel, { scale: 0, duration: 0.5, ease: 'power4.inOut' });
      }
    });

    return () => {
      cancelled = true;
    };
  }, [open]);

  // Escape to close, and close automatically if the viewport grows past the breakpoint.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onResize = () => {
      if (window.matchMedia('(min-width: 992px)').matches) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  useEffect(() => {
    if (!open) triggerRef.current?.focus?.();
  }, [open]);

  return (
    <>
      <button
        className={styles.trigger}
        ref={triggerRef}
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="site-menu"
        data-menu-button
      >
        <span className="tag">
          <span className="tag-dot" />
          Menu
        </span>
      </button>

      <div
        className={`${styles.wrap} ${open ? styles.isOpen : ''}`}
        id="site-menu"
        aria-hidden={!open}
      >
        <div className={styles.shade} ref={shadeRef} onClick={() => setOpen(false)} />

        <div className={styles.panel} ref={panelRef}>
          <div>
            <div className={styles.head}>
              <span className="tag">
                <span className="tag-dot" />
                Menu
              </span>
              <button
                className={styles.close}
                ref={closeRef}
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <svg viewBox="0 0 7 7" fill="none" aria-hidden="true">
                  <path
                    d="M3.14 2.51L5.66 0l.63.63-2.52 2.51 2.52 2.52-.63.63-2.52-2.52L.63 6.29 0 5.66l2.51-2.52L0 .63.63 0l2.51 2.51Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>

            <div className={styles.rule} />

            <nav className={styles.list}>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={styles.link}
                  data-stagger
                  onClick={() => setOpen(false)}
                >
                  <span className={styles.linkDot} />
                  {link.label}
                </a>
              ))}
            </nav>

            <a
              href={shop.booksyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-solid ${styles.cta}`}
              data-stagger
            >
              Book now
            </a>
          </div>

          <div>
            <div className={styles.rule} />
            <div className={styles.social}>
              <a href={shop.phone.href} className="tag-text" data-stagger>
                {shop.phone.display}
              </a>
              <a
                href={shop.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tag-text"
                data-stagger
              >
                Instagram
              </a>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tag-text"
                data-stagger
              >
                Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
