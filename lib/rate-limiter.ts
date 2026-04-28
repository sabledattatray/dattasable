import { NextRequest, NextResponse } from 'next/server';

const ipCache = new Map<string, { count: number; lastReset: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 100; // 100 requests per minute

export function rateLimiter(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
  const now = Date.now();
  const userData = ipCache.get(ip) || { count: 0, lastReset: now };

  if (now - userData.lastReset > RATE_LIMIT_WINDOW) {
    userData.count = 0;
    userData.lastReset = now;
  }

  userData.count++;
  ipCache.set(ip, userData);

  if (userData.count > MAX_REQUESTS) {
    return false;
  }

  return true;
}
