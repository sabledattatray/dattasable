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
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.7,
  }));

  return [...staticUrls, ...dbBlogUrls, ...staticBlogUrls];
}

