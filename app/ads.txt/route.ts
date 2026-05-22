import { NextResponse } from 'next/server';

export async function GET() {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'pub-4242010382827250';
  
  // Format the ads.txt content
  // Remove "ca-" prefix if the user included it (e.g. ca-pub-xxx -> pub-xxx)
  const cleanPublisherId = publisherId.replace(/^ca-/, '');
  
  const content = `google.com, ${cleanPublisherId}, DIRECT, f08c47fec0942fa0\n`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
