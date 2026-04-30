import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Crosshair from '@/components/Crosshair';
import Hero from '@/components/home/Hero';
import StatsGrid from '@/components/home/StatsGrid';
import ProjectsGrid from '@/components/home/ProjectsGrid';

export default function HomePage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />

      <div className="boxed-wrapper" style={{ position: 'relative', marginBottom: '40px' }}>
        <Crosshair position="tl" />

        {/* ── HERO SECTION (Client Island) ── */}
        <Hero />

        {/* ── DATA METRICS (Client Island) ── */}
        <StatsGrid />

        {/* ── PROJECTS (Client Island) ── */}
        <ProjectsGrid />

        <Crosshair position="br" />
      </div>
      
      <Footer />
    </div>
  );
}
