import mongoose from 'mongoose';

const highscoreSchema = new mongoose.Schema({
  user: String,
  score: Number,
  time: Number,
  unique: Boolean,
  guesses: Number,
});

const Users = mongoose.model('Users', highscoreSchema);

export { Users };
