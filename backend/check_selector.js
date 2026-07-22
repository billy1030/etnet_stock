import axios from 'axios';
import fs from 'fs';

async function test() {
  try {
    const url = 'https://www.etnet.com.hk/www/tc/stocks/realtime/quote.php?code=02513';
    const response = await axios.get(url, {
      headers: {
        'Referer': 'https://www.etnet.com.hk/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'zh-HK,zh;q=0.9,en;q=0.8'
      }
    });
    fs.writeFileSync('raw.html', response.data);
    console.log('Saved raw.html');
  } catch (error) {
    console.error('Error:', error.message);
  }
}
test();
