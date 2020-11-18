'use strict'

const express = require('express');
const router = express.Router();
const { success, error } = require('../Views/message');

const { models } = require('../Models');

const tags = models.tags;
const quizzes = models.quizzes;

// get all quizzes of tag by its id
router.get('/getQuizzes/:id', (req, res) => {
	tags.findAll({
		attributes: ['name'],
		include: [quizzes],
		where: {
			id: req.params.id
		}
	}).then(d => {
		res.send(success(d));
	}).catch(e => {
		res.send.error(e);
	});
});

// create new tags in database
router.post('/new', (req, res) => {
	let content = req.body;
	let row = tags.build(content);
	row.save().then(d => {
		res.send(success(d));
	}).catch(e => {
		res.send(error(e));
	});
})


module.exports = router;