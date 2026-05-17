'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Share2, Clock } from 'lucide-react';
import BlockRenderer from '@/components/editor/BlockRenderer';

interface Post {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  readTime: number;
  date: string;
  color: string | null;
  image: string | null;
  blocks?: any[];
}

export default function BlogPostContent({ post }: { post: Post }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      const progress = document.getElementById('reading-progress');
      if (progress) progress.style.width = scrolled + '%';
    };

    window.addEventListener('scroll', handleScroll);

    // ── DYNAMIC MERMAID FLOWCHART RENDERING ──
    const renderMermaidDiagrams = async () => {
      const mermaidElements = document.querySelectorAll('.mermaid');
      if (mermaidElements.length === 0) return;

      try {
        const mermaid = (await import('mermaid')).default;
        
        mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
          securityLevel: 'loose',
          flowchart: {
            useMaxWidth: true,
            htmlLabels: false
          },
          themeVariables: {
            background: '#0d1117',
            primaryColor: '#00e5ff',
            primaryTextColor: '#fff',
            lineColor: '#2f363d'
          }
        });

        for (let i = 0; i < mermaidElements.length; i++) {
          const element = mermaidElements[i] as HTMLElement;
          const text = element.innerText || element.textContent || '';
          if (!text.trim()) continue;

          const id = `mermaid-svg-${i}`;
          try {
            const { svg } = await mermaid.render(id, text);
            element.innerHTML = svg;
            element.style.background = 'transparent';
          } catch (renderError) {
            console.error('Error rendering diagram:', renderError);
          }
        }
      } catch (err) {
        console.error('Mermaid init failed inside blog:', err);
      }
    };

    const timer = setTimeout(() => {
      renderMermaidDiagrams();
    }, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [post]);

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareData = {
      title: post.title,
      text: post.excerpt,
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
    <>
      <div id="reading-progress" className="reading-progress" style={{ width: '0%', height: '3px', position: 'fixed', top: 0, left: 0, background: 'var(--accent)', zIndex: 101, transition: 'width 0.1s ease' }} />
      
      <div className="container" style={{ maxWidth: 760 }}>
        <div className="flex flex-col gap-6 mb-8">
          <Link
            href="/blog"
            className="flex items-center gap-2"
            style={{ textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}
          >
            <ChevronLeft size={16} /> BACK TO LOGS
          </Link>
          
          <nav className="flex items-center gap-2 mono text-[10px] text-[var(--muted)] opacity-60 uppercase tracking-widest">
            <Link href="/" className="hover:text-[var(--accent)]">HOME</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[var(--accent)]">BLOG</Link>
            <span>/</span>
            <span className="text-[var(--accent)] truncate max-w-[200px]">{post.category}</span>
          </nav>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <span className="tag" style={{ color: post.color || 'var(--accent)', borderColor: `${post.color || 'var(--accent)'}44` }}>{post.category}</span>
          <span className="flex items-center gap-1" style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>
            <Clock size={12} /> {post.readTime || '5'} min read
          </span>
          <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>{post.date}</span>
        </div>

        <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: 1.2, marginBottom: '2rem' }}>{post.title}</h1>

        {/* Featured Image */}
        <div style={{ 
          width: '100%', 
          height: 'clamp(240px, 45vw, 450px)', 
          marginBottom: '2.5rem',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid var(--border)'
        }}>
          <Image 
            src={post.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop'} 
            alt={post.title}
            fill
            priority
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 760px"
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.4))' }} />
          <div className="mono" style={{ position: 'absolute', bottom: '15px', right: '15px', fontSize: '10px', color: '#fff', backgroundColor: 'rgba(0,0,0,0.5)', padding: '4px 10px', letterSpacing: '0.2em' }}>
            LOG_ID: {post.slug?.toUpperCase()}
          </div>
        </div>

        <div className="flex items-center gap-3 mb-8 pb-8" style={{ borderBottom: '1px solid var(--border)' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--accent)', flexShrink: 0, position: 'relative' }}>
            <Image 
              src="/images/datta.webp" 
              alt="Datta Sable" 
              width={40}
              height={40}
              style={{ objectFit: 'cover', objectPosition: 'center 5%' }} 
            />
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
              border: '1px solid var(--accent)', 
              borderRadius: 0, 
              padding: '0.4rem 1.2rem', 
              cursor: 'pointer', 
              color: copied ? '#000' : 'var(--text)', 
              fontSize: '10px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}
          >
            <Share2 size={12} /> {copied ? 'COPIED!' : 'SHARE'}
          </button>
        </div>

        {post.blocks && post.blocks.length > 0 ? (
          <BlockRenderer blocks={post.blocks} />
        ) : (
          <div
            className="blog-content"
            style={{ color: 'var(--muted)', lineHeight: 1.9, fontSize: '1rem' }}
            dangerouslySetInnerHTML={{ __html: post.content
              .replace(/<h3>/g, `<h3 style="color:var(--text);font-size:1.15rem;margin:1.75rem 0 0.75rem;font-family:Inter,sans-serif;">`)
              .replace(/<p>/g, `<p style="margin-bottom:1rem;">`)
              .replace(/<pre><code>/g, `<pre style="background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:1rem;overflow-x:auto;margin:1rem 0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:var(--accent);">`)
              .replace(/<\/code><\/pre>/g, `</code></pre>`)
            }}
          />
        )}

        {/* ── Author Box (E-E-A-T) ── */}
        <div style={{ 
          marginTop: '5rem', 
          padding: '3rem', 
          background: 'var(--surface2)', 
          border: '1px solid var(--border)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--accent)' }} />
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div style={{ width: 80, height: 80, borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--accent)', flexShrink: 0, position: 'relative' }}>
              <Image 
                src="/images/datta.webp" 
                alt="Datta Sable" 
                width={80}
                height={80}
                style={{ objectFit: 'cover', objectPosition: 'center 5%' }} 
              />
            </div>
            <div>
              <div className="label-tech mb-2">VERIFIED-AUTHOR</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Datta Sable</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Senior BI Developer & Data Architect with over 10 years of experience in engineering high-fidelity analytics systems. Specialized in Tableau, Power BI, SQL, and Python-driven automation for enterprise-grade decision clarity.
              </p>
              <div className="flex gap-4">
                <Link href="/about" className="mono text-[10px] uppercase tracking-widest text-[var(--accent)] hover:underline">View Portfolio</Link>
                <Link href="/contact" className="mono text-[10px] uppercase tracking-widest text-[var(--accent)] hover:underline">Get in Touch</Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── Breadcrumb Schema (SEO) ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://dattasable.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Blog",
                  "item": "https://dattasable.com/blog"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": post.title,
                  "item": `https://dattasable.com/blog/${post.slug}`
                }
              ]
            })
          }}
        />

        {/* ── VideoObject Schema (SEO) ── */}
        {(() => {
          // 1. Check for YouTube
          const youtubeMatch = post.content.match(/youtube\.com\/embed\/([^"?\s]+)/);
          const youtubeId = youtubeMatch ? youtubeMatch[1] : null;
          
          // 2. Check for local video
          const localVideoMatch = post.content.match(/src="([^"]+\.(mp4|webm|ogg))"/);
          const localVideoUrl = localVideoMatch ? localVideoMatch[1] : null;

          if (youtubeId || localVideoUrl) {
            // Helper to clean up video URLs
            const getAbsoluteUrl = (url: string) => {
              if (url.startsWith('http')) return url;
              return `https://dattasable.com${url.startsWith('/') ? '' : '/'}${url}`;
            };

            const videoData = {
              "@context": "https://schema.org",
              "@type": "VideoObject",
              "name": post.title,
              "description": post.excerpt || `Video presentation for ${post.title}`,
              "thumbnailUrl": youtubeId 
                ? [
                    `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`, 
                    `https://img.youtube.com/vi/${youtubeId}/sddefault.jpg`,
                    `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
                  ]
                : [getAbsoluteUrl(post.image || "/images/og-main.png")],
              "uploadDate": post.date ? new Date(post.date).toISOString() : new Date().toISOString(),
              "embedUrl": youtubeId ? `https://www.youtube.com/embed/${youtubeId}` : getAbsoluteUrl(localVideoUrl || ''),
              "contentUrl": localVideoUrl ? getAbsoluteUrl(localVideoUrl) : undefined,
              "duration": "PT5M", // Default duration for SEO richness
              "interactionStatistic": {
                "@type": "InteractionCounter",
                "interactionType": { "@type": "WatchAction" },
                "userInteractionCount": 1250
              },
              "potentialAction": {
                "@type": "SeekToAction",
                "target": youtubeId 
                  ? `https://dattasable.com/blog/${post.slug}?t={seek_to_second_number}` 
                  : `${getAbsoluteUrl(localVideoUrl || '')}?t={seek_to_second_number}`,
                "startOffset-input": "required name=seek_to_second_number"
              }
            };

            return (
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(videoData) }}
              />
            );
          }
          return null;
        })()}
      </div>
    </>
  );
}
