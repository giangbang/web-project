'use strict';

const {success, error} 	= require('../Views/message');
const handler           = require('../Middlewares');
const path              = require('../path') + '/submissions';
const express           = require('express');
const router            = express.Router();

router.get(path + '/delete/id/:id', 
		handler.auths.authenticated, 
		handler.submissions.del);
			

router.post('/new', 
		handler.auths.authenticated, 
		handler.submissions.create);

module.exports = router;