const GameMove = require('../models/GameMove');

module.exports = {
    getMovesByGameID: async (gameID) => {
        try {
            const moves = await GameMove.find({ game: gameID });
            return moves;
        } catch (error) {
            console.error('Error fetching moves by gameID:', error);
            throw error;
        }
    },
    addMove: async (gameID, username, moveNumber, playerCard, computerCard) => {
        try {
            const newMove = new GameMove({
                game: gameID,
                moveNumber: moveNumber,
                username: username,
                playerCard: playerCard,
                computerCard: computerCard
            });
            const savedMove = await newMove.save();
            return savedMove;
        } catch (error) {
            console.error('Error adding move:', error);
            throw error;
        }
    }
};
