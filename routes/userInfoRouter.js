const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const UserInfo = require('../models/userinfo');

const userinfoRouter = express.Router();

userinfoRouter.use(bodyParser.json());

userinfoRouter.route('/')  
.get((req,res,next) => {            //for development use. show all users
    UserInfo.find({})
    .then((users) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
    }, (err) => next(err))
    .catch((err) => next(err));
})             
.post((req, res, next) => {         //make a new user
    UserInfo.create(req.body)
    .then((user) => {
        console.log('New User Created ', user);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => { //delete all users
    UserInfo.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

userinfoRouter.route('/:userId')
.get((req,res,next) => {
    UserInfo.findById(req.params.userId)
    .then((user) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => { //update the user
    UserInfo.findByIdAndUpdate(req.params.userId, {
        $set: req.body
    }, { new: true })
    .then((user) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    UserInfo.findByIdAndRemove(req.params.requestId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

userinfoRouter.route('/:userId/notifications')
.get((req,res,next) => {
    UserInfo.findById(req.params.userId)
    .then((user) => {
        if (user != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user.notifications);
        }
        else {
            err = new Error('User ' + req.params.userId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    UserInfo.findById(req.params.userId)
    .then((user) => {
        if (user != null) {
            user.notifications.push(req.body);
            user.save()
            .then((user) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);                
            }, (err) => next(err));
        }
        else {
            err = new Error('User ' + req.params.userId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})

userinfoRouter.route('/:userId/notifications/:notificationId')
.put((req, res, next) => {
    UserInfo.findById(req.params.userId)
    .then((user) => {
        if (user != null && user.notifications.id(req.params.notificationId) != null) {
            if (req.body.unread) {
                user.notifications.id(req.params.notificationId).unread = req.body.unread;
            }
            
            user.save()
            .then((user) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);                
            }, (err) => next(err));
        }
        else if (user == null) {
            err = new Error('User ' + req.params.userId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Notification ' + req.params.notificationId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})



module.exports = userinfoRouter;