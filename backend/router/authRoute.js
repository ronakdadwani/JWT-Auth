const express = require('express');
const { signUp } = require('../controller/authController');
const authRouter = express.Router();


authRouter.post('/signUp' ,signUp )

module.exports = authRouter;