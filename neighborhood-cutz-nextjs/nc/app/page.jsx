import About from '@/components/About';
import Barbers from '@/components/Barbers';
import BookBar from '@/components/BookBar';
import Contact from '@/components/Contact';
import Cursor from '@/components/Cursor';
import Footer from '@/components/Footer';
import Gallery from '@/components/Gallery';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import MarkerOverlay from '@/components/MarkerOverlay';
import MobileMenu from '@/components/MobileMenu';
import Nav from '@/components/Nav';
import Services from '@/components/Services';
import SiteEffects from '@/components/SiteEffects';

/**
 * The single page. Section order is the scroll order.
 *
 * .page-content starts hidden and is revealed by Intro.jsx once the load
 * sequence begins, with a 2 second failsafe in case GSAP never loads.
 */
export default function Home() {
  return (
    <>
      <div className="page-content" data-page-content>
        <MarkerOverlay />
        <Nav />
        <MobileMenu />

        <main id="top">
          <Hero />
          <About />
          <Barbers />
          <Services />
          <Gallery />
          <Contact />
        </main>

        <Footer />
        <BookBar />
        <Cursor />
      </div>

      <Intro />
      <SiteEffects />
    </>
  );
}
