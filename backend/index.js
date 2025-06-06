import express from 'express';
import fs from 'fs/promises';
import loadWordsJSON from './src/loadWordJSON.js';
import wordle from './src/feedback/feedback.js';
import loadChosenWord from './src/words/words.js';
import mongoose from 'mongoose';
import { Users } from './src/models.js';

const app = express();

app.use(express.json());
app.set('view engine', 'pug');

app.get('/', async (req, res) => {
  const buf = await fs.readFile('../frontend/dist/index.html');
  const html = buf.toString();
  correctWord = '';
  startTime = null;
  endTime = null;
  duration = null;

  settings = {};
  res.send(html);
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/highscores', async (req, res) => {
  await mongoose.connect(process.env.MONGODB_URL);

  const highscores = await Users.find();

  res.render('highscores', { highscores });
});

let correctWord = '';
let startTime = null;
let endTime = null;
let duration = null;

let settings = {};

/* //////////

  Returns a randomized word
*/ //////////
app.post('/api/word', async (req, res) => {
  settings = {
    amount: req.body.charMount,
    unique: req.body.unique,
  };

  const words = await loadWordsJSON('./src/words/words.json');

  const chosenWord = loadChosenWord(words, settings.amount, settings.unique);

  if (!chosenWord) {
    res.status(404).json({ error: 'Could not find word!' });
  } else {
    correctWord = chosenWord;
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

  Send user info to mongoDB 
*/ //////////
app.post('/api/user-info', async (req, res) => {
  const user = req.body.user;
  const guesses = req.body.guesses;
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    await Users.insertOne({
      user: user,
      time: duration,
      unique: settings.unique,
      length: correctWord.length,
      guesses,
    });
    res.status(201).json({ completed: true });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.use('/assets', express.static('../frontend/dist/assets'));
app.use('/static', express.static('./static'));

app.listen(5080);
