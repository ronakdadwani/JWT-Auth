const express = require('express');
const app = express();
const authRouter = require('./router/authRoute');
const databaseconnect = require('./config/databaseCOnfig');

databaseconnect();

app.use(express.json());

app.use('/api/auth' , authRouter)

app.use('/' , (req , res)=>{
    res.status(200).json({Data: 'JWT-AUTH Server -update'})
})

module.exports = app;