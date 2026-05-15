'use client';
import Link from 'next/link';
import { ArrowRight, Zap, Calculator, BookOpen, Library } from 'lucide-react';
import { motion } from 'framer-motion';

const RELATED_LINKS = [
  {
    title: 'BI ROI Calculator',
    desc: 'Calculate the financial impact of BI automation.',
    icon: <Calculator size={18} />,
    href: '/tools/bi-roi-calculator',
    type: 'TOOL'
  },
  {
    title: 'Surgical RFCs',
    desc: 'Explore technical standards and architecture protocols.',
    icon: <BookOpen size={18} />,
    href: '/knowledge/rfc',
    type: 'KNOWLEDGE'
  },
  {
    title: 'Execution Chains',
    desc: 'Automated multi-node AI orchestration systems.',
    icon: <Zap size={18} />,
    href: '/chains',
    type: 'ELITE'
  },
  {
    title: 'Template Packs',
    desc: 'Scalable blueprints for high-authority workflows.',
    icon: <Library size={18} />,
    href: '/templates',
    type: 'Blueprints'
  }
];

export default function RelatedContent() {
  return (
    <div className="mt-20 border-t border-[var(--border)] pt-16">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
        <h3 className="mono text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--text)]">Related_Assets</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {RELATED_LINKS.map((link, idx) => (
          <Link key={idx} href={link.href} className="no-underline group">
            <motion.div 
              whileHover={{ x: 5 }}
              className="bg-[var(--surface)] border border-[var(--border)] p-6 group-hover:border-[var(--accent)]/50 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                {link.icon}
              </div>
              <div className="flex flex-col gap-2">
                <span className="mono text-[9px] text-[var(--accent)] font-bold tracking-widest">{link.type}</span>
                <h4 className="text-sm font-black uppercase text-[var(--text)]">{link.title}</h4>
                <p className="text-[12px] text-[var(--muted)] leading-relaxed">{link.desc}</p>
                <div className="flex items-center gap-2 mt-4 text-[10px] font-bold uppercase tracking-widest text-[var(--text)] opacity-0 group-hover:opacity-100 transition-opacity">
                  Access Now <ArrowRight size={12} />
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
