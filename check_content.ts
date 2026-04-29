
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const post = await prisma.post.findUnique({
    where: { slug: 'data-quality-frameworks' }
  });
  if (post) {
    console.log("--- DATABASE CONTENT START ---");
    console.log(post.content.substring(0, 2000));
    console.log("--- DATABASE CONTENT END ---");
  } else {
    console.log('Post not found!');
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
