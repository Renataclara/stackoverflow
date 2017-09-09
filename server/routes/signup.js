var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');


router.post('/', userController.signup); //done



module.exports = router;
