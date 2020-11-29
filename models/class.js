const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    students: [{type: Schema.Types.ObjectId, ref: 'User'}]
  })

  module.exports = mongoose.model ('Class', classSchema);