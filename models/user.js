const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  content: String,
  rating: {type: Number, min: 1, max: 5, default: 5}
}, {
  timestamps: true
});

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
    }],
    reviews: [reviewSchema] 
  }, {
    timestamps: true
  });
  
  module.exports = mongoose.model ('User', userSchema);