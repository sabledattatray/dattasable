'use client';
import React from 'react';
import { Printer, Mail, Phone, MapPin, Globe, ArrowLeft, Target, Briefcase, GraduationCap, Award, Zap, Database, BarChart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ResumePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: '#f8fafc', fontFamily: "'Inter', sans-serif" }}>
      <Navbar />
      
      <main style={{ 
        paddingTop: '180px', 
        paddingBottom: '120px', 
        paddingLeft: '20px', 
        paddingRight: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        
        {/* Pro Action Bar */}
        <div className="no-print" style={{ 
          width: '100%', 
          maxWidth: '1000px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '40px' 
        }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>
            <ArrowLeft size={16} /> RETURN TO PORTFOLIO
          </a>
          
          <button 
            onClick={handlePrint}
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '12px', 
              backgroundColor: '#38bdf8', 
              color: '#0f172a', 
              padding: '14px 32px', 
              borderRadius: '12px', 
              fontWeight: '800', 
              cursor: 'pointer',
              border: 'none',
              fontSize: '0.9rem',
              boxShadow: '0 20px 40px rgba(56,189,248,0.2)',
              transition: 'transform 0.2s'
            }}
          >
            <Printer size={18} />
            GENERATE PROFESSIONAL PDF
          </button>
        </div>

        {/* ── THE PRO RESUME DOCUMENT ── */}
        <div 
          id="resume-document"
          style={{ 
            backgroundColor: 'white', 
            color: '#1e293b', 
            width: '100%', 
            maxWidth: '950px', 
            minHeight: '1100px', 
            display: 'grid',
            gridTemplateColumns: '320px 1fr',
            boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
            borderRadius: '4px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* ── SIDEBAR: HIGH-END CURVED DESIGN ── */}
          <div style={{ 
            backgroundColor: '#1e293b', 
            color: 'white', 
            padding: '60px 35px',
            position: 'relative',
            zIndex: 1
          }}>
            {/* Curved Background Accent */}
            <div style={{
              position: 'absolute',
              top: 0,
              right: '-50px',
              bottom: 0,
              width: '100px',
              backgroundColor: '#1e293b',
              borderRadius: '0 100% 100% 0',
              zIndex: -1
            }} />

            {/* Profile Section */}
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
              <div style={{ 
                width: '160px', 
                height: '160px', 
                borderRadius: '50%', 
                border: '6px solid rgba(56, 189, 248, 0.3)', 
                margin: '0 auto 25px',
                padding: '4px',
                backgroundColor: 'rgba(255,255,255,0.05)'
              }}>
                <img 
                  src="/images/datta.webp" 
                  alt="" 
                  style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                />
              </div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: '800', letterSpacing: '0.1em', color: '#38bdf8', marginBottom: '8px' }}>CONTACT</h2>
              <div style={{ height: '2px', width: '30px', background: '#38bdf8', margin: '0 auto 30px' }} />
              
              <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(56,189,248,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Phone size={14} color="#38bdf8" />
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>+91 8010803756</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(56,189,248,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Mail size={14} color="#38bdf8" />
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>sabledattatray@gmail.com</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(56,189,248,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MapPin size={14} color="#38bdf8" />
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: '600', lineHeight: '1.4' }}>Badlapur, Maharashtra, India</span>
                </div>
              </div>
            </div>

            {/* Expertise Section */}
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: '800', letterSpacing: '0.1em', color: '#38bdf8', marginBottom: '8px' }}>EXPERTISE</h2>
              <div style={{ height: '2px', width: '30px', background: '#38bdf8', marginBottom: '30px' }} />
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {['Advanced Excel', 'Data Analysis', 'MS-OFFICE', 'SQL Server', 'Power BI', 'SAP MIS', 'Risk Analysis', 'Automation'].map(skill => (
                  <span key={skill} style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: '700', 
                    padding: '6px 12px', 
                    backgroundColor: 'rgba(255,255,255,0.05)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '4px'
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '100px', fontSize: '0.7rem', opacity: 0.4, textAlign: 'center', letterSpacing: '0.1em' }}>
              RESUME_ID: DS-2025-BI
            </div>
          </div>

          {/* ── MAIN CONTENT: PROFESSIONAL GRID ── */}
          <div style={{ padding: '70px 60px 70px 80px', backgroundColor: 'white' }}>
            <header style={{ marginBottom: '50px' }}>
              <h1 style={{ fontSize: '48px', fontWeight: '900', color: '#0f172a', margin: 0, letterSpacing: '-0.04em' }}>
                Dattatray Sable
              </h1>
              <p style={{ fontSize: '20px', color: '#38bdf8', fontWeight: '700', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                MIS & Business Intelligence Lead
              </p>
            </header>

            {/* Section: Professional Summary */}
            <section style={{ marginBottom: '50px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#0f172a' }} />
                <h2 style={{ fontSize: '1.1rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Professional Summary</h2>
              </div>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.8', color: '#475569', fontWeight: '400' }}>
                Dynamic and results-oriented professional with over <span style={{ color: '#0f172a', fontWeight: '700' }}>10 years of strategic experience</span> in BFSI, collections analytics, and risk portfolio management. Specialist in transforming complex raw data into surgical insights through <b>Power BI, SQL, and Advanced Excel Automation</b>.
              </p>
            </section>

            {/* Section: Professional Experience */}
            <section style={{ marginBottom: '50px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#0f172a' }} />
                <h2 style={{ fontSize: '1.1rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Professional Experience</h2>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-26px', top: '10px', bottom: '10px', width: '2px', background: '#f1f5f9' }} />

                <ExperienceBlock 
                  title="MIS Manager"
                  company="DBS Mintek Pvt. Ltd."
                  period="June 2025 – Present"
                  points={[
                    "Orchestrating migration of legacy reporting to high-performance automated architectures.",
                    "Developed end-to-end automation workflows reducing manual effort by 40%.",
                    "Implemented real-time monitoring suites for executive decision support."
                  ]}
                />

                <ExperienceBlock 
                  title="Information System Analyst"
                  company="CASCO"
                  period="Oct 2023 – May 2025"
                  points={[
                    "Designed mission-critical analytical reports for cross-functional stakeholders.",
                    "Technical bridge between raw data lakes and business intelligence needs."
                  ]}
                />

                <ExperienceBlock 
                  title="Assistant Manager"
                  company="Kissht Finance Ltd."
                  period="Jan 2020 – Sep 2023"
                  points={[
                    "Managed PAN-India risk portfolio analytics and supervisor performance monitoring.",
                    "Engineered Excel dashboards utilizing Pivot Tables and Power Query."
                  ]}
                />
              </div>
            </section>

            {/* Section: Education */}
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#0f172a' }} />
                <h2 style={{ fontSize: '1.1rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Education</h2>
              </div>
              <div style={{ paddingLeft: '28px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '5px' }}>BSC (Bachelor of Science)</h3>
                <p style={{ color: '#38bdf8', fontWeight: '700', fontSize: '0.85rem' }}>Class of 2005 • Dr. BAMU Aurangabad University</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx global>{`
        @media print {
          body, html {
            background-color: white !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .no-print, nav, footer {
            display: none !important;
            height: 0 !important;
          }
          main {
            padding: 0 !important;
            margin: 0 !important;
          }
          #resume-document {
            box-shadow: none !important;
            border: none !important;
            width: 100% !important;
            max-width: 100% !important;
            border-radius: 0 !important;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
}

function ExperienceBlock({ title, company, period, points }: any) {
  return (
    <div style={{ position: 'relative', paddingLeft: '10px' }}>
      <div style={{ position: 'absolute', left: '-41px', top: '5px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'white', border: '3px solid #38bdf8' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a' }}>{title}</h3>
        <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#64748b', fontFamily: 'monospace' }}>{period}</span>
      </div>
      <p style={{ color: '#38bdf8', fontWeight: '800', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '15px' }}>{company}</p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#475569', fontSize: '0.9rem', lineHeight: '1.6' }}>
        {points.map((p: string, i: number) => (
          <li key={i} style={{ marginBottom: '8px', display: 'flex', gap: '10px' }}>
            <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>•</span>
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}
