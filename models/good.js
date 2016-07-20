var mongoose = require('mongoose');

var goodSchema = new mongoose.Schema({
  //goodId: { type: String, unique: true, index: true },
  name: { type: String, unique: true, index: true },
  unit: String,
  barcode: { type: String, unique: true },
  price: { type: Number, default: 0 },
  category: String,
  discount: { type: Number, default: 0 }
});

module.exports = mongoose.model('Good', goodSchema);