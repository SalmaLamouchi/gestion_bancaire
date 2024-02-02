const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  accountNumber: { type: String, unique: true, required: true },
  balance: { type: Number, default: 0 },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
