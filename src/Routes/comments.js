'use strict';

const {success, error} 	= require('../Views/message');
const handler           = require('../Middlewares');
const path              = require('../path') + '/comments';
const express	          = require('express');
const router            = express.Router();

router.post(path+'/edit', 
		handler.auths.authenticated, 
		handler.auths.commentVerify, 
		handler.comments.edit);
	
router.delete(path+'/delete/id/', 
		handler.auths.authenticated, 
    handler.auths.commentVerify,
		handler.comments.del);
			

router.post(path+'/new', 
		handler.auths.authenticated, 
		handler.comments.create);

module.exports = router;