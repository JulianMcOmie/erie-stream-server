import express from 'express';

const app = express();
const port = 3000;

// Endpoint for univariate (one number at a time)
app.get('/univariate', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const intervalId = setInterval(() => {
    const number = 20 * Math.random(); // Generate a single random number
    res.write(`data: ${number}\n\n`);
  }, 1000);

  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
});

// Endpoint for multivariate (multiple numbers at a time)
app.get('/multivariate', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const intervalId = setInterval(() => {
    const numbers = Array.from({ length: 5 }, () => 20 * Math.random()); // Generate 5 random numbers
    res.write(`data: ${JSON.stringify(numbers)}\n\n`);
  }, 1000);

  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});