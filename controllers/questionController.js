'use strict'

const Task = require('../models/Question')
const ObjectId = require('mongodb').ObjectId;
var jwt = require('jsonwebtoken');
const generate = require('../helpers/generateSecret');
const hash = require('../helpers/hash');
const crypto = require('crypto');


module.exports = {
  findAll: function (req,res) {
      if (req.headers.id == req.params.idu) {
        Task.find({
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
          path: 'votes'
        },
        {
          path: 'votes.uservoteid',
          model: 'User',
          select: 'name _id'
        }
      ])
        .then(function (data) {
          res.send(data);
        })
      } else {
        res.send('yours only');
      }
  },
  create: function (req,res) {
        Task.create({
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
          Task.find({
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
        Task.deleteOne({_id:req.params.id})
        .then(function () {
          res.send('question is destroyed');
        })
      } else {
        res.send('yours only');
      }
  },
  update: function (req,res) {
    if (req.headers.id == req.params.idu) {
          Task.where({
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
          Task.where({
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
          Task.where({
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

          Task.where({
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

          Task.updateOne({_id: req.params.id},
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
    Task.updateOne({
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
    Task.findOne({
      _id: req.params.id,
      'votes.uservoteid': req.headers.id
    })
    .then(function (data) {
      console.log(data);
      if (data == null) {
        Task.updateOne({
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
        Task.updateOne({_id: req.params.id},
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
  }
}
