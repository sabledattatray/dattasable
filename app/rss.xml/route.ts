import { prisma } from '@/lib/prisma';
import { posts as staticPosts } from '../blog/data';

export async function GET() {
  const dbPosts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' }
  });

  // Merge and sort posts
  const allPostsMap = new Map();
  staticPosts.forEach(p => allPostsMap.set(p.slug, p));
  dbPosts.forEach(p => allPostsMap.set(p.slug, p));
  
  const posts = Array.from(allPostsMap.values())
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const baseUrl = 'https://dattasable.com';

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Datta Sable | Surgical BI &amp; Engineering</title>
  <link>${baseUrl}/blog</link>
  <description>Technical case studies, BI frameworks, and high-performance engineering insights by Datta Sable.</description>
  <language>en-us</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
  ${posts.map(post => `
  <item>
    <title><![CDATA[${post.title}]]></title>
    <link>${baseUrl}/blog/${post.slug}</link>
    <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <category><![CDATA[${post.category}]]></category>
    <description><![CDATA[${post.excerpt}]]></description>
  </item>`).join('')}
</channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=1200, stale-while-revalidate=600',
    },
  });
}
