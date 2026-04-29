const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    const posts = await prisma.post.findMany();
    console.log('--- POSTS IN DB ---');
    posts.forEach(post => {
      console.log(`ID: ${post.id}, Title: ${post.title}, Slug: ${post.slug}, Published: ${post.published}, Content Length: ${post.content?.length || 0}`);
    });
    console.log('------------------');
  } catch (err) {
    console.error('Error fetching posts:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
