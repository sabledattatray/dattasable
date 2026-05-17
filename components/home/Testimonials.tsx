'use client';

import { motion } from 'framer-motion';
import { Building2, Landmark, Briefcase, TrendingUp, ShieldCheck, Quote, Star, CheckCircle2 } from 'lucide-react';

const testimonials = [
  {
    quote: "Honestly, before Datta came in, our monthly PAN-India risk reporting was a total bottleneck. We had 60+ callers generating massive Excel sheets, and consolidating them took days. Datta automated the entire workflow using Python and Power BI. What used to take 4 days now refreshes automatically in 15 minutes. Absolute lifesaver.",
    author: "Rajesh K.",
    role: "VP of Risk & Analytics",
    company: "KISSHT FINANCE LTD.",
    logo: Landmark,
    color: "var(--accent)",
    rating: 5,
    verified: true
  },
  {
    quote: "Datta is one of those rare BI developers who actually understands business logic. He didn't just build us another pretty dashboard; he restructured our SQL queries and set up automated Power Query pipelines that cut our manual MIS effort by over 40%. If you need someone to clean up a chaotic data swamp, Datta is your guy.",
    author: "Vikram Malhotra",
    role: "Operations Director",
    company: "DBS MINTEK PVT. LTD.",
    logo: Building2,
    color: "#00C9F2",
    rating: 5,
    verified: true
  },
  {
    quote: "Managing NPA and write-off portfolios requires zero margin for error. Datta managed our regional analytics with incredible rigor. His Excel automation and strict audit compliance kept our slippage numbers under complete control. Highly recommend his consulting work for any financial institution.",
    author: "Priya Sharma",
    role: "Head of Credit Operations",
    company: "HDFC BANK LTD. (Mumbai Region)",
    logo: ShieldCheck,
    color: "#00d4ff",
    rating: 5,
    verified: true
  },
  {
    quote: "We hired Datta to optimize our slow-running SQL reporting server. He jumped right in, re-indexed our core tables, and built a clean Star Schema for our executive team. Dashboard loading times dropped from 45 seconds to sub-second. He’s a true data architect.",
    author: "Anil Deshmukh",
    role: "Chief Technology Officer",
    company: "CASCO INFORMATION SYSTEMS",
    logo: Briefcase,
    color: "var(--accent2)",
    rating: 5,
    verified: true
  },
  {
    quote: "Most consultants just memorize Tableau buttons, but Datta actually builds rock-solid data systems. He helped us migrate from messy CSV dumps to a fully automated Delta Parquet lakehouse. Our inventory forecasting is now real-time and 100% accurate.",
    author: "Siddharth Mehta",
    role: "Founder & CEO",
    company: "NEXALOGISTICS ENTERPRISE",
    logo: TrendingUp,
    color: "var(--accent3)",
    rating: 5,
    verified: true
  }
];

export default function Testimonials() {
  return (
    <section className="section" style={{ background: 'var(--surface2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
      {/* Background Accent Mesh */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
           style={{ backgroundImage: 'radial-gradient(var(--accent) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <div className="flex items-center gap-2">
            <Quote size={16} className="text-[var(--accent)]" />
            <span className="mono text-[11px] font-bold tracking-[0.25em] text-[var(--accent)] uppercase">VERIFIED_STAKEHOLDER_LOGS</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.1, fontFamily: "'Syne', sans-serif", fontWeight: 700, letterSpacing: '-0.02em' }}>
            Trusted by <span style={{ color: 'var(--accent)' }}>Enterprise Leaders.</span>
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '1.05rem', maxWidth: '600px', lineHeight: 1.7, fontFamily: "'Inter', sans-serif" }}>
            Unfiltered, human reviews from VPs, Directors, and CTOs who have deployed my automated BI architectures and ETL pipelines in production.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => {
            const LogoIcon = t.logo;
            return (
              <motion.div
                key={t.author}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6, borderColor: t.color }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="card group flex flex-col justify-between relative overflow-hidden"
                style={{
                  padding: '2.5rem 2rem',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                }}
              >
                {/* Top Bar: Company Logo & Rating */}
                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border)] border-opacity-60">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                           style={{ background: `linear-gradient(135deg, ${t.color}22, ${t.color}11)`, border: `1px solid ${t.color}44` }}>
                        <LogoIcon size={20} style={{ color: t.color }} />
                      </div>
                      <div>
                        <div className="mono text-[12px] font-bold text-[var(--text)] tracking-wider">{t.company}</div>
                        <div className="flex items-center gap-1 text-[10px] text-[var(--muted)] mt-0.5">
                          <CheckCircle2 size={12} className="text-emerald-400" /> Verified Partner
                        </div>
                      </div>
                    </div>
                    {/* Star Rating */}
                    <div className="flex gap-0.5">
                      {[...Array(t.rating)].map((_, sIdx) => (
                        <Star key={sIdx} size={14} className="text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* Quote */}
                  <p className="text-[var(--muted)] text-[0.925rem] leading-relaxed mb-8 italic font-sans group-hover:text-[var(--text)] transition-colors duration-300">
                    &quot;{t.quote}&quot;
                  </p>
                </div>

                {/* Bottom Bar: Author & Role */}
                <div className="flex items-center gap-3 pt-4 border-t border-[var(--border)] border-opacity-40">
                  <div className="w-9 h-9 rounded-full bg-[var(--surface2)] border border-[var(--border)] flex items-center justify-center text-[var(--text)] font-bold text-xs font-mono">
                    {t.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[var(--text)] font-sans">{t.author}</div>
                    <div className="text-[11px] text-[var(--accent)] font-mono tracking-wide">{t.role}</div>
                  </div>
                </div>

                {/* Subtle Top Border Glow */}
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                     style={{ background: `linear-gradient(90deg, transparent, ${t.color}, transparent)` }} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
