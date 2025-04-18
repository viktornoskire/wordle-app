import mongoose from 'mongoose';

const highscoreSchema = new mongoose.Schema({
  user: String,
  time: Number,
  unique: Boolean,
  length: Number,
  guesses: Number,
});

const Users = mongoose.model('Users', highscoreSchema);

export { Users };
