'use strict';

const {success, error} 	= require('../Views/message');
const handler           = require('../Middlewares');
const path              = require('../path') + '/quizzes';
const express           = require('express');
const router            = express.Router();

router.get(path, 
		// handler.auths.authenticated, 
		handler.quizzes.getById);
	
router.get(path + '/delete/id/:id', 
		// handler.auths.authenticated, 
		handler.quizzes.del);

router.get(path + '/get', 
		// handler.auths.authenticated, 
		handler.quizzes.getAll);			

router.post(path + '/new', 
		// handler.auths.authenticated, 
		handler.quizzes.create);

module.exports = router;