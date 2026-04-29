import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Dynamic parameters
    const title = searchParams.get('title') || 'Datta Sable | BI & Data Expert';
    const category = searchParams.get('category') || 'Technical Insights';
    const date = searchParams.get('date') || '';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#000',
            backgroundImage: 'radial-gradient(circle at 25% 25%, #111 0%, #000 100%)',
            padding: '80px',
            position: 'relative',
          }}
        >
          {/* Decorative Grid Background */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              opacity: 0.1,
              backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Accents */}
          <div style={{ position: 'absolute', top: 40, left: 40, width: 2, height: 100, backgroundColor: '#c9f31d' }} />
          <div style={{ position: 'absolute', top: 40, left: 40, width: 100, height: 2, backgroundColor: '#c9f31d' }} />

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <div
              style={{
                backgroundColor: '#c9f31d',
                color: '#000',
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
              }}
            >
              {category}
            </div>
            {date && (
              <div style={{ color: '#666', marginLeft: '20px', fontSize: '18px', fontWeight: 'bold' }}>
                {date}
              </div>
            )}
          </div>

          <h1
            style={{
              fontSize: '72px',
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1.1,
              marginBottom: '40px',
              maxWidth: '900px',
              fontFamily: 'Syne, sans-serif',
            }}
          >
            {title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', marginTop: 'auto' }}>
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: '#c9f31d',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
              }}
            >
              👨‍💻
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
              <div style={{ color: '#fff', fontSize: '24px', fontWeight: 'bold' }}>Datta Sable</div>
              <div style={{ color: '#c9f31d', fontSize: '16px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                BI & Data Engineering Architect
              </div>
            </div>
          </div>

          {/* Branding Logo Corner */}
          <div
            style={{
              position: 'absolute',
              bottom: 40,
              right: 40,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div style={{ color: '#fff', fontSize: '20px', fontWeight: 'bold', letterSpacing: '0.05em' }}>
              DATTASABLE<span style={{ color: '#c9f31d' }}>.COM</span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
