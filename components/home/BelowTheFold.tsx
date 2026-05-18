'use client';

import dynamic from 'next/dynamic';

const ProblemHook = dynamic(() => import('@/components/home/ProblemHook'), { 
  ssr: false,
  loading: () => <div className="h-[400px] bg-[var(--surface2)] animate-pulse" />
});

const Solution = dynamic(() => import('@/components/home/Solution'), { 
  ssr: false,
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

const Testimonials = dynamic(() => import('@/components/home/Testimonials'), { 
  ssr: false,
  loading: () => <div className="h-[500px] bg-[var(--surface2)] animate-pulse" />
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

export default function BelowTheFold() {
  return (
    <>
      <ProblemHook />
      <Solution />
      <ArchitectureViz />
      <StatsGrid />
      <HowItWorks />
      <ProjectsGrid />
      <Testimonials />
      <UseCases />
      <ProductValue />
      <LatestInsights />
      <FinalCTA />
      <FAQ />
    </>
  );
}
