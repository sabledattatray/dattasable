import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const posts = await prisma.post.findMany();
  console.log('--- POSTS IN DB ---');
  posts.forEach(post => {
    console.log(`ID: ${post.id}, Title: ${post.title}, Slug: ${post.slug}, Published: ${post.published}, Content Length: ${post.content?.length || 0}`);
  });
  console.log('------------------');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
