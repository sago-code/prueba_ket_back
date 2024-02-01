const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const loginController = require('../controllers/loginController');

router.post('/create-users', userController.createUserController);
router.post('/login', loginController.loginController)

module.exports = router;
