import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('raw.html', 'utf8');
const $ = cheerio.load(html);

function getPath(el) {
  const path = [];
  let current = el;
  while (current && current.name !== 'root') {
    let name = current.name;
    const id = $(current).attr('id');
    const cls = $(current).attr('class');
    if (id) name += `#${id}`;
    else if (cls) name += `.${cls.split(/\s+/).join('.')}`;
    path.unshift(name);
    current = current.parent;
  }
  return path.join(' > ');
}

console.log('--- Finding price paths ---');
$('*').each((i, el) => {
  const text = $(el).clone().children().remove().end().text().trim();
  if (text === '1,202.000') {
    console.log(`Path: ${getPath(el)}`);
  }
  if (text.includes('-17.000')) {
    console.log(`Path (change): ${getPath(el)}`);
  }
});
