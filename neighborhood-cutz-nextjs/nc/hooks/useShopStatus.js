'use client';

import { useEffect, useState } from 'react';
import { getShopStatus } from '@/lib/hours';

/**
 * Open/closed state, refreshed every minute.
 *
 * Returns null on the first render on purpose. The server and the client
 * would otherwise disagree about the time and React would throw a hydration
 * mismatch, so the real value only lands after mount.
 */
export function useShopStatus() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const update = () => setStatus(getShopStatus());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return status;
}
