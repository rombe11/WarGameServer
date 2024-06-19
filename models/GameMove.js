const mongoose = require('mongoose');

const gameMoveSchema = new mongoose.Schema({
  game: {
    type: mongoose.Schema.Types.ObjectId, 
    ref:"Game",
    required: true,
  },
  moveNumber: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  playerCard: {
    type: String,
    required: true,
  },
  computerCard: {
    type: String,
    required: true,
  }
}, {
}, { collection: 'moves' });

const GameMove = mongoose.model('Moves', gameMoveSchema);

module.exports = GameMove;
