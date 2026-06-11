import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const body = await req.json();
    const { action, oldName, newName, name } = body;

    if (!action) {
      return NextResponse.json({ error: 'Action is required' }, { status: 400 });
    }

    if (action === 'rename') {
      if (!oldName || !newName) {
        return NextResponse.json({ error: 'oldName and newName are required' }, { status: 400 });
      }

      // Bulk update posts with the old category name to the new name
      const result = await prisma.post.updateMany({
        where: { category: oldName },
        data: { category: newName },
      });

      return NextResponse.json({ success: true, updatedCount: result.count });
    }

    if (action === 'delete') {
      if (!name) {
        return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
      }

      // Reassign posts in that category to the default "Tech Trends" category
      const result = await prisma.post.updateMany({
        where: { category: name },
        data: { category: 'Tech Trends' },
      });

      return NextResponse.json({ success: true, updatedCount: result.count });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error('API Category POST error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process category request' },
      { status: 500 }
    );
  }
}
