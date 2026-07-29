'use client';

import { useEffect } from 'react';
import styles from './Intro.module.css';

/**
 * The page-load sequence.
 *
 * A red panel slides away, a counter runs 0 to 100 at the bottom of the
 * screen, and the hero video grows from a 4rem square to full viewport
 * while the logo scales in. The nav, corner markers and hero bar arrive last.
 *
 * The timeline drives elements it does not own, by data attribute:
 *   [data-hero-media]      the growing video frame
 *   [data-hero-media-inner] its padding, which collapses to zero
 *   [data-hero-logo]       the centre logo
 *   [data-hero-bar]        the bottom hero row
 *   [data-hero-crop]       crop marks around the logo
 *   [data-marker-overlay]  the fixed page-edge brackets
 *   [data-navbar], [data-menu-button]
 *
 * If you move any of those, update this file too.
 */
export default function Intro() {
  useEffect(() => {
    const content = document.querySelector('[data-page-content]');
    if (!content) return;

    const show = () => {
      content.style.opacity = '1';
      content.style.visibility = 'visible';
    };

    // If GSAP fails to load for any reason, the page must still appear.
    const failsafe = setTimeout(show, 2000);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const overlay = document.querySelector('[data-transition]');
    const media = document.querySelector('[data-hero-media]');
    const mediaInner = document.querySelector('[data-hero-media-inner]');
    const logo = document.querySelector('[data-hero-logo]');
    const loader = document.querySelector('[data-loader]');
    const loaderText = document.querySelector('[data-loader-text]');
    const loaderBar = document.querySelector('[data-loader-bar]');

    if (reduced) {
      clearTimeout(failsafe);
      show();
      if (overlay) overlay.style.transform = 'translateY(-100%)';
      if (media) Object.assign(media.style, { width: '100vw', height: '100vh', opacity: '1' });
      if (mediaInner) mediaInner.style.padding = '0';
      if (logo) logo.style.transform = 'scale(1)';
      document
        .querySelectorAll('[data-navbar], [data-menu-button], [data-marker-overlay], [data-hero-bar], [data-hero-crop]')
        .forEach((el) => {
          el.style.opacity = '1';
          el.style.transform = 'none';
        });
      return;
    }

    let timeline;
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled) return;

      clearTimeout(failsafe);
      gsap.registerPlugin(ScrollTrigger);
      gsap.set(content, { opacity: 1, visibility: 'visible' });

      const isMobile = window.matchMedia('(max-width: 767px)').matches;

      gsap.to(overlay, { yPercent: -100, duration: 0.8, delay: 0.3, ease: 'power3.inOut' });

      // Counter is animated as a plain object so the number eases too.
      const counter = { value: 0 };
      gsap.to(counter, {
        value: 100,
        duration: 2.1,
        ease: 'power2.inOut',
        delay: 0.4,
        onUpdate() {
          const n = Math.round(counter.value);
          if (loaderText) loaderText.textContent = `${n}%`;
          if (loaderBar) loaderBar.style.width = `${n}%`;
        },
      });

      timeline = gsap
        .timeline({ defaults: { ease: 'power4.inOut' }, delay: 0.4 })
        .to(loader, { autoAlpha: 1, duration: 0.6, ease: 'power2.out' })
        .to(media, { autoAlpha: 1, duration: 0.05 }, '-=0.3')
        .to(media, { width: '4rem', height: '4rem', duration: 0.6, ease: 'power4.out' }, '-=0.3')
        .to({}, { duration: 0.2 })
        .to(media, {
          width: isMobile ? '65vw' : '45vw',
          height: isMobile ? '65vw' : '25vw',
          duration: 0.8,
        })
        .to(logo, { scale: 1, duration: 0.8 }, '<')
        .to({}, { duration: 0.2 })
        .to(media, { width: '100vw', height: '100vh', duration: 0.8 })
        .to(mediaInner, { padding: 0, duration: 0.8 }, '<')
        .to(loader, { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, '<')
        .to('[data-hero-bar]', { y: 0, autoAlpha: 1, duration: 1, ease: 'power4.out' }, '+=0.3')
        .to('[data-navbar], [data-menu-button]', { y: 0, autoAlpha: 1, duration: 1, ease: 'power4.out' }, '<')
        .to('[data-marker-overlay], [data-hero-crop]', { autoAlpha: 1, duration: 0.8, ease: 'power4.out' }, '<');

      // Parallax drift as the hero scrolls away.
      gsap.to('[data-hero-fill]', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: '[data-hero]',
          start: 'bottom bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    })();

    return () => {
      cancelled = true;
      clearTimeout(failsafe);
      timeline?.kill();
    };
  }, []);

  return (
    <>
      <div className={styles.transition} data-transition>
        <span className="tag">
          <span className="tag-dot" />
          Neighborhood Cutz
        </span>
      </div>
    </>
  );
}
