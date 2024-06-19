const User = require('../models/User');
const Game = require('../models/Game');

module.exports = {
    getAllUsers: async () => {
        return User.find();
    },
    getUserByUsername: async (username) => {
        return User.findOne({ username: username });
    },
    updateUser: async (username, newUser) => {
        return User.findOneAndUpdate({ username: username }, newUser, { new: true });
    },
    gainCup: async (username) => {
        return User.findOneAndUpdate(
            { username: username },
            { $inc: { cups: 1 } },
            { new: true }
        );
    },
    addUser: async (username, password, userImage, country, cups = 0) => {
        const newUser = new User({ username, password, userImage, country, cups });
        return newUser.save();
    },
    isUserExist: async (username, password) => {
        const user = await User.findOne({ username: username, password: password });
        return !!user; 
    },
    getCountryWithMaxUsers: async () => {
        const result = await User.aggregate([
            {
                $group: {
                    _id: { $toLower: '$country' },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            },
            {
                $limit: 1
            }
        ]);
        return result.length > 0 ? result[0] : null;
    },
    getPlayerWithMostLosses: async () => {
      try {
          const result = await Game.aggregate([
              {
                  $match: { won: false }
              },
              {
                  $group: {
                      _id: "$username",
                      losses: { $sum: 1 }
                  }
              },
              {
                  $sort: { losses: -1 }
              },
              {
                  $limit: 1
              },
              {
                  $project: {
                      _id: 0,
                      username: "$_id",
                      losses: 1
                  }
              }
          ]);
  
          return result.length > 0 ? result[0] : null;
      } catch (error) {
          console.error('Error finding player with most losses:', error);
          throw error;
      }
  },
      getPlayerWithMaxWins: async () => {
        try {
          const result = await Game.aggregate([
            {
              $match: { won: true }
            },
            {
              $group: {
                _id: "$username",
                wins: { $sum: 1 } 
              }
            },
            {
              $sort: { wins: -1 } 
            },
            {
              $limit: 1
            },
            {
              $project: {
                _id: 0,
                username: "$_id",
                wins: 1
              }
            }
          ]);
    
          console.log('Query result:', result); 
    
          return result.length > 0 ? result[0] : null;
        } catch (error) {
          console.error('Error finding player with max wins:', error);
          throw error;
          
        }
      },
      getUserGameStats: async (username) => {
        try {
            //get the cups
            const user = await User.findOne({ username: username });
            if (!user) {
                return null;
            }

            //total number of games
            const gamesCountResult = await Game.aggregate([
                {
                    $match: { username: username }
                },
                {
                    $count: 'totalGames'
                }
            ]);

            const totalGames = gamesCountResult.length > 0 ? gamesCountResult[0].totalGames : 0;
            const wins = user.cups;
            const loses = totalGames - wins;

            return {
                username: user.username,
                games: totalGames,
                wins: wins,
                loses: loses
            };
        } catch (error) {
            console.error('Error fetching user game stats:', error);
            throw error;
        }
    }
    
};
