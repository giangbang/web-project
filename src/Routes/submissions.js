'use strict';

const {success, error} 	= require('../Views/message');
const handler           = require('../Middlewares');
const path              = require('../path') + '/submissions';
const express           = require('express');
const router            = express.Router();

// router.delete(path + '/delete/id/', 
		// handler.auths.authenticated,
    // handler.auths.submissionVerify,
		// handler.submissions.del);
			

router.post(path+'/new', 
		handler.auths.authenticated, 
		handler.submissions.create);
    
router.get(path+'/id', 
		handler.auths.authenticated, 
		handler.submissions.getById);
    
router.get(path+'/quizzes/id', 
		handler.auths.authenticated, 
		handler.submissions.getByUserAndQuiz);
    
router.get(path+'/quizzes/all/id', 
		handler.auths.authenticated, 
		handler.submissions.getAllByQuiz);
    
router.get(path+'/courses/id', 
		handler.auths.authenticated, 
		handler.submissions.getByCourse);
    
router.get(path+'/users/id', 
		handler.submissions.getByUser);
	

module.exports = router;