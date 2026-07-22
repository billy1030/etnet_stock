import fs from 'fs';
const html = fs.readFileSync('raw.html', 'utf8');

console.log('Includes StkQuoteFigure (case-sensitive):', html.includes('StkQuoteFigure'));
console.log('Includes StkQuoteFigureNorminal (case-sensitive):', html.includes('StkQuoteFigureNorminal'));
console.log('Includes StkQuoteFigureLeft (case-sensitive):', html.includes('StkQuoteFigureLeft'));

// Print lines matching StkQuoteFigure
const lines = html.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('StkQuoteFigure')) {
    console.log(`Line ${idx + 1}: ${line.trim().slice(0, 150)}`);
  }
});
