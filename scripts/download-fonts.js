const fs = require('fs');
const path = require('path');
const https = require('https');

const fontsDir = path.join(__dirname, '..', 'public', 'fonts');

// Ensure public/fonts exists
if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true });
}

const fontsToDownload = [
  // Syne
  {
    url: 'https://cdn.jsdelivr.net/npm/@fontsource/syne/files/syne-latin-400-normal.woff2',
    name: 'syne-latin-400-normal.woff2'
  },
  {
    url: 'https://cdn.jsdelivr.net/npm/@fontsource/syne/files/syne-latin-600-normal.woff2',
    name: 'syne-latin-600-normal.woff2'
  },
  {
    url: 'https://cdn.jsdelivr.net/npm/@fontsource/syne/files/syne-latin-700-normal.woff2',
    name: 'syne-latin-700-normal.woff2'
  },
  {
    url: 'https://cdn.jsdelivr.net/npm/@fontsource/syne/files/syne-latin-800-normal.woff2',
    name: 'syne-latin-800-normal.woff2'
  },
  // Inter
  {
    url: 'https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-300-normal.woff2',
    name: 'inter-latin-300-normal.woff2'
  },
  {
    url: 'https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-400-normal.woff2',
    name: 'inter-latin-400-normal.woff2'
  },
  {
    url: 'https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-500-normal.woff2',
    name: 'inter-latin-500-normal.woff2'
  },
  {
    url: 'https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-600-normal.woff2',
    name: 'inter-latin-600-normal.woff2'
  },
  {
    url: 'https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-700-normal.woff2',
    name: 'inter-latin-700-normal.woff2'
  },
  // JetBrains Mono
  {
    url: 'https://cdn.jsdelivr.net/npm/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2',
    name: 'jetbrains-mono-latin-400-normal.woff2'
  },
  {
    url: 'https://cdn.jsdelivr.net/npm/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-600-normal.woff2',
    name: 'jetbrains-mono-latin-600-normal.woff2'
  }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: Status code ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${path.basename(dest)}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log('Downloading fonts...');
  for (const font of fontsToDownload) {
    const destPath = path.join(fontsDir, font.name);
    try {
      await downloadFile(font.url, destPath);
    } catch (err) {
      console.error(`Error downloading ${font.name}:`, err.message);
    }
  }
  console.log('Fonts download completed.');
}

main();
