const express = require("express"),
PORT = 3000,
app = express();
const userController = require( './controllers/userController');
const redisController = require('./controllers/redisController')
// import express from "express";
// const PORT = 3000,
// app = express();
// import  { createUser } from './controllers/userController.js';
// import { Module } from "module";




app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get("/api", (req,res) => {
    let data = "hello";
    res.status(200).json(data);
});


app.post("/createUser", userController.createUser, (req,res) => {
    res.sendStatus(200);
})

app.get("/verifyUser", userController.verifyUser, (req,res) => {
    //successful login
    // res.redirect('homepage');
    res.sendStatus(200);
});

app.post("/setLogs", redisController.setLogs, (req,res) => {
    //successful login
    // res.redirect('homepage');
    res.sendStatus(200);
});

app.get("/getLogs", redisController.getLogs, (req,res) => {
    //successful login
    // res.redirect('homepage');
    res.status(200).json(res.locals.logs);
});
app.get("/getErrLogs", redisController.getErrLogs, (req,res) => {
    //successful login
    // res.redirect('homepage');
    res.status(200).json(res.locals.logs);
});

//Route not found
app.use((req,res) => res.sendStatus(404));

//Global error handler
app.use((err, req, res, next) => {
    const defaultErr = {
        log:'Express error handler caught unkown middleware error',
        status: 400,
        message: { err : 'An error occurred'},
    };
    const errorObj = Object.assign({}, defaultErr, err);
    return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));