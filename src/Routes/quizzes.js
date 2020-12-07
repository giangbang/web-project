'use strict';

const {success, error} 	= require('../Views/message');
const handler           = require('../Middlewares');
const path              = require('../path') + '/quizzes';
const express           = require('express');
const router            = express.Router();

router.get(path + '/id', 
		handler.quizzes.getById);
	
router.delete(path + '/delete/id',
    handler.auths.authenticated, 
    handler.auths.administrator,
		handler.quizzes.del);

router.get(path + '/all',  
		handler.quizzes.getAll);	

router.get(path + '/tags/id',  
		handler.quizzes.getByTag);	

router.get(path + '/courses/id/',  
		handler.quizzes.getByCourse);
    
router.get(path + '/currentUser/points/id/',
    handler.auths.authenticated, 
		handler.quizzes.getUsersPoint);	 
    
router.get(path + '/points/id',
		handler.quizzes.getHighestPoint);	

router.post(path + '/new', 
		handler.auths.authenticated, 
		handler.auths.administrator, 
		handler.quizzes.create);

module.exports = router;