'use strict'

const express = require('express');
const router = express.Router();
const { success, error } = require('../Views/message');

const { models } = require('../Models');

const comments = models.comments;

router.post('/new', (req, res) => {
	let content = req.body;
	let row = comments.build(content);
	row.save().then(d => {
		res.send(success(d));
	}).catch(e => {
		res.send(error(e));
	});
})

router.get('/delete/:id', (req, res) => {
	comments.findByPk(req.params.id)
	.then(d => {
		return d.destroy();
	})
	.then(d => {
		res.send(success(d))
	}).catch(e => {
		res.send(error(e));
	});
});

router.post('/edit/:id', (req, res) => {
	let id = req.params.id;
	comments.findByPk(id).then(b => {
		b.content = req.body.content;
		return b.save();
	}).then(b => {
		res.send(success(b));
	}).catch(e => {
		res.error(e);
	});
});

module.exports = router;