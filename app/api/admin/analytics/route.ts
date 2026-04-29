import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!prisma.pageView) {
      return NextResponse.json({
        totalViews: 0,
        uniqueVisitors: 0,
        dayCounts: {},
        topPages: [],
        warning: 'DATABASE_SYNC_REQUIRED'
      });
    }

    const totalViews = await prisma.pageView.count();
    const uniqueVisitors = await prisma.pageView.groupBy({
      by: ['ipHash'],
    }).then(groups => groups.length);

    // Get views by day for the last 7 days
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);
    
    const viewsByDay = await prisma.pageView.findMany({
      where: {
        createdAt: { gte: last7Days }
      },
      select: { createdAt: true }
    });

    const dayCounts: Record<string, number> = {};
    viewsByDay.forEach(view => {
      const day = view.createdAt.toISOString().split('T')[0];
      dayCounts[day] = (dayCounts[day] || 0) + 1;
    });

    // Top Pages
    const topPages = await prisma.pageView.groupBy({
      by: ['url'],
      _count: { url: true },
      orderBy: { _count: { url: 'desc' } },
      take: 5
    });

    return NextResponse.json({
      totalViews,
      uniqueVisitors,
      dayCounts,
      topPages
    });
  } catch (error) {
    console.error('Admin Analytics error:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
