'use strict';

const {success, error} 	= require('../Views/message');
const handler           = require('../Middlewares');
const path              = require('../path') + '/courses';
const express           = require('express');
const router            = express.Router();

router.get(path + '/code', 
		handler.courses.getByCode);

router.get(path + '/id', 
		handler.courses.getById);
    
router.get(path + '/all', 
		handler.courses.getAll);
	
router.delete(path + '/delete/id/', 
		handler.auths.authenticated,
    handler.auths.administrator,
		handler.courses.del);
			

router.post(path + '/new', 
		handler.auths.authenticated, 
    handler.auths.administrator,
		handler.courses.create);

module.exports = router;