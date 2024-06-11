const Game = require('../models/Game');
const gameService = require('../services/games');

module.exports = {
    addGame: async (req, res) => {
        try {
            const newGame = await gameService.addGame();
            res.json(newGame);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    },

    setWinner: async (req, res) => {
        try {
            const { winnerUsername } = req.body;
            const { gameID } = req.params;
    
            const updatedGame = await gameService.setWinner(gameID, winnerUsername);
            
            if (!updatedGame) {
                return res.status(404).json({ error: "Game not found" });
            }
    
            res.json(updatedGame);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    },    
    getGame: async (req, res) => {
        try {
            const { gameID } = req.params;
            const game = await gameService.getGame(gameID);
            
            if (!game) {
                return res.status(404).json({ error: "Game not found" });
            }

            res.json(game);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    },
    getAllGames: async (req, res) => {
        try {
            const games = await gameService.getAllGames();
            res.json(games);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    
};
