import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  const lastUpdated = "April 29, 2026";

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--text)' }}>
      <Navbar />
      <div className="boxed-wrapper" style={{ position: 'relative', padding: '120px 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="label-tech mb-4" style={{ letterSpacing: '0.3em' }}>LEGAL-DOCUMENT</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 40px)', fontWeight: 600, marginBottom: '1rem' }}>Privacy Policy</h1>
          <p style={{ color: 'var(--muted)', marginBottom: '3rem', fontSize: '0.9rem' }}>Last Updated: {lastUpdated}</p>

          <div className="card" style={{ padding: '3rem', lineHeight: '1.8' }}>
            <section style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', color: 'var(--accent)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>1. Introduction</h2>
              <p>Welcome to Datta Sable's portfolio and BI platform. We respect your privacy and are committed to protecting your personal data. This privacy policy informs you how we look after your personal data when you visit our website and tells you about your privacy rights.</p>
            </section>

            <section style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', color: 'var(--accent)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>2. Data We Collect</h2>
              <p>When you use our "One-Tap Connect" or contact form, we may collect:</p>
              <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
                <li>Identity Data (Name, Profile Picture)</li>
                <li>Contact Data (Email address)</li>
                <li>Technical Data (IP address, browser type, and usage data)</li>
              </ul>
            </section>

            <section style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', color: 'var(--accent)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>3. How We Use Your Data</h2>
              <p>We use your data strictly for:</p>
              <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
                <li>Authenticating your session for dashboard access</li>
                <li>Responding to your inquiries via the contact form</li>
                <li>Improving our BI analytics features and user experience</li>
              </ul>
            </section>

            <section style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', color: 'var(--accent)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>4. Third-Party Services</h2>
              <p>We use Google Identity Services for authentication. Your data is handled according to Google's privacy standards. We do not sell or share your data with other third parties.</p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.25rem', color: 'var(--accent)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>5. Contact Us</h2>
              <p>If you have any questions about this privacy policy or our data practices, please contact us at: <a href="mailto:info@dattasable.com" style={{ color: 'var(--accent)', textDecoration: 'none' }}>info@dattasable.com</a></p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
