const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
      type: String
    },
    lastName: {
        type: String
      },
    email: {
      type: String,
      required: true
    },
    address: {
        type: String
    },
    phone: {
        type: Number
    },
    dob: {
      type: Date
    },
    emergencyFirstName: {
        type: String
    },  
    emergencyLastName: {
        type: String
    },
    emergencyPhone: {
        type: Number
    },
    googleId: {
      type: String
    }
    // destinations: [destinationSchema],
    // tickets: [{type: Schema.Types.ObjectId, ref: 'Ticket'}]
  }, {
    timestamps: true
  });
  
  module.exports = mongoose.model ('User', userSchema);