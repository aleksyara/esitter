const mongoose = require('mongoose');
const Schema = mongoose.Schema;



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
    address: [{
        type: Schema.Types.ObjectId,
        ref: 'Address'
    }],
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
    },
    classesAsStudent: [{
      type: Schema.Types.ObjectId,
      ref: 'Class'
    }],
    classesAsMentor: [{
      type: Schema.Types.ObjectId,
      ref: 'Class'
    }] 
  }, {
    timestamps: true
  });
  
  module.exports = mongoose.model ('User', userSchema);