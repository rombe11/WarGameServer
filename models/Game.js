const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const gameSchema = new mongoose.Schema({
  winnerUsername: {
    type: String,
  },
}, {
});


const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
