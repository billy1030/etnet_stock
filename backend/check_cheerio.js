import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('raw.html', 'utf8');
const $ = cheerio.load(html);

console.log('--- Checking classes of divs ---');
$('div').each((i, el) => {
  const id = $(el).attr('id');
  const cls = $(el).attr('class');
  const text = $(el).text().trim().replace(/\s+/g, ' ');
  if (id || cls) {
    if (text.includes('智譜') || text.includes('1,160') || text.includes('1160')) {
      console.log(`DIV -> ID: ${id}, Class: ${cls}, Text preview: ${text.slice(0, 100)}`);
    }
  }
});

console.log('--- Checking classes of spans ---');
$('span').each((i, el) => {
  const id = $(el).attr('id');
  const cls = $(el).attr('class');
  const text = $(el).text().trim().replace(/\s+/g, ' ');
  if (text.includes('智譜') || text.includes('1,160') || text.includes('1160') || text.includes('59.000')) {
    console.log(`SPAN -> ID: ${id}, Class: ${cls}, Text: ${text}`);
  }
});
