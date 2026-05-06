'use client';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { 
  Mail, MapPin, Phone, Briefcase, Database, School, Send, Download, ShieldCheck,
  Activity, BarChart3, Bolt, User, Award, ExternalLink
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ResumePage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <div className="w-12 h-12 border-2 border-[#a4c9ff] rounded-full border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e3e5] selection:bg-[#a4c9ff] selection:text-[#00315d]">
      <Navbar />

      <main className="container mx-auto max-w-6xl px-6 pt-48 pb-20">
        {/* Header Section */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter text-white">
                Dattatray Sable
              </h1>
              <p className="text-2xl md:text-3xl text-[#a4c9ff] font-medium border-l-4 border-[#a4c9ff]/30 pl-6 py-1">
                MIS & Business Intelligence Lead
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-4"
            >
              <a 
                href="/Resume_Design/Dattatray_Sable.pdf" 
                download="Dattatray_Sable_Resume.pdf"
                className="flex items-center gap-2 bg-[#a4c9ff] text-[#00315d] px-6 py-3 rounded-full font-bold hover:bg-white transition-all shadow-lg shadow-[#a4c9ff]/10 no-underline"
              >
                <Download size={20} />
                Download PDF
              </a>
              <a 
                href="mailto:sabledattatray@gmail.com"
                className="flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-3 rounded-full font-bold hover:bg-white/10 transition-all no-underline"
              >
                <Send size={20} />
                Contact
              </a>
            </motion.div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column: Sidebar Info */}
          <aside className="lg:col-span-4 space-y-12">
            {/* Portrait Card */}
            <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <ShieldCheck size={120} />
              </div>
              <div className="w-24 h-24 rounded-2xl overflow-hidden mb-6 border border-[#a4c9ff]/20">
                <img 
                  src="https://lh3.googleusercontent.com/aida/ADBb0uipmhqazs7Cusgp-TalImOR4OGCg8S78FhzZSy034bTHLRYE7RB-XOHHG50veZOoJLrc6DkVtGrvsiqRSSWViXehktHdSARABi4ssVDCJzpJwpQnlNHmzFIUfYYCxBf1YUJn9GdSzSvRzsdyphDcXb43rqcqGkrh6RyZk7sLLk_y6R4JhF0cdjbeOYDnRtmLL47Rg32Uo9hAEIOXdVawXJrqlnmDf9VFiF4fUhGgkxL-txR1VZZX6fVd5y08b68R9pBUwtegYlI1g"
                  alt="Dattatray Sable"
                  className="w-full h-full object-cover grayscale contrast-125"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Connect</h3>
              <div className="space-y-4 text-sm text-white/60">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-[#a4c9ff]" />
                  <span>sabledattatray@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-[#a4c9ff]" />
                  <span>+91 8010803756</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-[#a4c9ff]" />
                  <span>Mumbai, India</span>
                </div>
              </div>
            </div>

            {/* Expertise */}
            <div>
              <h3 className="text-white/30 uppercase tracking-[0.2em] text-[10px] font-bold mb-6">Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {['Power BI', 'SQL Server', 'SAP MIS', 'Adv. Excel', 'Data Automation', 'Risk Analysis'].map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[11px] font-bold text-white/80 uppercase tracking-widest">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-white/30 uppercase tracking-[0.2em] text-[10px] font-bold mb-6">Education</h3>
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <h4 className="font-bold mb-1">BSC (Computer Science)</h4>
                <p className="text-xs text-[#a4c9ff]">Class of 2005</p>
                <p className="text-[11px] text-white/40 mt-2">Dr. BAMU Aurangabad University</p>
              </div>
            </div>
          </aside>

          {/* Right Column: Main Data */}
          <div className="lg:col-span-8 space-y-16">
            {/* Summary */}
            <section>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-4">
                <span className="w-8 h-px bg-[#a4c9ff]"></span>
                Executive Summary
              </h2>
              <p className="text-lg text-white/70 leading-relaxed text-justify font-medium">
                Dynamic and results-oriented professional with over <span className="text-[#a4c9ff] font-bold">10 years of strategic experience</span> in BFSI, collections analytics, and risk portfolio management. Specialized in transforming high-volume raw data into strategic management insights through <span className="text-white">SQL Server, Power BI, and Advanced Data Automation</span>.
              </p>
            </section>

            {/* Experience */}
            <section>
              <h2 className="text-2xl font-bold mb-12 flex items-center gap-4">
                <span className="w-8 h-px bg-[#a4c9ff]"></span>
                Experience
              </h2>
              <div className="space-y-12">
                <ExperienceItem 
                  role="MIS Manager" 
                  company="DBS Mintek Pvt. Ltd." 
                  period="June 2025 – Present"
                  highlights={[
                    "Orchestrating the migration of legacy reporting systems to high-performance automated architectures.",
                    "Developed end-to-end automation workflows that reduced manual effort by 40%."
                  ]}
                  active
                />
                <ExperienceItem 
                  role="Information System Analyst" 
                  company="CASCO" 
                  period="Oct 2023 – May 2025"
                  highlights={[
                    "Designed and maintained mission-critical analytical reports for cross-functional stakeholders.",
                    "Served as technical bridge between raw data lakes and business unit intelligence."
                  ]}
                />
                <ExperienceItem 
                  role="Assistant Manager" 
                  company="Kissht Finance Ltd." 
                  period="Jan 2020 – Sep 2023"
                  highlights={[
                    "Managed PAN-India credit portfolio analytics with focus on risk and recovery performance.",
                    "Led performance analytics for 70+ members, driving a 15% increase in resolution rates."
                  ]}
                />
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx global>{`
        body { background-color: #050505 !important; }
        @media print {
          nav, footer, .no-print { display: none !important; }
          body { background: white !important; color: black !important; }
          .container { max-width: 100% !important; padding: 0 !important; }
          .grid { display: block !important; }
          h1, h2, h3, p, span { color: black !important; }
        }
      `}</style>
    </div>
  );
}

function ExperienceItem({ role, company, period, highlights, active = false }: any) {
  return (
    <div className="relative pl-10 border-l-2 border-white/5 group">
      <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 ${active ? 'bg-[#a4c9ff] border-[#a4c9ff]' : 'bg-[#050505] border-white/20'}`} />
      <div className="mb-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <h4 className="text-xl font-bold text-white">{role}</h4>
          <span className="text-[10px] font-bold text-[#a4c9ff] bg-[#a4c9ff]/10 px-3 py-1 rounded-full uppercase tracking-widest border border-[#a4c9ff]/20">
            {period}
          </span>
        </div>
        <p className="text-[#a4c9ff] font-bold text-sm uppercase tracking-widest mt-1 opacity-80">{company}</p>
      </div>
      <ul className="space-y-3">
        {highlights.map((h: string, i: number) => (
          <li key={i} className="text-white/50 text-[14px] leading-relaxed flex gap-3">
            <span className="text-[#a4c9ff] opacity-50">•</span>
            {h}
          </li>
        ))}
      </ul>
    </div>
  );
}
