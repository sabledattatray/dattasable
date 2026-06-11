import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';
import { readdir, stat } from 'fs/promises';
import path from 'path';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { blobs } = await list();
      const mapped = blobs.map(b => ({
        id: b.url,
        name: b.pathname,
        url: b.url,
        size: `${(b.size / 1024).toFixed(1)} KB`,
        date: new Date(b.uploadedAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
      }));
      return NextResponse.json(mapped);
    } else {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      try {
        const files = await readdir(uploadDir);
        const mapped = [];
        for (const file of files) {
          const filePath = path.join(uploadDir, file);
          const fileStat = await stat(filePath);
          mapped.push({
            id: `/uploads/${file}`,
            name: file,
            url: `/uploads/${file}`,
            size: `${(fileStat.size / 1024).toFixed(1)} KB`,
            date: new Date(fileStat.mtime).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }),
          });
        }
        return NextResponse.json(mapped);
      } catch (err) {
        // Directory may not exist yet if no uploads occurred locally
        return NextResponse.json([]);
      }
    }
  } catch (error) {
    console.error('API Media GET error:', error);
    return NextResponse.json({ error: 'Failed to list media' }, { status: 500 });
  }
}
