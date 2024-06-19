const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  won: {
    type: Boolean,
    default: false,
  },
 
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
