import express from 'express';
import fs from 'fs/promises';
import wordle from './feedback/feedback.js';

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.get('/', async (req, res) => {
  const buf = await fs.readFile('../frontend/dist/index.html');
  const html = buf.toString();
  res.send(html);
});

app.get('/about');

app.get('/highscore');

app.post('/api/check-word', (req, res) => {
  let chosen = req.body.chosen;
  let guessed = req.body.guessed;
  const result = wordle(chosen, guessed);

  res.status(201).json({ data: result });
});

app.use('/feedback', express.static('./feedback'));
app.use('/assets', express.static('../frontend/dist/assets'));

app.listen(5080);
