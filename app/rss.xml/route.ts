import { getPublishedBlogPosts } from '@/lib/blog-posts';

export async function GET() {
  let posts: any[] = [];
  try {
    posts = await getPublishedBlogPosts();
  } catch (error) {
    console.error('Failed to retrieve blog posts for RSS:', error);
  }

  const baseUrl = 'https://dattasable.com';

  const rssItems = posts.map(post => {
    const postDate = (post as any).date || (post as any).createdAt || (post as any).updatedAt || new Date();
    const formattedDate = new Date(postDate).toUTCString();
    
    return `
  <item>
    <title><![CDATA[${post.title}]]></title>
    <link>${baseUrl}/blog/${post.slug}</link>
    <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
    <pubDate>${formattedDate}</pubDate>
    <category><![CDATA[${post.category}]]></category>
    <description><![CDATA[${post.excerpt}]]></description>
  </item>`;
  }).join('');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Datta Sable | Surgical BI &amp; Engineering</title>
  <link>${baseUrl}/blog</link>
  <description>Technical case studies, BI frameworks, and high-performance engineering insights by Datta Sable.</description>
  <language>en-us</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
  ${rssItems}
</channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=1200, stale-while-revalidate=600',
    },
  });
}
