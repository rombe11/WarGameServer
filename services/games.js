const Game = require('../models/Game');

module.exports = {
  addGame: async (username) => {
    try {
      const newGame = new Game({ username: username });
      return await newGame.save();
    } catch (error) {
      console.error('Error adding game:', error);
      throw error;
    }
  },

  setWinner: async (gameID, winnerUsername) => {
    try {
      const updatedGame = await Game.findByIdAndUpdate(gameID, { username: winnerUsername, won: true }, { new: true });
      return updatedGame;
    } catch (error) {
      console.error('Error setting winner:', error);
      throw error;
    }
  },

  getGame: async (gameID) => {
    try {
      return await Game.findById(gameID);
    } catch (error) {
      console.error('Error getting game:', error);
      throw error;
    }
  },

  getAllGames: async () => {
    try {
      return await Game.find();
    } catch (error) {
      console.error('Error getting all games:', error);
      throw error;
    }
  },
  getPlayerWithMaxGames: async () => {
    try {
      const result = await Game.aggregate([
        {
          $group: {
            _id: '$username', 
            totalGames: { $sum: 1 } 
          }
        },
        {
          $sort: { totalGames: -1 } 
        },
        {
          $limit: 1 
        }
      ]);
  
      if (result.length > 0) {
        return { username: result[0]._id, totalGames: result[0].totalGames };
      } else {
        return null;
      }
    } catch (error) {
      throw new Error(`Error in getPlayerWithMaxGames service: ${error.message}`);
    }
  },
}
