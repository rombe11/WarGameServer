const User = require('../models/User');
const UserService = require('../services/users');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await UserService.getAllUsers();
            res.json(users);
        } catch (err) {
            res.status(500).send(err);
        }
    },

    getUserByUsername: async (req, res) => {
        try {
            const { username } = req.params;
            const user = await UserService.getUserByUsername(username);
            
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            res.json(user);
        } catch (err) {
            res.status(500).send(err);
        }
    },

    updateUser: async (req, res) => {
        try {
            const { username } = req.params;
            const newUser = req.body;
            const updatedUser = await UserService.updateUser(username, newUser);
            
            if (!updatedUser) {
                return res.status(404).json({ error: "User not found" });
            }

            res.json(updatedUser);
        } catch (err) {
            res.status(500).send(err);
        }
    },

    addUser: async (req, res) => {
        try {
            const { username, password, userImage, country, cups } = req.body;
            const newUser = await UserService.addUser(username, password, userImage, country, cups);
            res.json(newUser);
        } catch (err) {
            res.status(500).send(err);
        }
    },

    isUserExist: async (req, res) => {
        try {
            const { username } = req.params;
            const { password } = req.query; 
            const isExist = await UserService.isUserExist(username, password);
            res.json({ isExist });
        } catch (err) {
            res.status(500).send(err.message); 
        }
    },
    gainCup : async (req, res) => {
        try {
            const { username } = req.params;
            const updatedUser = await UserService.gainCup(username);
    
            if (!updatedUser) {
                return res.status(404).json({ error: "User not found" });
            }
    
            res.json(updatedUser);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    },
    getCountryWithMaxUsers: async (req, res) => {
        try {
            const countryWithMaxUsers = await UserService.getCountryWithMaxUsers();
            if (countryWithMaxUsers) {
                res.json({ country: countryWithMaxUsers._id, userCount: countryWithMaxUsers.count });
            } else {
                res.status(404).json({ message: 'No users found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
    getUserWithMaxLosses: async (req, res) => {
        try {
            const allUsers = await UserService.getAllUsers(); // Assuming getAllUsers function exists
            if (!allUsers || allUsers.length === 0) {
                return res.status(404).json({ error: 'No users found' });
            }

            let userWithMaxLosses = null;
            let maxLoses = -1;

            for (let i = 0; i < allUsers.length; i++) {
                const userStats = await UserService.getUserGameStats(allUsers[i].username);
                if (userStats && userStats.loses > maxLoses) {
                    maxLoses = userStats.loses;
                    userWithMaxLosses = userStats;
                }
            }

            if (!userWithMaxLosses) {
                return res.status(404).json({ error: 'No user found with losses' });
            }

            res.json(userWithMaxLosses);
        } catch (err) {
            console.error('Error fetching user with max losses:', err);
            res.status(500).send(err.message);
        }
    },
      getPlayerWithMaxWins: async (req, res) => {
        try {
          const result = await UserService.getPlayerWithMaxWins();
          console.log('Result:', result); 
    
          if (!result) {
            return res.status(404).json({ error: 'No player found with wins.' });
          }
          res.json(result);
        } catch (error) {
          console.error('Error fetching player with max wins:', error);
          res.status(500).send('Internal Server Error');
        }
      },
      getUserGameStats: async (req, res) => {
        try {
            const { username } = req.params;
            const userStats = await UserService.getUserGameStats(username);
            
            if (!userStats) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json(userStats);
        } catch (err) {
            console.error('Error in getUserGameStats controller:', err);
            res.status(500).send('Internal Server Error');
        }
    }
};
