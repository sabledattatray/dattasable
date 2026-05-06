'use client';
import React from 'react';
import { Mail, Phone, MapPin, Download, Send, Briefcase, Database, GraduationCap, Award } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* 
          HARD RESET: Using extreme top padding to ensure 
          it never overlaps with any header/navbar configuration.
      */}
      <div className="pt-[250px] pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-20 border-b border-white/10 pb-12">
            <h1 className="text-6xl font-bold mb-4 tracking-tighter">Dattatray Sable</h1>
            <p className="text-2xl text-[#c9f31d] font-medium tracking-wide opacity-90">
              MIS & Business Intelligence Lead
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
               <a href="/Resume_Design/Dattatray_Sable.pdf" download className="flex items-center gap-2 bg-[#c9f31d] text-black px-8 py-4 rounded-full font-bold hover:bg-white transition-all no-underline">
                 <Download size={20} />
                 DOWNLOAD_DOSSIER.PDF
               </a>
               <a href="mailto:sabledattatray@gmail.com" className="flex items-center gap-2 border border-white/20 px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all no-underline">
                 <Send size={20} />
                 CONTACT_ME
               </a>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {/* Sidebar */}
            <aside className="space-y-12">
              <section>
                <h3 className="text-white/30 uppercase tracking-widest text-xs font-bold mb-6">Connect</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-center gap-3 text-white/60">
                    <Mail size={16} className="text-[#c9f31d]" />
                    <span>sabledattatray@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/60">
                    <Phone size={16} className="text-[#c9f31d]" />
                    <span>+91 8010803756</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/60">
                    <MapPin size={16} className="text-[#c9f31d]" />
                    <span>Mumbai, India</span>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-white/30 uppercase tracking-widest text-xs font-bold mb-6">Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {['Power BI', 'SQL Server', 'SAP MIS', 'Adv. Excel', 'Data Automation', 'Risk Analysis'].map(skill => (
                    <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-bold text-white/70 uppercase">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-white/30 uppercase tracking-widest text-xs font-bold mb-6">Education</h3>
                <div>
                  <h4 className="font-bold">BSC (Computer Science)</h4>
                  <p className="text-xs text-[#c9f31d] mt-1">Class of 2005</p>
                  <p className="text-[11px] text-white/40 mt-1">Dr. BAMU Aurangabad University</p>
                </div>
              </section>
            </aside>

            {/* Main Content */}
            <div className="md:col-span-2 space-y-16">
              <section>
                <h3 className="text-white/30 uppercase tracking-widest text-xs font-bold mb-8 flex items-center gap-4">
                  <span className="w-8 h-px bg-white/10"></span>
                  Summary
                </h3>
                <p className="text-xl text-white/80 leading-relaxed font-medium">
                  Dynamic and results-oriented professional with over <span className="text-[#c9f31d] font-bold">10 years of strategic experience</span> in BFSI, collections analytics, and risk portfolio management.
                </p>
              </section>

              <section>
                <h3 className="text-white/30 uppercase tracking-widest text-xs font-bold mb-8 flex items-center gap-4">
                  <span className="w-8 h-px bg-white/10"></span>
                  Experience
                </h3>
                <div className="space-y-12">
                  <ExperienceBlock 
                    role="MIS Manager" 
                    company="DBS Mintek Pvt. Ltd." 
                    period="2025 – Present"
                    desc="Architected automated MIS frameworks using Power Query, reducing manual effort by 40%."
                  />
                  <ExperienceBlock 
                    role="Information System Analyst" 
                    company="CASCO" 
                    period="2023 – 2025"
                    desc="Designed mission-critical analytical reports and served as technical bridge for data lakes."
                  />
                  <ExperienceBlock 
                    role="Assistant Manager" 
                    company="Kissht Finance Ltd." 
                    period="2020 – 2023"
                    desc="Managed PAN-India credit portfolio analytics with focus on risk performance."
                  />
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function ExperienceBlock({ role, company, period, desc }: any) {
  return (
    <div className="group">
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-xl font-bold">{role}</h4>
        <span className="text-[10px] font-bold bg-white/5 border border-white/10 px-3 py-1 rounded-full uppercase text-[#c9f31d]">
          {period}
        </span>
      </div>
      <p className="text-[#c9f31d] font-bold text-sm uppercase mb-4 opacity-80">{company}</p>
      <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
