import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let totalViews = 0;
    let uniqueVisitors = 0;
    const dayCounts: Record<string, number> = {};
    let topPages: any[] = [];

    if ((prisma as any).pageView) {
      totalViews = await (prisma as any).pageView.count();
      const groups = await (prisma as any).pageView.groupBy({ by: ['ipHash'] });
      uniqueVisitors = groups.length;
      
      const last7Days = new Date();
      last7Days.setDate(last7Days.getDate() - 7);
      const viewsByDay = await (prisma as any).pageView.findMany({
        where: { createdAt: { gte: last7Days } },
        select: { createdAt: true }
      });
      viewsByDay.forEach((view: any) => {
        const day = view.createdAt.toISOString().split('T')[0];
        dayCounts[day] = (dayCounts[day] || 0) + 1;
      });

      topPages = await (prisma as any).pageView.groupBy({
        by: ['url'],
        _count: { url: true },
        orderBy: { _count: { url: 'desc' } },
        take: 5
      });
    } else {
      // RAW SQL Fallback: Handles cases where Prisma client is out of sync with schema in dev
      const counts: any = await prisma.$queryRawUnsafe('SELECT COUNT(*) as count FROM "PageView"');
      totalViews = Number(counts[0].count);
      
      const unique: any = await prisma.$queryRawUnsafe('SELECT COUNT(DISTINCT "ipHash") as count FROM "PageView"');
      uniqueVisitors = Number(unique[0].count);

      const days: any = await prisma.$queryRawUnsafe(
        'SELECT TO_CHAR("createdAt", \'YYYY-MM-DD\') as day, COUNT(*) as count FROM "PageView" WHERE "createdAt" > NOW() - INTERVAL \'7 days\' GROUP BY day ORDER BY day ASC'
      );
      days.forEach((d: any) => {
        dayCounts[d.day] = Number(d.count);
      });

      const top: any = await prisma.$queryRawUnsafe(
        'SELECT url, COUNT(*) as count FROM "PageView" GROUP BY url ORDER BY count DESC LIMIT 5'
      );
      topPages = top.map((t: any) => ({
        url: t.url,
        _count: { url: Number(t.count) }
      }));
    }

    return NextResponse.json({
      totalViews,
      uniqueVisitors,
      dayCounts,
      topPages
    });
  } catch (error: any) {
    console.error('Admin Analytics error:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
