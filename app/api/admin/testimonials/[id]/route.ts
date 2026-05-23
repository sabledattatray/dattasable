import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const testimonial = await prisma.testimonial.findUnique({ where: { id: params.id } });
    if (!testimonial) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    return NextResponse.json(testimonial);
  } catch (error: any) {
    console.error('Failed to get testimonial:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { name, role, company, content, rating, status, avatarUrl } = body;

    const existing = await prisma.testimonial.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const updated = await prisma.testimonial.update({
      where: { id: params.id },
      data: {
        name:      name      !== undefined ? name      : existing.name,
        role:      role      !== undefined ? role      : existing.role,
        company:   company   !== undefined ? company   : existing.company,
        content:   content   !== undefined ? content   : existing.content,
        rating:    rating    !== undefined ? rating    : existing.rating,
        status:    status    !== undefined ? status    : existing.status,
        avatarUrl: avatarUrl !== undefined ? avatarUrl : existing.avatarUrl,
      },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error('Failed to update testimonial:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const existing = await prisma.testimonial.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    await prisma.testimonial.delete({ where: { id: params.id } });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Failed to delete testimonial:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
