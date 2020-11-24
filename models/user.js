const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
      type: String,
      required: true
    },
    lastName: {
        type: String,
        required: true
      },
    email: {
      type: String,
      required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    dob: {
      type: Date,
      required: true
    },
    emergencyFirstName: {
        type: String,
        required: true
    },  
    emergencyLastName: {
        type: String,
        required: true
    },
    emergencyPhone: {
        type: Number,
        required: true
    }
    // destinations: [destinationSchema],
    // tickets: [{type: Schema.Types.ObjectId, ref: 'Ticket'}]
  });
  
  module.exports = mongoose.model ('User', userSchema);