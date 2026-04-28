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
            className="relative w-full max-w-[580px] bg-[#0a0a0a] border border-white/10 rounded-[32px] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)]"
          >
            {/* Top Branding Bar */}
            <div className="h-1 bg-gradient-to-r from-[#c9f31d] via-[#00C9F2] to-[#c9f31d] w-full" />
            
            <div className="p-8 md:p-12 md:px-24 flex flex-col items-center">
              <div className="flex flex-col items-center text-center">
                {/* Shield Icon */}
                <div className="mb-8 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <ShieldCheck className="text-[#c9f31d]" size={42} strokeWidth={1} />
                </div>

                <h1 className="text-3xl font-bold tracking-tight mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
                  Identity Verification
                </h1>
                <p className="text-white/40 text-[10px] leading-relaxed mb-10 max-w-[280px] uppercase tracking-widest font-bold">
                  Secure Access Required
                </p>

                {/* Login Options - High Fidelity Inline Buttons */}
                <div className="grid grid-cols-3 gap-3 w-full max-w-[520px]">
                  {[
                    { 
                      id: 'google', 
                      name: 'Google', 
                      svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/></svg> 
                    },
                    { 
                      id: 'github', 
                      name: 'GitHub', 
                      svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> 
                    },
                    { 
                      id: 'linkedin', 
                      name: 'LinkedIn', 
                      svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#0077b5" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg> 
                    }
                  ].map((p) => (
                    <button 
                      key={p.id}
                      onClick={() => signIn(p.id)}
                      aria-label={`Sign in with ${p.name}`}
                      className="group flex items-center justify-center gap-3 bg-transparent border border-white/10 py-5 px-4 rounded-none transition-all hover:bg-white/[0.05] hover:border-[#c9f31d] active:scale-[0.98] relative overflow-hidden"
                    >
                      <div className="w-4 h-4 relative z-10 shrink-0">
                        {p.svg}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-white/30 group-hover:text-[#c9f31d] z-10 truncate">
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
