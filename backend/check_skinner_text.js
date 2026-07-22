import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('raw.html', 'utf8');
const $ = cheerio.load(html);

console.log('--- UnderSkinnerDiv Content ---');
console.log($('#UnderSkinnerDiv').text().trim().replace(/\s+/g, ' '));
