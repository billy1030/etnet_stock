import axios from 'axios';

async function test() {
  try {
    const res = await axios.get('http://localhost:5000/api/quote?code=02513');
    console.log('API Response status:', res.status);
    console.log('API Data:', JSON.stringify(res.data, null, 2));
  } catch (error) {
    console.error('API Error:', error.message);
    if (error.response) {
      console.error('API Error Response:', error.response.data);
    }
  }
}

test();
