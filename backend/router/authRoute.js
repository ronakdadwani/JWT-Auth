const express = require('express');
const { signUp } = require('../controller/authController');
const { signIn } = require('../controller/authController');
const authRouter = express.Router();


authRouter.post('/signUp' ,signUp )
authRouter.post('/signIn' , signIn)

module.exports = authRouter;