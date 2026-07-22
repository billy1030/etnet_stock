import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('raw.html', 'utf8');
const $ = cheerio.load(html);

$('*').each((i, el) => {
  const text = $(el).text().trim();
  if (text.includes('1,223.000')) {
    console.log(`Tag: ${el.name}, ID: ${$(el).attr('id') || 'none'}, Class: ${$(el).attr('class') || 'none'}, HTML: ${$(el).html().slice(0, 200)}...`);
  }
});
