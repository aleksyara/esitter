const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  address1: String,
  address2: String,
  city: String,
  state: String,
  zip: String
})

const emergencySchema = new Schema({
  firstName: String,
  lastName: String,
  phone: String,
  email: String,
 })

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
        type: addressSchema
    },
    phone: {
        type: Number
    },
    dob: {
      type: Date
    },
    skills: {
      type: String,
      enum: ['ART', 'CHE', 'MUS', 'ENG', 'CODE', 'STG']
    },
    emergency: {
      type: emergencySchema
    },
    about: {
      type: String
    },
    isMentor: {
      type: Boolean
    },
    isStudent: {
      type: Boolean
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