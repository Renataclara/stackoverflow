var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');


router.post('/', userController.signin); //done



module.exports = router;
