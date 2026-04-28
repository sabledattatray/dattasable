import { NextResponse, NextRequest } from 'next/server';

export function middleware(_request: NextRequest) {
  const response = NextResponse.next();

  // 1. Content Security Policy (CSP)
  // Note: Adjust 'script-src' and 'img-src' if you use external scripts/images
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com;
    img-src 'self' blob: data: https://*.googleusercontent.com;
    font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim();

  response.headers.set('Content-Security-Policy', cspHeader);

  // 2. X-Frame-Options (Prevents Clickjacking)
  response.headers.set('X-Frame-Options', 'DENY');

  // 3. X-Content-Type-Options (Prevents MIME sniffing)
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // 4. Referrer-Policy
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');

  // 5. Strict-Transport-Security (HSTS) - Only in production
  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }

  return response;
}

// Optional: Configure middleware to run only on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
