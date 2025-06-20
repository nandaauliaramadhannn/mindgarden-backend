const db = require('../models');

// ✅ GET all users
const getAllUsers = async (req, res) => {
  try {
    const users = await db.User.findAll({ attributes: { exclude: ['password'] } });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users', error: err.message });
  }
};

// ✅ GET one user
const getUserById = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user', error: err.message });
  }
};

// ✅ Ban/Deactivate user
const banUser = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isActive = false;
    await user.save();

    res.json({ message: 'User banned', user });
  } catch (err) {
    res.status(500).json({ message: 'Failed to ban user', error: err.message });
  }
};

// ✅ GET all subscriptions
const getAllSubscriptions = async (req, res) => {
  try {
    const data = await db.Subscription.findAll({ include: db.User });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch subscriptions', error: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  banUser,
  getAllSubscriptions
};
