const mongoose = require('mongoose');

const gameMoveSchema = new mongoose.Schema({
  game: {
    type: mongoose.Schema.Types.ObjectId, 
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
    type: Number,
    required: true,
  },
  computerCard: {
    type: Number,
    required: true,
  }
}, {
});

const GameMove = mongoose.model('GameMove', gameMoveSchema);

module.exports = GameMove;
