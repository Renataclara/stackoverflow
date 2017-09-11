var express = require('express');
var router = express.Router();
var userController = require('../controllers/questionController');



require('dotenv').config()
var jwt = require('jsonwebtoken');

function middleware (req,res,next) {
  console.log(req.headers);
  if (req.headers.hasOwnProperty('token')) {
    jwt.verify(req.headers.token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
      if (decoded.username != null) {
        req.headers.verifiedUser = decoded
        next()
      } else {
        res.send('you need to sign up')
      }
    })
  } else {
    res.send('lu gaboleh post')
  }
}


router.post('/', middleware, userController.create);//checked
router.delete('/:id/answer/:ida', userController.deleteAnswer);//
router.delete('/:id', userController.destroy);//
router.put('/:id/answer/:ida', userController.updateAnswer);//
router.post('/:id/answer', middleware, userController.addAnswer);//
router.post('/:id/vote', middleware, userController.vote);//
router.post('/:id/answer/:ida/vote', middleware, userController.answervote);//
router.get('/',userController.findAll); //checked
router.get('/:id', userController.findOne); //checked

router.put('/:id', middleware, userController.update); //checked

router.put('/:idu/:id/tags', userController.addTag); //checked
router.put('/:idu/:id/removetags', userController.removeTag); //checked


router.delete('/:idu/:id', userController.destroy); //checked

module.exports = router;
