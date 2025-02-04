const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  totalCost: {
    type: Number,
    required: true,
  },
  transaction_uuid: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true, // Can be 'Paid', 'Pending', etc.
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', orderSchema);
