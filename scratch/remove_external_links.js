const fs = require('fs');
const path = require('path');

const directoryPath = 'd:\\Datta Sable\\dattasable\\aurora\\src';

function walk(dir, callback) {
  fs.readdirSync(dir).forEach( f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

walk(directoryPath, (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Remove or redirect external links
    if (content.includes('https://themewagon.com')) {
        content = content.replace(/https:\/\/themewagon\.com\/?/g, '#!');
        changed = true;
    }
    if (content.includes('https://mui.com/store')) {
        content = content.replace(/https:\/\/mui\.com\/store\/items\/.*?\b/g, '#!');
        changed = true;
    }
    if (content.includes('https://github.com/themewagon')) {
        content = content.replace(/https:\/\/github\.com\/themewagon\/.*?\b/g, '#!');
        changed = true;
    }

    // Replace ThemeWagon text
    if (content.includes('ThemeWagon')) {
        content = content.replace(/ThemeWagon/g, 'Datta Sable');
        changed = true;
    }

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
    }
  }
});
