'use client';

import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { useReveal } from '@/hooks/useReveal';

/**
 * Mounts the page-wide behaviours that have no markup of their own.
 * Kept separate from Intro so the load sequence and the scroll behaviour
 * can be changed independently.
 */
export default function SiteEffects() {
  useSmoothScroll();
  useReveal();
  return null;
}
