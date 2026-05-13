'use client';

import { useParams, useRouter } from 'next/navigation';
import { TEMPLATES } from '@/data/templates';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  ArrowLeft, 
  Zap, 
  ChevronRight, 
  Copy, 
  Check, 
  Sparkles,
  Share2,
  Wand2,
  Search,
  Layout,
  Cpu
} from 'lucide-react';
import Link from 'next/link';
import { useState, Suspense } from 'react';
import OperatorPanel from '@/components/tools/OperatorPanel';

const CATEGORY_ICONS: Record<string, any> = {
  'LinkedIn': <Share2 size={20} />,
  'AI Prompts': <Wand2 size={20} />,
  'SEO': <Search size={20} />,
  'Creator': <Layout size={20} />,
};

function TemplateDetailContent() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const template = TEMPLATES.find(t => t.slug === slug);
  const [copied, setCopied] = useState(false);

  if (!template) return <div className="container py-20 mono text-xs">TEMPLATE_NOT_FOUND</div>;

  const handleDeploy = () => {
    router.push(`${template.targetModule}?template=${template.id}`);
  };

  const handleCopyRaw = () => {
    const raw = typeof template.content === 'string' ? template.content : JSON.stringify(template.content, null, 2);
    navigator.clipboard.writeText(raw);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="boxed-wrapper" style={{ marginBottom: '80px' }}>
      <section className="section" style={{ paddingTop: 'clamp(6rem, 10vw, 8rem)' }}>
        <div className="container">
          <Link 
            href="/templates" 
            className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--accent)] transition-colors mb-12 mono text-xs no-underline"
          >
            <ArrowLeft size={14} /> BACK_TO_TEMPLATE_HUB
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Header & Meta */}
            <div className="lg:col-span-2">
              <div style={{ marginBottom: '4rem' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div style={{ color: 'var(--accent)', padding: '8px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '6px' }}>
                    {CATEGORY_ICONS[template.category]}
                  </div>
                  <div className="label-tech">BLUEPRINT_ID: {template.id.toUpperCase()}</div>
                </div>
                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                  {template.title}
                </h1>
                <p style={{ color: 'var(--muted)', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  {template.description}
                </p>
              </div>

              <div className="card p-8 mb-8" style={{ background: 'var(--surface2)' }}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Cpu size={16} className="text-[var(--accent)]" />
                    <h4 className="mono text-[10px] uppercase tracking-widest text-[var(--text)]">Blueprint_Structure</h4>
                  </div>
                  <button 
                    onClick={handleCopyRaw}
                    className="text-[var(--accent)] hover:opacity-80 transition-all flex items-center gap-2 mono text-[10px]"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />} COPY_RAW_DATA
                  </button>
                </div>
                <pre className="p-6 bg-[var(--bg)] rounded border border-[var(--border)] overflow-x-auto text-xs mono text-[var(--muted)] leading-relaxed min-h-[200px]">
                  {typeof template.content === 'string' ? template.content : JSON.stringify(template.content, null, 2)}
                </pre>
              </div>

              <div className="flex items-center gap-2 text-xs text-[var(--muted)] mono p-4 border border-dashed border-[var(--border)]">
                <Sparkles size={14} className="text-[var(--accent)]" /> 
                System Note: This blueprint is optimized for static generation and high-authority indexing.
              </div>
            </div>

            {/* Actions Sidebar */}
            <div className="lg:col-span-1">
              <div className="card p-8 sticky top-32" style={{ background: 'var(--surface2)' }}>
                <h4 className="mono text-[10px] uppercase tracking-widest text-[var(--muted)] mb-8">Deployment_Node</h4>
                
                <div className="mb-8">
                  <div className="text-[10px] mono text-[var(--muted)] uppercase mb-2">Target_Module</div>
                  <div className="text-sm font-bold text-[var(--text)]">{template.targetModule.replace('/tools/', '').replace('-', ' ').toUpperCase()}</div>
                </div>

                <div className="mb-12">
                  <div className="text-[10px] mono text-[var(--muted)] uppercase mb-2">Category</div>
                  <div className="text-sm font-bold text-[var(--text)]">{template.category.toUpperCase()}</div>
                </div>

                <button 
                  onClick={handleDeploy}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-4"
                >
                  DEPLOY_TO_WORKSPACE <ChevronRight size={14} />
                </button>
                
                <div className="mt-6 p-4 bg-[var(--bg)] border border-[var(--border)] rounded text-[9px] mono text-[var(--muted)] leading-relaxed">
                  DEPLOYMENT_PROCESS: This action will instantly inject the blueprint data into the selected workspace module and initiate the surgical execution sequence.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-20 border-t border-[var(--border)]">
             <OperatorPanel />
          </div>
        </div>
      </section>
    </main>
  );
}

export default function TemplateDetailPage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />
      <Suspense fallback={<div className="container py-20 mono text-xs animate-pulse">SYNCHRONIZING_BLUEPRINT_DATA...</div>}>
        <TemplateDetailContent />
      </Suspense>
      <Footer />
    </div>
  );
}
