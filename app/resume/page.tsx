'use client';
import { useSession, signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Download, Lock, GitBranch, Zap, Users, ArrowRight, ShieldCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ResumePage() {
  const { data: session, status } = useSession();

  const handleDownload = () => {
    window.print();
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-12 h-12 border-2 border-[var(--accent)] rounded-full border-t-transparent"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] print:bg-white selection:bg-[var(--accent)] selection:text-black">
      <div className="print:hidden">
        <Navbar />
      </div>
      {/* Download Button Overlay */}
      <button 
        onClick={handleDownload}
        aria-label="Download Resume as PDF"
        className="fixed bottom-8 right-8 bg-[#2563eb] text-white px-6 py-3 rounded-full font-bold shadow-2xl hover:bg-[#1e40af] transition-all flex items-center gap-2 z-50 group print:hidden"
      >
        <Download size={20} className="group-hover:translate-y-0.5 transition-transform" /> 
        DOWNLOAD_DOSSIER.PDF
      </button>

      {/* Close/Back Button */}
      <button 
        onClick={() => window.history.back()}
        aria-label="Go back to previous page"
        className="fixed top-8 left-8 bg-white/80 backdrop-blur-md border border-black/10 p-3 rounded-full shadow-lg hover:bg-white transition-all z-50 print:hidden"
      >
        <ArrowRight className="rotate-180" size={20} />
      </button>

      <div className="container mx-auto max-w-[1000px] bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)] md:my-10 print:my-0 print:shadow-none min-h-screen flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-[320px] bg-[#1e293b] text-white p-10 flex flex-col">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2 tracking-tight">DATTATRAY SABLE</h1>
            <p className="text-[#94a3b8] uppercase tracking-[0.2em] text-xs font-bold">MIS & Analytics Manager</p>
          </div>

          <div className="mb-10">
            <h3 className="text-[var(--accent)] uppercase tracking-[0.1em] text-sm font-bold border-b border-white/10 pb-2 mb-6">Contact</h3>
            <div className="space-y-4 text-sm text-[#cbd5e1]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[var(--accent)]">
                  <Zap size={16} />
                </div>
                <span>sabledattatray@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[var(--accent)]">
                  <Lock size={16} />
                </div>
                <span>+91 8010803756</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[var(--accent)]">
                  <ShieldCheck size={16} />
                </div>
                <span>Mumbai, India</span>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-[var(--accent)] uppercase tracking-[0.1em] text-sm font-bold border-b border-white/10 pb-2 mb-6">Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {['Power BI', 'SQL Server', 'SAP MIS', 'Adv. Excel', 'Data Automation', 'Risk Analysis'].map(skill => (
                <span key={skill} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider hover:border-[var(--accent)]/30 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-10 border-t border-white/5 text-[10px] text-[#475569] font-mono">
            AUTHENTICATED_ACCESS_UID: {session?.user?.email ? `${session.user.email.slice(0, 8)}...` : 'GUEST_VIEW'}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-10 md:p-16 bg-white">
          <section className="mb-12">
            <h2 className="text-xl font-bold text-[#1e40af] mb-6 flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[#2563eb]"></span> PROFESSIONAL SUMMARY
            </h2>
            <p className="text-[#475569] leading-relaxed text-[15px] text-justify">
              Results-driven MIS & Business Intelligence professional with 10+ years of experience in BFSI, collections analytics, and risk portfolio management. Highly skilled in Advanced Excel, SQL Server, Power BI, SAP MIS reporting, and data automation. Proven ability to convert large datasets into actionable dashboards and management insights, improve resolution efficiency, and support strategic decision-making with a strong understanding of business operations.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-bold text-[#1e40af] mb-10 flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[#2563eb]"></span> EXPERIENCE
            </h2>
            
            <div className="space-y-10">
              <ExperienceItem 
                role="MIS Manager" 
                company="DBS Mintek Pvt. Ltd." 
                period="June 2025 – Present"
                highlights={[
                  "Automated MIS processes using Power Query, reducing manual effort by 40%",
                  "Analyzed large-volume data using SSMS 2021 to identify trends and high-risk accounts",
                  "Designed resolution and aging dashboards using Power BI and SAP"
                ]}
              />
              <ExperienceItem 
                role="Information System Analyst" 
                company="CASCO" 
                period="Oct 2023 – May 2025"
                highlights={[
                  "Developed analytical reports using SQL, Excel, and BI tools",
                  "Optimized data accuracy and reporting efficiency with cross-functional teams"
                ]}
              />
              <ExperienceItem 
                role="Assistant Manager – MIS & Analytics" 
                company="Kissht Finance Ltd." 
                period="Jan 2020 – Sep 2023"
                highlights={[
                  "Managed PAN-India portfolios with structured MIS oversight",
                  "Supervised 60–70 tele-callers and team leaders using performance analytics"
                ]}
              />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1e40af] mb-6 flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[#2563eb]"></span> EDUCATION
            </h2>
            <div className="bg-[#f8fafc] p-6 rounded-xl border border-[#e2e8f0]">
              <p className="font-bold text-[#0f172a]">BSC - 2005</p>
              <p className="text-[#64748b] text-sm">Dr. BAMU Aurangabad University</p>
            </div>
          </section>
        </main>
      </div>

      <style jsx global>{`
        @media print {
          .btn-primary, button, nav, footer { display: none !important; }
          body { background: white !important; margin: 0 !important; padding: 0 !important; }
          .container { width: 100% !important; max-width: 100% !important; margin: 0 !important; box-shadow: none !important; }
        }
      `}</style>
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}

function ExperienceItem({ role, company, period, highlights }: any) {
  return (
    <div className="relative pl-8 border-l-2 border-[#e2e8f0] group">
      <div className="absolute -left-[9px] top-0 w-4 h-4 bg-white border-2 border-[#2563eb] rounded-full group-hover:bg-[#2563eb] transition-colors" />
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-bold text-[#0f172a] text-lg">{role}</h4>
          <p className="text-[#2563eb] font-semibold text-sm">{company}</p>
        </div>
        <span className="text-[11px] font-bold text-[#64748b] bg-[#f1f5f9] px-3 py-1 rounded-full uppercase tracking-wider">{period}</span>
      </div>
      <ul className="space-y-2">
        {highlights.map((h: string, i: number) => (
          <li key={i} className="text-[#475569] text-[13px] flex gap-2">
            <span className="text-[#2563eb]">•</span> {h}
          </li>
        ))}
      </ul>
    </div>
  );
}
