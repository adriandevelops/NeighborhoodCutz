import { shop } from '@/content/shop';

export const directionsUrl = `https://maps.google.com/?q=${shop.mapQuery}`;
export const mapEmbedUrl = `https://www.google.com/maps?q=${shop.mapQuery}&output=embed`;

/** Adds target/rel only for off-site links, so in-page anchors stay clean. */
export function externalProps(href) {
  return href.startsWith('http')
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};
}
