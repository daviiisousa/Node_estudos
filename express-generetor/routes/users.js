const userController = require('../controllers/UserController')
var express = require('express');
var router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.post('/login', userController.loginUser)
router.get('/:id', userController.getUserWithAddres);

module.exports = router;