const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  content: String,
  rating: {type: Number, min: 1, max: 5, default: 5}
}, {
  timestamps: true
});

const classSchema = new Schema({
    topic: {
        type: String
      },
    startDate: {
        type: String
      },
    endDate: {
        type: String
      },
    description: {
        type: String
      },
    category: {
        type: String,
        enum: ['art', 'chess', 'music', 'esl', 'code', 'stage'],
    },
    mentor: {type: Schema.Types.ObjectId, ref: 'User'},
    students: [{type: Schema.Types.ObjectId, ref: 'User'}],
    reviews: [reviewSchema]
  })

  module.exports = mongoose.model ('Class', classSchema);