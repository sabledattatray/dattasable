import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Book, 
  ChevronRight, 
  Search,
  Zap,
  Cpu,
  Scissors,
  Minimize2,
  Wand2,
  Share2
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "AI Workflow Glossary | Technical AI & Creator Terminology",
  description: "A comprehensive repository of technical terms for AI prompt engineering, content infrastructure, and surgical creator workflows.",
};

const GLOSSARY_TERMS = [
  {
    term: 'Context Window',
    slug: 'context-window',
    definition: 'The total amount of text (tokens) an AI model can process at once. Optimizing this window is critical for cost-efficiency and reasoning depth.',
    relatedTool: '/tools/context-optimizer',
    icon: <Minimize2 size={16} />
  },
  {
    term: 'Prompt Chaining',
    slug: 'prompt-chaining',
    definition: 'The technique of breaking complex tasks into a sequence of smaller, inter-connected AI prompts where the output of one node informs the next.',
    relatedTool: '/chains',
    icon: <Zap size={16} />
  },
  {
    term: 'Semantic Compression',
    slug: 'semantic-compression',
    definition: 'Reducing the token count of a prompt by removing linguistic redundancy while preserving the core logical intent for AI processing.',
    relatedTool: '/tools/context-optimizer',
    icon: <Scissors size={16} />
  },
  {
    term: 'Operator Blueprint',
    slug: 'operator-blueprint',
    definition: 'A pre-configured technical structure (template) designed to be injected into an AI tool to achieve a specific high-authority output.',
    relatedTool: '/templates',
    icon: <Book size={16} />
  },
  {
    term: 'Token Density',
    slug: 'token-density',
    definition: 'The ratio of information to token count. High token density ensures maximum reasoning performance within a model\'s context limits.',
    relatedTool: '/tools/ai-prompt-generator',
    icon: <Cpu size={16} />
  }
];

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {GLOSSARY_TERMS.map((item) => (
                <div key={item.slug} className="card p-8 group transition-all duration-300 hover:border-[var(--accent)]" style={{ background: 'var(--surface2)' }}>
                  <div className="flex items-center gap-3 mb-6">
                    <div style={{ color: 'var(--accent)', opacity: 0.8 }}>
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-all">
                      {item.term}
                    </h3>
                  </div>
                  
                  <p className="text-[var(--muted)] text-sm leading-relaxed mb-8">
                    {item.definition}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-[var(--border)]/30">
                    <Link 
                      href={item.relatedTool}
                      className="flex items-center gap-2 text-[var(--accent)] text-[10px] mono font-bold tracking-widest no-underline hover:gap-4 transition-all"
                    >
                      EXECUTE_RELATED_TOOL <ChevronRight size={12} />
                    </Link>
                    <span className="text-[9px] mono text-[var(--muted)] opacity-40 uppercase">Term_Verified</span>
                  </div>
                </div>
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
