const express = require('express');
const bodyParser =require('body-parser');
const mongoose = require('mongoose');//requiere el modelo de lideres
const authenticate = require('../authenticate');
const cors = require('./cors');

const Leaders = require('../models/leaders');//define el leaderRouter
//const promotions = require('./promotions');
const leaders = express.Router();

leaders.use(bodyParser.json());// importante: esto básicamente configurará los métodos GET SET POST PUT DELETE

leaders.route('/')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
.get(cors.cors,(req,res,next) => {            //GET metodo
    Leaders.find(req.query)
    .then((leaders) =>{             //Si hay conexión
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leaders);
    }, (err) => next(err))
    .catch((err) => next(err));     //Si hay error   
})
.post(cors.corsWithOptions, authenticate.verifyUser,(req,res,next) =>{            //POST metodo
    Leaders.create(req.body)
    .then((leaders) =>{             //Si hay conexion
        console.log('Leader create',leaders);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leaders);
    }, (err) => next(err))
    .catch((err) => next(err)); 
})
.put(cors.corsWithOptions, authenticate.verifyUser,(req,res,next) =>{             //PUT ahora es compatible   
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders'); //PUT no es compatible
})
.delete(cors.corsWithOptions, authenticate.verifyUser,(req,res,next) => {         //DELETE metodo de borrar
    Leaders.remove({})
    .then((resp) => {               //Si hay conexion
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));     //SI hay error
});
    // importante: esto básicamente configurará los métodos GET SET POST PUT DELETE PERO para un líder individual   
leaders.route('/:leaderId')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
.get(cors.cors,(req,res,next) => {
    Leaders.findById(req.params.leaderId)
    .then((leader) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end("Post operation not supported on /leaders/"+req.params.leaderId);
})
.put(cors.corsWithOptions, authenticate.verifyUser,(req, res, next) => {    
    Leaders.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, { new: true})
    .then((leader) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser,(req, res, next) => {
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

//Exportar
module.exports = leaders;