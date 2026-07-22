import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('raw.html', 'utf8');
const $ = cheerio.load(html);

console.log('--- Iframes ---');
$('iframe').each((i, el) => {
  console.log(`iframe src: ${$(el).attr('src')}, id: ${$(el).attr('id')}`);
});

console.log('--- Scripts with src ---');
$('script[src]').each((i, el) => {
  console.log(`script src: ${$(el).attr('src')}`);
});

console.log('--- Inline Scripts containing code or quote ---');
$('script').not('[src]').each((i, el) => {
  const text = $(el).text();
  if (text.includes('code') || text.includes('quote') || text.includes('02513')) {
    console.log(`Inline script snippet: ${text.slice(0, 300)}...`);
  }
});
