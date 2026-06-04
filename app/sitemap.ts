import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';
import { posts as staticBlogPosts } from '@/app/blog/data';
import { CHAINS } from '@/data/chains';
import { TEMPLATES } from '@/data/templates';
import { KNOWLEDGE_ARTICLES } from '@/data/knowledge';
import { LANDING_PAGES } from '@/data/landing-pages';
import { GLOSSARY_TERMS } from '@/data/glossary';

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
    '/knowledge/architecture',
    '/glossary',
    '/tools/linkedin-formatter',
    '/tools/ai-prompt-generator',
    '/tools/seo-meta-generator',
    '/tools/image-blade',
    '/tools/context-optimizer',
    '/tools/word-counter',
    '/tools/schema-generator',
    '/tools/mermaid-forge',
    '/tools/demo',
    '/infrastructure',
    '/knowledge/taxonomy',
    '/knowledge/standards',
    '/knowledge/protocols',
    '/knowledge/patterns',
    '/knowledge/rfc',
    '/knowledge/rfc/001-prompt-hardening',
    '/knowledge/rfc/002-execution-chains',
    '/knowledge/rfc/003-intent-mapping',
    '/knowledge/comparisons',
    '/dashboards/global-sales-intelligence',
    '/dashboards/collection-intelligence',
    '/dashboards/revenue-intelligence',
    '/dashboards/interactive',
    '/dashboards/blinkit-sales',
    '/dashboards/sales-pipeline',
    '/dashboards/surgical-ai',
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

  // 7. Micro-Landing Pages
  const landingPageUrls = LANDING_PAGES.map((lp) => ({
    url: `${baseUrl}/lp/${lp.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // 8. Glossary Terms
  const glossaryUrls = GLOSSARY_TERMS.map((term) => ({
    url: `${baseUrl}/glossary/${term.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const allUrls = [
    ...staticUrls, 
    ...dbBlogUrls, 
    ...staticBlogUrls, 
    ...chainUrls, 
    ...templateUrls, 
    ...knowledgeUrls,
    ...landingPageUrls,
    ...glossaryUrls
  ];

  // De-duplicate by URL to prevent crawler warnings in Search Console
  const uniqueUrlsMap = new Map<string, typeof allUrls[0]>();
  for (const item of allUrls) {
    if (!uniqueUrlsMap.has(item.url)) {
      uniqueUrlsMap.set(item.url, item);
    } else {
      const existing = uniqueUrlsMap.get(item.url)!;
      // Prefer specific database modification dates over generic new Date() instances
      const existingIsToday = existing.lastModified instanceof Date && 
        new Date().toDateString() === existing.lastModified.toDateString();
      const itemIsToday = item.lastModified instanceof Date && 
        new Date().toDateString() === item.lastModified.toDateString();
      
      if (existingIsToday && !itemIsToday) {
        uniqueUrlsMap.set(item.url, item);
      }
    }
  }

  return Array.from(uniqueUrlsMap.values());
}

