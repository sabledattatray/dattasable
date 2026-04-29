import { PrismaClient } from '@prisma/client';
import { posts } from '../app/blog/data';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting Deep Sync of Blog Content...');
  
  for (const post of posts) {
    console.log(`📝 Syncing: ${post.title} [${post.slug}]`);
    
    // Calculate word count for debugging
    const wordCount = post.content.split(/\s+/).length;
    console.log(`   Word count: ${wordCount}`);

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
  
  console.log('✅ Blog content successfully synced to Database!');
}

main()
  .catch((e) => {
    console.error('❌ Sync failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
