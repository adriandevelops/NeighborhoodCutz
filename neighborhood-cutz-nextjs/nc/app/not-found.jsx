import Link from 'next/link';
import { shop } from '@/content/shop';

export const metadata = { title: 'Page not found | Neighborhood Cutz' };

export default function NotFound() {
  return (
    <main style={{ minHeight: '100svh', display: 'grid', placeItems: 'center', padding: '2em' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5em', textAlign: 'center' }}>
        <h1 className="h-md">That page moved</h1>
        <p className="body-mono" style={{ textAlign: 'center' }}>
          The cut is still on. Head back to the shop.
        </p>
        <div style={{ display: 'flex', gap: '.75em', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn">
            Back home
          </Link>
          <a href={shop.booksyUrl} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
            Book now
          </a>
        </div>
      </div>
    </main>
  );
}
