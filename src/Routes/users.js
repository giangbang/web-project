'use strict'

const {success, error} 	= require('../Views/message');
const express 			= require('express');
const passport 			= require('passport');
const handler 			= require('../Middlewares');
const router 			= express.Router();

let path = (process.env.API_PATH || '') + '/users';

router.get('/getbyName/:name', 
		handler.users.getByName);
		
router.get('/getbyId/:id', 
		handler.auths.authenticated, 
		handler.users.getById);
		
router.post('/new', 
		handler.users.create);
		
router.post('/login', passport.authenticate('local', {
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