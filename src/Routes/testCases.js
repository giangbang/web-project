'use strict';

const {success, error} 	= require('../Views/message');
const handler           = require('../Middlewares');
const path              = require('../path') + '/testcases';
const express           = require('express');
const router            = express.Router();

router.get(path, 
		// handler.auths.authenticated, 
		handler.testCases.getById);
	
router.get(path + '/delete/id/:id', 
		// handler.auths.authenticated, 
		handler.testCases.del);

router.get(path + '/get', 
		// handler.auths.authenticated, 
		handler.testCases.getAll);			

router.post(path + '/new', 
		// handler.auths.authenticated, 
		handler.testCases.create);

module.exports = router;