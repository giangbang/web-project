'use strict';

const {success, error} 	= require('../Views/message');
const handler           = require('../Middlewares');
const path              = require('../path') + '/submissions';
const express           = require('express');
const router            = express.Router();

router.get(path + '/delete/id/:id', 
		// handler.auths.authenticated, 
		handler.submissions.del);
			

router.post(path+'/new', 
		// handler.auths.authenticated, 
		handler.submissions.create);
    
router.get(path+'/id', 
		// handler.auths.authenticated, 
		handler.submissions.getById);
    
router.get(path, 
		// handler.auths.authenticated, 
		handler.submissions.getByUserAndQuiz);
	

module.exports = router;