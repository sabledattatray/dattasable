'use client';

import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: "What is the ROI of a professional Business Intelligence implementation?",
    answer: "A surgical BI implementation typically results in a 20-30% reduction in operational waste by identifying performance bottlenecks in real-time. By automating manual reporting, organizations save hundreds of engineering hours annually, allowing teams to focus on strategic growth rather than data cleaning."
  },
  {
    question: "How do you handle 10M+ row datasets in Power BI or Tableau?",
    answer: "For high-density datasets, we implement a 'Surgical Data Architecture' using technologies like DuckDB, Snowflake, or optimized Postgres. By using incremental refreshes, efficient indexing, and star-schema modeling, we ensure dashboards load in under 2 seconds even with millions of records."
  },
  {
    question: "Can you automate existing manual Excel reporting workflows?",
    answer: "Yes. Using Python and SQL Automation, we can transform 'Manual Excel Chaos' into automated, high-fidelity dashboards. This ensures 100% data accuracy and delivers live insights to stakeholders without any human intervention."
  },
  {
    question: "What is the 'Surgical' approach to Data Strategy?",
    answer: "My 'Surgical' approach focuses on precision. We don't build charts for the sake of charts. We identify the 3-5 critical KPIs that actually drive your business revenue and build high-performance infrastructure specifically to master those metrics."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section" style={{ borderTop: '1px solid var(--border)', paddingBottom: '6rem' }}>
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3">
            <div className="label-tech mb-4">RESOURCES-&-FAQ</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
              Strategic Intelligence Q&A
            </h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
              Deep-diving into the technical protocols and strategic frameworks used to build elite data ecosystems.
            </p>
          </div>

          <div className="lg:w-2/3 flex flex-col gap-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                style={{ 
                  border: '1px solid var(--border)', 
                  background: openIndex === index ? 'var(--surface2)' : 'transparent',
                  transition: 'all 0.3s ease'
                }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text)', paddingRight: '2rem' }}>
                    {faq.question}
                  </span>
                  {openIndex === index ? <Minus size={20} color="var(--accent)" /> : <Plus size={20} color="var(--muted)" />}
                </button>
                
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="px-6 pb-6"
                    style={{ color: 'var(--muted)', lineHeight: 1.7 }}
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── FAQ Schema (SEO) ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            })
          }}
        />
      </div>
    </section>
  );
}
