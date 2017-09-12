'use strict'

const Question = require('../models/Question')
const ObjectId = require('mongodb').ObjectId;
var jwt = require('jsonwebtoken');
const generate = require('../helpers/generateSecret');
const hash = require('../helpers/hash');
const crypto = require('crypto');


module.exports = {
  findAll: function (req,res) {
      // if (req.headers.id == req.params.idu) {
        // Question.find({
        //   userid: req.headers.id
        // })
        Question.find()
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
      // } else {
      //   res.send('yours only');
      // }
  },
  create: function (req,res) {
    console.log(req.headers);
        Question.create({
          title: req.body.title,
          tags: req.body.tags,
          body: req.body.body,
          userid: req.headers.verifiedUser.id
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
      // } else {
      //   res.send('yours only');
      // }
  },
  destroy: function (req,res) {
    // if (req.headers.id == req.params.idu) {
        Question.deleteOne({_id:req.params.id})
        .then(function (data) {
          res.send(data);
        })
      // } else {
      //   res.send('yours only');
      // }
  },
  update: function (req,res) {
    // if (req.headers.id == req.params.idu) {
          Question.where({
            _id: req.params.id
          })
          .update({
            title: req.body.title,
            body: req.body.body,
            tags: req.body.tags
          })
          .then(function (data) {
            res.send(data);
          })
      // } else {
      //   res.send('yours only');
      // }
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
                userid: req.headers.verifiedUser.id,
                body: req.body.body
              }
            }
          })
          .then(function (data) {
            Question.findOne({
              _id: req.params.id,
              'answers.userid': req.headers.verifiedUser.id,
              'answers.body': req.body.body
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
            }])
            .then(function (data) {
              res.send(data)
            })
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
      'votes.uservoteid': req.headers.verifiedUser.id
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
              uservoteid: req.headers.verifiedUser.id,
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
              uservoteid: req.headers.verifiedUser.id
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
      // console.log('this is the grand data', data);
      //   console.log('this is the grand data asnwer', data.answers);
      // // console.log('ini datanyaaa', data.answers[0].votes);
      // // console.log('-------------------------------------');
      // console.log('from controller: ida', req.params.ida)
      // if (data.answers[0]._id == req.params.ida) {
      //   console.log('bener cuy');
      // }
      // const filteredAnswer = data.answers.filter((list) => list._id == req.params.ida)
      // console.log('the filtered answers', filteredAnswer)
      // const filteredVote = filteredAnswer[0].votes.filter((list) => list.uservoteid == req.headers.verifiedUser.id)
      // console.log('the filtered vote', filteredVote)
      var answerIdx = data.answers.findIndex((a) => (a._id == req.params.ida))
      console.log('answer idx', answerIdx)
      var voteIdx = data.answers[answerIdx].votes.findIndex((a) => (a.uservoteid == req.headers.verifiedUser.id))
      console.log('this is voteIdx', voteIdx)

      if (voteIdx == -1) {
        data.answers[answerIdx].votes.push(
          {
            uservoteid: req.headers.verifiedUser.id,
            uservalue: req.body.value
          }
        )
        console.log('aloha no');
        data.save((err, inserted) => {
          console.log('before save if there is no voteidx', inserted)
          var result = {inserted: inserted, success: true}
          console.log('after put success', result);
          res.send(result);
        })
      } else {
        // if (voteIdx >= 0) {
        data.answers[answerIdx].votes.splice( voteIdx, 1 );
        // }
          console.log('aloha');
        data.save((err, inserted) => {
          console.log('before save if there is voteidx', inserted)
          var result = {inserted: inserted, success: false}
          console.log('after put fail', result);
          res.send(result);
        })
      }
    })
  }
}
