const express = require('express');
const { signUp } = require('../controller/authController');
const { signIn } = require('../controller/authController');
const {getUser} = require('../controller/authController')
const authRouter = express.Router();


authRouter.post('/signUp' ,signUp )
authRouter.post('/signIn' , signIn)
authRouter.get('/user' , jwtAuth , getUser)

module.exports = authRouter;