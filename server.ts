import express from 'express';

const app = express();
const port = 3000;

app.get('/numbers', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  let counter = 0;
  const intervalId = setInterval(() => {
    counter = 20 * Math.random();
    res.write(`data: ${counter}\n\n`);
  }, 1000);

  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/numbers`);
});
