import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Crosshair from '@/components/Crosshair';
import Hero from '@/components/home/Hero';
import BelowTheFold from '@/components/home/BelowTheFold';

export default function HomePage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />

      <div className="boxed-wrapper" style={{ position: 'relative', marginBottom: '40px' }}>
        <Crosshair position="tl" />

        {/* ── 1. HERO SECTION ── */}
        <Hero />

        {/* ── 2. BELOW THE FOLD COMPONENTS (DEFERRED HYDRATION) ── */}
        <BelowTheFold />

        <Crosshair position="br" />
      </div>
      
      <Footer />
    </div>
  );
}
