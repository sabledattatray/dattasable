import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const directory = 'public/images/blog/';

fs.readdirSync(directory).forEach(file => {
  if (file.endsWith('.png')) {
    const inputPath = path.join(directory, file);
    const outputPath = path.join(directory, file.replace('.png', '.webp'));
    
    sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath)
      .then(() => {
        console.log(`Optimized: ${file} -> ${file.replace('.png', '.webp')}`);
        // Optionally remove the old PNG to save space
        // fs.unlinkSync(inputPath); 
      })
      .catch(err => {
        console.error(`Error optimizing ${file}:`, err);
      });
  }
});
