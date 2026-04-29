import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url, referrer } = body;
    
    const userAgent = req.headers.get('user-agent') || 'unknown';
    const ip = req.headers.get('x-forwarded-for') || req.ip || '127.0.0.1';
    
    // Hash IP for privacy compliance (GDPR)
    const ipHash = crypto.createHash('sha256').update(ip).digest('hex').substring(0, 16);

    // Save to database with defensive check for model existence
    if (prisma.pageView) {
      await prisma.pageView.create({
        data: {
          url,
          referrer,
          userAgent,
          ipHash,
        }
      });
    } else {
      console.warn('⚠️ Analytics Tracker: PageView model not yet available. Please restart server.');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Tracking error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
