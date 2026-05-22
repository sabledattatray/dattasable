const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("=== DB Connection Check ===");
  try {
    const userCount = await prisma.user.count();
    console.log("Users count:", userCount);
    
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        emailVerified: true
      }
    });
    console.log("Users in DB:", users);

    const projectCount = await prisma.project.count();
    console.log("Projects count:", projectCount);

    const postCount = await prisma.post.count();
    console.log("Posts count:", postCount);
  } catch (err) {
    console.error("Database connection/query error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
