const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Updates = require('../models/updates');

const updatesRouter = express.Router();

updatesRouter.use(bodyParser.json());

updatesRouter.route('/')
.get((req,res,next) => {            //get the last 100 updates in descending order of time 
    Updates.find({}, null, {sort:{"createdAt":-1}}).limit(100)
    .then((updates) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(updates);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {             //creates a new update
    Updates.create(req.body)
    .then((update) => {
        console.log('requestPost Created ', update);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(update);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {   //development use. delete all request posts
    Requests.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

module.exports = updatesRouter;