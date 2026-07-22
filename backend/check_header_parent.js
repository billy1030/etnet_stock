import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('raw.html', 'utf8');
const $ = cheerio.load(html);

console.log('--- HTML around #StkQuoteHeader ---');
console.log($('#StkQuoteHeader').parent().html().slice(0, 1000));
