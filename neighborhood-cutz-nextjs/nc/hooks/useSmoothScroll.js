'use client';

import { useEffect } from 'react';

/**
 * Wires Lenis smooth scrolling into the GSAP ticker and keeps ScrollTrigger
 * in sync with it. Both libraries are imported dynamically so they never end
 * up in the server bundle.
 *
 * Skipped entirely when the visitor prefers reduced motion.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let lenis;
    let tickerFn;
    let cancelled = false;

    (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({ anchors: true });
      lenis.on('scroll', ScrollTrigger.update);

      tickerFn = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);

      // Expose for the mobile menu, which has to freeze scrolling while open.
      window.__lenis = lenis;
    })();

    return () => {
      cancelled = true;
      if (tickerFn) import('gsap').then(({ gsap }) => gsap.ticker.remove(tickerFn));
      if (lenis) lenis.destroy();
      delete window.__lenis;
    };
  }, []);
}
