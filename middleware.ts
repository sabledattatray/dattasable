import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  // Allow direct access to ads.txt, robots.txt, sitemap.xml without further processing
  if (['/ads.txt', '/robots.txt', '/sitemap.xml'].includes(path)) {
    return NextResponse.next();
  }
  // Block Suspicious Bots and Scanners
  const userAgent = request.headers.get('user-agent') || '';

  
  // Allow common crawlers and exempt critical public files
  const lowerPath = path.toLowerCase();
  const isCrawlPath = lowerPath === '/ads.txt' || 
                     lowerPath === '/robots.txt' || 
                     lowerPath === '/sitemap.xml' ||
                     !!lowerPath.match(/\.(png|jpg|jpeg|webp|gif|svg|ico)$/i);
  
  // Allow legitimate search engine and social media crawlers
  const isFriendlyBot = 
    /google/i.test(userAgent) || 
    /bing/i.test(userAgent) || 
    /msnbot/i.test(userAgent) ||
    /linkedin/i.test(userAgent) ||
    /twitterbot/i.test(userAgent) ||
    /facebookexternalhit|facebot/i.test(userAgent) ||
    /slackbot/i.test(userAgent) ||
    /discordbot/i.test(userAgent) ||
    /applebot/i.test(userAgent) ||
    /duckduck/i.test(userAgent) ||
    /pinterest/i.test(userAgent) ||
    /whatsapp/i.test(userAgent) ||
    /telegrambot/i.test(userAgent);

  // Comprehensive Malicious/Aggressive Bot Registry
  const suspiciousBots = /bot|spider|crawl|curl|postman|python|go-http|sqlmap|nikto|burp|metasploit|nmap|acunetix|wget|lynx|perl|php|libwww|apachebench|gobuster|dirbuster|mj12bot|ahrefsbot|semrushbot|dotbot|rogerbot|exabot|gigabot|siteexplorer|openlinkprofiler|spyonweb|petalbot|ia_archiver/i;
  
  if (process.env.NODE_ENV === 'production' && suspiciousBots.test(userAgent) && !isFriendlyBot && !isCrawlPath) {
    return new NextResponse('Access Denied: Malicious traffic detected.', { status: 403 });
  }

  const response = NextResponse.next();

  // 1. Content Security Policy (CSP)
  // Note: Adjust 'script-src' and 'img-src' if you use external scripts/images
  const cspHeader = `
    default-src 'self';
    connect-src 'self' https://*.google.com https://accounts.google.com https://*.tableau.com https://*.google-analytics.com https://*.adtrafficquality.google https://*.doubleclick.net https://*.google https://*.google.ad https://*.googlesyndication.com https://*.googleadservices.com;
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://*.tableau.com https://*.google.com https://*.googletagmanager.com https://*.googlesyndication.com https://*.doubleclick.net https://*.google https://*.googleadservices.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com https://accounts.google.com https://*.google https://*.googlesyndication.com;
    img-src 'self' blob: data: https://*.unsplash.com https://images.unsplash.com https://*.googleusercontent.com https://*.tableau.com https://lookerstudio.google.com https://datastudio.google.com https://*.google.com https://*.google-analytics.com https://*.googletagmanager.com https://*.googlesyndication.com https://*.doubleclick.net https://*.adtrafficquality.google https://*.googleadservices.com;
    font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com;
    frame-src 'self' https://*.youtube.com https://*.youtube-nocookie.com https://*.tableau.com https://*.powerbi.com https://lookerstudio.google.com https://datastudio.google.com https://*.google.com https://*.doubleclick.net https://*.google.ad https://*.google https://*.adtrafficquality.google https://*.googlesyndication.com https://*.googleadservices.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'self';
    block-all-mixed-content;
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim();

  response.headers.set('Content-Security-Policy', cspHeader);

  // 2. X-Frame-Options (Prevents Clickjacking)
  // We use SAMEORIGIN instead of DENY to allow embedding within our own site's structure if needed.
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');

  // 3. X-Content-Type-Options (Prevents MIME sniffing)
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // 4. Referrer-Policy
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');

  // 5. Strict-Transport-Security (HSTS) - Only in production
  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }

  // 6. Permissions-Policy (Hardware Security)
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()');

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
    '/((?!api/|_next/static/|_next/image/|favicon.ico|favicon.svg|ads.txt|robots.txt|sitemap.xml|.*\\.png|.*\\.jpg|.*\\.webp).*)',
  ],
};
