const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    address1: String,
    address2: String,
    city: String,
    state: String,
    zip: String
  })

  module.exports = mongoose.model ('Address', addressSchema);