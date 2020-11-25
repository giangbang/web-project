'use strict';

const {success, error} 	= require('../Views/message');
const handler           = require('../Middlewares');
const path              = require('../path') + '/courses';
const express           = require('express');
const router            = express.Router();

router.get(path + '/code/:code', 
		// handler.auths.authenticated, 
		handler.courses.getByCode);

router.get(path + '/id', 
		// handler.auths.authenticated, 
		handler.courses.getById);
    
router.get(path, 
		// handler.auths.authenticated, 
		handler.courses.getAll);
	
router.get(path + '/delete/id/:id', 
		handler.auths.authenticated, 
		handler.courses.del);
			

router.post(path + '/new', 
		// handler.auths.authenticated, 
		handler.courses.create);

module.exports = router;