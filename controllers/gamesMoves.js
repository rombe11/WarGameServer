const gameMoveService = require('../services/gamesMoves');

module.exports = {
    getMovesByGameID: async (req, res) => {
        try {
            const { gameID } = req.params;
            const moves = await gameMoveService.getMovesByGameID(gameID);
            res.json(moves);
        } catch (error) {
            console.error('Error getting moves by gameID:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    addMove: async (req, res) => {
        try {
            const { gameID } = req.params;
            const { username, moveNumber, playerCard, computerCard } = req.body;
            const newMove = await gameMoveService.addMove(gameID, username, moveNumber, playerCard, computerCard);
            res.json(newMove);
        } catch (error) {
            console.error('Error adding move:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};
