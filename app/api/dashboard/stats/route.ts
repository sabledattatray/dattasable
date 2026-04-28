import { NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma'; // Uncomment when DB is connected

export async function GET() {
  try {
    // Phase 1: Mock Data (for UI compatibility)
    const stats = [
      { id: '1', type: 'VISITORS', value: '5.9M', label: 'Total Visitors' },
      { id: '2', type: 'BOUNCE_RATE', value: '62.1%', label: 'Bounce Rate' },
      { id: '3', type: 'CONVERSION', value: '21.9%', label: 'Conversion' },
      { id: '4', type: 'REFERRALS', value: '470', label: 'Active Referrals' },
    ];

    /* 
    // Phase 2: Real Database Fetch
    const dbStats = await prisma.analyticsStat.findMany({
      orderBy: { date: 'desc' },
      take: 4
    });
    */

    return NextResponse.json(stats);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
