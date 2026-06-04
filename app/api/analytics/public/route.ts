import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Cache for 30 seconds to avoid hammering the DB on every poll
export const revalidate = 30;

export async function GET() {
  try {
    const now = new Date();
    const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const last7d  = new Date(now.getTime() - 7  * 24 * 60 * 60 * 1000);

    const [
      totalViews,
      views24h,
      visitorsGroup,
      topPages,
      viewsByDay,
    ] = await Promise.all([
      // All-time total page views
      prisma.pageView.count(),

      // Views in last 24 hours
      prisma.pageView.count({ where: { createdAt: { gte: last24h } } }),

      // Unique visitors (by hashed IP) — last 7 days
      prisma.pageView.groupBy({
        by: ['ipHash'],
        where: { createdAt: { gte: last7d } },
        _count: { id: true },
      }),

      // Top 5 most visited pages (all time)
      prisma.pageView.groupBy({
        by: ['url'],
        _count: { url: true },
        orderBy: { _count: { url: 'desc' } },
        take: 5,
      }),

      // Daily view counts for last 7 days (raw SQL for date bucketing)
      prisma.$queryRaw<{ day: string; count: bigint }[]>`
        SELECT TO_CHAR("createdAt", 'YYYY-MM-DD') AS day, COUNT(*) AS count
        FROM "public"."PageView"
        WHERE "createdAt" > NOW() - INTERVAL '7 days'
        GROUP BY day
        ORDER BY day ASC
      `,
    ]);

    const uniqueVisitors7d = visitorsGroup.length;

    // Build a map day => count for the chart
    const dayCounts: Record<string, number> = {};
    for (const row of viewsByDay) {
      dayCounts[row.day] = Number(row.count);
    }

    // Build top pages with relative path
    const pages = topPages.map((p) => ({
      path: p.url.replace(/^https?:\/\/[^/]+/, '') || '/',
      views: p._count.url,
    }));

    return NextResponse.json(
      {
        totalViews,
        views24h,
        uniqueVisitors7d,
        topPages: pages,
        dayCounts,
        generatedAt: now.toISOString(),
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
        },
      }
    );
  } catch (error: any) {
    console.error('[Public Analytics API]', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
