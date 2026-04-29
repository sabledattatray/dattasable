
import { PrismaClient } from '@prisma/client';
import { posts } from './app/blog/data';

const prisma = new PrismaClient();

async function main() {
  console.log(`Loaded ${posts.length} posts from data.ts`);
  
  for (const post of posts) {
    if (post.slug === 'data-quality-frameworks') {
      console.log(`Syncing ${post.slug}: ${post.content.length} characters`);
    }
    
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        category: post.category,
        excerpt: post.excerpt,
        content: post.content,
        readTime: post.readTime,
        date: post.date,
        color: post.color,
        icon: post.icon,
        image: post.image,
        published: true,
      },
      create: {
        slug: post.slug,
        title: post.title,
        category: post.category,
        excerpt: post.excerpt,
        content: post.content,
        readTime: post.readTime,
        date: post.date,
        color: post.color,
        icon: post.icon,
        image: post.image,
        published: true,
      },
    });
  }
  console.log('Sync complete!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
