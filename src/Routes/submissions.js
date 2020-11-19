'use strict';

const {success, error} 	= require('../Views/message');
const handler 			= require('../Middlewares');
const express			= require('express');
const router 			= express.Router();

let path = (process.env.API_PATH || '') + '/comments';

router.get('/del/:id', 
		handler.auths.authenticated, 
		handler.submissions.del);
			

router.post('/create', 
		handler.auths.authenticated, 
		handler.submissions.create);

module.exports = router;