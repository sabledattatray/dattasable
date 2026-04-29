const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

// We can't easily import from TS in JS without a build step, 
// so we'll read the data.ts file and extract the posts array using a regex or simple parsing
// Actually, it's safer to just run the TS script using the correct environment.
// But I'll try to run it via 'npx tsx' first with the bypass.

const { execSync } = require('child_process');

try {
    console.log('Attempting to run sync_blog.ts via tsx...');
    execSync('npx tsx scripts/sync_blog.ts', { stdio: 'inherit', cwd: 'd:/Datta Sable/dattasable' });
    console.log('Sync successful!');
} catch (err) {
    console.error('Failed to run TS sync script directly. Trying fallback...');
    // Fallback: If we really can't run TS, we'd have to parse data.ts
    console.error(err);
}
