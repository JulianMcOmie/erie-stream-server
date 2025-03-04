import express from 'express';
import path from 'path';

const app = express();
const port = 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Root endpoint - serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Stream endpoint
app.get('/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const {
    type = 'univariate',
    points = '5',
    interval = '1000',
    min = '0',
    max = '20'
  } = req.query;

  const numPoints = parseInt(points as string);
  const updateInterval = parseInt(interval as string);
  const minValue = parseFloat(min as string);
  const maxValue = parseFloat(max as string);

  const intervalId = setInterval(() => {
    if (type === 'univariate') {
      const number = minValue + (maxValue - minValue) * Math.random();
      res.write(`data: ${number}\n\n`);
    } else {
      const numbers = Array.from({ length: numPoints }, () => 
        minValue + (maxValue - minValue) * Math.random()
      );
      res.write(`data: ${JSON.stringify(numbers)}\n\n`);
    }
  }, updateInterval);

  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});