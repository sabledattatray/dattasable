import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogPostContent from '@/components/BlogPostContent';

export const revalidate = 3600; // Revalidate every 1 hour

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let post = await prisma.post.findUnique({
    where: { slug }
  });

  // Fallback to static data if not in DB
  if (!post) {
    const { posts } = await import('../data');
    post = posts.find(p => p.slug === slug) as any;
  }

  if (!post) return { title: 'Post Not Found' };

  const ogImage = `/api/og?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.category)}&date=${encodeURIComponent(post.date)}`;

  return {
    title: `${post.title} | Datta Sable Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
      type: 'article',
      publishedTime: post.createdAt.toISOString(),
      authors: ['Datta Sable'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    }
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  let post = await prisma.post.findUnique({
    where: { slug }
  });

  // Fallback to static data if not in DB
  if (!post) {
    const { posts } = await import('../data');
    post = posts.find(p => p.slug === slug) as any;
  }

  if (!post) {
    notFound();
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />
      <div className="boxed-wrapper" style={{ position: 'relative', marginBottom: '40px' }}>
        {/* ── Top-left Precision Crosshair ── */}
        <div style={{ position: 'absolute', top: '-20px', left: '-20px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
          <div style={{ position: 'absolute', width: '100%', height: '100%', border: '1px solid rgba(201, 243, 29, 0.4)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', width: '1px', height: '24px', background: 'var(--accent)' }} />
          <div style={{ position: 'absolute', width: '24px', height: '1px', background: 'var(--accent)' }} />
          <div style={{ position: 'absolute', width: '4px', height: '4px', background: 'var(--accent)', borderRadius: '50%' }} />
        </div>

        <section className="section" style={{ paddingTop: 'clamp(8rem, 12vw, 10rem)' }}>
          <BlogPostContent post={post as any} />
        </section>

        {/* ── Bottom-right Precision Crosshair ── */}
        <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
          <div style={{ position: 'absolute', width: '100%', height: '100%', border: '1px solid rgba(201, 243, 29, 0.4)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', width: '1px', height: '24px', background: 'var(--accent)' }} />
          <div style={{ position: 'absolute', width: '24px', height: '1px', background: 'var(--accent)' }} />
          <div style={{ position: 'absolute', width: '4px', height: '4px', background: 'var(--accent)', borderRadius: '50%' }} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
