import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Crosshair from '@/components/Crosshair';
import dynamic from 'next/dynamic';
import Hero from '@/components/home/Hero';

// Dynamic imports for below-the-fold components (Speed Optimization)
const StatsGrid = dynamic(() => import('@/components/home/StatsGrid'), { 
  loading: () => <div className="h-[400px] bg-[var(--surface2)] animate-pulse" />
});

const ProjectsGrid = dynamic(() => import('@/components/home/ProjectsGrid'), { 
  loading: () => <div className="h-[600px] bg-[var(--surface2)] animate-pulse" />
});

const FAQ = dynamic(() => import('@/components/home/FAQ'), {
  loading: () => <div className="h-[400px] bg-[var(--surface2)] animate-pulse" />
});

const LatestInsights = dynamic(() => import('@/components/home/LatestInsights'), {
  loading: () => <div className="h-[400px] bg-[var(--surface2)] animate-pulse" />
});

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

        {/* ── LATEST INSIGHTS (Client Island) ── */}
        <LatestInsights />

        {/* ── FAQ & SEO (Client Island) ── */}
        <FAQ />

        <Crosshair position="br" />
      </div>
      
      <Footer />
    </div>
  );
}
