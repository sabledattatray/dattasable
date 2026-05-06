'use client';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { 
  Mail, MapPin, Phone, Briefcase, Database, School, Send, Printer, ShieldCheck,
  Activity, BarChart3, Bolt, Download
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ResumePage() {
  const { data: session, status } = useSession();

  const handlePrint = () => {
    window.print();
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#101415]">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-12 h-12 border-2 border-[#a4c9ff] rounded-full border-t-transparent"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#101415] text-[#e0e3e5] selection:bg-[#a4c9ff] selection:text-[#00315d]">
      <div className="print:hidden">
        <Navbar />
      </div>

      <div className="relative">
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-0 lg:h-screen w-full lg:w-80 bg-[#191c1e]/60 backdrop-blur-xl border-r border-[#414751]/20 shadow-2xl flex flex-col z-[60] lg:overflow-y-auto print:hidden">
            <div className="px-8 py-10 flex flex-col h-full min-h-screen lg:min-h-0">
              <div className="mb-10 pt-20 lg:pt-24">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#a4c9ff]/20 shadow-lg shadow-[#a4c9ff]/5 shrink-0 bg-[#272a2c]">
                    <img 
                      alt="Dattatray Sable Portrait" 
                      className="w-full h-full object-cover grayscale contrast-125" 
                      src="https://lh3.googleusercontent.com/aida/ADBb0uipmhqazs7Cusgp-TalImOR4OGCg8S78FhzZSy034bTHLRYE7RB-XOHHG50veZOoJLrc6DkVtGrvsiqRSSWViXehktHdSARABi4ssVDCJzpJwpQnlNHmzFIUfYYCxBf1YUJn9GdSzSvRzsdyphDcXb43rqcqGkrh6RyZk7sLLk_y6R4JhF0cdjbeOYDnRtmLL47Rg32Uo9hAEIOXdVawXJrqlnmDf9VFiF4fUhGgkxL-txR1VZZX6fVd5y08b68R9pBUwtegYlI1g"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold tracking-tight text-[#a4c9ff]">Analytics Lead</h2>
                    <p className="text-[#c1c7d3] text-[10px] uppercase tracking-[0.2em] mt-1 font-bold">MIS & Intelligence</p>
                  </div>
                </div>
                <div className="h-px w-full bg-[#414751]/20 mb-6"></div>
                <div className="text-[10px] text-[#8b919d] tracking-[0.2em] uppercase font-bold mb-8">Precision & Insight</div>
                <nav className="space-y-1">
                  <SidebarLink href="#executive-summary" icon={<Activity size={20} />} label="Executive Summary" active />
                  <SidebarLink href="#experience" icon={<Briefcase size={20} />} label="Professional Experience" />
                  <SidebarLink href="#proficiencies" icon={<Database size={20} />} label="Technical Proficiencies" />
                  <SidebarLink href="#education" icon={<School size={20} />} label="Educational Background" />
                  <SidebarLink href="#contact" icon={<Mail size={20} />} label="Direct Contact" />
                </nav>
              </div>

              <div className="mt-auto pt-8 border-t border-[#414751]/10">
                <p className="text-[10px] text-[#8b919d] mb-4 font-bold uppercase tracking-widest">CONNECT</p>
                <div className="space-y-3">
                  <ContactInfo icon={<Mail size={18} />} text="sabledattatray@gmail.com" />
                  <ContactInfo icon={<Phone size={18} />} text="+91 8010803756" />
                  <ContactInfo icon={<MapPin size={18} />} text="Badlapur, Maharashtra" />
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Canvas */}
          <main className="flex-1 min-h-screen relative overflow-x-hidden">
            <div className="absolute inset-0 data-grid-overlay pointer-events-none opacity-20"></div>
            
            {/* Section: Executive Hero */}
            <section className="relative pt-32 lg:pt-48 pb-12 lg:pb-16 px-8 lg:px-16 max-w-6xl mx-auto" id="executive-summary">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 inline-block px-4 py-1.5 bg-[#a4c9ff]/10 border border-[#a4c9ff]/20 rounded-full"
              >
                <span className="text-[#a4c9ff] font-mono text-[11px] uppercase tracking-widest font-bold">Strategic Intelligence</span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl lg:text-7xl font-bold mb-4 text-[#e0e3e5] lg:tracking-tight"
              >
                Dattatray Sable
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl lg:text-3xl text-[#a4c9ff] mb-12 font-medium opacity-90 border-l-4 border-[#a4c9ff]/30 pl-6 py-1"
              >
                MIS & Business Intelligence Lead
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="glass-card p-8 lg:p-12 relative overflow-hidden group shadow-2xl"
              >
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none group-hover:opacity-10 transition-opacity duration-700">
                  <BarChart3 size={180} />
                </div>
                <h3 className="text-xl font-bold mb-6 text-[#a4c9ff] flex items-center uppercase tracking-wider">
                  <span className="w-12 h-px bg-[#a4c9ff] mr-6"></span>
                  Executive Summary
                </h3>
                <p className="text-lg lg:text-xl text-[#c1c7d3] leading-relaxed max-w-4xl font-normal">
                  Dynamic and results-oriented professional with over <span className="text-[#a4c9ff] font-bold">10 years of strategic experience</span> in BFSI, collections analytics, and risk portfolio management. Proven track record in orchestrating complex data ecosystems to drive operational efficiency and high-stakes decision-making. Specialist in transforming raw data into surgical insights that mitigate risk and accelerate organizational growth.
                </p>
              </motion.div>
            </section>

            {/* Section: Core Competencies */}
            <section className="py-12 lg:py-16 px-8 lg:px-16 max-w-6xl mx-auto" id="proficiencies">
              <div className="flex items-center mb-10">
                <div className="shrink-0">
                  <p className="text-xs font-bold text-[#a4c9ff] mb-2 uppercase tracking-widest">Capabilities</p>
                  <h2 className="text-3xl lg:text-4xl font-bold">Technical Proficiencies</h2>
                </div>
                <div className="h-px flex-1 bg-[#414751]/20 ml-12 no-print"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <CompetencyCard 
                  span="md:col-span-8" 
                  icon={<Activity size={40} />} 
                  title="Power BI Dashboarding" 
                  desc="Advanced dashboarding, DAX modeling, and visual storytelling for executive reporting. Specializing in automated ETL processes and real-time visualization of KPIs."
                  border
                />
                <CompetencyCard 
                  span="md:col-span-4" 
                  icon={<Database size={40} />} 
                  title="SQL Server" 
                  desc="Complex query optimization, database management, and relational data architecture for large-scale financial datasets."
                />
                <CompetencyListCard 
                  span="md:col-span-4" 
                  title="Advanced Excel" 
                  items={["Power Query Automation", "Advanced Pivot Tables", "Complex Formula Logic"]}
                />
                <CompetencyCard 
                  span="md:col-span-4" 
                  title="SAP MIS Reporting" 
                  desc="Enterprise-grade reporting and data extraction for cross-functional business units within global architectures."
                />
                <CompetencyCard 
                  span="md:col-span-4" 
                  title="Data Automation" 
                  desc="Eliminating manual redundancy through scripted workflows and systemic integration to drive operational velocity."
                />
              </div>
            </section>

            {/* Section: Professional Experience */}
            <section className="py-12 lg:py-16 px-8 lg:px-16 max-w-6xl mx-auto" id="experience">
              <div className="mb-12">
                <p className="text-xs font-bold text-[#a4c9ff] mb-2 uppercase tracking-widest">Career Progression</p>
                <h2 className="text-3xl lg:text-4xl font-bold">Professional Experience</h2>
              </div>
              <div className="space-y-10">
                <ExperienceItem 
                  period="Jun 2025 - Present"
                  role="MIS Manager"
                  company="DBS Mintek Pvt. Ltd."
                  performance="40% Efficiency Gain"
                  highlights={[
                    "Orchestrating the migration of legacy reporting systems to high-performance automated architectures.",
                    "Developed end-to-end automation workflows that successfully reduced manual effort by 40%."
                  ]}
                  active
                />
                <ExperienceItem 
                  period="Oct 2023 - May 2025"
                  role="Information System Analyst"
                  company="CASCO"
                  highlights={[
                    "Designed and maintained high-fidelity analytical reports to support cross-functional stakeholders.",
                    "Served as a primary technical bridge between raw data lakes and business unit intelligence needs."
                  ]}
                />
                <ExperienceItem 
                  period="Jan 2020 - Sep 2023"
                  role="Assistant Manager"
                  company="Kissht Finance Ltd."
                  highlights={[
                    "Managed PAN-India credit portfolio analytics with a focus on collections performance and risk modeling.",
                    "Led a specialized data team to deliver real-time operational metrics for senior leadership."
                  ]}
                  accent
                />
                <ExperienceItem 
                  period="Aug 2015 - Jan 2020"
                  role="Deputy Manager"
                  company="HDFC Bank Ltd."
                  highlights={[
                    "Strategic oversight of Credit Card Write-off and NPA (Non-Performing Asset) portfolio reporting.",
                    "Engineered systemic auditing processes to ensure data integrity across the retail banking sector."
                  ]}
                />
              </div>
            </section>

            {/* Section: Education & Contact */}
            <section className="py-12 lg:py-16 px-8 lg:px-16 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              <div id="education">
                <div className="mb-8">
                  <p className="text-xs font-bold text-[#a4c9ff] mb-2 uppercase tracking-widest">Foundation</p>
                  <h2 className="text-3xl font-bold">Educational Background</h2>
                </div>
                <div className="glass-card p-8 border-l-4 border-[#a4c9ff] shadow-lg">
                  <h4 className="text-2xl font-bold mb-2 text-[#e0e3e5]">BSC (Bachelor of Science)</h4>
                  <p className="text-[#a4c9ff] text-lg mb-6 font-bold">Class of 2005</p>
                  <div className="flex items-center text-[#c1c7d3] text-base font-medium">
                    <School className="mr-3 text-xl" size={24} />
                    Dr. BAMU Aurangabad University
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-end" id="contact">
                <div className="glass-card p-8 lg:p-10 bg-[#a4c9ff]/5 border border-[#a4c9ff]/20 shadow-2xl relative">
                  <div className="absolute top-6 right-8 text-[#a4c9ff] opacity-20 no-print">
                    <ShieldCheck size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">Secure Business Connection</h3>
                  <p className="text-[#c1c7d3] text-base mb-8 leading-relaxed font-normal">Available for strategic consulting and leadership opportunities within the analytics and MIS ecosystem.</p>
                  <div className="flex flex-wrap gap-4 no-print">
                    <a className="px-6 py-3 bg-[#a4c9ff] text-[#00315d] font-bold hover:bg-[#a4c9ff]/90 transition-all shadow-lg shadow-[#a4c9ff]/10 flex items-center rounded-sm no-underline" href="mailto:sabledattatray@gmail.com">
                      <Send className="mr-2" size={20} />
                      Contact Now
                    </a>
                    <a 
                      href="/Resume_Design/Dattatray_Sable.pdf" 
                      download="Dattatray_Sable_Resume.pdf"
                      className="px-6 py-3 border border-[#8b919d] text-[#e0e3e5] font-bold hover:bg-[#a4c9ff] hover:text-[#00315d] hover:border-[#a4c9ff] transition-all flex items-center rounded-sm no-underline"
                    >
                      <Download className="mr-2" size={20} />
                      Download Resume
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Visual Anchor */}
            <div className="relative h-[300px] lg:h-[400px] w-full overflow-hidden mt-12 no-print">
              <div className="absolute inset-0 bg-gradient-to-t from-[#101415] via-[#101415]/40 to-transparent z-10"></div>
              <img 
                alt="Operational Reach" 
                className="w-full h-full object-cover grayscale opacity-20" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMUVeMjdaoqqEiUjmjKeJvgb-qhqu5wQsxjWyqfvmy2nnXxbwEIU01PReeHgdRKs4LkcLse59EzcCkyu6nZxaUEWirrgi8rBTuRNDSNlXJnzqvKpy8k3pbD96Q6_Mpc4YJAVkzxjieilV2TO7y5z_mSbBXqGW2Uer4A4Ypjh68XQ5hMhyLJgh-1gDlsMFeo4se5WVN7WIAfLuO5eG_JClA3-awfylr0TabIDM2HEXckfVkbfQYI3lJNBvGurB_VT_LEa1jyYib_ThL"
              />
              <div className="absolute bottom-16 left-8 lg:left-16 z-20">
                <p className="text-xs font-bold text-[#a4c9ff] mb-2 tracking-widest uppercase">REGIONAL HUB</p>
                <h4 className="text-4xl lg:text-5xl font-bold lg:tracking-tight">Badlapur / Mumbai Sector</h4>
                <div className="h-1 w-24 bg-[#a4c9ff] mt-6"></div>
              </div>
            </div>

            <footer className="py-12 px-8 lg:px-16 text-center lg:text-left border-t border-[#414751]/10">
              <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-center opacity-60">
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] mb-4 lg:mb-0">
                  © {new Date().getFullYear()} DATTATRAY SABLE • MIS STRATEGY • ALL DATA POINTS VERIFIED
                </p>
                <div className="flex space-x-8">
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em]">Confidential</span>
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em]">Restricted Access</span>
                </div>
              </div>
            </footer>
          </main>
        </div>
      </div>

      <style jsx global>{`
        .glass-card {
          background: rgba(30, 41, 59, 0.4);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .data-grid-overlay {
          background-size: 40px 40px;
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
        }
        @media print {
          .no-print { display: none !important; }
          .print\:hidden { display: none !important; }
          aside { position: relative !important; width: 100% !important; height: auto !important; border-right: none !important; border-bottom: 1px solid #414751 !important; }
          main { margin-left: 0 !important; }
          .glass-card { background: transparent !important; border: 1px solid #414751 !important; break-inside: avoid; }
          section { break-inside: avoid; padding-top: 2rem !important; padding-bottom: 2rem !important; }
          body { background: white !important; color: black !important; }
          .text-[#a4c9ff], .text-[#c1c7d3], .text-[#8b919d] { color: black !important; }
          .bg-[#101415], .bg-[#191c1e] { background: white !important; }
          .data-grid-overlay { display: none; }
          .border-[#a4c9ff] { border-color: black !important; }
          .bg-[#a4c9ff]\/5 { background: #f3f4f6 !important; }
        }
      `}</style>
    </div>
  );
}

function SidebarLink({ href, icon, label, active = false }: { href: string, icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <a 
      href={href}
      className={`flex items-center py-3 px-4 -ml-4 transition-all duration-200 no-underline ${
        active 
          ? 'text-[#a4c9ff] font-bold border-l-2 border-[#a4c9ff] bg-[#a4c9ff]/5' 
          : 'text-[#c1c7d3] font-medium hover:bg-white/5 hover:text-[#a4c9ff]'
      }`}
    >
      <span className="mr-3">{icon}</span>
      <span className="text-xs uppercase tracking-wider">{label}</span>
    </a>
  );
}

function ContactInfo({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <div className="flex items-start space-x-3">
      <span className="text-[#a4c9ff]">{icon}</span>
      <span className="font-mono text-xs break-all text-[#c1c7d3]">{text}</span>
    </div>
  );
}

function CompetencyCard({ span, icon, title, desc, border = false }: { span: string, icon?: React.ReactNode, title: string, desc: string, border?: boolean }) {
  return (
    <div className={`${span} glass-card p-8 group hover:bg-[#272a2c]/40 transition-all duration-500 ${border ? 'border-l-4 border-l-[#a4c9ff]/40' : ''}`}>
      {icon && <div className="text-[#a4c9ff] mb-6 block">{icon}</div>}
      <h4 className="text-2xl font-bold mb-3">{title}</h4>
      <p className="text-[#c1c7d3] text-base leading-relaxed">{desc}</p>
    </div>
  );
}

function CompetencyListCard({ span, title, items }: { span: string, title: string, items: string[] }) {
  return (
    <div className={`${span} glass-card p-6 group hover:bg-[#272a2c]/40 transition-all duration-500`}>
      <h4 className="text-xs font-bold text-[#a4c9ff] mb-4 uppercase tracking-widest">{title}</h4>
      <ul className="space-y-2 text-sm text-[#c1c7d3] font-medium list-none p-0">
        {items.map(item => (
          <li key={item} className="flex items-center m-0">
            <span className="w-1.5 h-1.5 bg-[#a4c9ff]/40 rounded-full mr-3"></span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ExperienceItem({ period, role, company, performance, highlights, active = false, accent = false }: { 
  period: string, role: string, company: string, performance?: string, highlights: (string | React.ReactNode)[], active?: boolean, accent?: boolean 
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <div className="lg:col-span-3 lg:text-right lg:pt-2">
        <span className={`font-mono text-xs px-3 py-1.5 rounded font-bold ${
          active 
            ? 'bg-[#a4c9ff]/10 border border-[#a4c9ff]/20 text-[#a4c9ff]' 
            : 'bg-[#272a2c] border border-[#414751]/20 text-[#c1c7d3]'
        }`}>
          {period}
        </span>
      </div>
      <div className="lg:col-span-9 relative pl-10 lg:pl-12 border-l border-[#414751]/30 pb-2">
        <div className={`absolute -left-1.5 top-3 w-3 h-3 rounded-full ${
          active ? 'bg-[#a4c9ff] shadow-[0_0_8px_rgba(164,201,255,0.6)]' : 'bg-[#414751]'
        }`}></div>
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-[#e0e3e5]">{role}</h3>
          <p className={`${accent || active ? 'text-[#a4c9ff]' : 'text-[#bec6e0]'} font-bold text-lg uppercase tracking-wide`}>{company}</p>
        </div>
        <div className={`glass-card p-6 lg:p-8 ${active ? 'shadow-xl border-l-4 border-l-[#a4c9ff]' : ''} ${accent ? 'border-l-4 border-l-[#a4c9ff]/40' : ''}`}>
          {performance && (
            <div className="flex items-center space-x-3 mb-4">
              <Bolt className="text-[#a4c9ff]" size={20} />
              <span className="text-[10px] uppercase tracking-widest text-[#a4c9ff] font-bold">Performance Milestone: {performance}</span>
            </div>
          )}
          <ul className="space-y-3 text-[#c1c7d3] text-base font-normal list-none p-0">
            {highlights.map((h, i) => (
              <li key={i} className="flex items-start m-0">
                <span className="text-[#a4c9ff] mr-3 font-bold">›</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
