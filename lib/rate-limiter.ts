import { NextRequest } from 'next/server';
import { rateLimit } from './security';

export function rateLimiter(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
  return rateLimit(ip, 100);
}
