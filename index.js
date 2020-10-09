const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const chalk = require('chalk')

const router = require('./routes/routes');

const app = express();
const port=3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());
app.use(router);

//app.set('authorization', false);

//var authorization = true

//creating server

app.listen(port,(err)=>{
    if(err)
        console.log(chalk.red("Server was not created due to the following error",err))
    else   
        console.log(chalk.blue("Server created and running at port " , port))
});

//Connecting to the Database

mongoose.connect("mongodb://localhost:27017/todo", { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('error',error =>{
    if(error)
        console.log("Database not connected due to the following error",error);
    });
mongoose.connection.on('connected',() => {
    console.log(chalk.yellow("Database connected "));
});
