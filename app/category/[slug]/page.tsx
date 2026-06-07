import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogList from '@/components/BlogList';
import { filterPostsByCategory, getPublishedBlogPosts } from '@/lib/blog-posts';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  
  // Format slug to Category Name (e.g., 'web-development' -> 'Web Development')
  const categoryName = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  let posts: any[] = [];
  try {
    posts = filterPostsByCategory(await getPublishedBlogPosts(), categoryName, slug);
  } catch (error) {
    console.error(`Failed to retrieve category posts for ${slug}:`, error);
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />
      <div className="boxed-wrapper" style={{ position: 'relative', marginBottom: '40px' }}>
        <section className="section" style={{ paddingTop: 'clamp(8rem, 12vw, 10rem)' }}>
          <div className="container" style={{ marginBottom: '4rem' }}>
             <div className="label-tech mb-4">CATEGORY_ARCHIVE // {slug.toUpperCase()}</div>
             <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 48px)', fontWeight: 600 }}>
               Posts in <span className="hero-title">{categoryName}</span>
             </h1>
          </div>
          <BlogList initialPosts={posts as any} />
        </section>
      </div>
      <Footer />
    </div>
  );
}
