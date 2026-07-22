import axios from 'axios';

async function testCode(code) {
  try {
    const res = await axios.get(`http://localhost:3300/api/quote?code=${code}`);
    console.log(`--- Result for ${code} ---`);
    console.log('Status:', res.status);
    console.log('Data:', JSON.stringify(res.data, null, 2));
  } catch (error) {
    console.error(`Error for ${code}:`, error.message);
    if (error.response) {
      console.error('Response Data:', error.response.data);
    }
  }
}

async function run() {
  await testCode('02513');
  await testCode('7709');
}

run();
