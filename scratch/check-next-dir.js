const fs = require('fs');
const path = require('path');

function listFiles(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`Directory does not exist: ${dir}`);
    return;
  }
  const files = fs.readdirSync(dir);
  console.log(`Contents of ${dir}:`, files);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      console.log(`  [Dir] ${file}`);
    } else {
      console.log(`  [File] ${file} (${stat.size} bytes)`);
    }
  }
}

console.log("=== Checking .next/server/app ===");
listFiles(path.join(__dirname, '../.next/server/app'));
