const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  notificationId: {
    type: mongoose.Schema.Types.ObjectId,
    default: function() {
      return new mongoose.Types.ObjectId();
    }
  },
  receiverId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Admin' 
  },
  senderId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Client' 
  },
  message: { 
    type: String, 
    required: true 
  },
  read: { 
    type: Boolean, 
    default: false 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Notification', notificationSchema);

