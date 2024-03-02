const Notification = require('../models/notification');
// const jwt = require('jsonwebtoken');

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({});
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};