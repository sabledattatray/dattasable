import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { TEMPLATES } from '@/data/templates';
import { 
  Library, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Share2, 
  Wand2, 
  Search, 
  Layout 
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Operator Template Packs | Surgical AI Workflow Assets",
  description: "A curated collection of high-fidelity templates for LinkedIn, AI Prompt Engineering, and technical SEO. Boost your creative output with operator-grade blueprints.",
};

const CATEGORY_ICONS: Record<string, any> = {
  'LinkedIn': <Share2 size={18} />,
  'AI Prompts': <Wand2 size={18} />,
  'SEO': <Search size={18} />,
  'Creator': <Layout size={18} />,
};

export default function TemplateHub() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />
      
      <main className="boxed-wrapper" style={{ marginBottom: '80px' }}>
        <section className="section" style={{ paddingTop: 'clamp(6rem, 10vw, 8rem)' }}>
          <div className="container">
            <div style={{ maxWidth: 800, marginBottom: '4rem' }}>
              <div className="flex items-center gap-3 mb-4">
                <div style={{ color: 'var(--accent)', padding: '8px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '6px' }}>
                  <Library size={20} />
                </div>
                <div className="label-tech">KNOWLEDGE-ASSETS-V1.0</div>
              </div>
              <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', lineHeight: 1, marginBottom: '1.5rem' }}>
                Operator <span className="hero-title">Templates</span>
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: '1.1rem', lineHeight: 1.6 }}>
                Expert-grade blueprints engineered for high-performance workflows. Inject these structures directly into your modules to achieve surgical results instantly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {TEMPLATES.map((template) => (
                <Link key={template.id} href={`${template.targetModule}?template=${template.id}`} className="no-underline group">
                  <div className="card h-full flex flex-col p-8 transition-all duration-300 hover:border-[var(--accent)]" style={{ background: 'var(--surface2)' }}>
                    <div className="flex justify-between items-start mb-6">
                      <div style={{ color: 'var(--accent)', opacity: 0.8 }}>
                        {CATEGORY_ICONS[template.category]}
                      </div>
                      <div className="px-2 py-1 text-[9px] mono font-bold border border-[var(--border)] rounded opacity-60">
                        {template.category.toUpperCase()}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold mb-3 text-[var(--text)] group-hover:text-[var(--accent)] transition-all">
                      {template.title}
                    </h3>
                    
                    <p className="text-[var(--muted)] text-xs leading-relaxed mb-8 flex-1">
                      {template.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-[var(--border)]/30">
                      <div className="flex items-center gap-2 text-[var(--accent)] text-[10px] mono font-bold tracking-widest group-hover:gap-4 transition-all">
                        DEPLOY_NODE <ArrowRight size={12} />
                      </div>
                      <Sparkles size={12} className="text-[var(--muted)] opacity-20" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Bottom SEO Callout */}
            <div className="mt-20 p-12 card border-dashed text-center" style={{ background: 'var(--bg)' }}>
              <Zap size={32} className="text-[var(--accent)] mx-auto mb-6 animate-pulse" />
              <h2 className="text-2xl font-bold mb-4">Scalable Content Assets</h2>
              <p className="text-[var(--muted)] max-w-xl mx-auto text-sm leading-relaxed mb-8">
                Each template is a landing page for high-intent search traffic. Our infrastructure turns these assets into habit-forming creator workflows.
              </p>
              <div className="flex justify-center gap-4">
                <div className="label-tech">90+ PAGESPEED</div>
                <div className="label-tech">SEO OPTIMIZED</div>
                <div className="label-tech">AI POWERED</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
