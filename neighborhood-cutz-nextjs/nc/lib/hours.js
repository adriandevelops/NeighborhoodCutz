import { shop } from '@/content/shop';

const DAY_INDEX = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

/** Formats 9.5 as "9:30 AM". */
export function formatHour(value) {
  const h = Math.floor(value);
  const m = Math.round((value - h) * 60);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, '0')} ${suffix}`;
}

/**
 * Reads the current time in the shop's own time zone rather than the
 * visitor's, so someone browsing from New York still sees LA hours.
 */
export function nowInShopTime(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: shop.timeZone,
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(date);

  const get = (type) => parts.find((p) => p.type === type).value;
  // Intl returns hour 24 for midnight in some engines. Normalise to 0.
  const hour = parseInt(get('hour'), 10) % 24;

  return {
    dayIndex: DAY_INDEX[get('weekday')],
    decimalHour: hour + parseInt(get('minute'), 10) / 60,
  };
}

/**
 * Returns { isOpen, label, detail, todayIndex } for the status pill.
 * Handles closed days by walking forward up to a week.
 */
export function getShopStatus(date = new Date()) {
  const { dayIndex, decimalHour } = nowInShopTime(date);
  const today = shop.hours[dayIndex];

  const isOpen =
    !today.closed && decimalHour >= today.open && decimalHour < today.close;

  if (isOpen) {
    return {
      isOpen: true,
      todayIndex: dayIndex,
      label: 'Open now',
      detail: `Today ${formatHour(today.open)} to ${formatHour(today.close)}`,
    };
  }

  // Opening later today, or the next day that is not closed.
  const opensLaterToday = !today.closed && decimalHour < today.open;
  let targetIndex = dayIndex;

  if (!opensLaterToday) {
    for (let step = 1; step <= 7; step += 1) {
      const candidate = (dayIndex + step) % 7;
      if (!shop.hours[candidate].closed) {
        targetIndex = candidate;
        break;
      }
    }
  }

  const target = shop.hours[targetIndex];
  const when = targetIndex === dayIndex ? 'today' : target.day;

  return {
    isOpen: false,
    todayIndex: dayIndex,
    label: 'Closed',
    detail: `Opens ${formatHour(target.open)} ${when}`,
  };
}
