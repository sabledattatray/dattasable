import { LRUCache } from 'lru-cache';
import { prisma } from './prisma';
import { NextRequest } from 'next/server';

// --- Rate Limiting ---
const rateLimitCache = new LRUCache<string, number>({
  max: 500,
  ttl: 60 * 1000, // 1 minute window
});

export function rateLimit(ip: string, limit: number = 5) {
  const currentCount = rateLimitCache.get(ip) || 0;
  if (currentCount >= limit) {
    return false;
  }
  rateLimitCache.set(ip, currentCount + 1);
  return true;
}

// --- Audit Logging ---
export async function logAudit({
  userId,
  action,
  status,
  details,
  req,
}: {
  userId?: string;
  action: string;
  status: 'SUCCESS' | 'FAILURE';
  details?: string;
  req?: NextRequest;
}) {
  try {
    const ipAddress = req?.headers.get('x-forwarded-for') || 'unknown';
    const userAgent = req?.headers.get('user-agent') || 'unknown';

    await (prisma as any).auditLog.create({
      data: {
        userId,
        action,
        status,
        details,
        ipAddress,
        userAgent,
      },
    });
  } catch (error) {
    console.error('Audit Log Failed:', error);
  }
}

// --- File Security ---
export const UPLOAD_CONFIG = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
};

export function validateFile(file: File) {
  if (file.size > UPLOAD_CONFIG.maxSize) {
    throw new Error('File too large (max 5MB)');
  }
  if (!UPLOAD_CONFIG.allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type');
  }
  return true;
}
