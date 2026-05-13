import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Book, 
  ChevronRight, 
  Search,
  Zap,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { GLOSSARY_TERMS } from '@/data/glossary';

export const metadata: Metadata = {
  title: "AI Workflow Glossary | Technical AI & Creator Terminology",
  description: "A comprehensive repository of technical terms for AI prompt engineering, content infrastructure, and surgical creator workflows.",
};

export default function GlossaryPage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />
      <main className="boxed-wrapper" style={{ marginBottom: '80px' }}>
        <section className="section" style={{ paddingTop: 'clamp(6rem, 10vw, 8rem)' }}>
          <div className="container">
            <div style={{ maxWidth: 800, marginBottom: '4rem' }}>
              <div className="flex items-center gap-3 mb-4">
                <div style={{ color: 'var(--accent)', padding: '8px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '6px' }}>
                  <Book size={20} />
                </div>
                <div className="label-tech">KNOWLEDGE-INFRASTRUCTURE-V1.0</div>
              </div>
              <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', lineHeight: 1, marginBottom: '1.5rem' }}>
                AI Workflow <span className="hero-title">Glossary</span>
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: '1.1rem', lineHeight: 1.6 }}>
                The technical lexicon for high-performance AI engineering and creator workflows. Master the terminology to dominate the new orchestration economy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {GLOSSARY_TERMS.map((term) => (
                <Link key={term.id} href={`/glossary/${term.slug}`} className="no-underline group">
                  <div className="card h-full flex flex-col p-8 transition-all duration-300 hover:border-[var(--accent)]" style={{ background: 'var(--surface2)' }}>
                    <div className="flex justify-between items-start mb-6">
                      <div className="px-2 py-1 text-[9px] mono font-bold border border-[var(--border)] rounded opacity-60">
                        {term.category.toUpperCase()}
                      </div>
                      <div className="text-[var(--accent)] opacity-20 group-hover:opacity-100 transition-opacity">
                         <Search size={18} />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-[var(--text)] group-hover:text-[var(--accent)] transition-all">
                      {term.term}
                    </h3>
                    
                    <p className="text-[var(--muted)] text-sm leading-relaxed mb-8 flex-1">
                      {term.definition}
                    </p>

                    <div className="flex items-center gap-2 text-[var(--accent)] text-[10px] mono font-bold tracking-widest group-hover:gap-4 transition-all mt-auto pt-6 border-t border-[var(--border)]/30">
                      EXPLORE_TERM <ArrowRight size={12} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Scale Callout */}
            <div className="mt-20 p-12 card border-dashed text-center" style={{ background: 'var(--bg)' }}>
               <h2 className="text-2xl font-bold mb-4">Scaling Topical Authority</h2>
               <p className="text-[var(--muted)] max-w-xl mx-auto text-sm leading-relaxed mb-8">
                 This glossary is part of our **Content Authority Infrastructure**. We are indexing hundreds of technical terms to provide the ultimate knowledge base for modern creators.
               </p>
               <div className="flex justify-center gap-4 flex-wrap">
                  <div className="label-tech">SEO_WEDGE</div>
                  <div className="label-tech">E-E-A-T_SIGNALS</div>
                  <div className="label-tech">CROSS_LINKED_DATA</div>
               </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
