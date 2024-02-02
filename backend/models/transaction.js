const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  receiver: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['deposit', 'withdrawal'], required: true },
  status: { type: String, enum: ['success', 'pending', 'failed'], default: 'pending' },
  date: { type: Date, default: Date.now },
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
