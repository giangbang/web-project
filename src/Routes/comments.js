'use strict'

const {success, error} 	= require('../Views/message');
const handler 			= require('../Middlewares');
const express			= require('express');
const router 			= express.Router();


router.post('/edit', 
		handler.auths.authenticated, 
		handler.comments.edit);
	
router.get('/del/:id', 
		handler.auths.authenticated, 
		handler.comments.del);
			

router.post('/create', 
		handler.auths.authenticated, 
		handler.comments.create);

module.exports = router;