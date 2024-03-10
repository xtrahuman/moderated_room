// UserController.js
const { User } = require('../models');

// Controller actions for user management
const UserController = {
  // Get all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password', 'email'] }, // Exclude sensitive fields
        order: [['createdAt', 'DESC']],
        raw: true // Fetch raw data from the database
      });
  
      res.json({ users, userId: req.userId });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Get user by ID
  getUserById: async (req, res) => {
    const { uuid } = req.params;
    try {
      const user = await User.findOne({
        attributes: { exclude: ['password', 'email'] }, // Exclude sensitive fields
        raw: true, // Fetch raw data from the database,
        where: {
          uuid: uuid,
        },
      });;
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },


  // Update user by ID
  updateUser: async (req, res) => {
    const { uuid } = req.params;
    const { firstName, lastName, email, username,password } = req.body;
    try {
      const user = await User.findOne({
        where: {
          uuid: uuid,
        },
      });;
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      await user.update({ firstName, lastName, email, username, password });
      res.json(user);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Delete user by ID
  deleteUser: async (req, res) => {
    const { uuid } = req.params;
    try {
      const user = await User.findOne({
        where: {
          uuid: uuid,
        },
      });;
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      await user.destroy();
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

module.exports = UserController;
