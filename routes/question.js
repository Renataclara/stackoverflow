var express = require('express');
var router = express.Router();
var userController = require('../controllers/questionController');



require('dotenv').config()
var jwt = require('jsonwebtoken');


// router.use(function (req,res,next) {
//   if (req.headers.hasOwnProperty('token')) {
//     jwt.verify(req.headers.token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
//       if (decoded.username != null) {
//         next()
//       } else {
//         res.send('you need to sign up')
//       }
//     })
//   }
// })

router.post('/', userController.create);//checked
router.delete('/:id/answer/:ida', userController.deleteAnswer);//
router.put('/:id/answer/:ida', userController.updateAnswer);//
router.post('/:id/answer', userController.addAnswer);//
router.post('/:id/vote', userController.vote);//
router.get('/:idu',userController.findAll); //checked
router.get('/:idu/:id', userController.findOne); //checked

router.put('/:idu/:id', userController.update); //checked

router.put('/:idu/:id/tags', userController.addTag); //checked
router.put('/:idu/:id/removetags', userController.removeTag); //checked


router.delete('/:idu/:id', userController.destroy); //checked

module.exports = router;
