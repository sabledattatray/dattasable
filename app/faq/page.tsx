'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    q: "What Business Intelligence tools do you specialize in?",
    a: "I specialize in the full Microsoft BI stack (Power BI, Power Query, DAX, SQL Server) as well as Tableau and Advanced Excel automation."
  },
  {
    q: "Do you handle custom data automation projects?",
    a: "Yes, I build automated pipelines using Python and SQL to eliminate manual data entry and ensure real-time dashboard updates."
  },
  {
    q: "Can you optimize existing slow Power BI reports?",
    a: "Absolutely. I perform DAX optimization, data modeling cleanups, and query tuning to ensure sub-second report performance."
  },
  {
    q: "Do you provide MIS reporting services for Finance and Operations?",
    a: "Yes, I have over 5 years of experience building specialized MIS reports for banking, telecom, and manufacturing sectors."
  }
];

function FAQItem({ q, a }: { q: string, a: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid var(--border)', padding: '1.5rem 0' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <span className="mono" style={{ fontSize: '1.1rem', color: 'var(--text)', fontWeight: 600 }}>{q}</span>
        <ChevronDown size={20} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s', color: 'var(--accent)' }} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        style={{ overflow: 'hidden' }}
      >
        <p style={{ marginTop: '1rem', color: 'var(--muted)', lineHeight: 1.6 }}>{a}</p>
      </motion.div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />
      <div className="container" style={{ paddingTop: '8rem', paddingBottom: '8rem', maxWidth: 800 }}>
        <div className="flex items-center gap-3 mb-4">
          <HelpCircle size={20} style={{ color: 'var(--accent)' }} />
          <span className="label-tech">KNOWLEDGE BASE</span>
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '3rem' }}>Frequently Asked Questions</h1>
        <div style={{ marginTop: '2rem' }}>
          {faqs.map((faq, index) => (
            <FAQItem key={index} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
