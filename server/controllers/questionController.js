'use strict'

const Question = require('../models/Question')
const ObjectId = require('mongodb').ObjectId;
var jwt = require('jsonwebtoken');
const generate = require('../helpers/generateSecret');
const hash = require('../helpers/hash');
const crypto = require('crypto');


module.exports = {
  findAll: function (req,res) {
      if (req.headers.id == req.params.idu) {
        Question.find({
          userid: req.headers.id
        })
        .populate([{
          path: 'userid',
          model: 'User',
          select: 'name _id'
        },
        {
          path: 'answers.userid',
          model: 'User',
          select: 'name _id'
        },
        {
          path: 'answers.votes.uservoteid',
          model: 'User',
          select: 'name _id'
        },
        {
          path: 'votes'
        },
        {
          path: 'votes.uservoteid',
          model: 'User',
          select: 'name _id'
        }
      ])
      .populate('answer.votes', 'uservoteid uservalue')
        .then(function (data) {
          res.send(data);
        })
      } else {
        res.send('yours only');
      }
  },
  create: function (req,res) {
        Question.create({
          title: req.body.title,
          tags: req.body.tags,
          body: req.body.body,
          userid: req.headers.id
        })
        .then(function(result) {
          res.send(result);
        })
  },
  findOne: function (req,res) {
      // if (req.headers.id == req.params.idu) {
          Question.find({
            _id: req.params.id
          })
          .then(function (data) {
            res.send(data);
          })
      // } else {
      //   res.send('yours only');
      // }
  },
  destroy: function (req,res) {
    if (req.headers.id == req.params.idu) {
        Question.deleteOne({_id:req.params.id})
        .then(function () {
          res.send('question is destroyed');
        })
      } else {
        res.send('yours only');
      }
  },
  update: function (req,res) {
    if (req.headers.id == req.params.idu) {
          Question.where({
            _id: req.params.id
          })
          .update({
            title: req.body.title,
            body: req.body.body
          })
          .then(function (data) {
            res.send(data);
          })
      } else {
        res.send('yours only');
      }
  },
  addTag: function (req,res) {
    if (req.headers.id == req.params.idu) {
          Question.where({
            _id: req.params.id
          })
          .update({
            $push:{
              tags: req.body.tags
            }
          })
          .then(function (data) {
            res.send(data);
          })
      } else {
        res.send('yours only');
      }
  },
  removeTag: function (req,res) {
      if (req.headers.id == req.params.idu) {
          Question.where({
            _id: req.params.id
          })
          .update({
            tags: req.body.tags
          })
          .then(function (data) {
            res.send(data);
          })
      } else {
        res.send('yours only');
      }
  },
  addAnswer: function (req,res) {

          Question.where({
            _id: req.params.id
          })
          .update({
            $push:{
              answers: {
                userid: req.headers.id,
                body: req.body.body
              }
            }
          })
          .then(function (data) {
            res.send(data);
          })

  },
  deleteAnswer: function (req,res) {

          Question.updateOne({_id: req.params.id},
          {
            $pull:{
              answers: {
                _id: req.params.ida
              }
            }
          })
          .then(function (data) {
            res.send(data);
          })

  },
  updateAnswer: function (req,res) {
    Question.updateOne({
      _id: req.params.id,
      'answers._id': req.params.ida
    },
      {
        $set: {
        'answers.$.body': req.body.body
        }
      })
    .then(function (data) {
      res.send(data);
    })
  },
  vote: function (req,res) {
    Question.findOne({
      _id: req.params.id,
      'votes.uservoteid': req.headers.id
    })
    .then(function (data) {
      console.log(data);
      if (data == null) {
        Question.updateOne({
          _id: req.params.id
        },
        {
          $push:{
            votes: {
              uservoteid: req.headers.id,
              uservalue: req.body.value
            }
          }
        })
        .then(function (data) {
          res.send(data);
        })
      } else {
        Question.updateOne({_id: req.params.id},
        {
          $pull:{
            votes: {
              uservoteid: req.headers.id
            }
          }
        })
        .then(function (data) {
          res.send(data);
        })
      }
    })
  },
  answervote: function (req,res) {
    Question.findOne({
      _id: req.params.id
    })
    .then(function (data) {
      console.log('this is the grand data', data);
        console.log('this is the grand data asnwer', data.answers);
      // console.log('ini datanyaaa', data.answers[0].votes);
      // console.log('-------------------------------------');
      function theone(element) {
        return element._id = req.params.ida
      }
      var answerIdx = data.answers.findIndex(theone)

      function thenext(element) {
        return element.uservoteid = req.headers.id
      }
      var voteIdx = data.answers[answerIdx].votes.findIndex(thenext)
      console.log('this is voteIdx', voteIdx);

      if (voteIdx == -1) {
        data.answers[answerIdx].votes.push(
          {
            uservoteid: req.headers.id,
            uservalue: req.body.value
          }
        )
        const updatedQuestion = new Question(data)

        updatedQuestion.save((err, inserted) => {
          res.send(inserted);
        })
      } else {
        if (voteIdx >= 0) {
          data.answers[answerIdx].votes.splice( voteIdx, 1 );
        }
        const updatedQuestion = new Question(data)

        updatedQuestion.save((err, inserted) => {
          res.send(inserted);
        })
      }




      // }
      //         console.log('the result', data.answers[0].votes);

      // if (data == null) {
      //   Question.updateOne({
      //     _id: req.params.id,
      //     'answers._id': req.params.ida
      //   },
      //   {
      //     $push:{
      //       votes: {
      //         uservoteid: req.headers.id,
      //         uservalue: req.body.value
      //       }
      //     }
      //   })
      //   .then(function (data) {
      //     res.send(data);
      //   })
      // } else {
      //   Question.updateOne({
      //     _id: req.params.id,
      //     'answers._id': req.params.ida
      //   },
      //   {
      //     $pull:{
      //       votes: {
      //         uservoteid: req.headers.id
      //       }
      //     }
      //   })
      //   .then(function (data) {
      //     res.send(data);
      //   })
      // }
    })
  }
}
