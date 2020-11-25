'use strict'

const {success, error} 	= require('../Views/message');
const handler 		      = require('../Middlewares');
const controller        = require('../Controllers')
const path              = require('../path');
const express 	    		= require('express');
const passport 			    = require('passport');
const router 			      = express.Router();

// router.get(path + '/users/name/:name', 
		// handler.users.getByName);
		
router.get(path + '/users/:id', 
		handler.auths.authenticated, 
		handler.users.getById);
		
router.post(path + '/users/new', 
		handler.users.create);
		
router.post(path + '/login', passport.authenticate('local', {
	failureRedirect: '/loginFail',
}), async function (req, res) {
  let username = req.body.email;
  let q = await controller.users.getByName(username);
  res.status(q.status).send((q.data));
});

router.get("/loginFail", 
    handler.auths.loginFail);

module.exports = router;