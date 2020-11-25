'use strict';

const {success, error} 	= require('../Views/message');
const handler           = require('../Middlewares');
const path              = require('../path') + '/tags';
const express           = require('express');
const router            = express.Router();

router.get(path + '/id/:id', 
		// handler.auths.authenticated, 
		handler.tags.getById);
	
router.get(path + '/delete/id/:id', 
		// handler.auths.authenticated, 
		handler.tags.del);
			

router.post(path + '/new', 
		// handler.auths.authenticated, 
		handler.tags.create);

router.get(path + '/get', 
		// handler.auths.authenticated, 
		handler.tags.getAll);

router.get(path, 
		// handler.auths.authenticated, 
		handler.tags.getByCourse);
    
module.exports = router;