import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('raw.html', 'utf8');
const $ = cheerio.load(html);

console.log('--- Searching for elements containing Nominal or Figure ---');
$('*').each((i, el) => {
  const id = $(el).attr('id') || '';
  const cls = $(el).attr('class') || '';
  if (id.toLowerCase().includes('nominal') || id.toLowerCase().includes('figure') ||
      cls.toLowerCase().includes('nominal') || cls.toLowerCase().includes('figure') ||
      id.toLowerCase().includes('stkquote') || cls.toLowerCase().includes('stkquote')) {
    console.log(`Tag: ${el.name}, ID: ${id}, Class: ${cls}, Text: ${$(el).text().trim().replace(/\s+/g, ' ').slice(0, 100)}`);
  }
});
