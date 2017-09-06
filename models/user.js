'use-strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name:{
    type: String,
    required: false
  },
  username:{
    type: String,
    required: true,
    unique:true
  },
  password:{
    type: String,
    required: true
  },
  key:{
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
