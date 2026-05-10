import { NextResponse } from 'next/server';

export async function GET() {
  // Your specific AdSense Publisher ID line
  const adsTxt = `google.com, pub-4242010382827250, DIRECT, f08c47fec0942fa0`;
  
  return new NextResponse(adsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
    },
  });
}
