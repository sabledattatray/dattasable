import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ToolCard from '@/components/tools/ToolCard';
import { 
  Wand2, 
  Share2, 
  Search, 
  Image as ImageIcon, 
  Type, 
  Zap, 
  FileJson, 
  Globe 
} from 'lucide-react';

export const metadata: Metadata = {
  title: "Surgical Creator Toolkit | AI-Powered SEO & Productivity Tools",
  description: "A professional suite of high-fidelity tools for creators, developers, and SEO experts. AI prompt generation, LinkedIn formatting, and technical utilities.",
};

const TOOLS = [
  {
    id: 'linkedin-formatter',
    title: 'LinkedIn Authority Formatter',
    description: 'Transform messy thoughts into viral LinkedIn hooks with professional spacing and surgical precision.',
    icon: <Share2 size={24} />,
    category: 'Social',
    href: '/tools/linkedin-formatter',
    status: 'Ready'
  },
  {
    id: 'ai-prompt-generator',
    title: 'Surgical Prompt Engineer',
    description: 'Generate high-fidelity AI prompts for Gemini, GPT-4, and Claude. Optimized for technical and creative tasks.',
    icon: <Wand2 size={24} />,
    category: 'AI',
    href: '/tools/ai-prompt-generator',
    status: 'Ready'
  },
  {
    id: 'seo-meta-generator',
    title: 'Meta-Force SEO Generator',
    description: 'Generate SEO-optimized titles, meta descriptions, and JSON-LD schema in one click.',
    icon: <Search size={24} />,
    category: 'SEO',
    href: '/tools/seo-meta-generator',
    status: 'Ready'
  },
  {
    id: 'image-blade-compressor',
    title: 'Image-Blade Compressor',
    description: 'Fast, client-side image optimization to WebP/AVIF without losing surgical quality.',
    icon: <ImageIcon size={24} />,
    category: 'Utility',
    href: '/tools/image-blade',
    status: 'Coming Soon'
  },
  {
    id: 'word-reading-time',
    title: 'Precision Word Counter',
    description: 'Detailed analysis of your content: Word count, reading time, and readability score.',
    icon: <Type size={24} />,
    category: 'Content',
    href: '/tools/word-counter',
    status: 'Coming Soon'
  },
  {
    id: 'json-schema-forge',
    title: 'JSON-LD Schema Forge',
    description: 'Create technical structured data for Articles, Products, and Videos to boost Google indexing.',
    icon: <FileJson size={24} />,
    category: 'Developer',
    href: '/tools/schema-generator',
    status: 'Coming Soon'
  }
];

export default function ToolsHub() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />
      
      <main className="boxed-wrapper" style={{ position: 'relative', marginBottom: '80px' }}>
        {/* Precision Decorators */}
        <div style={{ position: 'absolute', top: '-20px', left: '-20px', width: '40px', height: '40px', zIndex: 10 }}>
          <div style={{ position: 'absolute', width: '100%', height: '100%', border: '1px solid rgba(201, 243, 29, 0.4)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '1px', height: '24px', background: 'var(--accent)' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '24px', height: '1px', background: 'var(--accent)' }} />
        </div>

        <section className="section" style={{ paddingTop: 'clamp(6rem, 10vw, 8rem)' }}>
          <div className="container">
            <div style={{ maxWidth: 800, marginBottom: '4rem' }}>
              <div className="label-tech mb-4">SURGICAL-TOOLKIT-V1.0</div>
              <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', lineHeight: 1, marginBottom: '1.5rem' }}>
                Creator <span className="hero-title">Utilities</span>
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: '1.1rem', lineHeight: 1.6 }}>
                A professional-grade suite of AI and technical tools designed for high-performance content creators, developers, and data strategists.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {TOOLS.map((tool) => (
                <ToolCard key={tool.id} {...tool} />
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Decorator */}
        <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', width: '40px', height: '40px', zIndex: 10 }}>
          <div style={{ position: 'absolute', width: '100%', height: '100%', border: '1px solid rgba(201, 243, 29, 0.4)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '1px', height: '24px', background: 'var(--accent)' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '24px', height: '1px', background: 'var(--accent)' }} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
