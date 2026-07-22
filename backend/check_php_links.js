import fs from 'fs';
const html = fs.readFileSync('raw.html', 'utf8');

const regex = /[\w\/_.-]+\.php\?[\w=&.-]+/gi;
const matches = html.match(regex);
console.log('--- PHP URLs found ---');
if (matches) {
  const uniqueMatches = [...new Set(matches)];
  uniqueMatches.forEach(m => console.log(m));
} else {
  console.log('None');
}
