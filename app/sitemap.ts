import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';
import { posts as staticBlogPosts } from '@/app/blog/data';
import { CHAINS } from '@/data/chains';
import { TEMPLATES } from '@/data/templates';
import { KNOWLEDGE_ARTICLES } from '@/data/knowledge';

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
    '/tools',
    '/tools/workspace',
    '/templates',
    '/chains',
    '/knowledge',
    '/glossary',
    '/tools/linkedin-formatter',
    '/tools/ai-prompt-generator',
    '/tools/seo-meta-generator',
    '/tools/image-blade',
    '/tools/context-optimizer',
    '/tools/word-counter',
    '/tools/schema-generator',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : route === '/tools' ? 0.9 : 0.7,
  }));

  // 4. Execution Chains
  const chainUrls = CHAINS.map((chain) => ({
    url: `${baseUrl}/chains/${chain.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // 5. Template Packs
  const templateUrls = TEMPLATES.map((template) => ({
    url: `${baseUrl}/templates/${template.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 6. Knowledge Hub
  const knowledgeUrls = KNOWLEDGE_ARTICLES.map((article) => ({
    url: `${baseUrl}/knowledge/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    ...staticUrls, 
    ...dbBlogUrls, 
    ...staticBlogUrls, 
    ...chainUrls, 
    ...templateUrls, 
    ...knowledgeUrls
  ];
}

