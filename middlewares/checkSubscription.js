const db = require('../models');

const checkSubscription = async (req, res, next) => {
  try {
    const subscription = await db.Subscription.findOne({
      where: { userId: req.user.id, isActive: true }
    });

    if (!subscription) {
      return res.status(403).json({ message: 'No active subscription' });
    }

    const now = new Date();
    const end = new Date(subscription.endDate);

    if (now > end) {
      await subscription.update({ isActive: false });
      return res.status(403).json({ message: 'Your subscription has expired' });
    }

    req.subscription = subscription;
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Subscription check failed', error: error.message });
  }
};

module.exports = checkSubscription;
