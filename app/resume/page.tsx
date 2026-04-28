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
        
        {/* Deep Blur Backdrop */}
        <div className="fixed inset-0 z-[50] backdrop-blur-xl bg-black/60 transition-opacity" />

        {/* Modal Container */}
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-[420px] bg-[#0a0a0a] border border-white/10 rounded-[32px] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)]"
          >
            {/* Top Branding Bar */}
            <div className="h-1 bg-gradient-to-r from-[#c9f31d] via-[#00C9F2] to-[#c9f31d] w-full" />
            
            <div className="p-8 md:p-12">
              <div className="flex flex-col items-center text-center">
                {/* Shield Icon */}
                <div className="mb-8 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <ShieldCheck className="text-[#c9f31d]" size={40} strokeWidth={1} />
                </div>

                <h1 className="text-3xl font-bold tracking-tight mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
                  Identity Verification
                </h1>
                <p className="text-white/40 text-sm leading-relaxed mb-10 max-w-[280px]">
                  Authenticate to unlock Dattatray Sable&apos;s professional credentials and portfolio artifacts.
                </p>

                {/* Login Options - Premium Inline */}
                <div className="grid grid-cols-3 gap-4 w-full">
                  {[
                    { id: 'google', name: 'Google', icon: 'https://www.vectorlogo.zone/logos/google/google-icon.svg' },
                    { id: 'github', name: 'GitHub', icon: 'https://www.vectorlogo.zone/logos/github/github-tile.svg' },
                    { id: 'linkedin', name: 'LinkedIn', icon: 'https://www.vectorlogo.zone/logos/linkedin/linkedin-icon.svg' }
                  ].map((p) => (
                    <button 
                      key={p.id}
                      onClick={() => signIn(p.id)}
                      className="group flex flex-col items-center justify-center gap-3 bg-white text-black py-6 rounded-2xl transition-all hover:bg-[#c9f31d] hover:scale-[1.05] active:scale-[0.95] shadow-xl"
                    >
                      <img src={p.icon} alt={p.id} className="w-6 h-6" />
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100">
                        {p.id}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="mt-10 flex items-center gap-2 text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">
                  <Lock size={12} /> Encrypted Session
                </div>
              </div>
            </div>

            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9f31d]/5 blur-[60px] rounded-full -mr-16 -mt-16" />
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
