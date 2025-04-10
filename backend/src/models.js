import mongoose from 'mongoose';

const highscoreSchema = new mongoose.Schema({
  user: String,
  score: Number,
  time: Number,
  unique: Boolean,
});

const User = mongoose.model('User', highscoreSchema);

export { User };
