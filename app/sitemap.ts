import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';
import { posts as staticBlogPosts } from '@/app/blog/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://dattasable.com';

  // 1. Fetch DB blog posts (if any)
  const dbPosts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true }
  }).catch(() => []);

  const dbBlogUrls = dbPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 2. Fetch Static blog posts from data.ts
  const staticBlogUrls = staticBlogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 3. Static main pages
  const staticUrls = [
    '',
    '/services',
    '/portfolio',
    '/blog',
    '/dashboards',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/disclaimer',
    '/start-here',
    '/analytics-live',
    '/data-forge',
    '/7-best-seo-tools-in-2025',
    '/top-5-free-tools-every-content-creator-should-be-using-in-2025',
    '/what-is-seo-in-digital-marketing-and-how-does-it-work-for-beginners',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.7,
  }));

  return [...staticUrls, ...dbBlogUrls, ...staticBlogUrls];
}

