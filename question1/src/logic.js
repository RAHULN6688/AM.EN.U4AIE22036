const axios = require('axios');

const windowSize = 10;
const timeout = 500;
const baseUrl = 'http://20.244.56.144/evaluation-service';
const token = process.env.ACCESS_TOKEN;

let numbers = [];

const endpoints = {
  p: `${baseUrl}/primes`,
  f: `${baseUrl}/fibo`,
  e: `${baseUrl}/even`,
  r: `${baseUrl}/rand`
};

async function getNumbers(id) {
  const prev = [...numbers];
  let fetched = [];
  
  try {
    const res = await axios.get(endpoints[id], {
      headers: { Authorization: `Bearer ${token}` },
      timeout
    });
    fetched = res.data.numbers.filter(n => typeof n === 'number');
    console.log(`Fetched ${id}:`, fetched, `Status: ${res.status}`);
  } catch (err) {
    console.log(`Test server error for ${id}:`, {
      message: err.message,
      status: err.response?.status,
      data: err.response?.data
    });
  }

  const all = [...new Set([...numbers, ...fetched])];
  numbers = all.length > windowSize ? all.slice(-windowSize) : all;

  const avg = numbers.length ? (numbers.reduce((a, b) => a + b, 0) / numbers.length).toFixed(2) : 0;

  return {
    windowPrevState: prev,
    windowCurrState: numbers,
    numbers: fetched,
    avg: parseFloat(avg)
  };
}

module.exports = { getNumbers };