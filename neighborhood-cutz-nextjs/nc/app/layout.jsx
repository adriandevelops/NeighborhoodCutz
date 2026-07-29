import { Archivo, Chivo_Mono } from 'next/font/google';
import { shop } from '@/content/shop';
import './globals.css';

/**
 * next/font downloads these at build time and self-hosts them, so there is
 * no render-blocking request to Google and no layout shift. The CSS variables
 * are consumed by styles/tokens.css.
 */
const archivo = Archivo({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-archivo',
  display: 'swap',
});

const chivoMono = Chivo_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-chivo-mono',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(shop.domain),
  title: `${shop.name} | Barbershop on Wilshire Blvd, Los Angeles`,
  description:
    'Neighborhood Cutz is a barbershop at 3959 Wilshire Blvd #A23, Los Angeles. Fades, tapers, beard work and lineups. Walk-ins accepted, or book your barber online.',
  keywords: [
    'barbershop Los Angeles',
    'Koreatown barber',
    'Wilshire Blvd barbershop',
    'skin fade Los Angeles',
    'beard trim LA',
  ],
  openGraph: {
    title: `${shop.name} | Barbershop on Wilshire Blvd`,
    description:
      'Fades, tapers, beard work and lineups on Wilshire. Walk in or book your barber online.',
    url: shop.domain,
    siteName: shop.name,
    type: 'website',
    locale: 'en_US',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
};

export const viewport = {
  themeColor: '#000000',
};

/** Tells Google this is a real local business with real hours. */
function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BarberShop',
    name: shop.name,
    url: shop.domain,
    telephone: '+12132639243',
    address: {
      '@type': 'PostalAddress',
      streetAddress: shop.address.street,
      addressLocality: shop.address.city,
      addressRegion: shop.address.region,
      postalCode: shop.address.postalCode,
      addressCountry: shop.address.country,
    },
    priceRange: '$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: shop.rating.value,
      reviewCount: shop.rating.count,
    },
    openingHoursSpecification: shop.hours
      .filter((entry) => !entry.closed)
      .map((entry) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: entry.day,
        opens: toIsoTime(entry.open),
        closes: toIsoTime(entry.close),
      })),
  };
}

function toIsoTime(value) {
  const h = Math.floor(value);
  const m = Math.round((value - h) * 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${archivo.variable} ${chivoMono.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
        />
      </body>
    </html>
  );
}
