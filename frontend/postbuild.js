// This script ensures the build output is properly configured for Netlify
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure the index.html file has the correct base path
const indexPath = join(__dirname, 'dist', 'index.html');

if (existsSync(indexPath)) {
  let content = readFileSync(indexPath, 'utf8');
  
  // Update script and link paths to be relative
  content = content
    .replace(/\/src\//g, './')
    .replace(/\/assets\//g, './assets/');
    
  writeFileSync(indexPath, content, 'utf8');
  console.log('✅ Postbuild: Updated index.html for production');
} else {
  console.warn('⚠️  Postbuild: Could not find index.html in dist folder');
}
