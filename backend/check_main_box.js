import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('raw.html', 'utf8');
const $ = cheerio.load(html);

console.log('--- HTML of StkDetailMainBox ---');
console.log($('#StkDetailMainBox').html());
