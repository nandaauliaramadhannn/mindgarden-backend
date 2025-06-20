const db = require('../models');

const checkSubscriptionRenewal = async (req, res, next) => {
  try {
    const renewal = await db.SubscriptionRenewal.findOne({
      where: { subscriptionId: req.subscription.id },
      order: [['renewedAt', 'DESC']]
    });

    if (!renewal) {
      return res.status(403).json({ message: 'No renewal history found' });
    }

    req.renewal = renewal;
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Renewal check failed', error: error.message });
  }
};

module.exports = checkSubscriptionRenewal;
