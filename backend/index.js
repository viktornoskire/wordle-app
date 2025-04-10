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

app.get('/about', (req, res) => {});

app.get('/highscore', (req, res) => {});

let correctWord = '';
let startTime = null;
let endTime = null;
let duration = null;

const HIGHCORES = [];

/* //////////

  Returns a randomized word
*/ //////////
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
    startTime = new Date();

    res.status(200).json({ msg: "Don't try to cheat!" });
  }
});

/* //////////

  Check the words equality
*/ //////////
app.post('/api/check-word', (req, res) => {
  let chosen = correctWord;
  let guessed = req.body.guessed;
  const payload = wordle(chosen, guessed);

  if (payload.result === true) {
    endTime = new Date();
    duration = Math.round((endTime - startTime) / 1000);
  }

  res.status(201).json({ data: payload });
});

/* //////////

  Returns a randomized word
*/ //////////
app.post('/api/user-info', (req, res) => {
  const user = req.body.user;
  HIGHCORES.push({
    username: user,
    score: Math.round(duration * 4.5),
    time: duration,
  });
  console.log(HIGHCORES);
});

app.use('/assets', express.static('../frontend/dist/assets'));

app.listen(5080);
