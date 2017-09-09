'use-strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
  body: {
    type: String,
    required: true
  },
  userid: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  votes: [
    {
      uservoteid:{
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      uservalue: Number
    }
  ]
},
  {
    timestamps:
    {
      createdAt: 'created_at'
    }
  }
);

const questionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    required: false
  },
  body: {
    type: String,
    required: true
  },
  userid: { type: Schema.Types.ObjectId, ref: 'User' },
  answers: [answerSchema],
  votes: [
    {
      uservoteid:{
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      uservalue: Number
    }
  ]
},
  {
    timestamps:
    {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const Question = mongoose.model('Question', questionSchema);

module.exports = Question
