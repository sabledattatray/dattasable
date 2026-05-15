import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Crosshair from '@/components/Crosshair';
import dynamic from 'next/dynamic';
import Hero from '@/components/home/Hero';

// Dynamic imports for below-the-fold components (Speed Optimization)
const ProblemHook = dynamic(() => import('@/components/home/ProblemHook'), { 
  loading: () => <div className="h-[400px] bg-[var(--surface2)] animate-pulse" />
});

const Solution = dynamic(() => import('@/components/home/Solution'), { 
  loading: () => <div className="h-[500px] bg-[var(--bg)] animate-pulse" />
});

const ArchitectureViz = dynamic(() => import('@/components/home/ArchitectureViz'), { 
  ssr: false,
  loading: () => <div className="h-[500px] bg-[var(--bg)] animate-pulse" />
});

const StatsGrid = dynamic(() => import('@/components/home/StatsGrid'), { 
  ssr: false,
  loading: () => <div className="h-[400px] bg-[var(--surface2)] animate-pulse" />
});

const HowItWorks = dynamic(() => import('@/components/home/HowItWorks'), { 
  ssr: false,
  loading: () => <div className="h-[400px] bg-[var(--bg)] animate-pulse" />
});

const ProjectsGrid = dynamic(() => import('@/components/home/ProjectsGrid'), { 
  ssr: false,
  loading: () => <div className="h-[600px] bg-[var(--surface2)] animate-pulse" />
});

const UseCases = dynamic(() => import('@/components/home/UseCases'), { 
  ssr: false,
  loading: () => <div className="h-[500px] bg-[var(--surface2)] animate-pulse" />
});

const ProductValue = dynamic(() => import('@/components/home/ProductValue'), { 
  ssr: false,
  loading: () => <div className="h-[400px] bg-[var(--bg)] animate-pulse" />
});

const FAQ = dynamic(() => import('@/components/home/FAQ'), {
  ssr: false,
  loading: () => <div className="h-[400px] bg-[var(--surface2)] animate-pulse" />
});

const LatestInsights = dynamic(() => import('@/components/home/LatestInsights'), {
  ssr: false,
  loading: () => <div className="h-[400px] bg-[var(--surface2)] animate-pulse" />
});

const FinalCTA = dynamic(() => import('@/components/home/FinalCTA'), {
  ssr: false,
  loading: () => <div className="h-[400px] bg-[var(--bg)] animate-pulse" />
});

export default function HomePage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />

      <div className="boxed-wrapper" style={{ position: 'relative', marginBottom: '40px' }}>
        <Crosshair position="tl" />

        {/* ── 1. HERO SECTION ── */}
        <Hero />

        {/* ── 2. PROBLEM HOOK ── */}
        <ProblemHook />

        {/* ── 3. SOLUTION ── */}
        <Solution />

        {/* ── 4. ARCHITECTURE VIZ ── */}
        <ArchitectureViz />

        {/* ── 5. DATA METRICS ── */}
        <StatsGrid />

        {/* ── 5. HOW IT WORKS ── */}
        <HowItWorks />

        {/* ── 6. PROJECTS ── */}
        <ProjectsGrid />

        {/* ── 7. USE CASES ── */}
        <UseCases />

        {/* ── 8. PRODUCT VALUE ── */}
        <ProductValue />

        {/* ── 9. LATEST INSIGHTS ── */}
        <LatestInsights />

        {/* ── 10. FINAL CTA ── */}
        <FinalCTA />

        {/* ── 11. FAQ & SEO ── */}
        <FAQ />

        <Crosshair position="br" />
      </div>
      
      <Footer />
    </div>
  );
}
