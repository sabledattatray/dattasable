'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Crosshair from '@/components/Crosshair';
import { motion } from 'framer-motion';
import { UserCog, Target, Fingerprint, GitMerge, FileCheck, Layers, Link as LinkIcon, Download, CheckCircle2, Share2 } from 'lucide-react';
import Link from 'next/link';

export default function ProtocolsPage() {
  const handleDownload = () => {
    alert('Generating Technical Protocol Document... v1.4.2 will be available for download shortly.');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Operator Intent Mapping Protocol | Datta Sable',
        text: 'Review the technical protocol for professional AI intent alignment.',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Protocol URL copied to clipboard!');
    }
  };

  const steps = [
    {
      title: "Persona Extraction",
      code: "IM-01",
      desc: "Identifying the professional identity and technical authority of the operator to align system tone.",
      details: ["Authority Level: Expert", "Language: Technical/Academic", "Goal: Precision Output"]
    },
    {
      title: "Intent Decomposition",
      code: "IM-02",
      desc: "Breaking down unstructured human goals into discrete, actionable logic nodes.",
      details: ["Primary Intent", "Secondary Constraints", "Validation Requirements"]
    },
    {
      title: "Structural Alignment",
      code: "IM-03",
      desc: "Mapping the extracted intent to a specific Execution Chain pattern (EC-01 to EC-04).",
      details: ["Logic Path Selection", "Latency Optimization", "Error Handlers"]
    },
    {
      title: "Fidelity Verification",
      code: "IM-04",
      desc: "Automated audit of the AI output against the original human intent schema.",
      details: ["Hallucination Gate", "Schema Matching", "Intent Drift Audit"]
    }
  ];

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />
      
      <div className="boxed-wrapper pt-32 pb-24">
        <Crosshair position="tl" />
        
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="label-tech text-[var(--accent)]">Protocol Specification v1.4.2</div>
              <div className="flex items-center gap-2 mono text-[10px] opacity-40">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> STABLE_RELEASE
              </div>
            </div>
            
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: "'Syne', sans-serif", fontWeight: 600, marginBottom: '2rem', lineHeight: 1.1 }}>
              Operator Intent <span style={{ color: 'var(--accent)' }}>Mapping™.</span>
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: '1.2rem', marginBottom: '5rem', lineHeight: 1.6 }}>
              The definitive protocol for aligning Large Language Model execution with professional 
              human persona and authority. This framework eliminates the "Intent Gap" in enterprise AI.
            </p>

            {/* Semantic Links */}
            <div className="flex flex-wrap gap-4 mb-20 p-6 bg-[var(--surface2)] border border-[var(--border)] rounded-sm">
              <span className="mono text-[10px] uppercase opacity-40 w-full mb-2">Related Standards:</span>
              <Link href="/knowledge/taxonomy" className="flex items-center gap-2 text-[11px] mono hover:text-[var(--accent)] transition-colors">
                <LinkIcon size={12} /> EXECUTION_CHAIN_TAXONOMY_V2
              </Link>
              <div className="w-px h-3 bg-[var(--border)]" />
              <Link href="/knowledge/standards" className="flex items-center gap-2 text-[11px] mono hover:text-[var(--accent)] transition-colors">
                <LinkIcon size={12} /> PROMPT_HARDENING_STANDARDS_V1
              </Link>
            </div>

            <div className="space-y-12 mb-32">
              {steps.map((step, i) => (
                <motion.div
                  key={step.code}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative"
                >
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/4">
                      <div className="sticky top-32">
                        <span className="mono text-[10px] text-[var(--accent)] block mb-4">{step.code}</span>
                        <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                        <div className="w-12 h-0.5 bg-[var(--accent)] group-hover:w-full transition-all duration-700" />
                      </div>
                    </div>
                    <div className="flex-1 p-8 bg-[var(--surface1)] border border-[var(--border)] rounded-sm">
                      <p className="text-[var(--muted)] leading-relaxed mb-8">{step.desc}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {step.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle2 size={12} className="text-[var(--accent)]" />
                            <span className="mono text-[10px] opacity-60 uppercase">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
              <div className="p-10 border border-[var(--border)] bg-[var(--bg)] rounded-sm">
                <h2 className="text-2xl font-bold mb-6">Technical Moat Analysis</h2>
                <p className="text-sm text-[var(--muted)] leading-relaxed mb-8">
                  The OIM Protocol creates a "Technical Moat" by encoding your unique professional reasoning 
                  into the system's logic loop. This ensures that AI-generated assets are indistinguishable 
                  from expert-level human output.
                </p>
                <div className="flex gap-4">
                  <button 
                    onClick={handleDownload}
                    className="btn-primary py-3 px-6 flex items-center gap-2"
                  >
                    <Download size={16} /> Download PDF Protocol
                  </button>
                  <button 
                    onClick={handleShare}
                    className="btn-outline py-3 px-6 flex items-center gap-2"
                  >
                    <Share2 size={16} /> Share
                  </button>
                </div>
              </div>
              <div className="p-10 border border-[var(--border)] bg-[var(--surface2)] rounded-sm flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <Fingerprint size={32} className="text-[var(--accent)]" />
                  <div>
                    <h4 className="font-bold">Persona Integrity</h4>
                    <p className="text-[10px] mono uppercase opacity-40">System Security Layer</p>
                  </div>
                </div>
                <p className="text-sm text-[var(--muted)] leading-relaxed italic">
                  "Intent Mapping is the difference between a tool that 'chats' and a tool that 'executes' on your behalf."
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <Crosshair position="br" />
      </div>
      
      <Footer />
    </div>
  );
}
