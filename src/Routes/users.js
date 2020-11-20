'use strict'

const {success, error} 	= require('../Views/message');
const handler 			= require('../Middlewares');
const path              = require('../path');
const express 			= require('express');
const passport 			= require('passport');
const router 			= express.Router();

router.get(path + '/users/name/:name', 
		handler.users.getByName);
		
router.get(path + '/users/id/:id', 
		handler.auths.authenticated, 
		handler.users.getById);
		
router.post(path + '/users/new', 
		handler.users.create);
		
router.post(path + '/login', passport.authenticate('local', {
	failureRedirect: path+'/loginFail',
}), function (req, res) {
    res.redirect(path+'/loginSuccess');
});

router.get("/loginFail", (req,res)=> {
	res.send(error("Username or password is incorrect"));
});

router.get("/loginSuccess" ,(req,res)=> {
	res.send(success("Welcome!"));
});

module.exports = router;