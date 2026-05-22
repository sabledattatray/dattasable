const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("=== Querying Audit Logs ===");
  try {
    const logs = await prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50
    });
    console.log("Last 50 Audit Logs:", JSON.stringify(logs, null, 2));
  } catch (err) {
    console.error("Error querying audit logs:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
