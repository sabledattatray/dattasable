import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  
  // Security check: Only allow ADMINs to see the user list
  if (!session || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const users = await prisma.user.findMany({
      include: {
        accounts: {
          select: {
            provider: true
          }
        }
      },
      orderBy: {
        // Show newest users first
        id: 'desc'
      }
    });

    // Format the data for the frontend table
    const formattedUsers = users.map(user => ({
      id: user.id,
      name: user.name || 'Anonymous',
      email: user.email || 'N/A',
      avatar: user.image || '',
      role: user.role,
      // Identify login method
      provider: user.accounts.length > 0 ? user.accounts[0].provider : 'credentials',
      status: 'online', // Placeholder for now
      department: 'N/A',
      phone: 'N/A',
      location: 'N/A',
      createdAt: user.id.includes('cuid') ? new Date().toISOString() : new Date().toISOString(), // Fallback
    }));

    return NextResponse.json(formattedUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
