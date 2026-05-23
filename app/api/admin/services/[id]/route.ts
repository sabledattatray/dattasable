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

    const service = await prisma.service.findUnique({ where: { id: params.id } });
    if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    return NextResponse.json(service);
  } catch (error: any) {
    console.error('Failed to get service:', error);
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
    const { title, desc, price, status, category, featured, orders } = body;

    const existing = await prisma.service.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const updated = await prisma.service.update({
      where: { id: params.id },
      data: {
        title:    title    !== undefined ? title    : existing.title,
        desc:     desc     !== undefined ? desc     : existing.desc,
        price:    price    !== undefined ? price    : existing.price,
        status:   status   !== undefined ? status   : existing.status,
        category: category !== undefined ? category : existing.category,
        featured: featured !== undefined ? featured : existing.featured,
        orders:   orders   !== undefined ? orders   : existing.orders,
      },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error('Failed to update service:', error);
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

    const existing = await prisma.service.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    await prisma.service.delete({ where: { id: params.id } });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Failed to delete service:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
