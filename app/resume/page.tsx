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
          className="w-12 h-12 border-2 border-[#c9f31d] rounded-full border-t-transparent"
        />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-[#050505] text-white selection:bg-[#c9f31d] selection:text-black">
        <Navbar />
        {/* Full screen centered container */}
        <div className="fixed inset-0 flex items-center justify-center p-6 z-[60]">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-[440px] w-full bg-[#0a0a0a] border border-white/10 p-8 md:p-10 rounded-[32px] shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#c9f31d]/5 blur-[80px] rounded-full" />
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                <Lock className="text-[#c9f31d]" size={28} strokeWidth={1.5} />
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>Access Restricted</h1>
              <p className="text-white/40 text-[13px] mb-8 max-w-[280px] leading-relaxed">
                Connect via secure SSO to unlock Dattatray Sable&apos;s premium resume.
              </p>

              {/* 3 Inline Social Buttons */}
              <div className="grid grid-cols-3 gap-3 w-full">
                {[
                  { id: 'google', name: 'Google' },
                  { id: 'github', name: 'GitHub' },
                  { id: 'linkedin', name: 'LinkedIn' }
                ].map(p => (
                  <button 
                    key={p.id}
                    onClick={() => signIn(p.id)}
                    className="flex flex-col items-center justify-center gap-2 bg-white/[0.02] border border-white/10 p-4 rounded-2xl transition-all hover:bg-white hover:border-white group"
                  >
                    <img 
                      src={`https://authjs.dev/img/providers/${p.id}.svg`} 
                      alt={p.name} 
                      className="w-6 h-6 group-hover:invert transition-all" 
                    />
                    <span className="text-[9px] font-bold tracking-[0.1em] uppercase text-white/30 group-hover:text-black">
                      {p.name}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-center gap-2 text-white/20 text-[9px] font-bold tracking-[0.2em] uppercase">
                <ShieldCheck size={12} className="text-[#c9f31d]/30" /> 
                <span>Secure_Connection</span>
              </div>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] print:bg-white selection:bg-[#c9f31d] selection:text-black">
      {/* Download Button Overlay */}
      <button 
        onClick={handleDownload}
        className="fixed bottom-8 right-8 bg-[#2563eb] text-white px-6 py-3 rounded-full font-bold shadow-2xl hover:bg-[#1e40af] transition-all flex items-center gap-2 z-50 group print:hidden"
      >
        <Download size={20} className="group-hover:translate-y-0.5 transition-transform" /> 
        DOWNLOAD_DOSSIER.PDF
      </button>

      {/* Close/Back Button */}
      <button 
        onClick={() => window.history.back()}
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
            <h3 className="text-[#c9f31d] uppercase tracking-[0.1em] text-sm font-bold border-b border-white/10 pb-2 mb-6">Contact</h3>
            <div className="space-y-4 text-sm text-[#cbd5e1]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#c9f31d]">
                  <Zap size={16} />
                </div>
                <span>sabledattatray@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#c9f31d]">
                  <Lock size={16} />
                </div>
                <span>+91 8010803756</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#c9f31d]">
                  <ShieldCheck size={16} />
                </div>
                <span>Mumbai, India</span>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-[#c9f31d] uppercase tracking-[0.1em] text-sm font-bold border-b border-white/10 pb-2 mb-6">Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {['Power BI', 'SQL Server', 'SAP MIS', 'Adv. Excel', 'Data Automation', 'Risk Analysis'].map(skill => (
                <span key={skill} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider hover:border-[#c9f31d]/30 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-10 border-t border-white/5 text-[10px] text-[#475569] font-mono">
            AUTHENTICATED_ACCESS_UID: {session?.user?.email?.slice(0, 8)}...
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
