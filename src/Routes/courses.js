'use strict';

const {success, error} 	= require('../Views/message');
const handler 			= require('../Middlewares');
const express			= require('express');
const router 			= express.Router();


router.get('/getByCode/:code', 
		handler.auths.authenticated, 
		handler.courses.getByCode);
	
router.get('/del/:id', 
		handler.auths.authenticated, 
		handler.courses.del);
			

router.post('/create', 
		handler.auths.authenticated, 
		handler.courses.create);

module.exports = router;