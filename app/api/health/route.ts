import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const healthCheck: any = {
    uptime: process.uptime(),
    timestamp: Date.now(),
    status: 'UP',
    checks: {
      database: 'DOWN',
    }
  };

  try {
    // Check DB connectivity
    await prisma.$queryRaw`SELECT 1`;
    healthCheck.checks.database = 'UP';
  } catch (e) {
    healthCheck.status = 'DEGRADED';
    healthCheck.error = 'Database connection failed';
  }

  return NextResponse.json(healthCheck, {
    status: healthCheck.status === 'UP' ? 200 : 503,
  });
}
