'use client';
import React from 'react';
import { Printer, Mail, Phone, MapPin, Globe, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ResumePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', color: 'white', fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      <Navbar />
      
      <main style={{ 
        paddingTop: '160px', 
        paddingBottom: '100px', 
        paddingLeft: '20px', 
        paddingRight: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        
        {/* Print Button */}
        <div className="no-print" style={{ 
          width: '100%', 
          maxWidth: '1000px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '30px' 
        }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '0.9rem' }}>
            <ArrowLeft size={16} /> Back to Portfolio
          </a>
          <button 
            onClick={handlePrint}
            style={{ 
              backgroundColor: '#fff', 
              color: '#000', 
              padding: '12px 24px', 
              borderRadius: '6px', 
              fontWeight: 'bold', 
              cursor: 'pointer',
              border: 'none',
              fontSize: '0.9rem'
            }}
          >
            <Printer size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            PRINT RESUME
          </button>
        </div>

        {/* ── RESUME CONTAINER ── */}
        <div id="resume-document" style={{ 
          backgroundColor: '#e6dfd9', /* The outer background color seen in image */
          width: '100%', 
          maxWidth: '900px', 
          minHeight: '1200px', 
          display: 'grid',
          gridTemplateColumns: '350px 1fr',
          color: '#000',
          position: 'relative',
          boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
          overflow: 'hidden'
        }}>
          
          {/* ── LEFT SIDEBAR ── */}
          <div style={{ 
            backgroundColor: '#6b5d56', 
            color: '#fff', 
            padding: '60px 40px',
            borderTopRightRadius: '200px',
            borderBottomRightRadius: '200px',
            marginTop: '20px',
            marginBottom: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            {/* Profile Image */}
            <div style={{ 
              width: '180px', 
              height: '180px', 
              borderRadius: '50%', 
              border: '10px solid #fff', 
              overflow: 'hidden',
              marginBottom: '40px',
              backgroundColor: '#ddd'
            }}>
              <img 
                src="https://lh3.googleusercontent.com/aida/ADBb0uipmhqazs7Cusgp-TalImOR4OGCg8S78FhzZSy034bTHLRYE7RB-XOHHG50veZOoJLrc6DkVtGrvsiqRSSWViXehktHdSARABi4ssVDCJzpJwpQnlNHmzFIUfYYCxBf1YUJn9GdSzSvRzsdyphDcXb43rqcqGkrh6RyZk7sLLk_y6R4JhF0cdjbeOYDnRtmLL47Rg32Uo9hAEIOXdVawXJrqlnmDf9VFiF4fUhGgkxL-txR1VZZX6fVd5y08b68R9pBUwtegYlI1g" 
                alt="Datta Sable" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <h2 style={{ fontSize: '18px', fontWeight: 'bold', letterSpacing: '0.1em', marginBottom: '20px', textTransform: 'uppercase' }}>
              PROFESSIONAL SUMMARY
            </h2>
            <p style={{ fontSize: '12px', lineHeight: '1.6', marginBottom: '40px', textAlign: 'center', opacity: 0.9 }}>
              Results-driven MIS & Business Intelligence professional with 10+ years of experience in BFSI, collections analytics, and risk portfolio management. Highly skilled in Advanced Excel, SQL Server, Power BI, SAP MIS reporting, and data automation. Proven ability to convert large datasets into actionable dashboards and management insights, improve resolution efficiency, and support strategic decision-making with a strong understanding of business operations.
            </p>

            {/* Contact Info */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '50px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ backgroundColor: '#fff', borderRadius: '50%', padding: '8px', color: '#6b5d56' }}><Phone size={16} /></div>
                <span style={{ fontSize: '13px', fontWeight: 'bold' }}>+91 8010803756</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ backgroundColor: '#fff', borderRadius: '50%', padding: '8px', color: '#6b5d56' }}><Mail size={16} /></div>
                <span style={{ fontSize: '13px', fontWeight: 'bold' }}>sabledattatray@gmail.com</span>
                <span style={{ fontSize: '11px' }}>Date Of Birth - 05-Nov-1981</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ backgroundColor: '#fff', borderRadius: '50%', padding: '8px', color: '#6b5d56' }}><MapPin size={16} /></div>
                <p style={{ fontSize: '11px', margin: 0, lineHeight: '1.4', padding: '0 20px' }}>
                  Badlapur, Maharashtra, India
                </p>
              </div>
            </div>

            {/* Expertise */}
            <div style={{ width: '100%', textAlign: 'left', paddingLeft: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', letterSpacing: '0.1em', marginBottom: '20px', textTransform: 'uppercase', textAlign: 'center' }}>
                EXPERTISE
              </h2>
              <ul style={{ fontSize: '12px', listStyle: 'disc', paddingLeft: '20px', lineHeight: '1.8' }}>
                <li>Advanced Excel</li>
                <li>Data Analyzing</li>
                <li>MS-OFFICE</li>
                <li>Email Management</li>
                <li>SQL Server Management Studio</li>
                <li>Big Data Operations</li>
                <li>MS Power BI</li>
                <li>MS ACCESS</li>
                <li>Analytical Thinking</li>
                <li>Client Communication</li>
              </ul>
            </div>
          </div>

          {/* ── MAIN CONTENT ── */}
          <div style={{ backgroundColor: '#fff', padding: '60px 40px' }}>
            <header style={{ marginBottom: '40px' }}>
              <h1 style={{ fontSize: '32px', fontWeight: '700', margin: 0, color: '#333' }}>Dattatray Sable</h1>
              <div style={{ display: 'flex', gap: '15px', fontSize: '14px', marginTop: '10px' }}>
                <span style={{ color: '#555' }}>sabledattatray@gmail.com</span>
                <span style={{ color: '#555', textDecoration: 'underline' }}>www.dattasable.com</span>
              </div>
              <div style={{ height: '2px', background: '#ccc', marginTop: '15px', width: '100%' }}></div>
            </header>

            {/* Core Competencies */}
            <section style={{ marginBottom: '35px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', textTransform: 'uppercase' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#000' }}></span>
                CORE COMPETENCIES
              </h2>
              <p style={{ fontSize: '12px', lineHeight: '1.6', fontWeight: 'bold', color: '#333' }}>
                Power BI (Dashboards & KPIs) | SQL Server (SSMS) | Advanced Excel (Power Query, Pivot Tables) | SAP MIS Reporting | MS Access | Data Cleansing & Automation | Portfolio & Risk Analysis | MIS & Management Reporting
              </p>
            </section>

            {/* Professional Experience */}
            <section style={{ marginBottom: '35px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px', textTransform: 'uppercase' }}>
                PROFESSIONAL EXPERIENCE
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                {/* DBS Mintek */}
                <div>
                  <h3 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '10px' }}>
                    MIS Manager – DBS Mintek Pvt. Ltd. (June 2025 – Present)
                  </h3>
                  <ul style={{ fontSize: '12px', paddingLeft: '20px', listStyle: 'disc', color: '#444', lineHeight: '1.6' }}>
                    <li>Developed daily, weekly, and monthly MIS dashboards using Power BI, SQL Server, Excel, and SAP.</li>
                    <li>Automated MIS processes using Power Query, reducing manual effort by approximately 40%.</li>
                    <li>Analyzed large-volume data using SSMS 2021 to identify trends and high-risk accounts.</li>
                    <li>Designed bucket-wise resolution and aging dashboards to improve management visibility.</li>
                    <li>Performed data cleansing, consolidation, and analytics modeling for targeted strategies.</li>
                  </ul>
                </div>

                {/* CASCO */}
                <div>
                  <h3 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '10px' }}>
                    Information System Analyst – CASCO (Oct 2023 – May 2025)
                  </h3>
                  <ul style={{ fontSize: '12px', paddingLeft: '20px', listStyle: 'disc', color: '#444', lineHeight: '1.6' }}>
                    <li>Analyzed business and operational data to support system-level reporting and decision-making.</li>
                    <li>Developed MIS and analytical reports using SQL, Excel, and BI tools.</li>
                    <li>Worked with cross-functional teams to improve data accuracy, reporting efficiency, and system processes.</li>
                    <li>Supported management with ad-hoc analysis, dashboards, and performance insights.</li>
                  </ul>
                </div>

                {/* Kissht Finance */}
                <div>
                  <h3 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '10px' }}>
                    Assistant Manager – MIS & Analytics – Kissht Finance Ltd. (Jan 2020 – Sep 2023)
                  </h3>
                  <ul style={{ fontSize: '12px', paddingLeft: '20px', listStyle: 'disc', color: '#444', lineHeight: '1.6' }}>
                    <li>Managed PAN-India portfolios (Risk-30 ± Write-off/NPA) with structured MIS oversight.</li>
                    <li>Supervised 60-70 tele-callers and 3-4 Team Leaders with performance analytics.</li>
                    <li>Designed Excel dashboards using Pivot Tables, Power Query, and advanced formulas.</li>
                    <li>Maintained customer and payment data using MS Access for fast retrieval and reporting.</li>
                    <li>Improved resolution rates and reduced roll-forward cases through continuous analysis.</li>
                  </ul>
                </div>

                {/* HDFC Bank */}
                <div>
                  <h3 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '10px' }}>
                    Deputy Manager – HDFC Bank Ltd. (Aug 2015 – Jan 2020)
                  </h3>
                  <ul style={{ fontSize: '12px', paddingLeft: '20px', listStyle: 'disc', color: '#444', lineHeight: '1.6' }}>
                    <li>Managed Credit Card Write-off & NPA portfolios (Risk-120) for Mumbai region.</li>
                    <li>Handled 6 external agencies and supervised in-house calling teams.</li>
                    <li>Ensured audit compliance, daily tracking, and controlled portfolio slippage.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', textTransform: 'uppercase' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#000' }}></span>
                Education
              </h2>
              <div style={{ marginLeft: '20px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', margin: 0 }}>Dr. BAMU Aurangbad Unervisity</h3>
                <ul style={{ fontSize: '12px', listStyle: 'disc', paddingLeft: '20px', marginTop: '5px' }}>
                  <li>BSC- 2005</li>
                </ul>
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
          }
          main {
            padding: 0 !important;
            margin: 0 !important;
          }
          #resume-document {
            box-shadow: none !important;
            margin: 0 !important;
            max-width: 100% !important;
            width: 100% !important;
          }
          header, nav, footer, .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
