import { prisma } from '@/lib/prisma';
import { posts as staticPosts } from '@/app/blog/data';

type BlogPost = (typeof staticPosts)[number] | Record<string, any>;

function getPostTimestamp(post: BlogPost) {
  const date = (post as any).date || (post as any).createdAt || (post as any).updatedAt;
  const timestamp = new Date(date || 0).getTime();
  return Number.isFinite(timestamp) ? timestamp : 0;
}

export async function getPublishedBlogPosts() {
  let dbPosts: BlogPost[] = [];

  try {
    dbPosts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.warn('Database unavailable for blog posts; using static posts only.', error);
  }

  const postsBySlug = new Map<string, BlogPost>();
  staticPosts.forEach((post) => postsBySlug.set(post.slug, post));
  dbPosts.forEach((post) => postsBySlug.set((post as any).slug, post));

  return Array.from(postsBySlug.values()).sort((a, b) => getPostTimestamp(b) - getPostTimestamp(a));
}

export async function getPublishedBlogPost(slug: string) {
  try {
    const dbPost = await prisma.post.findUnique({
      where: { slug },
    });

    if (dbPost?.published) {
      return dbPost;
    }
  } catch (error) {
    console.warn(`Database unavailable for blog post "${slug}"; checking static posts.`, error);
  }

  return staticPosts.find((post) => post.slug === slug) || null;
}

export async function getPublishedBlogSlugs() {
  let dbSlugs: string[] = [];

  try {
    const dbPosts = await prisma.post.findMany({
      select: { slug: true },
      where: { published: true },
    });
    dbSlugs = dbPosts.map((post) => post.slug);
  } catch (error) {
    console.warn('Database unavailable for blog slugs; using static slugs only.', error);
  }

  return Array.from(new Set([...staticPosts.map((post) => post.slug), ...dbSlugs]));
}

export function filterPostsByCategory(posts: BlogPost[], categoryName: string, slug: string) {
  return posts.filter((post) => {
    const category = ((post as any).category || '').toLowerCase();
    return category === categoryName.toLowerCase() || category.replace(/\s+/g, '-') === slug.toLowerCase();
  });
}
