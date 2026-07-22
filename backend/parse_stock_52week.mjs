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
    
    // Dump all li tags under StkDetailMainBox or nearby containers
    console.log('--- Scanning li tags ---');
    $('li').each((i, el) => {
      const text = $(el).text().trim();
      if (text.includes('52周')) {
        console.log(`li text: "${text}", html: "${$(el).html()}"`);
        // print siblings
        console.log('Next sibling text:', $(el).next().text().trim());
      }
    });
    
    // Dump all tables/td tags containing 52周
    console.log('\n--- Scanning td/td tags ---');
    $('td').each((i, el) => {
      const text = $(el).text().trim();
      if (text.includes('52周')) {
        console.log(`td text: "${text}", html: "${$(el).html()}"`);
      }
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

test();
