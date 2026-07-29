'use client';

import { useEffect } from 'react';

/**
 * Fades and lifts any element carrying data-reveal once, when it scrolls
 * into view. Add the attribute in JSX, no per-component wiring needed.
 */
export function useReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let triggers = [];
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      document.querySelectorAll('[data-reveal]').forEach((el) => {
        gsap.set(el, { y: 24, autoAlpha: 0 });
        triggers.push(
          ScrollTrigger.create({
            trigger: el,
            start: 'top 88%',
            once: true,
            onEnter: () =>
              gsap.to(el, { y: 0, autoAlpha: 1, duration: 1, ease: 'power3.out' }),
          })
        );
      });
    })();

    return () => {
      cancelled = true;
      triggers.forEach((t) => t.kill());
    };
  }, []);
}
