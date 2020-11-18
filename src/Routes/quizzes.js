'use strict'

const express = require('express');
const router = express.Router();

const   controller 			= require('../Controllers');
const { success, error } 	= require('../Views/message');

// get comments and its user by quiz's id		
router.get('/getComments/:id', (req, res) => {
	let id = req.params.id;
	controller.quizzes.getbyID(id)
	.then(d => {
		res.send(d);
	})
	.catch(e => {
		res.send(error(e));
	});
});

// create new quiz to database
router.post('/new', (req, res) => {
	let content = req.body;
	controller.quizzes.create(content)
	.then(d => {
		res.send(success(d));
	}).catch(e => {
		res.send(error(e));
	});
});

module.exports = router;