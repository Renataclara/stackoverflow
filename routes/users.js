var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');
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

router.put('/:id', userController.update);
// router.get('/:id', userController.findById);
router.get('/', userController.findAll);
// router.post('/', userController.create);
router.delete('/:id', userController.destroy);

module.exports = router;
