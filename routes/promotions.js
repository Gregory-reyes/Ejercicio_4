//requires lines
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//require the model with the promotion
const Promotions = require('../models/promotions');

//define the promoRouter
const promoRouter = express.Router();

//use the promoRouter
promoRouter.use(bodyParser.json());
//important: this will basically configure the GET SET POST PUT DELETE methods
promoRouter.route('/')
    .get((req, res, next) => {//GET method
        Promotions.find({})
            .then((promotions) => {//if success...
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotions);
            }, (err) => next(err))
            .catch((err) => next(err));//if there's an error
    })
    .post((req, res, next) => {//POST method
        Promotions.create(req.body)
            .then((promotion) => {//if success...
                console.log('Promotion Created ', promotion);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            }, (err) => next(err))
            .catch((err) => next(err));//if there's an error
    })
    .put((req, res, next) => {//PUT method (for now is not supported)
        res.statusCode = 403;
        res.end('PUT operation not supported on /promotions');
    })
    .delete((req, res, next) => {//DELETE method
        Promotions.remove({})
            .then((resp) => {//if success...
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));//if there's an error
    });
//important: this will basically configure the GET SET POST PUT DELETE methods BUT for an individual promotion
promoRouter.route('/:promoId')
    .get((req, res, next) => {//GET method
        Promotions.findById(req.params.promoId)
            .then((promotion) => {//if success...
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            }, (err) => next(err))
            .catch((err) => next(err));//if there's an error
    })
    .post((req, res, next) => {//POST method (for now is not supported)
        res.statusCode = 403;
        res.end('POST operation not supported on /promotions/' + req.params.promoId);
    })
    .put((req, res, next) => {//PUT method 
        Promotions.findByIdAndUpdate(req.params.promoId, {
            $set: req.body
        }, { new: true })
            .then((promotion) => {//if success...
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            }, (err) => next(err))
            .catch((err) => next(err));//if there's an error
    })
    .delete((req, res, next) => {//DELETE method
        Promotions.findByIdAndRemove(req.params.promoId)
            .then((resp) => {//if success...
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));//if there's an error
    });
//export
module.exports = promoRouter;