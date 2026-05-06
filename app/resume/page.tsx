'use client';
import React from 'react';
import { Download, Mail, Phone, MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ResumePage() {
  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh', color: 'white' }}>
      <Navbar />
      
      {/* 
          Aggressive Layout Strategy:
          - Use inline styles to bypass any global CSS conflicts.
          - Explicit paddingTop to clear the fixed header (250px).
          - Explicit centering using margin: 0 auto and textAlign: center.
      */}
      <main style={{ 
        paddingTop: '250px', 
        paddingBottom: '100px', 
        paddingLeft: '20px', 
        paddingRight: '20px',
        maxWidth: '900px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        
        {/* Header Section */}
        <header style={{ marginBottom: '80px' }}>
          <h1 style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', fontWeight: 'bold', marginBottom: '20px', letterSpacing: '-0.02em' }}>
            Dattatray Sable
          </h1>
          <p style={{ fontSize: '1.5rem', color: '#a4c9ff', fontWeight: '500', marginBottom: '40px', opacity: 0.9 }}>
            MIS & Business Intelligence Lead
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap', marginBottom: '50px', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={16} color="#a4c9ff" /> sabledattatray@gmail.com
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={16} color="#a4c9ff" /> +91 8010803756
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={16} color="#a4c9ff" /> Mumbai, India
            </div>
          </div>

          <a 
            href="/Resume_Design/Dattatray_Sable.pdf" 
            download 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '12px', 
              backgroundColor: '#a4c9ff', 
              color: '#00315d', 
              padding: '18px 40px', 
              borderRadius: '50px', 
              fontWeight: 'bold', 
              textDecoration: 'none',
              boxShadow: '0 10px 30px rgba(164,201,255,0.2)'
            }}
          >
            <Download size={20} />
            DOWNLOAD RESUME PDF
          </a>
        </header>

        {/* Content Sections: Using standard vertical flow */}
        <div style={{ textAlign: 'left', marginTop: '100px' }}>
          
          <section style={{ marginBottom: '80px' }}>
            <h2 style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#a4c9ff', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
              01. Executive Summary
            </h2>
            <p style={{ fontSize: '1.25rem', lineHeight: '1.8', color: 'rgba(255,255,255,0.8)', fontWeight: '300' }}>
              Dynamic and results-oriented professional with over <span style={{ color: 'white', fontWeight: '500' }}>10 years of strategic experience</span> in BFSI, collections analytics, and risk portfolio management. Specialized in transforming high-volume raw data into strategic insights through SQL, Power BI, and Data Automation.
            </p>
          </section>

          <section style={{ marginBottom: '80px' }}>
            <h2 style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#a4c9ff', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
              02. Professional Experience
            </h2>
            <div style={{ spaceY: '50px' }}>
              <div style={{ marginBottom: '50px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>MIS Manager</h3>
                  <span style={{ fontSize: '0.8rem', color: '#a4c9ff', fontWeight: 'bold' }}>2025 – PRESENT</span>
                </div>
                <p style={{ color: '#a4c9ff', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '15px' }}>DBS MINTEK PVT. LTD.</p>
                <ul style={{ listStyle: 'none', padding: 0, color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: '1.6' }}>
                  <li style={{ marginBottom: '10px' }}>• Orchestrating migration of legacy reporting to automated architectures.</li>
                  <li style={{ marginBottom: '10px' }}>• Developed end-to-end automation workflows reducing manual effort by 40%.</li>
                </ul>
              </div>

              <div style={{ marginBottom: '50px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Information System Analyst</h3>
                  <span style={{ fontSize: '0.8rem', color: '#a4c9ff', fontWeight: 'bold' }}>2023 – 2025</span>
                </div>
                <p style={{ color: '#a4c9ff', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '15px' }}>CASCO</p>
                <ul style={{ listStyle: 'none', padding: 0, color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: '1.6' }}>
                  <li style={{ marginBottom: '10px' }}>• Designed and maintained mission-critical analytical reports.</li>
                  <li style={{ marginBottom: '10px' }}>• Served as technical bridge between raw data lakes and business intelligence.</li>
                </ul>
              </div>
            </div>
          </section>

          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px' }}>
            <div>
              <h2 style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#a4c9ff', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
                03. Expertise
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                <span>• Power BI</span>
                <span>• SQL Server</span>
                <span>• SAP MIS</span>
                <span>• Adv. Excel</span>
                <span>• Data Automation</span>
                <span>• Risk Analysis</span>
              </div>
            </div>
            <div>
              <h2 style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#a4c9ff', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
                04. Education
              </h2>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '5px' }}>BSC (Computer Science)</h4>
              <p style={{ color: '#a4c9ff', fontSize: '0.8rem', fontWeight: 'bold' }}>Class of 2005</p>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', marginTop: '5px' }}>Dr. BAMU Aurangabad University</p>
            </div>
          </section>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}
