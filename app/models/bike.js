var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BikeSchema = new Schema ({
  company: String,
  model: String,
  type: String
});

module.exports = mongoose.model('Bike', BikeSchema)
