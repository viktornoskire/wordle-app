import express from 'express';
import fs from 'fs/promises';
import loadWordsJSON from './src/loadWordJSON.js';
import wordle from './src/feedback/feedback.js';
import loadChosenWord from './src/words/words.js';

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

let word = '';

app.post('/api/word', async (req, res) => {
  const amount = req.body.charMount;
  const unique = req.body.unique;

  const words = await loadWordsJSON('./src/words/words.json');

  const chosenWord = loadChosenWord(words, amount, unique);
  word = chosenWord;
  console.log(word);

  res.status(200).json({ msg: "Don't try to cheat!" });
});

app.post('/api/check-word', (req, res) => {
  let chosen = word;
  let guessed = req.body.guessed;
  const result = wordle(chosen, guessed);

  res.status(201).json({ data: result });
});

app.use('/feedback', express.static('./feedback'));
app.use('/words', express.static('./words'));
app.use('/assets', express.static('../frontend/dist/assets'));

app.listen(5080);
