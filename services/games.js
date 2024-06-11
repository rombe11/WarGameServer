const Game = require('../models/Game');

module.exports = {
    addGame: async () => {
        const newGame = new Game({ winnerUsername: "" });
        return newGame.save();
    },
    setWinner: async (gameID, winnerUsername) => {
        return Game.findByIdAndUpdate(gameID, { winnerUsername }, { new: true });
    },
    getGame: async (gameID) => {
        return Game.findById(gameID);
    },
    getAllGames: async () => {
        return Game.find();
    },
};

