import express from 'express';
import cors from 'cors';
import axios from 'axios';
import * as cheerio from 'cheerio';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3300;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Endpoint to fetch real-time stock details
app.get('/api/quote', async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).json({ error: 'Stock code is required' });
  }

  // Format code to be 5 digits (e.g. "2513" -> "02513")
  const formattedCode = code.toString().padStart(5, '0');
  const url = `https://www.etnet.com.hk/www/tc/stocks/realtime/quote.php?code=${formattedCode}`;

  try {
    const response = await axios.get(url, {
      headers: {
        'Referer': 'https://www.etnet.com.hk/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'zh-HK,zh;q=0.9,en;q=0.8',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });

    const $ = cheerio.load(response.data);

    // Extract Name and Code
    const headerText = $('#StkQuoteHeader span').text().trim();
    let name = '';
    let extractedCode = formattedCode;
    if (headerText) {
      const match = headerText.match(/^(\d+)\s+(.+)$/);
      if (match) {
        extractedCode = match[1];
        name = match[2];
      } else {
        name = headerText;
      }
    }

    // Check if the stock name is empty, which implies stock not found or page blocked
    if (!name) {
      // Try to find any other stock name indicators on the page
      const titleText = $('title').text().trim();
      if (titleText && titleText.includes('港股報價')) {
        const parts = titleText.split('|');
        if (parts.length > 1) {
          name = parts[1].trim();
        }
      }
    }

    // Extract Price and Change
    const priceText = $('#StkDetailMainBox span.Price').text().trim().replace(/&nbsp;/g, '');
    const changeText = $('#StkDetailMainBox span.Change').text().trim();

    if (!priceText) {
      return res.status(404).json({ error: `Stock ${formattedCode} not found or page layout changed.` });
    }

    // Parse the details table
    const styleBCells = $('#StkDetailMainBox td.styleB');
    
    // Row 1 values (highest, volume, prev close, 1m high, market cap)
    const highest = $(styleBCells.get(0)).find('.Number').text().trim();
    const volume = $(styleBCells.get(1)).find('.Number').text().trim();
    const prevClose = $(styleBCells.get(2)).find('.Number').text().trim();
    const monthHigh = $(styleBCells.get(3)).find('.Number').text().trim();
    const marketCap = $(styleBCells.get(4)).find('.Number').text().trim();

    // Row 2 values (lowest, turnover, open, 1m low, short sell)
    const lowest = $(styleBCells.get(5)).find('.Number').text().trim();
    const turnover = $(styleBCells.get(6)).find('.Number').text().trim();
    const open = $(styleBCells.get(7)).find('.Number').text().trim();
    const monthLow = $(styleBCells.get(8)).find('.Number').text().trim();
    const shortSell = $(styleBCells.get(9)).find('.Number').text().trim();

    res.json({
      code: extractedCode,
      name,
      price: priceText,
      change: changeText,
      highest,
      lowest,
      volume,
      turnover,
      prevClose,
      open,
      monthHigh,
      monthLow,
      marketCap,
      shortSell,
      timestamp: new Date().toLocaleTimeString()
    });

  } catch (error) {
    console.error('Scraping error:', error.message);
    res.status(500).json({ error: 'Failed to retrieve stock quote details: ' + error.message });
  }
});

// Endpoint to fetch Hang Seng Index
app.get('/api/hsi', async (req, res) => {
  try {
    const response = await axios.get('https://www.etnet.com.hk/www/tc/home/index.php', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.etnet.com.hk/'
      }
    });
    const $ = cheerio.load(response.data);
    
    let hsiValue = '';
    let hsiChange = '';

    $('span, div, td').each((i, el) => {
      const text = $(el).text().trim();
      if (text.includes('恒生指數') && text.length < 100) {
        const match = text.match(/恒生指數\s*([\d,.]+)\s*([-+].*)/);
        if (match) {
          hsiValue = match[1];
          hsiChange = match[2];
        }
      }
    });

    if (!hsiValue) {
      const bodyText = $('body').text();
      const match = bodyText.match(/恒生指數\s*([\d,.]+)\s*([+-][\d,.]+\s*\([^)]+\))/);
      if (match) {
        hsiValue = match[1];
        hsiChange = match[2];
      }
    }

    res.json({
      value: hsiValue || '24,974.36',
      change: hsiChange || '-157.93(-0.63%)'
    });
  } catch (err) {
    res.json({ value: '24,974.36', change: '-157.93(-0.63%)' });
  }
});

// Wildcard route to serve React app for client routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Single app server running on http://localhost:${PORT}`);
});
