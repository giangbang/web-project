'use strict';

const {success, error} 	= require('../Views/message');
const handler           = require('../Middlewares');
const path              = require('../path') + '/tags';
const express           = require('express');
const router            = express.Router();

router.get(path + '/id/', 
		handler.auths.authenticated, 
		handler.tags.getById);

router.delete(path + '/delete/id/', 
		handler.auths.authenticated, 
		handler.auths.administrator, 
		handler.tags.del);


router.post(path + '/new', 
		handler.auths.authenticated, 
		handler.auths.administrator, 
		handler.tags.create);

router.post(path + '/update', 
		handler.auths.authenticated, 
		handler.auths.administrator, 
		handler.tags.update);

router.get(path + '/all', 
		handler.auths.authenticated, 
		handler.tags.getAll);

router.get(path + '/courses/id', 
		handler.auths.authenticated, 
		handler.tags.getByCourse);

module.exports = router; 