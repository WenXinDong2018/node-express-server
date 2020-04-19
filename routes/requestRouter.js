const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Requests = require('../models/requests');

const requestRouter = express.Router();

requestRouter.use(bodyParser.json());

requestRouter.route('/')
.get((req,res,next) => {            //for development use. show all posts
    Requests.find({})
    .then((requestPosts) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(requestPosts);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {             //for "post a request"
    Requests.create(req.body)
    .then((requestPost) => {
        console.log('requestPost Created ', requestPost);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(requestPost);
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

requestRouter.route('/getUnmatched')  //for rendering orders in the "Requests" page
.get((req,res,next) => {
    Requests.find({driverName: null}, { shoppingList: 0, address2: 0, thankyounote: 0, buyerPhone: 0}, {sort:{"createdAt":-1}})
    .then((requestPosts) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(requestPosts);
    }, (err) => next(err))
    .catch((err) => next(err));
})

requestRouter.route('/getmyrequests')     //for rendering orders in the my order's page
.post((req,res,next) => {
    Requests.find({buyerId: mongoose.Types.ObjectId(req.body.buyerId)}, null, {sort:{"createdAt":-1}})
    .then((requestPosts) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(requestPosts);
    }, (err) => next(err))
    .catch((err) => next(err));
})

requestRouter.route('/getmydeliveries')     //for rendering orders in the my order's page
.post((req,res,next) => {
    Requests.find({driverId: mongoose.Types.ObjectId(req.body.driverId), driverId : {$exists: true, $ne: null}}, null, {sort:{"createdAt":-1}})
    .then((requestPosts) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(requestPosts);
    }, (err) => next(err))
    .catch((err) => next(err));
})


requestRouter.route('/:requestId')
.get((req,res,next) => {
    Requests.findById(req.params.requestId)
    .then((requestPost) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(requestPost);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {                              //update the post, used when "offer to deliver"
    Requests.findByIdAndUpdate(req.params.requestId, {
        $set: req.body
    }, { new: true })
    .then((requestPost) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(requestPost);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {           //development use. delete a post
    Requests.findByIdAndRemove(req.params.requestId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = requestRouter;