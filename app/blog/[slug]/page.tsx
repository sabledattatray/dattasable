'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ChevronLeft, Share2, Clock, Calendar } from 'lucide-react';
import { posts } from '../data';
import BlockRenderer from '@/components/editor/BlockRenderer';

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [currentPost, setCurrentPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Try static posts
    const staticPost = posts.find(p => p.slug === params.slug);
    if (staticPost) {
      setCurrentPost(staticPost);
      setLoading(false);
    } else {
      // 2. Try localStorage
      const saved = localStorage.getItem('admin_posts');
      if (saved) {
        const parsed = JSON.parse(saved);
        const dynamicPost = parsed.find((p: any) => p.slug === params.slug);
        if (dynamicPost) {
          setCurrentPost(dynamicPost);
          setLoading(false);
        } else {
          router.push('/blog');
        }
      } else {
        router.push('/blog');
      }
    }

    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      const progress = document.getElementById('reading-progress');
      if (progress) progress.style.width = scrolled + '%';
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [params.slug, router]);

  if (loading) return <div style={{ background: '#000', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c9f31d' }}>INITIALIZING LOG_ACCESS...</div>;
  if (!currentPost) return null;

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareData = {
      title: currentPost.title,
      text: currentPost.excerpt,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />
      <div id="reading-progress" className="reading-progress" style={{ width: '0%' }} />
      
      <div className="boxed-wrapper" style={{ position: 'relative', marginBottom: '40px' }}>
        {/* ── Top-left Precision Crosshair ── */}
        <div style={{ position: 'absolute', top: '-20px', left: '-20px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
          <div style={{ position: 'absolute', width: '100%', height: '100%', border: '1px solid rgba(201, 243, 29, 0.4)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', width: '1px', height: '24px', background: 'linear-gradient(to bottom, #c9f31d, #00C9F2)' }} />
          <div style={{ position: 'absolute', width: '24px', height: '1px', background: 'linear-gradient(to right, #c9f31d, #00C9F2)' }} />
          <div style={{ position: 'absolute', width: '4px', height: '4px', background: '#c9f31d', borderRadius: '50%', boxShadow: '0 0 10px #c9f31d' }} />
        </div>

        <section className="section" style={{ paddingTop: 'clamp(8rem, 12vw, 10rem)' }}>
          <div className="container" style={{ maxWidth: 760 }}>
            <Link
              href="/blog"
              className="flex items-center gap-2 mb-8"
              style={{ textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}
            >
              <ChevronLeft size={16} /> BACK TO LOGS
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className="tag" style={{ color: currentPost.color || '#c9f31d', borderColor: `${currentPost.color || '#c9f31d'}44` }}>{currentPost.category}</span>
              <span className="flex items-center gap-1" style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>
                <Clock size={12} /> {currentPost.readTime || '5'} min read
              </span>
              <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>{currentPost.date}</span>
            </div>

            <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: 1.2, marginBottom: '2rem' }}>{currentPost.title}</h1>

            {/* Featured Image */}
            <div style={{ 
              width: '100%', 
              height: 'clamp(240px, 45vw, 450px)', 
              marginBottom: '2.5rem',
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid var(--border)'
            }}>
              <img 
                src={currentPost.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop'} 
                alt={currentPost.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.4))' }} />
              <div className="mono" style={{ position: 'absolute', bottom: '15px', right: '15px', fontSize: '10px', color: '#fff', backgroundColor: 'rgba(0,0,0,0.5)', padding: '4px 10px', letterSpacing: '0.2em' }}>
                LOG_ID: {currentPost.slug?.toUpperCase()}
              </div>
            </div>

            <div className="flex items-center gap-3 mb-8 pb-8" style={{ borderBottom: '1px solid var(--border)' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), var(--accent2))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>
                👨‍💻
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text)' }}>Datta Sable</div>
                <div style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>BI & Analytics Expert</div>
              </div>
              <button 
                onClick={handleShare}
                className="ml-auto flex items-center gap-2 transition-all duration-200" 
                style={{ 
                  background: copied ? 'var(--accent)' : 'var(--surface2)', 
                  border: '1px solid #c9f31d', 
                  borderRadius: 0, 
                  padding: '0.4rem 1.2rem', 
                  cursor: 'pointer', 
                  color: copied ? '#000' : '#fff', 
                  fontSize: '10px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}
              >
                <Share2 size={12} /> {copied ? 'COPIED!' : 'SHARE'}
              </button>
            </div>

            {currentPost.blocks && currentPost.blocks.length > 0 ? (
              <BlockRenderer blocks={currentPost.blocks} />
            ) : (
              <div
                style={{ color: 'var(--muted)', lineHeight: 1.9, fontSize: '1rem' }}
                dangerouslySetInnerHTML={{ __html: currentPost.content
                  .replace(/<h3>/g, `<h3 style="color:var(--text);font-size:1.15rem;margin:1.75rem 0 0.75rem;font-family:Inter,sans-serif;">`)
                  .replace(/<p>/g, `<p style="margin-bottom:1rem;">`)
                  .replace(/<pre><code>/g, `<pre style="background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:1rem;overflow-x:auto;margin:1rem 0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:var(--accent);">`)
                  .replace(/<\/code><\/pre>/g, `</code></pre>`)
                }}
              />
            )}
          </div>
        </section>

        {/* ── Bottom-right Precision Crosshair ── */}
        <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
          <div style={{ position: 'absolute', width: '100%', height: '100%', border: '1px solid rgba(201, 243, 29, 0.4)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', width: '1px', height: '24px', background: 'linear-gradient(to bottom, #c9f31d, #00C9F2)' }} />
          <div style={{ position: 'absolute', width: '24px', height: '1px', background: 'linear-gradient(to right, #c9f31d, #00C9F2)' }} />
          <div style={{ position: 'absolute', width: '4px', height: '4px', background: '#c9f31d', borderRadius: '50%', boxShadow: '0 0 10px #c9f31d' }} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
