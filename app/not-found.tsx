import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />
      <div className="container" style={{ paddingTop: '10rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--muted)' }}>Page Not Found</h2>
        <p style={{ maxWidth: '500px', margin: '0 auto 3rem', lineHeight: 1.8 }}>
          The requested technical asset could not be located. It may have been moved or archived as part of our platform hardening.
        </p>
        <Link href="/" className="btn-primary">
          Back to Terminal
        </Link>
      </div>
      <Footer />
    </div>
  );
}
