'use client';
import React from 'react';
import { Printer, Mail, Phone, MapPin, ExternalLink, ArrowLeft, Download } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ResumePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', color: 'white' }}>
      <Navbar />
      
      {/* 
          A4 Paper Styled Resume:
          - Centered "Sheet" on a dark background.
          - High-fidelity typography and layout.
          - Print-optimized to remove dark background.
      */}
      <main style={{ 
        paddingTop: '200px', 
        paddingBottom: '150px', 
        paddingLeft: '20px', 
        paddingRight: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        
        {/* Top Control Bar */}
        <div className="no-print" style={{ 
          width: '100%', 
          maxWidth: '850px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '40px' 
        }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '0.9rem' }}>
            <ArrowLeft size={16} /> Back to Portfolio
          </a>
          
          <button 
            onClick={handlePrint}
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '10px', 
              backgroundColor: '#a4c9ff', 
              color: '#00315d', 
              padding: '14px 28px', 
              borderRadius: '8px', 
              fontWeight: 'bold', 
              cursor: 'pointer',
              border: 'none',
              fontSize: '0.95rem',
              boxShadow: '0 10px 30px rgba(164,201,255,0.2)'
            }}
          >
            <Printer size={20} />
            PRINT AS PDF
          </button>
        </div>

        {/* ── THE RESUME "SHEET" ── */}
        <div 
          id="resume-document"
          style={{ 
            backgroundColor: 'white', 
            color: 'black', 
            width: '100%', 
            maxWidth: '850px', 
            minHeight: '1100px', 
            padding: '60px 80px', 
            boxShadow: '0 50px 100px rgba(0,0,0,0.5)',
            borderRadius: '2px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <header style={{ borderBottom: '2px solid #000', paddingBottom: '30px', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '42px', fontWeight: '800', marginBottom: '8px', letterSpacing: '-0.02em', color: '#000' }}>
              Dattatray Sable
            </h1>
            <p style={{ fontSize: '20px', color: '#0060ac', fontWeight: '700', marginBottom: '25px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              MIS & Business Intelligence Lead
            </p>
            
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', color: '#444', fontSize: '13px', fontWeight: '500' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Mail size={12} color="#0060ac" /> sabledattatray@gmail.com
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Phone size={12} color="#0060ac" /> +91 8010803756
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <MapPin size={12} color="#0060ac" /> Mumbai, India
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <ExternalLink size={12} color="#0060ac" /> dattasable.com
              </span>
            </div>
          </header>

          {/* Section: Executive Summary */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: '900', color: '#000', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '15px' }}>
              Executive Summary <div style={{ height: '1px', flex: 1, backgroundColor: '#eee' }}></div>
            </h2>
            <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#333' }}>
              Dynamic and results-oriented professional with over <b>10 years of strategic experience</b> in BFSI, collections analytics, and risk portfolio management. Proven track record in orchestrating complex data ecosystems to drive operational efficiency and high-stakes decision-making. Specialist in transforming raw data into surgical insights through <b>Power BI, SQL Server, and Data Automation</b>.
            </p>
          </section>

          {/* Section: Professional Experience */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: '900', color: '#000', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '15px' }}>
              Professional Experience <div style={{ height: '1px', flex: 1, backgroundColor: '#eee' }}></div>
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {/* Job 1 */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '800' }}>MIS Manager</h3>
                  <span style={{ fontSize: '12px', color: '#0060ac', fontWeight: '700' }}>JUNE 2025 – PRESENT</span>
                </div>
                <p style={{ color: '#666', fontWeight: '700', fontSize: '13px', marginBottom: '12px' }}>DBS MINTEK PVT. LTD.</p>
                <ul style={{ paddingLeft: '18px', margin: 0, color: '#444', fontSize: '14px', lineHeight: '1.5' }}>
                  <li style={{ marginBottom: '6px' }}>Orchestrating migration of legacy reporting systems to automated architectures.</li>
                  <li style={{ marginBottom: '6px' }}>Developed end-to-end automation workflows reducing manual effort by 40%.</li>
                  <li style={{ marginBottom: '6px' }}>Implementing real-time data monitoring suites for executive-level performance tracking.</li>
                </ul>
              </div>

              {/* Job 2 */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '800' }}>Information System Analyst</h3>
                  <span style={{ fontSize: '12px', color: '#666', fontWeight: '700' }}>OCT 2023 – MAY 2025</span>
                </div>
                <p style={{ color: '#666', fontWeight: '700', fontSize: '13px', marginBottom: '12px' }}>CASCO</p>
                <ul style={{ paddingLeft: '18px', margin: 0, color: '#444', fontSize: '14px', lineHeight: '1.5' }}>
                  <li style={{ marginBottom: '6px' }}>Designed and maintained high-fidelity analytical reports for cross-functional stakeholders.</li>
                  <li style={{ marginBottom: '6px' }}>Served as primary technical bridge between raw data lakes and business unit intelligence.</li>
                </ul>
              </div>

              {/* Job 3 */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '800' }}>Assistant Manager</h3>
                  <span style={{ fontSize: '12px', color: '#666', fontWeight: '700' }}>JAN 2020 – SEP 2023</span>
                </div>
                <p style={{ color: '#666', fontWeight: '700', fontSize: '13px', marginBottom: '12px' }}>KISSHT FINANCE LTD.</p>
                <ul style={{ paddingLeft: '18px', margin: 0, color: '#444', fontSize: '14px', lineHeight: '1.5' }}>
                  <li style={{ marginBottom: '6px' }}>Managed PAN-India credit portfolio analytics with focus on collections performance.</li>
                  <li style={{ marginBottom: '6px' }}>Led specialized data teams to deliver real-time operational metrics for senior leadership.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section: Technical Proficiencies */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: '900', color: '#000', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
              Technical Arsenal <div style={{ height: '1px', flex: 1, backgroundColor: '#eee' }}></div>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
              <div style={{ fontSize: '14px', color: '#444' }}>• Power BI Dashboarding</div>
              <div style={{ fontSize: '14px', color: '#444' }}>• SQL Server (SSMS)</div>
              <div style={{ fontSize: '14px', color: '#444' }}>• SAP MIS Reporting</div>
              <div style={{ fontSize: '14px', color: '#444' }}>• Advanced Excel / VBA</div>
              <div style={{ fontSize: '14px', color: '#444' }}>• Data Automation (ETL)</div>
              <div style={{ fontSize: '14px', color: '#444' }}>• Portfolio Risk Analysis</div>
            </div>
          </section>

          {/* Section: Education */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: '900', color: '#000', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
              Education <div style={{ height: '1px', flex: 1, backgroundColor: '#eee' }}></div>
            </h2>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: '800', marginBottom: '5px' }}>BSC (Bachelor of Science)</h3>
              <p style={{ color: '#0060ac', fontWeight: '700', fontSize: '13px' }}>Class of 2005 • Dr. BAMU Aurangabad University</p>
            </div>
          </section>

          {/* Footer of the page */}
          <footer style={{ marginTop: 'auto', paddingTop: '40px', borderTop: '1px solid #eee', textAlign: 'center', color: '#999', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Digitally Verified Portfolio • Datta Sable • 2025
          </footer>
        </div>

        {/* Print Instruction */}
        <p className="no-print" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem', marginTop: '40px' }}>
          * For best results, use "Save as PDF" in the print settings.
        </p>
      </main>

      <Footer />

      <style jsx global>{`
        @media print {
          /* Force white background and black text */
          body, html {
            background-color: white !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          
          .no-print, nav, footer {
            display: none !important;
          }
          
          main {
            padding: 0 !important;
            margin: 0 !important;
          }

          #resume-document {
            box-shadow: none !important;
            border: none !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          
          /* Sharpen text for print */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
}
