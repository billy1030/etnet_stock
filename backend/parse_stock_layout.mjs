import axios from 'axios';
import * as cheerio from 'cheerio';

async function test() {
  const code = '02513';
  const url = `https://www.etnet.com.hk/www/tc/stocks/realtime/quote.php?code=${code}`;
  try {
    const response = await axios.get(url, {
      headers: {
        'Referer': 'https://www.etnet.com.hk/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    const $ = cheerio.load(response.data);
    
    console.log('--- Searching for 52-week or 52week in page text ---');
    $('*').each((i, el) => {
      const text = $(el).text().trim();
      if ((text.includes('52') || text.includes('周') || text.includes('年')) && text.length < 100) {
        console.log(`Element <${el.name} class="${$(el).attr('class') || ''}">: "${text}"`);
      }
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

test();
