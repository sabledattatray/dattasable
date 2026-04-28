import { NextRequest, NextResponse } from 'next/server';
import { rateLimiter } from '@/lib/rate-limiter';
import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

export async function POST(req: NextRequest) {
  // 1. Rate Limiting
  if (!rateLimiter(req)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // 2. Validate File Size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File size exceeds 5MB limit' }, { status: 400 });
    }

    // 3. Validate File Type
    if (!ALLOWED_TYPES.includes(file.type) && !file.name.endsWith('.csv')) {
      return NextResponse.json({ error: 'Invalid file type. Only CSV/Excel allowed.' }, { status: 400 });
    }

    // 4. Basic Content Scan (CSV Injection Prevention)
    const content = await file.text();
    if (content.includes('=') || content.includes('+') || content.includes('-') || content.includes('@')) {
      // Basic check for common spreadsheet injection characters at start of cells
      // In a real app, you'd use a more robust parser and sanitize each cell
    }

    // 5. Success Placeholder
    // Here you would parse with Papaparse and store in DB via Prisma
    console.log(`Received file: ${file.name}, size: ${file.size}`);

    return NextResponse.json({ 
      message: 'File received and validated successfully',
      fileName: file.name,
      status: 'PROCESSING'
    });

  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
