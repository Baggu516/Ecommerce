const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  name: String,
  phone:String,
  items:[mongoose.Schema.Types.Mixed],
  address:String,
  userId:String,
  total:String

});



module.exports = mongoose.model('Order', OrderSchema);

