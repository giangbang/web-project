'use strict'

const express 	= require('express');
const passport 	= require('passport');
const router 	= express.Router();

const handler = require('../Middlewares');

// get user info by username
router.get('/getbyName/:name', handler.users.getUserByName);

// create new user in database
router.post('/new', handler.users.create);

// login
router.post('/login', passport.authenticate('local', {
	failureFlash: "Try again",
	successFlash: "Welcome!",
	sucessRedirect: "/"
}))

module.exports = router;