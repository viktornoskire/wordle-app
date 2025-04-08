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
  correctWord = '';
  res.send(html);
});

app.get('/about');

app.get('/highscore');

let correctWord = '';

app.post('/api/word', async (req, res) => {
  const amount = req.body.charMount;
  const unique = req.body.unique;

  const words = await loadWordsJSON('./src/words/words.json');

  const chosenWord = loadChosenWord(words, amount, unique);

  if (!chosenWord) {
    res.status(404).json({ error: 'Could not find word!' });
  } else {
    correctWord = chosenWord;
    console.log(correctWord);

    res.status(200).json({ msg: "Don't try to cheat!" });
  }
});

app.post('/api/check-word', (req, res) => {
  let chosen = correctWord;
  let guessed = req.body.guessed;
  const result = wordle(chosen, guessed);

  res.status(201).json({ data: result });
});

app.use('/feedback', express.static('./feedback'));
app.use('/words', express.static('./words'));
app.use('/assets', express.static('../frontend/dist/assets'));

app.listen(5080);
